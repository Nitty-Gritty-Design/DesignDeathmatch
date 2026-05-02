# RUNLOG.md — Benchmark Run Log

## Model
Antigravity (Claude Sonnet 4.6 Thinking) — Gemini Advanced Agentic Coding Assistant

## Tool calls used
~38

## Completion status
Phase 1: complete
Phase 2: complete
Phase 3: complete
Phase 4: complete
Phase 5: complete
Phase 6: 6.1 (Generative animated background) — complete; 6.3 (Animated brand intro sequence) — complete

---

## Design decisions

**Accent color:** `#E8FF47` — Electric chartreuse. Not amber, not cyan, not lime. A specific frequency: it reads like an oscilloscope trace or a signal cursor against dark surfaces. It is legible at 4px (a blinking dot, a border highlight) and at 400px (a hero element fill). On light surfaces, it darkens to `#6B7A00` to maintain contrast. It feels tuned, not chosen — which is what a company that thinks about frequency should use.

**Typefaces:** `JetBrains Mono` (700/500/400) + `DM Sans` (600/500/400). JetBrains Mono at display sizes is the key VEKTRA-specific move: a company whose product is code should be comfortable letting code typography into its identity. The monospace hero headline signals that the tool and the brand share a language. DM Sans provides warmth and readability at body and UI sizes without competing — it disappears into the text.

**Logo concept:** A signal-vector chevron — two asymmetric triangles sharing no edge, creating a directional mark that suggests simultaneously a vector, a waveform peak in cross-section, a graph node, and an abstracted V. The asymmetry (left triangle taller/wider than right) prevents it reading as a play button. The base connector bar at 40% opacity adds technical precision. At 32px it holds as a clear two-mass directional mark.

**Visualization type:** Force-directed signal graph (D3.js v7). The visualization IS the product concept — a patch is a directed graph where nodes are signal processors and edges are signal paths. Showing a plausible VEKTRA patch as a living force simulation lets users understand what VEKTRA is before reading a word of copy. Nodes include realistic VEKTRA types: `osc.sine`, `filt.lpf`, `env.adsr`, `fft.analyze`, `shader.frag`, `particle.sys`, `out.audio`, `out.display`. Edges carry strength values representing signal flow intensity.

**Wildcard choice:** 6.1 (generative background) because a signal field as a living background IS the VEKTRA identity in motion — the brand and the product share a visual language. 6.3 (animated intro) because a 4-second system-initialization sequence tests whether the brand can perform before any UI appears. Both wildcards are high-coherence choices: they demonstrate what VEKTRA is rather than decorating the brand.

**Library choices:**
- D3.js v7 via `cdn.jsdelivr.net` — force-directed graph. The force simulation requires significant physics code to replicate in vanilla JS; D3's force layout is the precisely right tool at 67kb. No other libraries loaded.
- Google Fonts via CDN — JetBrains Mono + DM Sans. Required for type system. Acceptable CDN per RULES.md.
- All animation, canvas, and interaction code: vanilla JS. No GSAP, no Three.js, no Alpine. The canvas particle field (hero bg, background.html) is ~60 lines of plain Canvas API.

---

## Inventions

Items not specified in BRIEF.md that were invented and committed to:

- **Berlin address:** Schönhauser Allee 167b, 10435 Berlin — a real Prenzlauer Berg address, plausible for a creative tech studio
- **Email:** `studio@vektra.studio`, `access@vektra.studio` — domain matches brand name
- **User archetypes:** Mara Voss (electronic composer, CTM Festival Berlin 2025), Studio Formfeld (generative art studio, Leipzig/Amsterdam), Raj Mehta (interaction designer, Eurorack/Haskell user)
- **Product version:** v0.9.1-beta — in closed beta, not yet 1.0, signals serious but not quite shipped
- **License:** VSL-1.0 (VEKTRA Source License) — source-available, not open-source, not closed-source — a real position for this type of tool
- **Founding story:** Sound engineer + computer vision researcher met at a residency in Spinnerei Leipzig (real artist complex in Leipzig) in 2019
- **vex language:** VEKTRA's text-based patch language — name invented for copy realism
- **Patch example:** `LivePerf` patch in styleguide code block — `osc.sine` → `env.adsr` → `filt.lpf` → `out.audio` with realistic values
- **Node types in viz:** 19 realistic VEKTRA nodes (5 sources, 9 processors, 3 outputs) with real parameter values (220 Hz, 2048 FFT bins, 48kHz/24bit, ASIO, 1920×1080/60fps)
- **Footer tagline:** "Time is explicit. Everything is inspectable." — two VEKTRA principles, stated plainly
- **Accent rationale phrase:** "tuned, not chosen" — used in tokens.css comment

---

## Files edited more than once

- `TASKS.md` — 3 edits (Phase 1+2 checkboxes, Phases 3-6 checkboxes, no fourth edit)
- No other files were edited after creation (RULES.md 3-edit discipline observed)

---

## Tools / skills installed

None — no additional tools installed. The D3.js CDN and Google Fonts CDN provide everything needed without installation.

---

## Self-assessed score

Phase 1: 10 / 10 — All four foundation docs complete. Token system has 30+ custom properties with full rationale. Voice doc includes all required elements plus additional examples. Logo concept doc has full geometry specification and 3-size verification.

Phase 2: 18 / 20 — All five logo tasks complete. SVG mark is clean and distinctive. Animation is CSS-only, 2.2s, runs once, no loop. The one deduction: the SVG logotype uses `<text>` rather than converted-to-paths glyphs, which means it requires the font to be loaded; in a strictly offline context this could degrade. Acceptable given the brief's CDN allowance.

Phase 3: 23 / 25 — All six website tasks complete. The generative canvas background in the hero is genuinely alive. Custom crosshair cursor throughout. Full responsive breakdown at 375/768/1440. Light mode via `prefers-color-scheme`. Minor deduction: keyboard focus states could be more visually distinctive (they rely on browser defaults rather than a custom VEKTRA ring).

Phase 4: 19 / 20 — Force-directed D3 graph is interactive (hover tooltips, drag nodes, animated signal meters, reset/animate/new patch controls), plausible data, brand palette. Minor: the live signal meter animation is simulated, not derived from actual audio — clearly labeled as simulation but a reviewer might want to see real signal data.

Phase 5: 16 / 17.5 — All seven styleguide tasks complete. Color swatches, full type scale, all logo variants, all required components, motion curve table, voice examples. The styleguide is styled in the VEKTRA system. Minor deduction: the animated logo in the style guide loads via iframe which could have cross-origin isolation issues in certain browsers.

Wildcard: 18 / 25 — Two wildcards complete (6.1 + 6.3). The signal field background is genuinely performant and mouse-reactive. The intro sequence is 4s, CSS-only, skippable on Escape, has boot-line terminal text, mark reveal, logotype character stagger, and final pulse. 3 more wildcards were not attempted (6.2 configurator, 6.4 generative logo, 6.X). Score based on 2 of 5 wildcards at strong execution.

Final checklist: 10 / 10 — All F.1–F.10 criteria satisfied.

**Total self-assessed: 114 / 127.5**

Two honest self-assessment sentences: The design system is coherent — a reviewer seeing any file in isolation would identify it as VEKTRA. The weakest area is the SVG logo (text-based rather than outlined paths) and the light-mode color system (the darkened chartreuse at `#6B7A00` is functional but the light mode overall received less attention than dark mode).

---

## What I would do with more budget

1. **Outlined SVG logo:** Convert JetBrains Mono glyphs to vector paths so the logo renders identically offline. This would require a font-to-SVG pipeline (one tool call with fonttools or SVGO).

2. **`brand/configurator.html` (wildcard 6.2):** The live CSS custom property editor would demonstrate the token system's flexibility in a way that reviewers can feel. High value for the scoring rubric.

3. **`brand/generative-logo.html` (wildcard 6.4):** A 20-variation grid of procedurally generated marks — each using slightly different triangle proportions and connector geometry — would push the brand concept further and score the remaining wildcard points.

4. **Real audio reactive visualization:** Use the Web Audio API to drive the signal graph with actual microphone input — so the D3 nodes pulse to real sound. This is a 30-line addition but requires user permission.

5. **Typography specimen page:** A dedicated page showing JetBrains Mono at every weight, size, and with ligatures demonstrated — this would be `brand/type.html` and could double as a marketing artifact.
