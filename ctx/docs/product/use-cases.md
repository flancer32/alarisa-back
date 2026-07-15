# Product Use Cases

- Path: `ctx/docs/product/use-cases.md`
- Template Version: `20260605`
- Changed: `20260715`

## Purpose

Describe product use cases at the overview level.

This document defines product-goal semantics only: what users need to achieve, why those goals matter, what product result is expected, and which product boundaries apply.

Any mention of product state in this document is product-level only.

Detailed use-case groups may be described in `ctx/docs/product/use-cases/`.

## Level Boundary

Defines:

- major user goals;
- product-level expected outcomes;
- use-case groups;
- lifecycle position of use cases;
- role participation at the product level;
- use-case-level invariants.

Does NOT define:

- UI screens, forms, widgets, buttons, or interaction mechanics;
- API routes, requests, responses, or transport protocols;
- source code actions, services, handlers, or implementation algorithms;
- database records, DTO fields, persistence workflows, or storage structure;
- test cases or acceptance-test procedures;
- detailed role permissions beyond product-level participation.

## Use Case Groups

List the major groups of product use cases.

For each group, describe:

- user goal;
- participating roles;
- expected product outcome;
- related domain areas;
- lifecycle position;
- detailed document, if it exists.

## Core Use Cases

List only the use cases required for first-level understanding of the product.

Do not describe the complete use-case catalog here when the product has many use cases.

Detailed use-case definitions belong to dedicated use-case group documents.

## Use Case Format

When a use case is described in this document or in a detailed use-case document, use product-level language.

Recommended fields:

- goal;
- primary role;
- supporting roles;
- preconditions;
- expected outcome;
- durable product outcome;
- product state effect at the product level;
- product boundaries;
- related domain concepts;
- related terms.

Do not include UI flow, API flow, database flow, implementation steps, DTOs, commands, events, handlers, or test procedures.

Do not describe database changes, API calls, events, handlers, or implementation workflows.

## Lifecycle Model

Describe how major use-case groups relate to the core product lifecycle.

This section should help the reader understand when and why use cases occur.

## Outcome Principles

Describe how expected outcomes are recognized at the product level.

Clarify:

- what counts as a useful product result;
- what produces a durable product outcome;
- what has a product state effect at the product level;
- what remains temporary or draft state;
- what requires explicit user acceptance or confirmation.

## Use Case Invariants

List use-case-level rules that must remain true regardless of architecture, storage, UI, or code.

## Use Case Documentation Map

List detailed use-case documents.

Example:

- `use-cases/onboarding.md` — entry and first-use goals.
- `use-cases/content.md` — content creation and publication goals.
- `use-cases/administration.md` — administration and governance goals.
