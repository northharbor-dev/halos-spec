# HALOS Provenance Model v0.2 — Draft

**Status:** Draft
**Extends:** HALOS Provenance Spec v0.1
**Schema:** [`../schemas/halos-provenance-v0.2-draft.schema.json`](../schemas/halos-provenance-v0.2-draft.schema.json)

> This document describes a proposed extension to v0.1. It is not yet normative. Feedback welcome via issue or pull request.

---

## Motivation

The v0.1 spec records provenance as a flat document: one artifact, one human author, one list of AI contributions. This is sufficient for most cases.

However, some artifacts have complex histories:

- An artifact derived from multiple parent artifacts
- Multiple humans contributing at different stages
- AI used at some stages but not others
- A review chain across multiple reviewers

The v0.2 model addresses this by representing provenance as a **graph** of Entities, Activities, and Relationships — closely aligned with the W3C PROV model and the terminology defined in [`terminology.md`](terminology.md).

---

## Core Concepts

### Entity

A thing that exists and can be described. In HALOS, entities include:

- **Artifact** — a digital output (code, document, dataset, etc.)
- **Person** — a human author, reviewer, or contributor
- **Agent** — an AI model or tool
- **Organization** — a team, company, or institution

### Activity

An action performed over time that used or generated one or more entities. Examples:

- `create` — initial authoring of an artifact
- `generate` — AI generation of an artifact or portion
- `edit` — modification of an existing artifact
- `review` — a human evaluation step
- `approve` — a formal sign-off
- `derive` — producing an artifact from another

### Relationship

A typed connection between entities and/or activities. Examples:

| Relationship | Connects | Meaning |
|---|---|---|
| `wasGeneratedBy` | Artifact → Activity | The artifact was produced by this activity |
| `wasAttributedTo` | Artifact → Person/Agent | The artifact is attributed to this entity |
| `used` | Activity → Artifact | The activity used this artifact as input |
| `wasAssociatedWith` | Activity → Person/Agent | This entity participated in the activity |
| `wasDerivedFrom` | Artifact → Artifact | The artifact was derived from this parent |
| `actedOnBehalfOf` | Agent → Person | The agent acted under direction of this person |

---

## Record Structure (v0.2)

A v0.2 provenance record extends v0.1 with an optional `graph` field.

```json
{
  "halos_version": "0.2-draft",
  "artifact": { ... },
  "human_author": { ... },
  "ai_assistance": [ ... ],
  "timestamp": "...",

  "graph": {
    "entities": [ ... ],
    "activities": [ ... ],
    "relationships": [ ... ]
  }
}
```

### `graph.entities`

Each entity:

```json
{
  "id": "urn:entity:jane-smith",
  "type": "person",
  "label": "Jane Smith",
  "identifier": "https://github.com/janesmith"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Stable local identifier for this entity within the record |
| `type` | string | yes | One of: `artifact`, `person`, `agent`, `organization` |
| `label` | string | yes | Human-readable name |
| `identifier` | string | no | External URI or handle |

### `graph.activities`

Each activity:

```json
{
  "id": "urn:activity:draft-v1",
  "type": "create",
  "startedAt": "2026-03-20T10:00:00Z",
  "endedAt": "2026-03-20T11:30:00Z",
  "description": "Initial draft of the document"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Stable local identifier |
| `type` | string | yes | One of: `create`, `generate`, `edit`, `review`, `approve`, `derive`, `other` |
| `startedAt` | string | no | ISO 8601 start time |
| `endedAt` | string | no | ISO 8601 end time |
| `description` | string | no | Free-text description |

### `graph.relationships`

Each relationship:

```json
{
  "type": "wasAttributedTo",
  "from": "urn:entity:my-document",
  "to": "urn:entity:jane-smith"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | string | yes | Relationship type (see list above) |
| `from` | string | yes | ID of the source entity or activity |
| `to` | string | yes | ID of the target entity or activity |
| `notes` | string | no | Optional context |

---

## Relationship to v0.1

- v0.2 records are a strict superset of v0.1
- The `graph` field is optional; a v0.2 record without `graph` is equivalent to v0.1
- Tools that only understand v0.1 should ignore unknown fields

---

## Open Questions

The following are unresolved and subject to change:

1. **Identifier namespacing** — Should entity IDs be scoped to the record, or globally addressable?
2. **Relationship directionality** — Should `from`/`to` follow PROV conventions exactly, or simplify?
3. **Multi-artifact records** — Should a single record describe multiple artifacts, or require one record per artifact?
4. **Signing** — How should records be signed to enable verification?

Feedback on these questions is welcome via issue.

---

*This draft will become normative once the open questions are resolved and a reference implementation exists.*
