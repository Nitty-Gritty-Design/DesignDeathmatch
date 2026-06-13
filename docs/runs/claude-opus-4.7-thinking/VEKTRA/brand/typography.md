# VEKTRA — Typography System

## Typeface Selection

### JetBrains Mono — The Signal Typeface
**Role:** Code, terminal elements, display headlines, the logo logotype, precise labeling.

JetBrains Mono was chosen because it is the most architecturally considered monospace font available under open license. Its distinguishing ligatures and precisely tuned letter-spacing make it beautiful at 80px hero sizes while remaining perfectly functional at 11px in a code block. For VEKTRA — a company whose product is fundamentally about code as creative medium — letting a monospace typeface serve as the identity typeface is not a style choice, it is a statement of values. The increased x-height and geometric construction give it a warmth that most monospace faces lack, which maps directly to VEKTRA's tension between technical rigor and artistic sensibility.

### Inter — The Body Typeface
**Role:** Body text, UI labels, navigation, secondary headings, form elements.

Inter was designed specifically for computer screens at small sizes, with an unusually tall x-height and open apertures that ensure legibility down to 11px — the bottom of VEKTRA's type scale. Its geometric-grotesque skeleton gives it the disciplined, engineered feel that VEKTRA demands, while avoiding the coldness of purely geometric faces like Futura. The variable font axis allows precise weight tuning between 300 and 700, enabling a nuanced typographic hierarchy without introducing a third typeface.

---

## CDN Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Or via CSS `@import` (used in `tokens.css`):
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
```

---

## Type Scale

| Token          | Size   | px  | Weight        | Line Height | Tracking      | Usage                          |
|----------------|--------|-----|---------------|-------------|---------------|--------------------------------|
| `--text-xs`    | 0.6875rem | 11  | 400–500       | 1.3         | 0.04em        | Labels, captions, meta         |
| `--text-sm`    | 0.8125rem | 13  | 400           | 1.4         | 0.02em        | Small body, UI labels          |
| `--text-base`  | 0.9375rem | 15  | 400           | 1.6         | 0em           | Body text, paragraphs          |
| `--text-md`    | 1.125rem  | 18  | 400           | 1.6         | 0em           | Lead paragraphs, emphasis      |
| `--text-lg`    | 1.5rem    | 24  | 600           | 1.3         | -0.01em       | Section headings               |
| `--text-xl`    | 2rem      | 32  | 600           | 1.2         | -0.02em       | Page headings                  |
| `--text-2xl`   | 2.75rem   | 44  | 700           | 1.15        | -0.02em       | Display, large headings        |
| `--text-3xl`   | 3.5rem    | 56  | 700           | 1.1         | -0.02em       | Large display                  |
| `--text-hero`  | 5rem      | 80  | 700           | 1.05        | -0.03em       | Hero headline                  |

---

## Usage Rules

1. **Monospace at display size** is a VEKTRA-specific move. Section headings and hero text should use `JetBrains Mono` to reinforce the code-as-medium identity.
2. **Inter for reading.** Anything longer than two lines of body text uses Inter.
3. **Weight restraint.** Use at most three weights per page: 400 (regular), 500 (medium), 700 (bold). Light (300) reserved for very large display text.
4. **No italic.** VEKTRA's voice is declarative, not emphatic. Use weight or color for emphasis. If italic is absolutely needed (e.g., a book title), use Inter italic sparingly.
5. **Monospace for data.** Numbers, timestamps, coordinates, version strings — always monospace.
