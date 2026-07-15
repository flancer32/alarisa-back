# Code Documentation

- Path: `ctx/docs/code/AGENTS.md`
- Template Version: `20260702`
- Changed: `20260715`

## Purpose

Defines the code documentation level.

Documents at this level map architecture into implementation constraints, source organization expectations, tests, and code-level invariants.

## Level Map

- `AGENTS.md` — level definition for `ctx/docs/code/`.
- `overview.md` — product code boundary, code responsibilities, and code invariants.
- `testing.md` — test strategy, required checks, and validation expectations.

## Level Boundary

Defines:

- Implementation mapping from architecture to code.
- Code-level invariants and source constraints.
- Test and validation expectations for implementation work.

Does NOT define:

- Product meaning, architecture ownership, or deployment environment facts.
- Runtime operations outside code-level constraints.
- Agent workflow behavior outside this documentation level.

## Local Rules

- Preserve project-specific nested code subdirectories such as modules, packages, or test areas when they improve maintainability.
