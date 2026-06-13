# Typography — VEKTRA

Two typefaces. That is the entire system. Both are open-source and served from Google Fonts.

---

## The duo

### Sans — **Space Grotesk**
**Why it fits VEKTRA specifically:**
Space Grotesk has a quiet quirk — its terminals are cut at slightly off-grid angles, and its "a" and "e" have humanist warmth inside a geometric skeleton. That tension is exactly VEKTRA's tension: technical precision that isn't cold, expressive form that isn't decorative. It reads as engineered, but never as a system font. Where a body of marketing copy would feel lifeless in Helvetica or Inter, Space Grotesk retains a slight pulse — it was designed for long-form reading on screens, by a Berlin type foundry, which is not nothing.

### Mono — **JetBrains Mono**
**Why it fits VEKTRA specifically:**
JetBrains Mono was drawn for code, but it scales beautifully upward. Its 138% x-height and 8% taller ascenders give the glyphs the "I am a real, discrete, countable thing" character that body text hides. Used at 64–128px it stops looking like a coding font and starts looking like an industrial label — like a display on a piece of test equipment. VEKTRA's product is code-as-medium; JetBrains Mono lets the brand let code typography into its identity without irony.

---

## CDN imports

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## Type scale

| Token        | Size  | Use                                          | Weight        | Tracking     | Line height |
|--------------|-------|----------------------------------------------|---------------|--------------|-------------|
| `--fs-11`    | 11px  | Labels, axis ticks, micro-copy               | 500 mono      | `wide`       | 1.4         |
| `--fs-12`    | 12px  | Tags, badges, monospace metadata             | 400 mono      | `mono`       | 1.4         |
| `--fs-13`    | 13px  | UI body, small descriptions                  | 400 sans      | normal       | 1.5         |
| `--fs-14`    | 14px  | Default UI / nav                             | 500 sans      | normal       | 1.5         |
| `--fs-16`    | 16px  | Body                                         | 400 sans      | normal       | 1.6         |
| `--fs-18`    | 18px  | Lead body                                    | 400 sans      | normal       | 1.6         |
| `--fs-22`    | 22px  | Section eyebrow / pull-quote                 | 500 mono      | `mono`       | 1.4         |
| `--fs-28`    | 28px  | Sub-headline                                 | 500 sans      | `tight`      | 1.2         |
| `--fs-36`    | 36px  | Headline                                     | 500 sans      | `tight`      | 1.15        |
| `--fs-48`    | 48px  | Display                                      | 500 sans      | `tight`      | 1.1         |
| `--fs-64`    | 64px  | Hero / section opener                        | 500 mono      | `tight`      | 1.05        |
| `--fs-88`    | 88px  | Display hero                                 | 500 mono      | `tight`      | 1.0         |
| `--fs-128`   | 128px | Manifesto / poster (rare)                    | 500 mono      | `tight`      | 0.95        |

---

## Pairing rules

1. **Mono is for everything that is structural** — labels, numbers, code, metadata, navigation, the logo, the eyebrows above headlines.
2. **Sans is for reading** — body, headlines at 28–48px, anything someone is meant to parse at speed.
3. **The mono-at-display move is a VEKTRA signature.** Section openers (`--fs-64`–`--fs-88`) are set in mono. This is the brand's "moment" — it tells the reader "this is a system, not a brochure."
4. Italic mono is reserved for inline annotations, signals ("// live"), and technical asides.

## Never do

- Don't set body in mono at sizes below 14px.
- Don't mix more than 2 weights per typeface per screen.
- Don't use serif. There are no serifs in VEKTRA.
