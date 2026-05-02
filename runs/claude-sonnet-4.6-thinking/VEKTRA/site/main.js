/**
 * VEKTRA — main.js
 * Mobile nav · scroll animations · mouse parallax · cursor
 */

(function () {
  'use strict';

  /* ── Custom cursor ─────────────────────────────────────────── */
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  let mx = -100, my = -100;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });

  /* ── Nav: sticky + scroll state ───────────────────────────── */
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Scroll-triggered entrance animations ──────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .hero__label, .hero__headline, .hero__sub, .hero__actions');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // Trigger hero elements immediately
  setTimeout(() => {
    document.querySelectorAll('.hero__label, .hero__headline, .hero__sub, .hero__actions').forEach(el => {
      el.classList.add('visible');
    });
  }, 80);

  /* ── Mouse parallax on hero background ─────────────────────── */
  const heroBg = document.getElementById('hero-bg-canvas');
  if (heroBg) {
    // Expose mouse position for canvas animation
    window._vektraMouse = { x: 0.5, y: 0.5 };
    document.addEventListener('mousemove', e => {
      window._vektraMouse.x = e.clientX / window.innerWidth;
      window._vektraMouse.y = e.clientY / window.innerHeight;
    }, { passive: true });
  }

  /* ── Generative hero background (Canvas) ────────────────────
   * Signal field: oscillating particles on a grid, reacting to
   * mouse position. Vanilla Canvas API — no libraries.
   * Target: 60fps via requestAnimationFrame.
   */
  const canvas = document.getElementById('hero-bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, nodes = [], frame = 0;
    const ACCENT = '#E8FF47';
    const NODE_COUNT = 80;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Initialize nodes — each is a signal point on an invisible grid
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        baseX: 0, baseY: 0, // set after W/H known
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
        freq: 0.003 + Math.random() * 0.006,
        size: 1 + Math.random() * 1.5,
        alpha: 0.08 + Math.random() * 0.18,
      });
    }
    nodes.forEach(n => { n.baseX = n.x; n.baseY = n.y; });

    const EDGE_DIST = 120; // max px for drawing edges between nodes

    function tick() {
      ctx.clearRect(0, 0, W, H);

      const mouse = window._vektraMouse || { x: 0.5, y: 0.5 };
      const mx = mouse.x * W;
      const my = mouse.y * H;
      frame++;

      // Update + draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Oscillation: sine wave drift
        n.x = n.baseX + Math.sin(frame * n.freq + n.phase) * 28;
        n.y = n.baseY + Math.cos(frame * n.freq * 0.7 + n.phase) * 18;

        // Mouse attraction — gentle pull within radius
        const dx = mx - n.x, dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (1 - dist / 200) * 0.018;
          n.baseX += dx * force;
          n.baseY += dy * force;
        }
        // Drift baseX/Y back toward origin (dampening)
        n.baseX += (n.x - n.baseX) * -0.002;
        n.baseY += (n.y - n.baseY) * -0.002;

        // Clamp
        n.baseX = Math.max(0, Math.min(W, n.baseX));
        n.baseY = Math.max(0, Math.min(H, n.baseY));

        // Draw node dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 255, 71, ${n.alpha})`;
        ctx.fill();
      }

      // Draw edges between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < EDGE_DIST) {
            const alpha = (1 - d / EDGE_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(232, 255, 71, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  /* ── How it works — staggered card reveal ──────────────────── */
  document.querySelectorAll('.how__card').forEach((card, i) => {
    card.style.transitionDelay = (i * 80) + 'ms';
    revealObserver.observe(card);
  });

})();
