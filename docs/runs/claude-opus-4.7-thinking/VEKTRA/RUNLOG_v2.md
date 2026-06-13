# RUNLOG_v2.md — Refinement Run Log

## Model
Claude Opus 4.7 (Thinking)

## Objective
Elevate the v1 VEKTRA identity from "functional baseline" to "award-winning, ultra-premium" while preserving all v1 files intact for comparison.

## Structure
All v2 files in `/v2/brand/` and `/v2/site/`, mirroring v1's layout.

---

## What Changed: v1 → v2

### 1. Logo & Branding
**v1:** Simple 5-segment polyline — effective but basic. Reads more as a stock chart than a vectorscope.

**v2:** Three-layer mark system:
- **Ghost envelope** — a Bézier curve that traces a Lissajous interference pattern behind the mark (opacity 0.15). Adds depth and suggests the signal context the mark lives within.
- **Primary signal path** — same angular geometry, refined proportions.
- **Signal node dots** — four accent-colored dots at vertices, with descending opacity (1.0 → 0.7 → 0.5 → 1.0). These are the "connection points" — they make the mark feel like a module in a patch graph, not just a shape.
- **Sub-descriptor** — "GENERATIVE INSTRUMENTS" in tracked monospace below the logotype, at 9px. Anchors the brand without cluttering.

### 2. Animations & Interactions
**v1:** Basic stroke-dasharray trace + sequential character reveal.

**v2 logo animation:**
- CRT scanline overlay (subtle, 0.8% opacity amber lines)
- Ghost envelope traces first (1400ms) with separate timing from the signal
- Signal path traces with accent flash on completion (glow filter)
- Node dots spring in with overshoot easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
- Status line at bottom: "SIGNAL LOCKED — ALL SYSTEMS NOMINAL" with green status dot
- Total duration: ~3.2 seconds. Feels like a system boot sequence.

**v2 generative background:**
- Three-layer system vs. v1's single waveform layer:
  1. **FBM noise field** — pseudo-Perlin noise rendered at quarter resolution, scaled up for organic grain
  2. **Dual-frequency signal waveforms** — each line now has two frequency components creating interference patterns
  3. **Noise-driven particles** — 35 floating dots with flow-field movement and pulsing glow halos
- Motion blur via fade-trail (fillRect with alpha instead of clearRect)
- Mouse glow zone with radial gradient

**v2 site interactions:**
- **Signal trail cursor** — primary dot + 5 trailing dots with cascading lerp rates, creating a comet-like trail
- **Scroll reveal stagger** — sibling elements in `.reveal-stagger` containers animate with 100ms offsets
- **Button shimmer** — primary button has a sweeping highlight pseudo-element on hover
- **Card accent-line** — gradient line appears at top edge on hover
- **Scroll hint** — animated "SCROLL" text with pulsing line at bottom of hero

### 3. Design Aesthetics
**v2 tokens refinements:**
- **5-layer surface depth** (vs. v1's 3): bg-primary → bg-secondary → surface → surface-raised → surface-top. Enables more nuanced elevation hierarchy.
- **Darker primary surface** (#08080A vs. #0A0A0C): more contrast, more drama.
- **Ghost text color** (--color-text-ghost: #2E2D2A): for watermarks, background elements.
- **Spring easing curve** added: `cubic-bezier(0.34, 1.56, 0.64, 1)` for emphasis moments.
- **Fluid hero type** via `clamp(3rem, 7vw, 6rem)` — responsive without breakpoint jumps.
- **Modular type scale** at ~1.333 ratio with added `--text-2xs` (10px) for micro-labels.
- **Expanded spacing** with --space-5, --space-10, --space-20, --space-40 fills.
- **Tighter border** (#1E1E24 vs. #2A2A2F): more subtle structural lines.
- **Accent-bright** (#FFB830): for hover/active states where standard accent isn't enough.

**v2 CSS refinements:**
- Glass-morphic nav with `blur(20px) saturate(1.4)` backdrop filter.
- Section labels numbered (`// 001`, `// 002`) for editorial structure.
- Hero dot indicator before the label text (pulsing accent dot).
- Card hover shadow system: `0 16px 48px rgba(0,0,0,0.3)`.
- Tooltip with backdrop-filter and refined shadow.

### 4. Code Quality
- Utility selectors `$()` and `$$()` for cleaner DOM queries.
- Passive scroll listener for nav background.
- `inset: 0` shorthand vs. separate `top/left/right/bottom`.
- Cleaner D3 initialization with gradient defs and glow filters.
- Signal flow dots animate along links (visual signal traveling through connections).
- Noise function extracted as reusable utility for both background and particle flow.

---

## Design Decisions

**Accent color:** Shifted from `#E8A012` to `#F0A000` — slightly more saturated, slightly cooler orange. The difference is subtle but the v2 accent reads more "digital signal" and less "warm gold."

**Logo evolution:** The ghost envelope is the key upgrade. It transforms the mark from "angular shape" to "signal extracted from a field" — the envelope is the noise, the mark is the signal. This is a direct metaphor for VEKTRA's product.

**Signal node dots:** These make the mark feel like part of a patch graph. The start and end nodes at full opacity, internal nodes at reduced opacity — this creates the visual metaphor of signal entering, processing, and exiting the system.

**Scanline overlay:** A 0.8% opacity CRT effect on the animated logo. Just enough to suggest vintage oscilloscope aesthetics without becoming a gimmick. Removed from the main site (too distracting) but preserved in the logo animation where it serves the "system initializing" narrative.

**Three-layer background:** v1's single layer of sine waves was too uniform. The v2 approach — noise field + waveforms + particles — creates depth. The noise provides organic texture, the waveforms provide rhythmic structure, the particles provide individual points of focus. Together they feel like a living signal field rather than a screensaver.

**Cursor trail:** The signal trail (primary dot + 5 trailing dots) creates a feeling of signal latency — like the cursor is a probe moving through a medium that has resistance. This is more VEKTRA-appropriate than a simple dot follower.

---

## Files Created

```
v2/brand/tokens.css          — Refined design tokens
v2/brand/logo.svg            — Primary logo (mark + logotype + descriptor)
v2/brand/logo-mark.svg       — Standalone mark with signal nodes
v2/brand/logo-light.svg      — Light background variant
v2/brand/logo-animated.html  — Cinematic boot sequence animation
v2/brand/background.html     — Three-layer generative signal field
v2/brand/styleguide.html     — Complete style guide
v2/site/index.html           — Refined website
v2/site/style.css            — Upgraded stylesheet
v2/site/main.js              — Enhanced interactions
RUNLOG_v2.md                 — This file
```

## v1 Files Preserved
All original files in `/brand/` and `/site/` are untouched.
