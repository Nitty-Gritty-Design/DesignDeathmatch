# VEKTRA — Logo Concept

## The mark

The VEKTRA mark is a **signal vector** — a directional form built from two geometric triangles sharing a common edge, creating a chevron or angular waveform caret. It reads simultaneously as:

- A **vector** pointing in a direction (suggesting motion, direction, signal path)
- A **waveform peak** in cross-section (the highest point of a sinusoidal wave, seen from the side)
- A **graph node** — the kind of vertex you'd see in a patch connection diagram
- The letter **V** abstracted and compressed to its essential geometry

The mark uses **no curves**. Every edge is straight. The geometry is:
- Two right-adjacent triangles sharing a vertical center edge
- Left triangle: slightly wider, angled at approximately 60°
- Right triangle: narrower, angled at approximately 45°
- The asymmetry prevents it reading as a simple play button or chevron
- Total aspect ratio: approximately 1:0.8 (wider than tall)

The mark exists only in two tones: the brand accent (`#E8FF47`) and transparent/white depending on context.

---

## The logotype

**"VEKTRA"** set in JetBrains Mono Bold, uppercase, at a weight that matches the mark's visual mass.

Letter spacing: `0.15em` — wide enough to read as a name, not so wide it becomes airy.

The logotype sits to the **right** of the mark with a gap equal to the mark's cap height. Vertical alignment: optical center (the mark's visual weight center, not its geometric center).

No decorative elements between mark and logotype. The mark does not touch the type.

---

## The relationship

The mark is **never decorative**. It is always functional — it indicates direction, like a cursor or a signal path. When used alone (favicon, loading state), the accent color does the work.

The logotype stands alone when the mark is impractical (plain text contexts, monospace-only environments). In this case: `VEKTRA` in JetBrains Mono Bold, no mark, occasional `_` cursor appended.

---

## The animation

The logo entrance animation runs once, 2.2 seconds total, no loop:

1. **0–300ms:** Mark appears as a single horizontal line (stroke width animation from 0% to 100% along the path) — reads as a signal rising on a scope
2. **300–800ms:** The mark's geometry resolves — the stroke morphs into the filled vector shape with a `clip-path` or `stroke-dashoffset` reveal from left to right
3. **800–1200ms:** The logotype characters appear one-by-one left to right — each character fades in with a 40ms stagger and a 3px upward translation (like characters loading into a terminal buffer)
4. **1200–2200ms:** A brief 80ms "pulse" on the accent color — brightness flickers once at the end, like a system confirming initialization. Then holds.

The animation easing uses `--ease-signal` (`cubic-bezier(0.16, 1, 0.3, 1)`) — fast in, overshooting slightly, then settling. This is the behavior of a signal that arrives with energy and resolves.

---

## Size verification

**240px wide (desktop header):**
- Mark: ~52px wide × ~40px tall
- Logotype: ~180px wide
- Both elements fully legible. Track at `0.15em`. ✓

**80px wide (mobile nav):**
- Mark only (standalone) at ~28px wide
- OR full logo compressed: mark 18px, logotype 52px — "VEKTRA" in Mono at 14px
- At this size, the logotype is still readable in JetBrains Mono Bold due to its tight geometry ✓

**32px wide (favicon context):**
- Mark only. At 32px the mark renders as a bold chevron/vector — two visible triangular masses.
- The asymmetry must hold: the left mass is visibly wider than the right.
- Test: at 32px, the mark must not read as a play button. The slight asymmetry prevents this.
- **Result:** Mark holds at 32px. The accent fill makes it findable in a browser tab. ✓

**Favicon recommendation:** The mark centered on a `#0C0C0E` background square, mark in `#E8FF47`. No border radius.

---

## What the logo is NOT

- Not a play button
- Not a WiFi symbol  
- Not a lightning bolt
- Not the letter V literally
- Not a spaceship or rocket
- It is a signal that found its shape
