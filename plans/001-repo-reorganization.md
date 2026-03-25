# Plan 001: Repo Reorganization and Adoption Toolkit

**Status:** Active
**Created:** 2026-03-25
**Author:** Bob Hong
**Tracking:** [northharbor-dev/halos-spec#1](https://github.com/northharbor-dev/halos-spec/issues/1)

---

## Context

HALOS is organized across three repositories:

| Repo | Visibility | Role |
|---|---|---|
| `northharbor-dev/halos` | Public | Origin repo — website, narrative, community governance, proposals |
| `northharbor-dev/halos-spec` | Public | Canonical standards — specs, schemas, examples, mappings |
| `northharbor-ai/northharbor-ai` | Private | First real-world adopter of HALOS (commercial, NorthHarbor AI) |

An initial migration (2026-03-21, see `docs/migration-notes.md`) split spec content from the `halos` repo into `halos-spec`. That migration was incomplete:

1. **Machine-readable spec layer stayed behind.** `halos/spec/` still contains `manifest.json`, `core.json`, JSON schemas, and `changelog.json`. These are normative spec content that should live in `halos-spec` but were kept to serve the Jekyll site.

2. **No adoption toolkit exists.** The practical "how to adopt HALOS in your repo" process was developed in `northharbor-ai` (private). There is no public, agent-discoverable path for adoption.

3. **Agent discovery files overlap.** The `halos` repo has three files (`FOR_AGENTS.md`, `AGENTS.md`, `docs/for-agents.md`) that all address agent behavior within the halos repo, with duplicated content. None of them help an external agent adopt HALOS in a different repo.

4. **No path for domain-specific profiles.** HALOS principles are universal, but implementation details vary by domain. A software dev shop might use SLSA + CycloneDX + Chainloop. A regulated healthcare org might map to HL7 FHIR provenance. There's no structure for these profiles.

5. **Principles are defined in three places.** The eight core principles exist as prose markdown (`PRINCIPLES/halos-principles-v1.0.md`), structured markdown (`PRINCIPLES/halos-principles-spec-v1.0.md`), and JSON (`halos/spec/core.json`). Two of these are manually maintained duplicates. The JSON and the principles schema in `halos-spec` vs `halos` have drifted (different strictness levels).

6. **No schema for the adoption profile.** The `halos.yaml` governance profile (the primary artifact an adopter creates) has no JSON/YAML schema. It was invented during the `northharbor-ai` adoption with no formal definition. An adopting agent has no way to validate what it generates.

7. **Adoption doesn't surface provenance.** The adoption process (as developed in `northharbor-ai`) produces a governance profile but never introduces the provenance spec — the mechanism for CORE-3 and CORE-4. Adoption should have two phases: governance first, then provenance.

8. **GOVERNANCE.md exists in both repos.** `halos-spec` and `halos` each have their own GOVERNANCE.md with nearly identical content. It's unclear which is canonical, and they could drift independently. The `halos` repo also has a full `proposals/` directory with lifecycle and templates, while `halos-spec` has none.

9. **`docs/whitepaper.md` is unaccounted for.** A substantive whitepaper ("HALOS: A Human-Centered Provenance Layer for AI Systems") exists in `halos-spec/docs/` but isn't referenced in the README, the target structure, or the adoption flow. It's a strong asset that should be explicitly placed.

---

## Goals

1. Complete the spec migration — `halos-spec` becomes the single source of truth for all normative content
2. Eliminate spec duplication — JSON is the source of truth, markdown is generated
3. Create a public adoption toolkit — an agent can be pointed at a URL and know how to adopt HALOS into any repo
4. Define a schema for the `halos.yaml` adoption profile
5. Clean up agent discovery in `halos` — deduplicate, clarify scope (inward vs outward)
6. Establish a structure for domain-specific implementation profiles
7. Set up versioned releases that support future signed bundles

---

## Design

### Repo responsibilities (target state)

**`halos`** — The Home
- Website (Jekyll), blog, journal, identity/branding
- Community governance: proposals process, signatory registry
- Agent discovery for working *in this repo* (Cursor rules, skills)
- Links to `halos-spec` for all normative specs and adoption
- Jekyll site may render spec content pulled from `halos-spec` releases, or link out

**`halos-spec`** — The Standard
- All normative, versioned, machine-readable content
- Principles: JSON is the single source of truth, markdown is generated
- Provenance spec, schemas, examples
- Mappings to other standards (CycloneDX, SLSA, etc.)
- Adoption toolkit (guide, agent prompt, templates, halos.yaml schema)
- Domain-specific profiles
- Agent discovery for *adopting HALOS externally*
- Releases (tagged, future: signed bundles)

**`northharbor-ai`** — An Adopter (no changes needed beyond a reference link)
- Repo-specific HALOS artifacts (halos.yaml, compatibility map, conflict register)
- References `halos-spec` adoption guide as canonical source

### Single source of truth for principles

**Problem:** Three representations of the same eight principles, manually maintained, already drifting.

**Solution:** JSON (`spec/core.json`) is the single source. Markdown is generated from it.

```
spec/core.json                          # SOURCE — edit here
  ↓ generate
PRINCIPLES/halos-principles-v1.0.md     # GENERATED — human-readable prose
PRINCIPLES/halos-principles-spec-v1.0.md # REMOVE — redundant structured markdown
```

The `halos` repo already has `scripts/generate-spec.js` that does exactly this pattern (JSON → rendered markdown). We adapt or reuse that approach.

The generated prose file should include a header indicating it's derived from `core.json`, so contributors know where to make changes.

**Schema reconciliation:** Two schemas exist for `core.json`:
- `halos-spec/schemas/halos-principles-v1.0.schema.json` — stricter (`additionalProperties: false`, `minItems: 1`)
- `halos/spec/schema/core.schema.json` — looser (no `additionalProperties`, no `minItems`)

Use the stricter version as canonical. It moves to `spec/schema/core.schema.json`.

### halos.yaml adoption profile schema

The `halos.yaml` is the primary artifact an adopter creates. It needs a formal schema so agents can generate valid profiles and CI can validate them.

Schema should capture the structure established by `northharbor-ai`'s adoption:

```yaml
apiVersion: halos.northharbor.dev/v1alpha1
kind: HalosProfile
metadata:
  name: <string>
  description: <string>
  owner: <string>
  maturity: experimental | stable | deprecated
  adoptionModel: brownfield | greenfield
spec:
  principles:     # Which HALOS-CORE requirements are adopted and at what level
  agentModel:     # Agent definitions and behavioral constraints
  governance:     # Decision-making and conflict handling
  adoption:       # Phases, allowed/restricted actions
  provenance:     # Capture and storage configuration
  workflows:      # PR, CI integration points
  compatibility:  # Mapping to existing repo artifacts
```

New file: `spec/schema/halos-profile.schema.json`

### Two-phase adoption

The adoption guide should present two distinct phases:

**Phase 1: Governance** (what we did in `northharbor-ai`)
- Generate `halos.yaml` governance profile
- Scan repo, produce compatibility map
- Surface conflicts, present for human review
- Lightweight, non-disruptive, immediate value

**Phase 2: Provenance** (not yet done anywhere)
- Introduce `.halos.json` provenance records for significant artifacts
- Map to domain-appropriate standards (CycloneDX, SLSA, etc.)
- Optionally select a profile from `profiles/`
- Deeper integration, requires tooling decisions

Phase 1 is the entry point for every adopter. Phase 2 is where domain profiles become relevant.

### Target structure for `halos-spec`

```
halos-spec/
├── spec/                                   # All machine-readable spec content
│   ├── manifest.json                       # Discovery entry point (from halos repo)
│   ├── core.json                           # Eight core requirements (SOURCE OF TRUTH)
│   ├── changelog.json                      # Version history (from halos repo)
│   └── schema/
│       ├── manifest.schema.json            # (from halos repo)
│       ├── core.schema.json                # (reconciled, stricter version)
│       ├── extension.schema.json           # (from halos repo)
│       ├── changelog.schema.json           # (from halos repo)
│       ├── halos-profile.schema.json       # NEW — validates halos.yaml
│       ├── halos-provenance-v0.1.schema.json    # (from schemas/)
│       └── halos-provenance-v0.2-draft.schema.json  # (from schemas/)
│
├── PRINCIPLES/
│   └── halos-principles-v1.0.md            # GENERATED from spec/core.json
│
├── PROVENANCE/
│   ├── halos-provenance-spec-v0.1.md       # (existing)
│   ├── halos-provenance-model-v0.2-draft.md # (existing)
│   └── terminology.md                      # (existing)
│
├── adopt/                                  # NEW — adoption toolkit
│   ├── GUIDE.md                            # Two-phase adoption guide
│   ├── AGENT-PROMPT.md                     # Universal agent entry point
│   └── templates/
│       ├── halos.yaml                      # Starter governance profile
│       ├── HALOS-ADOPTION.md               # Starter adoption doc
│       └── HALOS-CONFLICT-REGISTER.md      # Empty register template
│
├── profiles/                               # NEW — domain-specific implementation
│   ├── README.md                           # What profiles are, how to create one
│   └── software-dev/                       # First profile
│       ├── README.md
│       ├── profile.yaml                    # Maps principles to SLSA/CycloneDX/Chainloop
│       └── examples/
│
├── mappings/                               # PROMOTED from docs/
│   ├── cyclonedx.md
│   ├── slsa.md
│   └── (future: chainloop.md, sigstore.md)
│
├── examples/                               # (existing)
│   ├── minimal.json
│   ├── cyclonedx-embedded.json
│   └── slsa-embedded.json
│
├── scripts/
│   └── generate-principles.js              # NEW — renders core.json → PRINCIPLES/*.md
│
├── docs/
│   ├── explainer.md                        # (existing)
│   ├── whitepaper.md                       # (existing) formal positioning paper
│   └── migration-notes.md                  # (existing) historical record
│
├── plans/                                  # (this directory)
│   ├── README.md
│   └── 001-repo-reorganization.md          # This plan
│
├── FOR_AGENTS.md                           # NEW — outward-facing adoption discovery
├── README.md                               # UPDATE — reflect new structure
├── GOVERNANCE.md                           # UPDATE — clarify relationship to halos governance
├── CONTRIBUTING.md                         # UPDATE — mention plans, profiles
└── LICENSE                                 # (existing)
```

**Removed from previous plan:**
- `PRINCIPLES/halos-principles-spec-v1.0.md` — eliminated, redundant with `core.json`
- `schemas/` (top-level) — consolidated into `spec/schema/`

**Added:**
- `spec/schema/halos-profile.schema.json` — schema for `halos.yaml`
- `scripts/generate-principles.js` — renders JSON → markdown

### Agent discovery cleanup in `halos`

| File | Action | New role |
|---|---|---|
| `FOR_AGENTS.md` | Simplify | Lightweight pointer: "HALOS governs this repo → see AGENTS.md. To adopt HALOS in your repo → see halos-spec." |
| `AGENTS.md` | Keep | Single source for agent behavior *in this repo* — contract, named agents, Cursor rules |
| `docs/for-agents.md` | Rework | Website page explaining HALOS + agents *conceptually*. Not a third copy of the contract. Links to halos-spec for adoption. |

### Agent discovery in `halos-spec` (new)

`FOR_AGENTS.md` at the root — outward-facing:

```
# Adopting HALOS

Point an agent at this file to adopt HALOS in any repository.

- Spec entry point: spec/manifest.json
- Core requirements (JSON): spec/core.json
- Principles (readable): PRINCIPLES/halos-principles-v1.0.md
- Provenance spec: PROVENANCE/halos-provenance-spec-v0.1.md
- Adoption guide: adopt/GUIDE.md
- Agent prompt: adopt/AGENT-PROMPT.md
- Templates: adopt/templates/
- Profile schema: spec/schema/halos-profile.schema.json
```

`adopt/AGENT-PROMPT.md` — the universal bootstrapper:
1. Read `spec/core.json` for requirement IDs and normative descriptions
2. Read `PRINCIPLES/halos-principles-v1.0.md` for full principle context
3. Fetch `adopt/templates/*` for starter files
4. Validate generated `halos.yaml` against `spec/schema/halos-profile.schema.json`
5. Scan target repo for existing governance artifacts
6. Generate halos.yaml, compatibility map, conflict register (Phase 1)
7. Present for human review
8. Optionally introduce provenance records and select a domain profile (Phase 2)

### Versioning and releases

- Git tags on `halos-spec`: `v1.0.0`, `v1.0.1`, etc.
- Profiles version independently via `profile.yaml → specVersion`
- GitHub Releases attach tarballs of spec + adopt + profiles
- Future: cosign-signed bundles for supply-chain attestation
- URL flexibility: DNS CNAMEs can point to wherever content is served; not a blocker

---

## Work Items

### Phase 1: Foundation (this repo)

- [x] Create `plans/` directory with README and this plan
- [x] Delete stale `migration-plan.md` and `actions-plan.md`
- [x] Create `spec/schema/halos-profile.schema.json` — schema for the `halos.yaml` adoption profile
- [ ] Create `scripts/generate-principles.js` — renders `core.json` → `PRINCIPLES/halos-principles-v1.0.md`
- [x] Remove `PRINCIPLES/halos-principles-spec-v1.0.md` (redundant with `core.json`)
- [x] Consolidate `schemas/` → `spec/schema/` (move principles + provenance schemas, reconcile duplicates)
- [x] Move `docs/mapping-cyclonedx-slsa.md` → `mappings/cyclonedx-slsa.md`
- [x] Create `adopt/` with GUIDE.md (two-phase), AGENT-PROMPT.md, and templates
- [x] Create `profiles/` with README and `software-dev/` stub
- [x] Create `FOR_AGENTS.md` (outward-facing adoption discovery)
- [x] Update `README.md` to reflect new structure (include whitepaper in docs listing)
- [x] Update `CONTRIBUTING.md` to mention plans, profiles, adopt, generation workflow
- [x] Clarify `GOVERNANCE.md` scope — spec governance vs community governance (see D11)

### Phase 2: Spec migration (cross-repo)

- [ ] Copy `halos/spec/manifest.json`, `core.json`, `changelog.json` → `halos-spec/spec/`
- [ ] Copy `halos/spec/schema/manifest.schema.json`, `extension.schema.json`, `changelog.schema.json` → `halos-spec/spec/schema/`
- [ ] Reconcile `core.schema.json` — adopt stricter version, discard looser one
- [ ] Update `spec/manifest.json` URLs to point to halos-spec
- [ ] Update `spec/core.json` source links to point to halos-spec paths
- [ ] In `halos`: replace `spec/` content with stubs that redirect to halos-spec
- [ ] In `halos`: update Jekyll site to reference halos-spec URLs

### Phase 3: Agent discovery cleanup (halos repo)

- [ ] Simplify `halos/FOR_AGENTS.md` — pointer only, link to halos-spec for adoption
- [ ] Rework `halos/docs/for-agents.md` — conceptual page, not a contract copy
- [ ] Ensure `halos/AGENTS.md` is the single source for in-repo agent behavior
- [ ] Remove duplicated principle summaries from agent discovery files

### Phase 4: Releases and CI

- [ ] Add GitHub Actions workflow for schema validation
- [ ] Add generation step: CI verifies `PRINCIPLES/*.md` matches `core.json` (no manual drift)
- [ ] Tag first release after reorganization
- [ ] Document release process in README or CONTRIBUTING

### Future

- [ ] `software-dev` profile: full SLSA + CycloneDX + Chainloop mapping
- [ ] Additional profiles as adoption grows (regulated industries, consumer web)
- [ ] Signed release bundles (cosign/sigstore)
- [ ] `halos-spec` validation CLI or Docker image
- [ ] Phase 2 adoption reference implementation (provenance records in a real repo)

---

## Decisions

| # | Decision | Rationale |
|---|---|---|
| D1 | Two public repos (halos + halos-spec), not three | `halos` is the community home, `halos-spec` is the normative standard. Adding a third (halos-adopt) creates coordination overhead without benefit — adoption is part of the spec. |
| D2 | Adoption toolkit lives in halos-spec, not halos | Adoption references specs, schemas, and templates. Keeping it co-located with the normative content means one URL root and one release artifact. |
| D3 | Domain profiles live in halos-spec | Profiles map principles to domain-specific toolchains. They reference the spec directly and should version alongside it. |
| D4 | Schemas consolidate into spec/schema/ | One canonical location for all JSON schemas, whether they validate principles, provenance, profiles, or manifest structure. |
| D5 | halos/spec/ becomes a redirect, not deleted | The Jekyll site needs something at that path. Replace content with pointers to halos-spec rather than breaking existing links. |
| D6 | JSON is the single source of truth for principles | `core.json` is authoritative. `PRINCIPLES/halos-principles-v1.0.md` is generated from it. `halos-principles-spec-v1.0.md` is eliminated as redundant. This prevents drift between three manually maintained copies. |
| D7 | Stricter schema wins during reconciliation | `halos-spec` version (`additionalProperties: false`, `minItems: 1`) is more correct. The looser `halos` version allowed invalid documents. |
| D8 | halos.yaml adoption profile gets a formal schema | The primary adoption artifact must be machine-validatable. Schema defined as `halos-profile.schema.json`. |
| D9 | Two-phase adoption: governance then provenance | Phase 1 (halos.yaml, compatibility map, conflicts) is the entry point for every adopter. Phase 2 (provenance records, domain profiles) is deeper integration. Separating them lowers the barrier to entry. |
| D10 | URL serving is not a blocker | DNS CNAMEs provide flexibility to serve from any location. The spec can be served from GitHub raw URLs, GitHub Pages on halos-spec, or the halos Jekyll site. This will be resolved when content is ready, not before. |
| D11 | Governance is split: community in `halos`, spec in `halos-spec` | `halos` owns the proposals process, signatory registry, and community governance (who can propose, how decisions are made). `halos-spec/GOVERNANCE.md` should narrow its scope to spec-specific concerns (schema changes, versioning, release process) and cross-reference `halos` for the broader governance framework. This avoids drift between two nearly-identical documents. |
| D12 | Whitepaper stays in `halos-spec/docs/` | The whitepaper is a formal positioning paper that explains how HALOS integrates with supply chain frameworks (CycloneDX, SLSA, Chainloop). It's normative-adjacent — more than narrative, less than spec. It stays in `docs/` and should be referenced from the README and the adoption guide. The `halos` website can link to it. |

---

## Open Questions

1. **Profile granularity.** Is `software-dev` the right first profile, or should it be narrower (e.g., `git-based-dev` vs `artifact-registry` vs `ci-pipeline`)?

2. **GitHub org.** Both repos are under `northharbor-dev`. Is that the right long-term home, or should there be a `halos-framework` org?

3. **Generation tooling.** Should `generate-principles.js` live in `halos-spec` (simple, self-contained) or should we reuse `halos/scripts/generate-spec.js` (already exists, but creates a cross-repo dependency)?

4. **Whitepaper versioning.** Should the whitepaper be versioned alongside the spec (updated with each release) or treated as a point-in-time document? Currently it references specific spec versions and toolchain integrations that may evolve.

---

## Findings from Review (2026-03-25)

Issues discovered during plan review that informed the decisions above:

1. **Two copies of the principles schema have drifted.** `halos-spec/schemas/halos-principles-v1.0.schema.json` is stricter than `halos/spec/schema/core.schema.json`. → D7

2. **No schema for `halos.yaml`.** The adoption profile format was invented ad-hoc in `northharbor-ai` with no formal definition. → D8

3. **Adoption flow never surfaces provenance.** The agent prompt generates governance artifacts but doesn't introduce `.halos.json` provenance records — the implementation mechanism for CORE-3 and CORE-4. → D9

4. **Principles exist in three representations.** Prose markdown, structured markdown, and JSON — all manually maintained, already diverging. → D6

5. **`manifest.json` source links point to the Jekyll site.** `core.json` has `source` fields like `/principles.html#1-human-primacy` which assume the `halos` Jekyll site. These need updating when `core.json` moves to `halos-spec`. → Phase 2 work item

6. **GOVERNANCE.md is duplicated across repos.** Nearly identical content in both `halos` and `halos-spec`, with no cross-reference or scope distinction. Risk of independent drift. → D11

7. **Whitepaper is orphaned.** `docs/whitepaper.md` is a substantive positioning paper but isn't referenced from the README, adoption guide, or any discovery file. → D12

---

## References

- [Migration notes](../docs/migration-notes.md) — history of the initial spec extraction
- [HALOS-ADOPTION.md in northharbor-ai](https://github.com/northharbor-ai/northharbor-ai) — first adoption (private)
- [HALOS-NEXT-STEPS.md in northharbor-ai](https://github.com/northharbor-ai/northharbor-ai) — Step 4 proposals from first adoption
