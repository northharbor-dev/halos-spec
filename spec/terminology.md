# HALOS Terminology

This document defines the core terms used across HALOS specifications.

Clarity in terminology is essential to ensure consistency across implementations, discussions, and future evolution.

---

## Core Layers

### HALOS Principles

The governance framework defining:

* Human primacy
* Ethical constraints
* Attribution expectations
* Transparency requirements

---

### HALOS Provenance

The structured representation of:

* How an artifact was created
* How it evolved over time
* Who (human and AI) contributed
* How decisions were made

---

### HALOS Attestation

A concrete, machine-readable artifact containing HALOS metadata.

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

---

### Provenance

The complete history of an artifact, including:

* origin
* transformations
* contributors
* approvals

---

### Lineage

The sequence or graph of transformations that an artifact undergoes.

Lineage answers:

> How did this artifact come to be?

---

### Human Author

The primary accountable human entity responsible for an artifact.

May be:

* an individual
* a team
* an organization

---

### AI Assistance

Any use of an AI system that contributes materially to an artifact.

Examples:

* code generation
* content drafting
* analysis or summarization
* review or suggestion

---

### Review

A human evaluation step applied to an artifact.

Key requirement:

* critical outputs must have explicit human approval

---

### Governance

The set of rules, policies, or principles used to evaluate an artifact.

Examples:

* alignment checks
* safety constraints
* policy compliance

---

## v0.2 Graph Concepts

### Entity

A thing that exists within the system.

Examples:

* human
* AI model
* artifact
* policy
* organization

---

### Activity

An action performed over time.

Examples:

* create
* generate
* modify
* review
* approve
* deploy

---

### Relationship

A connection between entities and/or activities.

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

* traceability
* accountability
* auditability
* visualization

---

## Key Distinction

| Term        | Meaning                           |
| ----------- | --------------------------------- |
| Provenance  | Full history + accountability     |
| Lineage     | Sequence/graph of transformations |
| Attestation | Verifiable record of provenance   |

---

## Guiding Principle

> Provenance is not just history — it is **accountability over time**

---

## Evolution

Terminology will evolve through:

* proposal
* discussion
* versioned updates

Changes must preserve clarity and backward compatibility where possible.
