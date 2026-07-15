# AI Introduction

- Path: `ctx/docs/ai-intro.md`
- Changed: `20260715`

## Purpose

Orient agents to `@flancer32/alarisa-back`, the main reusable package for Alarisa server-side modules.

## Project Type

This is an ESM-only TeqFW npm package in the `back` area. It is not the self-hosted server composition root; that role remains with `@flancer32/alarisa`.

## Boundaries

The package may contain reusable server orchestration, authorization, durable state, execution, processing, and integration modules when accepted upstream. Shared communication contracts belong to `@flancer32/alarisa-comm`.

## Technology Base

Node.js 20 or newer, ECMAScript modules, npm, and the `Alarisa_Back_` TeqFW namespace.
