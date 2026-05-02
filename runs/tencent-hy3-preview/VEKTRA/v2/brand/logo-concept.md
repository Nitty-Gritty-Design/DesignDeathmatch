# VEKTRA v2 Logo Concept — Premium Iteration

## Mark Geometry (Vector-Signal Glyph)
The new mark is a closed geometric glyph that merges signal, vector, and node concepts into a single iconic form:
- **Top edge:** 3-peak sine wave (frequency 3, amplitude 12px) forming a stylized crown
- **Right edge:** Diagonal vector line (45° upward) connecting the final wave peak to the baseline
- **Baseline:** Straight horizontal line closing the form, creating a stylized "V" silhouette
- **Center node:** Small 4px dot at the sine wave midpoint, representing the unified graph node
The mark measures 40px tall × 36px wide, optimized for scalability from 32px to 240px.

## Logotype Treatment
- **Typeface:** Space Mono Bold, uppercase
- **Size:** 32px, aligned to mark baseline
- **Kerning:** Custom tracking: -30 between V-E-K, +10 between T-R-A for optical balance
- **Color:** --color-text-primary on dark, --color-bg-primary on light

## Mark-Logotype Relationship
- Mark positioned 24px left of logotype, vertically centered to logotype baseline
- At 80px total width: mark remains full detail, logotype scales to 18px
- At 32px total width: logotype removed, mark simplifies to 2-peak sine + vector + node, node becomes 3px

## Animation Sequence (3.2s total, no loop)
1. **Init Pulse (0–0.4s):** 20px accent glow pulse at mark center, opacity 0→1→0.3
2. **Mark Draw (0.4–2.2s):** Stroke-dasharray animation drawing the glyph clockwise using --ease-signal easing
3. **Logotype Type-in (2.2–3.0s):** Characters appear one-by-one with monospace cursor blink (100ms interval)
4. **Final Glow (3.0–3.2s):** Subtle accent glow pulse on entire mark, opacity 0.3→0.5→0.3

## Size Verification
- 240px wide: Full detail, mark + logotype crisp
- 80px wide: Mark 13px tall, logotype 10px, legible
- 32px wide: Mark only (simplified 2-peak), 16px tall, holds clarity
