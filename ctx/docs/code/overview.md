# Code Overview

- Path: `ctx/docs/code/overview.md`
- Changed: `20260716`

## Code Structure

`src/Config/Runtime.mjs` owns immutable server and authentication configuration. `src/Ingress/Human.mjs` durably accepts idempotent Principal Messages as private per-identifier JSON records under `<dataRoot>/principal-contributions/`.

`src/Auth/WebAuthn.mjs` lazily adapts `@simplewebauthn/server`. `src/Auth/Service.mjs` owns one-Principal enrollment, option generation, verification, sliding sessions, inspection, and revocation. `src/Auth/Store.mjs` persists private mode-`0600` JSON records under `<dataRoot>/authentication/{enrollments,challenges,credentials,sessions}/`; raw capability and session tokens are SHA-256 addressed and never stored.

## Engineering Constraints

- use ESM and `.mjs` for TeqFW modules;
- preserve namespace identity when server modules move from the base repository;
- keep `types.d.ts` synchronized with published components;
- use exclusive file creation to make message retry idempotent across processes and restarts;
- reject reuse of one message identifier for different content;
- do not duplicate `comm` contracts or create an alternative server composition root.
- keep the fixed Principal identifier invariant and preserve credential-bound targeted revocation;
- keep WebAuthn verification inputs bound to configured origin, RP ID, challenge, credential public key/counter, and required user verification.
