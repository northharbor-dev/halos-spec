# HALOS Provenance Examples

This directory contains example HALOS provenance records demonstrating how the specification applies across domains, artifact types, and complexity levels.

---

## Spec Reference Examples

These examples demonstrate specific spec features and are validated by CI.

| Example | Spec Version | Purpose |
|---------|-------------|---------|
| [minimal.json](minimal.json) | v0.1 | Minimal valid provenance record (CI-validated) |
| [v0.2-graph.json](v0.2-graph.json) | v0.3 | Full graph model with decisions, interactions, multi-policy governance, and policy evaluations |

---

## Domain Examples

Each domain example includes a narrative companion (`.md`) explaining the scenario, collaboration process, and HALOS relevance alongside the machine-readable provenance record (`.halos.json`).

All domain examples use the **v0.3** provenance model featuring graph entities, decision provenance, human-AI interaction semantics, multi-policy governance, and policy evaluation traces.

| Domain | Lead | Key Decision | Files |
|--------|------|-------------|-------|
| [Education](education-student-learning.md) | Mateo Rivera (undergrad) | Rejected AI-fabricated citation after verification failure | [narrative](education-student-learning.md) / [record](education-student-learning.halos.json) |
| [Enterprise Software](enterprise-software-development.md) | Tomoko Hayashi (platform engineer) | Rejected AI-recommended CQRS; rewrote state machine from scratch | [narrative](enterprise-software-development.md) / [record](enterprise-software-development.halos.json) |
| [Government Policy](government-policy-legal.md) | Fatima Al-Rashid (policy analyst) | Chose how to frame politically consequential housing supply finding | [narrative](government-policy-legal.md) / [record](government-policy-legal.halos.json) |
| [Journalism](journalism-news-media.md) | Carlos Medina (investigative reporter) | Corrected AI-generated violation dataset before publication | [narrative](journalism-news-media.md) / [record](journalism-news-media.halos.json) |
| [Music Production](music-creative-production.md) | Maya Reeves (composer) | Rejected AI harmonic sketch, kept only structural idea | [narrative](music-creative-production.md) / [record](music-creative-production.halos.json) |
| [Nonprofit / Humanitarian](nonprofit-humanitarian.md) | Amara Diallo (field coordinator) | Overrode AI priority ranking based on ground-truth field report | [narrative](nonprofit-humanitarian.md) / [record](nonprofit-humanitarian.halos.json) |
| [Open Source Project](open-source-project.md) | Priya Chandrasekaran (lead maintainer) | Rejected AI-recommended unsafe_inner() API; designed GroupPolicy trait instead | [narrative](open-source-project.md) / [record](open-source-project.halos.json) |
| [Real-time Critical Systems](realtime-critical-systems.md) | Luis Herrera, PE (control systems engineer) | Reduced AI-proposed dosing reduction, added safety logic AI omitted | [narrative](realtime-critical-systems.md) / [record](realtime-critical-systems.halos.json) |
| [Scientific Research](scientific-research.md) | Dr. Nkechi Okonkwo (computational epidemiologist) | Excluded confounded feature the AI ranked as highly predictive | [narrative](scientific-research.md) / [record](scientific-research.halos.json) |

### What each domain example includes

**Narrative (`.md`):**
1. Scenario description (who, what, how AI is used, where human judgment matters)
2. Collaboration narrative (step-by-step account of the work)
3. Artifact description (what was created, how it's used, consequences of error)
4. AIVSS-style risk interpretation
5. AIUC-1 classification (use type, impact level, human involvement)
6. Framework crosswalk (NIST AI RMF, ISO/IEC 42001, CycloneDX)

**Provenance record (`.halos.json`):**
- Full v0.3 record with graph, decisions, interactions, multi-policy governance, and policy evaluations
- Realistic but entirely fictional scenarios, names, and organizations
- All URLs use RFC 2606 reserved `.example` domains

---

## Embedded Examples

The [`embedded/`](embedded/) directory shows how HALOS provenance records integrate with existing supply chain standards. These are **v0.3** records demonstrating the embedding pattern described in the [provenance spec](../spec/provenance/v0.1.md#embedding) and detailed in the [CycloneDX/SLSA mapping](../mappings/cyclonedx-slsa.md).

| Example | Standard | Pattern |
|---------|----------|---------|
| [cyclonedx.json](embedded/cyclonedx.json) | CycloneDX 1.5 | HALOS as `halos:provenance` custom property on a component |
| [slsa.json](embedded/slsa.json) | SLSA / in-toto v0.1 | HALOS as a predicate in an in-toto attestation envelope |

These examples are intentionally minimal — they demonstrate embedding mechanics, not complex provenance. For richer provenance scenarios, see the domain examples above.

> **Note:** Embedded examples are not validated by CI (their outer envelope formats are not HALOS schemas). The HALOS provenance records within them conform to the v0.3 schema.

---

## Contributing New Examples

New domain examples can be contributed via pull request. To generate a new example using an AI assistant, use the [GENERATE-EXAMPLE.md](GENERATE-EXAMPLE.md) agent prompt.

### Requirements for new examples

- Must use a domain not already covered (or extend an existing one with a substantially different scenario)
- Must include both a narrative `.md` and a provenance `.halos.json` file
- The `.halos.json` must validate against the appropriate provenance schema
- All names, organizations, and URLs must be fictional (use `.example` domains per RFC 2606)
- Names should be diverse in gender, cultural origin, and professional background
- The scenario must demonstrate meaningful human judgment — not just rubber-stamping AI output
- At least one decision should involve rejecting or substantially modifying AI output with documented rationale

### CI validation

All `examples/*.json` files are validated against `spec/schema/halos-provenance-v0.1.schema.json` on every push. Files in `examples/embedded/` and `.halos.json` files are excluded from this validation (they use different outer schemas or the v0.2 schema).
