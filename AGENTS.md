# AGENTS.md — `my-virtual-classroom`

## Project Overview
- **Repository**: `my-virtual-classroom`
- **Purpose**: Interactive 3D and 2D visual teaching labs for **Grades 5–9 students** (Indian Atal Tinkering Lab / ATL curriculum) across two strictly separated subjects:
  1. **Electronics & Robotics** (`electronics`)
  2. **Artificial Intelligence & Python** (`artificial-intelligence`)
- **Design Identity**: Pure white, minimalist **Swiss-editorial scientific lab** aesthetic modeled on `field-studies.ai.studio`.

## Repository & Built Website Architecture
Keep **Electronics** and **Artificial Intelligence** strictly separated:

- **Source Folders (for organizing lab `.html` files)**:
  - `testing/electronics/` & `published/electronics/` — Electronics lab source files (compiled cleanly into `dist/electronics/`)
  - `testing/artificial-intelligence/` & `published/artificial-intelligence/` — AI lab source files (compiled cleanly into `dist/artificial-intelligence/`)
- **Published Website (`dist/` — zero folder clutter shown to students)**:
  - `index.html` → `dist/index.html` — Clean front page linking to the two separate subject pages (`/electronics/` and `/artificial-intelligence/`), with no internal folder labels or developer notices
  - `/electronics/` (`dist/electronics/index.html`) — Dedicated Electronics-only webpage + labs (`/electronics/<slug>.html`)
  - `/artificial-intelligence/` (`dist/artificial-intelligence/index.html`) — Dedicated Artificial Intelligence-only webpage + labs (`/artificial-intelligence/<slug>.html`)
- `lib/catalog.mjs` — Pure discovery, metadata extraction, and HTML page renderer for the front page and the two standalone subject pages
- `build.mjs` — Static site generator that builds `dist/`
- `server.js` — Express static server serving `dist/` on port `3000` (`0.0.0.0`)

## Lab Authoring Rules
- Put newly generated labs inside `testing/electronics/<slug>.html` or `testing/artificial-intelligence/<slug>.html` (or `published/<subject>/<slug>.html`). `build.mjs` automatically publishes every subject lab cleanly into `/electronics/<slug>.html` or `/artificial-intelligence/<slug>.html`.
- Use lowercase, hyphen-separated slugs (e.g., `capacitor.html`, `decision-trees.html`).
- Keep every lab as a **self-contained single HTML file** (HTML + CSS + JS; Three.js CDN allowed for 3D electronics; Google Fonts with system fallbacks) so it works offline or on Vercel/Express with zero broken assets.
- Do not modify `server.js` or `vercel.json` unless explicitly requested.

## Commands
- **Build (`dist/`)**: `node build.mjs` (or `npm run build`)
- **Serve (`http://localhost:3000`)**: `node server.js` (or `npm start`)
- **Build & Serve**: `npm run dev`
- **Lint / Syntax Check**: `npm run lint`
- **Unit Tests**: `npm test` (`node --test lib/catalog.test.mjs`)

## Mandatory References
1. **Visual & UI System**: ALWAYS read `DESIGN.md` at the project root before building or editing any lab or classroom page.
2. **Lesson Generation Workflow**: ALWAYS read and follow `.agents/skills/create-virtual-lab/SKILL.md` whenever asked to create a new Electronics component or AI/Python concept lab.

## Verification Checklist
1. Run `npm test` (`node --test lib/catalog.test.mjs`) and confirm all tests pass.
2. Run `node build.mjs` and verify the generated pages in `dist/` (`index.html`, `electronics/index.html`, `artificial-intelligence/index.html`, and the lab files).
3. Verify on `http://localhost:3000` that there are zero console errors, zero overlapping UI panels, and working navigation across `/`, `/electronics/`, `/artificial-intelligence/`, and each lab.
