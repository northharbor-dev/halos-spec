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

### v0.2 Draft — Enhanced Provenance Model

The v0.2 draft extends v0.1 with higher-fidelity provenance capabilities while remaining fully backward compatible:

- **Graph model** — represents provenance as Entities, Activities, and Relationships (aligned with W3C PROV concepts)
- **Decision provenance** — first-class tracking of human decisions, including AI inputs, context, and rationale
- **Human–AI interaction semantics** — structured recording of how humans respond to AI output (accepted, modified, rejected)
- **Responsibility modeling** — lightweight roles and delegation on graph entities
- **Policy evaluation traces** — records of automated or manual policy checks (results only, not enforcement)

All v0.2 fields are optional. A v0.2 record without them is equivalent to v0.1. See [`spec/provenance/v0.2-draft.md`](spec/provenance/v0.2-draft.md).

---

## Examples

The [`examples/`](examples/) directory contains provenance records across eight professional domains — education, enterprise software, government policy, journalism, music production, humanitarian aid, critical infrastructure, and scientific research. Each includes a narrative companion explaining the collaboration scenario alongside a machine-readable v0.2-draft provenance record.

See the [examples index](examples/README.md) for the full catalog. To generate a new domain example using an AI assistant, use the [GENERATE-EXAMPLE.md](examples/GENERATE-EXAMPLE.md) agent prompt.

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

## Ecosystem Alignment

HALOS is the **human-centered provenance and accountability layer** — complementary to, not competing with, adjacent standards and frameworks.

| Standard / Framework | Relationship |
|---|---|
| **CycloneDX** | HALOS provenance can be embedded as `component.evidence` within a CycloneDX SBOM. CycloneDX answers "what is in this software?" — HALOS adds "who was responsible and what AI contributed." |
| **SLSA** | HALOS provenance supplements SLSA attestations with human-authorship and AI-disclosure data. SLSA answers "how was it built?" — HALOS adds "what decisions were made and by whom." |
| **AIVSS** | HALOS provides evidence; AIVSS provides risk scoring. HALOS records can serve as input for AIVSS assessments. |
| **NIST AI RMF / ISO 42001** | HALOS operates at the artifact level inside governance framework processes. Organizations following NIST or ISO can use HALOS records to demonstrate traceability. |
| **W3C PROV** | The v0.2 graph model is conceptually aligned with W3C PROV (Entities, Activities, Agents) but uses plain JSON and simplified typing. |

HALOS does not replace these standards. It provides the human-and-AI-specific provenance layer that none of them currently cover.

See [`mappings/cyclonedx-slsa.md`](mappings/cyclonedx-slsa.md) for embedding details.

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
│   ├── README.md                            # Index of all examples
│   ├── GENERATE-EXAMPLE.md                  # Agent prompt for creating new domain examples
│   ├── minimal.json                         # v0.1 minimal record — CI-validated
│   ├── v0.2-graph.json                      # v0.2 with graph, decisions, interactions
│   ├── {domain}.md + {domain}.halos.json    # 8 domain examples (narrative + record)
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
