# HALOS Example: Government / Policy / Legal

## 1. Scenario

**Domain:** Government policy analysis — housing legislation

**Who:** Fatima Al-Rashid is a Senior Policy Analyst in the Division of Housing Policy at a state housing agency. She has 14 years of experience in housing economics and has authored or co-authored impact assessments for seven pieces of enacted legislation. Her division director, David Oluwale, reviews and signs off on all assessments before they reach the Deputy Secretary, Margaret Liu, who approves them for release to the legislature.

**What she's trying to accomplish:** The state legislature's Housing Committee has requested a fiscal and economic impact assessment for SB-1247, a proposed rent stabilization bill that would cap annual rent increases at CPI + 2% for buildings older than 15 years in counties with vacancy rates below 5%. The assessment must be delivered within 6 weeks. It will be entered into the legislative record, cited in committee debate, and made available to the public. The committee chair has specifically requested that the assessment include economic modeling of housing supply effects, a comparative analysis of similar policies in other jurisdictions, and an equity impact section examining effects on low-income renters, small landlords, and communities of color.

**How AI is used:** Fatima uses an AI research and analysis assistant to: (1) compile and synthesize findings from 23 published studies on rent stabilization effects across North American and European jurisdictions; (2) run Monte Carlo simulations modeling the probable range of housing supply impacts under three scenarios — baseline, moderate adoption, and full compliance; (3) generate an initial draft of the comparative jurisdiction section based on structured data Fatima assembled from five states' post-enactment reports. She also uses an AI writing assistant for plain-language summaries of technical sections, as required by the agency's public accessibility standards.

**Where human judgment is required:** Every analytical conclusion, every framing choice, every characterization of uncertainty, and every recommendation is Fatima's. The AI does not decide what studies to include in the evidence base — Fatima curates the input set based on methodological quality, relevance, and recency. The AI does not interpret modeling results — Fatima determines what the ranges mean in the context of this state's specific housing market, demographic trends, and existing regulatory environment. The AI does not write the executive summary — Fatima does, because the executive summary is what most legislators will actually read.

**Decision point with consequences:** The Monte Carlo simulation produces a central estimate of a 3.2% reduction in new housing permits over 5 years, with a 90% confidence interval of 1.1% to 6.8%. This is the most politically consequential number in the assessment. Fatima must decide how to present this finding. She can lead with the central estimate (3.2%), which opponents of the bill will cite as evidence of housing supply harm. She can lead with the range (1.1% to 6.8%), which is more methodologically honest but harder for legislators to act on. She can contextualize the range against the baseline decline already occurring without the legislation (2.1% over the same period), which changes the interpretive frame entirely. The AI model has no opinion on framing — it produced the numbers. Fatima's choice of presentation will influence how 40 legislators vote on a bill that affects 2.3 million renters and 180,000 landlords. If she understates uncertainty, she risks producing an assessment that is later discredited. If she buries the central estimate in caveats, she risks producing an assessment that is useless to decision-makers. She is accountable to the public for both accuracy and clarity.

---

## 2. Collaboration Narrative

**Step 1 — Scoping and Evidence Assembly**
Fatima receives the committee request and reviews SB-1247's full text, the committee chair's specific questions, and the agency's guidelines for legislative impact assessments. She identifies the three required sections: economic modeling, comparative jurisdiction analysis, and equity impact. She assembles a curated bibliography of 23 peer-reviewed studies and 5 state post-enactment reports, applying inclusion criteria: published after 2015, peer-reviewed or government-issued, methodologically transparent, and relevant to comparable housing markets. She excludes three industry-funded studies that do not disclose their modeling assumptions — a judgment call documented in her working notes.

**Step 2 — AI-Assisted Literature Synthesis**
Fatima provides the 23 studies to the AI research assistant with structured instructions: extract each study's methodology, sample size, geographic scope, key findings on supply effects, key findings on rent levels, and reported limitations. The AI returns a structured synthesis table. Fatima reviews every entry against the original source, corrects two extraction errors (one misattributed finding, one truncated limitation), and adds contextual notes on four studies where the findings are not directly comparable without adjustment for differences in policy design.

**Step 3 — Economic Modeling**
Fatima defines the simulation parameters: three scenarios (baseline assuming 40% landlord participation, moderate at 65%, full compliance at 95%), the state's actual housing permit data from the past 10 years, demographic projections from the state demographer's office, and CPI forecasts from the Bureau of Labor Statistics. She provides these to the AI analysis tool, which runs 10,000 Monte Carlo iterations per scenario. The AI returns probability distributions for housing permit changes, median rent trajectories, and landlord exit rates. Fatima examines the distributions, identifies that the model's landlord exit assumptions are calibrated to a national average that does not reflect this state's higher-than-average small-landlord share, and adjusts the exit rate parameter upward by 15% based on state-specific data from the most recent landlord survey. She reruns the simulation with the corrected parameter.

**Step 4 — Decision: Presenting the Supply Impact Finding**
With the corrected simulation results (central estimate: 3.2% supply reduction, 90% CI: 1.1%–6.8%), Fatima faces the framing decision. She consults with David Oluwale, her division director, who advises leading with the range and contextualizing against the baseline trend. Fatima drafts three versions of the key finding paragraph: one leading with the central estimate, one leading with the range, one leading with the baseline comparison. She selects the version that leads with the range, places the central estimate in the next sentence, and follows with the baseline context in the third sentence. Her rationale: the range communicates genuine uncertainty without burying the best estimate, and the baseline context prevents the finding from being interpreted in isolation. She documents this framing decision and David's input in her working file.

**Step 5 — AI-Assisted Comparative Jurisdiction Draft**
Fatima has assembled structured data on rent stabilization policies in Oregon, California, New York, Minnesota, and Ontario — including enactment year, policy design, measured outcomes, and enforcement mechanisms. She provides this structured data to the AI writing assistant with the instruction: "Draft a comparative analysis section using only the data I have provided. Do not introduce any external claims. Use neutral, descriptive language. Flag any comparisons that may not be directly applicable due to differences in policy scope." The AI generates a 2,800-word draft. Fatima revises substantially: she reorders the jurisdictions to lead with the two most comparable cases (Oregon and Minnesota, which have similar vacancy rates and housing stock profiles), rewrites the Ontario comparison to note that its national healthcare system affects landlord operating costs in ways not applicable to the U.S., removes one AI-generated transition sentence that implied a causal relationship where the evidence only supports correlation, and adds her own analytical paragraph synthesizing the cross-jurisdiction patterns.

**Step 6 — Equity Impact Section (Human-Authored)**
Fatima writes the equity impact section entirely without AI assistance. This section draws on census microdata, the agency's own tenant survey from the prior year, and fair housing enforcement data. She determines that AI-generated analysis of equity impacts carries unacceptable risk of embedding unexamined assumptions about race, income, and housing markets. She writes this section herself, sentence by sentence, and has it reviewed by the agency's civil rights liaison.

**Step 7 — Plain-Language Summaries**
Agency policy requires that each major section include a plain-language summary accessible to readers without economics training. Fatima uses the AI writing assistant to generate draft plain-language summaries of the economic modeling and comparative jurisdiction sections. She reviews each for accuracy, removes one instance where the AI's simplification changed the meaning of a confidence interval ("the effect is likely between 1% and 7%," which omits that this is a modeled range, not a certainty), and rewrites the summary of the equity section herself.

**Step 8 — Division Director Review**
David Oluwale reviews the complete draft over two days. He requests three changes: (1) add a sensitivity analysis showing how results change if the CPI forecast is off by 1 percentage point, (2) strengthen the limitations section to explicitly state that the model does not account for potential behavioral changes by large institutional landlords who may respond differently than small landlords, and (3) move the comparative jurisdiction table to an appendix to keep the main body under 40 pages. Fatima makes all three changes. The sensitivity analysis requires a new AI model run with adjusted CPI parameters, which Fatima configures and reviews.

**Step 9 — Deputy Secretary Approval**
Margaret Liu reviews the assessment and approves it for release to the legislature. She requests one addition: a cover letter noting the assessment's methodological approach and disclosing the use of AI-assisted analysis, consistent with the agency's recently adopted AI transparency policy. Fatima drafts the disclosure language; Margaret edits and signs the cover letter.

**Step 10 — Release and Legislative Record**
The assessment is transmitted to the Housing Committee, entered into the legislative record, and posted on the agency's public website. It becomes a public document subject to FOIA requests, legislative citation, legal challenge, and media scrutiny.

---

## 3. Artifact Description

**What was created:** "Fiscal and Economic Impact Assessment: SB-1247, Rent Stabilization Act" — a 38-page policy impact assessment with executive summary, economic modeling section (with Monte Carlo methodology and results), comparative jurisdiction analysis, equity impact analysis, limitations and uncertainty section, sensitivity analysis appendix, and evidence bibliography. Delivered as a PDF with accessible formatting and a machine-readable data supplement.

**How it is used:** The assessment is entered into the official legislative record for the Housing Committee's deliberation on SB-1247. Committee members and their staff will cite its findings in floor debate. It will be referenced by advocacy organizations on both sides, quoted in media coverage, and potentially cited in any legal challenges to the enacted law. It may be used as precedent by other state agencies preparing similar assessments.

**What happens if it is wrong:** If the economic modeling overstates housing supply reduction, the legislature may reject a bill that would have helped 2.3 million renters. If it understates the reduction, the legislature may enact a law that damages the housing market in ways the assessment failed to predict. If the equity analysis contains errors, the law may disproportionately harm the communities it was intended to protect. If the uncertainty is misrepresented, the agency's credibility is damaged and future assessments carry less weight. If AI involvement is undisclosed and later revealed, it triggers a transparency scandal in a public agency with statutory obligations to the public. In the worst case, a flawed assessment cited in the legislative record becomes grounds for legal challenge to the enacted law.

---

## 4. HALOS v0.2 Record (JSON)

See [government-policy-legal.halos.json](government-policy-legal.halos.json)

---

## 5. AIVSS-Style Interpretation

Rather than calculating a numeric score, here is how this example would be assessed across AIVSS-relevant dimensions:

**Data Provenance**
HALOS reveals a clear chain of evidence inputs. The literature synthesis derives from 23 human-curated studies with documented inclusion/exclusion criteria. The economic model uses state administrative data, federal demographic projections, and BLS forecasts — all identified by source. The AI's contribution to the final artifact is traceable: it synthesized literature (human-corrected), ran simulations (human-parameterized and human-adjusted), and drafted portions of text (human-revised). The equity section has no AI provenance at all — it was entirely human-authored. *This is a strong provenance posture for a government document: every claim can be traced to a source, and every AI contribution can be distinguished from human analysis.*

**Transparency / Explainability**
The interaction semantics throughout the record make explicit which sections involved AI and how the human responded to each AI output. The comparative jurisdiction draft was `modified` with detailed notes on what was rewritten and why. The simulation was run twice — the first run's parameter assumptions were rejected and corrected. The agency's cover letter formally discloses AI use. The HALOS record provides machine-readable evidence supporting that disclosure. *This is appropriate for a public-facing government document: any FOIA request or legislative inquiry about AI involvement can be answered with specifics, not generalities.*

**Accountability**
Fatima Al-Rashid is named as the responsible analyst for all substantive content. David Oluwale is the reviewing authority who shaped the final document through specific directed changes. Margaret Liu is the approving authority who authorized release. The `actedOnBehalfOf` relationships confirm that both AI tools operated under Fatima's direction and within parameters she defined. No AI output reached the final document without human review — and the most consequential section (equity impact) had no AI involvement at all. *This establishes a complete chain of human accountability from analyst to agency head — critical for government work where public servants are personally responsible for their professional outputs.*

**Human Oversight**
AI output went through multiple layers of review. The literature synthesis was checked line-by-line against source material, with errors corrected. The economic model was run, its assumptions questioned, a parameter adjusted based on state-specific data, and the model rerun. The comparative jurisdiction draft was substantially rewritten. Plain-language summaries were reviewed for accuracy. The division director and deputy secretary each conducted independent review. *The oversight density is high — appropriate for a document that will directly influence legislation affecting millions of people.*

**Decision Criticality**
The framing decision for the housing supply finding is the highest-criticality moment in this example. HALOS captures the context (three framing options considered), the consultation with the division director, the rationale for the chosen approach, and the fact that this decision was entirely human — the AI contributed the numbers but had no role in the interpretive framing. The decision to exclude the equity section from AI assistance is also recorded as a deliberate choice based on risk assessment. *Both decisions are high-criticality: they directly affect how legislators interpret the evidence and whether vulnerable populations are adequately considered. The record makes both decisions auditable.*

**Societal / Operational Impact**
This artifact directly shapes public policy affecting millions of state residents. It enters the legislative record — a permanent public archive. It may be cited in legal proceedings. Its credibility reflects on the agency's institutional integrity. HALOS provides evidence that the agency used AI responsibly, maintained human accountability, and disclosed its methods. *The societal impact is high, and the provenance record is calibrated to that level of consequence.*

---

## 6. AIUC-1 Classification

**Use Type:** Assistive

The AI performs research synthesis, runs simulations under human-defined parameters, and generates draft text from human-provided structured data. The human analyst curates all inputs, evaluates and corrects all AI outputs, makes all interpretive and framing decisions, authors the most sensitive sections without AI involvement, and takes professional responsibility for the final document. The AI never determines analytical conclusions or policy recommendations.

**Impact Level:** High

The artifact directly informs legislative votes on a bill affecting 2.3 million renters and 180,000 landlords. Errors or misrepresentations can lead to harmful legislation, legal challenges, or failure to enact needed protections. The document becomes part of the permanent legislative record and is subject to public scrutiny, FOIA, and potential legal citation. The issuing agency's institutional credibility is at stake.

**Human Involvement:**

Fatima is involved at every stage: she curates the evidence base, defines modeling parameters, corrects AI errors, adjusts model assumptions based on domain expertise, makes all framing and presentation decisions, writes the highest-stakes section (equity impact) without AI, and authors the executive summary. The division director provides substantive editorial review. The deputy secretary provides institutional approval. Three layers of named, accountable human judgment separate AI output from the released public document.

---

## 7. Crosswalk to Frameworks

### NIST AI RMF

**Govern**
The agency has adopted an AI transparency policy requiring disclosure of AI use in public-facing documents. The HALOS `governance` field references this policy, and the `policyEvaluations` section records compliance assessments against both the agency AI use policy and FOIA transparency requirements. The deputy secretary's cover letter is the governance control in action — institutional disclosure authorized at the leadership level. HALOS provides the artifact-level evidence that the governance process was followed.

**Map**
The HALOS record maps AI involvement to specific, bounded activities: literature synthesis (corrected), simulation execution (parameters adjusted), text drafting (substantially revised), and plain-language summarization (reviewed for accuracy). It also maps where AI was deliberately excluded — the equity impact section. This makes it possible to assess where AI risk is concentrated (economic modeling and text generation) and where the agency chose to accept no AI risk at all (equity analysis).

**Measure**
The interaction semantics provide concrete, auditable measures of human oversight quality. The literature synthesis had two errors corrected. The simulation's parameter assumption was rejected and adjusted. The comparative jurisdiction draft was substantially rewritten with specific changes documented. One plain-language summary had a meaning-altering simplification corrected. These are not abstract assurances of "human review" — they are specific, documented instances of human judgment overriding or correcting AI output.

**Manage**
If the assessment is challenged — by legislators, advocacy groups, media, or in court — the HALOS record provides a timestamped evidence trail: what data went in, what the AI produced, what the human changed, and who approved the final version. This supports the agency's ability to defend its work product and, if necessary, identify and correct errors. It also provides a template for future assessments, reducing the risk of inconsistent AI use practices across the agency.

### ISO/IEC 42001

**Auditability**
The HALOS record is a self-contained, machine-readable audit trail that can be produced in response to legislative oversight requests, inspector general reviews, or FOIA inquiries. Every AI interaction is logged with tool identifiers, timestamps, human responses, and modification notes. An auditor — internal or external — can reconstruct the full collaboration history without relying on staff recollection or informal notes.

**Responsibility Tracking**
The `human_author`, `decisions`, and `graph.relationships` (especially `actedOnBehalfOf` and the approval chain) establish a three-tier chain of responsibility: analyst (author), division director (reviewer), deputy secretary (approver). This maps directly to ISO 42001's requirement for clear role assignment and is consistent with standard government document clearance processes. The record demonstrates that accountability was not diffused by AI use.

**Process Transparency**
The graph model makes the entire analytical process legible to third parties: evidence curation (human) -> literature synthesis (AI, human-corrected) -> model parameterization (human) -> simulation (AI, human-adjusted) -> rerun (AI) -> text drafting (AI, human-revised) -> equity analysis (human only) -> plain-language summaries (AI, human-reviewed) -> division review (human) -> deputy approval (human). Each step is typed, timestamped, and attributed. This supports ISO 42001's process documentation requirements and provides a level of transparency appropriate for government work product.

### CycloneDX (Optional)

In a context where government agencies track their analytical outputs as structured deliverables — for example, to maintain a registry of policy assessments or to satisfy records management requirements — HALOS and CycloneDX serve complementary roles:

**CycloneDX** would catalog *what components exist* in the assessment package — the PDF document, the data supplement, the simulation code and parameters, the evidence bibliography, and any embedded datasets. It answers: "What is in this deliverable?"

**HALOS** records *how each component was created* — which sections involved AI, what the human analyst did, what decisions shaped the findings, and who approved the final version. It answers: "Who made this, with what AI help, and what choices did they make?"

**Combined**, a legislative committee, inspector general, or FOIA officer could look up the assessment in a CycloneDX registry, find the embedded HALOS provenance record, and understand the full analytical and decision-making history behind any specific finding. This is particularly valuable in government contexts where the question "how was this conclusion reached?" is not academic curiosity — it is a matter of public accountability and, potentially, legal defensibility.
