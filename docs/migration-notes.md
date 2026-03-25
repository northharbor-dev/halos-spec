# Migration Notes

History of how spec content moved from the original HALOS repository into halos-spec.

---

## 2026-03-21 — Initial migration to halos-spec

**From:** `halos/` (northharbor-dev monorepo)
**To:** `halos-spec/` (this repository)

### What moved

| Source | Destination | Notes |
|---|---|---|
| `halos/docs/principles.md` | `PRINCIPLES/halos-principles-v1.0.md` | Stripped Jekyll frontmatter |
| `halos/spec/spec.md` | `PRINCIPLES/halos-principles-spec-v1.0.md` | Stripped Jekyll frontmatter; renamed to clarify this is the principles spec |
| `halos/spec/schema/core.schema.json` | `schemas/halos-principles-v1.0.schema.json` | Renamed for clarity |
| `halos/spec/schema/manifest.schema.json` | Preserved in `halos/spec/` | Kept in original repo; serves Jekyll site |
| `halos/spec/schema/extension.schema.json` | Preserved in `halos/spec/` | Kept in original repo |
| `halos/docs/governance.md` | `GOVERNANCE.md` | Adapted for standalone repo context |
| `halos/CONTRIBUTING.md` | `CONTRIBUTING.md` | Adapted for spec-repo context |
| `halos/LICENSE` | `LICENSE` | Copied verbatim |
| `halos/docs/spec/RELATED_SPECS.md` | `docs/mapping-cyclonedx-slsa.md` | Expanded with integration guidance |
| `halos-spec/PROVENANCE/terminology.md` | (already in place) | Unchanged |

### What was created new

| File | Description |
|---|---|
| `PROVENANCE/halos-provenance-spec-v0.1.md` | First provenance specification — new, not migrated |
| `PROVENANCE/halos-provenance-model-v0.2-draft.md` | Graph-based model draft |
| `schemas/halos-provenance-v0.1.schema.json` | JSON Schema for provenance records |
| `schemas/halos-provenance-v0.2-draft.schema.json` | Draft schema for graph model |
| `examples/minimal.json` | Minimal valid provenance record |
| `examples/cyclonedx-embedded.json` | Provenance in a CycloneDX SBOM |
| `examples/slsa-embedded.json` | Provenance as a SLSA predicate |
| `docs/explainer.md` | Plain-language introduction to HALOS |
| `README.md` | Repository README (replaced CI/CD pipeline prompt) |

### What stayed in `halos/`

- Jekyll site and all site infrastructure
- Blog posts and journal entries
- Identity and branding assets
- Signatory registry
- Proposals process
- CI/CD workflows and scripts
- The `halos/spec/` directory (continues to serve the Jekyll-rendered spec site)

### Key clarification

During migration it was clarified that `halos/spec/` contains the **Principles Spec** (HALOS-CORE-1 through HALOS-CORE-8) — not a provenance spec. The provenance specification (`halos-provenance-spec-v0.1.md`) was authored new in this migration.

---

## 2026-03-25 — Spec directory consolidation

Reorganized the repository to consolidate all specification content under `spec/` and move embedded examples into a subdirectory.

| Old path | New path | Reason |
|---|---|---|
| `PRINCIPLES/halos-principles-v1.0.md` | `spec/principles/v1.0.md` | All-caps directories removed; generated file lives near its source |
| `PROVENANCE/halos-provenance-spec-v0.1.md` | `spec/provenance/v0.1.md` | Provenance specs consolidated under `spec/` |
| `PROVENANCE/halos-provenance-model-v0.2-draft.md` | `spec/provenance/v0.2-draft.md` | Same |
| `PROVENANCE/terminology.md` | `spec/terminology.md` | Terminology is spec content |
| `examples/cyclonedx-embedded.json` | `examples/embedded/cyclonedx.json` | Embedded examples are envelope documents, not standalone provenance records; separated to clarify CI validation scope |
| `examples/slsa-embedded.json` | `examples/embedded/slsa.json` | Same |

---

## Versioning note

The principles spec (`halos/spec/spec.md`) was labeled `v1.0.0` and is preserved as such in `PRINCIPLES/halos-principles-spec-v1.0.md`.

The provenance spec begins at `v0.1` to signal it is newer and still evolving. The `v0.x` series will proceed through the proposal process before a `v1.0` is declared.
