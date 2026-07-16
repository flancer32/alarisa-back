# Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Changed: `20260716`

## Purpose

Define the area-level reusable server package boundary.

## Architectural Style

The package supplies coherent TeqFW modules that the `@flancer32/alarisa` server composition root may aggregate into its modular monolith. Package boundaries are architectural and agent-context boundaries, not independently deployed services.

## Major Boundaries

- the server composition root remains outside this package;
- shared communication contracts remain in `@flancer32/alarisa-comm`;
- dependencies must be directed and must not create package-area cycles;
- durable Principal-contribution acceptance is implemented as private file-backed state under the configured data root;
- one fixed Principal is authenticated through WebAuthn credentials, administrator-issued enrollment capabilities, and credential-bound opaque sessions; this package owns trusted verification and private authentication state but not HTTP or browser contracts;
- `@simplewebauthn/server` is the selected verification library for the initial Node.js 20 baseline;
- broader persistence, scheduler, execution, and integration implementations remain undeclared.

## Product Dependency

Architecture must refine `product/` and the base Alarisa cognitive context rather than originate new server behavior.
