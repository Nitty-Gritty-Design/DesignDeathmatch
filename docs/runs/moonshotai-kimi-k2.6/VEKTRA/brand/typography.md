# VEKTRA Typography System

## Typeface 1: IBM Plex Mono

**Rationale:** VEKTRA treats code and signal as a single medium. IBM Plex Mono is an open-source typeface designed by IBM with engineering precision and unexpected warmth — its large x-height and carefully tuned italics make it beautiful at display sizes (64px+) while remaining brutally legible at 11px. Using a monospace face for headlines is a deliberate VEKTRA move: it announces that this is a company comfortable letting code typography into its identity.

- **Weights used:** 400 (Regular), 500 (Medium), 700 (Bold)
- **CDN:** `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap`

## Typeface 2: Space Grotesk

**Rationale:** Space Grotesk is a proportional sans-serif with slightly unconventional proportions — rounded corners on select terminals, a geometric skeleton with grotesque DNA. It feels like it was designed by engineers who also make music. At 11px it is disciplined and dense; at large sizes it has a quiet strangeness that prevents VEKTRA from feeling like another SaaS template. It pairs with IBM Plex Mono without competing, creating a hierarchy between "signal" (mono) and "form" (sans).

- **Weights used:** 400 (Regular), 500 (Medium), 700 (Bold)
- **CDN:** `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap`

---

## Type Scale

All sizes in rem (base 16px). Line heights unitless.

| Token | Size | Line Height | Weight | Font | Usage |
|-------|------|-------------|--------|------|-------|
| `text-11` | 0.6875rem (11px) | 1.4 | 400/500 | Sans | Captions, timestamps, labels |
| `text-13` | 0.8125rem (13px) | 1.5 | 400/500 | Sans | UI elements, small body |
| `text-14` | 0.875rem (14px) | 1.5 | 400 | Sans | Body text, descriptions |
| `text-16` | 1rem (16px) | 1.6 | 400 | Sans | Primary body, paragraphs |
| `text-18` | 1.125rem (18px) | 1.4 | 400/500 | Sans | Lead paragraphs, large UI |
| `text-20` | 1.25rem (20px) | 1.3 | 500 | Sans | Subheadings, feature titles |
| `text-24` | 1.5rem (24px) | 1.2 | 500 | Sans | Section headings (mobile) |
| `text-32` | 2rem (32px) | 1.1 | 500/700 | Sans | Section headings |
| `text-48` | 3rem (48px) | 1.05 | 700 | Sans | Large section headings |
| `text-64` | 4rem (64px) | 1.0 | 700 | Mono | Display headlines, hero words |
| `text-80` | 5rem (80px) | 0.95 | 700 | Mono | Hero display, maximum impact |

### Editorial rules
- Hero display (`text-80`) is ALL CAPS, tracked tight (`letter-spacing: -0.02em`).
- Mono headlines use `font-weight: 700`, `text-transform: uppercase`.
- Body text maximum measure: 66 characters (`max-width: 66ch`).
- Labels and captions use `text-transform: uppercase`, `letter-spacing: 0.08em`.
