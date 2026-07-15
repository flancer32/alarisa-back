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

Describe the major contract surfaces between architectural areas.

This is not DTO documentation and not an OpenAPI replacement.

## Boundary Rules

- New integrations must be explicit here before they appear in implementation.
- Integration descriptions must stay at architectural boundary level, not code or schema level.
- Contradictions with product scope must be surfaced instead of normalized silently.
