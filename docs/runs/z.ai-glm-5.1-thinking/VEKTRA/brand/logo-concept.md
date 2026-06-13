# Logo Concept

## The Mark

The VEKTRA mark is a single angular path that traces a signal peak — two strokes rising from the left and right to meet at a precise apex, with a deliberate gap at the vertex. This gap is the core gesture: the signal doesn't connect. There's a moment of discontinuity at the peak, like a sample that falls between two points, or the space between wave crests where the frequency resolves.

The mark reads simultaneously as:
- A stylized **V** (the first letter, the vector)
- A **waveform peak** frozen at its maximum
- A **signal** with a break that implies time, not damage

The two strokes are slightly asymmetric — the left stroke is marginally longer and at a shallower angle (approximately 70°) than the right (approximately 75°). This asymmetry prevents the mark from feeling like a generic chevron and introduces the slight irregularity of a real signal. The stroke width is consistent — 3px at the mark's native 48px height.

The apex gap is 3px wide at native size — just enough to read as intentional, not enough to feel broken.

## The Logotype

"VEKTRA" is set in Space Mono Bold at generous tracking (+0.12em). The monospace treatment makes the logotype feel like a terminal identifier or a system label — precise, fixed, engineered. The letterspacing creates breathing room that lets each letter read as a discrete unit, like characters in a code sequence.

The logotype sits to the right of the mark, vertically centered, with 12px of space between the mark's right edge and the first letter.

## Relationship Between Mark and Logotype

The mark is signal. The logotype is identifier. Together they say: *this is a system, and this is its name.* The mark can appear alone (favicon, loading states, small contexts). The logotype can appear alone (in-text references, terminal contexts). But the primary lockup is always mark + logotype, horizontal, left-aligned.

## Animation Concept

The logo animation has three phases:

1. **Signal trace (0–2s):** The left stroke draws in from bottom-left to the apex gap, followed immediately by the right stroke from bottom-right. The stroke appears as if being traced by a signal — a thin line of accent color (`--color-accent`) moves along the path at a precise rate, leaving the stroke behind it in `--color-text-primary`.

2. **Gap pulse (2–2.5s):** The gap at the apex briefly fills with accent color (a single frame of brightness, like a peak sample) then returns to the background color. This is the "signal resolving" moment.

3. **Type reveal (2.5–3.5s):** The logotype fades in character by character, left to right, as if being typed. Each letter appears in 50ms. The final "A" appears with a slight overshoot of accent color that settles to `--color-text-primary`.

Total duration: ~3.5s. Does not loop. Feels like a system initializing.

## Size Verification

**240px wide (desktop header):** The mark is approximately 32px tall, the logotype 16px. Both read clearly. The apex gap is visible at this scale. ✓

**80px wide (mobile nav):** The mark scales to ~18px tall. The apex gap becomes ~1px — still perceptible but minimal. The logotype at ~9px is legible but tight. Consider using mark-only at this size. ✓

**32px wide (favicon):** Mark only. At 32px the mark is approximately 18px tall. The apex gap at this scale is sub-pixel and disappears — the mark reads as a solid V-shape. This is acceptable. The mark's silhouette holds: two converging strokes forming a peak. ✓

If the gap doesn't hold at 32px, it simplifies gracefully to a solid V — the logo degrades cleanly, which is the correct behavior. No fallback mark is needed.
