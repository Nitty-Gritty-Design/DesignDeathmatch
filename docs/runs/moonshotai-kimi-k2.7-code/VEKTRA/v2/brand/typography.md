# VEKTRA v2 Typography

## Typefaces

### 1. Space Grotesk — primary sans

**Rationale:** For v2, Space Grotesk remains the structural voice of VEKTRA, but it is used with more editorial confidence. Its slightly compressed proportions and angular terminals give it a machined quality that pairs well with generative systems, while the roundness in letters like 'o' and 'a' keeps it from feeling cold. At display sizes it is tracked tightly; at UI sizes it is spaced neutrally for maximum legibility.

**Use:** headlines, body text, UI labels, navigation, buttons.

**CDN:**
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 2. JetBrains Mono — primary mono

**Rationale:** JetBrains Mono is pushed further in v2. It appears not only in code blocks and labels but in large display moments where precision itself becomes expressive. Its distinctive italics and x-height make it beautiful at 56px, and its clear distinction between similar glyphs (0/O, 1/l/I) reinforces VEKTRA's identity as a tool for people who inspect systems.

**Use:** code blocks, labels, data readouts, display headlines, terminal-style passages.

**CDN:**
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Type scale v2

| Token | Size | Line height | Weight | Tracking | Use |
|-------|------|-------------|--------|----------|-----|
| `--v2-text-2xs` | 10px | 1.2 | 500 | 0.08em | micro labels, terminal timestamps |
| `--v2-text-xs` | 11px | 1.3 | 400/500 | 0.06em | captions, metadata, badges |
| `--v2-text-sm` | 13px | 1.4 | 400/500 | 0 | body small, nav links |
| `--v2-text-base` | 15px | 1.55 | 400 | 0 | default body |
| `--v2-text-md` | 17px | 1.5 | 400/500 | -0.01em | lead paragraphs |
| `--v2-text-lg` | 22px | 1.3 | 500/600 | -0.02em | section subheads |
| `--v2-text-xl` | 30px | 1.15 | 500/600 | -0.02em | large statements |
| `--v2-text-2xl` | 40px | 1.05 | 600/700 | -0.03em | secondary headlines |
| `--v2-text-3xl` | 56px | 0.98 | 600/700 | -0.035em | display headlines |
| `--v2-text-4xl` | 72px | 0.95 | 700 | -0.04em | hero words |
| `--v2-text-hero` | clamp(64px, 10vw, 120px) | 0.9 | 700 | -0.045em | hero statement |

### Notes
- Headlines use tight tracking and aggressive line-height for density.
- Body text is capped at ~70 characters per line.
- Monospace display treatments are used for single words or short phrases, never full paragraphs.
- All-caps labels use positive tracking to compensate for the loss of word shape.
