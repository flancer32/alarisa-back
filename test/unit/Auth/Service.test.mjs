import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import Service from "../../../src/Auth/Service.mjs";
import Store from "../../../src/Auth/Store.mjs";

const config = Object.freeze({
  dataRoot: undefined,
  authOrigin: "http://localhost:3000",
  authRpId: "localhost",
  authRpName: "Alarisa",
  authChallengeTtlMs: 300_000,
  authEnrollmentTtlMs: 900_000,
  authMobSessionTtlMs: 7_776_000_000,
  authDeskSessionTtlMs: 15_552_000_000,
  authStepUpTtlMs: 1_800_000,
});

async function fixture() {
  const dataRoot = await fs.mkdtemp(path.join(os.tmpdir(), "alarisa-auth-"));
  const runtime = {...config, dataRoot};
  const store = new Store({crypto, fs, path, config: runtime});
  const calls = {registration: [], registrationVerify: [], authentication: [], authenticationVerify: [], nextCredentialId: "credential-1"};
  const webAuthn = {
    async generateRegistrationOptions(params) {
      calls.registration.push(params);
      return {challenge: "registration-challenge", user: {id: "principal"}};
    },
    async verifyRegistrationResponse(params) {
      calls.registrationVerify.push(params);
      return {
        verified: true,
        registrationInfo: {
          credential: {id: calls.nextCredentialId, publicKey: new Uint8Array([1, 2, 3]), counter: 0, transports: ["internal"]},
          credentialDeviceType: "multiDevice",
          credentialBackedUp: true,
        },
      };
    },
    async generateAuthenticationOptions(params) {
      calls.authentication.push(params);
      return {challenge: "authentication-challenge", allowCredentials: params.allowCredentials};
    },
    async verifyAuthenticationResponse(params) {
      calls.authenticationVerify.push(params);
      return {verified: true, authenticationInfo: {newCounter: 1}};
    },
  };
  return {service: new Service({crypto, config: runtime, store, webAuthn}), store, calls};
}

test("registers one Principal authenticator through a single-use enrollment and creates a session", async () => {
  const {service, store, calls} = await fixture();
  const enrollment = await service.issueEnrollment({label: "Phone", surface: "mob"});
  const ceremony = await service.registrationOptions({token: enrollment.token});
  const result = await service.registrationVerify({ceremonyId: ceremony.ceremonyId, token: enrollment.token, response: {id: "browser-response"}});

  assert.equal(result.verified, true);
  assert.equal(result.credential.label, "Phone");
  assert.equal((await store.listCredentials()).length, 1);
  assert.equal((await service.resolveSession({token: result.session.token})).principalId, "principal");
  assert.equal(calls.registration[0].userName, "principal");
  assert.equal(calls.registration[0].authenticatorSelection.userVerification, "required");
  await assert.rejects(service.registrationOptions({token: enrollment.token}), (error) => error.code === "INVALID_ENROLLMENT");
});

test("authenticates with the registered credential and persists the new counter", async () => {
  const {service, store, calls} = await fixture();
  const enrollment = await service.issueEnrollment({label: "Laptop", surface: "desk"});
  const registration = await service.registrationOptions({token: enrollment.token});
  await service.registrationVerify({ceremonyId: registration.ceremonyId, token: enrollment.token, response: {id: "registration"}});

  const ceremony = await service.authenticationOptions({surface: "desk"});
  const result = await service.authenticationVerify({ceremonyId: ceremony.ceremonyId, surface: "desk", response: {id: "credential-1"}});

  assert.equal(result.verified, true);
  assert.equal(result.session.surface, "desk");
  assert.equal((await store.getCredential("credential-1")).counter, 1);
  assert.deepEqual(Array.from(calls.authenticationVerify[0].credential.publicKey), [1, 2, 3]);
  assert.equal(calls.authenticationVerify[0].requireUserVerification, true);
});

test("rejects unknown sessions without creating another Principal identity", async () => {
  const {service} = await fixture();
  await assert.rejects(service.resolveSession({token: "unknown"}), (error) => error.code === "INVALID_SESSION");
});

test("revokes one credential and only its sessions after fresh verification", async () => {
  const {service, calls} = await fixture();
  const firstEnrollment = await service.issueEnrollment({label: "Phone", surface: "mob"});
  const firstCeremony = await service.registrationOptions({token: firstEnrollment.token});
  const first = await service.registrationVerify({ceremonyId: firstCeremony.ceremonyId, token: firstEnrollment.token, response: {id: "first"}});

  calls.nextCredentialId = "credential-2";
  const secondEnrollment = await service.issueEnrollment({label: "Laptop", surface: "desk"});
  const secondCeremony = await service.registrationOptions({token: secondEnrollment.token});
  const second = await service.registrationVerify({ceremonyId: secondCeremony.ceremonyId, token: secondEnrollment.token, response: {id: "second"}});

  const result = await service.revokeCredential({token: first.session.token, credentialId: "credential-2"});

  assert.equal(result.revoked, true);
  assert.equal(result.revokedSessions, 1);
  assert.equal((await service.resolveSession({token: first.session.token})).credentialId, "credential-1");
  await assert.rejects(service.resolveSession({token: second.session.token}), (error) => error.code === "INVALID_SESSION");
  const credentials = await service.listCredentials({token: first.session.token});
  assert.equal(credentials.find((credential) => credential.id === "credential-2").revokedAt !== null, true);
});
