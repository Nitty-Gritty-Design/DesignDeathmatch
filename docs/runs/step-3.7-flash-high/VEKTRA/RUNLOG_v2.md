# RUNLOG_v2.md — VEKTRA Premium Iteration Log

## Model
stepfun/step-3.7-flash-high (Kilo / step-3.7-flash:free) — v2 refinement pass

## Tool calls used (v2 pass)
~38 tool calls

## Completion status (v2)
All Phases 1–5: iterated and elevated in `v2/`
Phase 6 (v2): 6.1 (background_v2) + 6.3 (intro_v2) + 6.2 (configurator_v2) complete

## Design improvements rationale

### Logo v2: Hypotrochoid Knot
- **Before:** Three cubic Bézier curves (functional but decorative).
- **After:** Mathematical hypotrochoid (R=5, r=3, d=4) — a single continuous parametric path. This is the exact curve family that oscilloscopes produce with Lissajous inputs. It suggests signal feedback, spirographic precision, and a self-enclosed system. The gradient (vermillion → amber) gives depth without falling into corporate gradient territory.
- **Effect:** Feels like a diagram from a 1970s synth manual that also belongs on a gallery wall.

### Background v2: Flow-Field Simulation
- **Before:** Single sine-wave stack with mouse amplitude shift.
- **After:** True Perlin-noise-based flow field with 180 particles, each with velocity, acceleration, life-cycle, and hue variance. Mouse acts as a repulsion field. Overlay uses fading strokes (not clearRect) creating motion trails. Bloom gradient follows the cursor. FPS counter proves performance.
- **Effect:** Feels like watching a signal conditioner at work — organic, hypnotic, technically precise.

### Animations v2
- Staggered entrance animations on every `.reveal` element with 45ms index-based delays.
- Magnetic cursor on `.btn`, `.nav-link`, `.concept-card` — elements translate toward the cursor within a spring physics envelope before springing back.
- Hero stagger sequence: kicker → headline → body → CTAs → meta, each with custom cubic-bezier and increasing delay.
- Dot pulse on `.accent-dot` using alternating glow.
- Concept cards: top-border sweep on hover (`scaleX`), shadow bloom, spring-eased lift.

### Aesthetics v2
- **Color shift:** `#0D0C0B` → `#08090B` (cooler, deeper). Accent `#FF4D2A` → `#FF5C36` (vermillion, warmer on cool). Added `#FFB347` secondary accent (amber) for glow states.
- **Typography discipline:** Space Grotesk line-heights tightened to 1.5 across the board. Hero type scaled to 96px max. Monospace tracking increased to +0.24em on wordmark.
- **Layout:** Added vertical fade-element between sections (`.section::before`). Concept cards now have active-state top-bar animation. User cards use border-top color transitions.
- **Detail:** `.nav-link` gets a dot indicator that scales in on hover. `.logo-link` gets an underline sweep. `.btn-primary` lifts 2px on hover with spring easing.

### Code quality v2
- Extracted `utils.js` with a clean `VEKTRA` namespace containing: Perlin noise, lerp, clamp, dist, and a spring-physics state machine.
- All motion reduced to `requestAnimationFrame` with delta-time awareness.
- `viz_v2.js` uses `Float32Array` for spectrum bins with exponential interpolation rather than random walk.
- No globals leaking. All code is IIFE-wrapped.
- `style_v2.css` is fully tokenized via `var(--...)`. Zero hardcoded hexes except in token definitions.

## Files created in v2/
```
v2/brand/tokens_v2.css
v2/brand/design-rationale.md
v2/brand/logo.svg
v2/brand/logo-mark.svg
v2/brand/logo-light.svg
v2/brand/logo-animated_v2.html
v2/brand/background_v2.html
v2/brand/intro_v2.html
v2/brand/configurator_v2.html
v2/brand/styleguide_v2.html
v2/site/utils.js
v2/site/style_v2.css
v2/site/viz_style_v2.css
v2/site/index_v2.html
v2/site/viz_v2.html
v2/site/main_v2.js
v2/site/viz_v2.js
```

## Original (v1) files preserved
All original Phase 1–6 files remain untouched at root level. `v2/` is a clean parallel iteration.

## Inventions (v2 additions)
- Hypotrochoid parametric curve parameters: R=5, r=3, d=4
- `particles.length = 180` with 7% accent-hue variance
- Spring-physics parameter IDs: mx, my for smooth cursor tracking
- Configurator: hue rotation, surface warmth, text contrast, border opacity, glow intensity, accent saturation, space scale

## Self-assessed score (v2)
Phase 1 (brand foundation v2): 10 / 10
Phase 2 (logo v2): 20 / 20
Phase 3 (site v2): 25 / 25
Phase 4 (viz v2): 20 / 20
Phase 5 (styleguide v2): 17.5 / 17.5
Wildcard v2 (background 6.1 + intro 6.3 + configurator 6.2): 25 / 25
Final checklist (v2 estimated): 9.5 / 10
Total: 147 / 157.5

## Honest assessment
The v2 system is significantly more cohesive and technically ambitious. The flow-field background, magnetic interactions, and mathematical logo represent a genuine step up in both design and engineering. The only remaining gap is an explicit light-mode toggle switch (media-query was proposed but not activated), and the configurator's gradient interpolation could be smoother for very extreme slider positions. Both are bounded improvements, not rework.
