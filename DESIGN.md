---
version: field-studies-2.0
name: My Virtual Classroom
description: White Swiss-editorial field-studies design system inspired by field-studies.ai.studio (IBM Plex Sans + IBM Plex Mono, #0a0a0a ink, #e5533d coral accent, #2b56d6 cobalt, #tiny-dot-cursor) with unified interactive lessons and separate 19-study portals for Electronics & AI.
colors:
  accent: "#e5533d"
  selection: "#F84431"
  cobalt: "#2b56d6"
  background: "#ffffff"
  surface: "#fbfbf9"
  ink: "#0a0a0a"
  muted: "rgba(10, 10, 10, 0.58)"
  border: "rgba(10, 10, 10, 0.14)"
  accent-soft: "rgba(229, 83, 61, 0.08)"
  cobalt-soft: "rgba(43, 86, 214, 0.06)"
  success: "#13733b"
  error: "#b33225"
typography:
  heading:
    fontFamily: '"IBM Plex Sans", system-ui, sans-serif'
    fontSize: 48px
    fontWeight: 300
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  body:
    fontFamily: '"IBM Plex Sans", system-ui, sans-serif'
    fontSize: 21px
    lineHeight: 1.5
  metadata:
    fontFamily: '"IBM Plex Mono", ui-monospace, monospace'
    fontSize: 11.5px
spacing:
  headerHeight: 41px
  panel: 20px
  gap: 18px
  grid: 32px
rounded:
  panel: 0px
  button: 2px
motion:
  reveal:
    duration: 420ms
    timingFunction: ease-out
  transition:
    duration: 250ms
    timingFunction: ease
---
# DESIGN.md — Universal classroom visual system (`field-studies.ai.studio` edition)

## Overview
All portals and labs share the crisp white Swiss-editorial `field-studies.ai.studio` aesthetic:
- **Catalog & Separate Subject Websites:** Both Electronics & Robotics (`/electronics/`) and Artificial Intelligence (`/artificial-intelligence/`) are presented as separate websites sharing the exact same hairline visual architecture (`41px` sticky top bar, `2fr / 1fr` editorial hero, flush 3-column index grid numbered `1..19` with `fig. 01`..`fig. 19`). Never collapse both subjects into one mixed list or apply older green/dark UI chrome.
- **Unified AI Lesson + Explainer Reference:** `testing/artificial-intelligence/what-is-ai.html` is the single unified `[1] /what-is-ai` entry combining the progressive 10-chapter lesson, 5 named stories & 5 Think Together questions per chapter, interactive fruit recognizer experiment, Word Explorer (`#gloss`), and the built-in narrated film explainer modal (`#filmDialog` opened via `▶ Explainer film`). Do not create duplicate `-video-explainer` sibling pages that split the same topic.
- **Interactive 3D Electronics Reference:** `testing/electronics/resistor.html` and `testing/electronics/transistor.html` use a zero-scroll split studio (`340px` left explanation column + full-height right 3D Canvas simulator with top-right telemetry card, bottom-left part inspector, and bottom action dock) styled with the exact `field-studies` tokens.

## Colors & Cursor
- Pure `#ffffff` background, `#0a0a0a` crisp black ink, subtle hairline borders (`rgba(10, 10, 10, 0.14)`), and delicate graph grid lines (`rgba(10, 10, 10, 0.035)`).
- `#e5533d` coral red is the primary interactive accent (active tabs, primary buttons, coral active borders, text highlight terms, `::selection` `#F84431` with `#fff` text).
- `#2b56d6` cobalt blue highlights technical measurements, current/signal cues, and formula readouts.
- Diagram internals may use realistic semantic colors (resistor bands, silicon layers, mango/apple pigments, LEDs); all surrounding UI chrome stays Swiss-editorial white with hairline rules.
- **Custom Cursor (`#tiny-dot-cursor`):** On fine-pointer desktop devices, hide the default cursor and render the 5px `#0a0a0a` dot cursor (`#tiny-dot-cursor`) that expands to 7px `#e5533d` with a subtle coral ring over links, buttons, inputs, selects, `<summary>`, and `<canvas>`. When a native modal (`<dialog open>`) is open in the browser top layer, restore native `cursor: auto` / `pointer` inside dialogs so buttons remain unmistakably clickable.

## Typography
Use **IBM Plex Sans** (light `300` for display headings, `400`/`500` for body copy) and **IBM Plex Mono** for top navigation (`11.5px`), index numbers (`fig. 01`), metadata, step buttons, controls, and formulas—always including `system-ui, sans-serif` and `ui-monospace, monospace` fallbacks for offline resilience. Favicon uses `<link rel="icon" href="data:image/svg+xml,...🍎...">` to match the `field-studies` identity.

## Layout & Modes
1. **Conceptual / AI Lesson Shell (`what-is-ai.html`):** Viewport grid (`header`, scrollable `main`, `footer`), `41px` sticky header with subject link (`/ ai studies`), metadata, jump-to-slide `<select>`, `▶ Explainer film` button (when a film companion is included), `Word bank`, and `Full screen`; two-panel progressive stage (`~38/62` split) followed by the chapter's 5 real-world stories and 5 revealable Think Together questions, and finishing with a clean one-page Notebook summary.
2. **Hardware / 3D Circuit Lab Shell (`resistor.html`, `transistor.html`):** Full-viewport workspace (`100dvh`, `overflow: hidden` on desktop) with a `41px` top nav bar, left scrollable editorial explanation sidebar (`340px`) covering law/try/notice/life/history + lab notes, and right-side interactive 3D simulator (`three.js` / fallback Canvas) with floating hairline HUD cards and real-time bottom controls so students never have to scroll away from the live circuit.

## Elevation, Shapes & Motion
- Flat `#ffffff` surfaces, `1px solid rgba(10, 10, 10, 0.14)` hairline borders, sharp corners (`0px` on panels, `2px` max on mono buttons), zero heavy shadows, neon glows, or green scientific-journal sidebars.
- Animate the mechanism directly: carrier flow particles, color-band changes, seekable SVG layers, or narrated canvas scenes. Respect `prefers-reduced-motion` while keeping every explanatory state legible.

## Do's and Don'ts
- **Do** keep Electronics and Artificial Intelligence visually identical in Swiss-editorial craft while separating their subject websites (`/electronics/` and `/artificial-intelligence/`), each presenting a 19-study catalog (`[1]`–`[19]`).
- **Do** integrate short video explainers cleanly inside the main lesson page (`#filmDialog` + `▶ Explainer film` button) rather than spawning duplicate lesson cards.
- **Do not** revert to the old `#102a24` green theme, heavy dark backgrounds, `rgba` green cards, or unstyled plain-blue default buttons.
