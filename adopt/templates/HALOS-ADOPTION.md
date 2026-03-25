# HALOS Adoption — <Project Name>

This repository is adopting **HALOS (Human-Agent Living Operating System)** principles.

HALOS introduces governance for:
- human-AI collaboration
- attribution and provenance
- transparency of AI involvement
- conflict-aware decision making

This adoption is **brownfield-first**:
We are integrating HALOS into an existing system without disrupting current workflows unless explicitly approved.

---

## Adoption Principles

### 1. Human Primacy
Humans are the final decision-makers for:
- governance changes
- policy conflicts
- destructive or irreversible actions

Agents must **never silently reinterpret or override existing repo rules**.

### 2. Additive First (Non-Disruptive)
HALOS is introduced through:
- overlays
- mapping documents
- supplemental policies
- manifests

Existing documents remain authoritative unless explicitly updated.

### 3. Conflict Transparency
When HALOS and existing repo rules differ:

Agents MUST:
- surface the conflict explicitly
- explain both sides
- present options
- request human decision

No silent resolution is allowed.

### 4. Provenance and Attribution
Agents must:
- distinguish between existing repo behavior, inferred meaning, and proposed changes
- annotate AI involvement where appropriate
- avoid presenting generated artifacts as purely human-authored

### 5. Incremental Adoption
Adoption proceeds in phases:

1. Discover
2. Map
3. Flag gaps/conflicts
4. Propose overlays
5. Escalate decisions
6. Implement approved changes

---

## Agent Expectations

Agents working in this repo must:

- Read existing agent configuration first (e.g., CLAUDE.md, AGENTS.md)
- Treat it as authoritative local guidance
- Apply HALOS as an overlay, not a replacement

### Allowed (Safe Additive)
- create HALOS mapping documents
- generate manifests (`halos.yaml`)
- propose workflows
- annotate gaps

### Review Needed
- modifying agent instructions
- adding CI checks (non-blocking)
- introducing metadata requirements

### Human Decision Required
- changing governance meaning
- enforcing new blocking rules
- altering ownership or approval flow
- replacing existing policies

---

## Conflict Handling Template

When a conflict is found, agents must use:

```
HALOS Adoption Decision Required

Current repo behavior:
<summary>

HALOS-preferred behavior:
<summary>

Why this matters:
<summary>

Options:
A. Keep current behavior (document divergence)
B. Add HALOS overlay (non-enforcing)
C. Partial migration
D. Full adoption

Recommended:
<lowest-risk option>

Human decision required.
```

---

## Expected HALOS Artifacts

Over time, this repo may include:

- `HALOS-COMPATIBILITY-MAP.md`
- `HALOS-CONFLICT-REGISTER.md`
- `halos.yaml` (machine-readable governance)
- workflow templates (PR/CI)

These are additive and do not replace existing docs.

---

## References

- [HALOS Principles](https://github.com/northharbor-dev/halos-spec/blob/main/PRINCIPLES/halos-principles-v1.0.md)
- [HALOS Adoption Guide](https://github.com/northharbor-dev/halos-spec/blob/main/adopt/GUIDE.md)
- [HALOS Profile Schema](https://github.com/northharbor-dev/halos-spec/blob/main/spec/schema/halos-profile.schema.json)
