# Plan 002: Site Clarity — Acronym, Two-Part Structure, Ecosystem Positioning

**Status:** Draft
**Created:** 2026-03-31
**Author:** Bob Hong

---

## Context

HALOS has grown into a two-layer framework (Principles + Provenance Spec), but the public sites don't communicate this clearly. Three problems to fix:

1. **Wrong acronym on main site** — `halos/docs/index.md` hero says "Human-Agent Living Operating System." Canonical expansion is "Human–Agent Lineage and Origin Standard" (used correctly in halos-spec README). This inconsistency undermines credibility as a named standard.

2. **Two-part structure is invisible** — The framework has two distinct, versioned layers but no site surfaces this upfront with version numbers. Visitors don't understand the relationship between Principles (stable, normative) and the Provenance Spec (technical, evolving).

3. **Ecosystem differentiation is buried** — The comparison to CycloneDX, SLSA, W3C PROV, NIST AI RMF is buried in the halos-spec README after adoption and domain profiles sections. This is the key message for technical audiences evaluating whether to adopt HALOS.

**Acronym decision:** HALOS = "Human–Agent Lineage and Origin Standard" everywhere. This is the umbrella name for the full framework — not just the provenance layer. "Lineage and Origin" maps to both: principles define the ethical *origin* framework; the provenance spec captures *lineage* of work. "Living Operating System" is retired — it reads as runtime software and doesn't position well alongside adjacent standards (CycloneDX, SLSA, W3C PROV).

---

## Files to Change

### 1. `halos/docs/index.md` — Main site (halos.northharbor.dev)

**Priority: High**

**a. Fix hero acronym** (line 13):
```html
<!-- Before -->
<p><strong>Human-Agent Living Operating System</strong></p>

<!-- After -->
<p><strong>Human–Agent Lineage and Origin Standard</strong></p>
```

**b. Add a "The Framework" section** between the hero/adopt callout and the existing intro section. This section explains the two layers with version numbers and links.

Proposed content:

```html
<section class="section-card">
  <h2>The Framework</h2>
  <p class="section-card__lead">HALOS is organized in two layers — stable principles and an evolving provenance specification.</p>
  <div class="card-grid">
    <a class="card" href="principles.html">
      <h3>HALOS Principles <span class="badge">v1.0 — Stable</span></h3>
      <p>The normative foundation: human primacy, attribution, transparency of AI involvement, and ethical guardrails. The principles do not version — they anchor everything else.</p>
    </a>
    <a class="card" href="https://github.com/northharbor-dev/halos-spec/blob/main/spec/provenance/v0.1.md" rel="noopener noreferrer">
      <h3>Provenance Spec <span class="badge">v0.1 — Active</span></h3>
      <p>The technical standard for recording how an artifact was created: who the accountable human is, what AI contributed, and whether a human reviewed it before use.</p>
    </a>
  </div>
</section>
```

Note: a `.badge` style may need to be added to CSS if not already present. Alternatively, render as plain text: `— v1.0, Stable`.

**c. Add an "Ecosystem" section** surfacing the differentiation story — place it after "The Framework" section, before "Dive deeper."

Proposed content:

```html
<section class="section-card">
  <h2>Where HALOS Fits</h2>
  <p>HALOS is the <strong>human-centered provenance and accountability layer</strong> — complementary to, not competing with, adjacent standards.</p>
  <div class="card-grid">
    <div class="card">
      <h3>vs. CycloneDX / SBOM</h3>
      <p>CycloneDX answers "what is in this software?" HALOS adds "who was responsible and what AI contributed." HALOS provenance can embed directly as <code>component.evidence</code>.</p>
    </div>
    <div class="card">
      <h3>vs. SLSA</h3>
      <p>SLSA answers "how was it built?" HALOS adds "what decisions were made and by whom." HALOS provenance supplements SLSA attestations with human-authorship and AI-disclosure data.</p>
    </div>
    <div class="card">
      <h3>vs. W3C PROV</h3>
      <p>The v0.2 graph model is conceptually aligned with W3C PROV (Entities, Activities, Agents) but uses plain JSON and simplified typing — no RDF required.</p>
    </div>
    <div class="card">
      <h3>vs. NIST AI RMF / ISO 42001</h3>
      <p>Governance frameworks define policy. HALOS operates at the artifact level inside those processes — records that demonstrate traceability to auditors and reviewers.</p>
    </div>
  </div>
  <p><a href="https://github.com/northharbor-dev/halos-spec/blob/main/mappings/cyclonedx-slsa.md" rel="noopener noreferrer">Integration details and embedding guide →</a></p>
</section>
```

---

### 2. `halos-spec/README.md` — Spec repository

**Priority: Medium**

The spec README already has a "Two Layers" section and an "Ecosystem Alignment" section, but they appear late in the document. Two structural changes:

**a. Add version numbers inline to the Two Layers section** (currently lines 26–62). Change:

```markdown
### Principles
The HALOS Principles are the stable, normative foundation...
See [`spec/principles/v1.0.md`](spec/principles/v1.0.md)

### Provenance
The HALOS Provenance Spec defines the structure...
See [`spec/provenance/v0.1.md`](spec/provenance/v0.1.md)
```

To:

```markdown
### Principles — v1.0, Stable
The HALOS Principles are the stable, normative foundation...
See [`spec/principles/v1.0.md`](spec/principles/v1.0.md)

### Provenance Spec — v0.1, Active
The HALOS Provenance Spec defines the structure...
See [`spec/provenance/v0.1.md`](spec/provenance/v0.1.md)
```

**b. Move the Ecosystem Alignment section** from its current position (after Domain Profiles, ~line 101) to immediately after the Two Layers section — so the first ~80 lines of the README cover: what it is, how it's structured (with versions), and where it fits in the ecosystem.

---

### 3. `northharbor-dev-web/index.md` — northharbor.dev project listing

**Priority: Low**

Fix the HALOS project card description (line 26):

```
<!-- Before -->
description="Human-Agent Living Operating System — a principled collaboration framework between humans and AI agents. Specification, governance, and public discussion."

<!-- After -->
description="Human–Agent Lineage and Origin Standard — a framework for attribution, provenance, and ethical accountability in human–agent collaboration. Built on stable Principles (v1.0) and a technical Provenance Spec (v0.1)."
```

---

## Verification

1. Search for remaining instances of "Living Operating System": `grep -r "Living Operating System" /Users/bhong/dev/northharbor/northharbor-dev/`
2. Confirm version numbers appear in the halos/docs/index.md framework section
3. Confirm ecosystem comparison appears above the fold (before "Dive deeper") on the main site
4. Build and preview the Jekyll site to confirm layout renders correctly
