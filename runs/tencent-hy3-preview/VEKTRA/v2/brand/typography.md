# VEKTRA v2 Typography — Premium Refinement

## Typeface Selection (Unchanged for Brand Consistency)
### Inter (Sans-serif)
**Rationale:** Inter remains the disciplined geometric grotesque that balances technical precision with readability. v2 refines its usage with tightened letter-spacing (-0.02em for display sizes) and expanded weight range (300–700) for deeper hierarchy. Available on Google Fonts, open-source.

### Space Mono (Monospace)
**Rationale:** Space Mono’s architectural quality is elevated in v2 by using its 700 weight exclusively for display sizes (48px+) and 400 for UI labels, creating starker contrast between expressive and precise use. Available on Google Fonts.

## CDN Import (Expanded Weights)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

## Refined Type Scale (Editorial Range)
| Token | Size | Line Height | Weight | Letter-Spacing | Usage |
|-------|------|-------------|--------|----------------|-------|
| --text-caption | 11px | 1.2 | Inter 300 | 0.04em | Footnotes, fine print |
| --text-label | 12px | 1.3 | Inter 400 | 0.02em | UI labels, captions |
| --text-body-sm | 14px | 1.5 | Inter 400 | 0 | Small body text |
| --text-body | 16px | 1.6 | Inter 400 | 0 | Primary body text |
| --text-subheading | 20px | 1.4 | Inter 500 | -0.01em | Subheadings |
| --text-heading | 24px | 1.3 | Inter 600 | -0.02em | Section headings |
| --text-display-sm | 32px | 1.2 | Space Mono 700 | -0.03em | Display small |
| --text-display-md | 48px | 1.1 | Space Mono 700 | -0.04em | Display medium |
| --text-display-lg | 64px | 1.1 | Space Mono 700 | -0.05em | Display large |
| --text-hero | 80px | 1.05 | Space Mono 700 | -0.06em | Hero display (tightened for impact) |

## Expanded Usage Guidelines
- **Display sizes (32px+):** Space Mono 700, tight letter-spacing, always sentence case for logotype, uppercase for UI alerts
- **Body text:** Inter 400, relaxed line-height (1.6) for readability in long-form content
- **UI labels:** Inter 400/500, 12px, uppercase, 0.02em letter-spacing for technical precision
- **Code blocks:** Space Mono 400, 14px, 1.5 line-height, 2px padding, accent-colored line numbers
