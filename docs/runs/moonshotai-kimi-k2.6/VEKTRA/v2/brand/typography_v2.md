# VEKTRA Typography System — v2

## Typeface 1: IBM Plex Mono

**Rationale:** VEKTRA is a company whose medium is code. IBM Plex Mono is not merely a utility font — it is a designed object that carries the authority of mid-century technical documentation and the warmth of contemporary open-source culture. At 96px it becomes architecture; at 11px it becomes instrumentation. Its italics are genuinely beautiful, which matters because VEKTRA's interface will show live code. We use it for headlines precisely because it is unexpected — a monospace display treatment signals that this brand treats code as a first-class material, not a hidden implementation detail.

- **Weights:** 400 (Regular), 500 (Medium), 700 (Bold)
- **CDN:** `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap`

## Typeface 2: Space Grotesk

**Rationale:** Space Grotesk occupies the rare space between geometric purity and human irregularity. Its letterforms are built on a grid but deviate just enough to feel alive — the 'g' has personality, the 't' is slightly too tall, the rounds are not perfect circles. This makes it the ideal counterpart to IBM Plex Mono's mechanical discipline. It carries the Swiss tradition into territory that feels slightly alien, which is exactly where VEKTRA lives. At small sizes it is dense and legible; at large sizes it reveals its strangeness.

- **Weights:** 400 (Regular), 500 (Medium), 700 (Bold)
- **CDN:** `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap`

---

## Modular Type Scale

Derived from a ratio of 1.25 (major third) with manual adjustments at the extremes for editorial impact. All sizes in rem (base 16px). Line heights are unitless.

| Token | Size | Line Height | Weight | Font | Letter-spacing | Usage |
|-------|------|-------------|--------|------|----------------|-------|
| `text-11` | 0.6875rem (11px) | 1.35 | 400/500 | Mono/Sans | +0.06em | Micro labels, timestamps, technical indices |
| `text-12` | 0.75rem (12px) | 1.4 | 400 | Sans | 0 | Small UI, captions |
| `text-14` | 0.875rem (14px) | 1.5 | 400 | Sans | 0 | Body compact, dense lists |
| `text-16` | 1rem (16px) | 1.6 | 400 | Sans | -0.01em | Primary body, paragraphs |
| `text-18` | 1.125rem (18px) | 1.45 | 400/500 | Sans | -0.01em | Lead paragraphs, large UI |
| `text-20` | 1.25rem (20px) | 1.35 | 500 | Sans | -0.015em | Subheadings, feature titles |
| `text-24` | 1.5rem (24px) | 1.25 | 500 | Sans | -0.02em | Section headings (mobile) |
| `text-32` | 2rem (32px) | 1.15 | 500/700 | Sans | -0.02em | Section headings |
| `text-40` | 2.5rem (40px) | 1.1 | 700 | Sans | -0.025em | Large statements |
| `text-56` | 3.5rem (56px) | 1.0 | 700 | Mono | -0.03em | Display headlines |
| `text-72` | 4.5rem (72px) | 0.95 | 700 | Mono | -0.03em | Hero words |
| `text-96` | 6rem (96px) | 0.9 | 700 | Mono | -0.04em | Maximum display, full-bleed headlines |

### Editorial rules (v2)
- Hero display (`text-96`) is ALL CAPS, tracked tight. It should feel like it was stamped.
- Mono headlines at display sizes use `font-weight: 700`, `text-transform: uppercase`, and a subtle `text-shadow: 0 0 40px var(--color-accent-glow)` when appropriate.
- Body text maximum measure: 64 characters (`max-width: 64ch`). VEKTRA's content is precise; lines should not wander.
- Labels and micro text use `text-transform: uppercase`, `letter-spacing: 0.06em`, and are always in the monospace face.
- A `text-balance` class should be applied to all display headlines to prevent widows.
