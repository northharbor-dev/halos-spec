# Contributing to halos-spec

Thank you for your interest in HALOS. This repository contains the canonical specifications for the framework. Contributions that improve clarity, correctness, and usefulness are welcome.

---

## How to Contribute

### Proposals

The primary way to shape this specification is through **proposals**. Proposals follow an RFC-style process:

1. **Draft** — Open an issue describing the change and its motivation
2. **Discuss** — Community reviews for alignment with [principles](spec/principles/v1.0.md), clarity, and feasibility
3. **Submit** — Open a pull request with the proposed changes
4. **Review** — Maintainers and reviewers evaluate against [decision criteria](GOVERNANCE.md)
5. **Decide** — Accepted changes are merged; rejected proposals are documented with rationale

### Small Fixes

Typos, broken links, and formatting corrections can be submitted as direct pull requests without a prior issue.

### Discussion

- Open an issue for questions, feedback, or ideas
- Comment on existing issues and pull requests
- Help review proposals for clarity and principle alignment

---

## Self-Provenance

HALOS uses its own provenance spec to document spec changes. When submitting a PR that modifies the provenance spec or schemas:

1. Create a HALOS provenance record for your change in `spec/provenance/records/`
2. Name it after the version or change (e.g., `v0.3.halos.json`)
3. Record yourself as the human author, document AI assistance used, and capture key decisions
4. Reference the record in `spec/changelog.json` via the `provenanceRecord` field

This is advisory — not yet enforced by CI. See existing records in `spec/provenance/records/` for examples.

---

## What Belongs Here

This repository contains specification-level content and adoption tooling:

- Principles documents
- Provenance and attribution specifications
- JSON Schemas (in `spec/schema/`)
- Canonical examples
- Terminology definitions
- Adoption toolkit (`adopt/`) — guide, agent prompt, templates
- Domain profiles (`profiles/`) — implementation guidance for specific toolchains
- Standard mappings (`mappings/`) — how HALOS maps to CycloneDX, SLSA, etc.
- Work plans (`plans/`) — design and rationale for significant work

**Site content, narrative, blog posts, and organizational content belong in the main [HALOS repository](https://github.com/northharbor-dev/halos), not here.**

---

## Code of Conduct

- Be respectful and constructive
- Critique ideas, not people
- Assume good intent
- Focus on what best serves the framework and its users

---

## Pull Request Process

1. Fork the repository or create a branch
2. Make your changes
3. Submit a PR with a clear description of what changed and why
4. Respond to review feedback
5. A maintainer will merge once approved

---

## Licensing

By contributing, you agree that your contributions will be licensed under [CC-BY-4.0](LICENSE).

---

## Questions?

Open an issue with the `question` label.
