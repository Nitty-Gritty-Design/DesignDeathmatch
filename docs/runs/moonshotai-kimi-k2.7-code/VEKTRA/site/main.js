/*
 * VEKTRA site main.js
 *
 * Responsibilities:
 * - Mobile navigation toggle
 * - Scroll-triggered entrance animations via IntersectionObserver
 * - Generative signal-field background (hero canvas)
 * - Interactive frequency-spectrum visualization (viz canvas)
 *
 * Library choice: vanilla JS only. The canvas work is custom because
 * a general-purpose library would obscure the signal-graph aesthetic.
 */

(function () {
  'use strict';

  /* ── Utilities ── */
  const rootStyles = getComputedStyle(document.documentElement);
  const cssVar = (name) => rootStyles.getPropertyValue(name).trim();

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ── Mobile nav ── */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.hidden = isOpen;
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });
  }

  /* ── Scroll-triggered entrance animations ── */
  const animatedElements = document.querySelectorAll('[data-animate="fade-up"]');

  if (!prefersReducedMotion() && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || '0', 10);
            setTimeout(() => entry.target.classList.add('is-visible'), delay * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    animatedElements.forEach((el) => observer.observe(el));
  } else {
    animatedElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ── Hero generative background ── */
  const heroCanvas = document.getElementById('hero-canvas');

  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let width, height, dpr;
    let mouse = { x: -1000, y: -1000 };
    let time = 0;
    let rafId = null;

    function resizeHero() {
      const rect = heroCanvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      heroCanvas.width = Math.floor(width * dpr);
      heroCanvas.height = Math.floor(height * dpr);
      heroCanvas.style.width = width + 'px';
      heroCanvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const accent = cssVar('--color-accent');
    const muted = cssVar('--color-text-muted');
    const border = cssVar('--color-border');

    function drawHero() {
      ctx.clearRect(0, 0, width, height);

      // Baseline grid
      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      const gridStep = 40;
      ctx.beginPath();
      for (let y = gridStep; y < height; y += gridStep) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      for (let x = gridStep; x < width; x += gridStep) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      ctx.stroke();

      // Signal traces
      const lineCount = 7;
      const amplitudeBase = height * 0.06;

      for (let i = 0; i < lineCount; i++) {
        const yCenter = (height / (lineCount + 1)) * (i + 1);
        const speed = 0.0008 + i * 0.0003;
        const freq = 0.004 + i * 0.0015;
        const phase = i * 1.2;

        ctx.beginPath();
        ctx.strokeStyle = i === 3 ? accent : muted;
        ctx.globalAlpha = i === 3 ? 0.9 : 0.35 + i * 0.05;
        ctx.lineWidth = i === 3 ? 2 : 1;

        for (let x = 0; x <= width; x += 3) {
          const mouseInfluence = Math.max(0, 1 - Math.abs(x - mouse.x) / 220);
          const modAmp = amplitudeBase * (1 + mouseInfluence * 1.2);
          const y = yCenter + Math.sin(x * freq + time * speed + phase) * modAmp * (0.8 + mouseInfluence);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Cursor probe dot
      if (mouse.x > 0) {
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loopHero() {
      time += 16;
      drawHero();
      rafId = requestAnimationFrame(loopHero);
    }

    heroCanvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroCanvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    window.addEventListener('resize', resizeHero);
    resizeHero();
    if (!prefersReducedMotion()) loopHero();
    else drawHero();
  }

  /* ── Frequency spectrum visualization ── */
  const vizCanvas = document.getElementById('viz-canvas');
  const vizPause = document.getElementById('viz-pause');

  if (vizCanvas) {
    const ctx = vizCanvas.getContext('2d');
    let width, height, dpr;
    let vizTime = 0;
    let vizPaused = false;
    let vizRafId = null;

    // Plausible frequency bands for a generative audio patch
    const bands = [
      { name: 'Sub', range: '20–60 Hz', value: 0.0 },
      { name: 'Low', range: '60–120 Hz', value: 0.0 },
      { name: 'Low-mid', range: '120–250 Hz', value: 0.0 },
      { name: 'Mid', range: '250–500 Hz', value: 0.0 },
      { name: 'High-mid', range: '500 Hz–2 kHz', value: 0.0 },
      { name: 'Presence', range: '2–4 kHz', value: 0.0 },
      { name: 'Brilliance', range: '4–8 kHz', value: 0.0 },
      { name: 'Air', range: '8–16 kHz', value: 0.0 }
    ];

    function resizeViz() {
      const rect = vizCanvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = 320;
      vizCanvas.width = Math.floor(width * dpr);
      vizCanvas.height = Math.floor(height * dpr);
      vizCanvas.style.width = width + 'px';
      vizCanvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function updateBands() {
      bands.forEach((band, i) => {
        const base = 0.2 + Math.sin(vizTime * 0.001 + i * 0.9) * 0.15;
        const noise = (Math.random() - 0.5) * 0.08;
        band.value = Math.max(0.05, Math.min(0.95, base + noise));
      });
    }

    function drawViz() {
      ctx.clearRect(0, 0, width, height);

      const accent = cssVar('--color-accent');
      const muted = cssVar('--color-text-muted');
      const border = cssVar('--color-border');
      const text = cssVar('--color-text-secondary');

      const padding = 24;
      const graphW = width - padding * 2;
      const graphH = height - padding * 2;
      const barW = (graphW - (bands.length - 1) * 12) / bands.length;

      // Grid
      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= 4; i++) {
        const y = padding + (graphH / 4) * i;
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
      }
      ctx.stroke();

      // Bars
      bands.forEach((band, i) => {
        const x = padding + i * (barW + 12);
        const barH = band.value * graphH;
        const y = padding + graphH - barH;

        // Decay trace
        ctx.fillStyle = muted;
        ctx.globalAlpha = 0.25;
        ctx.fillRect(x, padding, barW, graphH);
        ctx.globalAlpha = 1;

        // Live amplitude
        ctx.fillStyle = accent;
        ctx.fillRect(x, y, barW, barH);

        // Label
        ctx.fillStyle = text;
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(band.name, x + barW / 2, padding + graphH + 18);
      });

      // Y-axis labels
      ctx.fillStyle = muted;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('0 dB', padding - 8, padding + 4);
      ctx.fillText('-24 dB', padding - 8, padding + graphH / 2 + 3);
      ctx.fillText('-48 dB', padding - 8, padding + graphH - 2);
    }

    function loopViz() {
      if (!vizPaused) {
        vizTime += 16;
        updateBands();
      }
      drawViz();
      vizRafId = requestAnimationFrame(loopViz);
    }

    vizCanvas.addEventListener('mousemove', (e) => {
      const rect = vizCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const padding = 24;
      const graphW = width - padding * 2;
      const barW = (graphW - (bands.length - 1) * 12) / bands.length;
      const index = Math.floor((x - padding) / (barW + 12));
      if (index >= 0 && index < bands.length) {
        vizCanvas.title = `${bands[index].name} · ${bands[index].range} · ${Math.round(bands[index].value * 100)}%`;
      }
    });

    vizCanvas.addEventListener('mouseleave', () => {
      vizCanvas.title = '';
    });

    if (vizPause) {
      vizPause.addEventListener('click', () => {
        vizPaused = !vizPaused;
        vizPause.textContent = vizPaused ? 'Resume' : 'Pause';
      });
    }

    window.addEventListener('resize', resizeViz);
    resizeViz();
    if (!prefersReducedMotion()) loopViz();
    else { updateBands(); drawViz(); }
  }
})();
