# VEKTRA Typography

## Typeface Selections

### Space Grotesk (Sans)
**Source:** [Google Fonts](https://fonts.google.com/specimen/Space+Grotesk) — Open Source, SIL OFL 1.1
**Import:** `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap`

Space Grotesk is a geometric grotesque with a subtle quirk — its terminals are cut at slight angles, giving it a precision that feels engineered rather than decorative. It carries the DNA of the early 20th-century German grotesques (Akzidenz-Grotesk, DIN) but with a contemporary openness that reads beautifully on screen. For VEKTRA, it provides the disciplined sans backbone: body text, UI labels, navigation, and headlines at reading size. Its geometric structure echoes the grid-based thinking of signal processing — every letterform is a calculated shape, not an organic one. It works at 11px for metadata and at 48px for section headers without losing character.

### JetBrains Mono (Monospace)
**Source:** [Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono) — Open Source, SIL OFL 1.1
**Import:** `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap`

JetBrains Mono was designed for code readability, but its real power for VEKTRA is its beauty at display sizes. The ligature-aware design, the distinctive curved 'a' and 'g', the open apertures — these make it feel like a terminal that someone actually cares about. VEKTRA's product is a code-like environment for audio-visual composition, so using the monospace at large sizes (hero headlines, section numbers, the logo wordmark) is a deliberate identity move: the code IS the brand. At small sizes, it handles technical labels, parameter values, and terminal-style UI elements with clarity. The light weight (300) at large sizes creates an unexpected elegance — like a waveform rendered in type.

## Type Scale

| Token | Size (rem) | Size (px at 16) | Weight | Line Height | Use |
|-------|-----------|-----------------|--------|-------------|-----|
| `--type-3xs` | 0.64rem | 10px | 400 | 1.5 | Favicon context labels, timestamps |
| `--type-2xs` | 0.8rem | 13px | 400 | 1.5 | Captions, metadata, badges |
| `--type-xs` | 0.9rem | 14px | 400 | 1.5 | UI labels, nav items, small print |
| `--type-sm` | 1rem | 16px | 400 | 1.5 | Body text (secondary), form inputs |
| `--type-md` | 1.25rem | 20px | 400 | 1.5 | Body text (primary), lead paragraphs |
| `--type-lg` | 1.563rem | 25px | 500 | 1.25 | Subheadings, large body |
| `--type-xl` | 1.953rem | 31px | 500 | 1.2 | Section headers |
| `--type-2xl` | 2.441rem | 39px | 600 | 1.15 | Large section headers |
| `--type-3xl` | 3.052rem | 49px | 700 | 1.1 | Hero sub-headlines |
| `--type-4xl` | 3.815rem | 61px | 700 | 1.05 | Hero headlines (sans) |
| `--type-5xl` | 4.768rem | 76px | 300 | 1.0 | Display monospace (hero wordmark) |

The scale uses a 1.25 ratio (major third) — each step is 1.25× the previous. This creates enough range for editorial hierarchy without the dramatic jumps of a perfect fifth. The monospace display at `--type-5xl` in weight 300 is a VEKTRA signature: large, light, precise, like a signal name on an oscilloscope.

## Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
