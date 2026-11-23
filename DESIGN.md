# DESIGN.md — Swiss-Editorial Scientific Lab Design System

Every page in `my-virtual-classroom` — the front page (`index.html`), the separate subject pages (`/electronics/` and `/artificial-intelligence/`), and every interactive lab — MUST follow this exact visual language, modeled on `field-studies.ai.studio` and our reference labs (`testing/electronics/resistor.html`, `testing/electronics/transistor.html`, and `testing/artificial-intelligence/what-is-ai.html`).

---

## 1. Color Palette (Tokens)

```css
:root {
  /* Surfaces */
  --bg: #ffffff;            /* Pure white primary canvas & page background */
  --surface: #fafafa;       /* Subtle hairline surface for callouts, code headers, hover */

  /* Typography Ink */
  --ink: #111111;           /* Primary near-black ink */
  --ink-soft: #333338;      /* Body copy ink */
  --muted: #666666;         /* Secondary metadata & labels (#6e6e73 / #71717a) */
  --faint: #999999;         /* Breadcrumbs, table keys, keyboard hints (#9a9aa0 / #a1a1aa) */

  /* Hairlines & Grids */
  --border: #e5e5e5;        /* Primary 1px structural dividers & card borders */
  --border-strong: #d4d4d8; /* Interactive button & panel frame borders */
  --grid: #efefef;          /* Subtle 3D floor grid & 2D architectural plot lines (#f0f0f0) */

  /* Signal Accents */
  --red: #e04836;           /* Signal Red: active buttons, primary current/output, positive weights, sliders, active fig tag */
  --red-soft: #fff6f5;      /* Active button / published tag subtle wash */
  --blue: #2563eb;          /* Signal Blue: secondary current, control/base signals, field lines, secondary class, negative weights */
  --blue-soft: #f0f5ff;     /* Active secondary toggle / testing tag subtle wash */
  --green: #16a34a;         /* Optional 3rd comparison trace only (e.g., 3-brain race / safe status) */
  --danger: #dc2626;        /* Clean overload / error state — never neon or gamified */
}
```

---

## 2. Typography

Load Google Fonts with clean offline system fallbacks so labs remain crisp in school classrooms:

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&display=swap" rel="stylesheet" />
```

- **Editorial Two-Line Heading**:
  - Line 1 (Regular/Medium Sans): `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`, `font-weight: 400–500`, tight tracking `-0.025em`, `line-height: 1.08`.
  - Line 2 (*Italic Serif*): `'Newsreader', Georgia, serif`, `font-style: italic`, `font-weight: 400` (e.g., `Slowing the rush` / *`of electric current`*, or `Fixed rules` / *`vs. learning from examples`*).
- **Technical UI, Notes, Formulas, Telemetry, Buttons & Code**:
  - `'IBM Plex Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`.
  - Uppercase micro-headers (`PART INSPECTOR`, `CURRENT & OHM'S LAW`, `PREDICTION ACCURACY`): `9.5px–10.5px`, `letter-spacing: 0.08em`, muted ink.
  - Editorial body & notes table: `11px–11.5px`, `line-height: 1.55–1.62`.
  - Live telemetry primary numeric readout: `22px–28px`, `font-weight: 500–600`, `letter-spacing: -0.02em`.

---

## 3. Fixed Viewport Layout — Interactive Labs (`100vw × 100vh`)

Interactive labs fill the exact viewport (`width: 100vw; height: 100vh; overflow: hidden;`) with **no messy page scrolling**. All panels float cleanly over the full-bleed white stage:

1. **Top Hairline Bar (`40px–44px`, `border-bottom: 1px solid #e5e5e5`)**:
   - Left cells separated by `1px solid #e5e5e5`: subject breadcrumb link (`../../` back to index), active figure badge in Signal Red (`fig. 01`), short lowercase subtitle, and key formula/rule in monospace.
   - Right controls: `← fig. prev` / figure tabs (`fig. 01`, `fig. 02`, ...) / `fig. next →`.
2. **Left Editorial Column (`width: 300px–340px`, transparent over white)**:
   - Breadcrumb metadata (`[ fig. 01 ] component name`)
   - Two-line title (regular sans + *italic serif*)
   - 2–3 line beginner-friendly intro paragraph
   - Hairline divider + structured key-value notes (`law`/`concept`, `try`, `notice`, `in life`, `found by`)
   - Live **Part Inspector** box anchored at bottom (`margin-top: auto`), updating whenever the student clicks any 3D part, wire, pin, layer, neuron, pixel, or rule.
3. **Center Interactive Stage (Full-bleed white canvas)**:
   - Subtle perspective floor grid (`#ebedf0` / `#d8dce3`) for 3D Three.js electronics or architectural `32px` grid (`#f2f2f5`) for 2D/3D-projected AI.
   - Smooth drag-to-orbit and scroll-to-zoom where 3D applies.
   - Animated current/electron dots or data-flow pulses (Signal Red & Signal Blue).
   - Every part is hoverable and clickable with subtle highlight feedback.
4. **Top-Right Telemetry Card (`width: 220px–250px`, `1px solid #d4d4d8`, white bg)**:
   - Monospace uppercase header + red `LIVE` tag
   - Large live numeric readout (`22px–28px` monospace)
   - Live animated oscilloscope / trend `<canvas>` with red & blue traces
   - 3–5 compact monospace key-value live metrics underneath
5. **Bottom Control Bar**:
   - Left: Tiny color legend (`— red meaning · — blue meaning`), sharp rectangular `1px`-bordered monospace buttons (`power: on` with red border when active, view/mode toggles, `reset`), and minimal red-thumb sliders.
   - Right: Subtle monospace interaction hints (`click parts — inspect`, `drag empty space — orbit`, `← → move between studies`).

---

## 4. Front Page & Dedicated Subject Pages Layout

Modeled directly on `field-studies.ai.studio`:
- **Top Hairline Bar (`44px`)**: Vertical hairline cells linking `/` (front page), `/electronics/` (Electronics page), `/artificial-intelligence/` (AI page), plus total lab count.
- **2-Column Split Hero**: Left column (`~66%`) with subtle architectural grid, two-line display title, concise monospace intro, and direct navigation links to the separate Electronics and AI pages. Right column (`~34%`) with stacked hairline-divided spec cells (`/subject pages`, `/keys & controls`, `/reading the labs`).
- **Strict Separation & Zero Folder Clutter**:
  - The published front page (`/`) displays two separate subject portals linking to `/electronics/` and `/artificial-intelligence/`, without internal folder names (`published/`, `testing/`), stage badges, or developer notices.
  - `/electronics/` holds only Electronics & Robotics labs; `/artificial-intelligence/` holds only AI & Python labs.
- **Flush Hairline Grids**: Zero rounded bubble cards, zero drop shadows, `1px solid #e5e5e5` dividers, `[01] /slug` + `fig. 01` header, medium title, 2–3 line description, and bottom monospace formula line.

---

## 5. Design Prohibitions

- **NO dark mode** or dark backgrounds anywhere.
- **NO glowing neon sci-fi effects**, cyberpunk gradients, or particle fireworks.
- **NO heavy drop shadows** (only an ultra-light hairline shadow on temporary popovers/code drawers).
- **NO rounded bubble cards**, pill badges, or cartoonish clutter.
- **NO walls of text** — keep every note calm, museum-grade, and projector-friendly.
