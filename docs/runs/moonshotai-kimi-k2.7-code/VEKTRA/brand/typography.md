# VEKTRA Typography

## Typefaces

### 1. Space Grotesk — primary sans

**Rationale:** Space Grotesk carries the right tension for VEKTRA: it is geometric and disciplined enough to set tiny UI labels without falling apart, yet its slightly irregular proportions and curious letterforms (the pointed 'V', the square-ish terminals) keep it from feeling like a generic tech sans. It reads as designed rather than defaulted, and it pairs naturally with monospace without looking like a contrast pairing — more like two instruments in the same ensemble.

**Use:** headlines, body text, UI labels, navigation, buttons.

**CDN:**
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 2. JetBrains Mono — primary mono

**Rationale:** JetBrains Mono was drawn to be read as code, but its open forms, distinctive italics, and generous x-height make it beautiful at display sizes. For VEKTRA — a company that treats code as a creative medium — letting a monospace face into headline territory is the right move. It signals "this is inspectable" without looking like a retro terminal affectation.

**Use:** code blocks, labels, data readouts, and display headlines where precision is the point.

**CDN:**
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Type scale

| Token | Size | Line height | Weight | Use |
|-------|------|-------------|--------|-----|
| `--text-xs` | 11px | 1.2 | 400/500 | captions, labels, metadata |
| `--text-sm` | 13px | 1.4 | 400/500 | body small, nav links |
| `--text-base` | 16px | 1.5 | 400 | default body |
| `--text-md` | 18px | 1.5 | 400/500 | lead paragraphs |
| `--text-lg` | 24px | 1.3 | 500/600 | section subheads |
| `--text-xl` | 32px | 1.15 | 500/600 | large pull quotes |
| `--text-2xl` | 48px | 1.05 | 600/700 | secondary headlines |
| `--text-3xl` | 64px | 0.95 | 600/700 | display headlines |
| `--text-hero` | 88px | 0.9 | 700 | hero statement (desktop) |

### Notes
- Headlines are tracked tight (-0.02em to -0.04em) for density and impact.
- Body text is set at comfortable measure: max ~72 characters.
- Monospace at display size (`--text-2xl` and up) is used sparingly — usually one word or a phrase, not full sentences.
