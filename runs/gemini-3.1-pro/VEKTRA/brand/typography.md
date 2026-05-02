# VEKTRA Typography Rationale

## 1. JetBrains Mono (Monospace)
JetBrains Mono was selected for its extreme developer precision and beautiful geometric structure. It represents the "code and logic" aspect of VEKTRA. We use it not just for code blocks, but at display sizes (up to 80px) to proudly display the underlying structural nature of the product, honoring the aesthetic of a technical terminal that someone fell in love with.

## 2. Inter (Grotesque Sans)
Inter serves as the ultimate neutral, disciplined workhorse for the brand. Because the monospace font and the electric vermillion accent color carry so much personality, the body copy and UI elements need to be completely ego-free. Inter is highly legible down to 11px, ensuring that technical documentation and interface controls feel professional and out of the way.

## CDN Imports
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

## Type Scale
- **xs (11px)**: Labels, captions, small metadata.
- **sm (14px)**: Secondary UI, code snippets.
- **base (16px)**: Body copy, documentation text. (Line height: 1.6)
- **md (18px)**: Intro paragraphs.
- **lg (24px)**: Subheaders, section titles.
- **xl (32px)**: Medium display text.
- **2xl (48px)**: Large headlines.
- **3xl (64px)**: Hero display type.
- **4xl (80px)**: Massive hero numbers / core concepts. (Line height: 1.1)
