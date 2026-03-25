# HALOS and the Broader Ecosystem

How HALOS fits in the agent and supply-chain spec landscape, and how to integrate it with existing standards.

---

## Why We Track This

The shift to human–agent collaboration is a shared challenge. No single spec will solve it alone. HALOS is engaged with the broader world: we track related efforts, learn from them, and contribute where we can.

This document reflects that engagement: not a competitor's scorecard, but a map of the terrain we're navigating together.

---

## HALOS Positioning

HALOS focuses on two things other specs don't:

1. **Human-authorship provenance** — who the accountable human is, and what role they played
2. **AI-involvement disclosure** — what AI was used, how, and whether a human reviewed the output

Other specs address capabilities, communication, and discovery. HALOS addresses accountability for the artifacts those agents produce.

---

## CycloneDX

[CycloneDX](https://cyclonedx.org) is a supply chain security standard for describing software bills of materials (SBOMs). It describes *what is in* a software artifact.

HALOS addresses a gap CycloneDX doesn't cover: *who made it, and with what AI help*.

### Integration

Embed a HALOS provenance record as a CycloneDX custom property:

```json
{
  "name": "halos:provenance",
  "value": { ... }
}
```

Or reference it in `component.evidence`:

```json
{
  "component": {
    "evidence": {
      "licenses": [],
      "copyright": [],
      "identity": {
        "field": "name",
        "confidence": 1,
        "methods": [
          {
            "technique": "manifest-analysis",
            "confidence": 1,
            "value": "halos:provenance"
          }
        ]
      }
    }
  }
}
```

See [`../examples/cyclonedx-embedded.json`](../examples/cyclonedx-embedded.json) for a complete example.

---

## SLSA

[SLSA](https://slsa.dev) (Supply-chain Levels for Software Artifacts) defines a framework for build integrity and provenance. It focuses on *how a build was produced* — the build system, source, and process.

HALOS extends this by adding the human and AI authorship layer that SLSA doesn't address.

### Integration

Express HALOS provenance as a SLSA predicate using the `in-toto` attestation envelope:

```json
{
  "_type": "https://in-toto.io/Statement/v0.1",
  "subject": [ { "name": "...", "digest": { "sha256": "..." } } ],
  "predicateType": "https://halos.northharbor.dev/provenance/v0.1",
  "predicate": { ... }
}
```

A HALOS predicate can accompany a standard SLSA provenance predicate in the same attestation bundle.

See [`../examples/slsa-embedded.json`](../examples/slsa-embedded.json) for a complete example.

---

## Agent Ecosystem Specs

| Spec | Source | Scope | HALOS Relationship |
|---|---|---|---|
| **Agent Skills** | Anthropic / agentskills.io | Reusable agent capabilities | Skills define *what* an agent can do; HALOS defines *how accountability is recorded* for what it produces |
| **OSSA** | Open Standard for Software Agents | Agent manifests (role, LLM config, tools) | HALOS could map as a behavioral overlay or constraint set for OSSA agents claiming alignment |
| **Agent Protocol** | agentprotocol.ai | How tasks run (runtime protocol) | HALOS principles apply regardless of execution model |
| **A2A** | Google | Agent-to-agent communication | A2A governs messages; HALOS governs accountability for artifacts produced through that communication |
| **ADP** | Metisos | Agent discovery via manifests | HALOS-aligned agents could advertise alignment in their discovery manifests |

---

## Accountability Specs

| Spec | Source | Focus | HALOS Relationship |
|---|---|---|---|
| [The Agent Oath](https://theagentoath.com) | theagentoath.com | Ethical principles (prose) | Philosophically aligned with HALOS principles. Potential normative reference. |
| [APAAI Protocol](https://apaaiprotocol.org) | apaaiprotocol.org | Action → Policy → Evidence; audit trail | HALOS provenance records can serve as evidence within an APAAI audit trail |

---

## Future Mappings

We expect that over time, implementations may want to:

- **Map HALOS onto OSSA** — An OSSA extension or constraint set that defines how an OSSA agent satisfies HALOS-CORE-1 through HALOS-CORE-8
- **Use APAAI as a HALOS extension** — For implementations that need auditable evidence of HALOS alignment
- **Reference The Agent Oath** — HALOS core requirements could map to Agent Oath tenets for cross-community alignment

Such mappings would live in `docs/` or a dedicated `extensions/` directory once proposed and accepted through the governance process.

---

## Current Stance

HALOS does **not** formally adopt or depend on any of these specs. The ecosystem is early; adoption varies. We keep HALOS self-contained so it can:

- Stand alone as a principles and provenance spec
- Integrate later via extensions or mappings when community norms solidify
