# VEKTRA Logo Concept

## Concept statement

The VEKTRA mark is built from a single continuous line — a stroke that oscillates, deflects, and resolves. It suggests a waveform, a vector, a signal trace on an oscilloscope, without being a literal representation of any of them. The mark reads as both a "V" (the initial letterform) and an abstract signal glyph. It should feel like it was plotted by an algorithm, not drawn by a hand.

## Geometry

### The mark

The primary mark is formed by a continuous polyline that begins at the top-left, descends diagonally to the bottom-center (forming the left stroke of the V), then ascends diagonally to the top-right (forming the right stroke). But the line does not travel directly — it oscillates with three visible nodes between the start and the vertex, and two visible nodes on the ascent. The oscillation amplitude is subtle — just enough to register as a signal, not a zigzag.

The line thickness is uniform, giving it the character of a plotted trace or a wireframe rendering. The stroke weight is tuned so that the mark reads clearly at 32px width while maintaining visual substance at 240px.

The vertex — the bottom point where the line changes direction — is marked by a small circular node. This node uses the accent color and serves as the focal point of the mark. It suggests a source: the point where a signal originates, where a vector begins.

### The logotype

"VEKTRA" is set in JetBrains Mono, 700 weight, with tight letter-spacing (-0.02em). The word sits to the right of the mark with a gap equal to the mark's stroke width multiplied by 4. The logotype is always set in the primary text color.

On small applications (favicon, loading indicator), only the mark is used with the accent-colored vertex node.

### Relationship

The mark and logotype together form a lockup that reads as a single unit. The mark is the signal; the logotype is the annotation. They should never be stacked vertically — always horizontal.

### Animation concept

The animation (for `logo-animated.html`) should unfold as follows:

1. **0–400ms:** The vertex node appears first — a single dot in accent color, centered. Brief pause.
2. **400–2000ms:** The line draws itself outward from the vertex in both directions simultaneously, bottom-to-top. The left arm ascends toward top-left, the right arm toward top-right. The drawing speed is not linear — it accelerates slightly, as if a system is resolving a computation.
3. **2000–2800ms:** The logotype fades in from left to right, character by character, with a 50ms stagger between each letter.
4. **2800–3200ms:** A subtle "settle" — the mark's opacity pulses once (80% → 100%) as if confirming, then holds.

Total duration: approximately 3.2 seconds. The animation does not loop.

## Size verification

**240px (desktop header):** The mark and logotype retain full fidelity. The stroke weight (2.8px) reads with clarity, the vertex node (4.5px radius) is prominent but not oversized. The oscillation nodes are visible and deliberate.

**80px (mobile nav):** The mark is legible — the V shape reads clearly. The oscillation is still perceptible but reads more as a textured V than a detailed signal trace. The vertex node holds at this scale. The logotype would be approximately 22px font size; this is near the floor for JetBrains Mono at 700 weight but remains legible.

**32px (favicon context):** The standalone mark (logo-mark.svg) holds up. At this scale the V shape reads unambiguously. The oscillation detail compresses into a textured contour — it does not read as noise but as a distinctive profile. The vertex node at this scale is approximately 1.2px radius, which is adequate for a pixel. The mark is minimally viable at 32px — any smaller and the vertex node would disappear. If the logo were to be used at 16px, a simplified version without oscillation (pure V with vertex node) would be recommended.

