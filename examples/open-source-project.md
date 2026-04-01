# HALOS Example: Open Source Project Governance

## 1. Scenario

**Domain:** Open source software — community-maintained infrastructure library

**Who:** Priya Chandrasekaran is the lead maintainer of `libsignal-bridge`, a widely-used open source Rust library (~14,000 GitHub stars, 380 contributors) that provides protocol bridging for encrypted messaging applications. She has maintained the project for 6 years, works full-time as a senior engineer at Lattice Communications (a fictional company that sponsors her open source work), and serves on the project's 5-person Technical Steering Committee (TSC). She has deep expertise in cryptographic protocol design and has published two peer-reviewed papers on forward secrecy in multi-device messaging.

**What she's trying to accomplish:** A major version release (v4.0) that introduces support for the Messaging Layer Security (MLS) protocol alongside the existing Signal Protocol bridge. The release involves a new `mls-bridge` module (~3,200 lines of Rust), updates to the public API surface, a migration guide for downstream consumers, and revised security documentation. The release has been in development for 5 months across 47 pull requests from 12 contributors. Priya must now prepare the final release candidate: triaging the remaining open issues, writing the changelog and migration guide, making a critical API design decision that will affect all downstream consumers, and coordinating the release with two other maintainers who handle packaging and distribution.

**How AI is used:** Priya uses Claude to help draft the changelog by summarizing 47 merged PRs, to analyze API surface changes between v3.x and the v4.0 release branch for breaking changes she may have missed, to generate initial drafts of the migration guide sections, and to review the security documentation for consistency with the MLS RFC (RFC 9420). She also uses GitHub Copilot for code completion during last-minute bug fixes.

**Where human judgment is required:** Every API design decision — especially the critical choice about how to expose MLS group management to downstream consumers. The changelog must accurately represent contributor work (AI can miss context from long PR discussion threads). The migration guide must reflect real-world upgrade paths that Priya knows from conversations with major downstream projects (Signal Desktop fork maintainers, Matrix bridge developers, a government secure messaging team). Security documentation for a cryptographic library cannot be AI-generated without expert review — an incorrect claim about forward secrecy guarantees could lead downstream applications to make unsafe assumptions.

**Decision point with consequences:** The critical decision is how to expose MLS group management in the public API. Option A: a high-level `GroupManager` abstraction that hides MLS epoch management, key rotation, and member add/remove ceremonies behind simple method calls. This is easier for most consumers but prevents advanced users from implementing custom group policies (e.g., a government messaging app that requires approval workflows for adding new group members). Option B: expose the low-level MLS primitives directly, giving consumers full control but requiring them to understand epoch semantics, commit ordering, and key schedule internals — effectively requiring MLS expertise to use correctly. Option C (proposed by another TSC member): a layered API with `GroupManager` as the default but an escape hatch to the lower-level primitives. Priya must decide which approach to ship in v4.0, knowing that the public API is a compatibility commitment — once released, breaking changes require a v5.0 with another migration cycle. The choice affects security posture (high-level abstractions can enforce safety invariants; low-level APIs let consumers violate them), adoption (simpler APIs drive adoption; complex ones limit it to expert users), and the project's maintenance burden (supporting two API layers is more work for a volunteer-driven project).

---

## 2. Collaboration Narrative

**Step 1 — Changelog Drafting**
Priya asks Claude to generate a draft changelog for v4.0 by summarizing the 47 merged pull requests. She provides the PR titles, authors, and labels. Claude produces a categorized changelog: 8 new features, 12 improvements, 6 bug fixes, 14 internal/CI changes, and 7 documentation updates. Priya **modifies** the output substantially. Claude correctly categorized most PRs but missed that PR #312 ("Refactor epoch handling") was actually a security-critical fix disguised as a refactor — the PR discussion (which Claude didn't have access to) reveals it patched a timing side-channel in epoch key derivation. Priya moves it to a new "Security" section and writes a specific description. She also corrects Claude's attribution: PR #298 was credited to the PR author, but the actual implementation was pair-programmed with a contributor who isn't listed on the commit — Priya knows this because she reviewed the PR and saw the discussion. She adds the co-author credit manually.

**Step 2 — API Surface Analysis**
Priya asks Claude to compare the public API between the v3.6 release tag and the v4.0 release branch, identifying all breaking changes, new types, removed types, and changed function signatures. Claude produces a comprehensive diff analysis identifying 23 breaking changes, 41 new public types, and 8 removed deprecated types. Priya **accepts** this analysis as accurate after spot-checking 10 of the 23 breaking changes against the actual code. The analysis saves her roughly a full day of manual comparison and catches 3 breaking changes she hadn't been tracking: a `Send` bound added to `BridgeConfig`, a renamed error variant in `ProtocolError`, and a removed re-export that downstream crates may depend on.

**Step 3 — API Design Decision**
Priya consults Claude about the `GroupManager` API design decision, providing the three options and her constraints (volunteer maintainer bandwidth, downstream consumer profiles, security invariant enforcement). Claude analyzes the trade-offs and recommends Option C (layered API) with specific implementation suggestions: a `GroupManager` that wraps an inner `MlsSession` which can be accessed via an `unsafe_inner()` method. Priya **rejects** this recommendation. The `unsafe_inner()` pattern is problematic for two reasons she explains to her TSC: first, using the word "unsafe" in Rust has a specific meaning (memory unsafety) and repurposing it for "cryptographically unsafe" would confuse users; second, exposing the inner session directly means any method call on it could invalidate `GroupManager`'s internal state, creating subtle bugs. Instead, Priya designs a `GroupPolicy` trait that consumers can implement to customize group management behavior (approval workflows, custom validation, audit logging) while `GroupManager` retains control of the MLS state machine. She writes the trait definition and documents the safety contract herself.

**Step 4 — Migration Guide Drafting**
Priya asks Claude to draft migration guide sections for the 23 breaking changes identified in Step 2, providing before/after code examples for each. Claude generates migration snippets for all 23 changes. Priya **partially accepts** the output: 18 of the 23 migration examples are correct and useful. She **rejects** 5 examples where Claude's suggested replacement code would compile but produce subtly incorrect behavior — for example, one migration snippet for the new `BridgeConfig` builder pattern omitted the `key_rotation_interval` parameter, which would default to the library's built-in value rather than the caller's previous custom value, silently changing key rotation behavior. Priya rewrites these 5 examples with correct semantics and adds warning callouts for each.

**Step 5 — Security Documentation Review**
Priya asks Claude to review the updated security documentation against RFC 9420 (MLS) for accuracy. Claude identifies 3 inconsistencies: a claim about "perfect forward secrecy" that should say "post-compromise security" (MLS provides both, but the documentation conflated the guarantees), a diagram showing 2-party key agreement where MLS uses TreeKEM for group key agreement, and a missing caveat about external joins not providing the same confidentiality guarantees as member-initiated adds. Priya **accepts** the first two findings and corrects the documentation. She **modifies** the third: Claude's suggested caveat was technically correct but too alarming — it implied external joins were insecure, when they are a deliberate MLS feature with well-understood properties. Priya rewrites the caveat to explain the trade-off accurately without discouraging the feature's use.

**Step 6 — Co-Maintainer Review**
Kwame Asante, a co-maintainer who handles crate publishing and release infrastructure, reviews the changelog, migration guide, and release artifacts. He catches a version constraint error in the `Cargo.toml` that would have caused the published crate to pull in an incompatible dependency version. He approves the release artifacts after the fix.

**Step 7 — TSC Vote and Release Approval**
Priya presents the v4.0 release candidate to the TSC. She shares the HALOS provenance record documenting AI involvement in the release preparation. The TSC votes 4-1 to approve the release (one member wanted to delay for additional fuzzing of the MLS module; the majority determined the existing test coverage — 94% line coverage, 2 weeks of continuous fuzzing, and a successful third-party audit — was sufficient). TSC chair Dagny Holm signs the release tag.

---

## 3. Artifact Description

**What was created:** `libsignal-bridge` v4.0.0 — a Rust library crate comprising ~28,000 lines of code (including the new 3,200-line `mls-bridge` module), a 12-page migration guide, updated security documentation (14 pages), a categorized changelog covering 47 PRs from 12 contributors, and a `GroupPolicy` trait with reference implementation. Delivered as a published crate on crates.io with GPG-signed release tag and reproducible build attestation.

**How it is used:** `libsignal-bridge` is a dependency of 340+ downstream crates and is used in production by at least 8 messaging applications including two with >100,000 daily active users. The library handles protocol bridging for end-to-end encrypted messaging — it is the component that translates between different E2EE protocols, manages key material, and enforces cryptographic invariants. Downstream applications rely on it for the security guarantees they advertise to their users.

**What happens if it is wrong:** A bug in the MLS bridge module could compromise the confidentiality or integrity of encrypted group messages for downstream applications. An incorrect API design that allows consumers to violate MLS invariants could lead to key compromise, message forgery, or silent decryption failures. An inaccurate migration guide could cause downstream developers to introduce vulnerabilities during their v3-to-v4 upgrade. An error in the security documentation (e.g., overstating forward secrecy guarantees) could lead downstream applications to make architectural decisions based on properties the library doesn't actually provide — such as a government messaging app assuming post-compromise security in scenarios where it doesn't hold. Given the library's position in the dependency graph, a security issue affects hundreds of downstream projects simultaneously.

---

## 4. HALOS v0.3 Record (JSON)

See [open-source-project.halos.json](open-source-project.halos.json)

---

## 5. AIVSS-Style Interpretation

**Data Provenance**
HALOS traces the full derivation chain of the v4.0 release. AI contributed changelog drafting (substantially modified), API surface analysis (accepted after verification), API design recommendations (rejected — human designed alternative), migration guide drafting (18/23 accepted, 5 rejected and rewritten), and security documentation review (2 accepted, 1 modified). The provenance record distinguishes between AI contributions that were informational (API analysis, security review findings) and AI contributions that produced artifact text (changelog, migration snippets). In every case, the human's evaluation and modifications are documented. *This lowers risk: any downstream consumer or auditor can determine exactly which parts of the release materials involved AI and how the maintainer evaluated that involvement.*

**Transparency / Explainability**
The interaction semantics across seven steps make the AI's role legible. The most consequential decision — the `GroupPolicy` trait API design — is documented as a human decision that explicitly rejected the AI recommendation, with rationale grounded in Rust-specific semantics and cryptographic safety concerns. The changelog corrections show the maintainer catching both factual errors (miscategorized security fix) and attribution errors (missing co-author) that the AI could not detect from its inputs. *This lowers risk: the open source community, downstream consumers, and security auditors can assess exactly how AI influenced the release and where human expertise was essential.*

**Accountability**
Priya is named as the responsible maintainer and decision-maker. Kwame is identified as the release infrastructure reviewer. Dagny and the TSC are identified as release approvers. The `actedOnBehalfOf` relationships confirm AI tools operated under Priya's direction. The record captures that the most security-critical components (API design, security documentation corrections, attribution fixes) were human-authored after AI suggestions were rejected or modified. *This lowers risk: accountability for the cryptographic library's correctness and safety rests unambiguously with named humans who have domain expertise.*

**Human Oversight**
AI output went through multiple layers of evaluation: Priya's direct review of all AI contributions (with domain expertise in cryptographic protocols), Kwame's independent review of release artifacts, and the TSC's governance approval. The record shows that Priya rejected or substantially modified AI output in the highest-stakes areas (API design, security documentation, sensitive changelog entries) while accepting it in lower-risk areas where it could be mechanically verified (API surface diffing). *This lowers risk: oversight intensity is proportional to the stakes of each contribution.*

**Decision Criticality**
The API design decision has long-term consequences: the public API is a compatibility commitment that affects 340+ downstream crates. HALOS captures the three options considered, the AI's recommendation, the maintainer's rejection with specific technical rationale, and the alternative design. The security documentation corrections are similarly high-criticality — conflating PFS and PCS guarantees could mislead downstream applications about their actual security properties. *This is high criticality: these decisions affect the security posture of hundreds of downstream projects and cannot be easily reversed once the crate is published.*

**Societal / Operational Impact**
`libsignal-bridge` is infrastructure for encrypted communications used by messaging applications with combined hundreds of thousands of daily users. The library is a trust anchor — downstream applications delegate cryptographic correctness to it. The v4.0 release introduces MLS support, expanding the library's scope to group encryption. HALOS makes the human decision-making trail auditable, which matters for an open source project where the community, downstream consumers, and security researchers all have a stake in understanding how the release was prepared. *This raises the stakes: the provenance record serves the open source community's need for transparency about AI involvement in security-critical infrastructure.*

---

## 6. AIUC-1 Classification

**Use Type:** Decision-support

The AI provided analysis (API surface comparison, security documentation review) and generated draft material (changelog, migration guide sections) that informed human decisions. It did not make API design, security, or release decisions. The AI's contributions were most valuable as labor-saving for mechanical tasks (summarizing 47 PRs, diffing API surfaces) and as a second pair of eyes on documentation accuracy. The API design recommendation was considered and explicitly rejected in favor of a human-designed alternative.

**Impact Level:** High

The artifact is a widely-depended-upon cryptographic library. Errors in the API design, migration guide, or security documentation can compromise the security of downstream applications. The library's position in the dependency graph means issues propagate to hundreds of projects. The v4.0 release introduces a new cryptographic protocol (MLS), raising the stakes for correctness.

**Human Involvement:**

Priya is involved at every stage: she directs all AI interactions, evaluates every AI output against her domain expertise in cryptographic protocols, makes the critical API design decision, and personally writes or rewrites all security-sensitive content. Kwame provides independent release artifact review. The TSC provides governance-level approval. No AI-generated text reaches the published crate without Priya's explicit evaluation, and the highest-risk component (the `GroupPolicy` API design) was entirely human-authored after the AI's recommendation was rejected.

---

## 7. Crosswalk to Frameworks

### NIST AI RMF

**Govern**
The `libsignal-bridge` project's contributing guidelines require that AI-assisted contributions be disclosed in PR descriptions. The TSC adopted a policy that release preparation involving AI assistance must include a HALOS provenance record reviewed by the TSC before release approval. The `governance` field references both this project-level policy and the HALOS standard itself. HALOS provides the artifact-level evidence that the project's AI transparency commitments were met for this specific release.

**Map**
The HALOS record maps AI involvement to specific activities: changelog summarization, API surface analysis, migration guide drafting, and security documentation review. It distinguishes between AI contributions that were mechanical (API diffing — high confidence, accepted) and those requiring domain judgment (API design — rejected; security documentation — modified). This mapping allows the community to assess where AI risk is concentrated and where human expertise was the primary contributor.

**Measure**
The interaction semantics provide concrete measures of oversight quality. Across seven steps: 1 AI output accepted after verification, 1 substantially modified, 1 rejected entirely with human-designed alternative, 1 partially accepted (18/23 items), 1 partially modified, plus 2 purely human review/approval steps. The record shows that acceptance correlated with verifiability (API diff) while rejection correlated with domain sensitivity (API design, security claims).

**Manage**
If a security issue is discovered in v4.0, the HALOS record supports triage: was the issue in AI-generated migration guide text that was accepted, in the human-designed API, or in code from one of the 47 merged PRs? The decision provenance for the `GroupPolicy` design allows future maintainers to understand why the API works the way it does. If a downstream consumer reports a migration problem, the record can help determine whether the issue originated from an AI-drafted migration snippet or a human-written one.

### ISO/IEC 42001

**Auditability**
The HALOS record provides a machine-readable audit trail covering the v4.0 release preparation. Every AI interaction is logged with tool identifiers, timestamps, and human responses. The decisions array captures the API design alternatives, the AI recommendation, and the maintainer's rejection rationale. A security auditor reviewing the library (or a downstream consumer conducting due diligence) can reconstruct how the release was prepared without relying on oral accounts or chat logs.

**Responsibility Tracking**
The `human_author`, `review`, `decisions`, and graph relationships establish clear responsibility: Priya authored the release and made key design decisions, Kwame reviewed release artifacts, Dagny and the TSC approved the release. The `actedOnBehalfOf` relationships confirm AI tools operated under Priya's direction. This is particularly important for open source projects where responsibility can be ambiguous — the HALOS record makes the chain of accountability explicit.

**Process Transparency**
The graph model makes the release preparation process legible: changelog drafting → API analysis → API design decision → migration guide → security doc review → co-maintainer review → TSC approval. Each step is typed, timestamped, and attributed. The interaction semantics show how the maintainer engaged with AI at each step. For an open source project where the community expects transparency about how releases are prepared, this record provides evidence that human expertise — not AI generation — drove the security-critical decisions.

### CycloneDX (Optional)

In the context of `libsignal-bridge` as a dependency in downstream applications' supply chains:

**CycloneDX** would catalog the crate's dependencies, their versions, and licenses — answering "what transitive dependencies does this library pull in?"

**HALOS** records how the library release was prepared — which parts of the release materials involved AI, what the maintainer accepted or rejected, and who approved the release. It answers "how was this version of the library created, and what role did AI play?"

**Combined**, a downstream security team evaluating whether to upgrade to v4.0 could check the CycloneDX SBOM for dependency changes and the HALOS record for the human decision-making behind the release. This is particularly valuable for cryptographic libraries, where consumers need confidence that security-critical decisions were made by qualified humans, not generated by AI — the HALOS record provides that evidence.
