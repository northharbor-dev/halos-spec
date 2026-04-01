# Generate a HALOS Domain Example

This is an interactive agent prompt for generating new domain examples for the HALOS provenance specification. It can be invoked directly or via the `/generate-example` Claude Code skill.

---

## Step 1: Select a domain

Read `examples/domains.json` and present the user with available domains (those with `"status": "available"`).

Display them as a numbered list with name and description. Ask the user to pick one, or propose a new domain not in the catalog.

If the user proposes a new domain, confirm the name, slug, and a brief description before proceeding.

---

## Step 2: Read the spec and references

Fetch and read the following files before generating:

1. **Provenance spec (v0.3):** `spec/provenance/v0.3.md` — defines the multi-policy governance change; also read `spec/provenance/v0.2.md` for the full graph model, decisions, interactions, and policy evaluations
2. **Provenance schema (v0.3):** `spec/schema/halos-provenance-v0.3.schema.json` — your JSON record must validate against this
3. **Principles:** `spec/principles/v1.0.md` — understand the eight HALOS principles
4. **Terminology:** `spec/terminology.md` — use canonical terms
5. **Reference example (narrative):** `examples/enterprise-software-development.md` — follow this structure
6. **Reference example (record):** `examples/enterprise-software-development.halos.json` — follow this JSON structure
7. **Domain catalog:** `examples/domains.json` — check existing names to avoid reuse

---

## Step 3: Generate the example

Produce two files in the `examples/` directory:

### 3a. Narrative document (`{domain-slug}.md`)

Structure:

```
# HALOS Example: {Domain Name}

## 1. Scenario
- Domain, who the person is, what they're trying to accomplish
- How AI is used (specific, bounded tasks)
- Where human judgment is required (and why AI can't substitute)
- A decision point with real consequences

## 2. Collaboration Narrative
- Step-by-step account of the work (6-10 steps)
- At each step: what AI contributed, what the human did with it
- At least one step where AI output is rejected or substantially modified
- At least one step where AI output is accepted with rationale
- Specific, concrete details (not generic descriptions)

## 3. Artifact Description
- What was created
- How it is used
- What happens if it is wrong (concrete, domain-specific consequences)

## 4. HALOS v0.3 Record (JSON)
- Link to the companion .halos.json file

## 5. AIVSS-Style Interpretation
- Data Provenance
- Transparency / Explainability
- Accountability
- Human Oversight
- Decision Criticality
- Societal / Operational Impact

## 6. AIUC-1 Classification
- Use Type (Assistive or Decision-Support)
- Impact Level (Low / Moderate / High)
- Human Involvement description

## 7. Crosswalk to Frameworks
- NIST AI RMF (Govern, Map, Measure, Manage)
- ISO/IEC 42001 (Auditability, Responsibility Tracking, Process Transparency)
- CycloneDX (optional — how HALOS complements if relevant)
```

### 3b. Provenance record (`{domain-slug}.halos.json`)

A valid v0.3 HALOS provenance record containing:

- **Required fields:** `halos_version`, `artifact`, `human_author`, `ai_assistance`, `timestamp`
- **Review chain:** at least 2 reviewers with different roles
- **Governance:** array of policy references relevant to the domain (at least one; include multiple when the artifact falls under concurrent policies)
- **Decisions:** 2-3 decisions with full context, AI inputs, rationale, and outcomes (mix of accepted/rejected)
- **Graph:** entities (people, agents, artifacts, organizations), activities (with interaction semantics), and relationships (W3C PROV-aligned types)
- **Policy evaluations:** 2-4 evaluations including at least one by a human and one by a tool

### Constraints

**Fictional content only:**
- All person names must be fictional and diverse in gender, cultural origin, and professional background
- All organizations must be fictional
- All URLs must use `.example` domains (e.g., `github.example.com`, `org.example`)
- Do not reuse names from existing examples (check `examples/domains.json` for names already used)
- Real tools and standards (Anthropic, Snyk, OWASP, etc.) may be referenced in their actual capacity

**Quality requirements:**
- The scenario must be realistic and domain-specific — not a generic "person uses AI to do thing"
- The collaboration narrative must show genuine human judgment, not rubber-stamping
- At least one decision must involve rejecting or substantially modifying AI output with specific, domain-grounded rationale
- The narrative should demonstrate why the human's contribution matters — what would go wrong without it
- Concrete details matter: use realistic quantities, timelines, regulations, and professional standards from the domain
- AI tool names should be realistic — use real tools (Claude, GPT, Copilot) or clearly fictional branded tools (not generic "AI assistant")

**Technical requirements:**
- The `.halos.json` must validate against `spec/schema/halos-provenance-v0.3.schema.json`
- Use `halos_version: "0.3"`
- Graph entity IDs should use `urn:entity:` prefix, activity IDs `urn:activity:`, decision IDs `urn:decision:`
- Timestamps must be valid ISO 8601
- Relationship types must be from the v0.2 spec: `wasGeneratedBy`, `wasAttributedTo`, `used`, `wasAssociatedWith`, `wasDerivedFrom`, `actedOnBehalfOf`, `wasInformedBy`
- Interaction types: `suggestion`, `generation`, `transformation`, `analysis`, `review`
- Human responses: `accepted`, `modified`, `rejected`, `partial`, `pending`

---

## Step 4: Generate self-provenance record

Create a provenance record for the generation process itself in `examples/provenance/{domain-slug}-generation.halos.json`.

This is a real (not fictional) HALOS record documenting the human-AI collaboration that produced the example:

- **`human_author`:** the person who invoked the generation (ask for their name and identifier if not known)
- **`ai_assistance`:** the model that generated the example, role: `generation`, taskType: `scaffolding`
- **`artifact`:** the example files that were created
- **`governance`:** `[{ "policy": "HALOS", "version": "1.0", "url": "https://halos.northharbor.dev" }]`
- **`decisions`:** domain selection and any modifications the human made to the AI output
- **`notes`:** "Self-provenance record for example generation. Created by GENERATE-EXAMPLE.md workflow."

---

## Step 5: Update the catalog and stage

1. **Update `examples/domains.json`** — set the domain's status to `"implemented"`, fill in `lead`, `leadRole`, `keyDecision`, `files`, and `added` fields
2. **Update `examples/README.md`** — add the new example to the domain examples table, maintaining alphabetical order by domain
3. **Run `npm test`** to validate the `.halos.json` against the schema and all semantic checks. If validation fails:
   - Check the error message — it will tell you exactly which field or value is invalid
   - If the failure is due to a value not in the schema's enum (e.g., a new artifact type or relationship type), this may be a valid **spec proposal**. Tell the user and suggest opening a GitHub issue describing the use case.
4. **Stage all new and modified files** with `git add`
5. **Summarize** what was created: domain, lead character, key decision, files produced

Tell the user the files are staged and ready. They can review with `git diff --cached`, commit, and open a PR when satisfied.
