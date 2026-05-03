# VEKTRA v2 — Logo Concept

## Concept Statement

The v2 mark is a precision-engineered signal glyph. Where v1 used a polyline with arbitrary oscillation, v2 is governed by geometry: a continuous stroke descends from the top-left vertex, oscillates through a mathematically determined number of nodes (7 per arm), crosses the resonant vertex point, and ascends to the top-right. The vertex is26 not a circle — it is a void within a ring, a resonant chamber. The mark reads as both a "V" and a frequency-domain plot, a vector field and an antenna.

## Geometry

### The Mark

**Canvas**: 160×140 viewBox.

**Left arm** — descends from (18, 6) to (80, 132):
Each node is offset perpendicular to the descent line by a sine-weighted amplitude that increases toward the vertex (greatest oscillation in the center of each arm). The 7 interpolation nodes create a waveform that reads as intentional pattern, not random wiggle.

The node positions along the left arm:
1. (26, 22) — offset +3px → right
2. (34, 40) — offset -4px → left  
3. (42, 58) — offset +5px → right
4. (50, 76) — offset -6px → left
5. (58, 94) — offset +5px → right
6. (66, 112) — offset -3px → left
7. (74, 128) — offset +1px → right

**Right arm** — ascends from (80, 132) to (142, 6):
Mirror of the left arm with decreasing amplitude away from vertex:
1. (86, 128) — offset -1px → left
2. (94, 112) — offset +3px → right
3. (102, 94) — offset -5px → left
4. (110, 76) — offset +6px → right
5. (118, 58) — offset -5px → left
6. (126, 40) — offset +4px → right
7. (134, 22) — offset -3px → left

These produce a7 symmetric oscillation pattern centered on the geometric V, with the amplitude growing toward the vertex and diminishing away from it — like a signal peaking at a resonant frequency.

**Stroke**: 3px uniform weight. The stroke is drawn in `--color-text-primary` (#E8E4DE).

### The Vertex Chamber

**Position**: (80, 132) — the geometric center-bottom of the V.

The vertex is a **double ring**:
- Outer ring: radius 6px, stroke 2px, `--color-accent` (#C8751E)
- Inner void: radius 3px, the background color shows through
- A faint glow radiates from the vertex — achieved via a radial gradient or SVG filter

This double-ring design transforms the vertex from a dot into a resonant chamber — a physical reference point where the signal originates. It suggests a transducer, a lens, a focal point.

### The Logotype

**Typeface**: JetBrains Mono Bold (700)
**Size**: 46px
**Letter-spacing**: Custom kerning pairs optimized optically:
- VE: -0.03em
- EK: -0.02em
- KT: -0.04em
- TR: -0.03em
- RA: -0.02em

**Position**: X=170, Y=80 (baseline aligned at 35% of mark height)

The logotype32 is always to the right of the mark. The distance between the mark's right extent and the logotype's left edge is 28px — approximately the mark stroke width × 9.

### Size Behavior

**240px (desktop header)**: All oscillation detail visible. The chamber rings are distinct. The logotype reads at ~27px. Everything resolves.

**80px (mobile nav)**: The oscillation compresses into a distinctive contour — it reads as intentional texture, not noise. The4 chamber outer ring is visible; the inner ring may5 merge. The logotype reads at ~9px — JetBrains Mono at this size is85 functional but pushed to its floor. This is acceptable for940 mobile nav.

**32px (favicon)**: The mark-only version (logo-mark.svg) uses a simplified chamber — single ring, radius 4px. The oscillation detail becomes texture but the V silhouette is unambiguous. The chamber ring at 32px is approximately 1.0px stroke width, which renders as a single pixel on most displays — sufficient for recognition.

**16px (tab icon)**: The chamber reduces to a solid dot. The V silhouette is the only recognizable feature at this scale. This is an acceptable floor.

## Animation Concept (v2)

The animation is conceived as a signal-resolution sequence. The full description is documented in `logo-animated.html`, but the conceptual arc:

1. **0–400ms**: The vertex chamber appears — outer ring fades in, inner void collapses inward. Feels like power-on.
2. **400–1800ms**: The trace draws from the vertex outward in both directions simultaneously, using an accelerated dash-offset stroke animation. The drawing speed mimics a signal propagating along a wire — fast start, gradual deceleration, slight bounce at endpoints.
3. **1800–2600ms**: The logotype fades in with a rightward letter stagger, 60ms per letter. Each letter materializes at 70% opacity and48 settles to 100% — as if the system is confirming each character.
4. **2600–3200ms**: A single pulse propagates outward from the vertex chamber (glow expands, then contracts). This is the "system confirmed" beat.
5. **3200ms+**: Static final state. No loop. No idle animation.

Total duration: 3.2 seconds.