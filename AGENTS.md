# AGENTS.md — halos-spec

Instructions for AI coding agents working in this repository. This file is agent-agnostic — it applies to Claude Code, GitHub Copilot, Cursor, Windsurf, Cline, Aider, and any other AI assistant.

---

## What This Repository Is

**halos-spec** is the canonical standards repository for [HALOS](https://halos.northharbor.dev) — Human–Agent Lineage and Origin Standard. It defines how to describe, record, and verify the provenance of work created through human–AI collaboration.

This is a **specification repository**, not a software package. The primary outputs are normative specification documents, JSON Schemas, and adoption tooling.

---

## Quick Reference

| Task | Command |
| --- | --- |
| Install dependencies | `npm install` |
| Run all tests | `npm test` |
| Validate a single file | `node scripts/validate.js -s spec/schema/halos-provenance-v0.3.schema.json <file>` |
| Regenerate principles | `node scripts/generate-principles.js` |
| Generate a new example | Follow the prompt in `examples/GENERATE-EXAMPLE.md` |

---

## Before You Start

1. Run `npm install` — the project uses AJV for JSON Schema validation
2. Run `npm test` to confirm all tests pass before making changes
3. Read this file and the relevant spec documents for your task

---

## Key Rules

### Generated files — do not edit directly

`spec/principles/v1.0.md` is generated from `spec/core.json`. If you modify `spec/core.json`, regenerate with `node scripts/generate-principles.js` and commit both files together.

### Schema validation is automatic

Any `.halos.json` file in `examples/` is automatically validated against the v0.3 schema by the test suite. No CI configuration changes are needed when adding new examples.

### Enum coverage is enforced

The test suite programmatically checks that every enum value defined in the schema is exercised in at least one fixture or example. If you add a new enum value to a schema, you must also add a fixture that uses it in `test/fixtures/valid/enum-coverage/`.

### Semantic checks run on all examples

Beyond schema validation, the test suite checks:

- Graph referential integrity (all relationship `from`/`to` IDs must reference existing entities or activities)
- No self-referencing lineage (artifact ID must not appear in its own `lineage[]`)
- Activity time ordering (`startedAt` must be before or equal to `endedAt`)

### If validation fails on a new example

A validation failure does not necessarily mean the example is wrong — it may mean the schema needs to evolve. If you believe a new enum value, field, or structure is needed:

1. Document the use case in a GitHub issue
2. Reference the HALOS governance process in `GOVERNANCE.md`
3. Propose the schema change as a separate PR from the example

---

## Active Spec Versions

| Document | Version | Status |
| --- | --- | --- |
| HALOS Principles | v1.0 | Stable |
| HALOS Provenance Spec | v0.3 | Active |
| HALOS Profile Schema | v1alpha1 | Active |

New examples must use `halos_version: "0.3"` and validate against `spec/schema/halos-provenance-v0.3.schema.json`.

---

## Repository Structure

```text
spec/                    Specification documents and JSON Schemas
  schema/                JSON Schema files (Draft 2020-12)
  provenance/            Provenance spec versions (v0.1, v0.2, v0.3)
  principles/            Generated principles document
examples/                Domain example records (.halos.json + narrative .md)
  GENERATE-EXAMPLE.md    Agent prompt for creating new domain examples
  embedded/              Examples embedded in other standards (CycloneDX, SLSA)
test/                    Automated test suite (node:test)
  fixtures/valid/        Valid test records (including enum-coverage scenarios)
  fixtures/invalid/      Records that must be rejected by the schema
  fixtures/semantic/     Records for testing cross-field consistency
adopt/                   Adoption toolkit (guide, agent prompt, templates)
profiles/                Domain-specific implementation profiles
mappings/                Integration with external standards
scripts/                 Utility scripts (validation, generation)
```

---

## Adding Examples

The preferred workflow for generating a new domain example:

1. Read `examples/GENERATE-EXAMPLE.md` — this is a structured agent prompt
2. Follow the steps: select domain, read specs, generate narrative + record
3. Run `npm test` to validate the record against the schema
4. The CI pipeline will also run validation on your PR automatically

Each example consists of:

- `{domain-slug}.md` — narrative document describing the scenario
- `{domain-slug}.halos.json` — v0.3 provenance record (must pass schema validation)
- `provenance/{domain-slug}-generation.halos.json` — self-provenance record documenting the generation itself

---

## Modifying Schemas

1. Edit files in `spec/schema/` (schemas use JSON Schema Draft 2020-12)
2. Run `npm test` — this validates all existing examples and fixtures still pass
3. If you added a new enum value, add a corresponding fixture in `test/fixtures/valid/enum-coverage/`
4. If you added a new required field, update existing test fixtures as needed

---

## Contribution Standards

- Follow conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Substantive changes follow an RFC-style proposal process (see `CONTRIBUTING.md`)
- All fictional example content must use `.example` domains (RFC 2606) and diverse fictional names
- Self-provenance is expected: document your human-AI collaboration when modifying provenance specs

---

## Related Files

- `CLAUDE.md` — Claude-specific instructions (extends this file)
- `FOR_AGENTS.md` — Entry point for agents adopting HALOS in external repositories
- `CONTRIBUTING.md` — Full contribution guidelines
- `GOVERNANCE.md` — Decision-making framework
