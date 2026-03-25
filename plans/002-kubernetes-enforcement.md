# Plan 002: HALOS Kubernetes Enforcement and CI Integration

**Status:** Draft
**Created:** 2026-03-25
**Author:** Bob Hong
**Tracking:**
- [#9 — Define HALOS Kubernetes annotation spec](https://github.com/northharbor-dev/halos-spec/issues/9) *(governance gate)*
- [#10 — Kyverno policies](https://github.com/northharbor-dev/halos-spec/issues/10)
- [#11 — OPA ConstraintTemplates](https://github.com/northharbor-dev/halos-spec/issues/11)
- [#12 — CI validation step using OPA](https://github.com/northharbor-dev/halos-spec/issues/12)
- [#13 — Dockerfile label conventions](https://github.com/northharbor-dev/halos-spec/issues/13)
- [#14 — SonarQube quality profile](https://github.com/northharbor-dev/halos-spec/issues/14)

---

## Context

HALOS v0.1 defines how to record human–AI provenance for software artifacts. The adoption toolkit (Plan 001) covers governance profiles and `.halos.json` records — the *what* and *who* of provenance. But provenance claims only create accountability if they are **enforceable at integration points**: container admission, CI pipelines, and code quality gates.

This plan covers the second major layer of HALOS adoption: runtime enforcement in Kubernetes clusters, build-time enforcement in CI pipelines, and integration with existing security scanning toolchains. Together these integrations make HALOS provenance claims verifiable rather than merely declarative.

The enforcement model has two layers:

**Build-time (shift-left):**
- `.halos.json` records validated during CI (OPA/conftest)
- Dockerfile `LABEL` instructions carry HALOS metadata into the image layer
- SonarQube gates on CI validation outcome

**Runtime (admission control):**
- Kubernetes annotations carry the same metadata at deploy time
- Kyverno and OPA/Gatekeeper enforce annotation presence on admission
- Kubescape and Prisma Cloud inspect image labels as a complementary check

The annotation spec (step 1 of the sequence) is the **shared primitive** that all enforcement tooling validates against. It must be accepted through the HALOS governance process before downstream tooling is published to external catalogs (policies.kyverno.io, gatekeeper-library).

---

## Goals

1. Define canonical HALOS Kubernetes annotation keys and value semantics — the normative primitive for all enforcement tooling
2. Write Kyverno `ClusterPolicy` resources covering validation and image verification; publish to policies.kyverno.io
3. Write OPA/Gatekeeper `ConstraintTemplate` resources with equivalent coverage; publish to gatekeeper-library
4. Define a reusable CI validation step (OPA/conftest) that validates `.halos.json` records at build time
5. Define Dockerfile `LABEL` conventions that mirror the annotation keys, enabling image-layer scanning by Prisma Cloud and Kubescape
6. Define a SonarQube quality profile and quality gate that surfaces HALOS CI validation as a required external gate

---

## Design

### Annotation Spec (Step 1 — Governance Gate)

Three annotation keys are proposed under the `halos.northharbor.dev` prefix:

| Annotation | Value format | Required |
|---|---|---|
| `halos.northharbor.dev/provenance` | URI or base64-encoded JSON reference to a `.halos.json` record | Required |
| `halos.northharbor.dev/human-author` | String — display name, email, or OIDC subject of the accountable human | Required |
| `halos.northharbor.dev/ai-disclosure` | JSON string — array of `{tool, role}` objects matching the `ai_assistance` field in the provenance record | Required if AI was used; `"[]"` if no AI was used |

**Applicable resource types:** `Pod`, `Deployment`, `StatefulSet`, `DaemonSet`, `Job`, `CronJob`. Annotations may be placed on the Pod template spec (propagates to all created Pods) or directly on Pods.

**Value format for `ai-disclosure`:** A JSON-encoded array matching the provenance record's `ai_assistance` structure:

```json
[{"tool": "claude-sonnet-4-6", "role": "generation"}, {"tool": "github-copilot", "role": "assistance"}]
```

An empty array (`"[]"`) is valid and explicitly asserts that no AI was used — honoring HALOS-CORE-4 (Transparency of AI Involvement) by making absence of AI a deliberate claim rather than missing metadata.

**Relationship to `.halos.json` records:** Annotations are the Kubernetes runtime projection of the provenance record. They carry the same claims at a granularity appropriate for admission control. The `provenance` annotation links back to the full record for audit and toolchain integration.

**Spec location:** `spec/kubernetes-annotations/v0.1.md` (new directory and file).

**Schema:** `spec/schema/halos-kubernetes-annotations-v0.1.schema.json` — validates annotation value formats for use in test tooling.

---

### Kyverno Policies (Step 2)

Two categories of policy:

**Category A — Validation:** Require all three annotations on Pod admission.

```yaml
# sketch — full policy in integrations/kyverno/
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-halos-annotations
spec:
  validationFailureAction: Audit   # Audit by default; adopters can promote to Enforce
  rules:
    - name: check-halos-provenance
      match:
        resources: { kinds: [Pod] }
      validate:
        message: "halos.northharbor.dev/provenance annotation is required"
        pattern:
          metadata:
            annotations:
              halos.northharbor.dev/provenance: "?*"
    # ... human-author and ai-disclosure rules follow the same pattern
```

**Category B — Image verification:** Use Kyverno's `verifyImages` rule to cross-check that the image digest referenced in `halos.northharbor.dev/provenance` matches the running container's image. This validates that the provenance record applies to the actual image, not a substitute.

**Modes:** Policies ship in `Audit` mode by default, allowing adoption without immediate enforcement. Adopters promote to `Enforce` when ready. Both modes are documented in the README.

**Exclusions:** The policies accept a configurable `exclude` block for system namespaces (`kube-system`, `kube-public`, `cert-manager`, etc.).

**Catalog submission:** After governance approval of the annotation spec, submit to [kyverno/policies](https://github.com/kyverno/policies) following their contribution guide.

**Deliverables location:** `integrations/kyverno/`

---

### OPA / Gatekeeper ConstraintTemplates (Step 3)

Gatekeeper policies provide equivalent enforcement for clusters not running Kyverno. The design mirrors the Kyverno policies but uses Rego.

**ConstraintTemplate per annotation:**

```yaml
# sketch — full template in integrations/opa-gatekeeper/
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: halosannotationsrequired
spec:
  crd:
    spec:
      names: { kind: HALOSAnnotationsRequired }
      validation:
        openAPIV3Schema:
          properties:
            excludedNamespaces:
              type: array
              items: { type: string }
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package halosannotationsrequired
        required_annotations := {
          "halos.northharbor.dev/provenance",
          "halos.northharbor.dev/human-author",
          "halos.northharbor.dev/ai-disclosure"
        }
        violation[{"msg": msg}] {
          ann := required_annotations[_]
          not input.review.object.metadata.annotations[ann]
          msg := sprintf("missing required HALOS annotation: %v", [ann])
        }
```

**Unit tests:** Each ConstraintTemplate ships with a `suite.yaml` test file that can be run with `gator verify`. Tests cover: annotation present, annotation missing, exempt namespace.

**Catalog submission:** After governance approval of the annotation spec, submit to [open-policy-agent/gatekeeper-library](https://github.com/open-policy-agent/gatekeeper-library).

**Deliverables location:** `integrations/opa-gatekeeper/`

---

### CI Validation Step — OPA/conftest (Step 4)

A non-Kubernetes OPA policy bundle that can be integrated into any CI pipeline to validate `.halos.json` provenance records before artifacts are published.

**Policy logic:**

```rego
# integrations/opa-ci/halos_provenance.rego
package halos.provenance

import future.keywords.if

deny[msg] if {
    not input.halos_version
    msg := "halos_version is required"
}

deny[msg] if {
    not input.artifact.id
    msg := "artifact.id is required"
}

deny[msg] if {
    not input.human_author.name
    msg := "human_author.name is required"
}

deny[msg] if {
    not input.timestamp
    msg := "timestamp is required"
}

deny[msg] if {
    role := input.ai_assistance[_].role
    valid_roles := {"generation", "drafting", "editing", "review", "assistance"}
    not valid_roles[role]
    msg := sprintf("invalid ai role: %v", [role])
}
```

**CI integration — GitHub Actions:**

```yaml
# Reference snippet for adopt/GUIDE.md
- name: Validate HALOS provenance records
  uses: open-policy-agent/conftest-action@v2
  with:
    policy: integrations/opa-ci/
    files: "**/.halos.json"
```

**Relationship to `scripts/validate.js`:** The existing validator uses `ajv-cli` for JSON Schema validation. This OPA step is complementary — it validates business rules and cross-field constraints that JSON Schema cannot express (e.g., an artifact of type `model` should have at least one `generation` role in `ai_assistance`). Both can run in the same CI job.

**Deliverables location:** `integrations/opa-ci/`

**`adopt/GUIDE.md` update:** Add a Phase 2 sub-step for CI OPA validation after provenance records are introduced.

---

### Dockerfile Label Conventions (Step 5)

OCI image labels carry HALOS metadata into the image layer, enabling static analysis tools to inspect provenance without a running cluster.

**Label keys mirror the annotation keys**, using the OCI-conventional reverse-DNS format:

| Dockerfile `LABEL` | Maps to Kubernetes annotation |
|---|---|
| `dev.northharbor.halos.provenance` | `halos.northharbor.dev/provenance` |
| `dev.northharbor.halos.human-author` | `halos.northharbor.dev/human-author` |
| `dev.northharbor.halos.ai-disclosure` | `halos.northharbor.dev/ai-disclosure` |

**Reference Dockerfile snippet:**

```dockerfile
ARG HALOS_PROVENANCE=""
ARG HALOS_HUMAN_AUTHOR=""
ARG HALOS_AI_DISCLOSURE="[]"

LABEL dev.northharbor.halos.provenance="${HALOS_PROVENANCE}" \
      dev.northharbor.halos.human-author="${HALOS_HUMAN_AUTHOR}" \
      dev.northharbor.halos.ai-disclosure="${HALOS_AI_DISCLOSURE}"
```

Values are passed at build time via `--build-arg`, sourced from the provenance record or CI environment.

**Relationship between labels and annotations:** Labels are set at image build time and are immutable after the image is built. Annotations are set at deploy time and can be updated independently. Enforcement tools should validate both:
- Prisma Cloud / Kubescape: validate labels at image scan time
- Kyverno / Gatekeeper: validate annotations at admission time

If both are present, they should be consistent. A future HALOS recommendation may specify reconciliation behavior when they diverge (e.g., annotation overrides label for deploy-time context, but label is authoritative for supply-chain attestation).

**Prisma Cloud:** Custom compliance check queries `Labels` field via Prisma Cloud's Twistcli or Cloud Security rules.

**Kubescape:** Custom control defined in a Kubescape framework file that inspects the `dev.northharbor.halos.*` labels via the OCI image manifest API.

**Deliverables location:** `integrations/container-images/`

---

### SonarQube Quality Profile (Step 6)

A SonarQube quality gate ensures that provenance compliance is surfaced alongside code quality metrics in the standard developer workflow.

**Integration model:** SonarQube does not natively run OPA. The integration relies on:
1. The CI OPA validation step (Step 4) runs and reports its result as a SonarQube external issue using `sonar-scanner`'s generic issue import format
2. A quality gate condition fails if any HALOS external issues are `BLOCKER` or `CRITICAL` severity

**Generic issue format for SonarQube import:**

```json
{
  "issues": [
    {
      "engineId": "halos-opa",
      "ruleId": "HALOS-PROV-001",
      "severity": "BLOCKER",
      "type": "BUG",
      "primaryLocation": {
        "message": "halos_version is required",
        "filePath": ".halos.json"
      }
    }
  ]
}
```

**Quality profile:** A SonarQube quality profile XML (importable via the SonarQube UI or API) defines:
- A custom rule `HALOS-PROV-001` through `HALOS-PROV-NNN` corresponding to each OPA deny rule
- All rules activated at `BLOCKER` severity
- Profile name: `HALOS Provenance`
- Designed to be **extended from**, not used standalone — adopters extend their existing profile with HALOS rules

**Quality gate condition:**

```
halos_opa_issues (BLOCKER) > 0  → FAILED
```

**`adopt/GUIDE.md` update:** Add a note in Phase 2 for SonarQube adopters, referencing `integrations/sonarqube/README.md`.

**Deliverables location:** `integrations/sonarqube/`

---

## Repository Structure After This Plan

```
halos-spec/
├── spec/
│   ├── kubernetes-annotations/
│   │   └── v0.1.md                   # NEW — normative annotation spec
│   └── schema/
│       └── halos-kubernetes-annotations-v0.1.schema.json  # NEW
│
├── integrations/                      # NEW top-level directory
│   ├── README.md                      # Index of all integration modules
│   ├── kyverno/
│   │   ├── README.md
│   │   ├── require-halos-annotations.yaml
│   │   └── verify-halos-image-provenance.yaml
│   ├── opa-gatekeeper/
│   │   ├── README.md
│   │   ├── template-halos-annotations-required.yaml
│   │   ├── constraint-example.yaml
│   │   └── suite.yaml
│   ├── opa-ci/
│   │   ├── README.md
│   │   ├── halos_provenance.rego
│   │   └── halos_provenance_test.rego
│   ├── container-images/
│   │   ├── README.md
│   │   └── dockerfile-labels.md
│   └── sonarqube/
│       ├── README.md
│       └── quality-profile.xml
│
└── adopt/
    └── GUIDE.md                       # UPDATE — Phase 2 CI and SonarQube steps
```

---

## Work Items

### Phase 1: Annotation spec (governance gate)

- [ ] Draft `spec/kubernetes-annotations/v0.1.md`
- [ ] Draft `spec/schema/halos-kubernetes-annotations-v0.1.schema.json`
- [ ] Open PR and submit through HALOS governance RFC process (Issue #9)
- [ ] Obtain maintainer merge and tag as accepted before proceeding to Phase 2

### Phase 2: Enforcement tooling (depends on annotation spec acceptance)

- [ ] Create `integrations/` directory structure and top-level README
- [ ] Write Kyverno validation policies (Issue #10)
- [ ] Write Kyverno `verifyImages` policy (Issue #10)
- [ ] Write OPA `ConstraintTemplate` and example `Constraint` (Issue #11)
- [ ] Write Rego unit tests (`gator verify`) (Issue #11)
- [ ] Write OPA/conftest CI policy bundle (Issue #12)
- [ ] Write GitHub Actions and GitLab CI reference snippets (Issue #12)
- [ ] Write Dockerfile label conventions doc (Issue #13)
- [ ] Write Kubescape custom control stub (Issue #13)
- [ ] Write Prisma Cloud custom rule notes (Issue #13)
- [ ] Write SonarQube quality profile XML (Issue #14)
- [ ] Write SonarQube README with wiring guide (Issue #14)
- [ ] Update `adopt/GUIDE.md` — CI OPA and SonarQube steps in Phase 2

### Phase 3: External catalog submissions (depends on annotation spec acceptance)

- [ ] Submit Kyverno policies to [kyverno/policies](https://github.com/kyverno/policies)
- [ ] Submit OPA ConstraintTemplates to [open-policy-agent/gatekeeper-library](https://github.com/open-policy-agent/gatekeeper-library)

---

## Decisions

| # | Decision | Rationale |
|---|---|---|
| D1 | Annotation spec goes through governance before tooling is published externally | External catalogs expect stable interfaces. Publishing tooling before the annotation keys are ratified would require breaking changes in third-party policy repos. |
| D2 | Three annotations, all required | `provenance` links to the full record; `human-author` makes accountability queryable without fetching the record; `ai-disclosure` enables admission-time filtering for regulated environments that restrict AI-generated workloads. All three are needed for the annotation layer to be independently useful. |
| D3 | `ai-disclosure: "[]"` is valid and required when no AI was used | Requiring an explicit empty array means absence of the annotation is always an error — you can't bypass the requirement by omitting the field. Explicit `[]` is a deliberate, auditable claim. This upholds HALOS-CORE-4. |
| D4 | Enforcement policies ship in `Audit` mode by default | The goal is adoption, not breakage. Audit mode lets teams instrument first, observe, and promote to Enforce when they have confidence in their provenance coverage. |
| D5 | Integrations live under a new top-level `integrations/` directory | Parallel to `mappings/` (which covers conceptual alignment) but focused on operational tooling. Keeps the root spec clean and makes the integration surface discoverable as a unit. |
| D6 | Dockerfile labels mirror annotation key names via domain inversion | Consistency between labels and annotations reduces cognitive load. Domain inversion (`dev.northharbor.halos.*` vs `halos.northharbor.dev/*`) follows OCI and Kubernetes conventions respectively. |
| D7 | SonarQube integrates via external issue import, not a native plugin | Building a SonarQube plugin is significant engineering work with maintenance burden. The generic issue import format is stable, well-documented, and sufficient for quality gate integration. |
| D8 | OPA CI step is additive to, not a replacement for, `scripts/validate.js` | JSON Schema validation (`ajv-cli`) catches structural errors; OPA catches semantic and cross-field violations. Both are needed for complete CI coverage. |

---

## Open Questions

1. **Annotation granularity.** Should annotations target the Pod template (one annotation per Deployment covering all replicas) or individual Pods (one annotation per running instance)? Pod-template placement is operationally simpler but loses per-instance precision for rolling deployments with different image versions.

2. **`halos.northharbor.dev/provenance` value format.** URI pointing to an external record vs. base64-encoded inline JSON? URI is cleaner but requires the record to be externally accessible at admission time. Inline JSON is self-contained but verbose. Recommendation: URI with optional inline fallback — but this needs community input.

3. **Image digest binding.** The Kyverno `verifyImages` rule can bind image digests to provenance records. Should the annotation spec require that the `provenance` URI resolve to a record whose `artifact.id` matches the running image digest? This would make the link cryptographically meaningful but adds complexity.

4. **Kubescape framework submission.** Kubescape's custom control mechanism is evolving. Should the custom control file be submitted to the [ARMO/kubescape-controls-and-frameworks](https://github.com/armosec/kubescape-controls-and-frameworks) repo, or is it better documented as a local configuration adopters run themselves?

5. **SonarQube Cloud parity.** The quality profile XML format works for self-hosted SonarQube. SonarCloud has a different API. Should both be documented, or is SonarQube (self-hosted) the primary target for v0.1 of this integration?

---

## Sequence Diagram

```
Governance process (Issue #9)
       │
       ▼ annotation spec ratified
       │
       ├──── Kyverno policies (Issue #10) ─────────────► policies.kyverno.io
       │
       ├──── OPA ConstraintTemplates (Issue #11) ───────► gatekeeper-library
       │
       ├──── CI OPA validation (Issue #12) ─────────────► adopt/GUIDE.md Phase 2
       │                                                          │
       ├──── Dockerfile labels (Issue #13)                        │
       │     └── Kubescape / Prisma Cloud                         │
       │                                                          ▼
       └──── SonarQube quality profile (Issue #14) ─────► gates on CI step output
```

---

## References

- [Plan 001: Repo Reorganization and Adoption Toolkit](001-repo-reorganization.md)
- [spec/provenance/v0.1.md](../spec/provenance/v0.1.md) — HALOS provenance record format
- [spec/schema/halos-provenance-v0.1.schema.json](../spec/schema/halos-provenance-v0.1.schema.json)
- [adopt/GUIDE.md](../adopt/GUIDE.md) — Phase 2 adoption guide (to be updated)
- [mappings/cyclonedx-slsa.md](../mappings/cyclonedx-slsa.md) — prior art for embedding strategies
- [Kyverno ClusterPolicy reference](https://kyverno.io/docs/writing-policies/)
- [Gatekeeper ConstraintTemplate authoring](https://open-policy-agent.github.io/gatekeeper/website/docs/constrainttemplates)
- [conftest — OPA-based CI policy testing](https://www.conftest.dev/)
- [OCI Image Spec — annotations](https://github.com/opencontainers/image-spec/blob/main/annotations.md)
- [SonarQube generic issue import format](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/importing-external-issues/generic-issue-import-format/)
