# VEKTRA v2 Typography — Editorial Precision

## Typeface Philosophy

VEKTRA's typographic system embodies the tension between **machine precision** and **human expression**. In the world of generative audio-visual instruments, where code becomes canvas and algorithms become artistry, the tools of creation must be visible, legible, and intentional.

## Monospace: IBM Plex Mono

**Rationale:** IBM Plex Mono was engineered specifically for technical environments where every character must be distinguishable at a glance. Its wide, geometric construction provides exceptional clarity at small sizes—critical for developers reading code at 2 AM. The typeface's consistent stroke weight and open counters create a mechanical rhythm that feels like a precision instrument. At display sizes (64px+), IBM Plex Mono transforms from functional tool to sculptural element—its monospace grid becoming a visual texture that references both terminal aesthetics and modernist typography. This is not a font chosen for nostalgia; it's chosen because it *works* at every scale, embodying VEKTRA's ethos that form follows function, but function can be beautiful.

## Sans-serif: Inter

**Rationale:** Inter represents the evolution of screen typography—designed from the ground up for digital interfaces with pixel-perfect alignment. Its generous x-height and open apertures provide superior legibility at UI sizes (11px–16px), while its subtle geometric warmth prevents the coldness common in technical typefaces. Inter's lowercase letters have distinctive shapes (particularly the double-story 'a' and open 'e') that facilitate rapid reading, essential for complex documentation and interfaces. Unlike more stylized sans-serifs, Inter remains neutral enough to support VEKTRA's expressive monospace headlines without competing for attention. It is the calm, capable foundation that lets the system sing.

## Type Scale — Editorial Range

| Size | Weight | Line Height | Use Case | CSS Variable |
|------|--------|-------------|----------|-------------|
| 9px | 400 | 14px | Micro-labels, timestamps | --font-size-micro |
| 10px | 400 | 14px | Fine print, metadata | --font-size-xs |
| 12px | 400 | 18px | Captions, secondary UI | --font-size-sm |
| 14px | 400 | 21px | Body text, primary UI | --font-size-base |
| 16px | 400 | 24px | Lead paragraphs | --font-size-lg |
| 20px | 500 | 28px | Section headers | --font-size-xl |
| 28px | 500 | 36px | Page headers | --font-size-2xl |
| 40px | 400 | 48px | Display (sans) | --font-size-3xl |
| 64px | 400 | 72px | Hero display (mono) | --font-size-4xl |
| 88px | 400 | 96px | Statement (mono) | --font-size-5xl |
| 120px | 400 | 120px | Monumental (mono) | --font-size-6xl |

## Display Typography Strategy

VEKTRA deliberately pushes monospace typefaces into display territory—a rarity in brand design. This choice signals confidence in the brand's technical foundation and differentiates from creative tools that obscure their computational nature behind friendly, rounded forms. The 88px and 120px scales use IBM Plex Mono not as code, but as architecture—each character a column in a structure that supports meaning through rhythm and proportion.

## Implementation

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

```css
:root {
  --font-mono: 'IBM Plex Mono', monospace;
  --font-sans: 'Inter', sans-serif;
  --font-display: 'IBM Plex Mono', monospace;
}
```