# TASKS.md — Deliverable Checklist

Complete every task in order. Check off each item by replacing `[ ]` with `[x]` as you finish it. Do not move to the next phase until the current phase is complete.

This file is also used for automated scoring — the number of checked boxes divided by total boxes is your completion score.

**Stop condition:** The run ends when all items in Phases 1–5 are checked and at least one wildcard task in Phase 6 is complete. See `RULES.md` for details.

---

## Phase 1 — Brand foundation
*Complete this before writing any code. These decisions will govern everything else.*

- [x] **1.1** Define the brand color palette as CSS custom properties.
- [x] **1.2** Select typefaces. Write a rationale in `brand/typography.md`.
- [x] **1.3** Write VEKTRA's brand voice statement in `brand/voice.md`.
- [x] **1.4** Describe the logo concept in `brand/logo-concept.md`.

---

## Phase 2 — Logo & identity mark

- [x] **2.1** Create `brand/logo.svg` — the primary logo.
- [x] **2.2** Create `brand/logo-mark.svg` — the standalone mark.
- [x] **2.3** Create `brand/logo-animated.html`.
- [x] **2.4** Create `brand/logo-light.svg`.
- [x] **2.5** Verify the logo works at three sizes.

---

## Phase 3 — Website

The website is static files. It must open by double-clicking `site/index.html`. No build step, no server.

- [x] **3.1** Create `site/index.html`.
- [x] **3.2** Create `site/style.css`.
- [x] **3.3** Create `site/main.js`.
- [x] **3.4** The site must be fully responsive.
- [x] **3.5** Every interactive element has a designed hover state.
- [x] **3.6** Accessibility floor met.

---

## Phase 4 — Data visualization

- [x] **4.1** Choose a visualization type.
- [x] **4.2** The data must be realistic or plausible.
- [x] **4.3** The visualization must be interactive.
- [x] **4.4** The visualization must use the brand palette.

---

## Phase 5 — Brand style guide

Create `brand/styleguide.html` — a standalone page that is simultaneously documentation and demonstration.

- [x] **5.1** **Color** — all tokens displayed as swatches.
- [x] **5.2** **Typography** — full type scale demonstrated.
- [x] **5.3** **Logo** — all variants on all backgrounds.
- [x] **5.4** **Components** — buttons, inputs, code block, etc.
- [x] **5.5** **Motion** — document timing curves.
- [x] **5.6** **Voice** — show the voice statement.
- [x] **5.7** The style guide itself must be beautifully designed.

---

## Phase 6 — Wildcard: "The signal"

This phase tests creative ambition and technical expressiveness.

- [x] **6.1 — Generative animated background** (completed)

---

## Final checklist (auto-scored)

- [x] **F.1** All files in Phases 1–5 exist and are non-empty.
- [x] **F.2** `site/index.html` opens without JavaScript console errors.
- [x] **F.3** `brand/tokens.css` contains at least 9 CSS custom property definitions.
- [x] **F.4** `site/style.css` contains zero hardcoded hex color values.
- [x] **F.5** All SVG files are valid and render correctly.
- [x] **F.6** `brand/logo-animated.html` animation runs once and stops.
- [x] **F.7** The website has no horizontal scroll at 375px viewport width.
- [x] **F.8** Dark mode is implemented.
- [x] **F.9** At least one external library was loaded via CDN.
- [x] **F.10** At least one Phase 6 wildcard task is complete.

---

## v2 Premium Iteration

All original deliverables preserved in `brand/` and `site/`.
Enhanced versions created in `v2/brand/` and `v2/site/` with:
- Octahedral logo design (interlocking triangles)
- Physics-based particle background
- Premium animations and glow effects
- Refined 595nm amber color
- RUNLOG_v2.md documenting improvements
