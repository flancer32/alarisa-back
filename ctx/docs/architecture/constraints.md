# Architecture Constraints

- Path: `ctx/docs/architecture/constraints.md`
- Template Version: `20260702`
- Changed: `20260715`

## Purpose

Record non-negotiable architecture restrictions and trust boundaries.

## Core Constraints

List stable architectural properties that downstream environment and code work must respect.

Examples may include offline-first behavior, transport choices, persistence assumptions, cost ceilings, latency boundaries, or trust boundaries.

## Boundary Constraints

Describe what architecture must not redefine or violate.

This section should make product and architecture boundaries explicit.

## Change Constraints

Describe which kinds of architecture changes always require human approval.

At minimum, cover:

- new architectural owners;
- new persistent state;
- new external integrations;
- new major system boundaries.

## Human Review Use

List the supervision questions a human should answer quickly with this document.
