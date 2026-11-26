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
The approved visual reference is the 45-minute version of `@testing/artificial-intelligence/what-is-ai.html` (commit 455e9c127c84085f4db2ec42e6ad9c44701c7615). Its progressive explanations, clear animated illustrations and simple controls define the teaching experience. For visual identity, the current `index.html` and original green electronics pages are authoritative: use Vibe Discovery (Deep Pine, Ocean Teal, Mint, Lemon and Glacier Sky), not the older white/blue benchmark styling. Do not copy its fruit theme to unrelated topics. Teach using topic-specific diagrams, simulations and examples. Existing homepage/portal identity and routes remain intact.

## Colors
Use the shared Vibe Discovery palette from `index.html`: light green page (#f4faf9), white surface, mint panels, pine text (#063839), teal borders (#c8e5e2), deep pine primary actions (#065758), ocean teal (#00999F) and mint selection (#BCEDD8). Preserve its five-color top strip, Newsreader-style serif headings and IBM Plex Mono-style controls, with local font fallbacks. Use the existing dark green theme and shared `mvc-theme` setting when offering a theme toggle; light green is the default. Red denotes faults; green denotes safe states. Diagram objects may use realistic semantic colors (fruit, wire, resistor bands, robot parts); the UI itself stays restrained. Always pair color cues with labels, line styles, or symbols.

## Typography
Use the current site's Newsreader-style serif stack with local fallbacks and monospace only for metadata, step labels, small control text or actual code. Optional serif italics for editorial emphasis; not a required title pattern. No runtime font download required. Projector headings scale from 32–57px, subheadings 23–32px, teaching text 19–25px (aim 21–24px), example and feedback text 18–22px. Metadata may be 13–15px; never hide essential explanation in tiny technical labels. Body line height around 1.45. Use sentence case and plain English; see PEDAGOGY.md.

## Layout
Use the reference lesson shell as the default for AI, Python, electronics and robotics.
- Viewport: CSS grid with header, scrollable main area and footer; use 100dvh with 100vh fallback. Header and footer remain reachable. At small widths allow wrapping and vertical scrolling, never clip material.
- Header: subject breadcrumb, lesson/day and total duration, jump-to-slide select, Word bank and Full screen.
- Main: subtle 32px architectural grid, 16–48px padding adjusted to viewport. Figure number and duration, large title, step selectors with question IDs and selected state.
- Desktop: two themed hairline panels with roughly 38/62 split and 18px gap. Left is visible explanation, example callout and replay/previous-step/next-explanation controls. Right is large illustration or interactive experiment with caption and feedback. For complex circuit and cutaway labs, use a full-width stage and compact explanation above it. Below is a short Think together prompt and revealable explanation.
- At 1280×720 reduce padding and graphic height before shrinking teaching text. At 1920×1080 use generous breathing room. At roughly 780px or less stack panels in logical reading order; allow scroll. Do not force a sidebar, chart or telemetry card when it reduces clarity.
- Footer: previous slide, current slide and planned cumulative time, next slide. Keep controls accessible. Final notebook slide replaces the two-panel view with a centered copy-friendly page.
- Front page and subject portals retain the existing hairline top bar, two-subject navigation, editorial split hero, flush lab grids and catalog metadata. No source-folder names or developer notices in the published interface.

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
