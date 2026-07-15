# Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Changed: `20260715`

## Purpose

Define the area-level reusable server package boundary.

## Architectural Style

The package supplies coherent TeqFW modules that the `@flancer32/alarisa` server composition root may aggregate into its modular monolith. Package boundaries are architectural and agent-context boundaries, not independently deployed services.

## Major Boundaries

- the server composition root remains outside this package;
- shared communication contracts remain in `@flancer32/alarisa-comm`;
- dependencies must be directed and must not create package-area cycles;
- no persistence, scheduler, execution, or integration implementation is selected by this scaffold.

## Product Dependency

Architecture must refine `product/` and the base Alarisa cognitive context rather than originate new server behavior.
