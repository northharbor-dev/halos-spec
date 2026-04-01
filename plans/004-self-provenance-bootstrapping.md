# Plan 004: Self-Provenance Bootstrapping

**Status:** Draft
**Created:** 2026-03-31
**Author:** Bob Hong

---

## Context

HALOS should be the first adopter of its own provenance spec. Currently:

1. **The changelog is minimal** — `spec/changelog.json` has a single `1.0.0` entry for the principles launch. It doesn't track provenance spec versions (v0.1, v0.2, v0.3) at all.
2. **No provenance records exist for spec changes** — the spec defines how to record human-AI collaboration, but the spec's own development isn't recorded using it.
3. **Missing dogfooding credibility** — asking others to adopt HALOS is more compelling when HALOS itself demonstrates the practice.

---

## Proposal

### Phase 1: Expand the changelog

Add provenance spec milestones to `spec/changelog.json`. The changelog currently only tracks the principles spec (`1.0.0`). It needs to cover the provenance spec evolution:

| Version | Date | Key Changes |
|---------|------|-------------|
| Principles v1.0.0 | 2025-03-15 | Initial machine-readable spec (existing entry) |
| Provenance v0.1 | 2026-03-21 | Flat provenance model — artifact, human author, AI assistance, review, governance |
| Provenance v0.2 | 2026-03-25 | Graph model, decision provenance, interaction semantics, policy evaluations |
| Provenance v0.3 | 2026-03-31 | Multi-policy governance (governance object → array) |

**Decision needed:** Should the changelog use a single version sequence, or separate sequences per spec artifact (principles vs. provenance)? The current structure uses semver (`1.0.0`) for principles but the provenance spec uses `0.x`. These are different versioning schemes for different documents. Recommend separating into `principles` and `provenance` arrays within changelog.json, or using a `spec` field to disambiguate.

### Phase 2: Create the bootstrap provenance record (v0.3)

Create a real HALOS provenance record for the v0.3 spec change. This is the bootstrap moment — the first spec change documented using its own format.

**File:** `spec/provenance/records/v0.3.halos.json`

Contents:
- `artifact`: the v0.3 spec itself (`spec/provenance/v0.3.md` + schema)
- `human_author`: Bob Hong (originator)
- `ai_assistance`: Claude Opus 4.6 — role: assistance, taskType: comparing/reasoning
  - Compared governance field design options (array vs. leaning on policyEvaluations)
  - Drafted schema, spec doc, and migration notes
  - Updated all examples and landing pages
- `governance`: HALOS itself (eating our own dogfood)
- `decisions`:
  - Decided to make governance an array (breaking change) rather than keeping it as a single object and relying on policyEvaluations
  - Decided on x.y versioning (not semver, not draft suffixes) based on precedent from SLSA, CycloneDX, JSON Schema
  - Decided to promote v0.3 to Active immediately rather than holding it as Draft
- `review`: none yet (this would be the PR review)

### Phase 3: Backfill v0.1 and v0.2

Create retroactive provenance records for v0.1 and v0.2. These are reconstructed from git history and memory, so they'll be less detailed:

- `notes`: "Retroactively created from git history. Details are best-effort reconstruction."
- `human_author`: Bob Hong
- `ai_assistance`: reconstructed from commit messages and conversation history
- Fewer decisions and interactions (only what can be confidently reconstructed)

### Phase 4: Establish the norm

Going forward, every spec proposal that ships includes a companion provenance record in `spec/provenance/records/`. This becomes part of the PR checklist:

- [ ] Spec changes
- [ ] Schema changes
- [ ] Example updates
- [ ] Provenance record for this change

---

## Open Questions

1. **Changelog structure** — single sequence or per-artifact? Current `versions` array mixes concerns. Recommend:
   ```json
   {
     "principles": { "versions": [...] },
     "provenance": { "versions": [...] }
   }
   ```
2. **Record location** — `spec/provenance/records/` or alongside the spec files in `spec/provenance/v0.3.halos.json`?
3. **Backfill depth** — how much effort to spend reconstructing v0.1/v0.2 provenance? Minimal (just artifact + author + date) or detailed (reconstructed decisions from git log)?
4. **Automation** — should CI enforce that spec PRs include a provenance record? Or is this advisory for now?

---

## Dependencies

- Plan 003 (Example Generation Workflow) shares the self-provenance pattern — both plans establish the practice of HALOS documenting its own work
