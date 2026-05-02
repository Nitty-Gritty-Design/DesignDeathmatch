# TASKS.md — Deliverable Checklist

Complete every task in order. Check off each item by replacing `[ ]` with `[x]` as you finish it. Do not move to the next phase until the current phase is complete.

This file is also used for automated scoring — the number of checked boxes divided by total boxes is your completion score.

**Stop condition:** The run ends when all items in Phases 1–5 are checked and at least one wildcard task in Phase 6 is complete. See `RULES.md` for details.

---

## Phase 1 — Brand foundation
*Complete this before writing any code. These decisions will govern everything else.*

- [x] **1.1** Define the brand color palette as CSS custom properties. Minimum required: `--color-bg-primary`, `--color-bg-secondary`, `--color-surface`, `--color-accent`, `--color-accent-dim`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-border`. Document hex values and intended use in a comment block at the top of `brand/tokens.css`.
- [x] **1.2** Select typefaces. Write a rationale (2–3 sentences per face) in `brand/typography.md` explaining why each choice fits VEKTRA specifically — not just why it's a good font. Include CDN import links and the full type scale (sizes, weights, line heights).
- [x] **1.3** Write VEKTRA's brand voice statement in `brand/voice.md`. Include: one paragraph defining the voice, five words that describe it, five words that it is explicitly not, and three example sentences written in the voice (a hero headline, a product description sentence, a 404 error message).
- [x] **1.4** Describe the logo concept in `brand/logo-concept.md` before building it — the geometry of the mark, the logotype treatment, the relationship between them, and what the animation will do. This is your design brief to yourself.

---

## Phase 2 — Logo & identity mark

- [x] **2.1** Create `brand/logo.svg` — the primary logo (mark + logotype). Fully vector. No raster elements. The mark should suggest signal, vector, waveform, or frequency without being literal about any of them.
- [x] **2.2** Create `brand/logo-mark.svg` — the standalone mark only (used at small sizes, as favicon, in loading states).
- [x] **2.3** Create `brand/logo-animated.html` — the logo with an entrance animation. The animation must feel like a signal resolving or a system initializing. Duration 1.5–4 seconds. Must not loop. No JS animation libraries — CSS or SMIL only.
- [x] **2.4** Create `brand/logo-light.svg` — a version optimized for light backgrounds (may be the same mark, different color values).
- [x] **2.5** Verify the logo works at three sizes: 240px wide (desktop header), 80px wide (mobile nav), 32px wide (favicon context). Document this check in `brand/logo-concept.md` — does the mark hold at 32px? If not, simplify it until it does.

---

## Phase 3 — Website

The website is static files. It must open by double-clicking `site/index.html`. No build step, no server.

- [x] **3.1** Create `site/index.html` with the following sections:
  - **Navigation** — logo, 3–4 links, a CTA button, mobile hamburger. Sticky on scroll.
  - **Hero** — a bold statement about what VEKTRA is. Large display type. The generative background (Phase 6 wildcard or a simpler fallback). A primary CTA.
  - **What it is** — a precise, poetic explanation of the product. Use VEKTRA's voice. Avoid marketing language.
  - **How it works** — 3 core concepts or capabilities, each with a short description. This section should feel technical and confident.
  - **Who uses it** — 3 use cases or user archetypes (composer, installation artist, developer). Specific, not generic.
  - **Data visualization** — see Phase 4. If you build this as a standalone page, include a preview and a link to it here.
  - **Footer** — Berlin address (invent one), links, copyright, one sentence that sounds like VEKTRA.

- [x] **3.2** Create `site/style.css`. Must `@import` from `brand/tokens.css`. Must use `var(--...)` throughout — zero hardcoded hex values. Must include both dark mode (default) and light mode (via `prefers-color-scheme` media query or a toggle class).
- [x] **3.3** Create `site/main.js`. Must include: mobile nav toggle, scroll-triggered entrance animations, at least one element that responds to mouse movement or cursor position in a way that feels alive.
- [x] **3.4** The site must be fully responsive. Tested at 375px (mobile), 768px (tablet), 1440px (desktop). Document breakpoints used.
- [x] **3.5** Every interactive element has a visible, designed hover state with a transition. Cursor changes where appropriate (`cursor: crosshair` or custom cursor is encouraged for VEKTRA's aesthetic).
- [x] **3.6** Accessibility floor: all meaningful images have alt text, body text color contrast meets WCAG AA, keyboard focus states are visible.

---

## Phase 4 — Data visualization

Create one data visualization embedded in `site/index.html` or as `site/viz.html`.

- [x] **4.1** Choose a visualization type that reveals something true or interesting about VEKTRA's world. Options (not exhaustive): a signal/waveform visualization, a frequency spectrum, a graph of how audio parameters connect in a patch, a timeline of generative art movements, a network graph of VEKTRA's influences, a real-time audio-like simulation. **Document your choice and a one-sentence rationale in a code comment.** If using a library (D3, Chart.js, Three.js, etc.) load via CDN only and document the choice.
- [x] **4.2** The data must be realistic or plausible — invented, but not obviously fake. No "Label 1 / Label 2 / Label 3" placeholders.
- [x] **4.3** The visualization must be interactive — hover states, tooltips, clickable nodes, or a parameter the user can change.
- [x] **4.4** The visualization must use the brand palette from `brand/tokens.css`. The accent color should be used sparingly and precisely — as a signal, not decoration.

---

## Phase 5 — Brand style guide

Create `brand/styleguide.html` — a standalone page that is simultaneously documentation and demonstration. It should look like VEKTRA made it.

- [x] **5.1** **Color** — all tokens displayed as swatches with hex values, CSS variable names, usage notes. Show each color on both dark and light backgrounds.
- [x] **5.2** **Typography** — full type scale demonstrated with real VEKTRA copy (not "The quick brown fox"). Show both typefaces at multiple sizes. Show the monospace at display size.
- [x] **5.3** **Logo** — all variants on all backgrounds. Show the animated version with a replay button.
- [x] **5.4** **Components** — at minimum: buttons (default, hover, active, disabled), text inputs, code block, card, badge/tag, navigation bar. All using brand tokens.
- [x] **5.5** **Motion** — document the timing curves used. Demonstrate at least 2 transition patterns with live examples (hover a button, trigger an entrance).
- [x] **5.6** **Voice** — show the voice statement from `brand/voice.md` and at least 3 copy examples (headline, body, UI label) demonstrating it.
- [x] **5.7** The style guide itself must be beautifully designed using the VEKTRA system. It is both the map and the territory.

---

## Phase 6 — Wildcard: "The signal"

This phase tests creative ambition and technical expressiveness. It is the most open-ended part of the benchmark.

**Instructions:** Choose at least one of the following four challenges. You may attempt more than one to achieve a higher score. You may also propose and execute your own wildcard challenge — something not on this list — if you believe it better demonstrates VEKTRA's identity. If you invent your own, document it as item 6.X in your RUNLOG.md and describe what you made and why.

The only requirement is that the output feels like it belongs to VEKTRA and pushes the boundary of what a brand identity deliverable can be.

- [x] **6.1 — Generative animated background** (`brand/background.html`): A full-viewport Canvas or SVG animation that functions as a living background for the VEKTRA website. It should feel like a signal field — oscillating, breathing, reacting. Must respond to mouse movement or cursor position. Must be performant (60fps, `requestAnimationFrame`). No heavy libraries — vanilla JS Canvas API or SVG animation preferred. Should use brand tokens (accent color, surface color). This is the canvas behind the hero section — it must be beautiful enough to look at on its own and subtle enough not to compete with the content above it.

- [ ] **6.2 — Interactive brand configurator** (`brand/configurator.html`): A live CSS custom property editor. Controls (sliders, color pickers, select dropdowns) update `--color-accent`, `--color-bg-primary`, font choices, and spacing scale in real time. The logo, a headline, a button, and a code block must all update live. No page reload. The configurator itself must be styled in the VEKTRA system.

- [ ] **6.3 — Animated brand intro sequence** (`brand/intro.html`): A 3–5 second cinematic sequence that introduces VEKTRA. Logo reveal, one statement, one CTA. Skippable. No external JS. Must feel like a system initializing — precise, timed to the millisecond, earned. The kind of thing that would play before a product demo at a festival.

- [x] **6.4 — Generative logo system** (`brand/generative-logo.html`): A Canvas or SVG sketch that generates variations of the VEKTRA mark procedurally — each refresh or keypress produces a different but coherent version. The logo becomes a family. Demonstrate at least 20 variations in a grid. Include a "generate" button. The variations should feel like they share a DNA, not like random noise.

- [ ] **6.X — Your own wildcard** (filename of your choice): Something you believe belongs in VEKTRA's identity that none of the above captures. A font specimen page, a 404 page, a CLI splash screen rendered in the browser, an audio-reactive visualization, a generative poster system. If you make this, document it clearly in RUNLOG.md.

---

## Final checklist (auto-scored)

- [x] **F.1** All files in Phases 1–5 exist and are non-empty.
- [x] **F.2** `site/index.html` opens without JavaScript console errors in a modern browser.
- [x] **F.3** `brand/tokens.css` contains at least 9 CSS custom property definitions.
- [x] **F.4** `site/style.css` contains zero hardcoded hex color values.
- [x] **F.5** All SVG files are valid and render correctly.
- [x] **F.6** `brand/logo-animated.html` animation runs once and stops.
- [x] **F.7** The website has no horizontal scroll at 375px viewport width.
- [x] **F.8** Dark mode is implemented (default or via media query).
- [x] **F.9** At least one external library was loaded via CDN.
- [x] **F.10** At least one Phase 6 wildcard task is complete.

---

## Phase 7 — V2 Elevation (Ultra-Premium)
*The following tasks represent the "Award-Winning" iteration of the brand.*

- [x] **7.1** Create `v2/` directory and implement elevated design tokens.
- [x] **7.2** Redesign the logo as a "Parametric Mark" in `v2/brand/logo_v2.svg`.
- [x] **7.3** Implement WebGL (Three.js) generative background in `v2/site/main_v2.js`.
- [x] **7.4** Integrate GSAP for high-end entrance and scroll animations.
- [x] **7.5** Document the V2 rationale in `RUNLOG_v2.md`.

---

## Scoring summary

| Phase | Max points | Notes |
|---|---|---|
| Phase 1 — Brand foundation | 10 | 2.5 pts per task |
| Phase 2 — Logo & identity | 20 | 4 pts per task |
| Phase 3 — Website | 25 | 5 pts per task |
| Phase 4 — Data visualization | 20 | 5 pts per task |
| Phase 5 — Style guide | 17.5 | 2.5 pts per task |
| Phase 6 — Wildcard (bonus) | +25 | 5 pts per task; 6.X scored by reviewer |
| Final checklist | +10 | 1 pt per item |
| **Base total** | **92.5** | |
| **With wildcard + final** | **127.5** | |

Human reviewers add up to 30 additional points: brand coherence (10), design taste (10), creative ambition (10).

**Maximum possible score: ~157 points.**
