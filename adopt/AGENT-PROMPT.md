# HALOS Adoption — Agent Prompt

This prompt enables an AI agent to adopt HALOS principles into any repository. It implements Phase 1 (Governance) of the [HALOS Adoption Guide](GUIDE.md).

---

## Instructions

You are adopting HALOS (Human-Agent Lineage and Origin Standard) into a repository. HALOS defines principles for human-agent collaboration: attribution, provenance, transparency, and human primacy.

### What you need

Fetch these files from the halos-spec repository before starting:

1. **Principles** — `spec/principles/v1.0.md` (read for full context)
2. **Schema** — `spec/schema/halos-profile.schema.json` (validate your output)
3. **Templates** — `adopt/templates/` (starting points for each artifact)

### What you produce

Generate four artifacts, presenting each for human review before finalizing:

#### 1. `halos.yaml`

A governance profile declaring how this repository adopts HALOS. Use the template at `adopt/templates/halos.yaml`.

- Set `metadata.name` to the project/repo name
- Set `metadata.adoptionModel` to `brownfield` (existing repo) or `greenfield` (new repo)
- Set `metadata.maturity` to `experimental`
- For each principle in `spec.principles`, assess the repo and set to `required`, `encouraged`, `recommended`, `optional`, or `not_applicable`
- List existing agents in `spec.agentModel.existingAgents` (look for AGENTS.md, CLAUDE.md, .cursor/rules/, or similar)
- Map existing governance artifacts in `spec.compatibility.existingMappings`
- Validate the result against `spec/schema/halos-profile.schema.json`

#### 2. `HALOS-ADOPTION.md`

A human-readable document explaining this repo's HALOS adoption. Use the template at `adopt/templates/HALOS-ADOPTION.md`.

- Describe the repo context
- State adoption principles (human primacy, additive-first, conflict transparency)
- Define agent expectations (what's allowed, what needs review, what needs human decision)
- Include the conflict handling template

#### 3. `HALOS-COMPATIBILITY-MAP.md`

Scan the repository and map every significant governance, agent, policy, and infrastructure artifact to its HALOS concept.

For each artifact, assess:
- Full alignment (existing artifact satisfies HALOS concept)
- Partial alignment (gaps noted)
- Gap (no current repo equivalent)

Organize by HALOS domain:
1. Agent behavior contracts
2. Agent capabilities
3. Governance policies
4. Decision provenance
5. Data provenance and traceability
6. Infrastructure and deployment

End with a summary coverage matrix.

#### 4. `HALOS-CONFLICT-REGISTER.md`

For each gap or partial alignment found in the compatibility map, create a conflict entry:

```
## CONFLICT-NNN: <title>

**Severity:** Low | Medium | High
**Status:** Open

### Current repo behavior
<what the repo does today>

### HALOS-preferred behavior
<what HALOS principles suggest>

### Why this matters
<impact of the gap>

### Options
A. Keep current behavior (document divergence)
B. Add HALOS overlay (non-enforcing)
C. Partial migration
D. Full adoption

**Recommended:** <lowest-risk option>

**Human decision required.**

**Resolution:** *(record decision here)*
```

### Constraints

- **Do not modify existing files** unless explicitly approved by a human
- **Do not enforce anything** — this is visibility only
- **Do not resolve conflicts silently** — all conflicts must be surfaced for human decision
- **Present all artifacts for human review** before committing
- All changes must be **additive and non-disruptive**

### After completion

Summarize:
1. What was created
2. Coverage assessment (strong / partial / gap by domain)
3. Number and severity of conflicts found
4. What human decisions are needed
5. Pointer to Phase 2 (provenance) when ready: see `spec/provenance/v0.1.md` and `profiles/`
