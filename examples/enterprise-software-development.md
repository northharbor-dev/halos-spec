# HALOS Example: Enterprise Software Development

## 1. Scenario

**Domain:** Enterprise software development -- cross-vertical payment processing

**Who:** Tomoko Hayashi is a senior platform engineer at Meridian Systems, a mid-size SaaS company (~400 engineers) that operates across three verticals: financial services, e-commerce, and manufacturing. She leads a small platform team (3 engineers) responsible for shared infrastructure services. She has 12 years of experience, including 4 years building payment systems at a previous fintech company.

**What she's trying to accomplish:** Meridian's three verticals each built their own payment reconciliation logic over the past 5 years. The finance vertical talks to bank ACH APIs, the e-commerce vertical processes credit card settlements through Stripe and Adyen, and the manufacturing vertical handles invoiced net-30/net-60 payments with EDI-based purchase order matching. Each vertical has its own reconciliation bugs, its own audit gaps, and its own compliance exposure. Tomoko's mandate is to build a shared Payment Reconciliation Service (PRS) that all three verticals can migrate to over the next two quarters. The service must reconcile payments against orders/invoices, produce an immutable audit trail, handle partial payments and refunds, and emit events that downstream systems (accounting, tax, fraud detection) can consume.

**How AI is used:** Tomoko uses an AI coding assistant to help architect the service, generate initial implementation scaffolding, draft database migration scripts, and review her team's code for edge cases. She also uses an AI analysis tool to compare the three existing reconciliation systems and identify overlapping logic, conflicting assumptions, and undocumented business rules buried in legacy code.

**Where human judgment is required:** Every architectural decision, every business rule interpretation, every choice about what to centralize versus what to leave vertical-specific. The existing systems encode implicit business logic that no one fully documented -- Tomoko must interview vertical leads, read legacy code, and make judgment calls about what the "correct" behavior actually is. Compliance requirements (PCI-DSS for card data, SOX for financial reporting, audit trail retention policies) impose hard constraints that require human interpretation, not AI generation.

**Decision point with consequences:** The critical architectural decision is whether PRS should use an event-driven architecture (events emitted to a message bus, downstream consumers process asynchronously) or a request-response architecture (synchronous API calls, immediate consistency) for payment reconciliation. The event-driven approach offers better decoupling, horizontal scalability, and natural audit trail generation -- but introduces eventual consistency, which means the finance vertical's real-time balance reporting could show stale data during the reconciliation window. The request-response approach guarantees immediate consistency but creates tight coupling between PRS and every downstream consumer, making it fragile under load and harder to audit because reconciliation state changes aren't captured as discrete events. Tomoko's choice affects compliance posture (SOX auditors want immutable event records), operational resilience (the manufacturing vertical processes batch payments overnight and can tolerate latency; the e-commerce vertical cannot), and the team's ability to debug reconciliation failures across three different payment models.

---

## 2. Collaboration Narrative

**Step 1 -- Legacy System Analysis**
Tomoko asks the AI analysis tool to compare the three existing reconciliation codebases. She provides access to the repositories and describes what each system does at a high level. The AI produces a comparison matrix: shared patterns (all three use idempotency keys, all track reconciliation state machines), divergent patterns (the finance vertical retries failed reconciliations indefinitely; the e-commerce vertical caps at 3 retries then flags for manual review; the manufacturing vertical has no retry logic at all), and undocumented behaviors (the e-commerce system silently rounds fractional cents in multi-currency settlements -- a behavior no one on the current team knew about). Tomoko **accepts** the structural comparison as accurate after cross-referencing with the codebases, but **rejects** the AI's characterization of the manufacturing system's EDI matching as "simple" -- it handles complex partial shipment scenarios that the AI missed because the logic is spread across 14 files with no clear entry point.

**Step 2 -- Architecture Decision**
Tomoko asks the AI to analyze trade-offs between event-driven and request-response architectures for reconciliation, given the constraints she describes: three payment models, SOX audit requirements, mixed latency tolerance across verticals, and a team of 3 engineers. The AI produces a detailed trade-off analysis. Tomoko reads it carefully. The AI recommends event-driven architecture with a CQRS (Command Query Responsibility Segregation) pattern to handle the finance vertical's real-time reporting needs. Tomoko **modifies** this recommendation: she adopts the event-driven core but rejects CQRS as premature complexity for a 3-person team. Instead, she designs a simpler approach -- event-driven reconciliation with a synchronous "balance snapshot" API that the finance vertical can call when it needs a consistent view. She documents her rationale: CQRS would require maintaining separate read and write models, which doubles the surface area for bugs and requires expertise her team doesn't have yet.

**Step 3 -- Service Scaffolding**
Tomoko describes the service architecture to the AI coding assistant and asks it to generate the initial project structure: domain models, event definitions, database schema, and API contracts. The AI generates a complete scaffold including a reconciliation state machine, event schemas, a PostgreSQL migration, and OpenAPI specs. Tomoko **partially accepts** the output: she keeps the project structure, the event schema definitions, and the OpenAPI contract shapes. She **rejects** the AI-generated state machine because it doesn't account for the manufacturing vertical's partial payment workflow (a single invoice can be paid across 3-4 separate remittances over 60 days, each requiring individual reconciliation before the invoice is considered settled). She rewrites the state machine herself, drawing on her interviews with the manufacturing vertical's lead engineer. She also **modifies** the database migration to add partitioning by vertical and payment date -- a performance decision based on her knowledge of query patterns that the AI had no context for.

**Step 4 -- Implementation and Edge Case Review**
Over the next two weeks, Tomoko and her team implement the service. At several points, she asks the AI to review specific modules for edge cases. In one review, the AI identifies a race condition in the concurrent reconciliation handler: if two payment notifications for the same order arrive within milliseconds (common with Stripe webhook retries), the service could create duplicate reconciliation records. Tomoko **accepts** this finding and implements a database-level advisory lock to serialize reconciliation per order ID. In another review, the AI suggests adding automatic currency conversion for the e-commerce vertical's multi-currency settlements. Tomoko **rejects** this suggestion -- currency conversion is the responsibility of the payment gateway, and adding it to PRS would create a second source of truth for exchange rates, violating a compliance requirement she confirmed with the finance team.

**Step 5 -- Security Review and Compliance Check**
Tomoko's teammate, Marcus Webb, conducts a security review of the service. He runs automated SAST/DAST scanning and manually reviews the payment data handling paths. He confirms that PRS never stores raw card numbers (it only receives tokenized references from payment gateways), that the audit event log is append-only with cryptographic chaining, and that all API endpoints require mTLS with vertical-specific service certificates. Marcus approves the security posture.

**Step 6 -- Architecture Review Board Approval**
Tomoko presents PRS to Meridian's Architecture Review Board (ARB), a 4-person committee that approves all shared infrastructure services. She presents the design, the migration plan, and the HALOS provenance record documenting AI involvement. The ARB approves the service for production deployment with one condition: the finance vertical must run PRS in shadow mode (parallel to the existing system, comparing outputs) for 30 days before cutover. ARB chair Lena Vasquez signs off on the approval.

---

## 3. Artifact Description

**What was created:** Payment Reconciliation Service (PRS) v1.0 -- a Go microservice comprising ~8,200 lines of application code, a PostgreSQL schema (12 tables, 4 materialized views), 47 event schema definitions (Avro), OpenAPI 3.1 contract, Terraform infrastructure-as-code for AWS deployment, and 340 unit/integration tests. Delivered as a container image with an accompanying deployment runbook and ADR (Architecture Decision Record) set.

**How it is used:** PRS is deployed as a shared platform service consumed by all three verticals. It processes payment notifications from 5 payment gateways (Stripe, Adyen, ACH processor, wire transfer processor, EDI payment hub), reconciles each payment against the originating order or invoice, emits reconciliation events to a Kafka topic that 8 downstream consumers subscribe to (accounting ledger, tax calculation, fraud scoring, 3 vertical-specific dashboards, finance balance reporting, and a compliance audit archive). It processes approximately 45,000 reconciliation events per day across all verticals.

**What happens if it is wrong:** A reconciliation error can cause revenue misstatement. If PRS incorrectly marks a payment as reconciled when it shouldn't be (or vice versa), the accounting ledger diverges from reality. For the finance vertical, this is a SOX compliance violation that could surface during quarterly audits. For the e-commerce vertical, it could result in customers being charged twice or refunds not being processed. For the manufacturing vertical, incorrect reconciliation of partial payments could cause premature invoice closure, leading to the company writing off legitimate receivables. In all cases, the append-only audit log provides a recovery path -- but the operational cost of unwinding incorrect reconciliation across three verticals simultaneously is high.

---

## 4. HALOS v0.2 Record (JSON)

See [enterprise-software-development.halos.json](enterprise-software-development.halos.json)

---

## 5. AIVSS-Style Interpretation

Rather than calculating a numeric score, here is how this example would be assessed across AIVSS-relevant dimensions:

**Data Provenance**
HALOS reveals the full derivation chain of the artifact. The AI contributed a legacy code comparison (partially accepted, partially rejected), an architecture trade-off analysis (modified significantly), service scaffolding (partially accepted with major rewrites), and edge case identification (one accepted, one rejected). In every case, the human's modifications and rejections are documented with rationale. The provenance record makes clear that no AI-generated code reached production without human review and deliberate acceptance. *This lowers risk: an auditor can trace any component of PRS back to either human authorship or a specific AI contribution that was explicitly evaluated and accepted.*

**Transparency / Explainability**
The interaction semantics across six collaboration steps make explicit what Tomoko accepted, what she rejected, and why. The architecture decision is documented with the AI's recommendation, Tomoko's modification, and her rationale for diverging (team size, complexity concerns, alternative approach). The AI tools are identified by name and role. A compliance officer, an auditor, or a new engineer joining the team can read the HALOS record and understand exactly where AI influenced the system and where it did not. *This lowers risk: no hidden AI involvement in a financially sensitive system; the reasoning behind key decisions is preserved.*

**Accountability**
Tomoko is named as the responsible decision-maker for architecture and implementation decisions. Marcus is identified as the security reviewer. Lena Vasquez and the ARB are identified as approvers. The `actedOnBehalfOf` relationships confirm that both AI tools operated under Tomoko's direction. The record also captures that Tomoko rejected AI suggestions on multiple occasions with specific rationale -- demonstrating active human oversight, not passive rubber-stamping. *This lowers risk: the chain of accountability is unambiguous, from individual code decisions through security review to organizational approval.*

**Human Oversight**
AI output went through multiple layers of human evaluation: Tomoko's direct review of every AI contribution, Marcus's independent security review, and the ARB's architectural approval. The record shows that Tomoko rejected or substantially modified more AI output than she accepted unchanged -- the AI was a tool, not a co-author. The ARB's shadow-mode requirement adds a fourth oversight layer before the system processes real payments. *This lowers risk: the oversight structure is deep and involves people with different concerns (engineering, security, organizational governance).*

**Decision Criticality**
The architecture decision (event-driven vs. request-response) has long-lasting consequences for compliance posture, system reliability, and operational complexity across three business verticals. HALOS captures not just what was decided, but the context (SOX requirements, team constraints, mixed latency tolerance), the AI input that was considered and modified, and the human rationale for the final choice. The currency conversion rejection is similarly documented -- a seemingly small decision that, if made differently, would have created a compliance violation. *This is high criticality: these decisions affect financial accuracy, regulatory compliance, and system architecture that will be expensive to change later.*

**Societal / Operational Impact**
PRS processes 45,000 reconciliation events daily across financial, commercial, and industrial payment flows. Errors propagate to accounting ledgers, tax calculations, and customer-facing billing. The system handles real money -- incorrect reconciliation directly translates to financial loss or regulatory exposure. HALOS makes the human decision-making trail auditable, which is directly relevant to SOX compliance and PCI-DSS evidence requirements. *This raises the stakes: the provenance record is not just good practice -- it is evidence that a financially critical system was built with appropriate human oversight and documented decision-making.*

---

## 6. AIUC-1 Classification

**Use Type:** Decision-support

The AI provided analysis (legacy code comparison, architecture trade-off evaluation) and generated raw material (scaffolding, edge case identification) that informed human decisions. It did not make architectural, business logic, or compliance decisions. However, the AI's contributions went beyond simple assistance -- the trade-off analysis and legacy code comparison directly shaped Tomoko's understanding of the problem space, which is why this is decision-support rather than purely assistive.

**Impact Level:** High

The artifact is a shared financial processing service with direct implications for revenue accuracy, regulatory compliance (SOX, PCI-DSS), and operational reliability across three business verticals. Errors can cause financial misstatement, compliance violations, and customer-facing billing failures. The system processes real monetary transactions.

**Human Involvement:**

Tomoko is involved at every stage: she directs all AI interactions, evaluates and filters all AI output, makes every architectural and business logic decision, and writes or rewrites all compliance-sensitive code. Marcus provides independent security review. The ARB provides organizational-level architectural approval with deployment conditions. No AI output reaches the final artifact without at least two layers of human judgment (Tomoko's engineering review + Marcus's security review or ARB approval), and the highest-risk component (the reconciliation state machine) was entirely human-authored after Tomoko rejected the AI's version.

---

## 7. Crosswalk to Frameworks

### NIST AI RMF

**Govern**
Meridian's AI usage policy requires HALOS provenance records for any shared infrastructure service that uses AI during development. The `governance` field references this policy. The ARB's review process includes examining the HALOS record as part of architectural approval -- AI involvement is a factor in their risk assessment, not a reason for automatic rejection. HALOS provides the artifact-level evidence that Meridian's organizational AI governance policy was followed for this specific service.

**Map**
The HALOS record maps AI involvement to specific activities: legacy code analysis, architecture trade-off evaluation, scaffolding generation, and code review. It distinguishes between AI contributions that informed decisions (analysis) and AI contributions that produced artifact components (generation). This makes it possible to assess where AI risk is concentrated -- the scaffolding generation and edge case detection carry different risk profiles than the trade-off analysis, and the record captures that the highest-risk component (state machine) was human-authored after AI output was rejected.

**Measure**
The interaction semantics provide concrete, auditable measures of human oversight quality. Across six collaboration steps: 1 AI output fully accepted, 2 partially accepted with significant human rework, 2 rejected with rationale, and 1 modified. These are not abstract oversight claims -- they are specific, timestamped records of what the human did with each AI contribution. The ARB's shadow-mode requirement is also captured, providing evidence that organizational risk management processes were applied.

**Manage**
If a reconciliation error is discovered in production, the HALOS record supports root cause analysis: was the error in AI-generated code that was accepted, in human-written code, or in the interaction between them? The decision provenance allows reconstruction of why the system works the way it does. If a SOX auditor questions why PRS uses eventual consistency for reconciliation, the decision record explains the trade-off, names the responsible human, and shows that the decision was informed (but not determined) by AI analysis.

### ISO/IEC 42001

**Auditability**
The HALOS record is a self-contained, machine-readable audit trail covering the full development lifecycle. Every AI interaction is logged with tool identifiers, timestamps, and human responses. The decisions array captures the context, alternatives, and rationale for each significant choice. An ISO 42001 auditor can reconstruct the development process from legacy analysis through architectural decision through implementation through security review through organizational approval -- without relying on oral testimony or after-the-fact documentation.

**Responsibility Tracking**
The `human_author`, `review`, `decisions`, and `graph.relationships` establish a clear chain of responsibility: Tomoko authored and made engineering decisions, Marcus reviewed security, Lena and the ARB approved the architecture. The `actedOnBehalfOf` relationships confirm AI tools operated under Tomoko's direction. ISO 42001's requirement for clear role assignment is satisfied at the artifact level -- and the record shows that responsibility was distributed appropriately across engineering, security, and governance functions.

**Process Transparency**
The graph model makes the development process legible to third parties: legacy analysis -> architecture decision -> scaffolding generation -> human rework -> implementation -> edge case review -> security review -> ARB approval. Each step is typed, timestamped, and attributed. The interaction semantics at each step show not just what happened but how the human engaged with AI output. This supports ISO 42001's process documentation requirements and provides richer evidence than a simple "AI was used in development" disclosure.

### CycloneDX (Optional)

In an enterprise context where PRS is tracked as a component in Meridian's software supply chain, HALOS and CycloneDX serve complementary roles:

**CycloneDX** would catalog *what components exist* in PRS -- the Go modules, PostgreSQL schema, Avro event definitions, Terraform modules, container base image, and their respective versions and licenses. It answers: "What is in this service?"

**HALOS** records *how each component was created* -- which parts involved AI generation, what the human accepted or rejected, what architectural decisions shaped the design, and who approved it for production. It answers: "Who made this, with what AI help, and what choices did they make?"

**Combined**, an internal auditor reviewing PRS for SOX compliance could look up the service in the CycloneDX SBOM, find the embedded HALOS provenance record, and understand both the technical composition and the human decision-making history. This is particularly valuable for financial services software, where regulators increasingly expect organizations to demonstrate not just what software they run, but how it was built and what role AI played in its development.
