# HALOS Terminology

This document defines the core terms used across HALOS specifications.

Clarity in terminology is essential to ensure consistency across implementations, discussions, and future evolution.

> **Guiding principle:** Provenance is not just history — it is **accountability over time.**

---

## Core Layers

### HALOS Principles

The governance framework defining:

* Human primacy
* Ethical constraints
* Attribution expectations
* Transparency requirements

The principles are the normative foundation — they change slowly and anchor everything else.

---

### HALOS Provenance

The structured representation of:

* How an artifact was created
* How it evolved over time
* Who (human and AI) contributed
* How decisions were made

This is the technical layer — it evolves as the spec matures.

---

### HALOS Attestation

A concrete, machine-readable artifact containing HALOS metadata.

Attestation is what makes provenance actionable. Without it, provenance is institutional knowledge — valuable, but not verifiable and not automatable.

Typically embedded in:

* CycloneDX SBOMs
* SLSA provenance documents

---

## Core Concepts

### Artifact

A digital output or asset.

Examples:

* source code
* document
* model output
* design file
* dataset
* build artifact

HALOS does not prescribe what deserves a provenance record. That is a governance decision — but the spec can describe anything digital.

---

### Provenance

The complete history of an artifact — not just what happened, but who was accountable at each step.

Provenance is the broadest concept in HALOS. It encompasses everything about how an artifact came to exist: who created it, what tools and AI systems were involved, what decisions shaped it, who reviewed it, and under what governance policies it was produced.

Provenance includes:

* origin
* transformations
* contributors
* approvals
* decisions and their rationale
* governance policy references

**Related standards:** W3C PROV defines provenance broadly as "information about entities, activities, and people involved in producing a piece of data." HALOS aligns with this model and adds structured fields for AI involvement, human review, and governance policy references.

---

### Lineage

The sequence or graph of transformations that an artifact undergoes — how it came to be in its current form.

Lineage answers:

> How did this artifact come to be?

Lineage is a narrower concept than provenance. Where provenance is the full story, lineage is specifically the chain of transformations. Two artifacts can share the same lineage (same transformation steps) but have very different provenance (different people responsible, different governance policies, different review processes).

In HALOS, the graph model (v0.2+) represents lineage through **Activities** (the transformations) and **Relationships** (how they connect). Relationship types like `derived_from`, `wasGeneratedBy`, and `wasRevisionOf` are the vocabulary for expressing lineage within a provenance record. Lineage is not a separate record — it is the structural backbone of provenance.

---

### Provenance vs. Lineage

The distinction between provenance and lineage becomes important when:

* **Multiple people contribute at different stages.** Lineage shows the transformation chain; provenance shows who was accountable at each step.
* **AI is involved.** Lineage might show "generate → edit → review." Provenance adds that a specific model was used for generation, the human modified its output, and a reviewer verified the result.
* **Governance or compliance is required.** An auditor cares about provenance — not just what steps happened, but who authorized them and under what policy.
* **Decisions shaped the artifact.** Decision provenance records *why* an approach was chosen. Decisions are part of provenance, not lineage.

| Aspect | Lineage | Provenance |
| --- | --- | --- |
| **Answers** | "How was this built?" | "Who is accountable, and how did this come to exist?" |
| **Scope** | Transformation steps | Full history including people, decisions, governance, and review |
| **Relation** | A component of provenance | The whole picture |

---

### Human Author

The primary accountable human entity responsible for an artifact.

May be:

* an individual
* a team
* an organization

The key word is *accountable* — the human author is not necessarily the person who typed every line, but the person (or group) who directed the work and takes responsibility for the result.

---

### AI Assistance

Any use of an AI system that contributes materially to an artifact.

Examples:

* code generation
* content drafting
* analysis or summarization
* review or suggestion

HALOS records *which* model was used, *what role* it played, and *how the human responded* to its output — not to judge, but to make the nature of the collaboration visible.

---

### Review

A human evaluation step applied to an artifact.

HALOS treats review as a first-class concept because it is the primary mechanism through which humans exercise judgment over AI-assisted work.

Key requirement:

* critical outputs must have explicit human approval

---

### Governance

The set of rules, policies, or principles used to evaluate an artifact.

Governance in HALOS is not abstract — it is a concrete reference in the provenance record. An artifact can cite multiple governance policies simultaneously.

Examples:

* alignment checks
* safety constraints
* policy compliance

This answers the question auditors and stakeholders care about: *"Under what rules was this work done?"*

---

## v0.2 Graph Concepts

### Entity

A thing that exists within the system. Entities are the nouns of provenance.

Examples:

* human
* AI model
* artifact
* policy
* organization

---

### Activity

An action performed over time. Activities are the verbs.

Examples:

* create
* generate
* modify
* review
* approve
* deploy

---

### Relationship

A connection between entities and/or activities. Relationships are the connective tissue that turns isolated facts into a traceable story.

Examples:

* authored_by
* generated_with
* derived_from
* reviewed_by
* approved_by

---

## Conceptual Model

HALOS models systems as:

* **Entities** (who/what)
* **Activities** (what happened)
* **Relationships** (how they connect)

This enables:

* **Traceability** — follow the chain from any artifact back to its origins
* **Accountability** — identify who was responsible at each step
* **Auditability** — verify that governance requirements were met
* **Visualization** — render collaboration histories as navigable graphs

---

## Key Distinction

| Term        | Meaning                                          |
| ----------- | ------------------------------------------------ |
| Provenance  | Full history + accountability                    |
| Lineage     | Sequence/graph of transformations                |
| Attestation | Verifiable, machine-readable provenance record   |

---

## Evolution

Terminology will evolve through:

* proposal
* discussion
* versioned updates

Changes must preserve clarity and backward compatibility where possible.
