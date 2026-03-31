# HALOS Example: Journalism / News Media

## 1. Scenario

**Domain:** Investigative journalism — environmental and public health reporting

**Who:** Carlos Medina is an investigative reporter at the *Lakeshore Herald*, a regional newspaper covering a metro area of about 400,000 people. He has covered environmental issues for eight years. His editor is Sarah Kwan, a 15-year veteran of the paper's investigations desk. The managing editor, James Trujillo, has final publication authority on stories with significant legal exposure.

**What he's trying to accomplish:** Carlos is investigating potential environmental contamination from a chemical manufacturing facility — Meridian Chemical Solutions — that borders the Eastfield neighborhood, a predominantly low-income community of about 3,200 residents. Community members have reported unusual rates of respiratory illness and skin conditions. Carlos needs to determine whether regulatory violation patterns from the facility correlate with the health complaints, and whether the company or regulators failed to act on known risks.

**How AI is used:** Carlos uses an AI document analysis tool to process approximately 4,300 public regulatory filings, inspection reports, and permit applications from the state Department of Environmental Quality (DEQ), spanning 12 years. The AI identifies patterns in violation frequency, categorizes violation types, flags enforcement gaps (violations without follow-up action), and generates initial summaries of key findings. He also uses AI to cross-reference the timeline of violations with publicly available county health department data on respiratory complaint rates by ZIP code.

**Where human judgment is required:** Every finding the AI surfaces must be verified against primary source documents. Carlos must interview affected residents, former facility employees, regulators, and the company. He must assess source credibility, determine what is publishable under the paper's standards, contextualize statistical patterns with on-the-ground reporting, and make editorial decisions about framing. The AI cannot evaluate whether a source is reliable, whether a correlation implies causation, or whether publishing a particular finding serves the public interest without causing disproportionate harm.

**Decision point with consequences:** The AI identifies a statistically notable correlation: violation spikes at the Meridian facility in 2019 and 2022 align closely with elevated respiratory complaint rates in the adjacent ZIP code during the same periods. The pattern is real in the data. But correlation is not causation — the ZIP code includes other pollution sources (a highway interchange, a dry cleaner with prior violations), and the health data does not control for confounders like seasonal variation, COVID-19, or demographic factors. Carlos must decide whether to include this correlation in the published article. Including it could prompt public health action and hold the company accountable. But presenting it without appropriate caveats could cause public panic, damage the company unjustly if the link turns out to be coincidental, expose the paper to legal challenge, and undermine trust in the paper's reporting if the correlation does not hold up to scrutiny.

---

## 2. Collaboration Narrative

**Step 1 — Document Collection & AI Ingestion**
Carlos downloads 4,300 public regulatory filings from the state DEQ's online database — inspection reports, notice-of-violation letters, consent orders, permit applications, and compliance monitoring reports for the Meridian facility, covering 2012-2024. He feeds these to the AI document analysis tool with a structured prompt: *"Categorize each document by type, date, violation category (air emissions, wastewater discharge, hazardous waste handling, reporting failure), severity level, and enforcement action taken. Flag any violations where no enforcement follow-up appears within 12 months."*

**Step 2 — AI Pattern Analysis**
The AI returns a structured dataset of 387 identified violations across 12 years, categorized by type and severity, with 43 flagged as having no apparent enforcement follow-up. It generates a timeline visualization showing violation clusters in 2015, 2019, and 2022. It also produces a summary narrative: *"The facility has averaged 32 violations per year, with significant spikes in air emission violations in Q2 2019 (14 violations) and Q3 2022 (11 violations). Forty-three violations — 11% of total — show no documented enforcement action within the analyzed period."*

**Step 3 — Human Verification Against Primary Sources**
Carlos does not treat the AI's output as fact. He manually pulls a stratified sample of 60 violations — including all 43 flagged as unenforced — and reads the original documents. He finds: the AI correctly categorized 56 of 60. Three misclassifications involved ambiguous violation types (a "reporting failure" that was actually a "monitoring equipment malfunction"). One flagged-as-unenforced violation actually had a consent order that appeared in a separate, later filing the AI did not cross-reference. Carlos corrects the dataset, reducing the unenforced count to 42, and notes the error rate (7% misclassification on his sample, 2% false-positive on enforcement gaps). He documents these corrections in his reporting notes.

**Step 4 — AI Cross-Reference with Health Data**
Carlos obtains publicly available county health department data on respiratory complaint rates by ZIP code (aggregated, non-identifiable). He asks the AI to overlay the Meridian violation timeline with the respiratory complaint data for ZIP codes 48201 (Eastfield, adjacent to facility) and 48203 (a comparable-income neighborhood three miles away, used as a rough control). The AI identifies the correlation: respiratory complaints in 48201 spiked in the same quarters as the 2019 and 2022 violation clusters, while 48203 showed no comparable spike.

**Step 5 — Human Evaluation of the Correlation**
Carlos recognizes that the AI has surfaced a pattern worth investigating — but not a publishable conclusion. He consults with the paper's data journalist, who confirms that the sample size is small, confounders are uncontrolled, and the correlation would not meet the threshold for a peer-reviewed epidemiological study. Carlos calls two environmental health researchers at the state university. One says the pattern is "suggestive but not conclusive" and would warrant a formal health study. The other cautions that ZIP-code-level health data is too coarse to draw facility-specific conclusions. Carlos records these expert assessments.

**Step 6 — On-the-Ground Reporting**
Carlos spends three weeks in Eastfield. He interviews 14 residents, four current and former Meridian employees (two on background), two DEQ inspectors (one retired, one current), a Meridian spokesperson, and the county health officer. The resident interviews reveal consistent accounts of chemical odors during the periods that align with the violation spikes. Two former employees describe pressure to underreport emissions during high-production periods. The retired DEQ inspector confirms that the facility was considered a "problem site" internally but that enforcement resources were limited. The Meridian spokesperson states that the company "has invested significantly in compliance improvements" and disputes the characterization of unenforced violations. Carlos records all interviews with consent and takes contemporaneous notes.

**Step 7 — Editorial Decision: The Correlation**
Carlos drafts the story and presents it to Sarah Kwan. The central editorial question: how to handle the health-data correlation. Sarah and Carlos discuss three options:

1. **Include the correlation as a key finding.** Risk: it implies causation and could cause panic or legal exposure.
2. **Omit the correlation entirely.** Risk: it withholds relevant information from a community that may be affected.
3. **Include the correlation with full context.** Report that the pattern exists, explain what it does and does not prove, quote the researchers' assessments, note the confounders, and call for a formal health study.

Carlos and Sarah choose option 3. The rationale: the community has a right to know about a pattern that experts consider "suggestive," and transparency about the limitations is more responsible than either overstating or suppressing the finding. They decide to frame the correlation as a question — "Does this pattern warrant investigation?" — rather than as an answer.

**Step 8 — Legal Review & Managing Editor Approval**
The paper's attorney reviews the draft for defamation risk, particularly the passages about unenforced violations and the former employees' accounts. She requests two changes: soften one characterization of DEQ inaction from "neglect" to "gaps in follow-through," and add the Meridian spokesperson's full statement rather than excerpting it. Carlos and Sarah accept both changes. James Trujillo, the managing editor, reads the final draft, asks three clarifying questions about the sourcing behind the violation count, and approves publication.

**Step 9 — Transparency Disclosure**
The published article includes an editor's note: *"This investigation used AI tools to analyze more than 4,000 public regulatory filings and identify patterns in violation records. All AI-generated findings were verified against primary source documents by the reporter. The analysis of health data was reviewed by independent experts. AI was not used to write the published text."*

---

## 3. Artifact Description

**What was created:** A 3,800-word investigative article titled "Unfinished Business: 12 Years of Violations at Meridian Chemical and the Neighborhood Left Waiting," published in print and online with an accompanying interactive violation timeline. The article includes a methodology sidebar, a full Meridian statement, and the editor's AI disclosure note.

**How it is used:** The article is read by the newspaper's audience (~120,000 print and digital), picked up by regional broadcast outlets, cited by community advocacy groups, and entered into the public record. It may prompt regulatory action, legislative inquiry, or a formal health study. The interactive timeline is embeddable and has been shared by environmental advocacy organizations.

**What happens if it is wrong:** If the violation data is inaccurate, the paper must issue corrections, damaging credibility that took years to build. If the health correlation is presented in a way that implies causation, the paper could face legal action from Meridian and criticism from the scientific community. The community could experience unnecessary alarm. If the article underreports the problem — omitting real patterns out of excessive caution — residents may continue to be exposed to health risks without public awareness or regulatory pressure. The reporter's and paper's reputations are directly at stake, as is the community's trust that the press serves their interests honestly.

---

## 4. HALOS v0.2 Record (JSON)

See [journalism-news-media.halos.json](journalism-news-media.halos.json)

---

## 5. AIVSS-Style Interpretation

Rather than calculating a numeric score, here is how this example would be assessed across AIVSS-relevant dimensions:

**Data Provenance**
The AI analyzed exclusively public government records — regulatory filings from a state agency database and aggregated health complaint data from a county health department. These are authoritative, citable sources with clear provenance. The HALOS record identifies the source datasets and documents the AI's role as analytical (pattern identification), not generative (content creation). The reporter verified a stratified sample of AI outputs against the original documents and documented a 7% misclassification rate and a 2% false-positive rate, which were corrected before publication. *This is well-managed: source documents are public and verifiable, and the error-checking process is documented.*

**Transparency / Explainability**
The interaction semantics in the HALOS record make explicit what the AI found, what the reporter verified, what was corrected, and what editorial choices were made about presenting AI-surfaced findings. The published article itself includes an AI disclosure note — a level of public transparency that goes beyond the provenance record. The reader knows AI was used, how it was used, and that its outputs were verified. *This substantially lowers risk: the public can assess for themselves whether the methodology is sound, and critics have a clear trail to challenge.*

**Accountability**
Carlos Medina is named as the reporter responsible for all findings. Sarah Kwan is identified as the editor who made the framing decision on the health correlation. James Trujillo approved publication. The AI tools operated under Carlos's direction — the `actedOnBehalfOf` relationships confirm this. No AI output reached publication without multiple layers of human judgment (reporter verification, editor review, legal review, managing editor approval). *This is strong: the chain of accountability is unambiguous, and every human decision-maker is identified by name and role.*

**Human Oversight**
This example has unusually deep human oversight. The AI's document analysis was sample-verified (60 of 387 findings checked against source documents). The AI's correlation finding was evaluated by the reporter, a data journalist, and two independent academic researchers — none of whom treated it as conclusive. The story passed through editorial review, legal review, and managing editor approval before publication. Every AI-surfaced finding that appears in the published article was independently corroborated by human reporting. *This is the strongest dimension: the AI functioned as a research tool, and no AI output was published without independent human verification.*

**Decision Criticality**
The framing decision on the health-data correlation is high-criticality. Publishing an unqualified correlation between industrial violations and respiratory illness could cause community panic, prompt premature regulatory action, or expose the paper to legal liability. Suppressing a genuine pattern could leave a vulnerable community uninformed about potential health risks. The HALOS record captures the three options considered, the rationale for the chosen approach, and the responsible decision-makers. *This is high-criticality: the decision directly affects public welfare, legal exposure, and institutional credibility, and it is irreversible once published.*

**Societal / Operational Impact**
The artifact is a published investigative report reaching ~120,000 readers, with potential to trigger regulatory action, legislative inquiry, and community health interventions. The affected community is low-income and has limited access to independent environmental monitoring — the newspaper may be their primary source of information about facility risks. If the reporting is sound, it serves a vital public interest. If it is flawed, the harm compounds: the community is misled, the company is unjustly damaged, and public trust in local journalism erodes. *This is high-impact: the article has direct consequences for public health, regulatory enforcement, and democratic accountability.*

---

## 6. AIUC-1 Classification

**Use Type:** Assistive

The AI analyzed documents and identified patterns. It did not write the published article, conduct interviews, evaluate source credibility, or make editorial decisions. Every AI output was treated as raw analytical input requiring human verification and editorial judgment. The AI's role is analogous to a research assistant who can read fast but cannot assess what the findings mean or what should be published.

**Impact Level:** High

The artifact is a published investigative report about potential public health harm in a vulnerable community. Errors in the analysis could cause unwarranted alarm, legal liability, regulatory misdirection, or — if real risks are missed — continued harm to residents. The article may trigger government action. The consequences are not merely reputational; they affect public health and regulatory enforcement.

**Human Involvement:**

Carlos is involved at every stage: he defines the analytical queries, verifies AI outputs against primary sources, conducts all interviews, evaluates expert assessments, and writes the published text. Sarah Kwan provides independent editorial judgment on framing and emphasis. The paper's attorney reviews for legal risk. James Trujillo exercises final publication authority. No AI output reaches the reader without passing through at least four layers of human judgment (reporter, editor, attorney, managing editor). The AI never interacts directly with sources, the public, or the publication system.

---

## 7. Crosswalk to Frameworks

### NIST AI RMF

**Govern**
The *Lakeshore Herald* has a newsroom AI policy that permits AI for document analysis and pattern identification but prohibits AI-generated text in published articles without explicit disclosure. The HALOS `governance` field references this policy. The `policyEvaluations` section records that the editor assessed compliance and the legal review was completed. HALOS provides the artifact-level evidence that newsroom governance policies were followed for this specific story.

**Map**
The HALOS record maps AI involvement to two specific activities: regulatory document analysis and health-data cross-referencing. It identifies the context for each (analytical pattern-finding on public records) and makes clear that the AI was not involved in interviewing, source evaluation, writing, or editorial decision-making. This allows a governance reviewer to assess where AI risk is concentrated — in this case, the analytical step that produces findings the reporter might rely on — and where human judgment provided the necessary checks.

**Measure**
The interaction semantics provide concrete, auditable measures of oversight quality. The reporter's verification process is documented: 60-document sample check, 7% error rate found and corrected, one false-positive enforcement gap identified. The health correlation was evaluated by four independent humans (reporter, data journalist, two academics) before an editorial decision was made. These are not abstract assurances of human oversight — they are specific, measurable evidence of how thoroughly AI outputs were scrutinized.

**Manage**
If a risk materializes — a factual challenge from Meridian's attorneys, a reader complaint about the health correlation, or a regulatory body questioning the methodology — the HALOS record provides a complete evidence trail. It documents what the AI found, what the reporter verified, where corrections were made, what experts said, and who decided how to frame the findings. This supports both incident response (answering a legal challenge) and process improvement (identifying whether the verification sample size was adequate).

### ISO/IEC 42001

**Auditability**
The HALOS record is a self-contained, machine-readable audit trail for the article's AI-assisted research process. Every AI interaction is logged with tool identifiers, timestamps, input descriptions, and human responses. An auditor — whether internal (the paper's standards editor) or external (a press council investigating a complaint) — can reconstruct the full workflow without relying on the reporter's memory or scattered notes.

**Responsibility Tracking**
The `human_author`, `decisions`, and `graph.relationships` (especially `actedOnBehalfOf`) establish an unambiguous chain of responsibility. The AI tools acted under Carlos's direction; Carlos reported to Sarah; Sarah's framing decision was reviewed by legal counsel; James Trujillo exercised final publication authority. ISO 42001's requirement for clear role assignment is satisfied at the artifact level, with four distinct human roles documented (reporter, editor, attorney, managing editor).

**Process Transparency**
The graph model makes the investigative process legible to third parties: document collection -> AI analysis -> human verification -> AI cross-referencing -> human expert evaluation -> on-the-ground reporting -> editorial decision -> legal review -> publication approval. Each step is typed, timestamped, and attributed. This supports ISO 42001's process documentation requirements and provides a template for how newsrooms can document AI-assisted investigation workflows.

### CycloneDX (Optional)

In a context where a news organization tracks its published content as a managed portfolio — for example, for archival integrity, syndication licensing, or legal hold purposes — HALOS and CycloneDX serve complementary roles:

**CycloneDX** would catalog *what components exist* in the published package — the article text, the interactive timeline, the methodology sidebar, the embedded data visualizations, and the underlying datasets. It answers: "What is in this deliverable?"

**HALOS** records *how the article was created* — which analytical steps involved AI, what the reporter verified, what decisions shaped the framing, and who approved publication. It answers: "Who made this, with what AI help, and what choices did they make?"

**Combined**, a press council, legal team, or archival system could look up the article in a CycloneDX manifest, find the embedded HALOS provenance record, and understand the complete editorial and analytical chain behind it. This is particularly valuable for investigative journalism, where the methodology is as important as the findings — and where the question "how was this story reported?" may need to be answered years after publication.
