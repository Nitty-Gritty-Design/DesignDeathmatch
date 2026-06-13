/* VEKTRA v2 — main_v2.js
   Premium site interactions: magnetic cursors, magnetic nav,
   scroll orchestrated reveals, cinematic flow-field background.
*/

(() => {
  'use strict';

  // --- Magnetic cursor effect on .btn and .nav-link ---
  const magneticEls = document.querySelectorAll('.btn, .nav-link, .concept-card');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      el.style.transition = 'transform 80ms ease-out';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });

  // --- Mobile nav ---
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', open);
      navToggle.setAttribute('aria-expanded', open);
    });
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Scroll reveals with staggered spring delay ---
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${i * 45}ms`;
      observer.observe(el);
    });
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // --- Hero flow-field canvas ---
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let W, H;
    let mx = 0.5, my = 0.5;
    let tmx = 0.5, tmy = 0.5;
    let frame = 0;
    const particles = [];
    const PARTICLE_COUNT = 180;

    class Particle {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = initial ? Math.random() * (W || 1400) : Math.random() * (W || 1400);
        this.y = initial ? Math.random() * (H || 900) : Math.random() * (H || 900);
        this.vx = 0; this.vy = 0;
        this.life = 0;
        this.maxLife = 180 + Math.random() * 220;
        this.hue = Math.random() < 0.08 ? 1 : 0;
      }
      update() {
        const scale = 0.0008;
        const n = VEKTRA.noise(this.x * scale, this.y * scale + frame * 0.00015);
        const angle = n * Math.PI * 4;
        const mouseAngle = Math.atan2(this.y - (my * H), this.x - (mx * W));
        const mouseForce = Math.max(0, 1 - VEKTRA.dist(this.x, this.y, mx * W, my * H) / 280);
        this.vx += Math.cos(angle) * 0.35 + Math.cos(mouseAngle) * mouseForce * 0.8;
        this.vy += Math.sin(angle) * 0.35 + Math.sin(mouseAngle) * mouseForce * 0.8;
        this.vx *= 0.94; this.vy *= 0.94;
        this.x += this.vx; this.y += this.vy;
        this.life++;
        if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20 || this.life > this.maxLife) {
          this.reset();
        }
      }
      draw(ctx) {
        const lifeRatio = this.life / this.maxLife;
        const alpha = Math.sin(lifeRatio * Math.PI) * (this.hue ? 0.85 : 0.35);
        ctx.strokeStyle = this.hue
          ? `rgba(255, 92, 54, ${alpha})`
          : `rgba(160, 157, 150, ${alpha})`;
        ctx.lineWidth = this.hue ? 1.3 : 0.7;
        ctx.beginPath();
        ctx.moveTo(this.x - this.vx * 2, this.y - this.vy * 2);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
      }
    }

    function resize() {
      const rect = heroCanvas.parentElement.getBoundingClientRect();
      W = rect.width; H = rect.height;
      heroCanvas.width = W; heroCanvas.height = H;
    }

    function init() {
      resize();
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
    }

    window.addEventListener('resize', () => { resize(); init(); }, { passive: true });
    heroCanvas.parentElement.addEventListener('mousemove', e => {
      const rect = heroCanvas.parentElement.getBoundingClientRect();
      tmx = (e.clientX - rect.left) / rect.width;
      tmy = (e.clientY - rect.top) / rect.height;
    }, { passive: true });

    // Spring smoothing for mouse
    VEKTRA.springPhysics.register('mx', 0.5);
    VEKTRA.springPhysics.register('my', 0.5);

    function draw(t) {
      mx = VEKTRA.lerp(mx, tmx, 0.06);
      my = VEKTRA.lerp(my, tmy, 0.06);
      VEKTRA.springPhysics.setTarget('mx', mx);
      VEKTRA.springPhysics.setTarget('my', my);
      VEKTRA.springPhysics.tick();

      ctx.fillStyle = 'rgba(8, 9, 11, 0.14)';
      ctx.fillRect(0, 0, W, H);

      particles.forEach(p => { p.update(); p.draw(ctx); });

      // Central marker
      const cx = mx * W, cy = my * H;
      ctx.strokeStyle = 'rgba(255, 92, 54, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, 28 + Math.sin(t * 0.0008) * 4, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = 'rgba(255, 92, 54, 0.9)';
      ctx.beginPath(); ctx.arc(cx, cy, 2.8, 0, Math.PI * 2); ctx.fill();

      // Accent bloom near cursor
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160);
      grad.addColorStop(0, 'rgba(255, 92, 54, 0.07)');
      grad.addColorStop(1, 'rgba(8, 9, 11, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(cx - 160, cy - 160, 320, 320);

      frame++;
      requestAnimationFrame(draw);
    }

    init();
    requestAnimationFrame(draw);
  }

  // --- Viz preview ---
  const vizPreview = document.getElementById('viz-preview');
  if (vizPreview) {
    const vctx = vizPreview.getContext('2d');
    let vw, vh, vf = 0, vt = 0;

    function rsz() {
      const r = vizPreview.parentElement.getBoundingClientRect();
      vw = r.width; vh = 220;
      vizPreview.width = vw; vizPreview.height = vh;
    }
    window.addEventListener('resize', rsz, { passive: true });
    rsz();

    function sample(x, t) {
      return Math.sin((x / vw) * Math.PI * 2.4 + t * 2.2) * 0.45
           + Math.sin((x / vw) * Math.PI * 4.8 + t * 4.1) * 0.3
           + Math.sin((x / vw) * Math.PI * 7.6 + t * 6.8) * 0.25;
    }

    function drawV(t) {
      vt = t; vf++;
      vctx.fillStyle = '#161820';
      vctx.fillRect(0, 0, vw, vh);

      vctx.strokeStyle = '#25282E';
      vctx.lineWidth = 1;
      vctx.beginPath(); vctx.moveTo(0, vh / 2); vctx.lineTo(vw, vh / 2); vctx.stroke();

      const layers = [
        { amp: 26, col: '#FF5C36', a: 0.9, w: 1.4 },
        { amp: 18, col: '#FFB347', a: 0.3, w: 2.2 },
        { amp: 12, col: '#9A9790', a: 0.5, w: 1 },
      ];
      layers.forEach(l => {
        vctx.strokeStyle = l.col;
        vctx.lineWidth = l.w;
        vctx.globalAlpha = l.a;
        vctx.beginPath();
        for (let x = 0; x <= vw; x++) {
          const y = vh / 2 + sample(x, t) * l.amp * Math.sin((x / vw) * Math.PI);
          x === 0 ? vctx.moveTo(x, y) : vctx.lineTo(x, y);
        }
        vctx.stroke();
      });
      vctx.globalAlpha = 1;
      requestAnimationFrame(drawV);
    }
    requestAnimationFrame(drawV);
  }
})();
