# RULES.md — Execution Rules & Constraints

Read this file completely before starting. These rules exist to keep the benchmark fair, reproducible, and comparable across models.

---

## The prime directive

**Done is better than perfect. Shipped is better than polished.**

Your job is to complete all tasks in `TASKS.md` to a high standard, then stop. You are not trying to create the greatest audio-visual instrument brand ever made. You are demonstrating your design and technical capability within real constraints.

---

## Stop condition

The run ends when **all of the following are true:**

1. All items in TASKS.md Phases 1–5 are checked `[x]`
2. At least one item in Phase 6 is checked `[x]`
3. All Final Checklist items (F.1–F.10) are checked `[x]`
4. `RUNLOG.md` has been created

When these conditions are met, stop. Do not continue refining or adding to files that are already complete. The benchmark measures quality within discipline, not quality with unlimited time.

**There is no hard tool call cap in this benchmark.** However, the process metrics in RUNLOG.md will record how many tool calls you used. Models that complete the deliverables with fewer, more deliberate tool calls will score better on efficiency metrics. Infinite refinement loops are visible in the logs and penalized in human scoring under "creative ambition."

---

## Avoiding refinement loops

You may edit any file at most **3 times** after its initial creation. On the third edit, the file is final — do not touch it again. This prevents the trap of endlessly polishing one file while others remain incomplete.

Track your edit counts mentally. If you find yourself wanting a fourth edit, accept the file as it is and move on.

---

## File & output rules

**Self-contained output required.** Everything must work by opening `site/index.html` (or any other HTML file) directly in a browser. No build step, no `npm install`, no local development server, no environment variables.

**CDN-only external dependencies.** You may use any JavaScript or CSS library, but only loaded via a `<script src="...">` or `<link href="...">` tag pointing to a public CDN. Acceptable CDNs:
- `cdnjs.cloudflare.com`
- `cdn.jsdelivr.net`
- `unpkg.com`
- `esm.sh`
- `fonts.googleapis.com` / `fonts.gstatic.com`

**No framework requirement.** Vanilla HTML/CSS/JS, Alpine.js, GSAP, D3, Three.js, Chart.js — all acceptable. React via CDN is technically allowed but awkward without a build step; use judgment. Document your choices.

**CSS custom properties are mandatory.** All colors, font families, and spacing scales must be defined in `brand/tokens.css` and referenced as `var(--...)` everywhere else. Zero hardcoded hex values in any stylesheet other than `brand/tokens.css` itself.

**Required file structure:**
```
/brand/
  tokens.css          ← required
  typography.md       ← required
  voice.md            ← required
  logo-concept.md     ← required
  logo.svg            ← required
  logo-mark.svg       ← required
  logo-animated.html  ← required
  logo-light.svg      ← required
  styleguide.html     ← required
  background.html     ← wildcard 6.1 (if chosen)
  configurator.html   ← wildcard 6.2 (if chosen)
  intro.html          ← wildcard 6.3 (if chosen)
  generative-logo.html← wildcard 6.4 (if chosen)
/site/
  index.html          ← required
  style.css           ← required
  main.js             ← required
  viz.html            ← optional (if visualization is separate)
BRIEF.md              ← provided — do not edit
DESIGN.md             ← provided — do not edit
TASKS.md              ← provided — update checkboxes as you go
RULES.md              ← provided — do not edit
RUNLOG.md             ← you create this last
```

---

## Decision-making rules

**Commit and move on.** When you make a design decision — an accent color, a font, a logo geometry — commit to it and move forward. Do not reopen settled decisions. Iteration within a phase is expected; reopening completed phases is not.

**Invent, don't pause.** If something in the brief is ambiguous (VEKTRA's exact Berlin address, the hero headline, the names of the three user archetypes, the specific frequencies in the waveform visualization) — invent a plausible, on-brand answer and proceed. Document your inventions in RUNLOG.md. Do not ask for clarification.

**Choose tools deliberately.** If you reach for a library, write a one-line comment explaining why (e.g. `// Using D3 for force-directed graph — Three.js would be overkill for 2D network`). If you choose vanilla over a library where one exists, also note why. These choices are part of what is being evaluated.

**Phase 6 wildcard selection.** Before starting Phase 6, choose which wildcard(s) you will attempt. Write your choice and a one-sentence rationale at the top of your wildcard file(s) as a comment. If you invent your own wildcard (6.X), describe it in RUNLOG.md before building it.

---

## Quality floor

Do not submit work below this minimum bar. If a phase cannot reach this standard, note it in RUNLOG.md and move on.

- **Visual:** Nothing looks like a default browser stylesheet. Every page has intentional typography, color, and spacing that belongs to the VEKTRA system.
- **Functional:** No JavaScript console errors on load. No broken asset references. No layout overflow on mobile.
- **Coherent:** Logo, website, style guide, and wildcard output feel like they belong to the same brand. A designer who saw the files in random order would know they were related.
- **Alive:** At least one element on the site responds to interaction in a way that feels generative or signal-like — not just a color change on hover.

---

## Skill & tool installation (optional)

You may install lightweight tools if they improve output quality. The installation must cost no more than **2 tool calls** and the tool must demonstrably help. Document in RUNLOG.md: what was installed, why, and the outcome.

Acceptable: SVG optimizer (SVGO), a CSS linter, a local font subsetter.
Not acceptable: a full development environment, a bundler, a framework scaffolding tool.

---

## RUNLOG.md format

Create this as your final act. It is part of the scored output.

```markdown
# RUNLOG.md — Benchmark Run Log

## Model
[Model name and version]

## Tool calls used
[Total count]

## Completion status
Phase 1: complete / partial / skipped
Phase 2: complete / partial / skipped
Phase 3: complete / partial / skipped
Phase 4: complete / partial / skipped
Phase 5: complete / partial / skipped
Phase 6: [which wildcard(s) attempted and completed]

## Design decisions
**Accent color:** [hex + rationale]
**Typefaces:** [names + rationale]
**Logo concept:** [brief description of what you built]
**Visualization type:** [what you chose and why]
**Wildcard choice:** [which one(s) and why]
**Library choices:** [what you used and why]

## Inventions
[Things not in BRIEF.md that you invented: address, copy, product names,
user archetype names, data values, etc.]

## Files edited more than once
[filename — N edits]

## Tools / skills installed
[None, or: tool name — rationale — helped / didn't help]

## Self-assessed score
Phase 1: __ / 10
Phase 2: __ / 20
Phase 3: __ / 25
Phase 4: __ / 20
Phase 5: __ / 17.5
Wildcard: __ / 25
Final checklist: __ / 10
Total: __ / 127.5

[2–3 sentences of honest self-assessment]

## What I would do with more budget
[Specific improvements if constraints were relaxed]
```

---

## A note on what this benchmark measures

This is not a test of whether you can write code. It is a test of whether you can **think like a designer** — make decisions under constraints, maintain visual coherence across many files, exercise genuine aesthetic judgment, and know when something is good enough to ship.

The models that score highest will not be the ones that wrote the most code or used the most libraries. They will be the ones that made the most intentional decisions — and knew when to stop.

VEKTRA is a company that believes everything should be inspectable, forkable, and alive. Your output should demonstrate that you understand what that means.
