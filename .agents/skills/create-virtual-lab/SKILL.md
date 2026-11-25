---
name: "create-virtual-lab"
description: >-
  Reusable step-by-step recipe for generating self-contained Swiss-editorial
  interactive Electronics & Robotics or AI & Python virtual labs for Grades 5–9
  Indian ATL students in my-virtual-classroom.
---

# Skill: Create a Virtual Classroom Lab

Follow this exact recipe whenever the user asks to create a new Electronics component lab or AI / Python concept lab for `my-virtual-classroom`.

Before writing any code, **always read `DESIGN.md`** at the project root so the page matches the pure-white Swiss-editorial scientific visual system.

---

## Step 1: Audience Calibration (Grades 5–9 Indian ATL)

- **Plain everyday English**: Introduce every technical term in everyday language (never leave jargon unexplained).
- **Relatable Indian everyday examples** in the `in life` note:
  - Ceiling fan regulator, home inverter & stabilizer, automatic streetlights, mobile phone chargers, UPI fraud detection, phone Face Unlock, YouTube recommendations, metro automatic gates, smart school dustbins, Google Lens reading Hindi/English notebooks.
- **Classroom projector friendly**: High contrast on `#ffffff`, legible at `1280×720` and `1920×1080`, responsive on laptops/tablets.

---

## Step 2: File Placement & Self-Contained Structure

- Save newly created labs into the **testing** folder of the matching subject (unless explicitly asked to put them in `published/`):
  - Electronics: `testing/electronics/<slug>.html`
  - Artificial Intelligence: `testing/artificial-intelligence/<slug>.html`
- Use lowercase, hyphen-separated slugs (e.g., `capacitor.html`, `decision-trees.html`).
- Keep the entire lab in a **single self-contained HTML file** (HTML + CSS + JS; Three.js CDN allowed for 3D electronics; Google Fonts with clean system fallbacks).
- Include these metadata elements so `build.mjs` extracts accurate card details:
  - `<title>/electronics studies — ...</title>` or `<title>/ai studies — ...</title>`
  - `<meta name="description" content="Concise 1–2 sentence summary." />`
  - `<meta name="lab-formula" content="Key formula or rule shown on card footer" />`
- Wire the top-left breadcrumb (`/electronics studies` or `/ai studies`) as a link back to the classroom index (`./` for the subject page or `../../` for the front page) and bind the `/` key (when not typing in an input) to return to `../../`.

---

## Step 3A: Electronics & Robotics Recipe

1. **Interactive 3D Model on White Orbital Grid**:
   - Build a crisp Three.js (`r128`+) 3D model on a `#ffffff` scene with studio lighting and subtle perspective floor grid (`#ebedf0` / `#d8dce3`).
   - Support damped drag-to-orbit (`cursor: grab` / `grabbing`) and scroll-to-zoom.
   - Add crisp technical edge outlines (`THREE.EdgesGeometry`).
2. **Mandatory Cutaway / X-Ray Inspection**:
   - Include a `view: outer / cutaway / x-ray` (or `outer / cutaway`) toggle so students can inspect internal physics/structure (e.g., capacitor plates & dielectric, PN junction, copper coil & magnet, ultrasonic transducer, potentiometer track).
3. **Power Switch, Live Flow & Clickable Parts**:
   - Include an interactive `power: on / off` switch (plus clickable 3D switches/controls where relevant).
   - Animate real-time current/electron particles in Signal Red (`#e04836`) and Signal Blue (`#2563eb`).
   - Make every pin, wire, and internal layer clickable to update the **Part Inspector** — explaining *what it does* and *what happens if connected backwards or overloaded*.
4. **At Least 2–3 Switchable Modes / Figures**:
   - Mode 1: 3D Component Anatomy & Inside Cutaway (and component types/variants if applicable).
   - Mode 2: Interactive Working Circuit (including safe vs. overload/fault demonstration).
   - Mode 3: Real-World ATL Project Circuit (e.g., sensor trigger, smoothing filter, timer, regulator).
5. **Top-Right Telemetry Card**:
   - Live physical calculations (`V = I × R`, `Q = C × V`, `P = V × I`, frequency/duty cycle, etc.) + animated oscilloscope `<canvas>` with red & blue traces.

---

## Step 3B: AI & Python Recipe

1. **Show What Happens Inside the Computer (Never Sci-Fi Robots)**:
   - Visualize numbers, `0`s & `1`s, pixel grids, Python dictionaries/tables, geometric decision boundaries, trees, or weighted connections.
2. **Optional X-Ray & Python Code Toggles (when relevant to the learning objective)**:
   - **X-Ray / Computer View Toggle**: overlays raw numbers, `0`s & `1`s, or live weights directly on the visual stage.
   - **Show Python Code Toggle**: opens a clean hairline drawer showing **15–25 lines of clean beginner Python** synced with the active mode/branch.
3. **Interactive Experimentation**:
   - Students can click to add/draw data points, test tricky edge cases/mistakes, click `train / learn` to watch live learning, test noise/messiness, and compare approaches side-by-side on the Top-Right Telemetry graph.
4. **Progressive Figures (count follows lesson needs) (`fig. 01`, `fig. 02`, `fig. 03`)**:
   - `fig. 01`: Simple visual intuition.
   - `fig. 02`: Interactive classroom project / comparator.
   - `fig. 03`: Deeper "under the hood" view (how numbers and weights combine).
5. **Contextual Feedback & Part Inspector (telemetry only when meaningful)**:
   - Live Accuracy / Confidence / Loss readout + multi-trace `<canvas>` graph + 3–5 live metrics.
   - Clicking any data point, boundary, neuron, pixel, or wire updates the Part Inspector including `INSIDE COMPUTER MEMORY:`.

---

## Step 4: Quality & Verification Checklist

1. Verify `DESIGN.md` compliance (pure white `#ffffff`, `1px` hairlines, red/blue accents, zero dark mode, zero neon/heavy drop shadows).
2. Verify every button, switch, slider, and clickable 3D/2D element updates both the canvas stage and the Top-Right Telemetry Card in real time.
3. Verify keyboard shortcuts: `←` / `→` switch figures, `Space` toggles run/pause or power ON/OFF (outside inputs), `/` returns to `../../`.
4. Run `npm test` and `node build.mjs`, then inspect the built lab on `http://localhost:3000` with zero console errors and zero overlapping panels.


## Universal classroom lesson standard (Grades 5–9)

- One clear learning objective per lesson. Start with a familiar question, then show a visual, let students predict, interact, reveal the answer and explain why.
- Default to a 30-minute introductory lesson including 10 minutes for a one-page notebook summary. Keep visible text short, but provide complete on-demand explanations inside the page.
- Use one coherent everyday example throughout where practical. Every new technical word must be clickable, opening a plain-language definition and a concrete example. Include numbered questions, revealable answers, meaningful animations, an experiment with feedback, and a short understanding check.
- Introductory lessons must not require code, advanced theory, external searches or teacher-only notes. Advanced views are optional and only included when relevant to the lesson objective. Distinguish simplified teaching models from real systems.
- Use projector-scale text (typically 20–24px body, 32–56px headings), high contrast, touch and keyboard controls, responsive layouts, reduced-motion support and self-contained illustrations. Allow controlled scrolling on small screens rather than clipping content.
- Notebook summary: essential definitions, one example, a comparison if useful, and the key takeaway. Student-facing copy must not refer to the author or assistant.
- Verify each interaction, vocabulary popup, reset, navigation, answer feedback and projector layout before claiming classroom readiness.
