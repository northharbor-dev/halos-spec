# HALOS Example: Education / Student Learning

## 1. Scenario

**Domain:** Higher education -- undergraduate capstone research

**Who:** Mateo Rivera is a third-year undergraduate biochemistry student at a mid-size research university. He is writing his capstone research paper on CRISPR-Cas9 gene therapy applications for sickle cell disease, specifically examining the clinical trajectory from ex vivo editing of hematopoietic stem cells to in vivo delivery approaches. His faculty advisor is Dr. James Whitfield, a molecular biology professor who has supervised capstone projects for 12 years.

**What he's trying to accomplish:** Mateo needs to produce a 25-page capstone paper that demonstrates his ability to synthesize primary literature, construct a scientific argument, and critically evaluate emerging therapeutic approaches. The paper must include an original analytical contribution -- in his case, a comparative framework for evaluating off-target editing risks across three CRISPR delivery methods. The paper will be graded, presented at the department's spring symposium, and may be submitted to the university's undergraduate research journal.

**How AI is used:** Mateo's university has an AI use policy that permits AI assistance with mandatory disclosure. Mateo uses an AI assistant for four purposes: (1) searching and summarizing literature to identify relevant papers more efficiently, (2) asking the AI to explain complex molecular mechanisms he encounters in primary sources, (3) getting structural and argumentative feedback on his drafts, and (4) checking his citations for consistency. He does not use AI to write prose that appears in the final paper.

**Where human judgment is required:** Every intellectual contribution -- the research question, the thesis, the analytical framework, the interpretation of evidence, the conclusions -- is Mateo's. The AI helps him find, understand, and organize information, but he must evaluate what to include, how to frame it, and what it means. Dr. Whitfield reviews two drafts and the final submission, evaluating both the quality of the science and whether the work reflects genuine understanding.

**Decision point with consequences:** While researching off-target editing risks, Mateo asks the AI to summarize the current state of knowledge about Cas9 off-target effects in hematopoietic stem cells. The AI produces a compelling synthesis that includes a specific claim: that a 2024 study by Park et al. demonstrated a correlation between chromatin accessibility at off-target sites and patient age, suggesting older patients may face elevated risks from ex vivo CRISPR therapy. This would strengthen Mateo's argument significantly. But when he tries to locate the Park et al. paper, he cannot find it. The AI may have fabricated the citation, or conflated findings from multiple papers. Mateo must decide: incorporate the argument (which sounds scientifically plausible and would improve his paper) and hope the reviewer doesn't check, or spend additional hours tracing the claim to verified primary sources -- potentially discovering that the specific correlation doesn't exist in the literature, which would weaken his section but keep his work honest.

---

## 2. Collaboration Narrative

**Step 1 -- Literature Search and Orientation**
Mateo begins by asking the AI to help him map the landscape of CRISPR-based sickle cell disease research. He prompts: *"What are the major clinical trials using CRISPR for sickle cell disease as of 2025? List the trial names, sponsors, CRISPR approach used, and current status."* The AI returns a structured summary covering Vertex/CRISPR Therapeutics' exa-cel (Casgevy), Editas Medicine's EDIT-301, and several academic-led trials. Mateo uses this as a starting point but **verifies every trial** against ClinicalTrials.gov and published FDA briefing documents. He finds one trial the AI listed that had been discontinued -- a detail the AI missed. He corrects his notes accordingly.

*This is AI as learning partner: the AI accelerated Mateo's orientation to the field, but he treated its output as a first draft to be verified, not as a final source. He learned something the AI got wrong, which deepened his understanding of the trial landscape.*

**Step 2 -- Understanding a Complex Mechanism**
While reading a primary paper on base editing approaches (Newby et al., *Nature*, 2021), Mateo encounters a passage about adenine base editors converting A-T to G-C base pairs at the sickle mutation site. He understands the concept in general but struggles with how the guide RNA design prevents editing at homologous sites on chromosome 16. He asks the AI to explain the specificity mechanism in plain language with a molecular diagram description. The AI explains protospacer-adjacent motif (PAM) constraints, guide RNA mismatch tolerance, and the thermodynamic basis for off-target discrimination. Mateo reads the explanation twice, then returns to the primary paper -- and finds he can now parse the methods section he'd been stuck on. He writes his own explanation in his paper, in his own words, using the primary source as his citation.

*This is genuine learning: the AI functioned like an on-demand tutor. Mateo didn't copy the AI's explanation -- he used it to build understanding he then applied independently to the primary literature.*

**Step 3 -- The Fabricated Citation**
As Mateo develops his section on off-target editing risks, he asks the AI: *"What is the current evidence on off-target CRISPR editing in hematopoietic stem cells, specifically regarding patient-specific variables like age?"* The AI produces a multi-paragraph summary and cites "Park et al., 2024, *Nature Biotechnology*" for the claim that chromatin accessibility at off-target sites correlates with donor age. The argument is scientifically plausible -- chromatin structure does change with age, and off-target editing is influenced by chromatin accessibility. Including it would make his comparative framework more nuanced.

Mateo searches PubMed, Google Scholar, and the Nature Biotechnology archive. He finds no paper by Park et al. matching that description. He finds a 2023 review by Tsai and Joung that discusses chromatin accessibility and off-target effects in general terms, and a 2024 paper by Kim et al. on age-related changes in hematopoietic stem cell epigenetics -- but neither makes the specific correlation the AI claimed.

**He decides not to include the claim.** Instead, he writes a paragraph noting that chromatin accessibility is a known modulator of off-target risk (citing Tsai and Joung) and that age-related epigenetic changes in HSCs are well-documented (citing Kim et al.), but explicitly states that no published study has yet demonstrated a direct correlation between patient age and off-target editing frequency in the CRISPR-SCD context. He flags this as an area for future research.

*This is the critical learning moment. The shortcut would have been to include the plausible-sounding claim and hope it survived review. The responsible choice -- which Mateo made -- was to verify, discover the gap, and write honestly about what the evidence does and does not show. The result is a weaker-sounding argument but a stronger paper.*

**Step 4 -- Draft Feedback**
Mateo completes his first full draft and asks the AI to review it for structural coherence and argumentative gaps. The AI identifies three issues: (1) his introduction promises a comparison of three delivery methods but his analysis section only covers two in depth, (2) his discussion of regulatory pathways feels detached from the scientific argument, and (3) his conclusion restates findings but doesn't articulate their significance for the field.

Mateo **accepts** points 1 and 3. He expands his analysis of the third delivery method (lipid nanoparticle-mediated in vivo delivery) by reading two additional primary papers he hadn't previously identified. He rewrites his conclusion to articulate why his comparative framework matters for clinical decision-making. He **rejects** point 2 -- he believes the regulatory discussion is appropriately separate because it serves a different analytical purpose, and he plans to defend this choice to Dr. Whitfield.

**Step 5 -- Faculty Advisor Review**
Mateo submits his second draft to Dr. Whitfield along with his HALOS disclosure document. Dr. Whitfield reviews both. He notes that Mateo's handling of the off-target risk section is particularly strong -- his acknowledgment of what the literature doesn't yet show demonstrates scientific maturity. He asks him to expand his methods section to explain how he conducted his literature search, including his use of AI. He agrees with his decision to keep the regulatory section separate. He approves the paper for final submission with minor revisions.

**Step 6 -- Final Submission**
Mateo makes Dr. Whitfield's requested revisions, runs a final citation consistency check with the AI (which catches one misformatted DOI), and submits his paper with the attached HALOS provenance record as his AI use disclosure.

---

## 3. Artifact Description

**What was created:** A 25-page capstone research paper titled "Comparative Analysis of CRISPR-Cas9 Delivery Methods for Sickle Cell Disease: Off-Target Risk as a Framework for Clinical Decision-Making." The paper includes an original analytical framework, a literature synthesis of 47 primary sources, and a discussion of regulatory and clinical implications.

**How it is used:** The paper is submitted for grading as the capstone requirement for Mateo's biochemistry degree. It will be presented at the department's spring research symposium. If accepted, it may be published in the university's undergraduate research journal, *Inquiry*, where it would be indexed and publicly accessible. Dr. Whitfield may also reference Mateo's analytical framework in his own future review articles.

**What happens if it is wrong:** If the paper contains fabricated citations or unverified claims that are later discovered, Mateo faces academic integrity violations ranging from a failing grade to disciplinary action under the university's honor code. If published in *Inquiry* and the errors are substantive -- for example, if the fabricated Park et al. claim had been included and a reader tried to follow the citation -- it contributes incorrect information to the scientific record and damages the journal's credibility. If Dr. Whitfield's reputation is affected by endorsing work with fabricated sources, it damages the advising relationship and his willingness to support future students' AI-assisted work.

---

## 4. HALOS v0.2 Record (JSON)

See [education-student-learning.halos.json](education-student-learning.halos.json)

---

## 5. AIVSS-Style Interpretation

Rather than calculating a numeric score, here is how this example would be assessed across AIVSS-relevant dimensions:

**Data Provenance**
The final paper draws on 47 primary sources, all of which Mateo located and verified independently -- even when the AI initially pointed him toward them. The HALOS record documents that AI-generated summaries were used for orientation and comprehension, not as source material. The one instance where an AI-generated citation could not be verified is explicitly recorded as a decision point, with the outcome being rejection of the unverifiable claim. *This lowers risk: the provenance chain distinguishes between AI as research assistant and AI as source.*

**Transparency / Explainability**
The HALOS record and collaboration narrative make the full process legible: which interactions were exploratory (literature search), which were educational (mechanism explanation), which were evaluative (draft feedback), and which were mechanical (citation formatting). The interaction semantics (`modified`, `rejected`, `accepted`) with detailed notes give Dr. Whitfield -- and any future reader -- a clear picture of Mateo's intellectual engagement. *This lowers risk: the disclosure goes far beyond "I used AI," making it possible to assess the nature and depth of AI involvement.*

**Accountability**
Mateo is named as the sole author. Dr. Whitfield is named as the reviewing advisor with approval authority. The AI assistant is identified by model and version and is explicitly positioned as operating under Mateo's direction (`actedOnBehalfOf`). Every decision about what to include, what to reject, and how to frame the argument is attributed to Mateo. *This lowers risk: there is no ambiguity about who is intellectually responsible for the paper's claims.*

**Human Oversight**
Every AI output passed through Mateo's evaluation before anything reached the paper. Literature summaries were verified against primary sources. The mechanism explanation was used for comprehension, not copied. The fabricated citation was caught and rejected. Draft feedback was selectively adopted. Dr. Whitfield provided an independent second layer of review. *This lowers risk: multiple checkpoints prevented unverified AI output from reaching the final artifact.*

**Decision Criticality**
The decision to reject the unverifiable off-target editing claim is the highest-criticality decision in the record. Including it would have introduced potentially fabricated science into a graded academic paper and possibly a published undergraduate journal. HALOS captures the full decision context: what the AI claimed, what Mateo found when he tried to verify it, what he wrote instead, and why. *This is high criticality: the consequence affects academic integrity, scientific accuracy, and the student's professional formation.*

**Societal / Operational Impact**
The artifact is an academic paper that contributes to the scientific record if published. Universities are actively developing norms around AI use in student work. This HALOS record serves as evidence that responsible AI use and genuine learning can coexist -- and that the process can be made transparent enough for educators to assess. *This moderately raises confidence: the record demonstrates a model for AI-assisted academic work that prioritizes integrity over convenience.*

---

## 6. AIUC-1 Classification

**Use Type:** Assistive

The AI assists with information retrieval, comprehension, and feedback. It does not produce content that appears in the final paper. Every AI output is evaluated, verified, or rejected by the student before any aspect of it influences the artifact.

**Impact Level:** Moderate

The artifact is a graded academic paper tied to a degree requirement, with potential publication in an undergraduate journal. Errors can result in academic integrity violations and contribute inaccurate information to the scientific record. However, the consequences are academic and reputational -- not safety-critical.

**Human Involvement:**

Mateo is involved at every stage: he formulates the research question, designs the analytical framework, selects and verifies all sources, writes all prose, makes all argumentative decisions, and is solely responsible for the paper's claims. Dr. Whitfield provides independent faculty review and approval. No AI output appears in the final artifact without verification, transformation, or explicit rejection by the student.

---

## 7. Crosswalk to Frameworks

### NIST AI RMF

**Govern**
The university's AI use policy establishes the governance context. The HALOS `governance` field references the policy; the `policyEvaluations` section records Mateo's self-assessment and Dr. Whitfield's compliance review. HALOS provides artifact-level evidence that institutional governance policies were followed -- turning a policy requirement into a verifiable practice.

**Map**
The HALOS record maps AI involvement to specific activities (literature search, mechanism explanation, draft feedback, citation checking) and identifies the educational context of each. This makes it possible to assess where AI risk is concentrated -- the literature search carries fabrication risk (as the Park et al. incident demonstrates), while the citation formatting is low-risk and mechanical.

**Measure**
The interaction semantics (`partial`, `modified`, `rejected`, `accepted`) with detailed response notes provide measurable evidence of the student's intellectual engagement. A faculty reviewer can see that unverifiable claims were rejected, that AI explanations were used for comprehension rather than copied, and that draft feedback was selectively adopted with reasoning. These are concrete, auditable measures of responsible use.

**Manage**
If an integrity concern arises after submission -- say, a reviewer questions whether a section was AI-generated -- the HALOS record provides a complete, timestamped evidence trail: what the AI contributed, how the student responded, and what decisions shaped the final text. This supports investigation and dispute resolution far more effectively than a generic disclosure statement.

### ISO/IEC 42001

**Auditability**
The HALOS record is a self-contained, machine-readable audit trail for an individual academic artifact. Every AI interaction is logged with model identifiers, timestamps, and human responses. An academic integrity committee could reconstruct the full collaboration timeline without relying on the student's oral recollection.

**Responsibility Tracking**
The `human_author`, `decisions`, and `graph.relationships` (especially `actedOnBehalfOf`) establish an unambiguous chain of responsibility. The AI acted on behalf of Mateo; Mateo is accountable to Dr. Whitfield; Dr. Whitfield approved the final work. ISO 42001's requirement for clear role assignment is satisfied at the artifact level.

**Process Transparency**
The graph model makes the research process legible to third parties: literature search -> source verification -> mechanism comprehension -> framework development -> drafting -> AI feedback -> revision -> faculty review -> final submission. Each step is typed, timestamped, and attributed. This supports ISO 42001's process documentation requirements while giving educators something they rarely have: a detailed window into how a student actually worked.

### CycloneDX (Optional)

In a university context where research outputs are tracked as institutional assets -- for example, in a digital repository or institutional review board system -- HALOS and CycloneDX serve complementary roles:

**CycloneDX** would catalog *what components exist* in the research output -- the paper itself, supplementary datasets, the analytical framework, presentation materials, and any code used for analysis.

**HALOS** records *how each component was created* -- which parts involved AI assistance, what the student did independently, what decisions shaped the analysis.

**Combined**, a journal editor, department chair, or integrity review board could look up the paper in the repository, find the HALOS provenance record, and understand the full intellectual history behind it. This is increasingly valuable as universities develop policies around AI-assisted academic work and need evidence, not just assertions, about how AI was used.

---

## 8. HALOS and Responsible Learning

### AI as Learning Partner vs. Shortcut

This example illustrates the distinction through three contrasting moments:

**Learning partner (Step 2):** When Mateo asked the AI to explain the adenine base editor specificity mechanism, he used it as a tutor -- not to produce text for his paper, but to build understanding he then applied independently. The evidence: he returned to the primary paper afterward and could parse a methods section that had previously been opaque to him. The AI accelerated his comprehension; it didn't replace it. A shortcut version of this interaction would have been copying the AI's explanation into his paper and citing the primary source he hadn't fully read.

**Learning partner (Step 3):** The fabricated citation incident is, paradoxically, the strongest evidence of learning in the entire record. By attempting to verify the AI's claim, Mateo discovered that the specific correlation didn't exist in the published literature -- which taught him something important about the state of the field that he wouldn't have learned otherwise. He then wrote a more honest and scientifically mature paragraph that explicitly identified a gap in the literature. The shortcut would have been accepting the plausible-sounding claim without verification.

**Boundary case (Step 1):** The literature search sits closer to the boundary. The AI accelerated Mateo's orientation to the field, but there's a question: would he have developed a deeper understanding of the trial landscape if he had done the initial survey manually? Possibly. The HALOS record doesn't resolve this question, but it makes it visible -- an educator reviewing the record can see that the AI provided the initial structure and Mateo verified and corrected it, and can form their own judgment about whether that process supported adequate learning.

### Transparency Between Student and Educator

A standard AI disclosure statement might say: *"I used Claude to help with literature search and to get feedback on my drafts."* This tells Dr. Whitfield almost nothing. It doesn't distinguish between a student who used AI to find papers and then read them carefully, and a student who asked AI to summarize papers and never opened the originals.

The HALOS record gives Dr. Whitfield something fundamentally different: a process narrative with decisions. He can see that:

- Mateo verified AI-generated literature summaries against primary sources and caught an error
- He used AI explanations to build comprehension, then wrote his own text from the primary literature
- He encountered a fabricated citation, investigated it, and chose to write about the evidentiary gap instead
- He adopted some AI feedback on his draft and rejected other feedback with reasoning
- He used AI for mechanical tasks (citation formatting) where intellectual engagement isn't the point

This doesn't guarantee that the record is complete or accurate -- a student could omit interactions or mischaracterize their process. But it shifts the disclosure from a binary ("used AI" / "didn't use AI") to a structured narrative that supports a genuine conversation between student and advisor about how the work was done. Dr. Whitfield can ask follow-up questions grounded in specific interactions rather than vague assertions.

For the university, HALOS records across many students would begin to reveal patterns: which kinds of AI interactions correlate with strong learning outcomes, where students commonly take shortcuts, and what kinds of assignments are most vulnerable to AI-mediated integrity erosion. This is institutional intelligence that no number of "I used AI" checkboxes can provide.

### How AI Changes Learning

Mateo's paper exists in a space that wasn't available to students five years ago. Several things are different:

**Access to explanation on demand.** Mateo could ask the AI to explain a mechanism he didn't understand, at the moment he needed the explanation, calibrated to his level. Previously, he might have emailed Dr. Whitfield and waited two days, asked a peer who might also be confused, or simply skipped the detail and hoped it wasn't important. The AI lowered the friction of comprehension. The HALOS record shows this happened and shows that Mateo used the explanation as a bridge to the primary literature, not as an endpoint.

**Accelerated literature discovery.** Mateo surveyed the trial landscape in an hour that might have taken a week of manual searching. This gave him more time for the analytical work that actually develops him as a scientist. But it also means he didn't develop the skill of methodical literature searching to the same degree. The HALOS record doesn't resolve whether this tradeoff is acceptable -- but it surfaces it for educators to consider.

**New failure modes.** The fabricated citation is a failure mode that didn't exist before AI. A student doing a manual literature review would never encounter a plausible-sounding citation that doesn't exist. AI introduces the possibility of confidently wrong information entering the research process. Mateo caught it because he tried to verify. Not every student will. The HALOS record makes verification behavior visible -- an educator can see whether a student checked, and what they did when the check failed.

**What might he have missed?** By using AI to survey the field, Mateo may have missed serendipitous discoveries -- the paper he would have found by following a citation chain through an unexpected direction, the tangential finding that sparks a new question. AI-assisted search tends to optimize for relevance to the stated query, which can narrow intellectual exploration. The HALOS record shows what Mateo asked for; the absence of aimless browsing is itself informative.

**How HALOS helps educators assess learning:** Dr. Whitfield cannot read Mateo's mind. He cannot know with certainty whether he genuinely understands the adenine base editor mechanism or merely wrote a convincing paragraph. But the HALOS record gives him process evidence that complements the product evidence (the paper itself). He can see that he engaged with AI as a comprehension tool and then returned to primary sources. He can see that he rejected unverifiable claims. He can see where he disagreed with AI feedback and why. None of this is proof of learning, but it is evidence of the kind of intellectual behavior that learning requires -- and it is far more than educators typically have access to.
