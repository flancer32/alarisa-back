# Architecture Supervision

- Path: `ctx/docs/architecture/supervision.md`
- Template Version: `20260702`
- Changed: `20260715`

## Purpose

Describe how one human and many agents supervise architecture-level consistency.

Use this document for durable supervision rules and approval boundaries.

Use `checklists.md` for short recurring human checks.

## Human-Agent Supervision Principle

State that:

- humans own architectural direction and guardrails;
- agents operate within documented architectural boundaries;
- architecture documentation is the authoritative medium through which the human direction-setting loop and the agent refinement and execution-support loop coordinate at the architecture level;
- agents must surface architectural drift instead of silently resolving it;
- major architectural boundary changes require human approval.

## Human Responsibilities

Describe the human role in setting direction, approving guardrails, and resolving architectural uncertainty.

## Agent Responsibilities

Describe what agents may refine autonomously inside existing architecture boundaries.

State that agents should prefer updating documentation before code when a new architectural concept appears.

## Mandatory Approval Cases

State which changes require human approval.

At minimum, cover:

- new architectural owners;
- new persistent state;
- new external integrations;
- new system boundaries.

## Drift Signals

Describe the signals that indicate architecture and implementation are diverging.

## Pre-Code Check Order

State which documents agents must check before code-oriented work.

The expected dependency is:

```text
product
  -> architecture
  -> environment
  -> code
```
