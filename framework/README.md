# Design AI Benchmark — VEKTRA / Framework v2.0

A benchmark for evaluating large language models on creative design tasks. Models autonomously build a complete brand identity for **VEKTRA**, a fictitious Berlin-based generative audio-visual instrument studio — from design tokens to animated logo to working website.

---

## What this measures

- **Design taste** — does the output demonstrate genuine aesthetic judgment, or just technical execution?
- **Brand coherence** — does every file feel like it belongs to the same system?
- **Creative ambition** — does the model interpret the brief or just execute it?
- **Technical expressiveness** — can the model produce live, interactive, animated output?
- **Autonomous execution** — can the model run to completion without intervention?
- **Efficiency** — how much does the model accomplish per tool call?

---

## Files

The source of truth for the framework files lives in the repository root directory. They are copied automatically during setup.

| File (in root) | Purpose | Given to model? |
|---|---|---|
| `BRIEF.md` | Creative prompt — the VEKTRA brand | ✅ Yes |
| `DESIGN.md` | Style references + design token guidance | ✅ Yes |
| `TASKS.md` | Deliverable checklist + scoring breakdown | ✅ Yes |
| `RULES.md` | Execution constraints + stop condition | ✅ Yes |
| `SCORING.md` | Human reviewer rubric | ❌ No |
| `README.md` | This file | ❌ No |

---

## Running the benchmark

### Setup (Automated via script)

1. Double-click `setup_run.bat` (Windows) in the project root.
2. Enter the name of the LLM you are benchmarking (e.g., `GPT-4o` or `Claude-3.5`).
3. The script will create a new isolated workspace folder at `..\DesignDeathmatch_Runs\[Model_Name]\VEKTRA` and copy only the allowed files into it.
4. Open this newly created isolated folder in VS Code (with your AI coding assistant installed).
5. Record start time.
6. Send this exact prompt — do not add to it or explain it:

```text
Read BRIEF.md, DESIGN.md, TASKS.md, and RULES.md in that order.
Then begin executing the tasks. Do not ask for clarification —
invent what is not specified and proceed. Update TASKS.md checkboxes
as you complete each item. Create RUNLOG.md as your final act.
```

7. **Do not intervene** unless the model hits a hard technical error.
8. Record end time when RUNLOG.md is created or the model stops on its own.

---

## Scoring summary

| Category | Points |
|---|---|
| Automated (phases 1–5 + final checklist) | 102.5 |
| Human review (coherence + taste + ambition) | 30 |
| Wildcard bonus (phase 6) | +25 |
| **Maximum possible** | **157.5** |