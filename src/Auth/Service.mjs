// @ts-check

/**
 * @namespace Alarisa_Back_Auth_Service
 * @description Trusted one-Principal WebAuthn enrollment, authentication, and session service.
 */

const SURFACES = Object.freeze(["desk", "mob"]);
const LABEL_MAX = 80;

export default class Service {
  /**
   * @param {object} deps
   * @param {Alarisa_Back_Node_Crypto} deps.crypto
   * @param {Alarisa_Back_Config_Runtime} deps.config
   * @param {Alarisa_Back_Auth_Store$} deps.store
   * @param {Alarisa_Back_Auth_WebAuthn$} deps.webAuthn
   */
  constructor({crypto, config, store, webAuthn}) {
    const registrationLocks = new Set();
    const nowIso = () => new Date().toISOString();
    const expires = (ttlMs) => new Date(Date.now() + ttlMs).toISOString();
    const principalUserId = new Uint8Array(crypto.createHash("sha256").update("alarisa:principal").digest());

    const authError = (code, message) => {
      const error = new Error(message);
      error.code = code;
      return error;
    };

    const validateSurface = (surface) => {
      if (!SURFACES.includes(surface)) throw authError("INVALID_INPUT", "Authentication surface must be desk or mob.");
      return surface;
    };

    const validateLabel = (label) => {
      const value = typeof label === "string" ? label.trim() : "";
      if (!value || value.length > LABEL_MAX) throw authError("INVALID_INPUT", `Authenticator label must contain 1 to ${LABEL_MAX} characters.`);
      return value;
    };

    const createSession = async (credentialId, surface) => {
      const ttlMs = surface === "mob" ? config.authMobSessionTtlMs : config.authDeskSessionTtlMs;
      const token = crypto.randomBytes(32).toString("base64url");
      const stepUpAt = nowIso();
      const record = await store.createSession({token, credentialId, surface, expiresAt: expires(ttlMs), stepUpAt});
      return Object.freeze({token, expiresAt: record.expiresAt, surface});
    };

    this.issueEnrollment = async function ({label, surface = "mob", ttlMs = config.authEnrollmentTtlMs}) {
      const normalizedLabel = validateLabel(label);
      validateSurface(surface);
      if (!Number.isInteger(ttlMs) || ttlMs < 60_000 || ttlMs > 86_400_000) {
        throw authError("INVALID_INPUT", "Enrollment lifetime must be from one minute to one day.");
      }
      const token = crypto.randomBytes(32).toString("base64url");
      const record = await store.createEnrollment({token, label: normalizedLabel, surface, expiresAt: expires(ttlMs)});
      return Object.freeze({token, label: normalizedLabel, surface, expiresAt: record.expiresAt});
    };

    this.registrationOptions = async function ({token}) {
      if (typeof token !== "string" || token.length < 32) throw authError("INVALID_ENROLLMENT", "Enrollment capability is required.");
      const enrollment = await store.getEnrollment(token);
      const credentials = await store.listCredentials();
      const options = await webAuthn.generateRegistrationOptions({
        rpName: config.authRpName,
        rpID: config.authRpId,
        userID: principalUserId,
        userName: "principal",
        userDisplayName: "Principal",
        attestationType: "none",
        excludeCredentials: credentials.map((credential) => ({id: credential.id, transports: credential.transports})),
        authenticatorSelection: {residentKey: "preferred", userVerification: "required"},
        supportedAlgorithmIDs: [-7, -257],
      });
      const ceremony = await store.createChallenge({
        type: "registration",
        challenge: options.challenge,
        surface: enrollment.surface,
        enrollmentTokenHash: enrollment.tokenHash,
        expiresAt: expires(config.authChallengeTtlMs),
      });
      return Object.freeze({ceremonyId: ceremony.id, options});
    };

    this.registrationVerify = async function ({ceremonyId, token, response}) {
      if (typeof ceremonyId !== "string" || typeof token !== "string" || !response || typeof response !== "object") throw authError("INVALID_INPUT", "Registration response is incomplete.");
      if (registrationLocks.has(token)) throw authError("INVALID_ENROLLMENT", "Enrollment capability is already being used.");
      registrationLocks.add(token);
      try {
        const challenge = await store.takeChallenge({id: ceremonyId, type: "registration"});
        const enrollment = await store.getEnrollment(token);
        if (enrollment.tokenHash !== challenge.enrollmentTokenHash) throw authError("INVALID_ENROLLMENT", "Enrollment capability does not match the ceremony.");

        let verification;
        try {
          verification = await webAuthn.verifyRegistrationResponse({
            response,
            expectedChallenge: challenge.challenge,
            expectedOrigin: config.authOrigin,
            expectedRPID: config.authRpId,
            requireUserVerification: true,
          });
        } catch {
          throw authError("AUTHENTICATION_FAILED", "WebAuthn registration could not be verified.");
        }
        if (!verification.verified || !verification.registrationInfo) throw authError("AUTHENTICATION_FAILED", "WebAuthn registration was not verified.");

        const info = verification.registrationInfo;
        const credential = Object.freeze({
          id: info.credential.id,
          publicKey: Buffer.from(info.credential.publicKey).toString("base64url"),
          counter: info.credential.counter,
          transports: Object.freeze([...(info.credential.transports ?? [])]),
          deviceType: info.credentialDeviceType,
          backedUp: info.credentialBackedUp,
          label: enrollment.label,
          principalId: "principal",
          registeredAt: nowIso(),
          lastUsedAt: null,
          revokedAt: null,
        });
        await store.saveCredential(credential);
        await store.consumeEnrollment(token);
        const session = await createSession(credential.id, challenge.surface);
        return Object.freeze({verified: true, credential: Object.freeze({id: credential.id, label: credential.label}), session});
      } finally {
        registrationLocks.delete(token);
      }
    };

    this.authenticationOptions = async function ({surface}) {
      validateSurface(surface);
      const credentials = await store.listCredentials();
      if (!credentials.length) throw authError("NO_CREDENTIALS", "No Principal authenticator is registered.");
      const options = await webAuthn.generateAuthenticationOptions({
        rpID: config.authRpId,
        allowCredentials: credentials.map((credential) => ({id: credential.id, transports: credential.transports})),
        userVerification: "required",
      });
      const ceremony = await store.createChallenge({
        type: "authentication",
        challenge: options.challenge,
        surface,
        expiresAt: expires(config.authChallengeTtlMs),
      });
      return Object.freeze({ceremonyId: ceremony.id, options});
    };

    this.authenticationVerify = async function ({ceremonyId, surface, response}) {
      validateSurface(surface);
      if (typeof ceremonyId !== "string" || !response || typeof response !== "object" || typeof response.id !== "string") {
        throw authError("INVALID_INPUT", "Authentication response is incomplete.");
      }
      const challenge = await store.takeChallenge({id: ceremonyId, type: "authentication"});
      if (challenge.surface !== surface) throw authError("INVALID_CHALLENGE", "Authentication surface does not match the ceremony.");
      const credential = await store.getCredential(response.id);
      let verification;
      try {
        verification = await webAuthn.verifyAuthenticationResponse({
          response,
          expectedChallenge: challenge.challenge,
          expectedOrigin: config.authOrigin,
          expectedRPID: config.authRpId,
          credential: {
            id: credential.id,
            publicKey: new Uint8Array(Buffer.from(credential.publicKey, "base64url")),
            counter: credential.counter,
            transports: credential.transports,
          },
          requireUserVerification: true,
        });
      } catch {
        throw authError("AUTHENTICATION_FAILED", "WebAuthn authentication could not be verified.");
      }
      if (!verification.verified) throw authError("AUTHENTICATION_FAILED", "WebAuthn authentication was not verified.");
      await store.updateCredentialUse({credentialId: credential.id, counter: verification.authenticationInfo.newCounter});
      const session = await createSession(credential.id, surface);
      return Object.freeze({verified: true, session});
    };

    this.resolveSession = async function ({token, touch = true}) {
      if (typeof token !== "string" || !token) throw authError("INVALID_SESSION", "Principal session is required.");
      const record = await store.getSession(token);
      if (record.revokedAt || Date.parse(record.expiresAt) <= Date.now()) throw authError("INVALID_SESSION", "Principal session has expired or was revoked.");
      await store.getCredential(record.credentialId);
      if (!touch) return record;
      const ttlMs = record.surface === "mob" ? config.authMobSessionTtlMs : config.authDeskSessionTtlMs;
      const updated = Object.freeze({...record, lastSeenAt: nowIso(), expiresAt: expires(ttlMs)});
      return store.updateSession(updated);
    };

    this.revokeSession = async function ({token}) {
      return store.revokeSession(token);
    };

    this.listCredentials = async function ({token}) {
      await this.resolveSession({token});
      const credentials = await store.listCredentials({includeRevoked: true});
      return Object.freeze(credentials.map((credential) => Object.freeze({
        id: credential.id,
        label: credential.label,
        deviceType: credential.deviceType,
        backedUp: credential.backedUp,
        registeredAt: credential.registeredAt,
        lastUsedAt: credential.lastUsedAt,
        revokedAt: credential.revokedAt,
      })));
    };

    this.revokeCredential = async function ({token, credentialId}) {
      if (typeof credentialId !== "string" || !credentialId) throw authError("INVALID_INPUT", "Credential identifier is required.");
      const session = await this.resolveSession({token, touch: false});
      if (Date.now() - Date.parse(session.stepUpAt) > config.authStepUpTtlMs) {
        throw authError("STEP_UP_REQUIRED", "Fresh WebAuthn verification is required.");
      }
      const active = await store.listCredentials();
      if (active.length <= 1) throw authError("LAST_CREDENTIAL", "Register another authenticator before revoking the last credential.");
      const credential = await store.revokeCredential(credentialId);
      const revokedSessions = await store.revokeCredentialSessions(credentialId);
      return Object.freeze({revoked: true, credentialId: credential.id, revokedSessions});
    };
  }
}

export const __deps__ = Object.freeze({
  crypto: "node:crypto",
  config: "Alarisa_Back_Config_Runtime$",
  store: "Alarisa_Back_Auth_Store$",
  webAuthn: "Alarisa_Back_Auth_WebAuthn$",
});
