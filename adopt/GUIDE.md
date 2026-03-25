# HALOS Adoption Guide

How to adopt HALOS principles into an existing or new repository.

This guide is designed for both humans and AI agents. For an agent-executable version of this process, see [AGENT-PROMPT.md](AGENT-PROMPT.md).

---

## Prerequisites

- A repository you want to adopt HALOS in
- Familiarity with the [HALOS Principles](../PRINCIPLES/halos-principles-v1.0.md)
- Access to [spec/core.json](../spec/core.json) for machine-readable requirements (available after Phase 2 spec migration)

---

## Two Phases

HALOS adoption proceeds in two phases. Phase 1 is the entry point for every adopter. Phase 2 is optional deeper integration.

### Phase 1: Governance

Establish a HALOS governance profile for your repository. This is lightweight, non-disruptive, and immediately valuable.

**Outputs:**
- `halos.yaml` — your governance profile (declares how you adopt each principle)
- `HALOS-ADOPTION.md` — human-readable adoption guide for your repo
- `HALOS-COMPATIBILITY-MAP.md` — maps existing repo artifacts to HALOS concepts
- `HALOS-CONFLICT-REGISTER.md` — surfaces gaps and conflicts for human review

**Steps:**

#### Step 1: Create `halos.yaml`

Use the [template](templates/halos.yaml) as a starting point. Customize:

- `metadata.name` — your project name
- `metadata.maturity` — `experimental` for first-time adoption
- `metadata.adoptionModel` — `brownfield` (existing repo) or `greenfield` (new repo)
- `spec.principles` — set each principle to `required`, `encouraged`, `recommended`, `optional`, or `not_applicable`
- `spec.agentModel` — declare your agents and their behavioral constraints
- `spec.compatibility.existingMappings` — map your existing governance artifacts

Validate against the schema: `spec/schema/halos-profile.schema.json`

#### Step 2: Create `HALOS-ADOPTION.md`

Use the [template](templates/HALOS-ADOPTION.md). Document:

- Why you're adopting HALOS
- Your adoption principles (human primacy, additive-first, conflict transparency)
- Agent expectations in your repo
- What agents are allowed, what needs review, what needs human decision

#### Step 3: Generate compatibility map

Scan your repo for existing governance, agent, and policy artifacts. Map each to its HALOS concept:

| HALOS Concept | What to look for |
|---|---|
| Agent behavior contract | CLAUDE.md, AGENTS.md, .cursor/rules/, agent configs |
| Agent capabilities | Skills directories, tool configs, MCP servers |
| Governance policies | Standards docs, linting rules, CI gates |
| Decision provenance | ADRs, decision logs, RFCs |
| Data provenance | Pipeline configs, audit logs, sync mechanisms |
| Infrastructure | Terraform, CI/CD workflows, deployment configs |

Rate each mapping: full alignment, partial alignment, or gap.

#### Step 4: Generate conflict register

For each gap or partial alignment, document:

1. Current repo behavior
2. HALOS-preferred behavior
3. Why it matters
4. Options (A: keep current, B: overlay, C: partial migration, D: full adoption)
5. Recommended option

**All conflicts require human decision.** Agents must not resolve conflicts silently.

#### Step 5: Review

Review the compatibility map and conflict register. At this stage:

- No enforcement — just visibility
- No changes to existing workflows
- Human decides which conflicts to resolve and how

---

### Phase 2: Provenance

Add provenance tracking for artifacts produced in your repo. This is where HALOS-CORE-3 (Attribution and Provenance) and HALOS-CORE-4 (Transparency of AI Involvement) become concrete.

**Outputs:**
- `.halos.json` provenance records for significant artifacts
- Integration with domain-appropriate standards (CycloneDX, SLSA, etc.)
- Updated `halos.yaml` with provenance configuration

**Steps:**

#### Step 1: Choose a domain profile

Check [profiles/](../profiles/) for a profile matching your domain (e.g., `software-dev` for SLSA/CycloneDX shops). If none fits, you can create provenance records directly using the [HALOS Provenance Spec](../PROVENANCE/halos-provenance-spec-v0.1.md).

#### Step 2: Create provenance records

For significant artifacts (releases, published documents, key decisions), create a `.halos.json` or embed HALOS provenance in your existing metadata.

See [examples/](../examples/) for minimal, CycloneDX-embedded, and SLSA-embedded provenance records.

#### Step 3: Update governance profile

Update `halos.yaml` to reflect provenance configuration:

```yaml
provenance:
  capture:
    conversations: enabled
    artifacts: enabled      # Upgraded from partial
  requirements:
    labelAIInvolvement: required
    distinguishHumanVsAI: required
```

---

## Brownfield vs Greenfield

**Brownfield** (existing repo): Follow all steps above. The compatibility map is essential — it shows what you already have. Expect conflicts; that's the point. Adopt incrementally.

**Greenfield** (new repo): Skip Step 3 (no existing artifacts to map). Start with `halos.yaml` and `HALOS-ADOPTION.md`. Build with HALOS principles from the start.

---

## Validation

Validate your `halos.yaml` against the schema:

```bash
npx ajv-cli validate --spec=draft2020 \
  -s spec/schema/halos-profile.schema.json \
  -d path/to/your/halos.yaml
```

---

## References

- [HALOS Principles](../PRINCIPLES/halos-principles-v1.0.md) — the eight core principles
- [HALOS Provenance Spec](../PROVENANCE/halos-provenance-spec-v0.1.md) — provenance record structure
- [Explainer](../docs/explainer.md) — plain-language introduction to HALOS
- [Whitepaper](../docs/whitepaper.md) — formal positioning paper on HALOS and supply chain integration
- [CycloneDX/SLSA Mapping](../mappings/cyclonedx-slsa.md) — how HALOS maps to existing standards
