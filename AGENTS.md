# Root Level

- Path: `AGENTS.md`
- Template Version: `20260702`
- Changed: `20260715`

## Purpose

Root-level working rules for the `@flancer32/alarisa-back` package repository.

## Repository Topology

This is a one-repository ADSM project. Product files and the embedded cognitive context under `ctx/` are versioned together.

The cognitive context is authoritative. Read `ctx/AGENTS.md` and `ctx/docs/` before changing package meaning or boundaries.

## Level Boundary

Defines the boundary between the package implementation and its embedded cognitive context. Product meaning belongs under `ctx/docs/`; source-level implementation belongs outside `ctx/`.

## Root File Protection

Do not modify this file, `.gitignore`, or `README.md` unless explicitly instructed by the human.
