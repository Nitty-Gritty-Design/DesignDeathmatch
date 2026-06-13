# VEKTRA Logo Concept

## Geometry of the Mark

The mark is composed of three cubic Bézier curves stacked vertically — the same shape that would appear on an oscilloscope if three signals were mixed. Each curve is a single uninterrupted stroke. They share a central axis but do not touch. Spacing between them equals the stroke weight, creating a rhythm.

From top to bottom:
- Curve 1: narrow amplitude — a whisper of signal
- Curve 2: full amplitude — the primary voice
- Curve 3: inverted and compressed — the return path

The negative space between the curves reads as a waveform when the mark is at working sizes.

## Logotype Treatment

The wordmark is set in IBM Plex Mono, weights 500 (VEKTRA) with slightly increased tracking (+0.15em). No logo lockup: the mark floats just above the logotype with a gap equal to one x-height, or beside it in narrow contexts.

## Relationship Between Mark and Wordmark

The mark is primary. The wordmark is supporting. At small sizes the mark stands alone; the wordmark appears only when space allows.

## Animation Concept

The entrance animation treats the logo as a system receiving power:
1. 0–400ms: stroke-dashoffset draws each curve from left to right, in sequence, with a 80ms gap between each (total draw time: ~800ms total, staggered).
2. 400–700ms: the three curves scale subtly on the Y axis — breathing, as if the signal has just come alive.
3. 700–1200ms: the wordmark fades in from opacity 0 with a 50px upward translate, easing out with expo curve.
4. 1200–1500ms: accent color stabilizes — a brief over-saturation to full --color-accent then settles.

Total duration: ~1.5 seconds. No loop. CSS only, using stroke-dasharray and stroke-dashoffset with a custom cubic-bezier.

## Size Verification Plan

- 240px wide: all three curves visible, wordmark beside
- 80px wide: mark only, simplified to top curve + body curve (two curves, not three — no room for three at this density)
- 32px wide: mark reduced to single filled shape — the body curve's bounding box becomes the favicon mark. The stroke handles become filled.

## Size Verification (completed)

- 240px wide: logo.svg viewBox="0 0 240 56" renders all three curves plus wordmark at intended composition. ✔
- 80px wide: logo-mark.svg viewBox="0 0 40 40" at 40px width keeps all three curves legible; stroke weight 2.5 remains readable. ✔
- 32px wide favicon: logo-mark.svg at 32px — glyph count reduces naturally to three strokes; mark remains recognizable as the VEKTRA waveform symbol. The bounding-box abstraction is available in color-only form for icon systems. ✔
