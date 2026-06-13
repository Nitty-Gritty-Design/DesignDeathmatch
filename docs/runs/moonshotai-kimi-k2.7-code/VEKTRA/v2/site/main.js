/*
 * VEKTRA v2 site main.js
 *
 * Premium interactions and generative systems:
 * - Multi-layer signal-field hero background (Canvas API)
 * - Interactive frequency-spectrum visualization
 * - Scroll-triggered reveals with stagger
 * - Glass navigation state on scroll
 * - Mobile menu with smooth transitions
 *
 * Library choice: vanilla JS only. No animation libraries, no frameworks.
 * Canvas rendering is custom to maintain the signal-graph aesthetic.
 */

(function () {
  'use strict';

  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── DOM utilities ── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ── CSS variable reader ── */
  const rootStyle = getComputedStyle(document.documentElement);
  const cssVar = (name) => rootStyle.getPropertyValue(name).trim();

  /* ── Mobile nav ── */
  const toggle = $('.nav__toggle');
  const mobileMenu = $('#mobile-menu');

  if (toggle && mobileMenu) {
    const updateMenu = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      mobileMenu.hidden = !open;
      // Allow transition to play after removing hidden
      requestAnimationFrame(() => mobileMenu.classList.toggle('is-open', open));
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      updateMenu(!isOpen);
    });

    $$('.mobile-menu__link', mobileMenu).forEach((link) => {
      link.addEventListener('click', () => updateMenu(false));
    });
  }

  /* ── Nav scroll state ── */
  const nav = $('.nav');
  let lastScroll = 0;

  const updateNav = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('is-scrolled', y > 24);
    lastScroll = y;
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Scroll reveal ── */
  const revealElements = $$('[data-reveal]');

  if (!prefersReducedMotion() && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || '0', 10);
            setTimeout(() => entry.target.classList.add('is-visible'), delay * 100);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ── Canvas helpers ── */
  function setupCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const state = { width: 0, height: 0, dpr: 1 };

    const resize = () => {
      const rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : canvas.getBoundingClientRect();
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = rect.width;
      state.height = rect.height;
      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);
      canvas.style.width = state.width + 'px';
      canvas.style.height = state.height + 'px';
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    };

    return { ctx, resize, state };
  }

  /* ── Hero signal field ── */
  const heroCanvas = $('#hero-canvas');

  if (heroCanvas) {
    const { ctx, resize, state: heroState } = setupCanvas(heroCanvas);
    const W = () => heroState.width;
    const H = () => heroState.height;

    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    let time = 0;
    let running = true;
    let rafId = null;

    const state = {
      accent: cssVar('--v2-color-accent'),
      muted: cssVar('--v2-color-text-muted'),
      border: cssVar('--v2-color-border'),
      bg: cssVar('--v2-color-bg-primary'),
      surface: cssVar('--v2-color-bg-secondary'),
    };

    const refreshColors = () => {
      state.accent = cssVar('--v2-color-accent');
      state.muted = cssVar('--v2-color-text-muted');
      state.border = cssVar('--v2-color-border');
      state.bg = cssVar('--v2-color-bg-primary');
      state.surface = cssVar('--v2-color-bg-secondary');
    };

    // Drifting grid points
    const gridCols = 14;
    const gridRows = 10;
    const gridPoints = [];

    function initGrid() {
      gridPoints.length = 0;
      for (let y = 0; y <= gridRows; y++) {
        for (let x = 0; x <= gridCols; x++) {
          gridPoints.push({
            x: x / gridCols,
            y: y / gridRows,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.4,
          });
        }
      }
    }

    function drawGrid() {
      ctx.strokeStyle = state.border;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.18;

      const w = W();
      const h = H();

      ctx.beginPath();
      for (let i = 0; i < gridPoints.length; i++) {
        const p = gridPoints[i];
        const drift = Math.sin(time * 0.0003 * p.speed + p.phase) * 10;
        const px = p.x * w + drift;
        const py = p.y * h + Math.cos(time * 0.00025 * p.speed + p.phase) * 8;

        // Horizontal connections
        if ((i + 1) % (gridCols + 1) !== 0) {
          const next = gridPoints[i + 1];
          ctx.moveTo(px, py);
          ctx.lineTo(next.x * w + Math.sin(time * 0.0003 * next.speed + next.phase) * 10, next.y * h + Math.cos(time * 0.00025 * next.speed + next.phase) * 8);
        }
        // Vertical connections
        if (i + gridCols + 1 < gridPoints.length) {
          const below = gridPoints[i + gridCols + 1];
          ctx.moveTo(px, py);
          ctx.lineTo(below.x * w + Math.sin(time * 0.0003 * below.speed + below.phase) * 10, below.y * h + Math.cos(time * 0.00025 * below.speed + below.phase) * 8);
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function drawSignalLines() {
      const w = W();
      const h = H();
      const lineCount = 8;
      const baseAmp = h * 0.05;

      for (let i = 0; i < lineCount; i++) {
        const yCenter = (h / (lineCount + 1)) * (i + 1);
        const speed = 0.001 + i * 0.0002;
        const freq = 0.003 + i * 0.0012;
        const phase = i * 1.3;
        const isAccent = i === 4;

        ctx.beginPath();
        ctx.strokeStyle = isAccent ? state.accent : state.muted;
        ctx.globalAlpha = isAccent ? 0.9 : 0.25 + i * 0.04;
        ctx.lineWidth = isAccent ? 2.5 : 1;
        ctx.lineJoin = 'round';

        for (let x = 0; x <= w; x += 2) {
          const dist = Math.abs(x - mouse.x);
          const mouseInfluence = Math.max(0, 1 - dist / 260);
          const amp = baseAmp * (1 + mouseInfluence * 1.6 + Math.hypot(mouse.vx, mouse.vy) * 0.015);
          const y = yCenter + Math.sin(x * freq + time * speed + phase) * amp * (0.8 + mouseInfluence);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function drawConstellation() {
      const w = W();
      const h = H();
      const nodes = [];
      const count = 7;

      for (let i = 0; i < count; i++) {
        const t = time * 0.0004 + i * 1.1;
        nodes.push({
          x: w * (0.15 + 0.7 * ((i + Math.sin(t)) / count)),
          y: h * (0.25 + 0.5 * Math.cos(t * 0.7 + i)),
          r: 2 + Math.sin(t * 2) * 0.8,
        });
      }

      // Connections
      ctx.strokeStyle = state.accent;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.18;
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < h * 0.35) {
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
          }
        }
      }
      ctx.stroke();

      // Nodes
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = state.accent;
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    function drawSweep() {
      const w = W();
      const h = H();
      const x = ((time * 0.02) % (w + 200)) - 100;

      ctx.strokeStyle = state.accent;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.12;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function drawCursorProbe() {
      if (mouse.x < 0) return;
      const w = W();
      const h = H();

      ctx.strokeStyle = state.accent;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.22;
      ctx.beginPath();
      ctx.moveTo(mouse.x, 0);
      ctx.lineTo(mouse.x, h);
      ctx.moveTo(0, mouse.y);
      ctx.lineTo(w, mouse.y);
      ctx.stroke();

      ctx.fillStyle = state.accent;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    function draw() {
      const w = W();
      const h = H();
      ctx.fillStyle = state.bg;
      ctx.fillRect(0, 0, w, h);

      drawGrid();
      drawSignalLines();
      drawConstellation();
      drawSweep();
      drawCursorProbe();
    }

    function loop() {
      if (!running) return;
      time += 16;
      draw();
      rafId = requestAnimationFrame(loop);
    }

    let prevMouse = { x: -1000, y: -1000 };

    heroCanvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.vx = e.clientX - prevMouse.x;
      mouse.vy = e.clientY - prevMouse.y;
      prevMouse.x = e.clientX;
      prevMouse.y = e.clientY;
    });

    heroCanvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
    });

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        initGrid();
      }, 120);
    };

    window.addEventListener('resize', handleResize);

    // Update colors when system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', refreshColors);

    resize();
    initGrid();
    if (prefersReducedMotion()) draw();
    else loop();
  }

  /* ── Frequency spectrum visualization ── */
  const vizCanvas = $('#viz-canvas');

  if (vizCanvas) {
    const { ctx, resize, state: vizState } = setupCanvas(vizCanvas);
    const W = () => vizState.width;
    const H = () => vizState.height;

    const bands = [
      { name: 'Sub', range: '20–60 Hz', value: 0.0, peak: 0.0 },
      { name: 'Low', range: '60–120 Hz', value: 0.0, peak: 0.0 },
      { name: 'Low-mid', range: '120–250 Hz', value: 0.0, peak: 0.0 },
      { name: 'Mid', range: '250–500 Hz', value: 0.0, peak: 0.0 },
      { name: 'High-mid', range: '500 Hz–2 kHz', value: 0.0, peak: 0.0 },
      { name: 'Presence', range: '2–4 kHz', value: 0.0, peak: 0.0 },
      { name: 'Brilliance', range: '4–8 kHz', value: 0.0, peak: 0.0 },
      { name: 'Air', range: '8–16 kHz', value: 0.0, peak: 0.0 },
    ];

    let vizTime = 0;
    let vizPaused = false;
    let rafId = null;
    let hoveredBand = -1;

    function updateBands() {
      bands.forEach((band, i) => {
        const base = 0.22 + Math.sin(vizTime * 0.001 + i * 0.85) * 0.16;
        const noise = (Math.random() - 0.5) * 0.1;
        const target = Math.max(0.06, Math.min(0.92, base + noise));
        band.value += (target - band.value) * 0.18;
        band.peak = Math.max(band.peak * 0.985, band.value);
      });
    }

    function drawViz() {
      const w = W();
      const h = H();
      const accent = cssVar('--v2-color-accent');
      const muted = cssVar('--v2-color-text-muted');
      const border = cssVar('--v2-color-border');
      const text = cssVar('--v2-color-text-secondary');
      const surface = cssVar('--v2-color-surface');

      const paddingX = 28;
      const paddingY = 28;
      const graphW = w - paddingX * 2;
      const graphH = h - paddingY * 2;
      const gap = 10;
      const barW = (graphW - (bands.length - 1) * gap) / bands.length;

      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      for (let i = 0; i <= 4; i++) {
        const y = paddingY + (graphH / 4) * i;
        ctx.moveTo(paddingX, y);
        ctx.lineTo(w - paddingX, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Bars
      bands.forEach((band, i) => {
        const x = paddingX + i * (barW + gap);
        const barH = band.value * graphH;
        const y = paddingY + graphH - barH;
        const isHovered = i === hoveredBand;

        // Decay trace
        ctx.fillStyle = surface;
        ctx.fillRect(x, paddingY, barW, graphH);

        // Peak marker
        const peakY = paddingY + graphH - band.peak * graphH;
        ctx.fillStyle = isHovered ? accent : muted;
        ctx.globalAlpha = isHovered ? 0.8 : 0.35;
        ctx.fillRect(x, peakY, barW, 2);

        // Live bar
        const grad = ctx.createLinearGradient(0, paddingY + graphH, 0, y);
        grad.addColorStop(0, accent);
        grad.addColorStop(1, cssVar('--v2-color-accent-deep'));
        ctx.fillStyle = grad;
        ctx.globalAlpha = isHovered ? 1 : 0.85;
        ctx.fillRect(x, y, barW, barH);

        // Hover highlight
        if (isHovered) {
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.strokeRect(x - 2, y - 2, barW + 4, barH + 4);
        }

        ctx.globalAlpha = 1;

        // Label
        ctx.fillStyle = isHovered ? accent : text;
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(band.name, x + barW / 2, paddingY + graphH + 20);
      });

      // Y-axis labels
      ctx.fillStyle = muted;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('0 dB', paddingX - 10, paddingY + 4);
      ctx.fillText('-24 dB', paddingX - 10, paddingY + graphH / 2 + 3);
      ctx.fillText('-48 dB', paddingX - 10, paddingY + graphH - 2);

      // Tooltip for hovered band
      if (hoveredBand >= 0) {
        const band = bands[hoveredBand];
        const tooltip = `${band.name} · ${band.range} · ${Math.round(band.value * 100)}%`;
        ctx.font = '11px "JetBrains Mono", monospace';
        const tw = ctx.measureText(tooltip).width;
        const tx = w - paddingX - tw;
        const ty = paddingY + 18;
        ctx.fillStyle = cssVar('--v2-color-bg-primary');
        ctx.fillRect(tx - 8, ty - 13, tw + 16, 22);
        ctx.strokeStyle = accent;
        ctx.strokeRect(tx - 8, ty - 13, tw + 16, 22);
        ctx.fillStyle = accent;
        ctx.textAlign = 'left';
        ctx.fillText(tooltip, tx, ty);
      }
    }

    function loopViz() {
      if (!vizPaused) {
        vizTime += 16;
        updateBands();
      }
      drawViz();
      rafId = requestAnimationFrame(loopViz);
    }

    vizCanvas.addEventListener('mousemove', (e) => {
      const rect = vizCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const paddingX = 28;
      const graphW = W() - paddingX * 2;
      const gap = 10;
      const barW = (graphW - (bands.length - 1) * gap) / bands.length;
      const index = Math.floor((x - paddingX) / (barW + gap));
      hoveredBand = index >= 0 && index < bands.length ? index : -1;
    });

    vizCanvas.addEventListener('mouseleave', () => {
      hoveredBand = -1;
    });

    const pauseBtn = $('#viz-pause');
    const resetBtn = $('#viz-reset');

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        vizPaused = !vizPaused;
        pauseBtn.querySelector('span').textContent = vizPaused ? 'Resume' : 'Pause';
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        vizTime = 0;
        bands.forEach((b) => { b.value = 0; b.peak = 0; });
      });
    }

    let resizeTimeoutViz;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeoutViz);
      resizeTimeoutViz = setTimeout(resize, 120);
    });

    resize();
    if (prefersReducedMotion()) { updateBands(); drawViz(); }
    else loopViz();
  }
})();
