# Testing Overview

- Path: `ctx/docs/code/testing.md`
- Changed: `20260716`

## Test Boundary

`npm test` verifies durable contribution creation, idempotent retry, enrollment issue/use, WebAuthn generation and verification inputs, credential persistence and counters, opaque session resolution, and targeted credential/session revocation. WebAuthn cryptographic behavior belongs to the selected library; package tests inject deterministic verifier results. Package metadata checks, ADSM validation, and TeqFW validation for every source module remain required.
