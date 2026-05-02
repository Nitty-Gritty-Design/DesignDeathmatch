# VEKTRA Logo Concept

## The Mark

The VEKTRA mark is constructed from a single continuous line that traces a waveform resolving into a vector arrow. It begins as an oscillation — three peaks of decreasing amplitude, like a signal decaying — and terminates in a sharp diagonal stroke pointing northeast. The form suggests both a sound wave dying out and a direction being taken. It is not a literal waveform, not a literal arrow: it is the moment where a signal becomes intent.

**Geometry:**
- The mark fits within a square bounding box (1:1 aspect ratio).
- The waveform portion occupies the left 60% of the box, with three peaks at varying heights (tallest on the left, shortest on the right) connected by smooth curves.
- The vector arrow occupies the right 40%, emerging from the last oscillation peak and extending to the top-right corner.
- Line weight: uniform 4% of the box height, creating a monoline construction.
- No fills. Pure stroke. The mark is a line, not a shape.

## The Logotype

"VEKTRA" in JetBrains Mono, weight 300, tracked at +0.15em (wide letter-spacing). The monospace logotype is a deliberate choice: it reads as code, as a variable name, as a signal identifier. The wide tracking gives it the breathing room of a gallery title. Uppercase only. The logotype sits to the right of the mark with a gap equal to the mark's width.

**Lockup:** Mark + gap + logotype, horizontally centered. The mark's vertical center aligns with the logotype's x-height center (not the cap height center — this creates a subtle visual tension that feels engineered).

## Relationship Between Mark and Logotype

- **Primary lockup:** Mark left, logotype right. Used in navigation, headers, business cards.
- **Standalone mark:** Used at sizes below 80px wide, as favicon, in loading states, as a watermark.
- **Standalone logotype:** Used in running text ("the VEKTRA environment"), in code contexts, in terminal-style UI.

## Animation Concept

The logo animates as a signal resolving:
1. **0–400ms:** The canvas is blank. A single horizontal baseline fades in (the zero-line of a waveform display).
2. **400–1200ms:** The waveform portion draws itself from left to right, as if being traced by a beam. The three peaks emerge sequentially, each one slightly smaller than the last — a decaying oscillation.
3. **1200–1800ms:** The vector arrow stroke draws from the last peak to the top-right corner. A quick, decisive motion.
4. **1800–2200ms:** The logotype fades in character by character (monospace reveal), left to right, 80ms per character.
5. **2200–3000ms:** The mark's stroke briefly glows (cyan luminance increase, subtle), then settles. The full logo holds.

Total duration: ~3 seconds. The animation does not loop. It plays once on page load or when the animated logo is viewed.

## Size Verification

- **240px wide (desktop header):** Full lockup. Mark ~48px, logotype ~140px. Clear and legible. The waveform peaks are distinguishable.
- **80px wide (mobile nav):** Mark only, ~32px. The three peaks and arrow are still visible at this size. The form reads as a distinctive glyph.
- **32px wide (favicon):** Mark only, ~24px. At this size, the waveform simplifies to a recognizable zigzag-with-tail. It holds because the monoline construction and the diagonal arrow create a unique silhouette that is distinguishable from other marks at favicon scale.

**Favicon note:** At 32px, the mark may need a simplified variant with slightly thicker stroke weight (5% instead of 4%) to maintain visibility. This variant is documented in `logo-mark.svg`.

## Size Verification (Complete)

| Size | Width | Mark Readability | Logotype Readability | Notes |
|------|-------|-----------------|---------------------|-------|
| 240px (desktop) | Full lockup | Excellent — all 3 peaks visible | Excellent — wide tracking works at this size | Primary use case. |
| 80px (mobile) | Mark only | Good — 3 peaks distinguishable, arrow clear | N/A (mark only) | Used in mobile nav. |
| 32px (favicon) | Mark only | Acceptable — reads as zigzag-with-tail | N/A (mark only) | The diagonal arrow creates a unique silhouette. Stroke boosted to 4px in `logo-mark.svg`. |
