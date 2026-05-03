# VEKTRA Typography

## Typeface Rationale

### JetBrains Mono — Primary monospace

JetBrains Mono is a typeface designed by Philipp Nurullin for JetBrains, released as open-source. It was built specifically for code — but it transcends that context. Its letterforms have a distinctive warmth uncommon in monospace families: the curved terminals on `l`, `t`, and `i` give it personality without sacrificing precision. At 64px it reads like a display face; at 11px it remains crisp and legible. For VEKTRA, a company whose product treats code as a first-class creative medium, JetBrains Mono is not a fallback — it is an identity statement. Using monospace at headline scale is the most VEKTRA typographic move possible: it says "we are comfortable letting our tools into our visual language."

### Space Grotesk — Secondary sans-serif

Space Grotesk is a proportional sans-serif designed by Florian Karsten, based on Colophon Foundry's Space Mono (a fixed-width face). It retains the geometric precision of its monospace ancestor while gaining the readability of a proportional design. Its apertures are slightly tight, its terminals clipped, giving it a faintly algorithmic feel — like a font that was parameterized rather than drawn. This makes it an ideal companion to JetBrains Mono: they share a structural DNA (both descend from a monospace lineage) but serve different typographic roles. Space Grotesk handles body text at 14–18px with clarity, UI labels at 11px without collapsing, and headlines at 32px+ with quiet authority.

## CDN Import Links

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
```

## Type Scale

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `--text-caption` | 11px | 400 | 1.4 | Labels, captions, metadata, keyboard shortcuts |
| `--text-body-sm` | 13px | 400 | 1.5 | Small body, secondary navigation, code annotations |
| `--text-body` | 16px | 400 | 1.6 | Primary body text, descriptions, UI copy |
| `--text-body-lg` | 18px | 400 | 1.6 | Lead paragraphs, feature descriptions |
| `--text-ui` | 14px | 500 | 1.4 | Buttons, navigation items, form labels |
| `--text-h5` | 13px | 700 | 1.3 | Section overlines, small headings (mono) |
| `--text-h4` | 16px | 700 | 1.4 | Card headings, subsection titles |
| `--text-h3` | 24px | 700 | 1.2 | Section headings |
| `--text-h2` | 36px | 700 | 1.1 | Major section headings (sans) / 32px (mono) |
| `--text-h1` | 48px | 700 | 1.05 | Page headings |
| `--text-display` | 64px | 700 | 1.0 | Hero display (mono preferred) |
| `--text-hero` | 80px | 700 | 0.95 | Maximum display size |

Monospace is used at `--text-h5` (overlines), `--text-display` (hero), and optionally `--text-h2` for a technical section heading. Sans-serif is used for everything else.

## Implementation

Add to `tokens.css`:

```css
--text-caption: 0.6875rem;
--text-body-sm: 0.8125rem;
--text-body: 1rem;
--text-body-lg: 1.125rem;
--text-ui: 0.875rem;
--text-h5: 0.8125rem;
--text-h4: 1rem;
--text-h3: 1.5rem;
--text-h2: 2.25rem;
--text-h1: 3rem;
--text-display: 4rem;
--text-hero: 5rem;
```
