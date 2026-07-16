# Architecture Constraints

- Path: `ctx/docs/architecture/constraints.md`
- Template Version: `20260702`
- Changed: `20260715`

## Purpose

Record non-negotiable architecture restrictions and trust boundaries.

## Core Constraints

- exactly one Principal identity (`principal`) exists per application instance;
- credentials are independent and revocable, while synchronized passkeys remain allowed and device labels are not hardware proof;
- enrollment is administrator-issued, expiring, single-use, and stores no raw token;
- challenges are expiring and single-use;
- opaque sessions are bound to the credential that created them and revocation affects only that credential's sessions;
- WebAuthn private keys and biometric data never enter this package.

## Boundary Constraints

- do not add account lookup, usernames, passwords, roles, tenants, or external identity providers;
- do not move HTTP/browser contracts into `back` or trusted persistence into `comm`;
- do not interpret successful transport validation as authentication.

This section should make product and architecture boundaries explicit.

## Change Constraints

Describe which kinds of architecture changes always require human approval.

At minimum, cover:

- new architectural owners;
- new persistent state;
- new external integrations;
- new major system boundaries.

## Human Review Use

List the supervision questions a human should answer quickly with this document.
