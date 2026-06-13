# VEKTRA Logo Concept

## Mark geometry

The VEKTRA mark is a single geometric figure that reads as three things at once:

1. A stylized **letter V** — the name, made structural.
2. A **vector arrow** — direction, velocity, signal flow.
3. A **waveform trigger** — the horizontal bar and central node suggest an oscilloscope reading or a pulse at the zero-crossing.

### Construction

- Two diagonal strokes converge downward at 60°, forming the V.
- A horizontal crossbar sits near the top, connecting the two strokes.
- A small circular node sits at the intersection of the crossbar and the implied center axis.
- All strokes share the same weight and are cut with flat, technical terminals.
- The mark is drawn on a 32×32 unit grid so it remains crisp at favicon size.

### Logotype

- "VEKTRA" set in Space Grotesk, all caps, weight 600.
- Tight tracking (-0.03em) to feel like a single engineered word.
- Mark sits to the left of the logotype with a gap equal to one stroke width.

### Color

- Dark background: mark and logotype in `--color-text-primary` (#F5F4EF).
- Light background: mark and logotype in `--color-bg-primary` (#0D0D0C).
- Accent version: mark in `--color-accent` (#00F5D4) for signal/loading states.

## Animation

The mark resolves like a signal locking into focus:

1. Crossbar draws itself from center outward (300ms).
2. Diagonal strokes draw from the crossbar endpoints down to the vertex (400ms each, slight stagger).
3. Central node appears with a short glow pulse (200ms).
4. Logotype fades in and tracks slightly inward (300ms).

Total duration: ~1.6s. Runs once. No loop. Implemented with SVG stroke-dashoffset / CSS animations.

## Size checks

- **240px wide (desktop header):** Full mark + logotype. All details readable.
- **80px wide (mobile nav):** Mark + condensed logotype, or mark alone if space is tight.
- **32px wide (favicon):** Standalone mark (`logo-mark.svg`). The simplified geometry holds because strokes are uniform and the central node remains visible as a distinct dot. If necessary at 16px, the crossbar and node are preserved; only the logotype is dropped.
