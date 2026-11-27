# AGENTS.md — My Virtual Classroom

## Mission
Create complete, projector-ready, animated interactive lessons and 3D hardware studies for Indian ATL students in Grades 5–9, adhering strictly to the **white Swiss-editorial `field-studies.ai.studio` aesthetic** documented in `DESIGN.md` (`IBM Plex Sans` + `IBM Plex Mono`, `#ffffff` background, `#0a0a0a` ink, `#e5533d` coral accent, `#2b56d6` cobalt technical highlights, `rgba(10,10,10,0.14)` hairline borders, `41px` sticky header, `#tiny-dot-cursor`, and separate 19-study portals).
- **Unified AI Lesson Reference:** `testing/artificial-intelligence/what-is-ai.html` (`[1] /what-is-ai` · `fig. 01`) is the approved unified AI reference combining the interactive 10-chapter lesson, 5 real-world stories & 5 Think Together questions per chapter, interactive fruit recognizer experiment, Word Explorer (`#gloss`), and the built-in narrated animated film explainer (`#filmDialog` opened via `▶ Explainer film`). Do NOT duplicate lessons into separate `-video-explainer` cards.
- **3D Electronics Lab Reference:** `testing/electronics/resistor.html` and `testing/electronics/transistor.html` show the viewport-locked `field-studies` split studio (`340px` left explanation column + live right 3D simulator with floating telemetry HUD & bottom dock).

## Read before making changes
- `PEDAGOGY.md`: authoritative teaching method, scope, vocabulary, timing and student content.
- `DESIGN.md`: authoritative `field-studies.ai.studio` visual system, tokens (`#e5533d`, `#2b56d6`, `#tiny-dot-cursor`), layout, animation and UI.
- `.agents/skills/create-virtual-lab/SKILL.md`: required workflow for creating, revising or expanding any lesson, lab or concept.
- Read the current `testing/artificial-intelligence/what-is-ai.html` (or `testing/electronics/resistor.html` for 3D electronics labs) before implementing a new study so typography, cursors, header bar, and palette match identically.
- `README.md`: project overview and commands. Explicit user requirements control lesson topic, audience and duration.

## Repository boundaries
- Two separate subject websites: Electronics & Robotics (`/electronics/`, `testing/electronics/`) and AI & Python (`/artificial-intelligence/`, `testing/artificial-intelligence/`). Keep their source folders and published portals completely separate while matching the identical `field-studies.ai.studio` visual architecture and 19-study catalog (`[1]`–`[19]`).
- New lessons go in `testing/<subject>/<lowercase-hyphenated-slug>.html` unless publishing is explicitly requested. Existing lesson revisions keep their path and slug. The build also discovers `published/<subject>/`; published entries take precedence over duplicate testing slugs, so check for shadowing.
- `index.html` is the front page template; `lib/catalog.mjs` discovers labs, extracts metadata and renders subject pages. `build.mjs` builds `dist/index.html`, `dist/electronics/` and `dist/artificial-intelligence/`; `server.js` serves `dist/` on port 3000.
- Do not hand-edit generated dist, change deployment configuration, server.js or unrelated lessons without a task-specific reason and authorization. Preserve navigation and existing catalog metadata conventions.
- A lesson is self-contained HTML/CSS/JS, with inline illustrations and system fonts, no runtime network dependency for new lessons. If a specialized 3D dependency is necessary, provide a working offline alternative or disclose the limitation. No API keys, tracking or external searches required to teach.

## Non-negotiable lesson contract
- Default 45 minutes including 10 minutes of notebook notes; adapt to explicit request. One coherent topic, simple words, full explanation through progressive steps, one main analogy, a meaningful experiment, misconceptions and checks.
- Visible explanation first, example second, animated visual of the mechanism, then optional revealable reasoning. Not just questions or interactions. Every essential unfamiliar word has a clickable definition, example and suitable visual, plus a global word bank.
- Consistent lesson shell: jump-to-slide, previous/next, step navigation, replay, word bank, fullscreen, progress and final notebook. Same design system across topics; adapt actual illustration and experiment to the subject.
- Keep notes short and self-contained. No author/assistant references in the student interface.
- Use accurate simulation logic and disclose simplifications; no fake readings or decorative-only controls.

## Verification before delivery
For code changes run `npm run lint`, `npm test`, and `npm run build`. Verify correct source is published and subject pages link correctly. Serve with `npm start` or `npm run dev` and test the actual lesson in a browser at 1280×720, 1920×1080 and a tablet/small viewport. Use the checklist in the skill's references. Inspect screenshots, navigate every slide/step, replay, test definitions, experiments, incorrect answers and resets, keyboard and touch controls. Check zero console errors and no inaccessible or clipped content. Do not claim tests or deployment that were not performed. For docs-only changes, check all referenced paths, consistency and skill metadata; no need to pretend a build was run.

## Reporting
Summarize changed files, actual checks and limitations. Commit only the requested changes when repository updates are authorized. Keep the approved reference lesson unchanged unless specifically asked to revise it.

## Animated film workflow (separate from classroom lessons)
For requests to make an animated video, narrated explainer, or film-plus-lesson, read `VIDEO-EXPLAINER.md` and follow `.agents/skills/video-explainer/SKILL.md` as well as the relevant teaching rules. The original upstream video-explainer is pinned under `vendor/video-explainer/`; use its actual scripts for video rendering and QA. Preserve the 45-minute lesson default; a 60–75 second film is a separate deliverable. Use the shared classroom white style and age-appropriate narration. Do not overwrite existing lessons, install dependencies without approval, expose a local review server publicly, or put keys in the repo. Video projects live outside the website source folders; no video toolchain dependency in the static build. Verify the actual film/render and report unrun checks.
