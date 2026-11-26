# Electronics component realism and interactive simulation

Use this reference whenever an electronics or robotics lesson includes a physical component, a cutaway, a circuit, or animated measurements. Pair it with the classroom lesson blueprint, DESIGN.md and PEDAGOGY.md. Do not replace the approved lesson style with a dashboard.

## Workflow: reference → model → teaching → verification

1. Identify the real package used in the classroom and its typical dimensions, terminals, polarity and material. Consult a manufacturer datasheet or construction guide; compare at least two actual photographs where possible. Record the source URLs and what each confirms. Use original programmatic artwork or appropriately licensed assets, not copied product photos in the deployed page.
2. Draw the object at a recognizable scale. Model real geometry, not arbitrary primitives: AA cell with cylindrical metal shell and raised positive terminal, LED with domed epoxy lens, flange and separate leads, axial resistor with tapered body, separated tolerance ring and metal leads, switch with moving actuator and contacts. Distinguish illustration enlargement from actual dimensions. A reference photo is not a license to reproduce it.
3. Build the simplest visual that explains the mechanism. Prefer inline SVG and CSS. For rotation, use genuine geometry or a lightweight projected 3D mesh; label any artistic cutaway, X-ray or exploded view as illustrative. A transparent view must expose relevant internal geometry; a carbon-film helical cut is not a wire coil. Provide mouse/touch rotation, keyboard buttons and reset view. Ensure clickable labels or parts have accessible explanations and never depend on hover.
4. Write one beginner-facing concept per explanation beat. Explain symbols and units before asking students to use them. Every technical term, including V, A, mA, Ω, kΩ, R, I, W, polarity and tolerance, needs a click target, definition and example. Use consistent, explicit measurement units and a visible word bank.
5. Build a single state model for all views, values, labels and animation. Compute actual numbers from documented equations; do not invent a measurement. For LED current use max(0, (V_supply − Vf)/R) only as a simplified forward model, not V_supply/R. In a closed series circuit the same current passes every component. Distinguish charge flow from electron speed, and conventional current from metal-wire electron drift. If the switch is open, reverse direction blocks forward current in the model, or a simulated open LED fails, current is zero. Damage stays latched until replacement. Show overload risk, not a guaranteed failure point. Respect resistor power P = I²R and actual datasheet ratings; never encourage unsafe real experiments.
6. Use a purposeful animation vocabulary: controlled switch motion, labeled current flow markers, light brightness linked to modeled current, reversible inspection, replay and a pause control. Avoid decorative motion and high-power perpetual rendering. In reduced-motion mode show all states and values with static cues. For weak school laptops prefer event-driven scene updates and a small polygon count. Maintain a fully functional offline version, including fonts and graphics.
7. Provide concrete experiments: predict → change one input → observe → explain. Include a safe baseline, a contrasting condition, an incorrect/overload condition in simulation only, and reset. Show real-life applications and safety. For resistor codes implement digit, multiplier and tolerance separately, 4- and 5-band options, gold/silver fractional multipliers, tolerance bounds, and explicit orientation. If decoder values feed the circuit, the displayed bands must match exactly.
8. If useful, provide a manually playable short captioned browser animation for introduction or recap. Keep it distinct from a rendered/narrated MP4; for a requested film export follow VIDEO-EXPLAINER.md and the existing video-explainer skill.

## QA gate

- Run repository lint, test, build; check the generated subject portal, lesson URL and previous anchors.
- Run a real browser at 1280×720, 1920×1080, tablet and narrow mobile. Inspect screenshots of the first scene, full lab, cutaway, code decoder and notebook; check readable labels, no clipping or horizontal overflow.
- Test every teaching slide/step, keyboard, glossary Escape/close, each control, reset, replay, reduced motion and repeated input changes. Test 6 V / 220 Ω / 2 V LED ≈18.18 mA, 1 kΩ ≈4 mA, 10 Ω overload (ideal 400 mA, not real), open/reversed/damaged states = 0. Test 4-band red-red-brown-gold = 220 Ω ±5%, 5-band red-red-black-black-brown = 220 Ω ±1%, and multiplier boundaries.
- Check that the drawn circuit follows the same topology as the schematic. Ensure the positive supply terminal, LED anode/cathode and physical switch are identifiable. Check actual component clicks and rotation on both mouse and keyboard.
- Report real results and remaining simplifications; never imply photorealism or SPICE-level modeling unless achieved. Do not promote a broken build.

## Reference sources and design methods

- TE Connectivity, Through-Hole Resistors FAQ: https://www.te.com/en/faqs/through-hole-resistor-faqs.html — film, ceramic core, trimming helix and markings.
- SparkFun Learn, Resistors: https://learn.sparkfun.com/tutorials/resistors/all — resistor functions, ratings, bands and LED applications.
- SparkFun Learn, Voltage, Current, Resistance, and Ohm's Law: https://learn.sparkfun.com/tutorials/voltage-current-resistance-and-ohms-law/all — beginner analogy and current limiting.
- PhET Circuit Construction Kit: https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc — switchable lifelike/schematic views and interactive measurements.
- Anthropic frontend-design: https://github.com/anthropics/skills/tree/main/skills/frontend-design — deliberate visual direction and meaningful motion; adapt to the existing classroom style.
- OpenAI Playwright interactive: https://github.com/openai/skills/tree/main/skills/.curated/playwright-interactive — real browser checks, screenshot inspection and iterative fixes.

These sources inform original implementation. They are not copied third-party skill files, and the reference is not a claim to reproduce commercial CAD/photorealistic assets.
