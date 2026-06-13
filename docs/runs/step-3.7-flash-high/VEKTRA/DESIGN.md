# DESIGN.md — Style References & Design Language

## How to use this file

Read these references carefully before making any design decision. Do not copy them — use them to calibrate your aesthetic judgment. Extract the underlying principles, then apply those principles to VEKTRA's specific personality and tension.

The goal is not to look like any of these references. The goal is to understand *why* they work, and then make something that works for VEKTRA.

---

## Reference 1 — Linear
**Mood:** Ultra-minimal · precise · purposeful · single strong accent · dark-first

**What to extract:**
- How a single well-chosen accent color carries an entire identity without decoration
- The discipline of removing anything that doesn't earn its place on screen
- Type hierarchy so clear it functions without color or iconography
- The sense that every pixel placement was a deliberate decision, not a default
- How dark surfaces can feel precise and premium rather than heavy

**What to leave behind:** The SaaS product context, the purple specifically, the startup-tool positioning.

---

## Reference 2 — Vercel
**Mood:** Black and white precision · Geist font system · zero decoration · developer-first

**What to extract:**
- The confidence of near-total monochrome — when you have nothing to hide, you don't need color
- How technical documentation can be typographically beautiful
- The grid as both structure and aesthetic statement
- Code blocks and technical elements treated as design features, not afterthoughts
- Negative space as the primary design material

**What to leave behind:** The deployment/infrastructure context, the corporate scale, the SaaS pricing page energy.

---

## Reference 3 — Framer
**Mood:** Motion-first · bold typographic choices · design-forward · controlled darkness

**What to extract:**
- How motion and animation signal quality when used precisely, not decoratively
- The willingness to make strong, unusual typographic choices
- Transitions that feel designed rather than merely functional
- How a brand can communicate technical capability through visual behavior
- The idea that the interface itself is the demonstration

**What to leave behind:** The website builder positioning, the template marketplace feel, the blue specifically.

---

## Reference 4 — Supabase
**Mood:** Dark emerald theme · code-first · open-source energy · technical confidence

**What to extract:**
- How a non-obvious accent color (not blue, not purple, not red) creates strong differentiation
- The way developer-facing products can feel warm without losing technical credibility
- Code as a first-class design element — monospace type used at display sizes
- The combination of dark backgrounds with carefully considered bright accents
- How documentation and marketing can share the same visual language

**What to leave behind:** The database/backend context, the green specifically (choose your own accent), the startup-growth-hacking energy.

---

## Design token guidance

Based on these references and VEKTRA's brief, your design system should aim for:

### Color
VEKTRA's palette should be built on near-black and near-white with **one electric accent color**. The accent must be:
- Non-obvious (not blue, not red, not green in their common forms)
- Specific enough to be ownable — a particular frequency of color, not a category
- Usable at small scale (a cursor blink, a active state dot) and large scale (a hero element)
- Legible on both dark and light surfaces

Suggested territory (do not default to these — find your own): electric amber, cold cyan, acid lime, deep violet, signal orange. The accent should feel like it was tuned, not chosen.

**Dark surface:** VEKTRA is dark-first. The primary surface is near-black but not pure black — a very dark warm gray or cool gray with a barely perceptible tint. Pure black (#000000) is for type only, not surfaces.

**Light surface:** Also needed for documentation pages and the style guide. The light mode should feel like a technical document — off-white, not white.

### Typography
Two typefaces maximum. VEKTRA's typographic system lives in the tension between:
- A **monospace** typeface — for code, terminal elements, precise labeling, and unexpected display use
- A **geometric or grotesque sans** — for body text, UI, and headlines at reading size

Both must be available on Google Fonts or as open-source. The monospace should be beautiful enough to use at 64px. The sans should be disciplined enough to work at 11px.

Consider: the monospace at large display sizes as a headline treatment. This is a VEKTRA-specific move — a company whose product is code should be comfortable letting code typography into its identity.

**Type scale:** Editorial range. Large headers, generous line height, measured line length. The scale should span from 11px (label/caption) to at least 80px (hero display).

### Motion
VEKTRA is a company that makes things move. The website must demonstrate this.

- Entrance animations: 200–500ms, custom easing curves (not ease-in-out defaults)
- The logo animation should feel like a signal or waveform — something that implies time and frequency
- At least one element on the page should respond to user interaction in a way that feels generative, not just reactive
- The generative background (see TASKS.md wildcard) is the primary motion statement

**Timing philosophy:** VEKTRA's animations should feel like they were specified in milliseconds by someone who thinks about time at the sample level. Precise. Not decorative.

### Layout
- Grid-based but willing to break the grid at one or two moments for dramatic effect
- Terminal/document-like sections (monospace, tight leading, high information density) contrasted with open editorial sections (large type, generous space)
- The page structure should feel like a patch or a signal graph — modules that connect

---

## What good looks like

A designer looking at the finished VEKTRA identity should think: *"I don't know what tools they used, but I know exactly who this is."*

A sound artist discovering VEKTRA's website should think: *"This was made by people who understand my world."*

A developer reading the style guide should think: *"These token names make sense. I could implement this."*

Someone who has never heard of VEKTRA should think: *"I don't fully understand what this does, but I want to."*
