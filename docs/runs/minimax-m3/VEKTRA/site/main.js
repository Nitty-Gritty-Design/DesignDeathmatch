/* ============================================================
   VEKTRA — main.js
   - Theme toggle
   - Mobile nav
   - Hero canvas (signal field, mouse-reactive)
   - Spectrum viz (interactive biquad cascade)
   - Cursor follower
   - Scroll-reveal via IntersectionObserver
   ============================================================ */

(() => {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const tok = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const accent   = () => tok("--color-accent")   || "#FF5C1F";
  const textPri  = () => tok("--color-text-primary") || "#F4F2EC";
  const textMut  = () => tok("--color-text-muted")    || "#6B6960";
  const gridCol  = () => tok("--color-grid")          || "#1F1F1B";
  const bgPrim   = () => tok("--color-bg-primary")    || "#0E0E0C";

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const themeBtn = $("#theme-toggle");
  const themeLabel = themeBtn && $(".theme-label", themeBtn);
  const stored = localStorage.getItem("vektra-theme");
  if (stored) root.setAttribute("data-theme", stored);
  if (themeBtn) {
    const sync = () => { if (themeLabel) themeLabel.textContent = root.getAttribute("data-theme") === "light" ? "LIGHT" : "DARK"; };
    sync();
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("vektra-theme", next);
      sync();
    });
  }

  /* ---------- Mobile nav ---------- */
  const burger = $("#nav-burger");
  const navLinks = $(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }));
  }

  /* ---------- Cursor follower ---------- */
  const cursor = $(".cursor");
  if (cursor && matchMedia("(hover: hover)").matches) {
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let tx = cx, ty = cy;
    window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; cursor.classList.add("live"); });
    window.addEventListener("mouseleave", () => cursor.classList.remove("live"));
    const tick = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Hero canvas: signal field, mouse-reactive ---------- */
  const heroCanvas = $("#hero-bg");
  if (heroCanvas && heroCanvas.getContext) {
    const ctx = heroCanvas.getContext("2d");
    let w = 0, h = 0, dpr = 1;
    const mouse = { x: 0, y: 0, vx: 0, vy: 0 };
    let lastT = performance.now();

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = heroCanvas.offsetWidth;
      h = heroCanvas.offsetHeight;
      heroCanvas.width = w * dpr; heroCanvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    heroCanvas.addEventListener("mousemove", (e) => {
      const r = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    heroCanvas.addEventListener("mouseleave", () => { mouse.x = w / 2; mouse.y = h / 2; });

    const bars = 96;
    const draw = (t) => {
      const dt = Math.min(48, t - lastT); lastT = t;
      mouse.vx += ((w / 2) - mouse.x) * -0.0008;
      mouse.vy += ((h / 2) - mouse.y) * -0.0008;
      mouse.vx *= 0.92; mouse.vy *= 0.92;

      ctx.fillStyle = bgPrim();
      ctx.fillRect(0, 0, w, h);

      const step = w / bars;
      for (let i = 0; i < bars; i++) {
        const x = i * step;
        const nx = (x - mouse.x) / Math.max(120, w * 0.25);
        const ny = (h / 2 - mouse.y) / Math.max(120, h * 0.25);
        const dist = Math.hypot(nx, ny);
        const wave =
          Math.sin(i * 0.18 + t * 0.0012) * 22 +
          Math.sin(i * 0.07 + t * 0.0007 + dist * 1.4) * 38 +
          Math.cos(i * 0.33 + t * 0.0009) * 8;
        const target = h * 0.32 + wave * 1.6 - dist * 18;
        const h2 = Math.max(2, Math.min(h * 0.6, target));

        const useAccent = i % 13 === 6;
        ctx.fillStyle = useAccent ? accent() : textPri();
        ctx.globalAlpha = useAccent ? 0.95 : 0.16;
        const bw = step * 0.42;
        ctx.fillRect(x + (step - bw) / 2, h / 2 - h2 / 2, bw, h2);
      }
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = accent();
      ctx.fillRect(0, h / 2 - 0.5, w, 1);

      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  /* ---------- Spectrum visualization ---------- */
  /* Interactive biquad lowpass cascade with LFO modulation.
     No external libs — vanilla Canvas 2D. */
  const cv = $("#spectrum");
  if (cv && cv.getContext) {
    const c = cv.getContext("2d");
    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const state = { freq: 220, cut: 1800, lfo: 0.7, q: 3, t0: performance.now() };
    const $ctl = (id) => $(id);
    const bind = (id, valId, key, fmt) => {
      const el = $ctl(id); const v = $ctl(valId); if (!el) return;
      el.addEventListener("input", () => {
        state[key] = parseFloat(el.value);
        if (v) v.textContent = fmt(state[key]);
      });
    };
    bind("#ctl-freq", "#val-freq", "freq", (x) => `${x.toFixed(0)} Hz`);
    bind("#ctl-cut",  "#val-cut",  "cut",  (x) => `${x.toFixed(0)} Hz`);
    bind("#ctl-lfo",  "#val-lfo",  "lfo",  (x) => `${x.toFixed(2)} Hz`);
    bind("#ctl-q",    "#val-q",    "q",    (x) => x.toFixed(1));

    // biquad lowpass magnitude (RBJ cookbook) — returns dB at frequency f
    const biquadLP_dB = (f, f0, Q) => {
      const fs = 48000;
      const w0 = 2 * Math.PI * f0 / fs;
      const cw = Math.cos(w0), sw = Math.sin(w0);
      const alpha = sw / (2 * Q);
      const b0 = (1 - cw) / 2, b1 = 1 - cw, b2 = (1 - cw) / 2;
      const a0 = 1 + alpha, a1 = -2 * cw, a2 = 1 - alpha;
      const W = 2 * Math.PI * f / fs;
      const cW = Math.cos(W), sW = Math.sin(W);
      const numRe = b0 + b1 * cW + b2 * Math.cos(2 * W);
      const numIm = -b1 * sW - b2 * Math.sin(2 * W);
      const denRe = a0 + a1 * cW + a2 * Math.cos(2 * W);
      const denIm = -a1 * sW - a2 * Math.sin(2 * W);
      const num2 = numRe * numRe + numIm * numIm;
      const den2 = denRe * denRe + denIm * denIm;
      return 10 * Math.log10(Math.max(1e-12, num2 / den2));
    };

    const draw = (t) => {
      const time = (t - state.t0) / 1000;
      const lfoMod = state.cut * (1 + 0.6 * Math.sin(2 * Math.PI * state.lfo * time));
      const fMin = 20, fMax = 20000;
      const pts = 256;
      c.clearRect(0, 0, W, H);
      c.fillStyle = bgPrim();
      c.fillRect(0, 0, W, H);

      // grid (log freq)
      c.strokeStyle = gridCol();
      c.lineWidth = 1;
      const dec = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
      dec.forEach((f) => {
        const x = Math.log10(f / fMin) / Math.log10(fMax / fMin) * W;
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke();
      });
      for (let db = -60; db <= 12; db += 12) {
        const y = H - ((db + 60) / 72) * H;
        c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke();
      }

      // input spectrum (lowpassed to source freq, like a band-limited pulse)
      c.strokeStyle = textPri();
      c.globalAlpha = 0.55;
      c.lineWidth = 1.5;
      c.beginPath();
      for (let i = 0; i < pts; i++) {
        const f = fMin * Math.pow(fMax / fMin, i / (pts - 1));
        // series of harmonics
        let mag = -60;
        for (let h = 1; h <= 8; h++) {
          const fh = state.freq * h;
          const env = 1 / Math.pow(h, 1.4);
          mag = Math.max(mag, -12 + 20 * Math.log10(env) - Math.abs(Math.log2(f / fh)) * 6);
        }
        const x = i / (pts - 1) * W;
        const y = H - ((mag + 60) / 72) * H;
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.stroke();

      // lfo envelope (dashed, accent, dim)
      c.strokeStyle = accent();
      c.globalAlpha = 0.35;
      c.setLineDash([4, 4]);
      c.beginPath();
      for (let i = 0; i < pts; i++) {
        const f = fMin * Math.pow(fMax / fMin, i / (pts - 1));
        const db = biquadLP_dB(f, lfoMod, state.q) + 6 * Math.sin(2 * Math.PI * state.lfo * time + i * 0.05);
        const x = i / (pts - 1) * W;
        const y = H - ((db + 60) / 72) * H;
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.stroke();
      c.setLineDash([]);

      // filtered output
      c.strokeStyle = accent();
      c.globalAlpha = 1;
      c.lineWidth = 2;
      c.beginPath();
      for (let i = 0; i < pts; i++) {
        const f = fMin * Math.pow(fMax / fMin, i / (pts - 1));
        const db = biquadLP_dB(f, state.cut, state.q);
        const x = i / (pts - 1) * W;
        const y = H - ((db + 60) / 72) * H;
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.stroke();

      // freq marker
      const fMx = Math.log10(state.freq / fMin) / Math.log10(fMax / fMin) * W;
      c.globalAlpha = 0.9;
      c.fillStyle = accent();
      c.fillRect(fMx - 0.5, 0, 1, H);
      c.globalAlpha = 1;

      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  /* ---------- Scroll reveal ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const d = parseInt(e.target.getAttribute("data-delay") || "0", 10);
          setTimeout(() => e.target.classList.add("in"), d);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("in"));
  }

})();
