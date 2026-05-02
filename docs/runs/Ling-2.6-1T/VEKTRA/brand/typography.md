# VEKTRA Typography

## Typeface Selection

### Monospace: IBM Plex Mono
**Rationale:** IBM Plex Mono was designed specifically for coding environments and technical interfaces, making it a natural fit for a studio that treats code as a creative medium. Its wide proportions and distinctive glyphs (particularly the zero with a dot, and the clearly differentiated 1/l/I) provide excellent legibility at small sizes while maintaining a mechanical precision that echoes VEKTRA's instrument-like nature. At large display sizes (64px+), the monospace creates an authoritative, terminal-like presence that reinforces the brand's "language" positioning — it looks like the interface through which VEKTRA speaks.

### Sans-serif: Inter
**Rationale:** Inter is a geometric grotesque designed specifically for digital interfaces and screen reading. Its tall x-height and open letterforms provide exceptional legibility at UI sizes (11px–16px), while its subtle geometric construction gives it a technical yet warm character. Unlike colder sans-serifs (like Roboto or Helvetica), Inter has enough personality to feel designed rather than default, yet remains disciplined enough to recede when content takes center stage. It bridges the gap between technical precision and humanist warmth — essential for a brand serving both developers and artists.

## Type Scale

| Size | Weight | Line Height | Use Case | CSS Variable |
|------|--------|-------------|----------|-------------|
| 11px | 400 | 16px | Labels, captions, microcopy | --text-xs |
| 13px | 400 | 20px | Fine print, metadata | --text-sm |
| 15px | 400 | 24px | Body text, UI elements | --text-base |
| 18px | 400 | 28px | Lead paragraphs | --text-lg |
| 24px | 500 | 32px | Section headers | --text-xl |
| 36px | 500 | 44px | Page headers | --text-2xl |
| 64px | 400 | 72px | Display (sans) | --text-3xl |
| 80px | 400 | 88px | Hero display (mono) | --text-4xl |

## Monospace Display Treatment

VEKTRA leverages monospace typography beyond code contexts. The 80px hero display uses IBM Plex Mono to create a distinctive visual signature — treating code typefaces as display type signals confidence in the brand's technical foundation. This approach differentiates VEKTRA from creative tools that hide their technical underpinnings behind friendly, rounded sans-serifs.

## Implementation

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

```css
:root {
  --font-size-xs: 11px;
  --font-size-sm: 13px;
  --font-size-base: 15px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 36px;
  --font-size-3xl: 64px;
  --font-size-4xl: 80px;
  
  --line-height-tight: 1;
  --line-height-normal: 1.5;
  --line-height-loose: 1.75;
}
```