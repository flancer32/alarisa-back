# Code Overview

- Path: `ctx/docs/code/overview.md`
- Changed: `20260715`

## Code Structure

`src/` is reserved for TeqFW ECMAScript modules addressed through the `Alarisa_Back_` namespace. No functional modules are created by the initial scaffold.

## Engineering Constraints

- use ESM and `.mjs` for TeqFW modules;
- preserve namespace identity when server modules move from the base repository;
- keep `types.d.ts` synchronized with published components;
- do not duplicate `comm` contracts or create an alternative server composition root.
