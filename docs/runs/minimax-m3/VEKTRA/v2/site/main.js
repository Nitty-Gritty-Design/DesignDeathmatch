/* ============================================================
   VEKTRA v2 — main.js
   ------------------------------------------------------------
   Class-based module pattern. Each system is a self-contained
   closure with a clear public API. The site boots in one pass.

   Modules:
     Theme      — dark / light toggle + persistence
     Clock      — local clock + footer clock + uptime HUD
     Nav        — sticky nav, mobile burger
     Cursor     — two-layer custom cursor (magnetic to links)
     HeroField  — multi-layer canvas background, mouse-reactive
     Spectrum   — split-pane oscilloscope + spectrum viz
     Reveal     — IntersectionObserver scroll reveals
     StatBars   — hero stat bar fill animation on first paint
     Magnetic   — links/buttons pull toward cursor subtly
   ============================================================ */

(() => {
  "use strict";

  /* ============================================================
     utilities
     ============================================================ */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const raf = (cb) => requestAnimationFrame(cb);
  const isTouch = matchMedia("(hover: none)").matches;
  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tok = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const accent = () => tok("--color-accent") || "#FF5C1F";
  const textPri = () => tok("--color-text-primary") || "#F2EFE7";
  const textMut = () => tok("--color-text-muted") || "#5A5749";
  const gridCol = () => tok("--color-grid") || "#1A1A14";
  const bgPrim  = () => tok("--color-bg-primary") || "#0D0D0B";
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /* ============================================================
     Theme
     ============================================================ */
  const Theme = (() => {
    const root = document.documentElement;
    const btn  = $("#theme-toggle");
    const lbl  = btn && $(".theme-label", btn);
    const stored = localStorage.getItem("vektra-theme");
    if (stored) root.setAttribute("data-theme", stored);
    const sync = () => { if (lbl) lbl.textContent = root.getAttribute("data-theme") === "light" ? "LIGHT" : "DARK"; };
    sync();
    if (btn) btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("vektra-theme", next);
      sync();
    });
    return {};
  })();

  /* ============================================================
     Clock + uptime
     ============================================================ */
  const Clock = (() => {
    const nav = $("#clock");
    const foot = $("#footer-clock");
    const hud = $("#hud-uptime");
    const n = $("#hud-n");
    const start = Date.now();
    let frame = 0;
    const tick = () => {
      frame++;
      const now = new Date();
      const t = now.toTimeString().slice(0, 8);
      if (nav) nav.textContent = t;
      if (foot) foot.textContent = `${t} utc${now.toTimeString().slice(8, 14) || "+2"}`;
      if (hud) {
        const s = Math.floor((Date.now() - start) / 1000);
        const hh = String(Math.floor(s / 3600)).padStart(2, "0");
        const mm = String(Math.floor(s / 60) % 60).padStart(2, "0");
        const ss = String(s % 60).padStart(2, "0");
        hud.textContent = `${hh}:${mm}:${ss}`;
      }
      if (n) n.textContent = String(frame);
    };
    tick();
    setInterval(tick, 1000);
    return {};
  })();

  /* ============================================================
     Nav
     ============================================================ */
  const Nav = (() => {
    const burger = $("#nav-burger");
    const links  = $(".nav-links");
    if (!burger || !links) return {};
    burger.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
      burger.querySelectorAll("span").forEach((s, i) => {
        s.style.transform = open ? (i === 0 ? "translateY(5px) rotate(45deg)" : i === 1 ? "scaleX(0)" : "translateY(-5px) rotate(-45deg)") : "";
      });
    });
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => {
      links.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.querySelectorAll("span").forEach((s) => s.style.transform = "");
    }));
    return {};
  })();

  /* ============================================================
     Cursor — two-layer with magnetic effect on links
     ============================================================ */
  const Cursor = (() => {
    if (isTouch) return {};
    const c = $(".cursor");
    const r = $(".cursor-ring");
    if (!c || !r) return {};

    let mx = innerWidth / 2, my = innerHeight / 2;
    let cx = mx, cy = my, rx = mx, ry = my;
    let targetX = 0, targetY = 0;
    let active = false;

    addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (!active) { c.classList.add("live"); r.classList.add("live"); active = true; }
      targetX = 0; targetY = 0;
    }, { passive: true });
    addEventListener("mouseleave", () => { c.classList.remove("live"); r.classList.remove("live"); active = false; });

    // magnetic pull for interactive elements
    const interactives = "a, button, input, [data-magnetic]";
    let hovered = null;
    addEventListener("mouseover", (e) => {
      const el = e.target.closest(interactives);
      if (el === hovered) return;
      if (hovered) hovered.classList.remove("is-hover");
      hovered = el;
      if (el) {
        el.classList.add("is-hover");
        document.body.classList.toggle("cursor-link", el.matches("a, button"));
      } else {
        document.body.classList.remove("cursor-link");
      }
    }, { passive: true });

    const loop = () => {
      // cursor dot: instant
      cx += (mx - cx) * 0.4;
      cy += (my - cy) * 0.4;
      c.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;

      // ring: magnetic
      const el = hovered;
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx2 = rect.left + rect.width / 2;
        const cy2 = rect.top + rect.height / 2;
        const dx = cx2 - mx, dy = cy2 - my;
        const dist = Math.hypot(dx, dy);
        const pull = clamp(1 - dist / 200, 0, 1) * 0.3;
        targetX = dx * pull;
        targetY = dy * pull;
      }
      rx += (mx + targetX - rx) * 0.18;
      ry += (my + targetY - ry) * 0.18;
      r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf(loop);
    };
    raf(loop);
    return {};
  })();

  /* ============================================================
     Magnetic — adds subtle pull effect to .btn-primary
     ============================================================ */
  const Magnetic = (() => {
    if (isTouch) return {};
    const els = $$(".btn-primary");
    const onMove = (el) => (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px) translateY(-2px)`;
    };
    const onLeave = (el) => () => { el.style.transform = ""; };
    els.forEach((el) => {
      el.addEventListener("mousemove", onMove(el));
      el.addEventListener("mouseleave", onLeave(el));
    });
    return {};
  })();

  /* ============================================================
     Reveal — IntersectionObserver
     ============================================================ */
  const Reveal = (() => {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("in"));
      return {};
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const d = parseInt(e.target.getAttribute("data-delay") || "0", 10);
          setTimeout(() => e.target.classList.add("in"), d);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
    return {};
  })();

  /* ============================================================
     HeroField — multi-layer canvas background
     ------------------------------------------------------------
     Layer order (z via draw order):
       1. Persistent trail (motion blur fill)
       2. Background grid (subtle)
       3. Spectrum bars (mouse-reactive)
       4. Accent ring (additive blend, breathing)
       5. Particles (additive blend, drifting)
     ============================================================ */
  const HeroField = (() => {
    const cv = $("#hero-bg");
    if (!cv || !cv.getContext || prefersReduced) return {};
    const ctx = cv.getContext("2d", { alpha: true });
    let W = 0, H = 0, dpr = 1;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, vx: 0, vy: 0 };
    let last = performance.now();
    let t = 0;
    let paused = false;
    const BAR_COUNT = () => clamp(Math.floor(W / 12), 48, 140);
    const particles = [];

    const initParticles = () => {
      particles.length = 0;
      const n = 28;
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random(), y: Math.random(),
          vx: (Math.random() - 0.5) * 0.00018,
          vy: (Math.random() - 0.5) * 0.00018,
          r: Math.random() * 1.4 + 0.4,
          hue: Math.random() < 0.35 ? "accent" : "ink",
        });
      }
    };

    const resize = () => {
      dpr = Math.min(2, devicePixelRatio || 1);
      W = cv.offsetWidth; H = cv.offsetHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    initParticles();

    addEventListener("resize", () => { resize(); initParticles(); });
    cv.addEventListener("mousemove", (e) => {
      const r = cv.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = (e.clientY - r.top) / r.height;
    });
    cv.addEventListener("mouseleave", () => { mouse.tx = 0.5; mouse.ty = 0.5; });
    addEventListener("visibilitychange", () => { paused = document.hidden; });

    const draw = (now) => {
      if (paused) { raf(draw); return; }
      const dt = Math.min(48, now - last); last = now;
      t += dt;

      // ease mouse
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.vx += ((W * 0.5) - mouse.x * W) * -0.00005;
      mouse.vy += ((H * 0.5) - mouse.y * H) * -0.00005;
      mouse.vx *= 0.94; mouse.vy *= 0.94;

      // persistent trail (motion blur)
      ctx.fillStyle = bgPrim();
      ctx.globalAlpha = 0.18;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      const bars = BAR_COUNT();
      const step = W / bars;
      const A = accent(), I = textPri();
      const distScale = Math.max(120, W * 0.25);

      // spectrum bars
      for (let i = 0; i < bars; i++) {
        const x = i * step;
        const dx = (x - mouse.x * W) / distScale;
        const dy = (H / 2 - mouse.y * H) / distScale;
        const dist = Math.hypot(dx, dy);
        const wave =
          Math.sin(i * 0.18 + t * 0.0012) * 22 +
          Math.sin(i * 0.07 + t * 0.0007 + dist * 1.4) * 38 +
          Math.cos(i * 0.33 + t * 0.0009) * 8;
        const target = H * 0.32 + wave * 1.6 - dist * 18;
        const h2 = clamp(target, 2, H * 0.6);
        const isAccent = i % 13 === 6;
        ctx.fillStyle = isAccent ? A : I;
        ctx.globalAlpha = isAccent ? 0.9 : 0.16;
        const bw = step * 0.42;
        ctx.fillRect(x + (step - bw) / 2, H / 2 - h2 / 2, bw, h2);
      }
      ctx.globalAlpha = 1;

      // accent midline (additive)
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = A;
      ctx.globalAlpha = 0.06;
      ctx.fillRect(0, H / 2 - 0.5, W, 1);
      // breathing accent ring at mouse
      const breath = 1 + 0.4 * Math.sin(t * 0.0008);
      const rx = 60 * breath, ry = 60 * breath;
      const grad = ctx.createRadialGradient(mouse.x * W, mouse.y * H, 0, mouse.x * W, mouse.y * H, rx);
      grad.addColorStop(0, A);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.18;
      ctx.beginPath(); ctx.arc(mouse.x * W, mouse.y * H, rx, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // particles
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        p.x += p.vx + (mouse.x - p.x) * 0.00008;
        p.y += p.vy + (mouse.y - p.y) * 0.00008;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
        ctx.fillStyle = p.hue === "accent" ? A : I;
        ctx.globalAlpha = p.hue === "accent" ? 0.7 : 0.25;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      raf(draw);
    };
    raf(draw);
    return {};
  })();

  /* ============================================================
     Spectrum — split-pane oscilloscope + spectrum analyzer
     ============================================================ */
  const Spectrum = (() => {
    const cv = $("#spectrum");
    if (!cv || !cv.getContext) return {};
    const c = cv.getContext("2d");
    let W = 0, H = 0, dpr = 1;
    const state = { freq: 220, cut: 1800, lfo: 0.7, q: 3, gain: 0, view: "spectrum" };
    let last = performance.now();
    let t0 = performance.now();
    let lastFpsT = performance.now();
    let frames = 0;
    let peakHold = new Float32Array(256).fill(-Infinity);
    let rmsAccum = 0;

    const fpsEl = $("#viz-fps");
    const rmsEl = $("#r-rms");
    const cutEl = $("#r-cut");

    const resize = () => {
      dpr = Math.min(2, devicePixelRatio || 1);
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const $ctl = (id) => $(id);
    const bind = (id, valId, key, fmt) => {
      const el = $ctl(id); const v = $ctl(valId); if (!el) return;
      el.addEventListener("input", () => { state[key] = parseFloat(el.value); if (v) v.textContent = fmt(state[key]); });
    };
    bind("#ctl-freq", "#val-freq", "freq", (x) => `${x.toFixed(0)} Hz`);
    bind("#ctl-cut",  "#val-cut",  "cut",  (x) => `${x.toFixed(0)} Hz`);
    bind("#ctl-lfo",  "#val-lfo",  "lfo",  (x) => `${x.toFixed(2)} Hz`);
    bind("#ctl-q",    "#val-q",    "q",    (x) => x.toFixed(1));
    bind("#ctl-gain", "#val-gain", "gain", (x) => `${x.toFixed(1)} dB`);

    $$(".viz-tab").forEach((b) => b.addEventListener("click", () => {
      $$(".viz-tab").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      state.view = b.dataset.view;
    }));

    // RBJ biquad lowpass magnitude (dB at f)
    const biquadLP_dB = (f, f0, Q) => {
      const fs = 48000;
      const w0 = 2 * Math.PI * f0 / fs;
      const cw = Math.cos(w0), sw = Math.sin(w0);
      const alpha = sw / (2 * Q);
      const b0 = (1 - cw) / 2, b1 = 1 - cw, b2 = (1 - cw) / 2;
      const a0 = 1 + alpha, a1 = -2 * cw, a2 = 1 - alpha;
      const W2 = 2 * Math.PI * f / fs;
      const cW = Math.cos(W2), sW = Math.sin(W2);
      const numRe = b0 + b1 * cW + b2 * Math.cos(2 * W2);
      const numIm = -b1 * sW - b2 * Math.sin(2 * W2);
      const denRe = a0 + a1 * cW + a2 * Math.cos(2 * W2);
      const denIm = -a1 * sW - a2 * Math.sin(2 * W2);
      return 10 * Math.log10(Math.max(1e-12, (numRe * numRe + numIm * numIm) / (denRe * denRe + denIm * denIm)));
    };

    const fMin = 20, fMax = 20000;
    const N = 256;
    const xToF = (i) => fMin * Math.pow(fMax / fMin, i / (N - 1));
    const fToX = (f) => Math.log10(f / fMin) / Math.log10(fMax / fMin) * W;
    const dBToY = (db) => H - ((db + 60) / 72) * H;

    // Generate one period of input + filtered output (time domain)
    const sampleTime = (t, f, cut, q) => {
      // simple biquad step response: input is sawtooth, output is filtered
      const phase = (t * f) % 1;
      const inWav = 2 * phase - 1; // saw
      // simple LP via single-pole for speed (visual approximation)
      const RC = 1 / (2 * Math.PI * cut);
      const dt = 1 / 48000;
      // run a mini sim of 64 samples per pixel
      let y = 0, sumSq = 0, count = 0;
      const phaseStep = f / 48000;
      let p = phase;
      for (let i = 0; i < 48; i++) {
        const inp = 2 * p - 1;
        const alpha = dt / (RC + dt);
        y = y + alpha * (inp - y);
        sumSq += y * y; count++;
        p += phaseStep; if (p >= 1) p -= 1;
      }
      const out = y * Math.pow(10, state.gain / 20);
      rmsAccum = rmsAccum * 0.95 + (sumSq / count) * 0.05;
      return [inWav, out];
    };

    const drawScope = (t) => {
      const cy = H * 0.5;
      // background
      c.strokeStyle = gridCol();
      c.lineWidth = 1;
      c.beginPath(); c.moveTo(0, cy); c.lineTo(W, cy); c.stroke();
      // grid
      c.globalAlpha = 0.4;
      for (let i = 1; i < 8; i++) {
        c.beginPath(); c.moveTo(0, (H / 8) * i); c.lineTo(W, (H / 8) * i); c.stroke();
      }
      for (let i = 1; i < 16; i++) {
        c.beginPath(); c.moveTo((W / 16) * i, 0); c.lineTo((W / 16) * i, H); c.stroke();
      }
      c.globalAlpha = 1;

      // input (faint)
      c.strokeStyle = textPri();
      c.globalAlpha = 0.4;
      c.lineWidth = 1.5;
      c.beginPath();
      for (let i = 0; i < W; i++) {
        const tt = t + i / W * (4 / state.freq);
        const [inW] = sampleTime(tt, state.freq, state.cut, state.q);
        const y = cy - inW * H * 0.3;
        i ? c.lineTo(i, y) : c.moveTo(i, y);
      }
      c.stroke();

      // output (accent, additive)
      c.globalCompositeOperation = "lighter";
      c.strokeStyle = accent();
      c.globalAlpha = 0.95;
      c.lineWidth = 2;
      c.beginPath();
      for (let i = 0; i < W; i++) {
        const tt = t + i / W * (4 / state.freq);
        const [, out] = sampleTime(tt, state.freq, state.cut, state.q);
        const y = cy - out * H * 0.32;
        i ? c.lineTo(i, y) : c.moveTo(i, y);
      }
      c.stroke();
      c.globalAlpha = 1;
      c.globalCompositeOperation = "source-over";

      // labels
      c.fillStyle = textMut();
      c.font = "10px JetBrains Mono, monospace";
      c.textAlign = "left";
      c.fillText("in", 8, 16);
      c.fillStyle = accent();
      c.fillText("out", 8, 30);
    };

    const drawSpectrum = (t) => {
      const time = t / 1000;
      const lfoMod = state.cut * (1 + 0.6 * Math.sin(2 * Math.PI * state.lfo * time));
      c.fillStyle = gridCol();
      c.lineWidth = 1;
      // grid (log freq)
      const dec = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
      dec.forEach((f) => {
        const x = fToX(f);
        c.globalAlpha = 0.4;
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke();
        c.globalAlpha = 1;
      });
      for (let db = -60; db <= 12; db += 12) {
        const y = dBToY(db);
        c.globalAlpha = 0.3;
        c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke();
        c.globalAlpha = 1;
      }

      // input spectrum
      c.strokeStyle = textPri();
      c.globalAlpha = 0.55;
      c.lineWidth = 1.5;
      c.beginPath();
      for (let i = 0; i < N; i++) {
        const f = xToF(i);
        let mag = -60;
        for (let h = 1; h <= 8; h++) {
          const fh = state.freq * h;
          const env = 1 / Math.pow(h, 1.4);
          mag = Math.max(mag, -12 + 20 * Math.log10(env) - Math.abs(Math.log2(f / fh)) * 6);
        }
        const x = (i / (N - 1)) * W;
        const y = dBToY(mag);
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.stroke();

      // LFO envelope (dashed accent)
      c.strokeStyle = accent();
      c.globalAlpha = 0.4;
      c.setLineDash([4, 4]);
      c.beginPath();
      for (let i = 0; i < N; i++) {
        const f = xToF(i);
        const db = biquadLP_dB(f, lfoMod, state.q) + 4 * Math.sin(2 * Math.PI * state.lfo * time + i * 0.05);
        const x = (i / (N - 1)) * W;
        const y = dBToY(db);
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.stroke();
      c.setLineDash([]);

      // filtered output
      c.globalCompositeOperation = "lighter";
      c.strokeStyle = accent();
      c.globalAlpha = 1;
      c.lineWidth = 2;
      c.beginPath();
      for (let i = 0; i < N; i++) {
        const f = xToF(i);
        const db = biquadLP_dB(f, state.cut, state.q) + state.gain;
        const x = (i / (N - 1)) * W;
        const y = dBToY(db);
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.stroke();

      // peak-hold
      c.globalCompositeOperation = "source-over";
      c.strokeStyle = textMut();
      c.globalAlpha = 0.7;
      c.setLineDash([1, 3]);
      c.lineWidth = 1;
      c.beginPath();
      for (let i = 0; i < N; i++) {
        const f = xToF(i);
        const db = biquadLP_dB(f, state.cut, state.q) + state.gain;
        peakHold[i] = Math.max(peakHold[i] - 0.05, db);
        const x = (i / (N - 1)) * W;
        const y = dBToY(peakHold[i]);
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.stroke();
      c.setLineDash([]);

      // freq marker
      const fMx = fToX(state.freq);
      c.globalAlpha = 0.9;
      c.fillStyle = accent();
      c.fillRect(fMx - 0.5, 0, 1, H);
      c.globalAlpha = 1;
    };

    const draw = (now) => {
      const dt = Math.min(48, now - last); last = now;
      frames++;
      if (now - lastFpsT > 500) {
        if (fpsEl) fpsEl.textContent = Math.round(frames * 1000 / (now - lastFpsT));
        frames = 0; lastFpsT = now;
      }
      const time = (now - t0) / 1000;
      c.fillStyle = bgPrim();
      c.fillRect(0, 0, W, H);

      if (state.view === "spectrum") drawSpectrum(now);
      else if (state.view === "scope") drawScope(time);
      else { drawSpectrum(now); /* faint overlay of scope */ }

      if (rmsEl) rmsEl.textContent = Math.sqrt(rmsAccum).toFixed(3);
      if (cutEl) cutEl.textContent = state.cut.toFixed(0);

      raf(draw);
    };
    raf(draw);
    return {};
  })();

  /* ============================================================
     Stat bars — animate on first paint
     ============================================================ */
  (() => {
    if (prefersReduced) return;
    const bars = $$(".stat-bar i");
    requestAnimationFrame(() => {
      bars.forEach((b, i) => {
        setTimeout(() => { b.style.width = b.style.getPropertyValue("--w"); }, 200 + i * 80);
      });
    });
  })();

})();
