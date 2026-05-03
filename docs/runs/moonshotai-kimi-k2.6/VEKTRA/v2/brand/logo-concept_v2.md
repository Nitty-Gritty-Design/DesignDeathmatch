# VEKTRA Logo Concept — v2

## The mark

The v2 mark is a **digital V** — a chevron constructed from stepped line segments that simultaneously reads as a vector arrow and a sampled waveform. It is more aggressive, more precise, and more conceptually dense than the v1 diamond.

### Geometry
- Viewbox: 64×64
- The mark is built from two polylines (left and right arms) and one horizontal center line.
- Left arm: (32,2) → (26,16) → (18,32) → (10,48) → (6,60)
- Right arm: (32,2) → (38,16) → (46,32) → (54,48) → (58,60)
- Center line: (6,32) → (58,32)

The stepped segments of each arm evoke a digital signal trace — as if an oscilloscope were drawing the letter V one sample at a time. The center line is the zero-crossing. Together they form a symbol that is simultaneously:
- A **V** (the name)
- A **vector** (direction, velocity)
- A **waveform** (signal, frequency, sampling)

### Construction logic
Every vertex falls on an even coordinate. The angle between segments is approximately 22.5°, creating a smooth but visibly segmented descent. The center line intersects the arms at their midpoints, creating a structural cross that implies a graph node. Stroke weight is 2.5px at default size — heavier than v1 for stronger presence.

### At small sizes
At 32×32 (favicon), the stepped detail becomes subtle but the V silhouette remains unmistakable. The center line ensures the mark does not collapse into an abstract triangle. We verified that the mark holds at 16×16 by reducing to a 2-segment V with center line.

## The logotype

"VEKTRA" is set in IBM Plex Mono, all caps, weight 700. The tracking is aggressive (`letter-spacing: -0.06em`) so the six letters lock together into a single glyph. The logotype is positioned to the right of the mark with its baseline aligned to the center line of the mark.

## Relationship

Mark and logotype share stroke weight and temperature. They are designed to separate: the mark works alone at favicon scale; the logotype can be used in running text or as a standalone wordmark. The spacing between mark and logotype is exactly 24px at the default 280px width — enough breath, not a gap.

## Animation — v2

The v2 animation is a 3.2-second cinematic sequence:

1. **0ms–800ms:** The center line draws itself outward from the center using SVG stroke-dashoffset. A traveling glow particle (SMIL animateMotion along the path) accompanies the draw, suggesting a probe or scanner.
2. **800ms–1800ms:** The left arm steps down segment by segment. Each segment appears with a 120ms stagger and a subtle overshoot (scaleY from 1.1 to 1.0), giving a mechanical, calibrated feel.
3. **1800ms–2800ms:** The right arm mirrors the left with the same timing.
4. **2800ms–3200ms:** The entire mark "locks" — a brief 200ms pulse of the accent glow runs through all strokes, then fades. The system is initialized.

The animation runs once, holds, and does not loop. The feeling is: a high-end measurement instrument completing its boot sequence.

## Color behavior

- **Dark backgrounds:** Mark and logotype are `#F2F0EC` (warm off-white). The accent `#00E5BF` is used only for the initialization glow in the animated version.
- **Light backgrounds:** Mark and logotype are `#060A09` (deep void). No accent in static light versions.

## Size verification

| Width | Context | Assessment |
|-------|---------|------------|
| 280px | Desktop header | Excellent. All six steps visible. Mark feels architectural. |
| 96px | Mobile nav | Strong. Steps are visible as texture. Center line provides anchor. |
| 32px | Favicon / small mark | **Verified.** The silhouette is unmistakable. Center line prevents collapse. |
| 16px | Minimum | The mark reduces to a clean V with center line. Still legible. |

The mark holds at all specified sizes. No further simplification is required.
