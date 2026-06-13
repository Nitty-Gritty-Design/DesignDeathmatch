# Typography

## Typeface Selection

### Space Mono (Monospace)
**CDN:** `https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap`

Space Mono occupies the monospace slot because it has enough personality to work at display scale while remaining rigorously fixed-width. Most monospace faces either look like they belong in a terminal or they look like they're pretending not to — Space Mono sits in the tension between those poles. Its slightly wide proportions and distinctive letterforms (the hooked 't', the angular 'v') give it a warmth that technical monospace usually sacrifices. For VEKTRA, this warmth matters: the product is precise but not cold, and a monospace that feels alive at 64px is a monospace that understands signal as something aesthetic, not just functional.

### Space Grotesk (Sans)
**CDN:** `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap`

Space Grotesk is the sans-serif counterpart designed to share DNA with Space Mono — same geometric skeleton, same foundry (Colophon Foundry for Google). Choosing a paired family isn't laziness; it's a VEKTRA move. Everything connects. The grotesk works at 11px because its x-height is generous and its counters are open, and it works at 48px because its geometry has just enough irregularity to feel human. It doesn't compete with the monospace at display sizes — it complements it. Body text in the grotesk, headlines that need impact in the mono.

---

## Type Scale

| Token              | Size   | Weight | Line Height | Usage                        |
|--------------------|--------|--------|-------------|------------------------------|
| `--text-display`   | 80px   | 700    | 1.05        | Hero statements, mono only   |
| `--text-h1`        | 56px   | 700    | 1.1         | Section headers              |
| `--text-h2`        | 40px   | 600    | 1.15        | Sub-section headers          |
| `--text-h3`        | 28px   | 600    | 1.2         | Card titles, feature names   |
| `--text-h4`        | 20px   | 500    | 1.3         | Emphasized body, UI labels   |
| `--text-body-lg`   | 18px   | 400    | 1.65        | Lead paragraphs              |
| `--text-body`      | 16px   | 400    | 1.65        | Default body text            |
| `--text-small`     | 14px   | 400    | 1.5         | Secondary text, captions     |
| `--text-caption`   | 12px   | 400    | 1.4         | Metadata, timestamps         |
| `--text-label`     | 11px   | 500    | 1.3         | Tags, badges, mono labels    |

---

## Typographic Rules

1. **Monospace at display size** is a VEKTRA signature. Use `--font-mono` for hero headlines and any type that should read as "system output."
2. **Maximum line length:** 65ch for body text. No line should exceed 80ch.
3. **Letter spacing:** Mono at display sizes gets `-0.02em`. Sans at label sizes gets `+0.04em`.
4. **Never use the sans at sizes above `--text-h2`** — above 40px, switch to mono.
