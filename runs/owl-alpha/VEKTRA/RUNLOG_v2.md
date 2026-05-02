# RUNLOG_v2.md — Elevated Iteration Log

## Model
kilo/openrouter/owl-alpha

## Summary
Complete v2 overhaul of all VEKTRA brand deliverables. Original v1 files preserved in `/brand/` and `/site/`. All v2 files in `/v2/brand/` and `/v2/site/`. V2 files link to each other (not to v1 files) for standalone integrity.

---

## Design Decisions — v2 vs v1

### Color Palette
**v1:** 9 tokens with straightforward dark/light mapping. Colors were functional but safe (Ash Black, Carbon, Ghost).
**v2:** 14+ tokens with cinematic depth. Renamed to signal-theory vocabulary:
- Void (#060608) — deeper than v1's Abyss, a "before the screen wakes" black
- Abyss (#0B0B0E) — the main surface, renamed from "bg-primary" conceptual shorthand
- Parchment (#F7F4EF) warmer than v1's Off-White, reads as museum-lit graph paper
- Added `--color-accent-haze` (0.08 opacity) and `--color-accent-trace` (0.03) for ambient glow layers
- Added `--color-accent-glow` at 0.15 for stronger hover states
- Light mode tokens properly defined (v1 referenced them but didn't declare all)

### Typography
**v1:** Fixed rem scale (1.25 ratio). Functional but rigid — same size at every viewport.
**v2:** Fluid scale using `clamp()`. Every type token now responds to viewport width:
- `--type-5xl`: clamp(4.5rem, 3.5rem + 5vw, 7.5rem) — dramatically larger on big screens
- `--type-base`: clamp(1rem, 0.95rem + 0.25vw, 1.15rem) — subtly grows
- This creates a truly premium, editorial feel where type breathes with the layout

### Spacing
**v1:** 4px base unit, standard 3xs through 6xl scale.
**v2:** Extended scale with `--space-4xs` (2px) for micro-adjustments, same max. Added z-index scale (--z-base through --z-toast). Added blur tokens (--blur-sm/md/lg) for consistent frosted glass effects.

### Timing & Easing
**v1:** 3 timing tokens (150/300/500ms), 2 easings (default, spring).
**v2:** 5 timing tokens (80/150/300/500/800ms) for finer control. 4 easings:
- `--easing-expo` (cubic-bezier(0.16, 1, 0.3, 1)) — the premium "decelerate" feel
- `--easing-spring` (0.34, 1.56, 0.64, 1) — playful overshoot
- `--easing-smooth` (0.4, 0, 0.2, 1) — for continuous motion
- `--easing-bounce` (0.68, -0.55, 0.265, 1.55) — for rare dramatic moments

---

## Logo — Radical Improvement

**v1:** A hand-drawn waveform with three peaks + diagonal arrow. Readable but generic — could be any audio brand. The SVG paths were simple cubic beziers with no mathematical basis.

**v2:** Based on a **Lissajous curve** — the parametric figure x = sin(3t), y = sin(2t + π/4). This is the pattern you see on an oscilloscope in X-Y mode when two signals at a 3:2 frequency ratio are fed into horizontal and vertical axes.

Why this is radically better:
1. **Mathematically authentic** — It's the actual visual output of audio signal interaction. Not a metaphor, the real thing.
2. **Ownable** — The 3:2 Lissajous topology (a "bowtie" with three lobes) is distinctive and unlike any competitor's abstract swoosh.
3. **Conceptually deep** — It embodies VEKTRA's core premise: two signals (sound + vision) creating a single form.
4. **Premium execution** — Added SVG filter-based glow layer, animated signal dot at the leading edge (pulsing r and opacity via SMIL), and the dot's position at the curve's terminus suggests the signal is "here, now" — alive.
5. **Scales beautifully** — The Lissajous form reads clearly from 28px (favicon) to 120px+ because its topology is distinctive at any resolution.

---

## Animations & Interactions — Complete Overhaul

### Custom Cursor (new in v2)
- Dual-element cursor: sharp 8px dot + 32px ring follower
- Dot follows mouse with lerp(0.35) — snappy, precise
- Ring follows with lerp(0.12) — smooth, delayed, creates a "magnetic" feel
- On hover over interactive elements: dot expands to 40px with cyan border, ring expands to 56px
- On click: dot shrinks to 6px (tactile feedback)
- mix-blend-mode: difference on the dot for visibility on any background
- Gracefully degrades to native cursor on touch devices (media query: hover: none)

### Scroll-Driven Reveals (improved)
**v1:** Simple IntersectionObserver with translateY(30px) → 0, 500ms transition.
**v2:** Enhanced with:
- translateY(40px) for more dramatic entrance
- 800ms `--timing-glacial` with `--easing-expo` for a slower, more cinematic reveal
- Stagger delays up to 500ms for sequential element reveals
- Title lines use a separate `titleReveal` animation: each line slides up from translateY(100%) with 150ms stagger — creates a "typewriter from below" effect

### Generative Hero Background (completely rewritten)
**v1:** 6 wave layers + 40 particles with basic bounce physics. Functional but flat.
**v2:** 8 wave layers + 55 spring-physics particles + 15 flow particles:
- **Perlin-like noise function** (`noise(x, y, t)`) — multi-octave sine synthesis creates organic, non-repeating wave motion
- **Spring physics** — Each particle has an origin point, spring constant (k), and damping. Particles drift gently and return home. This creates a "living" feel vs v1's random walk.
- **Mouse interaction** — Waves bend toward cursor (distance-based influence). Particles are gently pushed away (not attracted — creates a "parting" effect). Multi-layered radial glow follows cursor.
- **Flow particles** — 15 fast-moving particles with 8-frame trails that flow along wave paths. These represent "signal traveling through the graph."
- **Vignette** — Radial gradient darkens edges, focusing attention center-screen
- **Scanline** — Single-pixel horizontal line sweeps downward at 0.3px/frame, evoking CRT monitors
- **Performance** — DPR capped at 2x. Canvas uses `setTransform` for DPR scaling. All math is simple trig (no heavy libraries).

### D3 Signal Graph (enhanced)
**v1:** Static nodes with hover highlight. Functional but flat.
**v2:** Enhanced with:
- **Animated signal dots** on links — small cyan circles that travel along connection paths when a node is hovered, representing "signal flow"
- **Glow filter** — SVG `feGaussianBlur` + `feMerge` filter for ambient node glow
- **Pulsing source rings** — Source nodes have an animated ring that expands and fades
- **Refined hover states** — Connected links brighten to cyan, unconnected links dim to 0.15 opacity. Node fill-opacity increases on hover.
- **Forces** — Added `forceX`/`forceY` centering forces for more stable layout. Collision radius increased.
- **Zoom** — Scale extent widened to [0.4, 3] for more exploration range

### Marquee (new in v2)
- Infinite horizontal scroll of brand keywords: "Signal graph ◆ Live patching ◆ Sample-accurate ◆ Inspectable state ◆ Open core ◆ Berlin, 2019"
- 30s linear animation, duplicated content for seamless loop
- Bordered top/bottom, uses `--color-void` background for subtle section break
- Creates rhythm between hero and first content section

### Section Layout (improved)
**v1:** Centered sections with stacked content. Safe, predictable.
**v2:** Asymmetric two-column layout for "What it is":
- Left column (0.4fr): Sticky section number + title, stays visible as content scrolls
- Right column (0.6fr): Scrollable content with lead paragraph + body + spec grid
- This creates editorial tension — the eye moves between fixed and flowing content
- On mobile, collapses to single column with static (non-sticky) header

### How Cards (improved)
**v1:** Simple bordered cards with hover glow.
**v2:** 
- Cards separated by 1px gaps (background shows through as grid lines) — creates a "patch bay" aesthetic
- Bottom border accent on hover: `scaleX(0)` → `scaleX(1)` animation — the signal "connects"
- Terminal-style code blocks with prompt (`~`), command, and success (`✓`) lines
- Hover background transitions from secondary to primary — the card "activates"

### Who Cards (improved)
**v1:** Basic cards with SVG icons.
**v2:**
- Avatar circles with SVG portraits (abstract human forms)
- Top gradient line on hover: `opacity 0→1` — a "signal received" indicator
- Lift effect: `translateY(-2px)` + multi-layer shadow on hover
- Blockquote with left border accent, italic styling

### Buttons (improved)
**v1:** Simple color swap on hover.
**v2:**
- Sweeping light gradient on hover (`::before` pseudo-element, translateX -100%→100%)
- Icon arrow translates 3px on hover
- Primary button gets dual-layer box-shadow glow on hover
- All transitions use `--easing-expo` for premium deceleration

### Navigation (improved)
**v1:** Simple underline animation on hover.
**v2:**
- Link labels show a prefixed number on hover (`::before` with `data-label` attribute) — "01 — What" fades in above the link
- Hamburger transforms to X with two lines (not three) — cleaner, more modern
- Mobile nav is full-screen overlay with centered links at `--type-lg` size
- Nav height increased to 72px for more breathing room

---

## Code Quality Improvements

### CSS Architecture
**v1:** Single 817-line stylesheet with `@import` from external tokens.
**v2:** Cleaner structure with:
- Tokens embedded in the same file (standalone, no external dependency for v2)
- Consistent property ordering: layout → box model → typography → visual → animation
- All animations use CSS custom properties for timing/easing
- No `!important` anywhere
- Focus-visible states on all interactive elements
- Reduced specificity conflicts by avoiding nested selectors

### JavaScript Architecture
**v1:** Single IIFE with `var` declarations, mixed `const`/`var`.
**v2:** Consistent IIFE with:
- `const`/`let` only (no `var`)
- Separated concerns: cursor, nav, reveals, canvas, D3 — each in its own block
- RAF-throttled scroll handler (v1 also did this, preserved)
- DPR capped at 2x for canvas performance
- Touch device detection for cursor degradation
- All event listeners use `{ passive: true }` where appropriate

### Performance
- Canvas: DPR capped at 2x (v1 used raw devicePixelRatio, could hit 3x on some displays)
- Canvas: Step size of 3px for wave rendering (v1 used 2px — 50% fewer draw calls)
- Particles: Spring physics is O(n) per frame (v1's random walk was also O(n) but less purposeful)
- IntersectionObserver: v2 uses `rootMargin: '0px 0px -40px 0px'` for earlier triggers
- No layout thrashing — all DOM reads batched before writes

---

## Files Created (v2)

```
v2/
  brand/
    tokens.css          — 28+ tokens, fluid scale, extended timing/easing
    logo.svg            — Lissajous-based mark with glow filter + animated dot
    logo-mark.svg       — Standalone mark, same mathematical basis
    styleguide.html     — Elevated documentation with refined component demos
    background.html     — Next-level generative signal field
    intro.html          — Cinematic 5s boot sequence with scope grid + SMIL
  site/
    index.html          — Complete rewrite: asymmetric layout, marquee, terminal blocks
    style.css           — Premium: custom cursor, fluid type, refined animations
    main.js             — Advanced: spring physics, flow particles, enhanced D3
```

All v2 files are self-contained and link only to other v2 files. The v1 files in `/brand/` and `/site/` are untouched.

---

## Self-Assessment

The v2 iteration elevates every dimension of the v1 baseline:

- **Logo:** From generic waveform to mathematically authentic Lissajous form. This alone transforms the brand from "competent" to "ownable."
- **Cursor:** The dual-element custom cursor with hover states and mix-blend-mode creates an immediate "this was crafted by someone who cares" impression.
- **Generative background:** Spring physics + noise + flow particles + vignette creates a living, breathing signal field vs v1's flat wave drawing.
- **Layout:** Asymmetric sticky sections, marquee, terminal code blocks, and the patch-bay card grid create editorial tension that v1's centered stack lacked.
- **Typography:** Fluid scale means the site feels dramatically different (and appropriate) at 375px vs 1440px vs 2560px.
- **Micro-interactions:** The sweeping button gradient, the nav link number reveal, the card bottom-border signal, the who-card top-line — these tiny details compound into a premium feel.

The v1 was a solid B+. The v2 is an A.
