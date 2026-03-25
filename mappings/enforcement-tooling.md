# HALOS and Enforcement Tooling

How existing security and policy tools can enforce HALOS provenance requirements — and why their distribution ecosystems are a primary adoption vector.

---

## Why This Matters

HALOS principles only create real accountability when they are enforced, not just declared. Five categories of tooling already exist in most enterprise and cloud-native environments that can carry HALOS enforcement without new infrastructure: static analysis, admission control, policy engines, image security, and posture management.

Each of these tools has a **rule distribution system** — a catalog, library, or profile marketplace where policies are shared across their user base. Publishing HALOS policies into these catalogs puts HALOS in front of their existing audiences without requiring teams to discover HALOS independently.

---

## Integration Point Map

The tools cover different phases of the software delivery lifecycle:

```
Code Authorship   →   CI / Build   →   Image / Package   →   Deploy   →   Runtime
   [SonarQube]                         [Twistlock /           [Kyverno]   [Kubescape]
                                        Prisma Cloud]        [OPA Gate.]
```

---

## Tool Analysis

### 1. Kyverno

**What it is:** Kubernetes-native policy engine (CNCF). Evaluates admission requests against YAML-defined policies. Supports validate, mutate, generate, and verify-image operations.

**HALOS principles served:**
- `HALOS-CORE-1` — Require human approval annotation on Deployments before they proceed
- `HALOS-CORE-3` — Require pods/images to reference a HALOS provenance attestation
- `HALOS-CORE-5` — Block deployments that lack agent behavioral constraint documentation
- `HALOS-CORE-8` — Enforce provenance as a release gate; mutations can inject provenance refs

**Integration approach:**

A `ClusterPolicy` that requires a `halos.northharbor.dev/provenance` annotation on all Deployments, or that verifies an image has a cosign-signed HALOS provenance attestation:

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-halos-provenance
spec:
  validationFailureAction: Enforce
  rules:
    - name: check-halos-annotation
      match:
        any:
          - resources:
              kinds: [Deployment]
      validate:
        message: "HALOS provenance reference is required. Add halos.northharbor.dev/provenance annotation."
        pattern:
          metadata:
            annotations:
              halos.northharbor.dev/provenance: "?*"
```

A verify-image rule can check that the image has an in-toto attestation with `predicateType: https://halos.northharbor.dev/provenance/v0.1`.

**Adoption flywheel:** [policies.kyverno.io](https://policies.kyverno.io) — community policy catalog. Publishing a `halos-provenance` policy set here exposes HALOS to all Kyverno users browsing for supply chain policies.

| Dimension | Assessment |
|---|---|
| **Value** | Very High — enforcement at the deploy gate, automatic block without override |
| **Ease** | High — pure YAML, no code required, well-documented pattern |
| **Priority** | **#1** |

---

### 2. OPA Gatekeeper

**What it is:** Open Policy Agent admission controller for Kubernetes (CNCF graduated). Policies written in Rego; distributed as ConstraintTemplates.

**HALOS principles served:**
- `HALOS-CORE-3` — Validate that resources reference valid HALOS provenance records
- `HALOS-CORE-4` — Reject workloads that lack AI-disclosure annotations
- `HALOS-CORE-5` — Enforce that agent constraint files are present and versioned
- `HALOS-CORE-8` — Block releases that cannot prove provenance lineage

**Integration approach:**

A ConstraintTemplate that validates HALOS provenance annotations:

```rego
package halos.provenance

violation[{"msg": msg}] {
  container := input.review.object
  not container.metadata.annotations["halos.northharbor.dev/provenance"]
  msg := "Deployment is missing required HALOS provenance annotation (halos.northharbor.dev/provenance)"
}
```

Beyond Kubernetes, OPA can also validate HALOS `.halos.json` records directly in CI pipelines — the JSON schema maps cleanly to Rego policy, enabling CI-time validation of provenance structure and completeness before artifacts are published.

**Adoption flywheel:** [open-policy-agent/gatekeeper-library](https://github.com/open-policy-agent/gatekeeper-library) — official policy library with broad enterprise distribution. OPA is also embedded in API gateways, Terraform (Conftest), and CI tools, extending reach beyond Kubernetes.

| Dimension | Assessment |
|---|---|
| **Value** | Very High — enterprise-dominant platform; reaches organizations not using Kyverno |
| **Ease** | Medium — Rego has a learning curve; ConstraintTemplate packaging adds steps |
| **Priority** | **#2** |

---

### 3. SonarQube

**What it is:** Code quality and security analysis platform. Runs in CI as a quality gate before merge. Supports custom rules and quality profiles that can be shared across organizations.

**HALOS principles served:**
- `HALOS-CORE-3` — Custom rule: flag files that lack a corresponding `.halos.json` provenance record
- `HALOS-CORE-4` — Quality gate condition: block merge if AI-assisted commits lack `AI-Assisted:` trailer
- `HALOS-CORE-5` — Rule: detect committed agent configuration files (CLAUDE.md, .cursor/rules) without human author attribution

**Integration approach:**

The cleanest entry point is not a SonarQube plugin but a **Quality Gate webhook** or external CI step that SonarQube's gate can depend on. A CI step validates HALOS provenance records before SonarQube reports results; both gates must pass for the PR to merge.

Alternatively, a SonarQube custom rule (implemented as a SonarQube plugin or external analyzer) can flag commits missing the `AI-Assisted:` trailer convention when the diff pattern suggests AI-assisted content.

**Quality profile distribution:** SonarQube quality profiles are shareable XML. A HALOS quality profile that includes all relevant checks can be published and imported by adopting organizations.

| Dimension | Assessment |
|---|---|
| **Value** | High — developer-facing; enforcement at merge time; reaches teams already using SonarQube |
| **Ease** | Medium — Quality Gate integration is straightforward; custom SonarQube plugin is more work |
| **Priority** | **#3** |

---

### 4. Twistlock / Prisma Cloud

**What it is:** Container security platform (Palo Alto Networks). Scans images for vulnerabilities, enforces compliance policies, and provides runtime protection.

**HALOS principles served:**
- `HALOS-CORE-3` — Compliance rule: require that container images carry a HALOS provenance label or attestation reference
- `HALOS-CORE-4` — Compliance rule: flag images built with AI-assisted tooling that lack disclosure labels
- `HALOS-CORE-8` — Block deployment of images that fail HALOS compliance checks

**Integration approach:**

Prisma Cloud supports custom compliance rules and image label checks. A HALOS compliance template would check for:

```
Label: org.halos.provenance.version = "0.1"
Label: org.halos.provenance.human_author = <non-empty>
Label: org.halos.provenance.ai_disclosure = <present>
```

These labels can be added to container images via `LABEL` directives in Dockerfiles or injected during CI. Prisma Cloud's compliance framework can then enforce them across the registry.

**Adoption flywheel:** Prisma Cloud compliance library is centrally managed per organization, but Palo Alto distributes benchmark templates across their customer base. A HALOS compliance benchmark published to their marketplace reaches large regulated-industry organizations.

| Dimension | Assessment |
|---|---|
| **Value** | High for regulated industries — compliance framing resonates with financial/healthcare enterprises |
| **Ease** | Low-Medium — Prisma Cloud policy authoring is proprietary; enterprise procurement adds friction |
| **Priority** | **#4** |

---

### 5. Kubescape

**What it is:** Kubernetes security posture management tool (ARMO, CNCF sandbox). Scans clusters and manifests against NSA/CISA, CIS, MITRE frameworks. Supports custom controls.

**HALOS principles served:**
- `HALOS-CORE-3` — Custom control: verify that Deployments include `halos.northharbor.dev/provenance` annotation
- `HALOS-CORE-8` — Posture check: report on ratio of workloads with valid HALOS provenance references

**Integration approach:**

Kubescape supports custom controls through its framework. A HALOS control can be expressed as a check on the presence and structure of provenance annotations on Deployments, StatefulSets, and Jobs.

This is better suited as a **posture and reporting** tool than a hard enforcement gate. Kubescape reports tell platform teams how many workloads are HALOS-compliant without blocking deployments — a useful adoption ramp before moving to Kyverno or OPA enforcement.

**Adoption flywheel:** [ARMO Hub](https://hub.armo.cloud) for custom control distribution. Smaller footprint than OPA/Kyverno but growing in cloud-native security circles.

| Dimension | Assessment |
|---|---|
| **Value** | Medium — reporting and posture visibility; useful as a precursor to enforcement |
| **Ease** | Medium — custom controls are doable but less documented than Kyverno/OPA |
| **Priority** | **#5** |

---

## Priority and Value Matrix

| Tool | Value | Ease | Enforcement Type | Distribution System | Priority |
|---|---|---|---|---|---|
| **Kyverno** | Very High | High | Hard gate (admit/reject) | policies.kyverno.io | **1** |
| **OPA Gatekeeper** | Very High | Medium | Hard gate + CI validation | gatekeeper-library | **2** |
| **SonarQube** | High | Medium | Merge gate | Quality profiles (XML) | **3** |
| **Prisma Cloud** | High | Low-Med | Image gate | Compliance library | **4** |
| **Kubescape** | Medium | Medium | Posture / reporting | ARMO Hub | **5** |

---

## The Adoption Flywheel

The strategic argument for all five tools is the same: these communities already have **policy distribution infrastructure**. Teams adopting HALOS do not need to write policies from scratch — they install from a catalog.

**The flywheel:**
1. Publish HALOS policy sets to each tool's catalog/library
2. Teams searching for supply chain or AI-disclosure policies find HALOS policies
3. Installing the policy introduces teams to HALOS without requiring prior awareness
4. The enforcement creates a visible HALOS footprint (annotations, labels, gate messages)
5. Visibility drives questions, documentation reads, and deeper adoption

The most direct path:
- **Publish to policies.kyverno.io** — YAML, low barrier, community-reviewed
- **Publish to gatekeeper-library** — reaches enterprise Kubernetes platforms
- **Publish a SonarQube quality profile** — reaches developer-centric organizations
- **Provide Dockerfile label conventions** — enables Prisma Cloud adoption without a plugin

---

## Recommended Implementation Sequence

1. **Define HALOS Kubernetes annotations** (a short spec: `halos.northharbor.dev/provenance`, `halos.northharbor.dev/human-author`, `halos.northharbor.dev/ai-disclosure`) — this is the shared primitive that Kyverno, OPA, and Kubescape all validate against
2. **Write Kyverno policies** — validate and verify-image rules for the annotations; submit to policies.kyverno.io
3. **Write OPA ConstraintTemplates** — equivalent coverage; submit to gatekeeper-library
4. **Write CI validation step** using OPA (non-Kubernetes) to validate `.halos.json` records in build pipelines
5. **Define Dockerfile label conventions** for HALOS metadata to enable Prisma Cloud and Kubescape checks
6. **Define SonarQube quality profile** referencing the CI step as a required external gate

The annotation spec (step 1) should be proposed through the HALOS governance process before the tooling integrations are published to external catalogs.

---

## Relationship to Existing HALOS Tooling

| Existing | New Enforcement Layer |
|---|---|
| `.halos.json` provenance record | OPA validates structure in CI; Kyverno/OPA verify attestation at deploy |
| `AI-Assisted:` commit trailer | SonarQube / CI quality gate checks trailer presence |
| `halos.yaml` governance profile | Kyverno can require profile annotation on namespace before workloads deploy |
| CycloneDX SBOM embedding | Prisma Cloud compliance rule can require HALOS fields in component evidence |
| SLSA provenance attestation | Kyverno verify-image can check for co-present HALOS predicate in attestation bundle |

---

*This mapping should be treated as exploratory. Concrete policy implementations and catalog submissions require proposals through the HALOS governance process.*
