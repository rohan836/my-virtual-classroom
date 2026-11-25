# Video projects

Source projects for the bundled Video Explainer production pipeline. See [VIDEO-EXPLAINER.md](../VIDEO-EXPLAINER.md) and the [classroom skill](../.agents/skills/video-explainer/SKILL.md).

Use `video-projects/<subject>/<slug>/script.md` and `graphics/world.html` for new projects. Subjects are `electronics` and `artificial-intelligence`. Keep supporting media in each project's media/ folder with credits. Use the shared [classroom-style.json](classroom-style.json) by setting `Style: ../../classroom-style.json` in script.md. The upstream tools resolve the path relative to the project root. The original upstream presets remain available.

Generated work/, renders/, hf/ and review artifacts stay local by default; no videos, scripts or tools are automatically exposed through the static website. Publish only the final reviewed student-facing asset or separate HTML edition when requested. Never place API keys or secrets here.
