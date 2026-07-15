# Filesystem Structure

- Path: `ctx/docs/filesystem.md`
- Template Version: `20260605`
- Changed: `20260715`

## Purpose

Defines the declarative structure of the project repository at the top level only, listing root-level directories and root-level files and establishing repository boundaries as a navigation model.

This starter is not a completed repository map.

During context design, replace placeholder entries with the actual top-level repository directories and root-level files.

Do not keep optional examples or inferred technology directories unless they exist and carry project-specific meaning.

## Root Structure

- `ctx/` — cognitive context containing project documentation, assets, and project-local agent materials.
- `{{top-level-directory}}/` — replace with an actual project directory and its project role.

## Root Files

- `AGENTS.md` — root-level agent instructions.
- `{{root-file}}` — replace with an actual root-level file and its project role.

## Scope Rule

This document must describe only top-level directories and root-level files of the repository.

Subdirectories must not be described here.

Lower-level structure must be described only by the corresponding `AGENTS.md` files within those directories.

## Boundary Definition

- `ctx/` defines the system model and governs interpretation of the repository.
- Product implementation directories must be named here only after the project structure is known.
- Generated, dependency, cache, secret, and local tool directories must be omitted unless the project context explicitly governs them.
