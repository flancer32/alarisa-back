# Architecture Documentation

- Path: `ctx/docs/architecture/AGENTS.md`
- Template Version: `20260702`
- Changed: `20260715`

## Purpose

Defines the architecture documentation level.

Documents at this level translate product intent into stable engineering structure, behavior, state ownership, integration boundaries, architectural constraints, durable decisions, and supervision rules.

## Level Map

- `AGENTS.md` — level definition for `ctx/docs/architecture/`.
- `behavior.md` — internal architectural flows and major system behavior, not product use cases.
- `checklists.md` — recurring supervision, diagnosis, and acceptance checklists.
- `constraints.md` — non-negotiable architecture restrictions and trust boundaries.
- `decisions.md` — short ADR-like records of durable decisions, rejected alternatives, and reasoning.
- `integration.md` — external integrations and major internal contracts between architectural blocks.
- `overview.md` — compact architectural overview and navigation index.
- `state.md` — state ownership, sources of truth, derived state, and state-changing authority.
- `structure.md` — major architectural blocks, runtime areas, and responsibility boundaries, not code structure.
- `supervision.md` — human-agent architecture supervision rules, approval boundaries, and drift signals.

## Level Boundary

Defines:

- Major architectural areas, system boundaries, and integration surfaces.
- Internal behavior, state ownership, and authority distribution.
- Durable architectural constraints, decisions, and supervision rules.

Does NOT define:

- Product meaning such as roles, domain entities, or use-case outcomes.
- Deployment procedures, operational workflow routing, or environment-specific runbooks.
- Source-level implementation details such as files, classes, tables, DTOs, or endpoint definitions.

## Local Rules

- Preserve project-specific nested architecture subdirectories such as runtime, state, integration, or lifecycle areas when they improve maintainability.
