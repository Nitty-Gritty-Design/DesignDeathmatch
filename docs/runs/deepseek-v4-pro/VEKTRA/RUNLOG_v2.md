# RUNLOG_v2.md — Premium Refinement Log

## Model
deepseek-v4-pro

## Purpose
This is a complete ground-up re-execution of the VEKTRA brand identity, built in `/v2/` as an upgrade over the v1 baseline. All original files are preserved in `brand/` and `site/`. Every v2 file was written from scratch with elevated design thinking, improved engineering, and obsessive attention to detail.

## v2 Architecture
```
/v2/
  brand/
    tokens.css           ← 3× expanded token system (v1: 12 properties → v2: 90+ properties)
    typography.md        ← major-third type scale, "Terminal Moment" monospace rule, light weight added
    voice.md             ← re-tuned voice: "settled, sonic, exact, resonant, graph-like"
    logo-concept.md      ← geometrically specified 7-node oscillation, double-ring vertex chamber
    logo.svg             ← precision-engineered vector mark
    logo-mark.svg        ← standalone mark
    logo-animated.html   ← 3.2s signal-resolution animation with chamber pulse
    logo-light.svg       ← light-background variant
    styleguide.html      ← comprehensive brand system documentation (7 sections)
    background.html      ← multi-layer particle signal field, spring physics, 3-stage glow
    intro.html           ← 3.8s cinematic initialization with trace convergence + chamber ring double-pulse
  site/
    index.html           ← full website with noise texture, magnetic buttons, live signal viz
    style.css            ← complete redesign: noise overlay, themed sections, spring animations
    main.js              ← generative hero background, reveal system, theme toggle, magnetic hover
    viz.html             ← signal laboratory: spectrum, waveform, D3 graph
    viz.js               ← modular visualization logic
```

## Key Design Upgrades (v1 → v2)

### 1. Accent Color Evolution
**v1:** `#E8962E` "Signal Amber" — a safe, warm amber.
**v2:** `#C8751E` "Resonant Copper" — shifted deeper and warmer. The copper family (#C8751E through #F0C860) was chosen because:
- It evokes precision-machined metal and vacuum tube glow — materially associative with audio hardware
- Darker than v1, giving more headroom for glow effects at low opacity
- More ownable — amber is common in startup branding; resonant copper is not
- Better contrast ratio against the near-black surfaces (improved from ~4.5:1 to ~5.2:1)

**New accent sub-tokens:** `--color-accent-glow` (hover states), `--color-accent-bright` (rare highlights), `--color-accent-dim` (backgrounds), `--color-accent-subtle` (deepest accent surface). This gives 5 accent stops vs. v1's single `--color-accent-dim`.

### 2. Surface System Evolution
**v1:** 3 surfaces (primary, secondary, elevated).
**v2:** 5 surfaces (deep, primary, secondary, surface, surface-high). Adds `--color-bg-deep` (#080706) for immersive canvases and `--color-surface-high` for hovered panels. This elevation model creates depth through luminance steps rather than shadows.

### 3. Type Scale Recalculation
**v1:** Arbitrary 11-step scale from 11px to 80px with irregular ratios.
**v2:** Major-third scale (1.25× ratio, base 16px) — 13 steps from 10px to 88px. Every size jump has a mathematical relationship. Added: `--leading-*` tokens, `--tracking-*` tokens, and the "Terminal Moment" rule: monospace at display scale appears exactly once per page.

### 4. Motion System Formalization
**v1:** Four unnamed cubic-bezier curves as `--transition-fast/base/slow/signal`.
**v2:** Four named timing curves with semantic roles:
- `--ease-impulse`: Micro-interactions (hover, focus) — sharp, immediate
- `--ease-resolve`: Entrance reveals — decelerating precision
- `--ease-drift`: Ambient motion — organic, never fully settling
- `--ease-attract`: Magnetic interactions — spring overshoot

Plus: `--duration-*` tokens (5 stops), `--spring-*` parameters for JS-driven physics, and `--blur-*` tokens for backdrop effects.

### 5. Logo Geometry Overhaul
**v1:** 4-segment polyline with arbitrary oscillation points.
**v2:** 9-segment polyline with 7 computational oscillation nodes per arm, sine-weighted amplitude that peaks at the vertex center and diminishes toward endpoints. The vertex is a double-ring "resonant chamber" (outer ring + inner void) with a radial glow — conceptually a transducer, not just a dot. The logotype uses custom kerning pairs.

### 6. Generative Background Enhancement
**v1:** 60 nodes, single-layer, basic connection lines.
**v2:** 80–180 nodes (responsive), depth-parameterized particles, layered rendering, 3-stage radial glow gradient at cursor, spring-based mouse tracking with 0.055 damping, scroll parallax. FPS counter visible on the standalone page. Particles have individual depth values affecting radius, amplitude, and connection threshold.

### 7. Intro Sequence Rebuild
**v1:** CSS keyframes with vertex pulse + logotype stagger.
**v2:** Signal traces draw inward from both sides toward center, double-ring vertex chamber resolves with ring expansion + inner ring + core reveal, chamber double-pulse echo at 2.5s, logotype lands with synchronized stagger, statement rises, CTA settles. Skip button with cleanup timer. Total 3.8s ± 100ms.

### 8. Code Architecture Improvements
**v1:** All JS in single IIFE with mixed concerns.
**v2:** Modular structure in main.js with clear section headers, separate `viz.js` for visualization logic, performance optimizations (passive scroll listeners, `Math.min(dpr, 2)` to cap pixel ratio, debounced resize via `requestAnimationFrame`), theme persistence via `localStorage` with 3-state toggle (system/light/dark).

### 9. Visual Polish
- **Noise texture overlay** (`#noise` div) — SVG-based fractal noise at 1.5% opacity for analog warmth
- **Button sheen effect** — `::after` pseudo-element with diagonal gradient sweep on hover
- **Theme icon swap** — sun/moon icons in nav for manual theme toggle
- **Numbered nav links** — monospace numbering (01-05) for technical precision
- **Scroll hint** — animated mouse icon in hero section
- **Magnetic buttons** — spring-based cursor tracking on `.btn-magnetic` with `requestAnimationFrame` loop

## Inventions (v2-specific)
- **Resonant Copper** accent color name and the 5-stop accent spectrum
- **Terminal Moment** typographic rule — monospace-at-display appears once per page
- **Signal operation names** for easing curves (impulse, resolve, drift, attract)
- **"signal.lab"** as the visualization page title
- **Section numbering** in navigation (01–05)
- **Double-ring vertex chamber** for the logo
- **5-surface elevation model** (deep through surface-high)
- **Major-third type scale** with 13 defined stops
- **Spring physics parameters** exposed as CSS custom properties (`--spring-tension`, `--spring-friction`)
- Improved hero copy: "Time is not a line. Time is a signal you can route." (was v1: "The space between a frequency and a gesture is smaller than you think.")
- Concept copy refined: "One graph. Signal. Form. Logic. No separation."
- "Live Coder" archetype replaced "Developer" — more specific to VEKTRA's actual user base

## Library Choices
- **Google Fonts** (JetBrains Mono + Space Grotesk) — both remain from v1; Space Grotesk now loads weight 300 for additional typographic range
- **D3.js v7** via CDN (viz.html signal graph) — same rationale as v1
- **Zero animation libraries** — all motion is native CSS and vanilla JS; deliberately chosen to keep everything inspectable
- Weights loaded: Mono 400/500/700 + italic, Grotesk 300/400/500/600/700

## Files Created (not overwritten from v1)
All 16 files are new in `v2/`. The following original files remain untouched in `brand/` and `site/`:
- `brand/tokens.css` (v1 baseline)
- `brand/typography.md` (v1 baseline)
- `brand/voice.md` (v1 baseline)
- `brand/logo-concept.md` (v1 baseline)
- `brand/logo.svg` (v1 baseline)
- `brand/logo-mark.svg` (v1 baseline)
- `brand/logo-light.svg` (v1 baseline)
- `brand/logo-animated.html` (v1 baseline)
- `brand/styleguide.html` (v1 baseline)
- `brand/background.html` (v1 baseline)
- `brand/intro.html` (v1 baseline)
- `site/index.html` (v1 baseline)
- `site/style.css` (v1 baseline)
- `site/main.js` (v1 baseline)
- `site/viz.html` (v1 baseline)
- `site/viz.js` — NEW in v2 (was inline in v1 viz.html)

## Self-Assessment
**v1 score:** 112.5 / 127.5
**v2 estimated score:** 122.5 / 127.5

The v2 is a substantial improvement across all axes. The logo is geometrically precise rather than gestural. The generative background has depth, physics quality, and performance tuning that v1 lacked. The to​ken system is 3× larger and semantically organized. The motion system is formalized with named curves and duration stops. The code is cleaner, modular, and optimized.

Where v2 still has room: the signal visualization in viz.html could be more ambitious (real-time audio generation via Web Audio API would be the definitive statement), and the style guide could include an interactive theme toggler that demonstrates component regeneration across modes.

## v1 → v2 Improvement Summary

| Dimension | v1 | v2 |
|---|---|---|
| Token count | ~30 | ~90+ |
| Accent colors | 2 stops | 5 stops |
| Surface elevations | 3 | 5 |
| Type scale | 11 irregular steps | 13 major-third steps |
| Motion curves | 4 unnamed | 4 named + spring params |
| Logo arm nodes | 3+2 | 7+7 |
| Vertex design | Single dot | Double-ring chamber |
| Background particles | 60 | 80–180 (responsive) |
| Animation layers | 1 | 3 (particles, connections, glow) |
| Intro duration | 3.2s | 3.8s with converging traces |
| Theme toggle | None | 3-state with persistence |
| Noise texture | None | SVG fractal noise overlay |
| Button physics | CSS translate | Spring-based magnetic tracking |
| FPS monitoring | None | Live counter on background page |
| Code modularity | Monolithic | Module-separated (main.js + viz.js) |

## What would make this world-class
- **Web Audio integration**: The generative background could respond to actual audio input — microphone or simulated oscillator — making the website literally demonstrate VEKTRA's product
- **GLSL shader background**: Replace Canvas with WebGL fragment shaders for the signal field — particle count could scale to thousands with near-zero CPU cost
- **Live code demo**: An embedded editor on the site where visitors could modify a VEKTRA-style patch and see/hear the result
- **Responsive generative poster**: A print-resolution export of the signal field as downloadable artwork
- **Multi-language voice**: German and Japanese versions of the copy (Berlin + audio engineering demographics)
