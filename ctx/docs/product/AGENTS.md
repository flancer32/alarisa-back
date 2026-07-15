# Product Documentation

- Path: `ctx/docs/product/AGENTS.md`
- Template Version: `20260702`
- Changed: `20260715`

## Purpose

Defines the product documentation level.

Documents at this level describe the system as a product: its meaning, purpose, scope, domain language, user roles, product boundaries, and product-level invariants.

## Level Map

- `AGENTS.md` — level definition for `ctx/docs/product/`.
- `domain.md` — product domain model; describes the product world, domain areas, business entities, ownership, and semantic relations, not storage structure.
- `glossary.md` — product terminology; defines stable product terms and prevents terminology drift.
- `overview.md` — entry point; defines product identity, scope, boundaries, and navigation, not a compressed full specification.
- `roles.md` — user role model; describes role categories, authority, permissions, ownership boundaries, and responsibility boundaries.
- `use-cases.md` — product use cases; describes user goals and expected outcomes, not UI, API, or implementation flows.

## Level Boundary

Defines:

- Product identity, scope, and explicit exclusions.
- Product language, roles, and authority boundaries.
- Product-level user goals, expected outcomes, and durable invariants.

Does NOT define:

- Architectural structure, system decomposition, or integration boundaries.
- Execution environment, deployment topology, or code-level implementation constraints.
- Agent workflow behavior, repository operations, or methodological rules above this level.

## Local Rules

- Preserve project-specific nested product subdirectories such as domain, roles, glossary, or use-case areas when they improve maintainability.
