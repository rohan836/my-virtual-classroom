---
version: alpha
name: My Virtual Classroom
description: Vibe Discovery green editorial scientific classroom lessons with projector-scale explanations and meaningful interactive motion.
colors:
  primary: "#065758"
  secondary: "#00999F"
  background: "#f4faf9"
  surface: "#ffffff"
  ink: "#063839"
  muted: "#4b797b"
  border: "#c8e5e2"
  mint-soft: "#e7f4f2"
  mint: "#BCEDD8"
  lemon: "#FEEE30"
  sky: "#81D2E3"
  success: "#13733b"
  error: "#b33225"
typography:
  heading:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: 48px
    fontWeight: 550
    lineHeight: 1.06
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: 22px
    lineHeight: 1.45
  metadata:
    fontFamily: "ui-monospace, monospace"
    fontSize: 13px
spacing:
  panel: 20px
  gap: 18px
  grid: 32px
rounded:
  panel: 8px
  button: 5px
motion:
  reveal:
    duration: 420ms
    timingFunction: ease-out
  transition:
    duration: 250ms
    timingFunction: ease
---
# DESIGN.md — Universal classroom visual system

## Overview
For **pedagogy and explanation depth**, use the 45-minute version of `@testing/artificial-intelligence/what-is-ai.html` (commit 455e9c127c84085f4db2ec42e6ad9c44701c7615) as the teaching reference (progressive explanations, clear analogies, clickable vocabulary, interactive experiments, concept checks, and notebook summary). For **visual identity, layout, and UI**, the current `index.html` and `testing/electronics/resistor.html` are authoritative: use the **Vibe Discovery green scientific-journal theme** (Deep Pine, Ocean Teal, Mint, Lemon, Glacier Sky; sticky blurred masthead with 5-color strip; hero frontmatter; sticky left TOC + Live Telemetry; scrollable editorial sections with embedded interactive widgets; and Light/Dark toggle) — never revert to the older white/blue `100dvh` slide-deck layout. Do not copy unrelated subject examples. Existing homepage/portal identity and routes remain intact.

## Colors
Use the shared Vibe Discovery palette from `index.html`: light green page (#f4faf9), white surface, mint panels, pine text (#063839), teal borders (#c8e5e2), deep pine primary actions (#065758), ocean teal (#00999F) and mint selection (#BCEDD8). Preserve its five-color top strip, Newsreader-style serif headings and IBM Plex Mono-style controls, with local font fallbacks. Use the existing dark green theme and shared `mvc-theme` setting when offering a theme toggle; light green is the default. Red denotes faults; green denotes safe states. Diagram objects may use realistic semantic colors (fruit, wire, resistor bands, robot parts); the UI itself stays restrained. Always pair color cues with labels, line styles, or symbols.

## Typography
Use the current site's Newsreader-style serif stack with local fallbacks and monospace only for metadata, step labels, small control text or actual code. Optional serif italics for editorial emphasis; not a required title pattern. No runtime font download required. Projector headings scale from 32–57px, subheadings 23–32px, teaching text 19–25px (aim 21–24px), example and feedback text 18–22px. Metadata may be 13–15px; never hide essential explanation in tiny technical labels. Body line height around 1.45. Use sentence case and plain English; see PEDAGOGY.md.

## Layout
Use the **Vibe Discovery scientific-journal layout** (`index.html` and `testing/electronics/resistor.html`) as the default for AI, Python, electronics and robotics:
- **Masthead:** Sticky blurred header (`62px`) with the 3px 5-color top strip, brand & subject breadcrumb, formula badge, `Word bank` button, primary jump CTA, and `◐ Dark` / `☀ Light` theme toggle (`mvc-theme`).
- **Hero frontmatter:** Soft mint-tinted gradient (`--hero-grad`) with eyebrow, serif title, `Summary` card (`.abstract-box` with lemon badge), `Key Equation` / highlight card (`.subthreshold-hero-box`), and CTA buttons.
- **Workspace grid:** Desktop (`>1024px`) uses a sticky left `.toc-sidebar` (section links + `.toc-summary-card` Live Telemetry) beside a scrollable `.article-main` column; stacks cleanly on `<=1024px` without clipping.
- **Editorial sections & widgets:** Progressive numbered sections with readable prose (`~760px` max width), clickable dotted-underlined Word Explorer terms, `.example-callout` boxes, `<details class="think-box">` revealable explanations, and full-width `.widget-card` interactive stages (3D/SVG/Canvas simulations, oscilloscopes, decoders), followed by Concept Check and Notebook Summary.
- **Footer:** Subtle tinted `.paper-footer` linking back to the subject portal and homepage.

## Elevation & Depth
Light themed panels, 1px mint borders, modest radius and subtle shadows. Dialogs may use a neutral translucent backdrop. Meaningful 3D diagrams are welcome when they teach physical structure better; they are not a universal requirement.

## Shapes
Square panels and controls, minimal radius only for specific illustrated objects. No decorative bubble cards, gradients, neon effects or unrelated gamification.

## Motion & Micro-interaction
Animate the mechanism: show a signal traveling, a value changing, a circuit responding, a comparison being made, a program executing, or an actuator moving. Use staged before/during/after states and captions explaining what changed. Enter transitions around 250–650ms; longer instructional motion when useful. Replay reruns the current animation without losing experiment state. Continuous movement must support pause where needed; reduced-motion mode must preserve every explanatory state. No automatic slide advance; classroom pace is controlled by the presenter. Avoid flashes, decorative particles and perpetual distractions. Use meaningful interaction feedback and disabled states.

## Voice & Content Strategy
The visible explanation is primary, not hidden behind a quiz. Each teaching step includes one short answer, concrete example, corresponding visual and optional revealable reasoning. Use progressive steps for detailed content instead of walls of text. Vocabulary popups, discussion answers, experiments and notes must be self-contained and student-facing. PEDAGOGY.md owns the complete content requirements.

## Components
- Primary control: deep pine background and white text; secondary control: themed surface with teal border. Clear focus ring, touch-friendly targets, disabled feedback.
- Step navigation: numbered question IDs, selected state, back/next and replay; use arrow keys for slides and Space for next explanation when focus is outside interactive inputs. Use native keyboard behavior when a control has focus.
- Word explorer: teal dotted-underlined terms; accessible dialog with word, short meaning, concrete example and illustrated scene/part. All words opens the global word bank. Close/Escape restores prior lesson context.
- Visual stage: scalable SVG, Canvas or a labelled 3D model. Meaningful clickable parts should update explanatory feedback. Label axes, units and visual states. Never present fabricated readings.
- Example callout: pale mint with a teal left border; feedback: clear text and color with correct/incorrect reason.
- Experiment: clear starting state, controls, result and reset/replay. Show current state and genuine calculations or logic, with assumptions. Add telemetry, x-ray/cutaway, code panels or sliders only when the concept warrants them.
- Notebook: themed centered panel with short numbered definitions, optional comparison table or labelled sketch, one example and takeaway. Large enough to copy from a projector.

## Do's and Don'ts
- Do reproduce the approved interaction pattern and overall appearance; adapt visual subject matter, step count and experiment.
- Do use inline graphics and system fonts. Do not depend on external assets for teaching.
- Do test projector and mobile sizes, focus, keyboard, touch, reduced motion, all controls and actual experiment logic.
- Do not use unrelated color themes, dense technical dashboards, mandatory charts, unrelated 3D, long text walls, decorative-only animation, or question-only pages.
- Do not change the homepage, subject catalogs or existing lessons merely to enforce the new design without a specific request.
- Follow the skill and PEDAGOGY.md for content and verification. The YAML tokens are a structured local design reference inspired by the DESIGN.md format; formal third-party lint validation is not assumed.

## Animated film edition
For short motion-graphics films, use VIDEO-EXPLAINER.md and the video-explainer skill. The local classroom-style.json is a separate film rendering preset; the website itself follows Vibe Discovery. Film composition is continuous and full-frame (one hero visual, short labels, caption-safe region), not the interactive two-panel lesson shell. Keep readable captions, meaningful scene/word-timed motion and projector-safe contrast. The full classroom page still follows the lesson shell; both formats are complementary.

## 3D interaction direction
Drag should feel like grabbing and rotating the model, not moving it in the opposite direction. Validate both horizontal and vertical directions with a visible asymmetric landmark, and make rotation buttons consistent with the drag convention. Include zoom controls, reset and an accessible click alternative. Do not shrink a complex model into a narrow panel.
