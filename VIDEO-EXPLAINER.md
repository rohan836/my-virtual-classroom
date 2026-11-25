# Video Explainer — My Virtual Classroom

## Purpose and source
The repository now contains the original [Peter Yang Video Explainer](https://github.com/petergyang/video-explainer) at upstream commit [45132da1e9e3b43f358e5c3bb810ca81eb69ee4f](https://github.com/petergyang/video-explainer/tree/45132da1e9e3b43f358e5c3bb810ca81eb69ee4f), copied under [vendor/video-explainer](vendor/video-explainer) with its original layout, license, assets, font license, scripts, tests and executable permissions intact. The local [video-explainer skill](.agents/skills/video-explainer/SKILL.md) adapts the workflow to Indian ATL Grades 5–9; it does not replace or modify upstream code. Upstream license is [MIT](vendor/video-explainer/LICENSE); Inter's [SIL OFL](vendor/video-explainer/skills/video-explainer/fonts/OFL.txt) is preserved. Source attribution belongs in production documentation, not student-facing narration.

## Two complementary workflows
| Deliverable | Skill | Default |
|---|---|---|
| Full interactive classroom lecture | create-virtual-lab | 45 minutes including 10 minutes of notes |
| Animated explainer film | video-explainer | 60–75 seconds, 16:9, 1080p, 30 fps, simple English |
| Combined lesson and film | both | A separately accessible film plus the full lesson |

The approved interactive [What Is AI?](testing/artificial-intelligence/what-is-ai.html) and the separate [Video Explainer Edition](testing/artificial-intelligence/what-is-ai-video-explainer.html) remain unchanged. The latter was an independent HTML/video implementation, not a claimed output of this newly bundled upstream pipeline. Future requests for the actual video-explainer pipeline must use these bundled tools.

## What the upstream system contains
- Motion: stage.js/stage.css, continuous camera movement, GSAP choreography, kinetic SVG, timed callouts.
- Illustrated: illustrated.js, reusable textured sprites and word-synced characters.
- 3D: studio3d.js, Three.js camera scenes and optional Blender export.
- Script/narration: common.py parser, narrate.py (Kokoro or Gemini TTS, Parakeet alignment), media.py and capture.py for credited media, generate.py for optional Gemini music, sfx.py for local sound effects.
- Production: setup.sh and py isolated environment; build.py compiles HyperFrames; render.py creates preview/draft/final MP4; qa.py checks the render; review.py and review_page.py provide a local frame-pinned feedback workflow.
- Style presets: default, paper and blueprint; bundled fonts and license.
- Tests: upstream tests/test_pipeline.py, plus upstream SKILL.md, reference.md, eval.md and agents/openai.yaml. Upstream README includes example images.

Read [upstream skill](vendor/video-explainer/skills/video-explainer/SKILL.md), [reference](vendor/video-explainer/skills/video-explainer/reference.md) and [evaluation checklist](vendor/video-explainer/skills/video-explainer/eval.md) for exact API and commands.

## Classroom alignment
Follow PEDAGOGY.md for age-appropriate explanation, one analogy and factual accuracy; DESIGN.md for the classroom visual system. Use Motion and Audience: eli5 by default; all three upstream styles remain available. Prefer a white stage, blue/red accents and captions legible from a projector. Use [classroom-style.json](video-projects/classroom-style.json) as the project style override (the actual graphics composition must also follow the theme). Narration should be short, clear and slow enough for young learners. Avoid decorative motion, music that competes with speech, and unexplained jargon. Default Music: none. Prefer locally generated Kokoro narration or Voice: none if requested; cloud Gemini TTS/Lyria are optional and require credentials and explicit approval for paid use.

## Local environment and commands
Run from the repository root on macOS/Linux or Windows WSL in a command-capable agent. Upstream requires FFmpeg/ffprobe, Python 3.10+, Node.js 22+, HyperFrames 0.9.79 (pinned by upstream), an isolated Python environment and browser. Setup can download packages, Chrome, and optional voice/alignment models; inspect prerequisites and ask before installing missing dependencies. Optional media tools and Blender are only needed for relevant features. A normal browser lesson needs none of these tools.

```sh
S="$PWD/vendor/video-explainer/skills/video-explainer/scripts"
P="$PWD/video-projects/artificial-intelligence/what-is-ai"
mkdir -p "$P/graphics" "$P/media"

# After approval for any required downloads/install:
bash "$S/setup.sh" --voice
# Or bash "$S/setup.sh" for unvoiced films.

# Write script.md and graphics/world.html first, per upstream reference.
"$S/py" "$S/narrate.py" "$P"
"$S/py" "$S/render.py" "$P" --preview
"$S/py" "$S/render.py" "$P" --draft
"$S/py" "$S/qa.py" "$P"

# Local review; do not expose the service publicly.
"$S/py" "$S/review.py" "$P"
# In another local shell, if supported:
# "$S/py" "$S/review.py" --poll "$P/work"
# "$S/py" "$S/review.py" --ack "$P/work" BATCH_ID

# After revisions and approval:
"$S/py" "$S/render.py" "$P"
"$S/py" "$S/qa.py" "$P"
```

For the script headers in that project use e.g. Mode: motion, Aspect: 16:9, Audience: eli5, Style: ../../classroom-style.json, Voice: kokoro:af_heart, Music: none, Captions: auto, Max duration: 75. Use the upstream format for narration, scene table, graphic composition and timing. Inspect preview frames and listen to the actual audio; fix QA failures before calling the final video ready.

## Tests and maintenance
Keep the website npm commands independent of the video toolchain. Run website lint/test/build for website changes. To run the upstream suite locally after dependency setup:
```sh
"$S/py" -m unittest discover -s vendor/video-explainer/tests -p 'test_pipeline.py'
```
Some tests invoke FFmpeg, the browser and rendering tools. Record actual results rather than assuming they pass.

Never commit secrets. Keep optional GEMINI_API_KEY in the upstream local environment file outside the repository, not chat, scripts or public pages. Do not run cloud calls or download unlicensed media by default. Keep the review server local. Generated work, renders and cache folders are ignored under video-projects. The website build discovers only testing/ and published/ lesson sources; vendor tooling stays outside dist.

To update upstream, inspect and pin a new commit, verify license and file changes, update vendor/video-explainer as one coherent snapshot, then rerun tests and update this document's pin. Keep local skill, style and classroom rules outside the vendor folder to avoid losing them on upgrade. No automatic upstream execution or updates.
