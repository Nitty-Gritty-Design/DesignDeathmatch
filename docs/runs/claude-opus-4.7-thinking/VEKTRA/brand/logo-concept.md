# VEKTRA — Logo Concept

## Design Brief to Self

### The Mark

The VEKTRA mark is a **vectorscope glyph** — a geometric form that suggests what happens when audio and visual signals are plotted against each other in two dimensions. Specifically: a stylized Lissajous-like figure constructed from precisely placed line segments that form an angular, asymmetric shape suggesting both the letter "V" and a signal path.

**Geometry:**
- The mark is built from 5 connected line segments forming an angular, open shape
- The stroke width is uniform — no tapering, no variable weight (this is a signal, not calligraphy)
- The form is not closed — it has entry and exit points, like a signal flowing through a system
- The proportions sit within a square bounding box, but the shape itself is not centered — it has intentional asymmetry, like a waveform at a specific phase
- The angles are deliberate: 60°, 120°, and 150° — no 45° or 90° (those belong to UI, not signal)

**Why this works for VEKTRA:**
- A vectorscope is the literal visual representation of "vector" + "spectra" — the name's etymological territory
- The open-ended form suggests a system that is inspectable, forkable, alive — core VEKTRA values
- The angular construction reads as technical and precise, not decorative
- At small sizes, the mark simplifies to a recognizable angular gesture — like a checkmark's more interesting cousin

### The Logotype

- Set in **JetBrains Mono**, weight 500 (medium)
- All caps: V E K T R A
- Letter-spacing: 0.16em — generous, precise, letting each character breathe like a data readout
- The logotype sits to the right of the mark with exactly one mark-width of spacing between them
- The "V" in the logotype does NOT repeat the mark — they are siblings, not copies

### Mark + Logotype Relationship

When used together, the mark sits left, logotype right, vertically centered. The mark's vertical extent matches the cap height of the logotype. At small sizes (< 120px total width), the mark can be used alone. The logotype is never used without the mark at display sizes.

---

## Animation Concept

**Behavior:** The logo animates as if a signal is being traced through the mark's path in real-time. Each line segment draws itself sequentially, left to right, as if an oscilloscope beam is constructing the form. After the mark completes, the logotype characters appear one by one in monospace rhythm — like a terminal printing a system name.

**Timing:**
- Mark trace: 1200ms total, 240ms per segment, with 0ms gap between segments (continuous)
- Logotype appear: 600ms total, 100ms per character, starting 200ms after mark completes
- Total duration: ~2000ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — fast attack, gentle resolve. Like a signal locking on.

**Feeling:** A system initializing. A signal resolving from noise into form. Not decorative — diagnostic. The kind of animation that would feel at home on a boot screen.

---

## Size Verification

### 240px wide (desktop header)
Full mark + logotype. All detail visible. This is the primary presentation. The mark's angular segments are clearly defined, the logotype's letter-spacing is generous and readable.

### 80px wide (mobile nav)
Mark + abbreviated logotype or mark alone. At this size, the logotype characters begin to crowd. The mark alone carries the identity effectively — the angular gesture is distinct and recognizable.

### 32px wide (favicon context)
Mark only. At 32px, the mark simplifies to its essential gesture — the angular V-like path. The stroke weight should be 2px at this scale to remain visible. The form holds: it reads as a deliberate geometric mark, not a smudge.

**Verdict:** The mark holds at 32px. The open geometry and uniform stroke weight mean it doesn't collapse or fill in at small sizes. The asymmetry helps — it's recognizable by silhouette, not by detail.
