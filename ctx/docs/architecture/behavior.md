# Architecture Behavior

- Path: `ctx/docs/architecture/behavior.md`
- Template Version: `20260605`
- Changed: `20260715`

## Purpose

Describe major internal architectural flows and processing behavior.

This document explains how the system works internally, not which product outcomes users want.

## Major Flows

Describe the main architectural flows that matter for the system.

Examples may include request handling, synchronization, ingestion, supervision, background processing, or recovery.

Do not rewrite product use cases here.

## Flow Boundaries

For each major flow, clarify:

- where the flow starts;
- which architectural areas participate;
- where important decisions are made;
- where the flow ends or commits durable change.

## Failure And Recovery

Describe important failure handling, retry, fallback, or degradation behavior at the architectural level.

## Product Dependency

Behavior must realize product intent.

If product behavior is missing or contradictory, expose the gap instead of inventing architectural behavior silently.
