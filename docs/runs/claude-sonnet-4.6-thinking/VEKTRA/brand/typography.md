# VEKTRA — Typography System

## Typeface 1: JetBrains Mono

**Role:** Monospace — code, terminal elements, precise labeling, and display headlines

**Rationale:** JetBrains Mono was designed for reading code for hours without fatigue — which means it is exceptionally legible at small sizes, but it also has constructed, almost mechanical letterforms that hold their geometry at display sizes. For VEKTRA specifically, using the tool's own typography as a headline font makes a statement: the code is not separate from the work, it *is* the work. The ligature system creates a visual rhythm at large sizes that resembles a waveform or patch connection — accidental but appropriate.

**CDN Import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
```

**Usage sizes:**
- `96px / weight 700` — Hero display headline (used monospace for maximum strangeness)
- `64px / weight 500` — Large section marker
- `14px / weight 400` — Code blocks, terminal output
- `12px / weight 400` — Labels, metadata, version strings
- `11px / weight 400` — Captions, timestamps

---

## Typeface 2: DM Sans

**Role:** Geometric grotesque — body text, UI elements, navigation, headings at reading size

**Rationale:** DM Sans is geometric without being cold. Its rounded apertures and slightly humanist construction make it readable at 11px in a dense UI panel while also functioning at 36px as a confident section header. For VEKTRA, this tension — between the mechanical precision of the monospace and the warmer geometry of DM Sans — replicates the brand's core tension: scientific instrument built by an artist. DM Sans has no personality that competes with the content; it *disappears* into the text, which is exactly what the body typeface should do.

**CDN Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet">
```

**Usage sizes:**
- `22px / weight 400` — Section intro paragraph
- `18px / weight 400` — Body large
- `16px / weight 400` — Body default
- `14px / weight 500` — UI label, nav item
- `13px / weight 500` — Button text
- `11px / weight 500` — Small tag, badge

---

## Type Scale

| Token          | Size   | Weight | Font      | Leading | Use |
|----------------|--------|--------|-----------|---------|-----|
| `--text-6xl`   | 96px   | 700    | Mono      | 1.0     | Hero display (monospace hero treatment) |
| `--text-5xl`   | 80px   | 700    | Mono      | 1.05    | Section hero |
| `--text-4xl`   | 64px   | 500    | Mono      | 1.1     | Large section marker |
| `--text-3xl`   | 48px   | 600    | DM Sans   | 1.1     | H1 heading |
| `--text-2xl`   | 36px   | 600    | DM Sans   | 1.2     | H2 heading |
| `--text-xl`    | 28px   | 500    | DM Sans   | 1.25    | H3 heading |
| `--text-lg`    | 22px   | 400    | DM Sans   | 1.5     | Intro paragraph |
| `--text-md`    | 18px   | 400    | DM Sans   | 1.65    | Body large |
| `--text-base`  | 16px   | 400    | DM Sans   | 1.65    | Body default |
| `--text-sm`    | 14px   | 400/500| Mono/Sans | 1.5     | Body small / UI label |
| `--text-xs`    | 12px   | 400    | Mono      | 1.4     | Code, metadata |
| `--text-2xs`   | 11px   | 500    | DM Sans   | 1.3     | Caption, tag, badge |

---

## Typographic principles

1. **Monospace at display size is a VEKTRA-specific move.** No other brand in this space uses their code font as their hero font. This signals: we are not embarrassed by what we are.

2. **Letter spacing varies by role:** Display mono gets `tracking-tight` (`-0.03em`). UI labels get `tracking-wide` (`0.06em`). Navigation gets `tracking-widest` (`0.15em`) in uppercase.

3. **Line length:** Body text maximum 68 characters. Use `max-width: var(--max-width-text)` (680px) on text columns.

4. **Hierarchy without color:** The type scale is strong enough that section structure reads at a glance without relying on color or weight variation alone.

---

## Combined import block (production)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet">
```
