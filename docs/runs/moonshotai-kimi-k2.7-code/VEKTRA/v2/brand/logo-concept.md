# VEKTRA v2 Logo Concept

## Mark geometry

The v2 mark refines the original VEKTRA symbol into a more precise, instrument-like form. It is constructed on a 48×48 unit grid and composed of four elements:

1. **The V structure** — two diagonal strokes converging at the bottom, suggesting direction, velocity, and the letterform.
2. **The horizontal axis** — two short segments at the upper third, suggesting a waveform baseline or zero-crossing.
3. **The ring node** — a donut-shaped aperture at the center where the axis and the implied vertical meet. This reads as a lens, an oscilloscope target, or a signal source.
4. **Square terminals** — all strokes end with flat, technical caps rather than rounded ones, reinforcing the machined quality.

### Construction

- ViewBox: 0 0 48 48
- Stroke weight: 3 units
- V legs: (8,8) → (24,40) and (40,8) → (24,40)
- Axis segments: (8,20) → (18,20) and (30,20) → (40,20)
- Ring node: outer radius 5, inner radius 2.2 at center (24,20)

### Logotype

- "VEKTRA" in Space Grotesk, weight 500, all caps.
- Tracking: -0.02em (tight but not crushed).
- Mark-to-logotype gap: 18 units.

### Color

- Dark background: mark and logotype in `--v2-color-text-primary` (#F7F7F5).
- Light background: mark and logotype in `--v2-color-bg-primary` (#080808).
- Accent state: ring node may render in `--v2-color-accent` (#00F5D4) for loading/signal states.

## Animation

The v2 logo resolves like a precision instrument initializing:

1. **0.0s** — Axis segments draw outward from the center gap (200ms each, 120ms stagger).
2. **0.32s** — V legs draw downward from the axis endpoints (350ms each, 100ms stagger).
3. **0.72s** — Ring node scales and rotates into place with a spring easing (550ms).
4. **1.05s** — Logotype reveals via a left-to-right clip-path wipe (650ms).
5. **1.15s** — A single accent pulse radiates from the ring node and fades (600ms).

Total duration: ~2.2s. Runs once. No loop. Implemented with CSS animations on SVG elements.

## Size checks

- **260px wide (desktop header):** Full mark + logotype. Ring node and stroke details are crisp.
- **88px wide (mobile nav):** Mark + compact logotype, or mark alone if horizontal space is constrained.
- **32px wide (favicon):** Standalone mark (`logo-mark.svg`). The ring node remains distinct at this size because the inner hole is preserved and the stroke weight scales cleanly. The geometry holds; no simplification was needed.
