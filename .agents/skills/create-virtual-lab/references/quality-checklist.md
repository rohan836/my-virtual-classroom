# Acceptance and verification checklist

A lesson is not ready merely because it renders. Use this checklist on every new or revised lesson; record failures and actual checks.

## Teaching
- [ ] One clear objective, audience and duration; slide durations sum correctly; notebook time included.
- [ ] Each required idea has visible plain-language explanation, reason and example, not hidden entirely behind a question.
- [ ] Sequence covers necessary prerequisites, meaning, purpose, working, practical use and misconceptions without unrelated depth.
- [ ] Every essential unfamiliar term links to an accurate definition and example; visual where useful; word bank covers the same terms.
- [ ] Analogy is coherent and not scientifically misleading; limitations explained where needed.
- [ ] All animations illustrate actual concepts; the visual agrees with text and output.
- [ ] Guided experiment includes at least one change and explanatory feedback, a contrast or failure case where relevant, and reset/replay.
- [ ] Questions have stable unique IDs and revealable reasons; correct and incorrect choices are explained.
- [ ] Notes fit about one page / ten minutes at the target grade, include only taught content, and contain no author/assistant references.
- [ ] Claims, units, calculations and algorithms are correct; simulations are identified; unsafe actions are not encouraged.

## Interface
- [ ] Matches DESIGN.md and approved reference shell; not an unrelated app dashboard.
- [ ] Header, slide selection, step selection, previous/next, replay, fullscreen, glossary and notebook work.
- [ ] No offscreen/clipped content or overlap at 1280×720, 1920×1080 and tablet/small viewport; essential controls reachable by normal scrolling.
- [ ] All buttons and interactive parts work on touch and keyboard; visible focus, meaningful labels, correct disabled states.
- [ ] Word dialog opens, closes with Escape/close button, and retains the active step. Reduced motion remains understandable.
- [ ] All experiment states tested including initial, correct, incorrect, reset, replay, switching slides, repeated use and boundary cases.
- [ ] Illustrations and labels are readable at projector distance; no color-only meaning.
- [ ] No console errors, missing assets, unhandled promises or network dependencies for teaching.

## Repository
Run `npm run lint`, `npm test`, `npm run build` for code changes. Inspect the generated subject portal and lesson path, ensure no published duplicate shadows the testing lesson, and test the served page. Verify catalog title/description/formula/figure count and navigation. Inspect screenshots and record viewport and browser. If local server or browser is unavailable, disclose it; do not claim passed tests. Docs-only changes: check referenced paths, frontmatter and cross-file consistency instead.

## Review prompts for future agents
Try a new topic in each subject and inspect whether the skill produces a coherent lecture rather than an app. Examples: resistor, sensor-controlled robot, introductory machine learning, Python loops. Compare explanations, timing, visual grammar, word bank, experiment, notebook and accessibility against the approved reference. This is a manual evaluation recipe, not a claim that automated evals exist.
