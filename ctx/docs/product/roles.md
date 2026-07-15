# Product Role Model

- Path: `ctx/docs/product/roles.md`
- Template Version: `20260605`
- Changed: `20260715`

## Purpose

Describe product participants and their authority at the overview level.

This document defines product-role semantics only: who participates in the product world, why each role exists, what each role may control, and where responsibility boundaries are placed.

Detailed role groups may be described in `ctx/docs/product/roles/`.

## Level Boundary

Defines:

- role categories;
- role authority principles;
- ownership and responsibility boundaries;
- role visibility principles;
- role participation rules;
- role-level invariants.

Does NOT define:

- authentication mechanisms, sessions, tokens, passwords, or identity storage;
- API authorization middleware, route guards, or endpoint permissions;
- UI screens, buttons, menus, or interaction mechanics;
- source code roles, classes, services, policies, or implementation algorithms;
- database tables, access-control records, or persistence structure;
- detailed domain entity structure.

## Role Categories

List the major role categories in the product.

For each category, describe:

- purpose;
- product authority;
- owned product areas or objects;
- relation to other roles;
- detailed document, if it exists.

## Core Roles

List only the roles required for first-level understanding of the product.

Do not describe all possible roles here when the product has a large role model.

Detailed role definitions belong to dedicated role-area documents.

## Authority Principles

Describe product-level principles of authority.

Clarify:

- who may create durable product state;
- who may change durable product state;
- who may publish or approve product state;
- who may delete or archive product state;
- who may view product state;
- what requires explicit user confirmation.

Do not describe implementation-level permission checks.

## Ownership Boundaries

Describe what each major role category owns or must not own.

Focus on product meaning and responsibility, not access-control implementation.

## Participation Relations

Describe how roles interact with each other in the product.

Examples:

- owner and participant;
- author and reviewer;
- provider and consumer;
- administrator and managed user;
- human user and AI assistant.

## Role Invariants

List role-level rules that must remain true regardless of architecture, storage, UI, or code.

## Role Documentation Map

List detailed role documents.

Example:

- `roles/users.md` — end-user role groups.
- `roles/admins.md` — administrative roles.
- `roles/external-actors.md` — external participants and systems.
