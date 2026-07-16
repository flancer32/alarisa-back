# Architecture Integration

- Path: `ctx/docs/architecture/integration.md`
- Template Version: `20260605`
- Changed: `20260715`

## Purpose

Describe external integrations and major internal contracts between architectural blocks.

## External Integrations

List the external systems, platforms, or durable dependencies that matter architecturally.

Do not expand this section into protocol or endpoint detail unless a larger project uses optional deeper documents.

## Internal Contracts

- `comm authentication HTTP adapter -> Alarisa_Back_Auth_Service$` — delegates option generation, WebAuthn verification, session resolution, credential inspection, and revocation without owning trusted state;
- `host Principal API guard -> Alarisa_Back_Auth_Service$` — resolves one opaque session to the fixed `principal` identity and credential;
- `administrator CLI -> Alarisa_Back_Auth_Service$` — issues an expiring enrollment capability without starting another service.

This is not DTO documentation and not an OpenAPI replacement.

## Boundary Rules

- New integrations must be explicit here before they appear in implementation.
- Integration descriptions must stay at architectural boundary level, not code or schema level.
- Contradictions with product scope must be surfaced instead of normalized silently.
- Browser presentation, cookies, and route ownership remain outside `back`; raw enrollment and session tokens must not be persisted.
