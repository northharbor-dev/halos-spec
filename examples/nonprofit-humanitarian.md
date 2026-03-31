# HALOS Example: Nonprofit / Humanitarian

## 1. Scenario

**Domain:** Humanitarian aid — disaster relief logistics

**Who:** Amara Diallo is a program director at an international humanitarian NGO coordinating disaster relief following a 7.4-magnitude earthquake in a mountainous region of central Turkey. She is responsible for directing the allocation of emergency supplies, medical teams, and shelter materials across 14 affected villages within a 72-hour critical response window. She reports to the country director, who must sign off on the final distribution plan before trucks are dispatched.

**What she's trying to accomplish:** Amara needs to produce a prioritized aid distribution plan that determines which villages receive supplies first, how much goes where, and which routes the logistics convoys will take. The plan must balance urgency (people in collapsed buildings), scale (population density), accessibility (road conditions after the quake), and equity (ensuring vulnerable populations are not overlooked because they are harder to reach or less visible in data).

**How AI is used:** Amara uses an AI-powered crisis analytics platform that ingests three data streams: satellite imagery (pre- and post-quake comparison to estimate structural damage), aggregated social media and mobile network activity (to estimate displacement patterns and identify areas where people are actively requesting help), and logistics data (road network status, warehouse inventory levels, vehicle availability). The platform produces a ranked priority list of villages with estimated damage severity, population displacement, and recommended convoy routing.

**Where human judgment is required:** The AI platform operates on data that is structurally biased. Satellite imagery shows physical damage to buildings but cannot see people sheltering in ravines, caves, or informal settlements that lack permanent structures. Social media scraping over-represents communities with internet access and mobile phones — it systematically under-counts elderly populations, people with disabilities, unaccompanied children, and rural communities with poor connectivity. Logistics optimization treats the problem as a routing efficiency exercise, but humanitarian response is not an optimization problem — it is a commitment to reach the most vulnerable, even when that is the least efficient option. Amara's job is to bring contextual knowledge, field intelligence, and humanitarian principles to bear on the AI's output.

**Decision point with consequences:** The AI platform's analysis ranks Village 7 (Karapinar) as the highest priority: satellite imagery shows significant structural collapse, social media volume is high with geolocated distress posts, and the road is partially passable. It ranks Village 3 (Yayladag) as low priority: satellite shows moderate damage, there is almost no social media activity, and the access road is severely degraded.

However, Amara's field coordinator, Elif Yilmaz, radios in from a forward position near Yayladag. She reports that the village has a large elderly population — many of whom live in older stone houses that don't appear in recent satellite baselines — and that the near-total absence of social media activity is not a sign of low impact but of the fact that the village has no mobile coverage and most residents are over 70. She also reports that a landslide has blocked the main road, but there is a secondary mountain track passable by smaller vehicles.

Amara must decide how to allocate two available supply convoys. The AI recommends both go to Karapinar. Elif's ground-truth intelligence suggests Yayladag may have equal or greater need but is invisible to the data. Sending a convoy to Yayladag means smaller vehicles, a slower route, and reduced supplies reaching Karapinar. The stakes are immediate: delayed aid in either village means people without water, shelter, or medical care in freezing overnight temperatures.

---

## 2. Collaboration Narrative

**Step 1 — Situation Assessment & Data Ingestion**
Amara opens the crisis analytics platform 6 hours after the earthquake. She uploads the latest satellite imagery provided by the UN Satellite Centre (UNOSAT) and connects the social media aggregation feed. She reviews the platform's initial automated assessment: 14 villages flagged, estimated 12,000 people affected, 3 villages categorized as critical (including Karapinar), 6 as moderate, 5 as low priority (including Yayladag). She notes the data sources, their timestamps, and their known limitations — the satellite pass was 4 hours post-quake, social media data covers the first 5 hours, and road network data is from a pre-earthquake baseline updated with initial aerial reconnaissance.

**Step 2 — AI Analysis & Priority Ranking**
The AI platform generates a ranked distribution plan: two full convoys to Karapinar (highest combined score across all three data streams), one partial convoy to two other critical villages, and nothing to Yayladag or the other low-priority villages in this first dispatch cycle. The plan includes optimized routing for the available 8-ton trucks based on road condition estimates.

**Step 3 — Field Intelligence Integration**
Elif Yilmaz, the field coordinator, contacts Amara from a position 3km from Yayladag. Elif has been with the organization for 8 years and knows this region. She reports: Yayladag's population is approximately 400, predominantly elderly, many living alone. The older stone construction is more vulnerable to seismic damage than the reinforced concrete buildings in Karapinar. She has spoken to two people who walked out of the village — they describe widespread collapse of the older houses, injuries, and no access to clean water since the quake ruptured the village's single water main. There is no mobile coverage. The access road is blocked by a landslide at km 12, but a secondary mountain track is passable by vehicles under 3.5 tons.

**Step 4 — Human Override Decision (Resource Allocation)**
Amara reviews the AI's ranking alongside Elif's report. She recognizes a pattern she has seen in previous disaster responses: the most vulnerable populations are often the least visible in data. She decides to **override the AI's recommendation** and split the convoys: one full convoy to Karapinar via the main road, and one smaller convoy to Yayladag using 3.5-ton vehicles on the mountain track, carrying water purification equipment, medical supplies, and emergency blankets as the top priorities given the elderly population and freezing temperatures. She documents her rationale explicitly: the AI's data is structurally unable to see Yayladag's need, and sending nothing to a village with 400 elderly residents and no water would violate the humanitarian principle of impartiality.

**Step 5 — Data Validation Decision**
Before finalizing, Amara also makes a second critical decision: she flags the AI platform's social-media-derived priority scores as unreliable for villages without mobile connectivity and adds a manual annotation to the distribution plan stating that social media silence should not be interpreted as low need in areas with known connectivity gaps. She instructs her logistics team to cross-reference every "low priority" village against field coordinator reports before any future dispatch cycle relies on the AI ranking alone.

**Step 6 — Country Director Review & Approval**
Amara presents the modified distribution plan to Dr. Kerem Aydin, the country director, in a 15-minute briefing. She walks him through the AI's original recommendation, Elif's field report, and her rationale for the override. Dr. Aydin asks two questions: whether the mountain track has been confirmed as passable (Elif has confirmed it with a local driver), and whether the smaller convoy carries enough medical supplies for a predominantly elderly population (Amara has added an additional medical kit based on Elif's injury estimates). Dr. Aydin approves the plan.

**Step 7 — Plan Finalization & Dispatch**
Amara finalizes the distribution plan document, which includes the priority ranking (with her manual overrides annotated), convoy assignments, route maps, supply manifests, and the explicit rationale for deviating from the AI recommendation. The plan is shared with the logistics team, field coordinators, and the donor reporting system. Trucks are dispatched within 90 minutes of approval.

---

## 3. Artifact Description

**What was created:** An emergency aid distribution plan for the first 72-hour response cycle, covering convoy assignments, route selections, supply allocations, and priority rankings for 14 affected villages. The plan is a structured document with attached maps and supply manifests, produced in the NGO's operational planning system and exported as a PDF for field teams and a data feed for the logistics tracking platform.

**How it is used:** The plan directly determines which villages receive aid first, what supplies arrive, and when. Convoy drivers follow the assigned routes. Medical teams are dispatched according to the plan's priority sequence. Field coordinators use it to set expectations with affected communities. Donor reporting references it as the basis for fund allocation decisions.

**What happens if it is wrong:** If the plan misallocates resources, people in critical need do not receive life-saving supplies — water, shelter, medical care — during the period when those supplies are most needed. If Yayladag had been left off the first dispatch cycle as the AI recommended, 400 elderly residents would have spent a second night without water or shelter in sub-zero temperatures. If Karapinar had been under-resourced, a larger population in a more accessible area would have suffered unnecessarily. Beyond immediate harm, a distribution plan that is perceived as inequitable erodes trust between the NGO and affected communities, damages relationships with local authorities, and undermines the organization's ability to operate in future crises. Donor confidence is also affected — accountability frameworks require demonstrable evidence that resources were allocated based on need, not convenience.

---

## 4. HALOS v0.2 Record (JSON)

See [nonprofit-humanitarian.halos.json](nonprofit-humanitarian.halos.json)

---

## 5. AIVSS-Style Interpretation

Rather than calculating a numeric score, here is how this example would be assessed across AIVSS-relevant dimensions:

**Data Provenance**
HALOS reveals that the artifact was informed by three AI-analyzed data streams (satellite imagery, social media, logistics data), each with different provenance characteristics and reliability profiles. Critically, the record also captures that the AI's ranking was overridden based on field intelligence from a named human source — and documents *why* the AI's data was insufficient. The provenance chain makes it possible to distinguish between data-supported decisions and ground-truth-informed overrides. *This is essential: in humanitarian contexts, the absence of data about a population is itself a risk factor, not evidence of low need.*

**Transparency / Explainability**
The interaction semantics (`modified` and `rejected` responses with detailed notes) make visible the gap between what the AI recommended and what was actually done. The AI platform's known limitations — inability to see populations without mobile connectivity, reliance on satellite baselines that may not include informal structures — are documented in the decision rationale. Anyone reviewing the HALOS record can understand why the AI said one thing and the human did another. *This is critical for accountability to affected populations, donors, and oversight bodies who need to know that decisions were made on principled grounds, not algorithmic convenience.*

**Accountability**
Amara is named as the responsible decision-maker for both the resource allocation override and the data validation flag. Elif is named as the contributor whose field intelligence informed the override. Dr. Aydin is named as the approver. The `actedOnBehalfOf` relationships confirm that AI tools operated under Amara's direction — the AI did not make the allocation decision. *In humanitarian response, clear accountability is not bureaucratic formality — it is a moral requirement. When lives depend on a plan, it must be clear who made the choices and who can be held responsible.*

**Human Oversight**
The AI's output was reviewed by a domain expert (Amara), challenged by field intelligence (Elif), and approved by a senior decision-maker (Dr. Aydin). The AI's recommendation was not accepted at face value — it was evaluated against ground-truth information that the AI could not access. The record shows that the human did not merely rubber-stamp the AI output but actively overrode it where the data was structurally inadequate. *This demonstrates meaningful human oversight, not performative review. The override was based on specific, documented reasons — not a vague sense that the AI might be wrong.*

**Decision Criticality**
Both recorded decisions are high-criticality. The resource allocation decision directly determines whether 400 elderly people receive emergency aid within the survival window. The data validation decision affects how the organization uses AI-derived priority scores for all subsequent dispatch cycles — a systemic intervention that shapes future responses. HALOS captures the context, alternatives, rationale, and outcome for both, making them auditable by internal review boards, donor oversight mechanisms, and humanitarian coordination bodies. *These are life-or-death decisions made under time pressure with incomplete information. The provenance record exists so that the reasoning can be examined after the crisis, when there is time to learn from it.*

**Societal / Operational Impact**
The artifact directly affects the welfare of thousands of people in a disaster zone. It determines who receives aid and who waits. Inequitable allocation — whether caused by algorithmic bias, data gaps, or human error — has consequences that extend beyond the immediate response: it shapes community trust, organizational reputation, and the willingness of affected populations to engage with humanitarian actors in future crises. The HALOS record provides evidence that equity considerations were actively factored into the decision, that AI limitations were recognized and compensated for, and that the most vulnerable population was not rendered invisible by the data infrastructure. *This matters because humanitarian organizations are accountable not only for what they deliver, but for how they decide who receives it.*

---

## 6. AIUC-1 Classification

**Use Type:** Assistive

The AI platform analyzes data and produces a recommended priority ranking, but the human decision-maker evaluates, modifies, and overrides the recommendation based on field intelligence and humanitarian principles. The AI never dispatches a convoy or finalizes an allocation — it provides analysis that a human uses as one input among several.

**Impact Level:** Critical

The artifact directly determines the allocation of life-saving resources to disaster-affected populations. Errors in prioritization can result in preventable deaths, serious injury, and lasting harm to vulnerable communities. The consequences are immediate, irreversible within the response window, and fall disproportionately on populations that are already marginalized.

**Human Involvement:**

Amara is involved at every substantive stage: she configures the data inputs, evaluates the AI's output against field intelligence, overrides the recommendation where the data is inadequate, documents her rationale, and presents the modified plan for approval. Elif provides ground-truth field intelligence that the AI cannot access. Dr. Aydin provides independent senior review and approval. No AI output reaches the final plan without at least two layers of human judgment (program director + country director), and the most consequential decision — the resource allocation override — was driven by human knowledge that contradicted the AI's recommendation.

---

## 7. Crosswalk to Frameworks

### NIST AI RMF

**Govern**
The NGO's humanitarian AI ethics policy requires that AI-derived recommendations for resource allocation be reviewed by a qualified human decision-maker before implementation. The HALOS `governance` field references this policy. The `policyEvaluations` section confirms that the plan was assessed against both the AI ethics policy and donor accountability requirements. HALOS provides artifact-level evidence that organizational governance was followed under operational pressure.

**Map**
The HALOS record maps AI involvement to specific activities (satellite analysis, social media aggregation, logistics routing) and identifies the data sources, their timestamps, and their known limitations. This makes it possible to assess where AI risk is concentrated — in this case, the social-media-derived priority scoring is the highest-risk component because it systematically under-represents populations without connectivity.

**Measure**
The interaction semantics (`modified` and `rejected` responses with detailed notes) provide measurable evidence of human oversight quality. A governance reviewer can see that the AI's top recommendation was partially overridden, that the override was based on named field intelligence, and that a systemic data reliability flag was raised for future cycles. These are concrete, auditable measures of human engagement — not a checkbox indicating that a human was "in the loop."

**Manage**
If a risk materializes — say, a post-crisis review finds that a village was under-served — the HALOS record provides a complete evidence trail: what data the AI used, what it recommended, what the human changed and why, and who approved the final plan. This supports incident investigation, after-action review, and organizational learning.

### ISO/IEC 42001

**Auditability**
The HALOS record is a self-contained, machine-readable audit trail for the most consequential AI-informed decision in the response. Every AI interaction is logged with model identifiers, data source descriptions, and human responses. An auditor — whether internal, from a donor, or from a coordination body — can reconstruct the decision-making timeline without relying on oral accounts or scattered email chains.

**Responsibility Tracking**
The `human_author`, `decisions`, and `graph.relationships` (especially `actedOnBehalfOf`) establish an unambiguous chain of responsibility. The AI platform acted on behalf of Amara; Amara is accountable to Dr. Aydin; Dr. Aydin approved the final plan. ISO 42001's requirement for clear role assignment is satisfied at the artifact level — particularly important in humanitarian contexts where multiple organizations, donors, and coordination bodies may need to understand who made which decision.

**Process Transparency**
The graph model makes the decision process legible to third parties: data ingestion -> AI analysis -> field intelligence integration -> human override -> senior review -> dispatch. Each step is typed, timestamped, and attributed. This supports ISO 42001's process documentation requirements and is directly usable for the after-action reviews that humanitarian organizations routinely conduct.

### CycloneDX (Optional)

In a humanitarian logistics context where aid deliverables are tracked for donor reporting and accountability:

**CycloneDX** could catalog *what components exist* in the response — supply manifests, medical kits, water purification units, vehicle assignments — as a bill of materials for accountability and audit.

**HALOS** records *how the distribution decisions were made* — which villages were prioritized and why, where AI was used and where it was overridden, what field intelligence informed the plan. It answers: "Who decided this allocation, with what AI help, and what principles guided the choices?"

**Combined**, a donor oversight body could trace from a specific supply delivery back to the distribution plan, then to the HALOS provenance record showing the decision-making process, the AI's role, and the human judgment that shaped the outcome. This is particularly valuable for humanitarian accountability frameworks like the Core Humanitarian Standard, which requires organizations to demonstrate that assistance decisions were based on assessed need and reached the most vulnerable.
