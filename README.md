# My Virtual Classroom

Interactive Swiss-editorial 3D and 2D teaching labs for **Grades 5–9** (Indian Atal Tinkering Lab / ATL) students, covering **Electronics & Robotics** and **Artificial Intelligence & Python**.

## Agent & Design Configuration
- **`AGENTS.md`** — Project structure, build/test commands, and mandatory workflow rules.
- **`DESIGN.md`** — Exact Swiss-editorial scientific visual system (colors, typography, fixed-viewport lab layout, index layout, and prohibitions).
- **`.agents/skills/create-virtual-lab/SKILL.md`** — Reusable step-by-step recipe for generating new Electronics and AI labs.

## Built Website Pages (`dist/`)
Running `node build.mjs` compiles all labs and builds a clean, publish-ready static site with **separate web pages** for each subject:
- `/` (`dist/index.html`) — Clean front page with dedicated Electronics and AI webpage portals
- `/electronics/` (`dist/electronics/index.html`) — Dedicated Electronics & Robotics webpage (`/electronics/<slug>.html`)
- `/artificial-intelligence/` (`dist/artificial-intelligence/index.html`) — Dedicated Artificial Intelligence & Python webpage (`/artificial-intelligence/<slug>.html`)

## Commands
- `npm test` — Run catalog & page-separation unit tests (`node --test lib/catalog.test.mjs`)
- `node build.mjs` (or `npm run build`) — Build static site into `dist/`
- `node server.js` (or `npm start`) — Serve `dist/` on port `3000`
- `npm run dev` — Build `dist/` and start the Express server on port `3000`


## Universal classroom lesson standard (Grades 5–9)

- One clear learning objective per lesson. Start with a familiar question, then show a visual, let students predict, interact, reveal the answer and explain why.
- Default to a 30-minute introductory lesson including 10 minutes for a one-page notebook summary. Keep visible text short, but provide complete on-demand explanations inside the page.
- Use one coherent everyday example throughout where practical. Every new technical word must be clickable, opening a plain-language definition and a concrete example. Include numbered questions, revealable answers, meaningful animations, an experiment with feedback, and a short understanding check.
- Introductory lessons must not require code, advanced theory, external searches or teacher-only notes. Advanced views are optional and only included when relevant to the lesson objective. Distinguish simplified teaching models from real systems.
- Use projector-scale text (typically 20–24px body, 32–56px headings), high contrast, touch and keyboard controls, responsive layouts, reduced-motion support and self-contained illustrations. Allow controlled scrolling on small screens rather than clipping content.
- Notebook summary: essential definitions, one example, a comparison if useful, and the key takeaway. Student-facing copy must not refer to the author or assistant.
- Verify each interaction, vocabulary popup, reset, navigation, answer feedback and projector layout before claiming classroom readiness.
