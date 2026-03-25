# Profile: Software Development

HALOS implementation guidance for Git-based software development teams.

**Status:** Stub
**Spec version:** 1.0.0

---

## Domain Assumptions

- Source code managed in Git (GitHub, GitLab, etc.)
- Pull request / merge request workflow
- CI/CD pipeline (GitHub Actions, etc.)
- Package or container artifact publishing

## Toolchain Mapping

| HALOS Principle | Implementation |
|---|---|
| HALOS-CORE-1 (Human Primacy) | CODEOWNERS for governance files, required PR reviews |
| HALOS-CORE-2 (Ideas as Assets) | Git history, contributor attribution |
| HALOS-CORE-3 (Attribution) | Commit trailers (`AI-Assisted:`), CycloneDX SBOM embedding |
| HALOS-CORE-4 (Transparency) | PR templates with AI disclosure checkbox, advisory CI checks |
| HALOS-CORE-5 (Ethical Guardrails) | Agent behavioral constraints (CLAUDE.md, .cursor/rules/) |
| HALOS-CORE-6 (Evolving Standards) | ADR process, versioned standards docs |
| HALOS-CORE-7 (Governance) | Proposal/RFC process, GOVERNANCE.md |
| HALOS-CORE-8 (Accountability) | Provenance records attached to releases (SLSA, Chainloop) |

## Related Standards

- **SLSA** — Supply-chain Levels for Software Artifacts. HALOS provenance supplements SLSA with human-authorship fields.
- **CycloneDX** — HALOS provenance can be embedded as component evidence in a CycloneDX SBOM.
- **Chainloop** — Attestation and policy enforcement platform. HALOS provenance records can be collected and verified through Chainloop workflows.

See [mappings/cyclonedx-slsa.md](../../mappings/cyclonedx-slsa.md) for technical details.

## Examples

*(To be added — commit trailer conventions, CI workflow snippets, provenance records for releases)*
