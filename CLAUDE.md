# CLAUDE.md — halos-spec

Claude-specific instructions for this repository. For agent-agnostic guidance that applies to all AI assistants, see `AGENTS.md`.

---

## What This Repository Is

**halos-spec** is the canonical standards repository for the HALOS framework — Human–Agent Lineage and Origin Standard. HALOS defines how to describe, record, and verify the provenance of work created through human–AI collaboration.

This is a **specification and documentation repository**, not a software package. The primary outputs are:
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
│   │   ├── v0.1.md                          # Superseded
│   │   ├── v0.2.md                          # Superseded
│   │   └── v0.3.md                          # Active provenance spec
│   └── schema/                              # JSON Schemas (Draft 2020-12)
│       ├── core.schema.json                 # Validates spec/core.json
│       ├── halos-profile.schema.json        # Validates halos.yaml adoption profiles
│       ├── halos-provenance-v0.1.schema.json
│       ├── halos-provenance-v0.2.schema.json
│       ├── halos-provenance-v0.3.schema.json # Current — all new examples validate against this
│       ├── manifest.schema.json
│       ├── changelog.schema.json
│       └── extension.schema.json
│
├── examples/                                # Provenance record examples
│   ├── README.md                            # Index of all examples
│   ├── GENERATE-EXAMPLE.md                  # Agent prompt for creating new domain examples
│   ├── minimal.json                         # v0.1 minimal record — CI-validated
│   ├── v0.2-graph.json                      # v0.2 full graph example
│   ├── {domain}.md + {domain}.halos.json    # Domain examples (8 domains, narrative + record)
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
├── test/                                    # Automated test suite (node:test)
│   ├── helpers/load-schema.js               # Shared AJV setup
│   ├── schema-validation.test.js            # Valid + invalid record tests
│   ├── enum-coverage.test.js                # Ensures every schema enum is exercised
│   ├── semantic-validation.test.js          # Cross-field consistency checks
│   ├── schema-evolution.test.js             # Version boundary tests
│   └── fixtures/                            # Test data (valid, invalid, semantic)
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

After any schema change, run the test suite to verify nothing breaks:
```bash
npm test
```

### Making Changes to the Provenance Spec

- Active spec: `spec/provenance/v0.3.md`
- All domain examples must validate against `spec/schema/halos-provenance-v0.3.schema.json`
- The test suite automatically validates every `.halos.json` in `examples/` and checks enum coverage

### Adding Examples

New provenance examples go in `examples/`. Any `.halos.json` file added there is **automatically validated** by the test suite — no manual CI configuration needed.

To generate a new domain example, use the agent prompt at `examples/GENERATE-EXAMPLE.md`. Each domain example consists of a narrative `.md` and a provenance `.halos.json` file. See `examples/README.md` for the full index and contribution requirements.

If your example uses a schema value that doesn't exist yet (new artifact type, new relationship type, etc.), the schema validation will fail. This is intentional — it means you may have a valid use case for a **spec proposal**. Open an issue describing the use case and the value you need added.

---

## CI Pipeline

**`.github/workflows/validate.yml`** runs on every push to `main` and all pull requests.

Steps:

1. Install dependencies (Node 20)
2. Validate `spec/core.json` against `spec/schema/core.schema.json`
3. Run the full test suite (`npm test`) — this automatically:
   - Validates all `examples/*.halos.json` against the v0.3 provenance schema
   - Validates all test fixtures (valid pass, invalid reject)
   - Checks that every enum value in the schema is exercised in at least one fixture
   - Runs semantic checks (graph referential integrity, lineage, time ordering)
   - Tests version boundaries between v0.1/v0.2/v0.3 schemas
4. Validate `spec/manifest.json` and `spec/changelog.json` against their schemas
5. Re-run `node scripts/generate-principles.js` and check for drift

**New examples are automatically picked up** — no CI changes needed when adding `.halos.json` files to `examples/`.

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
| HALOS Provenance Spec | v0.3 | **Active** — extends v0.2 with multi-policy governance |
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
