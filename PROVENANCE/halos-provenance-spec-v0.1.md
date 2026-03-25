# HALOS Provenance Specification v0.1

**Status:** Active
**Principles anchor:** HALOS-CORE-3, HALOS-CORE-4
**Schema:** [`../schemas/halos-provenance-v0.1.schema.json`](../schemas/halos-provenance-v0.1.schema.json)
**Terminology:** [`terminology.md`](terminology.md)

---

## Purpose

This specification defines the structure of a **HALOS provenance record** — a machine-readable description of how an artifact was created through human–agent collaboration.

A provenance record is not a cryptographic proof. It is a structured, declarative claim that:
- Names the accountable human author
- Discloses AI assistance
- Records human review
- References the governance policy under which the work was produced

Provenance records implement HALOS-CORE-3 (Attribution and Provenance) and HALOS-CORE-4 (Transparency of AI Involvement).

---

## Scope

This spec covers:

- The fields required in a valid HALOS provenance record
- The semantics of each field
- How records may be embedded in CycloneDX or SLSA documents
- Versioning and evolution

This spec does not cover:

- Cryptographic signing or verification of records
- Agent identity or authentication
- Graph-based lineage models (see v0.2 draft)

---

## Record Structure

A HALOS provenance record is a JSON object.

### Required Fields

| Field | Type | Description |
|---|---|---|
| `halos_version` | string | Version of this spec. Must be `"0.1"` |
| `artifact` | object | The thing being described |
| `artifact.id` | string | A stable identifier for the artifact (URI, hash, or name) |
| `artifact.type` | string | Type of artifact. See [Artifact Types](#artifact-types) |
| `human_author` | object | The accountable human entity |
| `human_author.name` | string | Display name of the author |
| `ai_assistance` | array | List of AI contributions. May be empty (`[]`) if no AI was used |
| `timestamp` | string | ISO 8601 datetime when this record was created |

### Optional Fields

| Field | Type | Description |
|---|---|---|
| `artifact.description` | string | Human-readable description of the artifact |
| `artifact.version` | string | Version of the artifact |
| `human_author.identifier` | string | URI or handle that identifies the author (e.g., GitHub username, ORCID) |
| `human_author.role` | string | Role of the author (e.g., `"originator"`, `"reviewer"`, `"editor"`) |
| `review` | array | Human review steps applied to the artifact |
| `governance` | object | Policy reference under which the work was produced |
| `lineage` | array | Parent artifact IDs this artifact was derived from |
| `notes` | string | Free-text notes about provenance |

---

## Field Semantics

### `artifact`

The artifact is the digital output being described. The `id` should be as stable as possible — a content hash, a canonical URI, or a versioned name.

**Artifact Types:**

- `code` — source code file or repository
- `document` — prose document, report, specification
- `dataset` — structured data
- `model` — trained ML model or model artifact
- `design` — design file, diagram, image
- `build` — compiled or packaged build artifact
- `other` — anything not covered above

### `human_author`

The human author is the **accountable** entity — the person who directed, reviewed, and takes responsibility for the artifact. In cases of AI-assisted work, this is the human who exercised judgment over the output.

A single provenance record names one primary human author. If multiple humans contributed, use multiple records or the `lineage` field to chain them.

### `ai_assistance`

Each entry in `ai_assistance` describes one AI contribution to the artifact.

| Field | Type | Required | Description |
|---|---|---|---|
| `model` | string | yes | Name or identifier of the AI model (e.g., `"claude-sonnet-4-6"`) |
| `provider` | string | no | Organization that provides the model (e.g., `"Anthropic"`) |
| `role` | string | yes | How the AI contributed. See [AI Roles](#ai-roles) |
| `description` | string | no | Free-text description of the specific contribution |

**AI Roles:**

- `generation` — AI generated the artifact or a substantial portion of it
- `drafting` — AI produced an initial draft that was significantly revised
- `editing` — AI made edits or improvements to human-authored content
- `review` — AI reviewed or analyzed the artifact
- `assistance` — AI provided suggestions, answers, or support without directly authoring

### `review`

Each entry in `review` describes a human review step.

| Field | Type | Required | Description |
|---|---|---|---|
| `reviewer` | string | yes | Name or identifier of the reviewer |
| `type` | string | yes | Type of review: `"approval"`, `"peer-review"`, `"editorial"`, `"other"` |
| `timestamp` | string | no | ISO 8601 datetime of the review |
| `notes` | string | no | Summary of review findings or outcome |

### `governance`

| Field | Type | Required | Description |
|---|---|---|---|
| `policy` | string | yes | Name or identifier of the governance policy |
| `version` | string | no | Version of the policy |
| `url` | string | no | URL to the policy document |

### `lineage`

An array of artifact IDs that this artifact was derived from. Used to express that an artifact builds on, transforms, or was generated from another artifact.

---

## Minimal Valid Record

```json
{
  "halos_version": "0.1",
  "artifact": {
    "id": "urn:example:my-document-v1",
    "type": "document"
  },
  "human_author": {
    "name": "Jane Smith"
  },
  "ai_assistance": [],
  "timestamp": "2026-03-21T00:00:00Z"
}
```

---

## Embedding

HALOS provenance records are designed to be embedded in or alongside existing standards.

### CycloneDX

Embed as a `component.evidence` property or as a custom property with the key `halos:provenance`.

See [`../examples/cyclonedx-embedded.json`](../examples/cyclonedx-embedded.json).

### SLSA

Add as a `predicate` in a SLSA provenance document with `predicateType` set to `https://halos.northharbor.dev/provenance/v0.1`.

See [`../examples/slsa-embedded.json`](../examples/slsa-embedded.json).

### Standalone

A HALOS provenance record may also exist as a standalone `.halos.json` file alongside the artifact.

---

## Versioning

This is version **0.1** of the provenance spec. It is active and suitable for use.

- `halos_version` in a record must match the spec version it was authored against
- Future versions will be backward-compatible where possible
- Breaking changes will increment the minor version and be announced through the governance process

The graph-based model (Entity/Activity/Relationship) is under development in [`halos-provenance-model-v0.2-draft.md`](halos-provenance-model-v0.2-draft.md).

---

## Conformance

A valid v0.1 provenance record:

1. Is a JSON object
2. Contains all required fields
3. Validates against [`../schemas/halos-provenance-v0.1.schema.json`](../schemas/halos-provenance-v0.1.schema.json)
4. Uses defined enum values for `artifact.type`, `ai_assistance[].role`, and `review[].type`

---

*Changelog and prior versions will be tracked in [`../docs/migration-notes.md`](../docs/migration-notes.md) as the spec evolves.*
