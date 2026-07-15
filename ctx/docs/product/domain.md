# Product Domain Model

- Path: `ctx/docs/product/domain.md`
- Template Version: `20260605`
- Changed: `20260715`

## Purpose

Describe the product world at the overview level.

This document defines product-world semantics only: what exists in the product world, why it matters, who owns it, and how major concepts relate to each other.

Detailed domain areas may be described in `ctx/docs/product/domain/`.

## Level Boundary

Defines:

- major domain areas;
- core domain entities;
- ownership principles for domain objects;
- semantic relations between domain areas and entities;
- domain-level invariants.

Does NOT define:

- database tables, DTO fields, indexes, migrations, or persistence structure;
- API routes, request and response contracts, or transport protocols;
- UI screens, widgets, components, or user interaction mechanics;
- source code structure, modules, services, classes, or implementation algorithms;
- detailed role permissions and authority rules.

## Domain Areas

List the major areas of the product world.

For each area, describe:

- purpose;
- ownership;
- primary entities;
- relation to other areas;
- detailed document, if it exists.

## Core Domain Entities

List only the entities required for first-level understanding of the product world.

Do not describe all entities here.

Detailed entity models belong to dedicated domain-area documents.

## Ownership Principles

Describe product-level ownership principles for domain objects.

Detailed authority and role permissions belong to `roles.md`.

## Semantic Relations

Describe the most important relations between domain areas and core entities.

Focus on product meaning, not implementation structure.

## Domain Invariants

List product-world rules that must remain true regardless of architecture, storage, UI, or code.

## Domain Documentation Map

List detailed domain documents.

Example:

- `domain/identity.md` — identity and access domain.
- `domain/content.md` — content and publication domain.
- `domain/billing.md` — billing and credit domain.
