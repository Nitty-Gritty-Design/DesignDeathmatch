# VEKTRA v2 Logo Concept — Signal Architecture

## The Mark: Vector Trace

The VEKTRA mark is a **parametric waveform vector** that synthesizes three fundamental concepts: **signal propagation**, **vector mathematics**, and **temporal evolution**. Unlike static geometric shapes, this mark implies motion through space and time—a trace left by energy in transit.

### Geometry

The mark consists of **four precisely calculated nodes** forming an asymmetric, open-ended path:

1. **Origin Node** (bottom-left): The signal source, anchored and stable
2. **Modulation Node** (upper-left): First transformation, vertical displacement
3. **Propagation Node** (upper-right): Signal expansion, maximum amplitude
4. **Terminal Node** (lower-right): Dissipation, return to baseline

The path between nodes uses **continuous curvature** (cubic Bézier interpolation) rather than straight lines, suggesting analog waveforms and natural signal flow. The stroke weight varies subtly along the path—thicker at nodes (2.5px), thinner at inflection points (1.5px)—mimicking signal amplitude modulation.

### Mathematical Foundation

The mark's proportions derive from the **golden ratio (φ ≈ 1.618)** and **equal-tempered frequency ratios**:

- Width-to-height ratio: 1.618:1 (golden rectangle)
- Node spacing follows 12-TET (twelve-tone equal temperament) frequency ratios
- Curvature radius = stroke weight × φ

This creates visual harmony that feels simultaneously engineered and organic.

### The Logotype

**Typeface:** IBM Plex Mono Medium, 28px, 0.05em tracking  
**Treatment:** Uppercase, monospaced, geometrically aligned  
**Color:** Primary text on dark surfaces; near-black on light surfaces

The word "VEKTRA" sits to the right of the mark, aligned on the **optical baseline** (not mathematical baseline), creating a subtle lift that feels dynamic. The monospace treatment reinforces computational precision while the generous tracking (0.05em) creates rhythmic breathing room.

### The Relationship

The mark's **terminal point** (lower-right) aligns vertically with the **center of the 'E'** in VEKTRA, creating an invisible line of force that connects symbol and word. The mark's height equals **72% of the logotype's cap-height**, establishing a proportional system that scales elegantly.

### Animation Concept: Signal Emergence

The logo animation visualizes **system initialization**—a process of calibration and stabilization:

**Phase 1 (0–600ms):** Calibration  
- Background field establishes (subtle grid fade-in)
- System noise visible as micro-vibrations

**Phase 2 (600–1200ms):** Signal Propagation  
- Mark draws itself using **stroke-dashoffset** technique
- Path emerges from origin to terminal following custom **ease-out-expo** curve
- Each node emits a brief pulse (scale: 1 → 1.3 → 1) upon activation

**Phase 3 (1200–1800ms):** Logotype Resolution  
- Letters slide in from left with **40ms stagger**
- Each character carries a **chromatic aberration** effect (subtle RGB separation) that resolves to clarity
- Final state: stable, grounded, emitting a slow **breathing pulse** (2-second cycle) indicating "live" status

**Total Duration:** 1.8 seconds  
**Loop:** Never—implies permanent activation  
**Easing:** Custom cubic-bezier throughout (no default CSS easing)

### Color System

**Dark Mode (Primary):**  
- Mark stroke: `var(--color-accent, #e84d1b)`  
- Mark glow: `var(--color-accent-glow, rgba(232, 77, 27, 0.25))`  
- Logotype: `var(--color-text-primary, #f2f2f0)`

**Light Mode:**  
- Mark stroke: `#c43e18` (darker for contrast)  
- Mark glow: `rgba(196, 62, 24, 0.2)`  
- Logotype: `#1a1a18`

### Size Verification

**240px width (Desktop Header):**  
Full mark + logotype with 16px spacing. Mark clearly visible as signal icon. Proportions preserved.

**80px width (Mobile Navigation):**  
Scaled proportionally. Monospace remains legible. Mark retains geometric clarity at 27px width.

**32px width (Favicon/Avatar):**  
Mark only, no logotype. At this scale, the waveform silhouette is unmistakable—distinct from simple chevrons or arrows due to its **open-ended asymmetry** and **curved trajectory**. The four-node structure remains perceptible. Stroke weight increased to 3px for visibility.

**16px width (Micro-context):**  
Simplified to essential silhouette—recognizable as VEKTRA identifier even at extreme reduction.

### Design Rationale

This mark succeeds because it is **neither literal nor arbitrary**. It suggests signal processing without depicting oscilloscopes or radio towers. It references vector mathematics without being academic. It feels **alive** through implied motion while remaining **stable** through geometric grounding. Most importantly, it is **ownable**—no stock symbol, no generic waveform, no borrowed iconography. It could only belong to VEKTRA.
