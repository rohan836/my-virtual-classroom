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
