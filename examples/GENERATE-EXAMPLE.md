# Generate a HALOS Domain Example

This is an agent-executable prompt. Point an AI assistant at this file to generate a new domain example for the HALOS provenance specification.

---

## Instructions

You are generating a new domain example for the HALOS specification. Each example demonstrates how HALOS provenance records capture human-AI collaboration in a specific professional domain.

### What you need

Fetch and read the following files before generating:

1. **Provenance spec (v0.2):** `spec/provenance/v0.2.md` — defines the graph model, decisions, interactions, and policy evaluations
2. **Provenance schema (v0.2):** `spec/schema/halos-provenance-v0.2.schema.json` — your JSON record must validate against this
3. **Principles:** `spec/principles/v1.0.md` — understand the eight HALOS principles
4. **Terminology:** `spec/terminology.md` — use canonical terms
5. **Reference example (narrative):** `examples/enterprise-software-development.md` — follow this structure
6. **Reference example (record):** `examples/enterprise-software-development.halos.json` — follow this JSON structure
7. **Existing examples index:** `examples/README.md` — check which domains are already covered

### What you produce

Two files in the `examples/` directory:

#### 1. Narrative document (`{domain-slug}.md`)

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

## 4. HALOS v0.2 Record (JSON)
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

#### 2. Provenance record (`{domain-slug}.halos.json`)

A valid v0.2 HALOS provenance record containing:

- **Required v0.1 fields:** `halos_version`, `artifact`, `human_author`, `ai_assistance`, `timestamp`
- **Review chain:** at least 2 reviewers with different roles
- **Governance:** policy reference relevant to the domain
- **Decisions:** 2-3 decisions with full context, AI inputs, rationale, and outcomes (mix of accepted/rejected)
- **Graph:** entities (people, agents, artifacts, organizations), activities (with interaction semantics), and relationships (W3C PROV-aligned types)
- **Policy evaluations:** 2-4 evaluations including at least one by a human and one by a tool

### Constraints

**Fictional content only:**
- All person names must be fictional and diverse in gender, cultural origin, and professional background
- All organizations must be fictional
- All URLs must use `.example` domains (e.g., `github.example.com`, `org.example`)
- Do not reuse names from existing examples (check `examples/README.md`)
- Real tools and standards (Anthropic, Snyk, OWASP, etc.) may be referenced in their actual capacity

**Quality requirements:**
- The scenario must be realistic and domain-specific — not a generic "person uses AI to do thing"
- The collaboration narrative must show genuine human judgment, not rubber-stamping
- At least one decision must involve rejecting or substantially modifying AI output with specific, domain-grounded rationale
- The narrative should demonstrate why the human's contribution matters — what would go wrong without it
- Concrete details matter: use realistic quantities, timelines, regulations, and professional standards from the domain
- AI tool names should be realistic — use real tools (Claude, GPT, Copilot) or clearly fictional branded tools (not generic "AI assistant")

**Technical requirements:**
- The `.halos.json` must validate against `spec/schema/halos-provenance-v0.2.schema.json`
- Use `halos_version: "0.2-draft"`
- Graph entity IDs should use `urn:entity:` prefix, activity IDs `urn:activity:`, decision IDs `urn:decision:`
- Timestamps must be valid ISO 8601
- Relationship types must be from the v0.2 spec: `wasGeneratedBy`, `wasAttributedTo`, `used`, `wasAssociatedWith`, `wasDerivedFrom`, `actedOnBehalfOf`, `wasInformedBy`
- Interaction types: `suggestion`, `generation`, `transformation`, `analysis`, `review`
- Human responses: `accepted`, `modified`, `rejected`, `partial`, `pending`

### After completion

1. Present both files for human review before committing
2. Verify the `.halos.json` validates against the schema
3. Update `examples/README.md` to add the new example to the domain examples table
4. Summarize: domain covered, lead character, key decision, any notable aspects

---

## Suggested domains not yet covered

- Healthcare / clinical decision support
- Legal / contract review
- Architecture / urban planning
- Agriculture / precision farming
- Financial trading / risk analysis
- Cybersecurity / incident response
- Supply chain / logistics
- Manufacturing / quality control
- Pharmaceutical / drug discovery
- Environmental monitoring / climate science
