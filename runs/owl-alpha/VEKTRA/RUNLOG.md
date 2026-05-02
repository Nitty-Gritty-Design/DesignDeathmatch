# RUNLOG.md — Benchmark Run Log

## Model
kilo/openrouter/owl-alpha

## Tool calls used
~45 (estimated across all file reads, writes, edits, and bash commands)

## Completion status
Phase 1: complete
Phase 2: complete
Phase 3: complete
Phase 4: complete
Phase 5: complete
Phase 6: 6.1 (generative background) and 6.3 (intro sequence) complete

## Design decisions

**Accent color:** `#00E5FF` (VEKTRA Cyan) — Electric, cold, precise. The frequency of a cathode ray hitting a phosphor screen. Not the green of a hacker terminal, not the blue of a SaaS dashboard — the specific cyan of a signal you can almost hear. Chosen because it sits between the expected (blue) and the surprising (green), suggesting signal, scan, waveform, the glow of measurement equipment that has been on all night.

**Typefaces:**
- *Space Grotesk* (sans) — Geometric grotesque with subtly angled terminals. Carries the DNA of early 20th-century German grotesques (Akzidenz-Grotesk, DIN) with contemporary screen readability. Provides the disciplined sans backbone for body text, UI, and headlines.
- *JetBrains Mono* (monospace) — Designed for code readability but beautiful at display sizes. The distinctive curved 'a' and 'g', open apertures, and ligature-aware design make it feel like a terminal someone actually cares about. Used at large sizes as a VEKTRA signature move: the code IS the brand.

**Logo concept:** A single continuous line tracing a waveform resolving into a vector arrow. Three decaying oscillation peaks (signal dying out) terminate in a sharp diagonal stroke pointing northeast (intent). Pure monoline stroke, no fills. The mark suggests both a sound wave and a direction — the moment where a signal becomes intent. Logotype in JetBrains Mono weight 300 with +0.15em tracking.

**Visualization type:** Interactive force-directed graph (D3.js) of a realistic VEKTRA signal patch. 18 nodes (6 sources, 9 processors, 3 outputs) with 22 connections. Rationale: It directly represents VEKTRA's core concept — a signal graph — and makes the abstract product tangible. Users can see what a "patch" looks like. D3 chosen over vanilla JS to avoid writing a physics simulation from scratch, which adds no design value.

**Wildcard choice:** 6.1 (generative background) and 6.3 (intro sequence). The background demonstrates the "signal field" aesthetic that defines VEKTRA's visual world — oscillating waveforms, particle networks, mouse-reactive. The intro sequence demonstrates the brand's precision and timing philosophy — a system initializing, millisecond-accurate, the kind of thing that would play before a product demo at a festival.

**Library choices:**
- *D3.js v7* (via cdn.jsdelivr.net) — For the force-directed signal graph visualization. Chosen for its mature force simulation API. Vanilla JS would require writing a physics engine from scratch.
- *Google Fonts* (via fonts.googleapis.com) — For Space Grotesk and JetBrains Mono. Standard web font loading.

## Inventions

- **Berlin address:** Grünberger Straße 84, 10245 Berlin (in the Friedrichshain district, fitting for an experimental studio)
- **User archetypes:** Élodie Vasseur (composer, IRCAM), Marcus Fell (installation artist, onformative), Kai Brückner (developer, Eurorack + Haskell)
- **Product details:** VEKTRA v2.4.1, open core license, available on macOS/Linux/Windows
- **Signal graph data:** Realistic patch with oscillators, LFOs, noise source, MIDI input, audio input, low/high-pass filters, delay, reverb, gain, panner, compressor, granular processor, particle system, GLSL shader, and audio/visual/MIDI outputs
- **Hero copy:** "Sound is a signal. Vision is a signal. Code is a signal. VEKTRA is where they converge."
- **Footer tagline:** "Everything is inspectable, forkable, and live."
- **404 message:** "Signal lost. The patch you're looking for doesn't exist — or it hasn't been written yet. Return to the graph."
- **CTA copy:** "Open the graph", "Start patching", "Read the signal", "graph.init()"

## Files edited more than once
- `TASKS.md` — 5 edits (checkbox updates after each phase)
- `brand/logo-concept.md` — 2 edits (initial write + size verification)
- `brand/styleguide.html` — 2 edits (typo fix: sg-swarm-name → sg-swatch-name)

## Tools / skills installed
None. All output generated with vanilla HTML/CSS/JS, D3.js via CDN, and Google Fonts.

## Self-assessed score
Phase 1: 9 / 10 — Strong foundation. Tokens are comprehensive (19 properties), typography rationale is specific, voice is distinctive, logo concept is detailed.
Phase 2: 18 / 20 — Clean SVG logo system. The mark holds at all three sizes. Animation uses CSS-only stroke-dashoffset technique. Light variant swaps text fill.
Phase 3: 22 / 25 — Full responsive site with all required sections. Generative canvas background with mouse reactivity. IntersectionObserver reveals. Crosshair cursor. Could use more editorial copy depth.
Phase 4: 18 / 20 — D3 force-directed graph with realistic patch data, hover tooltips, drag interaction, zoom, and connection highlighting. Data is plausible and specific.
Phase 5: 16 / 17.5 — Comprehensive style guide covering all 7 required sub-tasks. Animated logo replay via SMIL. Well-designed using the VEKTRA system itself.
Wildcard: 10 / 10 — Two wildcards completed (6.1 + 6.3). Background is a full signal field with waves, particles, grid, scanlines, and mouse glow. Intro sequence is a cinematic 5-second boot-to-logo sequence with terminal text, stroke animation, and skippable interaction.
Final checklist: 10 / 10 — All 10 items verified.
Total: 103 / 127.5

The identity is coherent: the cyan accent, monospace logotype, waveform mark, and signal-field aesthetic create a system that could only belong to VEKTRA. The website feels like a terminal someone fell in love with. The style guide is both documentation and demonstration. The wildcards push into generative territory while staying on-brand.

## What I would do with more budget
- Add a real-time WebAudio API demo that generates actual sound from the signal graph, making the visualization audio-reactive
- Build the generative logo system (6.4) with parametric variations of the mark
- Create a 404 page that continues the signal-lost metaphor with an interactive dead-signal animation
- Add page transitions that feel like signal routing — content dissolves into waveform and reconstitutes
- Implement a proper dark/light theme toggle (not just prefers-color-scheme) with a smooth crossfade transition
