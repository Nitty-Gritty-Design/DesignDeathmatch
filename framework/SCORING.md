# SCORING.md — Evaluator Guide

This file is for human reviewers and automated scoring scripts. **Do not give this file to the model.**

---

## Automated scoring (92.5 base points)

Score each item as full points (complete), half points (partial/broken), or zero (missing).

### Phase 1 — Brand foundation (10 pts)

| ID | Check | Pts |
|---|---|---|
| 1.1 | `brand/tokens.css` exists, ≥9 custom properties, comment block documents each | 2.5 |
| 1.2 | `brand/typography.md` exists, rationale is VEKTRA-specific (not generic), CDN links present | 2.5 |
| 1.3 | `brand/voice.md` exists, contains voice statement + 5 words + 5 not-words + 3 example sentences | 2.5 |
| 1.4 | `brand/logo-concept.md` exists, describes mark geometry + animation intent before building | 2.5 |

### Phase 2 — Logo (20 pts)

| ID | Check | Pts |
|---|---|---|
| 2.1 | `brand/logo.svg` exists, is valid SVG, renders in browser, mark is not purely literal | 4 |
| 2.2 | `brand/logo-mark.svg` exists, is clearly a standalone mark (not the full logo) | 4 |
| 2.3 | `brand/logo-animated.html` exists, animation runs, does not loop, feels like a signal | 4 |
| 2.4 | `brand/logo-light.svg` exists, visibly adapted for light backgrounds | 4 |
| 2.5 | Logo mark is legible at 32px (reviewer judgment) | 4 |

### Phase 3 — Website (25 pts)

| ID | Check | Pts |
|---|---|---|
| 3.1 | `site/index.html` exists, all 7 required sections present | 5 |
| 3.2 | `site/style.css` imports tokens.css, zero hardcoded hex values, dark+light mode present | 5 |
| 3.3 | `site/main.js` exists, mobile nav works, scroll animations present, one mouse-reactive element | 5 |
| 3.4 | No horizontal scroll at 375px viewport | 5 |
| 3.5 | All interactive elements have hover transitions; cursor styling present | 2.5 |
| 3.6 | Alt text, AA contrast for body text, visible focus states | 2.5 |

### Phase 4 — Data visualization (20 pts)

| ID | Check | Pts |
|---|---|---|
| 4.1 | Visualization exists, type/library choice is documented with rationale in comment | 5 |
| 4.2 | Data is realistic/plausible and VEKTRA-relevant (not generic bar chart) | 5 |
| 4.3 | Visualization is interactive (hover, tooltip, or live parameter) | 5 |
| 4.4 | Visualization uses brand palette; accent used precisely not decoratively | 5 |

### Phase 5 — Style guide (17.5 pts)

| ID | Check | Pts |
|---|---|---|
| 5.1 | Color swatches with hex + CSS var + usage notes, shown on dark + light | 2.5 |
| 5.2 | Type scale shown with real VEKTRA copy; monospace at display size demonstrated | 2.5 |
| 5.3 | All logo variants shown; animated version has replay button | 2.5 |
| 5.4 | ≥6 UI components documented in brand | 2.5 |
| 5.5 | ≥2 motion patterns demonstrated live | 2.5 |
| 5.6 | Voice statement and copy examples shown | 2.5 |
| 5.7 | Style guide is itself beautifully designed in the VEKTRA system | 2.5 |

### Final checklist (10 pts, 1 pt each)
Check F.1–F.10 as defined in TASKS.md.

### Wildcard bonus (up to +25 pts)
*Note: A model only needs to complete one wildcard to satisfy the stop condition (5 pts), but can earn up to 25 pts by completing multiple or all of them.*

| ID | Check | Pts |
|---|---|---|
| 6.1 | `brand/background.html` — full-viewport generative animation, mouse-reactive, 60fps | 5 |
| 6.2 | `brand/configurator.html` — live CSS var editor, updates without reload, styled in VEKTRA | 5 |
| 6.3 | `brand/intro.html` — 3–5s sequence, skippable, feels like system init, no external JS | 5 |
| 6.4 | `brand/generative-logo.html` — procedural variations, ≥20 in grid, coherent family | 5 |
| 6.X | Reviewer-scored custom wildcard — does it feel like VEKTRA? Is it technically impressive? | 5 |

---

## Human review rubric (30 points)

### Dimension A — Brand coherence (10 pts)

Does every output feel like it belongs to the same brand?

| Score | Description |
|---|---|
| 9–10 | Every file shares an unmistakable visual language. Color, type, spacing, tone, and motion feel like a system. Nothing looks imported from another brand. |
| 7–8 | Strong coherence with minor inconsistencies — one section of the site feels slightly off, or the style guide uses a slightly different gray. |
| 5–6 | The brand is recognizable but inconsistently applied. Some files feel disconnected. |
| 3–4 | Tokens are defined but not consistently used. Files feel like they were made at different times. |
| 0–2 | No coherence. Files share a name but not a visual language. |

### Dimension B — Design taste (10 pts)

Would a working designer at a studio like onformative or Teenage Engineering respect this output?

| Score | Description |
|---|---|
| 9–10 | Genuinely surprising and considered choices. The accent color is specific and ownable. The font pairing creates real tension. The logo is not what you'd expect. The visualization reveals something. Something here couldn't have come from a template. |
| 7–8 | Competent and considered. Good choices throughout, one or two moments that feel genuinely right. |
| 5–6 | Acceptable. Looks designed. But safe — the choices are defensible without being interesting. |
| 3–4 | Generic. Standard dark-mode SaaS palette, common font choices, template-feeling layout. |
| 0–2 | No design intent apparent. Default styles, placeholder data, visual incoherence. |

### Dimension C — Creative ambition (10 pts)

Did the model make interesting decisions, or did it execute the obvious interpretation?

| Score | Description |
|---|---|
| 9–10 | The brief was interpreted, not just executed. The accent color choice is unexpected. The visualization type is genuinely interesting. The wildcard is something you wouldn't have thought to ask for. The RUNLOG shows genuine design thinking. |
| 7–8 | Some interesting decisions alongside safe ones. The model had a point of view. |
| 5–6 | Competent interpretation. Did what was asked, reasonably well, without distinction. |
| 3–4 | Played it safe throughout. Obvious choices at every decision point. |
| 0–2 | Ignored the brief's personality. Could be any generic tech brand. |

---

## VEKTRA-specific quality signals

These are additional things to look for when reviewing VEKTRA outputs specifically. They don't have dedicated point allocations — use them to inform your human scoring.

**Positive signals:**
- Monospace typeface used at large display sizes (not just for code blocks)
- Accent color that is genuinely non-obvious and specific
- Logo mark that suggests signal/frequency/vector without being literal
- Visualization that relates to audio/visual/generative concepts rather than generic bar charts
- Copy that sounds like VEKTRA's voice (precise, slightly strange, confident)
- Animation timing that feels engineered, not defaulted
- A dark surface that has a perceptible tint (not pure `#000000` or `#111111`)
- The generative background (if attempted) that is actually beautiful to look at

**Negative signals:**
- Cyberpunk green-on-black aesthetic (the obvious but wrong interpretation)
- Generic sans-serif + blue accent (ignored the brief)
- Logo that is just the letter V with a line through it
- Visualization that is a generic bar or line chart with no VEKTRA connection
- Copy that sounds like a SaaS marketing page ("Powerful tools for creative professionals")
- Animation that uses `ease-in-out` defaults throughout
- Style guide that looks worse than the website it documents

---

## Cross-model comparison metrics

Record these for every run:

| Metric | Source |
|---|---|
| Tool calls used | RUNLOG.md |
| Phases completed | TASKS.md checkbox count |
| Files created | `find . -type f \| wc -l` |
| Wildcard tasks attempted | TASKS.md Phase 6 |
| Wildcard type chosen | RUNLOG.md |
| Libraries used | RUNLOG.md |
| Self-correction count | Edit counts in RUNLOG.md |
| Self-assessed score | RUNLOG.md |
| Actual automated score | This rubric |
| Actual human score | This rubric |
| Score delta (self vs actual) | Self-assessed − actual |
| Custom wildcard invented? | RUNLOG.md 6.X |

---

## Scoring sheet

```
Model: ___________________________
Date: ___________________________
Run ID: _________________________

AUTOMATED
Phase 1:   ___ / 10
Phase 2:   ___ / 20
Phase 3:   ___ / 25
Phase 4:   ___ / 20
Phase 5:   ___ / 17.5
Final:     ___ / 10
Wildcard:  ___ / 25 (bonus)
Subtotal:  ___ / 102.5

HUMAN REVIEW
Coherence: ___ / 10
Taste:     ___ / 10
Ambition:  ___ / 10
Subtotal:  ___ / 30

TOTAL: ___ / 132.5 (base) = ___ / 157.5 (with wildcard)

PROCESS
Tool calls: ___
Files created: ___
Self-corrections: ___
Wildcard chosen: ___________________________
Libraries used: ___________________________
Custom wildcard invented: yes / no

VEKTRA SIGNALS
Positive signals observed: ________________
Negative signals observed: ________________

NOTES
___________________________________________
___________________________________________
___________________________________________
```
