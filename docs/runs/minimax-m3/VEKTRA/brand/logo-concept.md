# Logo concept — VEKTRA

## The mark

A mark made of **seven vertical bars of varying heights, arranged in a V formation.**

It is geometric (a V is a vector, an arrow, a direction), but each bar inside that V is a single sample of a signal — the silhouette reads simultaneously as a vector, a frequency spectrum, a VU meter, and the start of a waveform. It does not depict any of these things literally. It is the *idea* of discrete, vertical, time-aligned samples.

- **Bar count:** 7 (left), 7 (right). The center is implicit, where the two halves meet.
- **Bar geometry:** uniform 2px stroke, 12px gap, total width 168px. Heights vary by index to form a symmetric V: `[8, 14, 22, 32, 22, 14, 8]` for each half, with the center column doubled. Rendered with rounded caps (radius = 1) to avoid the bar-code look.
- **Tilt:** the bars are perfectly vertical — the V is implied by the *heights*, not by an actual rotation. This is the design move that makes the mark feel engineered rather than illustrative.
- **Accent use:** the tallest bar (the center peak) is set in `--color-accent`. Everything else is `--color-text-primary`. The accent earns its place by being the locus — the moment of maximum amplitude.

## The logotype

`VEKTRA` set in JetBrains Mono, weight 500, uppercase, tracking `+0.04em`. The "V" of the wordmark echoes the V of the mark when they are stacked. The wordmark is typeset in the same `--color-text-primary` as the secondary bars — it is the system, the mark is the signal.

When the mark and wordmark sit side by side, the accent bar reaches the same cap height as the wordmark, locking them to a single baseline grid.

## Animation (logo-animated.html)

The entrance is a system initializing:

1. **t = 0.0s** — only the center bar is visible at full height, in accent.
2. **t = 0.0s → 0.8s** — bars reveal outward from the center, alternating left/right, in mono-color. Each bar grows from 0 to its final height over 220ms with `ease-out-snap`.
3. **t = 0.8s → 1.4s** — the bars settle, with a subtle 2px overshoot on the second-tallest pair (the "click" of a system locking to a frequency).
4. **t = 1.4s → 2.0s** — the wordmark types in letter by letter, 50ms per character, with a faint mono caret flicker after the final letter.
5. **t = 2.0s** — animation stops. The signal is live.

Total duration: ~2.0 seconds. Plays once. No loop.

## Light variant

`logo-light.svg` is the same geometry, but with the bars and wordmark set in `--color-text-inverse` (#0E0E0C) for use on the off-white paper surface. The accent bar is unchanged — it must read the same on both surfaces, otherwise it is not a brand color.

## Multi-size test

- **240px (desktop header)** — full mark + wordmark, comfortable.
- **80px (mobile nav)** — mark only, wordmark hidden.
- **32px (favicon)** — mark only, simplified: bar count drops to 5, gaps collapse, heights rebalanced to `[6, 12, 20, 12, 6]` so the V silhouette survives at 32px.

The 32px simplification is documented and lives in `logo-mark.svg` — the mark-only file uses the 7-bar version at viewBox width that scales down cleanly, with `shape-rendering="geometricPrecision"` to keep edges crisp at every size.
