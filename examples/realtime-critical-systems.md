# HALOS Example: Real-time, Critical Systems

## 1. Scenario

**Domain:** Industrial control systems — municipal water treatment

**Who:** Luis Herrera is a senior control systems engineer at the Lakeview Regional Water Treatment Facility, which serves a municipality of approximately 200,000 people. He holds a Professional Engineer (PE) license and is the designated Responsible Operator for the facility's chemical dosing subsystem. He has 14 years of experience in water treatment automation and is certified under his state's Department of Environmental Quality operator licensing program.

**What he's trying to accomplish:** Luis needs to update the PLC (Programmable Logic Controller) logic that governs chlorine dosing for the facility's disinfection stage. The existing ladder logic uses a simple residual-feedback loop: it reads free chlorine residual from online analyzers at the clearwell outlet and adjusts hypochlorite pump speed to maintain a target of 0.8 mg/L. This approach works but is reactive — it responds to deviations after they occur, leading to occasional over-dosing (wasted chemical, elevated disinfection byproducts) and under-dosing transients during demand spikes. Luis wants to implement a predictive, feedforward-feedback hybrid algorithm that anticipates demand changes based on influent turbidity, flow rate, temperature, and time-of-day patterns.

**How AI is used:** Luis uses an AI analysis platform designed for industrial process optimization. The AI ingests 18 months of historical SCADA (Supervisory Control and Data Acquisition) data — flow rates, turbidity readings, temperature, chlorine residual, pump speeds, and seasonal patterns — and generates a proposed dosing algorithm with tuned parameters. The AI identifies correlations between influent conditions and optimal dose rates that would be difficult for a human to extract manually from 18 months of multivariate data.

**Where human judgment is required:** Every aspect of the final PLC logic is Luis's responsibility. The AI produces a proposed algorithm and parameters, but Luis must evaluate whether the algorithm is safe under all operating conditions — including conditions not well-represented in the training data (seasonal floods, main breaks, algal blooms). He must verify that the algorithm respects hard safety limits mandated by the EPA Surface Water Treatment Rule and the facility's state operating permit. He must ensure the PLC implementation includes proper fail-safes, alarm conditions, and fallback to manual control. The facility's Chief Plant Operator and the state's Department of Environmental Quality must review and approve any changes to the disinfection control strategy.

**Decision point with consequences:** The AI's proposed algorithm recommends reducing the base chlorine dose during the November-through-February period by 12%, based on historical data showing lower microbial loading in cold-water months. Luis must evaluate this recommendation against a specific risk: late-fall storm events regularly wash agricultural runoff into the source reservoir, causing transient spikes in turbidity and organic loading that are not predictable from the historical pattern alone. These events have historically occurred 3-5 times per season. If Luis accepts the reduced winter dosing without adequate safeguards, a storm-driven contamination event during a period of lower-than-normal chlorine residual could result in inadequate pathogen inactivation — meaning *Cryptosporidium*, *Giardia*, or coliform bacteria could reach the distribution system. The consequences range from a boil-water advisory affecting 200,000 people to a waterborne disease outbreak. If Luis over-corrects in the other direction and maintains unnecessarily high dosing, the facility will generate excess trihalomethanes (THMs), which are regulated carcinogens under the EPA's Disinfectants and Disinfection Byproducts Rule.

---

## 2. Collaboration Narrative

**Step 1 — Data Preparation & Scoping**
Luis exports 18 months of SCADA historian data, including 5-minute interval readings for influent flow, raw water turbidity, temperature, pre-chlorination residual, post-filtration turbidity, clearwell chlorine residual, hypochlorite pump speed, and distribution system residual at three monitoring points. He also compiles the facility's operating permit limits, EPA regulatory thresholds, and the facility's internal standard operating procedure (SOP) for disinfection control. He writes a structured brief for the AI describing the optimization objective: "Minimize chlorine usage and DBP formation while maintaining compliance with the Surface Water Treatment Rule CT requirements at all times. Hard constraints: free chlorine residual at clearwell outlet must never fall below 0.5 mg/L; distribution system residual must remain between 0.2 mg/L and 4.0 mg/L."

**Step 2 — AI Analysis & Algorithm Proposal**
The AI platform analyzes the historical data and generates a detailed report: a proposed feedforward-feedback dosing algorithm, a set of tuned PID parameters, seasonal adjustment curves, and a sensitivity analysis showing how the algorithm would have performed against historical conditions. The AI's proposed algorithm includes three components: (1) a feedforward calculation based on flow and turbidity, (2) a time-of-day seasonal bias, and (3) a feedback trim from the clearwell residual analyzer. Critically, the AI proposes a 12% reduction in the winter seasonal bias, projecting a 9% reduction in annual hypochlorite consumption and a measurable decrease in THM formation.

**Step 3 — Human Engineering Review**
Luis spends two days reviewing the AI's output against his domain knowledge and the facility's operating history. He performs several critical evaluations:

- **Regulatory compliance check:** He verifies that the proposed algorithm's minimum dose rates still satisfy the CT (concentration x time) requirements under the Surface Water Treatment Rule for the facility's clearwell volume and flow rates. He runs worst-case calculations manually.
- **Storm event analysis:** He specifically examines how the proposed algorithm would have performed during five known storm events in the historical data. He finds that the AI's algorithm handled three of them adequately because the feedforward turbidity signal triggered increased dosing. However, for two events where turbidity spikes lagged behind the initial contamination pulse (dissolved organics arrived before particulates), the AI's algorithm would have under-dosed for approximately 45 minutes.
- **Failure mode review:** He evaluates what happens if the turbidity analyzer fails, if the flow meter drifts, or if the chlorine analyzer gives a false-high reading. The AI's algorithm does not include explicit fault-handling logic for these scenarios.

**Step 4 — Human Modification**
Luis **accepts** the AI's feedforward-feedback structure and the flow/turbidity correlation model, which he judges to be sound engineering. He **rejects** the 12% winter dose reduction and instead implements a 5% reduction with a mandatory storm-event override: when raw water turbidity exceeds 10 NTU or when the rate of turbidity change exceeds 2 NTU/hour, the algorithm must revert to a conservative fixed dose rate of 1.0 mg/L regardless of the feedforward calculation. He **adds** several safety features the AI did not include:

- Analyzer fault detection: if the chlorine analyzer reading is stale (no update for >10 minutes) or reads exactly 0.0 mg/L (likely sensor failure), the system locks the pump at the last known good speed and triggers an operator alarm.
- High-high and low-low residual alarms with automatic escalation to the Chief Plant Operator's phone.
- A hard floor on pump speed: the pump cannot be commanded below 15% speed under any algorithmic condition, ensuring a minimum dose even if all sensors fail simultaneously.
- A manual override lockout timer: if an operator engages manual control, the system cannot return to automatic mode for at least 30 minutes, preventing oscillation between manual and automatic during an event.

**Step 5 — Simulation & Validation**
Luis uses the facility's PLC simulation environment to test the modified algorithm against 18 months of historical data, replaying SCADA recordings. He specifically stress-tests the five storm events and two additional synthetic worst-case scenarios (simultaneous high turbidity + high flow + cold temperature). He documents the results: the modified algorithm maintains CT compliance in all scenarios, including the two storm events where the original AI proposal would have under-dosed.

**Step 6 — Internal Review**
Luis presents the modified algorithm, the AI analysis report, his engineering modifications, and the simulation results to the facility's Chief Plant Operator, Karen Osei. Karen reviews the changes with particular attention to operator interface impacts and alarm logic. She requests one modification: adding a daily summary log entry to the SCADA historian that records the algorithm's actual vs. predicted dose for trending purposes. Luis implements this.

**Step 7 — Regulatory Review & Approval**
The facility submits a modified disinfection control strategy notification to the state Department of Environmental Quality, as required by their operating permit for changes to the disinfection process. The submission includes the algorithm specification, the simulation validation report, and the HALOS provenance record documenting the AI's role and Luis's engineering review. The state reviewer, Dr. Ingrid Solheim, reviews the submission and approves it with the condition that the facility conduct enhanced distribution system monitoring (daily instead of weekly coliform sampling) for the first 90 days of operation.

**Step 8 — Implementation & Commissioning**
Luis implements the final algorithm in the PLC, conducts a controlled commissioning with the old and new algorithms running in parallel (new algorithm calculating but not controlling, compared to old algorithm output). After 72 hours of parallel operation confirming agreement within expected bounds, the new algorithm is placed in active control under Luis's direct supervision.

---

## 3. Artifact Description

**What was created:** A modified PLC program (structured text and function block diagram) implementing a feedforward-feedback hybrid chlorine dosing algorithm for the Lakeview Regional Water Treatment Facility. The artifact includes the control logic, tuned parameters, alarm configurations, fault-handling routines, and operator interface screens. It is deployed on a Rockwell ControlLogix L8 PLC and archived in the facility's version-controlled PLC program repository.

**How it is used:** The PLC program runs continuously, 24 hours a day, 7 days a week, controlling the rate at which sodium hypochlorite is injected into treated water before it enters the clearwell and distribution system. The algorithm makes dosing adjustments every 30 seconds based on real-time sensor inputs. The treated water is consumed by approximately 200,000 people.

**What happens if it is wrong:**
- **Under-dosing:** Inadequate pathogen inactivation. *Cryptosporidium*, *Giardia*, or bacterial pathogens could survive disinfection and enter the distribution system. Consequences range from a precautionary boil-water advisory (economic disruption, public anxiety) to a waterborne disease outbreak (hospitalizations, potential fatalities among immunocompromised individuals). The facility would face regulatory enforcement, potential criminal liability under the Safe Drinking Water Act, and loss of public trust.
- **Over-dosing:** Excessive formation of trihalomethanes (THMs) and haloacetic acids (HAAs), which are regulated carcinogens. Chronic over-dosing could cause the facility to exceed EPA Maximum Contaminant Levels (MCLs), triggering violations, public notification requirements, and long-term health risks to consumers. Acute over-dosing can cause taste/odor complaints and chemical burns to skin and eyes at extreme levels.
- **Control instability:** Oscillation or runaway behavior in the dosing pump could cause mechanical damage, chemical spills, or alternating over/under-dosing. A failed sensor with no fault detection could cause the algorithm to drive the pump to 0% or 100%.

---

## 4. HALOS v0.2 Record (JSON)

See [realtime-critical-systems.halos.json](realtime-critical-systems.halos.json)

---

## 5. AIVSS-Style Interpretation

Rather than calculating a numeric score, here is how this example would be assessed across AIVSS-relevant dimensions:

**Data Provenance**
HALOS reveals that the AI's contribution was analytical — it processed 18 months of SCADA data and proposed an algorithm with parameters. The provenance record documents the specific data inputs (historian export, permit limits, SOP), the AI's outputs (feedforward model, seasonal curves, proposed parameters), and the precise boundary between what the AI proposed and what the engineer implemented. The modifications are individually documented: the winter dose reduction was changed from 12% to 5%, storm overrides were added, fault detection was added, hard safety floors were added. *This substantially lowers risk: a regulator or incident investigator can reconstruct exactly what came from the AI, what the engineer changed, and why — without relying on anyone's memory.*

**Transparency / Explainability**
The interaction semantics (`partial` and `modified` responses with detailed notes) make explicit that the AI's output was not used as-is. The rationale for each modification is documented — not just "the engineer changed it" but *why*: the storm event analysis that revealed the 45-minute under-dosing window, the failure modes the AI did not address, the regulatory constraints that set hard floors. An incident investigator reviewing this record can understand the engineer's reasoning process. *This lowers risk: the decision-making process is legible to regulators, safety investigators, and future engineers who inherit this system.*

**Accountability**
Luis Herrera is identified as the responsible PE for the dosing algorithm design. Karen Osei is identified as the Chief Plant Operator who reviewed and approved the changes internally. Dr. Ingrid Solheim is identified as the state regulatory reviewer who approved the modified disinfection strategy. The `actedOnBehalfOf` relationship confirms that the AI operated under Luis's direction — the AI is explicitly positioned as a tool, not a decision-maker. *This lowers risk: there is no ambiguity about who is professionally and legally liable. The PE stamp is Luis's; the AI has no standing in the accountability chain.*

**Human Oversight**
This example demonstrates the deepest human oversight pattern in any HALOS scenario. The AI output passed through four layers of review: (1) Luis's two-day engineering review including manual worst-case calculations, (2) simulation validation against historical data and synthetic stress scenarios, (3) internal review by the Chief Plant Operator, and (4) regulatory review by a state environmental engineer. Beyond the review layers, Luis added multiple runtime safety mechanisms — analyzer fault detection, hard dosing floors, alarm escalation, manual override protections — that ensure human operators can intervene at any time during operation. *This substantially lowers risk: AI output was treated as an engineering input, not a final answer, and was subjected to the same rigor as any safety-critical design change.*

**Decision Criticality**
The dosing algorithm decision directly determines whether 200,000 people receive safely disinfected drinking water. The HALOS record captures not only the final decision but the specific risk analysis that informed it — the storm event analysis, the 45-minute under-dosing window in the AI's proposal, the trade-off between pathogen risk and DBP formation. The record also captures the more conservative choice (5% vs. 12% reduction) and the rationale for that conservatism. *This is the highest criticality level: the decision has direct, immediate consequences for public health, and the provenance record provides the evidence base for evaluating whether the decision was defensible.*

**Societal / Operational Impact**
The artifact operates continuously, affecting every person who drinks water from the Lakeview distribution system. A failure in this system does not degrade gracefully — under-dosing can cause illness within days. The HALOS record provides evidence that AI involvement was appropriate (analytical, not autonomous), that the human engineer applied professional judgment, that multiple independent reviewers validated the approach, and that regulatory oversight was maintained throughout. *This is critical for public trust: if an incident occurs, the provenance record demonstrates that the facility followed a rigorous process and did not blindly implement AI recommendations.*

---

## 6. AIUC-1 Classification

**Use Type:** Decision-Support

The AI analyzed historical data and proposed an optimized algorithm with parameters. The human engineer evaluated the proposal, identified specific safety gaps, modified the algorithm, added safety features the AI did not include, validated the result through simulation, and submitted it for multi-layer review. The AI's role was to extract patterns from data that would be impractical to identify manually — it did not make any control decisions, and its output was treated as an engineering input subject to the same scrutiny as any vendor proposal or literature recommendation.

**Impact Level:** High

The artifact directly controls a life-safety system. Errors in dosing can cause waterborne disease outbreaks or long-term carcinogen exposure. The system operates continuously and serves a large population. Regulatory violations carry criminal liability under the Safe Drinking Water Act. The consequences of failure are immediate, potentially irreversible, and affect a vulnerable population (immunocompromised individuals are disproportionately at risk from waterborne pathogens).

**Human Involvement:**

Luis is involved at every stage: he defines the optimization objective and hard constraints, prepares and curates the training data, reviews the AI's output against domain knowledge and regulatory requirements, identifies specific failure modes, modifies the algorithm, adds safety features, validates through simulation, and implements the final logic. Karen Osei provides independent internal review focused on operator interface and alarm logic. Dr. Ingrid Solheim provides independent regulatory review with the authority to reject or impose conditions. During operation, facility operators monitor the system continuously and can override to manual control at any time. No AI output reaches the production control system without passing through at minimum four layers of human judgment (engineer, simulation, internal review, regulatory review).

---

## 7. Crosswalk to Frameworks

### NIST AI RMF

**Govern**
The facility's operating permit and the state Department of Environmental Quality's notification requirements create the governance boundary for AI-assisted changes to the disinfection process. The HALOS `governance` field references both the facility's internal change management policy and the state regulatory framework. The `policyEvaluations` section documents compliance assessments against the Surface Water Treatment Rule, the Disinfectants and Disinfection Byproducts Rule, and HALOS principles. HALOS provides artifact-level evidence that governance structures were followed — the provenance record itself was included in the regulatory submission.

**Map**
The HALOS record maps AI involvement to a specific, bounded activity: analysis of historical SCADA data and generation of a proposed algorithm. The record makes clear where AI risk is concentrated (the parameter recommendations and seasonal adjustments) and where it is absent (fault handling, alarm logic, safety floors, regulatory compliance verification). This mapping allows risk assessors to focus scrutiny on the AI-influenced portions without re-reviewing the entirely human-authored safety additions.

**Measure**
The interaction semantics provide concrete, auditable measures of human oversight quality. The record shows: the winter dose reduction was reduced from the AI's recommendation (12%) to a more conservative value (5%); storm event overrides were added; four categories of fault detection were added; the algorithm was validated against historical data including specific stress scenarios. The simulation results — documented as a formal validation activity in the graph — provide quantitative evidence that the modified algorithm performs safely. These are not abstract claims of oversight; they are specific, verifiable actions.

**Manage**
If an incident occurs — a waterborne illness cluster, a regulatory violation, a boil-water advisory — the HALOS record provides an immediate, complete evidence trail for incident investigation. Investigators can determine: what data the AI analyzed, what it recommended, what the engineer changed, why, what validation was performed, who reviewed and approved, and what conditions were attached to the approval. This supports both real-time incident response (understanding the control logic quickly) and post-incident regulatory proceedings (demonstrating due diligence or identifying where the process failed).

### ISO/IEC 42001

**Auditability**
The HALOS record provides a machine-readable, self-contained audit trail that satisfies ISO 42001's requirement for traceable AI lifecycle documentation. Every stage from data preparation through regulatory approval is logged with timestamps, responsible parties, and outcomes. The record distinguishes between AI-generated content and human-authored additions at a granular level. An auditor can reconstruct the full collaboration timeline, identify every point where the AI's output was accepted, modified, or rejected, and verify that safety-critical additions were human-authored.

**Responsibility Tracking**
The `human_author`, `decisions`, and `graph.relationships` establish a clear, unambiguous chain of responsibility. Luis Herrera is the accountable engineer (PE); the AI acted on his behalf and under his direction. Karen Osei is accountable for internal operational review. Dr. Ingrid Solheim is the regulatory authority who approved the change. The `actedOnBehalfOf` relationships confirm that no AI system held independent authority. ISO 42001's requirement for defined roles and responsibilities is satisfied not through organizational policy documents alone, but through artifact-level evidence that those roles were exercised.

**Process Transparency**
The graph model makes the engineering process legible to third parties: data preparation -> AI analysis -> engineering review -> human modification -> simulation validation -> internal review -> regulatory submission -> regulatory approval -> implementation -> commissioning. Each step is typed, timestamped, and attributed. This supports ISO 42001's process documentation requirements at a level of detail that traditional change management logs rarely achieve — the HALOS record captures not just *what* happened but *what the human thought about what the AI suggested*.

### CycloneDX (Optional)

In an industrial control systems context where the facility maintains an asset inventory of control system components, HALOS and CycloneDX serve complementary roles:

**CycloneDX** would catalog *what components exist* in the control system — the PLC hardware, firmware versions, communication modules, HMI software, SCADA server software, and the PLC program itself as a component. It answers: "What is deployed in this control system?"

**HALOS** records *how specific components were created or modified* — which PLC program changes involved AI analysis, what the engineer decided, what safety reviews were conducted. It answers: "Who made this change, with what AI assistance, what safety analysis was performed, and who approved it?"

**Combined**, an incident investigator or regulatory auditor could look up the PLC program in the CycloneDX asset inventory, find the embedded HALOS provenance record, and understand the full engineering, review, and approval history behind the currently running control logic. This is particularly valuable in the water treatment sector, where the America's Water Infrastructure Act (AWIA) requires utilities to conduct risk assessments of their control systems — HALOS provenance provides the human-AI collaboration evidence that those assessments need.
