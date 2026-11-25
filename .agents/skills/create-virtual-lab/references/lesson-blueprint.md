# Reusable lesson blueprint

Read the root PEDAGOGY.md and DESIGN.md for authoritative requirements. Use this blueprint to turn them into a real HTML page. The approved benchmark is `testing/artificial-intelligence/what-is-ai.html` at commit 455e9c127c84085f4db2ec42e6ad9c44701c7615.

## Plan before implementation
| Stage | Example 45-minute allocation | Purpose |
|---|---:|---|
| Familiar opening and prerequisites | 7 min | Recognize the problem, explain unfamiliar words |
| Definition, purpose and basic working | 10 min | Build a mental model in short visual steps |
| Guided experiment and comparison | 9 min | Predict, change, observe, explain |
| Limitations and real uses | 6 min | Correct misconceptions and transfer learning |
| Understanding check | 3 min | Short questions with reasons |
| Notebook | 10 min | Copy essentials |
Adapt timing and sequence to the concept and explicit request. The total must match the header. Plan explanation beats, not merely slide titles. Every necessary question has an answer and a reason.

## Reuse the page architecture
The approved lesson uses a small viewport shell, header, jump menu, word bank, fullscreen, scrollable stage, footer, two-panel explanation/visual layout, per-slide explanation steps and a final notes-only slide. Use a data-driven slide array and vocabulary map, or equivalent structures, so content and interactions stay in sync.

For each teaching beat define: stable ID; short title; visible explanation; concise example; illustration/animation state; caption; discussion prompt; revealable reason. If an interactive experiment shares the stage, retain the explanation on the left. Preserve progress when moving through related experiment steps; reset intentionally and explain empty states. Replay must re-run the actual visual without inadvertently deleting learned state.

For each term define: key, display name, plain meaning, concrete example, and matching visual or highlighted part. Link words in explanation, examples, answers, notes and word bank. Closing a popup should return to the same lesson state.

## Choose visuals that teach
- Animate changes to the underlying concept, not merely text opacity. Show objects before, during and after a transition; label cause and effect.
- AI: show data entering, examples compared and a result; provide a counterexample. If a toy algorithm uses preselected features, say so.
- Electronics: show a circuit or physical component and the visible change when a variable changes. Compute from correct relationships, label conventional current, units and safe assumptions. Never suggest touching mains or unsafe components.
- Robotics: animate sensor → controller → actuator; let students change a condition and see behavior.
- Python: show statement → state change → output; illustrate each new operator or structure with actual semantics. Label a simulation of execution if it is not a real interpreter.

Example selection is topic-specific. A resistor lesson might use a water-flow analogy with an explicit limit; an AI lesson might use fruit recognition; a loop lesson might show repeated steps in a familiar task. Do not reuse fruit merely to imitate the reference. A meaningful experiment includes a starting state, adjustable input, observable result, explanation and reset or replay.

## Required metadata and navigation
Single HTML file with doctype, lang, UTF-8, viewport, title starting /electronics studies or /ai studies, description meta, lab-formula meta and figure labels such as fig. 01 that the catalog can recognize. Breadcrumb ../ returns from built lab to its subject; optional root link goes ../../. Keep navigation usable from the built path. Use real buttons, select and dialogs or accessible equivalents. No external font or asset required to teach.

## Lesson end
Include one page of notebook notes, not an essay. Explain essential definitions, one example, a comparison or diagram only where useful and one takeaway. No new terms at the end. Check all timings, question IDs and vocabulary links. If teacher notes are explicitly requested, match those IDs exactly.
