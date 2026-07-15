# Architecture State

- Path: `ctx/docs/architecture/state.md`
- Template Version: `20260605`
- Changed: `20260715`

## Purpose

Describe state ownership and sources of truth.

## Sources Of Truth

List the durable sources of truth that matter architecturally.

## State Categories

Separate state into categories such as:

- authoritative durable state;
- temporary state;
- derived state.

Make clear which category is the source of truth and which categories are downstream reflections of it.

## Ownership Boundaries

Describe the boundaries around:

- which state is authoritative;
- where persistence responsibility lives;
- where derived state comes from;
- which state areas must not be re-owned implicitly.

## Ownership Rules

Describe:

- who owns each important state area;
- who may change it;
- who may authorize new state creation.

## State Authority

Describe:

- who has authority to commit durable state change;
- how derived state stays traceable to authoritative state;
- how persistence responsibility is kept explicit.

## Change Discipline

Make clear that agents must not introduce new persistent state owners or categories without updating architecture documents and obtaining human approval.
