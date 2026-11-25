---
name: video-explainer
description: Create, render, review, or revise narrated animated educational videos, short cinematic explainers, motion graphics, illustrated films, and 3D visual stories for My Virtual Classroom using the bundled Peter Yang video-explainer pipeline. Use for video or video-plus-lesson requests, not ordinary interactive lessons alone.
---

# Video explainer — classroom integration

This is the discoverable classroom adapter for the complete, pinned upstream Video Explainer skill. It is not an independent reimplementation of its rendering engine.

## Load the instructions
From the repository root read AGENTS.md, PEDAGOGY.md, DESIGN.md and VIDEO-EXPLAINER.md. Then read the bundled upstream [SKILL.md](../../../vendor/video-explainer/skills/video-explainer/SKILL.md), [reference.md](../../../vendor/video-explainer/skills/video-explainer/reference.md) and [eval.md](../../../vendor/video-explainer/skills/video-explainer/eval.md). Use its actual scripts and graphics engines, not merely an imitation in HTML.

## Route by deliverable
- Interactive classroom lesson only: use create-virtual-lab, preserving its default 45-minute class and 10-minute notebook summary.
- Short video explainer: follow the upstream film workflow with the classroom audience and theme below.
- Video plus interactive lesson: use both skills. The short film introduces or recaps the lesson; it does not replace its explanations, vocabulary explorer, experiments, or notebook.
- New video editions receive a separate slug unless the user explicitly authorizes replacing an existing page. Never overwrite the approved lesson.

## Classroom defaults
Grades 5–9 Indian ATL, simple English, Audience: eli5 by default, Motion style, 16:9, 1920×1080, 30 fps, about 60–75 seconds (respect requested length). Use one familiar analogy, a concrete hook, continuous animated cause and effect, and a closing takeaway. Narration and captions should explain the mechanism, not just name objects. Use the white classroom style JSON described in VIDEO-EXPLAINER.md; no dark theme unless requested. Prefer local Kokoro voice and captions, no music by default for classroom clarity; optional subtle local sound effects only if useful. Illustrated and 3D modes are fully available when requested or pedagogically appropriate. Do not assume paid Gemini/Lyria or external media access.

## Execute the real pipeline
1. Use a project under video-projects/<subject>/<slug>/, outside the published site. Write script.md with verified narration, scene IDs, timings and graphics paths per upstream reference. Use a single continuous composition (graphics/world.html) when practical.
2. Check prerequisites and seek permission for missing dependency installation, downloads, paid services, or external media if required. Run the bundled setup and narration/alignment scripts as appropriate.
3. Build visuals with the upstream Motion, Illustrated or Studio3D engine. Use deterministic scene/word timing and meaningful motion. Follow the upstream reference, evaluation and classroom design rules.
4. Preview contact sheet, render draft, run qa.py and inspect the real frames. Fix issues. Run the local review page for actual frame-pinned comments when the environment supports it. Do not promise background review when no session is available.
5. Render final MP4 and rerun QA. Report the real file path, duration, resolution, narration and QA status. For a browser version, use a separate self-contained HTML lesson edition and verify controls; do not expose local toolchain or review server to students.
6. Keep upstream MIT/OFL notices and source attribution. Keep credentials outside the repo. Do not claim installation, rendering or QA that did not actually run.

Use VIDEO-EXPLAINER.md for paths, commands, style, and updating the pinned upstream code. The original upstream skill and all supporting files are retained unmodified in vendor/video-explainer.
