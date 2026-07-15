# Environment Documentation

- Path: `ctx/docs/environment/AGENTS.md`
- Template Version: `20260702`
- Changed: `20260715`

## Purpose

Defines the environment documentation level.

Documents at this level describe runtime assumptions, deployment context, infrastructural prerequisites, and operational constraints.

## Level Map

- `AGENTS.md` — level definition for `ctx/docs/environment/`.
- `overview.md` — runtime assumptions, execution surfaces, external prerequisites, and operational constraints.

## Level Boundary

Defines:

- Runtime and deployment context required for system operation.
- Environment assumptions and external prerequisites.
- Operational constraints that implementation and deployment must respect.

Does NOT define:

- Product meaning or architecture ownership.
- Source-level implementation details.
- Project-local agent workflow behavior.

## Local Rules

- Preserve project-specific nested environment subdirectories such as deployment, runtime, or operations areas when they improve maintainability.
