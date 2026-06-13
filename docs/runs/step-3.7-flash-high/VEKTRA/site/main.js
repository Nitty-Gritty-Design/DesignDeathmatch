(function () {
  'use strict';

  /* ============================================================
     VEKTRA — site/main.js
     Mobile nav · scroll reveals · cursor glow · hero signal field
  ============================================================ */

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open);
    });

    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Scroll-triggered entrance animations ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${i * 30}ms`;
      observer.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // --- Hero canvas: signal field ---
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let width, height;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let frame = 0;

    function resize() {
      const rect = heroCanvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      heroCanvas.width = width;
      heroCanvas.height = height;
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    heroCanvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = heroCanvas.parentElement.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    }, { passive: true });

    function draw(t) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0D0C0B';
      ctx.fillRect(0, 0, width, height);

      const lines = 28;
      ctx.lineWidth = 1;

      for (let i = 0; i < lines; i++) {
        const progress = i / lines;
        const yBase = height * 0.08 + (height * 0.84) * progress;
        const amplitude = 6 + Math.abs(Math.sin(progress * Math.PI)) * 22;
        const freq = 0.004 + progress * 0.006;
        const speed = 0.0004 + progress * 0.0003;

        const alpha = 0.18 + Math.sin(progress * Math.PI) * 0.25;
        ctx.strokeStyle = i === Math.floor(lines / 2)
          ? `rgba(255, 77, 42, ${alpha + 0.15})`
          : `rgba(160, 157, 150, ${alpha})`;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const wave = Math.sin((x * freq) + (t * speed) + (progress * 2)) * amplitude;
          const mouseInfluence = Math.sin((x / width) * Math.PI) * mouseX * 12;
          const y = yBase + wave + mouseInfluence;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Dot tracker
      const tx = mouseX * width;
      const ty = height * 0.5 + Math.sin((tx * 0.005) + (frame * 0.02)) * 30;
      ctx.fillStyle = 'rgba(255, 77, 42, 0.9)';
      ctx.beginPath();
      ctx.arc(tx, ty, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Crosshair rings
      ctx.strokeStyle = 'rgba(255, 77, 42, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(tx, ty, 18 + Math.sin(t * 0.001) * 4, 0, Math.PI * 2);
      ctx.stroke();

      frame++;
      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  // --- Viz preview mini waveform ---
  const vizPreview = document.getElementById('viz-preview');
  if (vizPreview) {
    const vctx = vizPreview.getContext('2d');
    let vw, vh, vframe = 0;

    function resizeViz() {
      const rect = vizPreview.parentElement.getBoundingClientRect();
      vw = rect.width;
      vh = 200;
      vizPreview.width = vw;
      vizPreview.height = vh;
    }

    window.addEventListener('resize', resizeViz, { passive: true });
    resizeViz();

    function drawViz(t) {
      vctx.fillStyle = '#1A1918';
      vctx.fillRect(0, 0, vw, vh);

      const waves = [
        { amp: 28, freq: 0.012, speed: 0.003, color: '255, 77, 42' },
        { amp: 18, freq: 0.022, speed: 0.005, color: '160, 157, 150' },
        { amp: 10, freq: 0.04, speed: 0.008, color: '92, 89, 85' },
      ];

      waves.forEach(w => {
        vctx.strokeStyle = `rgba(${w.color}, 0.8)`;
        vctx.lineWidth = 1.5;
        vctx.beginPath();
        for (let x = 0; x <= vw; x++) {
          const y = vh / 2 + Math.sin((x * w.freq) + (t * w.speed)) * w.amp;
          if (x === 0) vctx.moveTo(x, y); else vctx.lineTo(x, y);
        }
        vctx.stroke();
      });

      // Center line
      vctx.strokeStyle = 'rgba(255, 77, 42, 0.3)';
      vctx.lineWidth = 1;
      vctx.beginPath();
      vctx.moveTo(0, vh / 2);
      vctx.lineTo(vw, vh / 2);
      vctx.stroke();

      vframe++;
      requestAnimationFrame(drawViz);
    }

    requestAnimationFrame(drawViz);
  }

})();
