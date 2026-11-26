---
name: create-virtual-lab
description: Create, redesign, expand, or review a complete animated interactive classroom lesson for Grades 5–9 in My Virtual Classroom, including Electronics, Robotics, Artificial Intelligence and Python. Use whenever asked for a new concept, teaching webpage, projector slide, simulation, classroom experiment, lesson notes or improvement to an existing lab; follow the approved explanatory lesson design and age-appropriate pedagogy.
---

# Create a virtual classroom lesson

Use this workflow for all subjects. A complete explanatory lecture is the deliverable, not a standalone app or quiz.

## 1. Load the project standard
From the repository root read AGENTS.md, DESIGN.md and PEDAGOGY.md. Read `testing/electronics/resistor.html` and `index.html` for the authoritative **Vibe Discovery green scientific-journal UI** (sticky masthead with 5-color strip, hero frontmatter, sticky TOC + telemetry, editorial prose with clickable Word Explorer terms, interactive widgets, Concept Check, Notebook Summary, and Light/Dark toggle), and consult `testing/artificial-intelligence/what-is-ai.html` (commit 455e9c127c84085f4db2ec42e6ad9c44701c7615) only as a pedagogy/explanation-depth reference. Use [lesson blueprint](references/lesson-blueprint.md) for content and implementation and [quality checklist](references/quality-checklist.md) before delivery. Consult relevant subject sources or primary references to verify facts when needed. Keep references out of the student flow unless educationally useful.

## 2. Plan the lesson
Identify subject, grade, exact concept, prerequisite words, learning goal and requested duration. Default to Grade 5 accessibility and 45 minutes including 10 minutes of notebook work. Make a slide/step/time plan, a vocabulary map and one coherent analogy. Include what, why, how, example, limitations, experiment and recap. Do not pad or introduce the next lesson prematurely. Use the plan to confirm time totals and explanation coverage.

## 3. Write explanations before building interactions
Write short visible explanations, matching examples, captions, and revealable reasons. Use stable question IDs throughout. Explain unfamiliar terms at first use and link each to a global word explorer. Give the same level of completeness as the approved lesson, with multiple progressive beats when needed; neither fixed slide counts nor copied subject examples are required. Finish with copyable notes based on the taught material.

## 4. Build the page
Reuse the approved page's interaction patterns, typography, shell, responsive CSS and navigation where appropriate. Replace all topic-specific data, illustrations, questions, simulations and notes. Prefer inline SVG, HTML and CSS animations; Canvas/3D/code tools only when they teach the concept better. Make animation changes correspond to the explanation. Provide manual step controls, replay, feedback, reset where needed, word bank and fullscreen. No inert buttons, fake calculations, remote runtime dependencies or undisclosed toy simulations.

Use the correct subject and slug per AGENTS.md. Include title, description and lab-formula metadata expected by the catalog. Preserve the existing source path when revising. Use subject-appropriate demos: physical behaviour and safe circuits, sensing and control, AI input/learning/output where relevant, or actual Python execution and values when relevant. Use the appropriate depth, not mandatory formulas, telemetry, x-ray, 3D or code on every lesson.

For electronics and robotics with physical components, read [electronics realism and simulation](references/electronics-realism.md) before building the illustrations and experiments. Use the reference's source, physics, interaction and browser QA workflow.

## 5. Test and deliver
Apply the [quality checklist](references/quality-checklist.md) in full. Fix discovered problems. Run repository checks and browser tests for lesson changes, and distinguish passed checks from unverified ones. Deliver or update the requested HTML path, not a PDF or a separate teacher document unless requested. Report what changed and actual verification. When updating documentation only, verify links and rules instead of pretending to test a lesson.

## Optional cinematic companion
When a user asks for a narrated animated film or a video-plus-lesson edition, also follow the root VIDEO-EXPLAINER.md and sibling video-explainer/SKILL.md. Use the pinned upstream rendering toolchain for the film, and preserve this skill's full teaching, word explorer, experiment and notebook workflow for the HTML lesson. Keep existing lesson files unchanged unless replacement is explicitly requested.
