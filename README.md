# DesignDeathmatch
# LLM Creative Design Benchmark Framework

## Overview
A benchmark for evaluating large language models on creative design tasks. Models autonomously build a complete brand identity for VEKTRA, a fictitious Berlin-based generative audio-visual instrument studio.

## What this measures
- Design taste — genuine aesthetic judgment vs technical execution
- Brand coherence — unified visual language across deliverables
- Creative ambition — interpretation vs literal execution
- Technical expressiveness — live, interactive, animated output
- Autonomous execution — completion without intervention
- Efficiency — deliverables per tool call

## Quick Start

1. **Run the benchmark:**
   ```bash
   ./setup_run.bat
   ```
   Enter the LLM name when prompted. The script creates an isolated workspace.

2. **Open in VS Code** with your AI assistant installed.

3. **Send this exact prompt:**
   ```
   Read BRIEF.md, DESIGN.md, TASKS.md, and RULES.md in that order.
   Then begin executing the tasks. Do not ask for clarification — invent what is not specified and proceed.
   ```

## Repository Structure

```
/
├── framework/           # Benchmark files (README, BRIEF, DESIGN, etc.)
├── showcase/            # Results showcase website
│   ├── index.html       # Gallery grid
│   ├── preview.html     # Detail view
│   ├── css/style.css    # VEKTRA-inspired dark theme
│   └── js/              # Interactive scripts
├── showcase-config.json # Benchmark entries data
├── setup_run.bat        # Run setup script
└── sync_showcase.bat    # Showcase sync utility
```

## Benchmark Deliverables

1. **Phase 1 — Brand Foundation**
   - Color palette (CSS custom properties)
   - Typeface selection + rationale
   - Brand voice statement
   - Logo concept description

2. **Phase 2 — Logo & Identity**
   - SVG logo + standalone mark
   - CSS/SMIL animated logo
   - Light variant

3. **Phase 3 — Website**
   - Responsive static site (no build step)
   - Mobile nav, scroll animations, mouse interactions
   - Dark/light mode support

4. **Phase 4 — Data Visualization**
   - Interactive, VEKTRA-relevant visualization

5. **Phase 5 — Style Guide**
   - Documentation + live demonstration

6. **Phase 6 — Wildcard**
   - Generative background, configurator, intro, or logo system

## Scoring

- **Automated:** 102.5 points (checklist completion)
- **Human Review:** 30 points (coherence, taste, ambition)
- **Wildcard Bonus:** +25 points
- **Maximum:** ~157.5 points

## Showcase

View benchmark results: https://github.com/Nitty-Gritty-Design/DesignDeathmatch

## Contributing

To submit a new benchmark run:
1. Run the benchmark with your LLM
2. Take screenshots (hero, style guide, key pages)
3. Generate thumbnails (300×225)
4. Add entry to `showcase-config.json`
5. Submit a pull request

## License

MIT License — Use freely for research and benchmarking.
