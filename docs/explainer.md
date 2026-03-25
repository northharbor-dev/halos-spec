# HALOS Explainer

A plain-language introduction to what HALOS is, why it exists, and how it works.

---

## The Problem

AI tools are now deeply embedded in how people create things — code, documents, designs, analyses. But the artifacts they help produce often carry no record of that involvement.

This creates two related problems:

1. **Attribution is broken.** When AI does significant work, claiming sole human authorship is inaccurate. But there's no standard way to disclose AI involvement alongside human credit.

2. **Accountability is unclear.** If an AI-assisted artifact causes harm or contains an error, it's difficult to trace who directed the work, who reviewed it, and who is responsible.

HALOS addresses both by defining a standard structure for recording how artifacts were created.

---

## What HALOS Is

HALOS is a **framework** and a **specification**.

The **framework** — the Principles — defines values:

- Humans retain authority and accountability
- Ideas and creative contributions have value and deserve attribution
- AI involvement must be disclosed
- Governance should be lightweight but explicit

The **specification** — the Provenance Spec — defines structure:

- What fields a provenance record must contain
- How to name the human author
- How to describe AI contributions
- How to record human review
- How to embed records in other standards

---

## What HALOS Is Not

HALOS is not:

- A tool or platform — it's a spec, like JSON Schema or OpenAPI
- An AI detection system — it relies on honest disclosure, not detection
- A replacement for CycloneDX or SLSA — it adds a layer they don't cover
- A legal framework — it's a community standard, not a compliance regime

---

## How It Works

### Step 1: Author creates an artifact

A person uses AI assistance (or doesn't) to create something: code, a document, a dataset.

### Step 2: Author writes a provenance record

Using the [HALOS Provenance Spec](../spec/provenance/v0.1.md), they create a `.halos.json` file or embed a `halos:provenance` property in an existing metadata document.

The record states:
- What the artifact is
- Who the accountable human author is
- What AI was used, and how
- Whether a human reviewed it
- What governance policy applies

### Step 3: Record travels with the artifact

The provenance record is stored alongside the artifact — in a repository, an SBOM, a registry, or a provenance document.

### Step 4: Consumers can read it

Anyone who receives the artifact can read the provenance record to understand:
- Whether AI was involved
- Whether a human reviewed it
- Who to contact with questions or concerns

---

## A Minimal Example

```json
{
  "halos_version": "0.1",
  "artifact": {
    "id": "urn:example:my-report-v1",
    "type": "document"
  },
  "human_author": {
    "name": "Jane Smith"
  },
  "ai_assistance": [
    {
      "model": "claude-sonnet-4-6",
      "provider": "Anthropic",
      "role": "drafting",
      "description": "Generated initial draft from an outline provided by the author"
    }
  ],
  "review": [
    {
      "reviewer": "Jane Smith",
      "type": "approval",
      "notes": "Reviewed and substantially revised AI draft before publishing"
    }
  ],
  "timestamp": "2026-03-21T00:00:00Z"
}
```

This record says: Jane Smith is responsible. Claude helped draft it. Jane reviewed and revised it before publishing.

---

## Relationship to Other Standards

HALOS is designed to complement, not compete with, existing standards:

- **CycloneDX** — HALOS provenance can be embedded in an SBOM as a custom property
- **SLSA** — HALOS provenance can be expressed as a SLSA predicate
- **Agent skills / OSSA** — HALOS principles can govern how agents declare and exercise their capabilities
- **APAAI** — HALOS provenance can serve as evidence within an APAAI audit trail

See [`cyclonedx-slsa.md`](../mappings/cyclonedx-slsa.md) for technical mapping details.

---

## Who Is This For?

- **Developers** building tools that use AI assistance and want to record it honestly
- **Organizations** establishing AI governance policies
- **Standards bodies** looking to add human-authorship fields to existing schemas
- **Researchers** studying attribution and provenance in AI-assisted work
- **Anyone** who wants a simple, structured way to say: "here's how this was made"
