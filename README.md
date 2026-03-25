# halos-spec

The canonical standards repository for the HALOS framework.

HALOS — **H**uman–**A**gent **L**ineage and **O**rigin **S**tandard — is a framework for attribution, provenance, and ethical accountability in human–agent collaboration.

---

## What Is HALOS?

HALOS defines how to describe, record, and verify the origin of work created through human–AI collaboration. It answers questions like:

- Who is the accountable human author of this artifact?
- What AI systems contributed, and how?
- Was this reviewed by a human before use?
- Can the lineage of this artifact be traced and verified?

HALOS does not define how agents work. It defines how the *provenance* of their output is recorded.

---

## Two Layers

### Principles

The HALOS Principles are the stable, normative foundation. They define the values that all HALOS-conformant implementations must reflect:

- Human primacy
- Attribution and provenance
- Transparency of AI involvement
- Ethical guardrails

See [`PRINCIPLES/halos-principles-v1.0.md`](PRINCIPLES/halos-principles-v1.0.md)

The principles spec formalizes these into machine-readable requirements (HALOS-CORE-1 through HALOS-CORE-8).

See [`PRINCIPLES/halos-principles-spec-v1.0.md`](PRINCIPLES/halos-principles-spec-v1.0.md)

### Provenance

The HALOS Provenance Spec defines the structure for recording *how an artifact was created*. It is the primary mechanism for implementing HALOS-CORE-3 and HALOS-CORE-4.

A provenance record captures:
- The artifact being described
- The human author(s)
- AI assistance used
- Human review steps
- Governance policy references

See [`PROVENANCE/halos-provenance-spec-v0.1.md`](PROVENANCE/halos-provenance-spec-v0.1.md)

---

## Relationship to CycloneDX and SLSA

HALOS provenance records are designed to be embedded in or alongside existing supply chain standards:

| Standard | Relationship |
|---|---|
| **CycloneDX** | HALOS provenance can be embedded as a `component.evidence` property within a CycloneDX SBOM |
| **SLSA** | HALOS provenance can supplement a SLSA provenance document with human-authorship and AI-disclosure fields |

HALOS does not replace these standards. It adds the human-and-AI-specific provenance layer that neither standard currently covers.

See [`docs/mapping-cyclonedx-slsa.md`](docs/mapping-cyclonedx-slsa.md) for details.

---

## Repository Structure

```
halos-spec/
├── PRINCIPLES/                         # HALOS Principles (stable)
│   ├── halos-principles-v1.0.md        # Human-readable principles
│   └── halos-principles-spec-v1.0.md   # Machine-readable requirements
│
├── PROVENANCE/                         # HALOS Provenance Spec
│   ├── halos-provenance-spec-v0.1.md   # Provenance spec (current)
│   ├── halos-provenance-model-v0.2-draft.md  # Graph model (draft)
│   └── terminology.md                  # Canonical term definitions
│
├── schemas/                            # JSON Schemas
│   ├── halos-principles-v1.0.schema.json
│   ├── halos-provenance-v0.1.schema.json
│   └── halos-provenance-v0.2-draft.schema.json
│
├── examples/                           # Valid provenance records
│   ├── minimal.json
│   ├── cyclonedx-embedded.json
│   └── slsa-embedded.json
│
├── docs/                               # Supplementary documentation
│   ├── explainer.md
│   ├── mapping-cyclonedx-slsa.md
│   └── migration-notes.md
│
├── README.md
├── GOVERNANCE.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## Version Status

| Document | Version | Status |
|---|---|---|
| HALOS Principles | v1.0 | Stable |
| HALOS Principles Spec | v1.0.0 | Stable |
| HALOS Provenance Spec | v0.1 | Active |
| HALOS Provenance Model (graph) | v0.2 | Draft |

---

## License

[CC-BY-4.0](LICENSE) — NorthHarbor Development
