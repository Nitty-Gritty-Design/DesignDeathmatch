# VEKTRA v2 — Typography System

## Selection Rationale

### JetBrains Mono — Primary monospace (kept from v1, elevated)

JetBrains Mono remains the monospace choice for v2 — not out of inertia, but because no open-source monospace achieves its combination of code-optimized legibility and display-scale elegance. The v2 elevation comes from how it is deployed: where v1 used it at headline scale as a novelty, v2 treats it as a compositional rhythm. Monospace blocks appear in the layout the way code comments appear in a well-written source file — punctuating, annotating, structuring.

The font has been subset to Regular (400), Medium (500), and Bold (700) weights with italic variants. The italic `a` and `g` are single-story, giving code comments a handwritten signal quality that contrasts against the machine precision of the regular weight.

### Space Grotesk — Secondary sans (kept from v1, refined)

Space Grotesk remains because it is one of the few geometric sans-serifs that feels neither corporate (Inter) nor decorative (Poppins). In v2, the type scale has been recalculated on a major third (1.25× ratio) rather than the arbitrary scale of v1, giving every size jump a mathematical relationship. The result is a hierarchy where headings cascade with the same inevitability as a harmonic series.

## CDN Imports

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## Type Scale (Major Third, 1.25 ratio, base 16px)

| Token | Size | Weight | Leading | Tracking | Primary Use |
|---|---|---|---|---|---|
| `--text-2xs` | 10px / 0.625rem | 400 | 1.5 | 0 | Keyboard shortcuts, minimum labels |
| `--text-xs` | 12px / 0.75rem | 400 | 1.5 | 0 | Captions, metadata, form hints |
| `--text-sm` | 14px / 0.875rem | 400 | 1.5 | -0.01em | Secondary nav, code annotations |
| `--text-base` | 16px / 1rem | 400 | 1.65 | -0.01em | Body text, descriptions |
| `--text-lg` | 18px / 1.125rem | 400 | 1.65 | -0.01em | Lead paragraphs |
| `--text-xl` | 20px / 1.25rem | 500 | 1.4 | -0.01em | Card titles, UI heading |
| `--text-2xl` | 24px / 1.5rem | 500 | 1.3 | -0.02em | Section subheads, h4 |
| `--text-3xl` | 30px / 1.875rem | 600 | 1.2 | -0.02em | Section headings, h3 |
| `--text-4xl` | 40px / 2.5rem | 600 | 1.15 | -0.03em | Major sections, h2 |
| `--text-5xl` | 52px / 3.25rem | 700 | 1.1 | -0.03em | Page titles, h1 |
| `--text-6xl` | 68px / 4.25rem | 700 | 1.05 | -0.04em | Display use |
| `--text-7xl` | 88px / 5.5rem | 700 | 1.0 | -0.04em | Hero headline |

## Monospace Deployment Rules (v2)

1. **Overlines**: Always `--text-xs` (12px), JetBrains Mono Medium (500), all-caps, `tracking-overline` (0.12em), accent color.
2. **Inline code**: JetBrains Mono Regular (400) at parent size, `--color-accent-dim` background, 2px horizontal padding.
3. **Code blocks**: JetBrains Mono Regular at `--text-xs` (12px), 1.6 leading, with syntax tokens.
4. **Display monospace**: JetBrains Mono Bold (700) at `--text-6xl` or `--text-7xl`. Used in exactly one location per page — the hero, or a "terminal moment." This204 is not a default headline treatment; it is a deliberate statement.
5. **Data labels**: JetBrains Mono at `--text-2xs` (10px) for axis labels, parameter displays, numeric readouts.

## The Terminal Moment

The single most important typographic rule in v2: the monospace-at-display-scale treatment appears *once* per page, and never in the style guide (which shows it as a specimen, not as a layout). This restraint transforms it from a design choice into a signature — when you see JetBrains Mono at 68px, you know you are on a VEKTRA page.