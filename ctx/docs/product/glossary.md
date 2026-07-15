# Product Glossary

- Path: `ctx/docs/product/glossary.md`
- Template Version: `20260605`
- Changed: `20260715`

## Purpose

Define stable product terminology.

This document defines product-language semantics only: what terms mean inside the product, which terms are preferred, which terms are prohibited or deprecated, and how terms relate to product domain, roles, and use cases.

Detailed glossary groups may be described in `ctx/docs/product/glossary/`.

## Level Boundary

Defines:

- stable product terms;
- preferred names for product concepts;
- prohibited, deprecated, or ambiguous terms;
- synonym and naming rules;
- relations between terms;
- terminology-level invariants.

Does NOT define:

- database table names, column names, DTO names, or persistence naming rules;
- API route names, request fields, response fields, or transport naming rules;
- UI labels, button texts, menu names, or copywriting;
- source code identifiers, class names, service names, or module names;
- implementation-specific naming conventions.

## Term Groups

List the major groups of product terminology.

Small projects may keep this structure light at first and use a compact list of core terms before splitting terminology into groups.

For each group, describe:

- purpose;
- related domain area;
- related roles or use cases;
- detailed document, if it exists.

## Core Terms

List only the terms required for first-level understanding of the product language.

Do not describe the complete terminology catalog here when the product has many terms.

This document may start as a compact list of core terms and evolve into grouped terminology only when the product language grows.

Detailed term groups belong to dedicated glossary documents.

## Term Format

When a term is defined in this document or in a detailed glossary document, use product-level language.

Recommended fields:

- preferred term;
- definition;
- context of use;
- related domain concepts;
- related roles;
- related use cases;
- allowed synonyms;
- prohibited synonyms;
- deprecated terms.

Do not include implementation identifiers unless the implementation identifier is intentionally the same product term.

## Naming Principles

Describe product-level naming principles.

Clarify:

- how product terms are selected;
- when a term becomes stable;
- how ambiguous terms are resolved;
- how deprecated terms are handled;
- how terms should remain consistent across product documentation.

## Terminology Relations

Describe important relations between terms.

Examples:

- broader and narrower terms;
- preferred term and synonym;
- current term and deprecated term;
- product term and external/common term.

## Terminology Invariants

List terminology-level rules that must remain true regardless of architecture, storage, UI, or code.

## Glossary Documentation Map

List detailed glossary documents.

Example:

- `glossary/domain.md` — domain terminology.
- `glossary/roles.md` — role terminology.
- `glossary/ai.md` — AI-related terminology.
