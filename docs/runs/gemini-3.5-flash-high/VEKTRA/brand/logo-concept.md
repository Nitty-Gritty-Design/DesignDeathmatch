# VEKTRA Logo Concept & Design Brief

This document serves as the internal design specification for the VEKTRA logo system, detailing its geometry, typographic configuration, and animation behavior.

---

## 1. Geometry of the Mark
The VEKTRA mark is a minimalist vector glyph representing the intersection of time, signal, and geometry. 

- **The V-Core**: A sharp, asymmetrical letter "V" forms the foundation, symbolizing velocity and vector coordinates.
- **The Wave Impulse**: The right-hand diagonal stroke of the "V" does not end abruptly. Instead, it fractures into a tight, stylized wave pulse—a visual signature of audio frequencies and time-series data.
- **The Coordinate Node**: A single, precise circular dot sits at the terminal tip of the signal wave. It anchors the mark, representing an active node in a signal graph, a cursor point in a compiler, or a single voltage source.

The entire mark is drafted on a strict 45-degree and 90-degree grid. It does not use organic curves; the waveform is composed of rapid, sharp, digital-step oscillations.

---

## 2. Typographic Logotype
The wordmark **VEKTRA** is rendered in all uppercase.
- **Font Face**: Space Grotesk (configured with bold weight and customized letter spacing).
- **Spacing**: Generous letter-spacing (`0.15em`) is applied to give the logotype a spacious, museum-like quality, offsetting the high density of the mark itself.
- **Alignment**: The height of the logotype perfectly matches the baseline and x-height of the main V-Core within the mark.

---

## 3. Relationships & Variants
- **Horizontal Combination (Primary)**: The mark sits on the left, separated from the logotype by a thin, vertical technical divider line (`--color-border`). Used for headers and primary desktop layouts.
- **Stacked Combination**: The mark is centered above the logotype. Used for splash pages and merchandise.
- **Standalone Mark**: The mark is used in isolation at small scales (e.g., 32px favicon, profile pictures, mobile nav headers, and active state indicators).

---

## 4. Initialization Animation (The Signal Resolve)
The animated version of the logo (`logo-animated.html`) mimics the boot sequence of a vector oscilloscope or a high-precision digital synthesizer:

1. **Step 1: Focus (0.0s – 0.5s)**: A single green-lime coordinate dot appears in the center, pulsing twice to simulate a CRT beam warming up.
2. **Step 2: Trace (0.5s – 1.8s)**: From the coordinate dot, a sharp vector line draws itself backward, tracing the V-shape using a high-velocity ease-out curve (`cubic-bezier(0.16, 1, 0.3, 1)`).
3. **Step 3: Modulate (1.8s – 3.0s)**: The sharp wave impulse on the right arm of the V oscillates rapidly as if receiving a high-frequency voltage, before settling into its final resting state.
4. **Step 4: Lock (3.0s – 3.5s)**: The logotype text "VEKTRA" fades in letter-by-letter with a subtle scanline effect. The system is initialized. The animation halts completely and does not loop.

---

## 5. Size and Legibility Verification
To ensure the logo functions at all critical scales:
- **Large (240px wide)**: The technical lines are sharp; the waveform segments are clearly resolved; the dot behaves as a focal point.
- **Medium (80px wide)**: The waveform segments remain legible. The contrast between the thick V-core and thin waveform line is readable.
- **Small (32px wide)**: The logotype is hidden. The standalone mark is simplified: the waveform is reduced to a single, bold diagonal stroke terminating at the coordinate dot, ensuring it remains recognizable even in the browser tab favicon.
- **Status Check**: Verified. The SVG mark uses proportional stroke widths (`stroke-width: 2`) that hold up perfectly at 32px without blurring or losing detail.
