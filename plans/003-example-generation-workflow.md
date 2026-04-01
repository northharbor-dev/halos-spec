# Plan 003: Example Generation Workflow

**Status:** Complete (skill deferred)
**Created:** 2026-03-31
**Completed:** 2026-03-31
**Author:** Bob Hong

---

## Resolved Decisions

1. **`domains.json` location** — `examples/domains.json`. Metadata about examples lives with examples.
2. **Generation provenance location** — `examples/provenance/`. Separate from spec-level provenance in `spec/provenance/records/`.
3. **PR workflow** — Stage and instruct the user. No `gh pr create` — we can't assume the user has the gh CLI installed.
4. **Claude Code skill** — Deferred. Plan is to create a `/generate-example` skill that loads the MD. Blocked by `.claude/` directory write permissions during initial implementation.

---

## Context

The current `GENERATE-EXAMPLE.md` is a monolithic agent prompt that includes a hardcoded list of suggested domains at the bottom. As more examples are added, this approach has problems:

1. **No tracking** — no way to see which domains have been implemented, by whom, or when
2. **Not interactive** — the agent just generates; it doesn't present options or confirm scope with the user
3. **No self-provenance** — the example generation process itself doesn't produce a HALOS provenance record, despite being exactly the kind of human-AI collaboration HALOS is designed to document
4. **PR workflow not integrated** — the prompt ends with "present for review" but doesn't guide the agent through branch creation and PR opening

---

## Proposal

### 1. Extract domain catalog to `examples/domains.json`

A structured file tracking all domains — implemented and available:

```json
{
  "domains": [
    {
      "slug": "enterprise-software-development",
      "name": "Enterprise Software Development",
      "status": "implemented",
      "lead": "Tomoko Hayashi",
      "files": {
        "narrative": "examples/enterprise-software-development.md",
        "record": "examples/enterprise-software-development.halos.json"
      },
      "added": "2026-03-31"
    },
    {
      "slug": "healthcare-clinical",
      "name": "Healthcare / Clinical Decision Support",
      "status": "available",
      "description": "Clinical decision support, diagnostic assistance, treatment planning"
    }
  ]
}
```

Fields:
- `slug` — kebab-case identifier, used for filenames
- `name` — human-readable domain name
- `status` — `implemented` | `available` | `in-progress`
- `lead` — fictional lead character name (for implemented examples)
- `files` — paths to narrative and record files (for implemented examples)
- `added` — date the example was added
- `description` — brief description (for available domains)

### 2. Refactor GENERATE-EXAMPLE.md as an interactive workflow

The agent prompt becomes a multi-step workflow:

1. **Read `domains.json`** and present available domains to the user
2. **User selects a domain** (or proposes a new one)
3. **Update `domains.json`** — set status to `in-progress`
4. **Generate the narrative and provenance record** (existing generation logic)
5. **Generate a provenance record for the generation process itself** — a `.halos.json` documenting this conversation (human author, AI assistance, decisions made about the example)
6. **Update `domains.json`** — set status to `implemented`, fill in lead/files/added
7. **Update `examples/README.md`** — add the new example to the table
8. **Open a PR** via `gh pr create`

### 3. Self-provenance: generate a HALOS record for the generation

Each example generation produces two provenance records:

1. **The example record** (`{domain}.halos.json`) — the fictional provenance for the example scenario (what exists today)
2. **The generation record** (`examples/provenance/{domain}-generation.halos.json`) — a real HALOS provenance record documenting the human-AI collaboration that created the example

The generation record would capture:
- Human author: the person running the generation prompt
- AI assistance: the model that generated the example (role: generation)
- Decisions: domain selection, any modifications to AI output, editorial choices
- Governance: HALOS itself

This is the first concrete instance of HALOS eating its own dogfood at the process level.

---

## Open Questions

1. Should `domains.json` live in `examples/` or at the repo root?
2. Should the generation provenance records live alongside examples or in a separate `provenance/` directory?
3. How much of the PR workflow should be automated vs. left to the user?
4. Should the generation prompt be a Claude Code skill (invocable as `/generate-example`) rather than a markdown file?

---

## Dependencies

- None — this is a workflow improvement, not a spec change
