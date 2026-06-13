# VEKTRA Typography System

## Selected Typefaces

### 1. Space Grotesk (Primary Sans-Serif)
* **Import Link**: `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');`
* **Rationale**: Space Grotesk is chosen for its bold, raw technical details and structural ink-traps that give the brand a brutalist, designed feel. It sits perfectly in the tension between pure, functional geometric grotesque and expressive, off-beat personality. It provides immediate visual authority for large display headlines, whilst retaining clarity when styled down for buttons and functional interface navigation labels.

### 2. IBM Plex Mono (Primary Monospace)
* **Import Link**: `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');`
* **Rationale**: IBM Plex Mono is an engineering-first typeface that represents the code-driven essence of VEKTRA's generative environment. By treating code as a first-class aesthetic medium, this font is used not only for code blocks and terminal elements, but also at giant display sizes to anchor VEKTRA's branding in mathematical rigor. It combines precise spacing with humanistic design details, capturing the warmth within modular, digital sound signals.

---

## Typographic Scale & Hierarchy

| CSS Variable | Font Family | Size (rem/px) | Font Weight | Line Height | Usage Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--size-6xl` | `var(--font-mono)` | `5.0rem` / `80px` | `var(--weight-bold)` | `1.1` | Ultra display, heroic branding, numeric signals |
| `--size-5xl` | `var(--font-sans)` | `4.5rem` / `72px` | `var(--weight-bold)` | `1.1` | Primary hero display headlines |
| `--size-4xl` | `var(--font-sans)` | `3.5rem` / `56px` | `var(--weight-semibold)` | `1.15` | Large landing section headings |
| `--size-3xl` | `var(--font-sans)` | `2.5rem` / `40px` | `var(--weight-semibold)` | `1.15` | Subsection headers, container titles |
| `--size-2xl` | `var(--font-mono)` | `2.0rem` / `32px` | `var(--weight-medium)` | `1.2` | Technical section titles, callouts |
| `--size-xl` | `var(--font-sans)` | `1.5rem` / `24px` | `var(--weight-medium)` | `1.3` | Card headers, primary intro text |
| `--size-lg` | `var(--font-sans)` | `1.25rem` / `20px` | `var(--weight-regular)` | `1.4` | Pull quotes, feature subheaders |
| `--size-md` | `var(--font-mono)` | `1.125rem` / `18px` | `var(--weight-regular)` | `1.5` | Code specimens, inline commands |
| `--size-base` | `var(--font-sans)` | `1.0rem` / `16px` | `var(--weight-regular)` | `1.5` | Primary body copy |
| `--size-sm` | `var(--font-sans)` | `0.9375rem` / `15px`| `var(--weight-regular)` | `1.5` | Secondary description, list items |
| `--size-xs` | `var(--font-mono)` | `0.875rem` / `14px` | `var(--weight-regular)` | `1.5` | Technical data columns, secondary labels |
| `--size-2xs` | `var(--font-sans)` | `0.75rem` / `12px` | `var(--weight-medium)` | `1.3` | Buttons, navigation links, small badges |
| `--size-3xs` | `var(--font-mono)` | `0.625rem` / `10px` | `var(--weight-medium)` | `1.0` | Micro data points, timestamps, axis lines |
