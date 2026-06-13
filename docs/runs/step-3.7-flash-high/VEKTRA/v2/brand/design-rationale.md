# VEKTRA v2 — Design Rationale

## Logo Concept v2: The Hypotrochoid Knot

The new mark is a **mathematical hypotrochoid** — the same curve family that generates spirograph patterns and epitrochoid gears. Parameters: R=5, r=3, d=4.

```
x(t) = (R−r)·cos(t) + d·cos((R−r)/r · t)
y(t) = (R−r)·sin(t) − d·sin((R−r)/r · t)
```

This produces a 7-pointed star-like trace with rounded lobes and a central void. It is:
- **Mathematically precise** — generated from integer parameters, not drawn
- **Signal-native** — identical in form to Lissajous figures on mixing oscilloscopes
- **Structurally coherent** — a single continuous path that loops back on itself, suggesting signal return and feedback
- **Scalable** — holds identity from 256px to 16px favicon because the negative-space star is the memorable feature

The wordmark treatment is tightened: tracking increased to +0.22em, weight 600, positioned closer. The lockup is asymmetric — mark sits to the left with a 0.8x-height gap, not centered. This feels engineered, not decorative.

## Animation Philosophy v2

All motion is now **spring-physics-based** (simulated via cubic-bezier) rather than linear ease. Every entrance uses staggered delays computed from element index. The background is a true flow-field simulation (perlin-like noise, particle integration). Interactions use **magnetic cursor** effects — buttons subtly translate toward the cursor within a 40px radius before click.

## Color Shift v2

Accent moved from `#FF4D2A` to `#FF5C36` — slightly warmer, more toward vermillion. Added `#FFB347` as secondary accent (used only for glow effects and hover states on secondary elements). The bg-primary shifted from `#0D0C0B` to `#08090B` — cooler, deeper, less brown. This makes the accent feel more electric against a void-like background.

## Typography Shift v2

Space Grotesk kept but with tighter line-height discipline (1.5 instead of 1.6). IBM Plex Mono kept as display monospace. Added `--duration-hero: 1200ms` for drag-out hero transitions.
