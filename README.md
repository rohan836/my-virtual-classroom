# My Virtual Classroom

Self-contained animated visual lessons for Grades 5–9 Indian Atal Tinkering Lab (ATL) students: Electronics & Robotics and Artificial Intelligence & Python.

Every new concept is a guided, projector-ready lesson with progressive explanations, illustrations, clickable vocabulary, experiments, reasoned answers and notebook notes. Default duration is 45 minutes including 10 minutes of note-taking; adapt to the requested topic and time. The approved reference is [What Is AI?](testing/artificial-intelligence/what-is-ai.html) (approved revision 455e9c127c84085f4db2ec42e6ad9c44701c7615). It is a design and teaching benchmark, not a content template to repeat verbatim.

## Documentation
- [AGENTS.md](AGENTS.md) — repository-wide agent rules, architecture and verification.
- [PEDAGOGY.md](PEDAGOGY.md) — teaching method, terminology, content and timing across subjects.
- [DESIGN.md](DESIGN.md) — visual identity, interface and meaningful motion.
- [create-virtual-lab/SKILL.md](.agents/skills/create-virtual-lab/SKILL.md) — reusable agent workflow, with [lesson blueprint](.agents/skills/create-virtual-lab/references/lesson-blueprint.md) and [quality checklist](.agents/skills/create-virtual-lab/references/quality-checklist.md).
- [Copilot instructions](.github/copilot-instructions.md) — pointer to the same standards for supported GitHub Copilot clients.

Agents with repository instruction and skill support can discover these files automatically; other agents should be explicitly told to read AGENTS.md and follow the skill. No instruction file alone guarantees that a particular agent will follow every rule.

## Website architecture
- `testing/electronics/`, `published/electronics/`: Electronics & Robotics sources.
- `testing/artificial-intelligence/`, `published/artificial-intelligence/`: AI & Python sources.
- `dist/`: generated website. Front page at /, subject portals at /electronics/ and /artificial-intelligence/, labs under their respective subject path. Published sources take precedence over duplicate testing slugs.
- `lib/catalog.mjs` discovers and renders the catalog; `build.mjs` builds the site; `server.js` serves it. Do not edit generated dist manually.

## Commands
- `npm run lint`: syntax checks.
- `npm test`: catalog and subject separation tests.
- `npm run build` (or `node build.mjs`): build static site.
- `npm start` (or `node server.js`): serve dist on port 3000.
- `npm run dev`: build and serve.

## Standards behind the agent documentation
- [Agent Skills specification](https://agentskills.io/specification)
- [OpenAI AGENTS.md guidance](https://developers.openai.com/codex/guides/agents-md)
- [OpenAI skill creation guidance](https://learn.chatgpt.com/docs/build-skills)
- [GitHub Copilot custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions)
- [Google DESIGN.md format](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
These are documentation conventions; the classroom requirements are defined locally in the files above.

## Animated video production
The repository also includes the complete pinned [Peter Yang Video Explainer](vendor/video-explainer), with Motion, Illustrated and 3D engines, narration/captions, sound tools, HyperFrames rendering, frame-pinned review, tests and original licenses. Use the separate [video-explainer skill](.agents/skills/video-explainer/SKILL.md), [production guide](VIDEO-EXPLAINER.md), and [classroom style](video-projects/classroom-style.json) for short films or video-plus-lesson projects. This is optional local tooling; the website build and full interactive lesson workflow are unchanged.
