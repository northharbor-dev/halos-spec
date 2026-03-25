# CLAUDE.md — halos-spec

This file provides guidance for AI assistants working in this repository.

---

## What This Repository Is

**halos-spec** is the canonical standards repository for the HALOS framework — Human–Agent Lineage and Origin Standard. HALOS defines how to describe, record, and verify the provenance of work created through human–AI collaboration.

This is a **specification and documentation repository**, not a software package. There is no `package.json`, no build output, and no deployable artifact. The primary outputs are:
- Normative specification documents (Markdown)
- JSON Schemas (for validation of provenance records and adoption profiles)
- Adoption tooling (templates, guides, agent prompts)

---

## Repository Structure

```
halos-spec/
├── spec/                                    # All specification content
│   ├── core.json                            # SOURCE OF TRUTH for HALOS principles
│   ├── manifest.json                        # Spec manifest and metadata
│   ├── changelog.json                       # Versioning changelog
│   ├── terminology.md                       # Canonical term definitions
│   ├── CANONICAL.md                         # Canonicity notes
│   ├── principles/
│   │   └── v1.0.md                          # DO NOT EDIT — generated from spec/core.json
│   ├── provenance/
│   │   ├── v0.1.md                          # Active provenance spec
│   │   └── v0.2-draft.md                    # Graph model (draft)
│   └── schema/                              # JSON Schemas (Draft 2020-12)
│       ├── core.schema.json                 # Validates spec/core.json
│       ├── halos-profile.schema.json        # Validates halos.yaml adoption profiles
│       ├── halos-provenance-v0.1.schema.json
│       ├── halos-provenance-v0.2-draft.schema.json
│       ├── manifest.schema.json
│       ├── changelog.schema.json
│       └── extension.schema.json
│
├── examples/                                # Provenance record examples
│   ├── minimal.json                         # Standalone record — validated by CI
│   └── embedded/                            # Embedded in other standards (not CI-validated)
│       ├── cyclonedx.json                   # HALOS inside a CycloneDX SBOM
│       └── slsa.json                        # HALOS as a SLSA predicate
│
├── adopt/                                   # Adoption toolkit
│   ├── GUIDE.md                             # Step-by-step adoption guide
│   ├── AGENT-PROMPT.md                      # Agent-executable adoption prompt
│   └── templates/
│       ├── halos.yaml                       # Governance profile template
│       ├── HALOS-ADOPTION.md                # Adoption narrative template
│       └── HALOS-CONFLICT-REGISTER.md       # Conflict tracking template
│
├── profiles/                                # Domain-specific implementation profiles
│   └── software-dev/                        # Git-based development profile
│       ├── README.md
│       └── profile.yaml
│
├── mappings/                                # Integration with external standards
│   ├── cyclonedx-slsa.md                   # CycloneDX and SLSA integration
│   └── enforcement-tooling.md              # Policy enforcement tool analysis
│
├── docs/                                    # Supplementary documentation
│   ├── explainer.md                         # Plain-language intro
│   └── migration-notes.md                   # Migration history
│
├── scripts/
│   ├── generate-principles.js              # Generates spec/principles/ from spec/core.json
│   └── validate.js                         # JSON Schema validator (used by CI)
│
├── plans/                                   # Active work plans
│
├── .github/
│   ├── workflows/validate.yml               # CI validation pipeline
│   └── ISSUE_TEMPLATE/spec_change.md
│
├── FOR_AGENTS.md                            # Entry point for agents adopting HALOS externally
├── README.md
├── GOVERNANCE.md
├── CONTRIBUTING.md
└── LICENSE                                  # CC-BY-4.0
```

---

## Critical Rule: Generated Files

**`spec/principles/v1.0.md` is generated — never edit it directly.**

The file is generated from `spec/core.json` by running:

```bash
node scripts/generate-principles.js
```

This is enforced by CI. If you modify `spec/core.json`, you must also regenerate the principles file. The CI pipeline will fail if the generated file is stale.

**The source of truth hierarchy:**
- `spec/core.json` → defines the 8 HALOS principles (normative)
- `spec/principles/v1.0.md` → generated human-readable rendering

---

## Development Workflow

### Making Changes to Principles

1. Edit `spec/core.json` (this is the only place principles are defined)
2. Run `node scripts/generate-principles.js` to regenerate the markdown
3. Commit both files together

### Making Changes to Schemas

Edit files in `spec/schema/`. Schemas use **JSON Schema Draft 2020-12**.

Validate schemas locally using `ajv-cli`:
```bash
npm install -g ajv-cli
ajv validate --spec=draft2020 -s spec/schema/core.schema.json -d spec/core.json
```

### Making Changes to the Provenance Spec

- Active spec: `PROVENANCE/halos-provenance-spec-v0.1.md`
- Draft graph model: `PROVENANCE/halos-provenance-model-v0.2-draft.md`
- Validate examples after changes: all files in `examples/` are validated against `spec/schema/halos-provenance-v0.1.schema.json`

### Adding Examples

New provenance examples go in `examples/` and must be valid against `spec/schema/halos-provenance-v0.1.schema.json`. The CI pipeline validates all `examples/*.json` files automatically.

---

## CI Pipeline

**`.github/workflows/validate.yml`** runs on every push to `main` and all pull requests.

Steps:
1. Install `ajv-cli` (JSON Schema validator, Node 20)
2. Validate `spec/core.json` against `spec/schema/core.schema.json`
3. Validate all `examples/*.json` against the v0.1 provenance schema
4. Validate `spec/manifest.json` and `spec/changelog.json` against their schemas
5. Re-run `node scripts/generate-principles.js` and check for drift — **fails if `PRINCIPLES/halos-principles-v1.0.md` is out of date**

There is no test suite beyond schema validation. If you add new JSON data files, consider whether they should be validated in CI.

---

## Contribution Conventions

### What Belongs Here

- Specification documents (principles, provenance, terminology)
- JSON Schemas in `spec/schema/`
- Canonical examples in `examples/`
- Adoption toolkit (`adopt/`) — guide, agent prompt, templates
- Domain profiles (`profiles/`)
- Standard mappings (`mappings/`)
- Work plans (`plans/`)

### What Does NOT Belong Here

Site content, narrative essays, blog posts, and organizational content belong in the [HALOS community repository](https://github.com/northharbor-dev/halos), not here.

### Proposal Process

Substantive changes follow an RFC-style proposal process:
1. Open an issue describing the change and motivation
2. Community reviews for principle alignment, clarity, feasibility
3. Open a pull request with proposed changes
4. Maintainer merges with documented rationale

Small fixes (typos, broken links, formatting) can be submitted as direct PRs.

### Principle Changes

Changes to the 8 HALOS principles are held to a **higher bar**:
- Must address a real limitation or error, not preference
- Require broad consensus, not just maintainer approval
- Should be rare — principles are the stable anchor

### Commit Style

Follow the conventional commits pattern used in this repo:
- `feat:` — new content or capabilities
- `fix:` — corrections
- `refactor:` — reorganization without content change
- `docs:` — documentation-only changes
- `chore:` — maintenance tasks

---

## Version Status

| Document | Version | Status |
|----------|---------|--------|
| HALOS Principles | v1.0 | **Stable** — rarely changed |
| HALOS Provenance Spec | v0.1 | **Active** — suitable for use |
| HALOS Provenance Model (graph) | v0.2 | **Draft** — under development |
| HALOS Profile Schema | v1alpha1 | **Active** — validates `halos.yaml` |

---

## Key Concepts

**Two-layer framework:**
- **Principles** — stable governance layer (HALOS-CORE-1 through HALOS-CORE-8); rarely change
- **Provenance** — machine-readable spec layer; records how artifacts were created

**Two-phase adoption:**
- **Phase 1 (Governance):** Create a `halos.yaml` profile, map existing artifacts, surface conflicts. Human decision required.
- **Phase 2 (Provenance):** Add `.halos.json` provenance records; integrate with domain standards (CycloneDX, SLSA)

**Provenance record required fields:**
- `halos_version` — spec version used
- `artifact` — what was created (type + name)
- `human_author` — accountable human author
- `ai_assistance` — AI tools used and their roles
- `timestamp` — ISO 8601

**Artifact types:** `code`, `document`, `dataset`, `model`, `design`, `build`, `other`

**AI roles:** `generation`, `drafting`, `editing`, `review`, `assistance`

---

## Relationship to External Standards

| Standard | Relationship |
|----------|-------------|
| **CycloneDX** | HALOS provenance can be embedded as `component.evidence` within a CycloneDX SBOM |
| **SLSA** | HALOS provenance can supplement a SLSA provenance document |

HALOS does not replace these standards — it adds the human-authorship and AI-disclosure layer that neither currently covers. See `mappings/cyclonedx-slsa.md` for embedding strategies.

---

## Related Repositories

| Repo | Purpose |
|------|---------|
| `northharbor-dev/halos` | Community home — website, proposals, signatory registry |
| `northharbor-dev/halos-spec` | This repo — canonical specs, schemas, adoption toolkit |

---

## License

[CC-BY-4.0](LICENSE) — NorthHarbor Development. Contributions are licensed under the same terms.
