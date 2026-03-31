# HALOS Example: Music / Creative Production

## 1. Scenario

**Domain:** Music production — film scoring

**Who:** Maya Reeves is a freelance composer hired to score a 90-minute independent documentary about coral reef restoration in the Pacific. She has 3 weeks to deliver 22 cues totaling ~45 minutes of original music. The production budget is modest, so she works without a live orchestra — everything is produced in her DAW (Digital Audio Workstation) using virtual instruments, samples, and synthesis.

**What she's trying to accomplish:** Maya needs to compose an emotionally nuanced underscore that shifts between hope, loss, scientific wonder, and urgency. The director has provided a locked picture edit, a mood document, and temp music references (mostly ambient and neo-classical).

**How AI is used:** Maya uses an AI composition assistant to generate melodic and harmonic sketch ideas based on her descriptions of each scene's emotional arc. She also uses AI-assisted mixing tools that suggest EQ curves, reverb settings, and spatial placement for her virtual instruments.

**Where human judgment is required:** Every creative decision — melody selection, harmonic voicing, orchestration, emotional tone, timing to picture — is Maya's. The AI never outputs a finished cue. It produces raw material that Maya shapes, rejects, or reworks. The director's feedback loop adds another layer of human judgment.

**Decision point with consequences:** Cue 14 underscores a pivotal scene where a marine biologist discovers that a reef thought to be recovering has actually bleached again. The director wants the music to convey "hope collapsing into grief without melodrama." The AI generates three harmonic sketches. Maya must choose and adapt one — or reject all three and compose from scratch. If the emotional tone is wrong, the scene fails. The director has final approval, and a misjudged cue here could require a costly re-edit of the surrounding sequence.

---

## 2. Collaboration Narrative

**Step 1 — Scene Analysis & Prompting**
Maya watches the locked picture for Cue 14 several times, noting the exact moment (01:02:34) where the biologist's expression shifts. She writes a natural-language description for the AI: *"Begin in warm A-flat major, strings and piano, gentle motion. At 01:02:34, pivot to ambiguity — not minor, but hollow. Remove the piano. Let the strings thin to a single sustained line. No resolution."*

**Step 2 — AI Generation**
The AI composition tool generates three 90-second harmonic/melodic sketches as MIDI data with suggested instrument mappings. Each interprets Maya's prompt differently — one uses a deceptive cadence, one uses modal mixture, one dissolves into pure texture.

**Step 3 — Human Evaluation & Rejection**
Maya listens to all three against picture. She **rejects** Sketch 1 (the deceptive cadence feels too dramatic — "melodrama," exactly what the director said to avoid). She **rejects** Sketch 3 (dissolving into texture loses emotional thread). She finds Sketch 2 (modal mixture) promising but not right.

**Step 4 — Human Modification**
Maya takes the harmonic skeleton of Sketch 2 and substantially reworks it: she changes the voicing from close to open position, rewrites the top-line melody entirely by hand, adjusts the pivot point to land 2 beats earlier to sync with the biologist's eye movement, and replaces the AI's suggested cello sustain with a solo viola — a timbral choice tied to a recurring motif she established in Cue 3.

**Step 5 — AI-Assisted Mixing**
Maya runs her produced cue through an AI mixing assistant, which suggests a specific reverb tail length (2.1s) and a high-shelf cut at 8kHz to sit the viola under the dialogue. She **accepts** the reverb suggestion but **rejects** the EQ cut — she wants the viola to cut through slightly, not recede.

**Step 6 — Director Review & Approval**
Maya sends the cue to the director, who listens against picture and requests one change: extend the sustained viola note by 3 beats to carry through the scene transition. Maya makes the edit herself. The director approves the final version.

---

## 3. Artifact Description

**What was created:** Cue 14 — "Bleached" — a 94-second orchestral underscore cue, delivered as a stereo WAV (48kHz/24-bit) with a corresponding session file containing all MIDI data, virtual instrument assignments, and mix automation.

**How it is used:** The cue is placed into the documentary's final audio mix by the re-recording mixer. It will be heard by festival audiences, streaming viewers, and broadcast audiences. It is registered with a performing rights organization (PRO) for royalty tracking.

**What happens if it is wrong:** If the emotional tone misjudges the scene, it undermines a pivotal narrative moment. The director may require re-composition, delaying the final mix and potentially the festival submission deadline. If AI involvement is undisclosed and later discovered, it could affect the film's eligibility for certain music awards that require disclosure of AI-assisted composition, and damage Maya's professional reputation.

---

## 4. HALOS v0.2 Record (JSON)

See [music-creative-production.halos.json](music-creative-production.halos.json)

---

## 5. AIVSS-Style Interpretation

Rather than calculating a numeric score, here is how this example would be assessed across AIVSS-relevant dimensions:

**Data Provenance**
HALOS reveals that the final artifact derives partially from AI-generated MIDI data (harmonic sketch), but the derivation is narrow (harmonic skeleton only) and heavily transformed. The scene description prompt — the AI's sole input — was human-authored. The provenance chain is clear and auditable. *This lowers risk: origin of every creative element is traceable.*

**Transparency / Explainability**
The interaction semantics (`partial` response with detailed notes) make explicit what Maya took, what she rejected, and why. The two AI tools are identified by name and version. Anyone reviewing the HALOS record can distinguish Maya's creative contribution from the AI's. *This lowers risk: no hidden AI involvement; the record explains itself to non-technical readers like award committees or licensing bodies.*

**Accountability**
Maya is named as the responsible decision-maker for both the harmonic approach and the mixing decisions. The director is named as the approver. The `actedOnBehalfOf` relationships confirm that both AI tools operated under Maya's direction. *This lowers risk: clear chain of human responsibility — no ambiguity about who owns the creative and professional consequences.*

**Human Oversight**
Every AI output passed through at least one human evaluation. The composition sketches went through selection, rejection, and substantial reworking. The mixing suggestions were individually accepted or rejected with rationale. The director provided an independent second layer of human review. *This lowers risk: multiple checkpoints prevent AI output from reaching the final artifact unexamined.*

**Decision Criticality**
The harmonic approach decision directly determines the emotional impact of a pivotal documentary scene. HALOS captures the context (director's requirement, the specific visual moment), the alternatives considered, and the rationale — making the decision auditable after the fact. *This is moderate-to-high criticality: the consequence is artistic and reputational, not safety-critical, but the decision is irreversible once the film is released.*

**Societal / Operational Impact**
The artifact reaches public audiences and is registered for royalty tracking. If AI involvement were concealed, it could affect award eligibility, royalty disputes, or public trust. HALOS makes the disclosure verifiable. *This moderately raises confidence: the record provides evidence that professional and industry norms around AI disclosure were followed.*

---

## 6. AIUC-1 Classification

**Use Type:** Assistive

The AI generates raw material (harmonic sketches, mix parameter suggestions) that the human evaluates, substantially transforms, or discards. The AI never makes a creative decision autonomously or produces a finished output.

**Impact Level:** Moderate

The artifact is a publicly released creative work tied to professional reputation, royalty income, and award eligibility. Errors in emotional tone affect the documentary's narrative impact. However, the consequences are artistic and commercial — not safety-critical.

**Human Involvement:**

Maya is involved at every stage: she authors the prompts, evaluates all AI outputs, rejects or substantially modifies them, composes and produces the final cue, and makes all mixing decisions. The director provides independent approval. No AI output reaches the final artifact without at least two layers of human judgment (composer + director).

---

## 7. Crosswalk to Frameworks

### NIST AI RMF

**Govern**
Maya's production agreement includes an AI disclosure clause. The HALOS `governance` field references the applicable policy. The `policyEvaluations` section confirms she self-assessed compliance. HALOS provides the artifact-level evidence that organizational governance policies were followed.

**Map**
The HALOS record maps AI involvement to specific activities (sketch generation, mix suggestions) and identifies the context in which each operates (creative composition vs. technical mixing). This makes it possible to assess where AI risk is concentrated — in this case, the creative generation step is higher-risk than the mixing suggestion step.

**Measure**
The interaction semantics (`partial`, `modified`, `rejected`) with detailed response notes provide measurable evidence of human oversight quality. A governance reviewer can see that 2 of 3 sketches were rejected, that the accepted sketch was substantially reworked, and that one of two mix suggestions was rejected with rationale. These are concrete, auditable measures of human engagement.

**Manage**
If a risk materializes — say, an award body challenges the AI disclosure — the HALOS record provides a complete, timestamped evidence trail: what was generated, what was used, what was changed, and who decided. This supports incident response and dispute resolution.

### ISO/IEC 42001

**Auditability**
The HALOS record is a self-contained, machine-readable audit trail. Every AI interaction is logged with model identifiers, timestamps, and human responses. An auditor can reconstruct the full collaboration timeline without relying on oral testimony or scattered notes.

**Responsibility Tracking**
The `human_author`, `decisions`, and `graph.relationships` (especially `actedOnBehalfOf`) establish an unambiguous chain of responsibility. The AI tools acted on behalf of Maya; Maya is accountable to the director; the director approved the final work. ISO 42001's requirement for clear role assignment is satisfied at the artifact level.

**Process Transparency**
The graph model makes the creative process legible to third parties: prompt authoring -> AI generation -> human evaluation -> human composition -> AI mixing suggestions -> human mixing -> director review. Each step is typed, timestamped, and attributed. This supports ISO 42001's process documentation requirements without requiring a separate process management system.

### CycloneDX (Optional)

In a production context where the documentary's deliverables are tracked as a bill of materials (e.g., for distribution licensing or archive), HALOS and CycloneDX serve complementary roles:

**CycloneDX** would catalog *what components exist* in the final delivery — the 22 music cues, sound effects libraries, sample packs, virtual instrument licenses, and third-party stems. It answers: "What is in this deliverable?"

**HALOS** records *how each component was created* — which cues involved AI, what the human did, what decisions shaped the result. It answers: "Who made this, with what AI help, and what choices did they make?"

**Combined**, a distributor or archive could look up any individual cue in the CycloneDX manifest, find the embedded HALOS provenance record, and understand the full creative and decision-making history behind it. This is particularly valuable for music licensing, where the question "was AI used in the creation of this work?" increasingly affects contractual and legal obligations.
