# VEKTRA Logo Concept

## The mark

The mark is a diamond (rhombus) formed by four line segments, with a single horizontal line passing through its center. Together they suggest:
- **Vector / direction:** the diamond is an arrowhead seen from above, pointing forward.
- **Signal / waveform:** the horizontal line is the zero-crossing of an oscilloscope trace.
- **Frequency:** the diamond's proportions (tall, narrow) imply amplitude over time.

At large sizes, the horizontal line is broken into three segments — a center bar with two smaller bars above and below — suggesting a simplified waveform without becoming literal. At small sizes, it resolves to a single clean line so the mark holds at 32px.

### Geometry
- Viewbox: 64×64
- Diamond vertices: (32,4), (60,32), (32,60), (4,32)
- Center line: y=32, x from 12 to 52 (at large size)
- Small size variant (logo-mark.svg): single center line only

### Construction logic
The mark is built on a 4×4 grid with 4px margins. Every angle is 45° or 90°. No curves — only straight lines. This gives it the quality of a symbol from a technical notation system.

## The logotype

"VEKTRA" is set in IBM Plex Mono, all caps, weight 700. The letterforms are spaced slightly tight (`letter-spacing: -0.04em`) so the word reads as a single unit — a token, not an acronym. The logotype sits to the right of the mark, baseline-aligned with the diamond's center line.

## Relationship

Mark and logotype share the same stroke weight (2px at default size). They are designed to separate cleanly: the mark works alone at favicon scale, and the logotype can be used in running text when the mark would be redundant.

## Animation

The animation in `logo-animated.html` follows a 2.5-second sequence:

1. **0ms–600ms:** The four sides of the diamond draw themselves in sequence (top-left → top-right → bottom-right → bottom-left) using SVG stroke-dasharray animation. Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
2. **600ms–1200ms:** The center line appears, growing from the center outward — a signal resolving from noise. A brief glow pulse accompanies this.
3. **1200ms–2500ms:** The logotype types itself out letter by letter (V-E-K-T-R-A) using a CSS width/clip reveal on each letter, 150ms per letter with 50ms overlap.

The animation runs once and holds. It must not loop. The feeling is: a system initializing, a signal locking into phase.

## Size verification

| Width | Context | Assessment |
|-------|---------|------------|
| 240px | Desktop header | Excellent. Full detail visible, waveform segments clear. |
| 80px | Mobile nav | Good. Diamond and center line hold. Waveform detail is still visible but subtle. |
| 32px | Favicon / small mark | **Verified.** The standalone mark (logo-mark.svg) uses only the diamond + single center line. No waveform bars. The geometry is clean and recognizable at 32×32. |

The mark holds at all three sizes. No further simplification needed.

## Color behavior

- **Dark backgrounds (default):** mark and logotype are `#F4F2EE` (warm off-white). The accent cyan `#00F0C8` is reserved for the "signal resolve" moment in the animated version only.
- **Light backgrounds:** mark and logotype are `#0A0E0D` (near-black). No accent in the static light version.
