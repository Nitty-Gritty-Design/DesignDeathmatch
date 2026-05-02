# VEKTRA Typography Selection V2

## Primary Typeface: Inter (Variable)
**Rationale:** We use the variable version of Inter to allow for precise control over weight and tracking. It maintains the absolute clarity required for a technical instrument while providing the flexibility for editorial "expressive scale."

## Technical Typeface: IBM Plex Mono
**Rationale:** In V2, the monospace is no longer just for labels. It is used as a structural element. The "Parametric Logo" metadata is set in IBM Plex Mono at 8px, emphasizing the microscopic precision of the VEKTRA engine.

## Type Scale V2 (Fluid)
- **Display:** `clamp(4rem, 10vw, 9rem)` / 0.9 leading — Brutalist Hero headlines
- **XL:** `clamp(2rem, 5vw, 4rem)` / 1.1 leading — Section Entry
- **Body:** `1rem` / 1.5 leading — Optimized for technical readability
- **Metadata:** `8px` / 1.0 leading — High-density information blocks

## CSS Implementation
```css
--text-display: clamp(4rem, 10vw, 9rem);
--font-mono: 'IBM Plex Mono', monospace;
```
