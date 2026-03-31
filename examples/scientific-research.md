# HALOS Example: Scientific Research

## 1. Scenario

**Domain:** Computational epidemiology — antimicrobial resistance modeling

**Who:** Dr. Nkechi Okonkwo is a postdoctoral researcher in computational epidemiology at a university-affiliated research hospital. She works in a lab led by Dr. Kofi Mensah (PI, senior author), alongside two co-authors: Dr. Yuto Nakamura (infectious disease clinician who provides clinical context and validates model outputs against ward-level observations) and Lena Bergmann (PhD candidate who curated and cleaned the genomic sequencing dataset). Nkechi has domain expertise in Bayesian modeling and hospital epidemiology but is working with whole-genome sequencing data for the first time in this project.

**What she's trying to accomplish:** Nkechi is building a predictive model for the spread of carbapenem-resistant *Enterobacteriaceae* (CRE) in hospital-acquired infections. The model ingests patient-level genomic sequencing data, ward transfer histories, antibiotic prescribing patterns, and hospital metadata to predict which wards are at highest risk for CRE transmission events in the next 14 days. The goal is a tool that infection control teams can use to allocate surveillance resources — swabbing, isolation rooms, staff cohorting — before outbreaks escalate.

**How AI is used:** Nkechi uses an AI research assistant for three distinct tasks: (1) identifying candidate predictive features in the high-dimensional genomic data — flagging gene clusters, mobile genetic elements, and co-occurrence patterns that correlate with transmission events; (2) suggesting model architectures and hyperparameter ranges based on the dataset characteristics; and (3) helping interpret the trained model's feature importance rankings by comparing them against published resistance mechanisms.

**Where human judgment is required:** Every decision about what enters the final model is Nkechi's. The AI surfaces patterns, but Nkechi must evaluate whether those patterns reflect real biological mechanisms or statistical artifacts. The distinction between correlation and causation is the core scientific question, and no AI tool can answer it — only domain knowledge, experimental design, and peer scrutiny can.

**Decision point with consequences:** During feature analysis, the AI identifies that a variable encoding the *number of ICU beds in the originating hospital* is the third-strongest predictor of CRE transmission. Including it improves the model's AUC-ROC by 0.03. However, Nkechi suspects this is a confound: larger hospitals have more ICU beds, more complex patients, and more aggressive antibiotic regimens — the beds themselves don't cause resistance. If she includes the feature, the model will perform well on the training data (dominated by large academic centers) but may fail at smaller community hospitals. Worse, it could mislead infection control teams into concluding that ICU capacity itself is a risk factor, diverting resources from the actual mechanisms (horizontal gene transfer, antibiotic selection pressure). If she excludes it, the published AUC drops, and a reviewer may question why she discarded a statistically significant predictor.

---

## 2. Collaboration Narrative

**Step 1 — Dataset Preparation & Feature Space Exploration**
Lena Bergmann assembles the dataset: 2,847 CRE isolate genomes from 14 hospitals over 3 years, linked to patient ward transfer histories, antibiotic exposure records, and hospital-level metadata (bed counts, staffing ratios, infection control program maturity scores). Nkechi asks the AI to perform an initial unsupervised analysis of the genomic features — clustering resistance gene cassettes, identifying co-occurring mobile genetic elements, and flagging features with high variance across hospitals.

**Step 2 — AI Feature Analysis**
The AI returns a ranked list of 340 candidate features with preliminary correlation scores against known transmission events. It groups them into three categories: genomic (resistance genes, plasmid types, integron structures), behavioral (antibiotic prescribing intensity, ward transfer frequency), and structural (hospital size, ICU bed count, nurse-to-patient ratio). Nkechi reviews the full list. Most genomic features align with published CRE transmission literature. The structural features give her pause — particularly `icu_bed_count`, which the AI has flagged as strongly predictive.

**Step 3 — Hypothesis Formulation & Confound Investigation**
Nkechi does not simply accept or reject the AI's feature ranking. She formulates a testable hypothesis: *"ICU bed count is a proxy for case complexity and antibiotic pressure, not an independent predictor of CRE transmission."* She designs a stratified analysis — splitting the data by hospital size tertiles and re-running the feature importance within each stratum. She asks the AI to compute partial correlations controlling for total antibiotic defined daily doses (DDDs) and average patient acuity score.

**Step 4 — AI Statistical Analysis & Human Interpretation**
The AI computes the partial correlations. After controlling for antibiotic DDDs and patient acuity, the predictive power of `icu_bed_count` drops from rank 3 to rank 47. Nkechi documents this result: the feature is confounded. She discusses the finding with Dr. Nakamura, who confirms from clinical experience that community hospitals with fewer ICU beds but high antibiotic use see comparable CRE rates. Nkechi decides to **exclude** `icu_bed_count` from the final model and document the confound analysis in the methods section.

**Step 5 — Model Architecture Selection**
Nkechi describes the dataset characteristics to the AI — sample size, feature count, class imbalance (transmission events are rare), temporal structure — and asks for architecture suggestions. The AI recommends three options: a gradient-boosted tree ensemble, a temporal convolutional network, and a Bayesian hierarchical model with hospital-level random effects. Nkechi selects the Bayesian hierarchical model because it naturally handles the multi-hospital structure, quantifies uncertainty (critical for clinical decision-making), and produces interpretable posterior distributions rather than opaque point predictions. She asks the AI to suggest prior distributions based on published CRE transmission rates. She reviews the suggested priors against three published meta-analyses and adjusts two of them based on a more recent study that the AI's training data may not include.

**Step 6 — Model Training, Validation & Sensitivity Analysis**
Nkechi trains the model using temporal cross-validation (training on months 1-24, validating on months 25-30, testing on months 31-36) to prevent data leakage. She runs the model with and without the excluded confound features to confirm that exclusion does not degrade true predictive performance on the held-out test set. She also runs a sensitivity analysis on the priors, confirming that the posterior is dominated by the data rather than the choice of priors. The AI assists with code generation for the sensitivity analysis pipeline, which Nkechi reviews and modifies to add additional diagnostic checks.

**Step 7 — Results Interpretation & Clinical Validation**
The trained model identifies antibiotic selection pressure (measured by carbapenem DDDs per ward-day) and the presence of specific *bla*-KPC plasmid types as the two strongest predictors. Dr. Nakamura validates these findings against ward-level observations: the three wards with the highest model-predicted risk in the test period were indeed the three wards that experienced CRE outbreaks. Nkechi asks the AI to compare her model's top features against a curated database of known CRE resistance mechanisms. The AI confirms alignment for 8 of the top 10 features and flags 2 as potentially novel — Nkechi notes these as hypotheses for future wet-lab validation rather than claiming them as established mechanisms.

**Step 8 — Manuscript Preparation & Peer Review**
Nkechi writes the manuscript. She uses the AI to help draft the literature review section (which she then rewrites substantially for voice and accuracy) and to generate initial figure descriptions (which she edits for precision). Dr. Mensah reviews the full manuscript and requests a more detailed discussion of the confound exclusion decision. Nkechi expands the methods section. The manuscript is submitted to a peer-reviewed journal with a full AI disclosure statement per the journal's policy. Two peer reviewers evaluate it over 8 weeks.

---

## 3. Artifact Description

**What was created:** Three interconnected artifacts:
1. **Published paper** — a peer-reviewed manuscript describing the predictive model, its validation, and the confound analysis, published in a computational epidemiology journal.
2. **Predictive model** — a trained Bayesian hierarchical model with documented priors, hyperparameters, and performance characteristics, deposited in a model repository with version control.
3. **Curated dataset** — 2,847 linked genomic-epidemiological records with data dictionary, preprocessing code, and provenance documentation, deposited in a restricted-access research data repository (restricted due to patient-level data).

**How they are used:** The paper informs other researchers and infection control practitioners. The model is intended for prospective validation at partner hospitals before any clinical deployment — it is a research output, not yet a clinical tool. The dataset enables reproducibility and secondary analyses by other research groups (subject to data use agreements).

**What happens if they are wrong:** If the model's predictions are incorrect and it is deployed prematurely, hospitals could misallocate scarce infection control resources — intensifying surveillance on low-risk wards while missing emerging outbreaks elsewhere. Patients on under-surveilled wards could acquire resistant infections that would have been caught with appropriate screening. If the confound had been left in the model, hospitals with fewer ICU beds might receive falsely reassuring low-risk scores, masking genuine transmission driven by antibiotic prescribing practices. In the worst case, flawed predictions could contribute to delayed outbreak response and preventable patient harm. The scientific record would also be compromised — other researchers building on incorrect findings would propagate the error.

---

## 4. HALOS v0.2 Record (JSON)

See [scientific-research.halos.json](scientific-research.halos.json)

---

## 5. AIVSS-Style Interpretation

Rather than calculating a numeric score, here is how this example would be assessed across AIVSS-relevant dimensions:

**Data Provenance**
The model's training data has a clear chain of custody: Lena Bergmann assembled and cleaned the genomic-epidemiological dataset from 14 hospital sources, with documented preprocessing steps and a published data dictionary. The AI's contributions are confined to analysis and suggestion — it did not produce or modify the underlying data. The confound analysis is fully documented, including the AI-computed partial correlations and Nkechi's interpretation. Any researcher with access to the dataset can reproduce every step. *This lowers risk: the data lineage is transparent and the analytical provenance is complete.*

**Transparency / Explainability**
The interaction semantics throughout the HALOS record make clear what the AI contributed (feature ranking, architecture suggestions, statistical computations, literature comparison) and what Nkechi did with each output (formulated hypotheses, designed stratified analyses, selected and modified model components, interpreted results). The Bayesian model itself is interpretable — it produces posterior distributions, not black-box predictions. The decision to exclude the confounded feature is documented with full rationale. *This lowers risk: the scientific reasoning is legible to reviewers, replicators, and clinicians who might eventually use the model.*

**Accountability**
Nkechi is named as the primary researcher and decision-maker. Dr. Mensah (PI) reviewed the manuscript and the methodological approach. Dr. Nakamura provided independent clinical validation. Lena Bergmann is accountable for data curation. The AI tools operated under Nkechi's direction — she formulated every hypothesis, designed every analysis, and made every inclusion/exclusion decision. Peer reviewers provided independent external scrutiny. *This lowers risk: accountability is distributed across multiple named humans with complementary expertise — no single point of failure and no unattributed AI contribution.*

**Human Oversight**
Every AI output was subjected to at least one layer of human scientific judgment. Feature rankings were evaluated against domain knowledge and tested for confounds. Architecture suggestions were assessed against the study's specific requirements. Statistical outputs were interpreted in clinical context by a practicing infectious disease physician. Prior distributions were checked against published literature. The manuscript underwent PI review and external peer review. *This lowers risk: the oversight structure mirrors established scientific practice — individual evaluation, co-author review, PI review, and independent peer review.*

**Decision Criticality**
The confound exclusion decision is high-criticality: it directly determines whether the model captures real biological mechanisms or statistical artifacts. If wrong in one direction (including the confound), clinical interventions based on the model would target the wrong risk factors. If wrong in the other direction (excluding a genuine predictor), the model loses predictive power. HALOS captures the full decision context — the hypothesis, the stratified analysis, the partial correlation results, the clinical validation, and the rationale. *This is high criticality: the decision affects the scientific validity of the model and, downstream, patient safety.*

**Societal / Operational Impact**
The artifacts have layered impact: the paper enters the scientific record and may influence future research directions; the model, if validated prospectively, could inform clinical resource allocation in hospitals; the dataset enables reproducibility. The patient-level data carries privacy obligations (IRB-approved, restricted access). If the science is sound, the impact is positive — better infection control saves lives. If the science is flawed, the impact compounds: other researchers build on incorrect foundations, and clinicians may act on misleading predictions. *This raises the stakes: HALOS provides the provenance evidence needed for downstream users to evaluate the trustworthiness of the artifacts before acting on them.*

---

## 6. AIUC-1 Classification

**Use Type:** Assistive

The AI performs computationally intensive tasks (feature analysis, statistical calculations, architecture comparison, literature matching) that the human researcher directs, evaluates, and builds upon. The AI never makes a scientific judgment — it surfaces patterns and computes results that the researcher interprets through domain expertise and the scientific method. Every model design decision, inclusion/exclusion choice, and interpretive claim is made by the human research team.

**Impact Level:** High

The artifact directly informs clinical decision-making about infection control resource allocation. Incorrect predictions could contribute to preventable patient harm. The published paper enters the scientific record and may influence research directions and clinical guidelines. Patient-level data carries privacy obligations. The combination of health impact, scientific integrity stakes, and patient data sensitivity places this firmly in the high-impact category.

**Human Involvement:**

Nkechi is involved at every analytical and interpretive stage. She formulates hypotheses, designs validation analyses, selects and modifies model components, interprets results, and makes all inclusion/exclusion decisions. Dr. Nakamura provides independent clinical validation. Dr. Mensah reviews methodology and the full manuscript. Lena Bergmann curates the underlying data. External peer reviewers provide independent scientific scrutiny. No AI output reaches the final artifacts without passing through multiple layers of human scientific judgment — researcher, clinician, PI, and peer reviewers.

---

## 7. Crosswalk to Frameworks

### NIST AI RMF

**Govern**
The research is conducted under an IRB-approved protocol that includes provisions for AI-assisted analysis. The journal's AI disclosure policy requires explicit description of AI involvement in the methods section. The HALOS `governance` and `policyEvaluations` fields reference both policies and record compliance. HALOS provides artifact-level evidence that institutional and publication governance requirements were met.

**Map**
The HALOS record maps AI involvement to specific activities (feature analysis, architecture suggestion, statistical computation, literature comparison) and distinguishes these from human-only activities (hypothesis formulation, confound investigation, clinical validation, manuscript writing). This mapping reveals where AI risk is concentrated — in the analytical pipeline — and where human judgment provides the primary safeguard — in interpretation and decision-making.

**Measure**
The interaction semantics provide measurable evidence of human oversight quality. The `partial` and `modified` responses with detailed notes show that AI outputs were never accepted wholesale — they were filtered through domain expertise, tested against hypotheses, and validated clinically. The confound analysis is itself a measurement of AI output quality: the AI's initial feature ranking was demonstrably misleading for one key variable, and the human-designed stratified analysis corrected it. These are concrete, auditable measures of how human judgment improved upon AI output.

**Manage**
If a risk materializes — say, a replication failure or a clinical adverse event traced to model predictions — the HALOS record provides a complete trail: what data was used, what AI contributed, what the AI got wrong (the confound), how it was caught, who made each decision, and what peer scrutiny the work received. This supports root cause analysis, replication attempts, and institutional accountability processes.

### ISO/IEC 42001

**Auditability**
The HALOS record is a self-contained audit trail of the AI-assisted research process. Every AI interaction is logged with model identifiers, timestamps, and human responses. The decision provenance — particularly the confound exclusion — is documented at a level of detail that supports both scientific replication and institutional audit. An auditor can reconstruct the collaboration timeline without relying on researchers' recall.

**Responsibility Tracking**
The `human_author`, `decisions`, and `graph.relationships` establish clear chains of responsibility: Nkechi for analysis and modeling decisions, Lena for data curation, Dr. Nakamura for clinical validation, Dr. Mensah for PI oversight, and external peer reviewers for independent scrutiny. The `actedOnBehalfOf` relationships confirm that AI tools operated under Nkechi's direction. ISO 42001's requirement for clear role assignment is satisfied at the artifact level.

**Process Transparency**
The graph model makes the research process legible to third parties: data curation -> feature analysis -> confound investigation -> model selection -> training and validation -> clinical validation -> manuscript preparation -> peer review. Each step is typed, timestamped, attributed, and annotated with interaction semantics. This supports ISO 42001's process documentation requirements and aligns with the scientific method's inherent emphasis on methodological transparency.

### CycloneDX (Optional)

In a context where research outputs are tracked as components of a clinical decision support system (e.g., a hospital deploying the model after prospective validation), HALOS and CycloneDX serve complementary roles:

**CycloneDX** would catalog *what components exist* in the deployed system — the trained model binary, the preprocessing pipeline, the feature extraction code, the genomic reference databases, and the runtime dependencies. It answers: "What is in this system?"

**HALOS** records *how the model was developed* — which features were included or excluded and why, what AI contributed to the analysis, what human judgments shaped the model, and what peer scrutiny it received. It answers: "Who built this, with what AI help, and what scientific decisions shaped it?"

**Combined**, a hospital's clinical informatics team evaluating the model for deployment could look up the model component in the CycloneDX manifest, find the linked HALOS provenance record, and understand the full scientific and decision-making history behind it — including the confound that was identified and excluded. This is particularly valuable in healthcare, where the question "why does this model predict what it predicts?" is not merely academic but directly affects patient care decisions.
