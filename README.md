# halos-spec

The canonical standards repository for the HALOS framework.

HALOS — **H**uman–**A**gent **L**ineage and **O**rigin **S**tandard — is a framework for attribution, provenance, and ethical accountability in human–agent collaboration.

**For AI agents:** see [FOR_AGENTS.md](FOR_AGENTS.md) to adopt HALOS in any repository.

---

## What Is HALOS?

HALOS defines how to describe, record, and verify the origin of work created through human–AI collaboration. It answers questions like:

- Who is the accountable human author of this artifact?
- What AI systems contributed, and how?
- Was this reviewed by a human before use?
- Can the lineage of this artifact be traced and verified?

HALOS does not define how agents work. It defines how the *provenance* of their output is recorded.

For a plain-language introduction, see the [explainer](docs/explainer.md). For a formal positioning paper, see the [whitepaper](https://github.com/northharbor-dev/halos/blob/main/docs/whitepaper.md) (hosted on the HALOS site).

---

## Two Layers

### Principles

The HALOS Principles are the stable, normative foundation. They define the values that all HALOS-conformant implementations must reflect:

- Human primacy
- Attribution and provenance
- Transparency of AI involvement
- Ethical guardrails

See [`spec/principles/v1.0.md`](spec/principles/v1.0.md)

### Provenance

The HALOS Provenance Spec defines the structure for recording *how an artifact was created*. It is the primary mechanism for implementing HALOS-CORE-3 and HALOS-CORE-4.

A provenance record captures:
- The artifact being described
- The human author(s)
- AI assistance used
- Human review steps
- Governance policy references

See [`spec/provenance/v0.1.md`](spec/provenance/v0.1.md)

---

## Adopting HALOS

To adopt HALOS into your repository:

1. Read the [adoption guide](adopt/GUIDE.md)
2. Or point an agent at [adopt/AGENT-PROMPT.md](adopt/AGENT-PROMPT.md) to automate Phase 1
3. Use the [templates](adopt/templates/) as starting points
4. Validate your `halos.yaml` against the [profile schema](spec/schema/halos-profile.schema.json)

Adoption has two phases:
- **Phase 1: Governance** — create a `halos.yaml` profile, map existing artifacts, surface conflicts
- **Phase 2: Provenance** — add `.halos.json` provenance records, integrate with domain standards

---

## Domain Profiles

Profiles map HALOS principles to domain-specific toolchains:

| Profile | Domain | Status |
|---|---|---|
| [software-dev](profiles/software-dev/) | Git-based development (SLSA, CycloneDX, Chainloop) | Stub |

See [profiles/](profiles/) for details on creating or using profiles.

---

## Relationship to CycloneDX and SLSA

HALOS provenance records are designed to be embedded in or alongside existing supply chain standards:

| Standard | Relationship |
|---|---|
| **CycloneDX** | HALOS provenance can be embedded as a `component.evidence` property within a CycloneDX SBOM |
| **SLSA** | HALOS provenance can supplement a SLSA provenance document with human-authorship and AI-disclosure fields |

HALOS does not replace these standards. It adds the human-and-AI-specific provenance layer that neither standard currently covers.

See [`mappings/cyclonedx-slsa.md`](mappings/cyclonedx-slsa.md) for details.

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
│   │   └── v1.0.md                          # DO NOT EDIT — generated from core.json
│   ├── provenance/
│   │   ├── v0.1.md                          # Active provenance spec
│   │   └── v0.2-draft.md                    # Graph model (draft)
│   └── schema/                              # JSON Schemas (Draft 2020-12)
│       ├── core.schema.json
│       ├── halos-profile.schema.json
│       ├── halos-provenance-v0.1.schema.json
│       ├── halos-provenance-v0.2-draft.schema.json
│       ├── manifest.schema.json
│       ├── changelog.schema.json
│       └── extension.schema.json
│
├── examples/                                # Provenance record examples
│   ├── minimal.json                         # Standalone — validated by CI
│   └── embedded/                            # Embedded in other standards
│       ├── cyclonedx.json                   # HALOS inside a CycloneDX SBOM
│       └── slsa.json                        # HALOS as a SLSA predicate
│
├── adopt/                                   # Adoption toolkit
│   ├── GUIDE.md
│   ├── AGENT-PROMPT.md
│   └── templates/
│       ├── halos.yaml
│       ├── HALOS-ADOPTION.md
│       └── HALOS-CONFLICT-REGISTER.md
│
├── profiles/                                # Domain-specific implementation profiles
│   └── software-dev/
│
├── mappings/                                # Integration with external standards
│   ├── cyclonedx-slsa.md
│   └── enforcement-tooling.md
│
├── docs/                                    # Supplementary documentation
│   ├── explainer.md
│   └── migration-notes.md
│
├── scripts/
│   ├── generate-principles.js              # Generates spec/principles/ from spec/core.json
│   └── validate.js                         # JSON Schema validator (used by CI)
│
├── plans/                                   # Active work plans
│
├── .github/
│   └── workflows/validate.yml              # CI validation pipeline
│
├── FOR_AGENTS.md
├── README.md
├── GOVERNANCE.md
├── CONTRIBUTING.md
└── LICENSE                                  # CC-BY-4.0
```

---

## Version Status

| Document | Version | Status |
|---|---|---|
| HALOS Principles | v1.0 | Stable |
| HALOS Provenance Spec | v0.1 | Active |
| HALOS Provenance Model (graph) | v0.2 | Draft |
| HALOS Profile Schema | v1alpha1 | Active |

---

## Related Repositories

| Repo | Purpose |
|---|---|
| [northharbor-dev/halos](https://github.com/northharbor-dev/halos) | Community home — website, narrative, proposals, signatory registry |
| northharbor-dev/halos-spec (this repo) | Canonical standards — specs, schemas, adoption toolkit, profiles |

---

## License

[CC-BY-4.0](LICENSE) — NorthHarbor Development
