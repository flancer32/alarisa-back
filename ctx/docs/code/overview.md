# Code Overview

- Path: `ctx/docs/code/overview.md`
- Changed: `20260716`

## Code Structure

`src/Config/Runtime.mjs` owns the immutable server runtime configuration used by back-area components. `src/Ingress/Human.mjs` durably accepts idempotent Principal contributions as private per-identifier JSON records under `<dataRoot>/principal-contributions/`.

## Engineering Constraints

- use ESM and `.mjs` for TeqFW modules;
- preserve namespace identity when server modules move from the base repository;
- keep `types.d.ts` synchronized with published components;
- use exclusive file creation to make contribution retry idempotent across processes and restarts;
- reject reuse of one contribution identifier for different content;
- do not duplicate `comm` contracts or create an alternative server composition root.
