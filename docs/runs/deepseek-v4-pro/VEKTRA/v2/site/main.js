(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════
  // CONFIG
  // ═══════════════════════════════════════════════════════════════════
  var ACCENT_R = 200, ACCENT_G = 117, ACCENT_B = 30;
  var BG_R = 12, BG_G = 11, BG_B = 10;

  // ═══════════════════════════════════════════════════════════════════
  // MOBILE NAVIGATION
  // ═══════════════════════════════════════════════════════════════════
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // SCROLLED NAV STATE
  // ═══════════════════════════════════════════════════════════════════
  var nav = document.getElementById('nav');
  var lastScrollY = 0;
  function updateNav() {
    var y = window.scrollY || window.pageYOffset;
    if (y > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    lastScrollY = y;
    requestAnimationFrame(function () {});
  }
  window.addEventListener('scroll', updateNav, { passive: true });

  // ═══════════════════════════════════════════════════════════════════
  // THEME TOGGLE
  // ═══════════════════════════════════════════════════════════════════
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    var saved = localStorage.getItem('vektra-theme');
    if (saved === 'light') document.body.classList.add('theme-light');
    else if (saved === 'dark') document.body.classList.add('theme-dark');

    themeToggle.addEventListener('click', function () {
      if (document.body.classList.contains('theme-light')) {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        localStorage.setItem('vektra-theme', 'dark');
      } else if (document.body.classList.contains('theme-dark')) {
        document.body.classList.remove('theme-dark');
        localStorage.setItem('vektra-theme', 'system');
      } else {
        document.body.classList.add('theme-light');
        localStorage.setItem('vektra-theme', 'light');
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // REVEAL ANIMATIONS (Intersection Observer)
  // ═══════════════════════════════════════════════════════════════════
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    revealObserver.observe(el);
  });

  // Scroll hint
  var scrollHint = document.querySelector('.hero-scroll-hint');
  if (scrollHint) {
    setTimeout(function () { scrollHint.classList.add('visible'); }, 2000);
  }

  // ═══════════════════════════════════════════════════════════════════
  // GENERATIVE HERO BACKGROUND — Multi-layer signal field
  // ═══════════════════════════════════════════════════════════════════
  var heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    var hCtx = heroCanvas.getContext('2d');
    var hW, hH;
    var particles = [];
    var PARTICLE_COUNT = 140;
    var mouse = { x: -2000, y: -2000, tx: -2000, ty: -2000 };
    var scrollNormal = 0;
    var time = 0;

    function heroResize() {
      var rect = heroCanvas.parentElement.getBoundingClientRect();
      hW = rect.width; hH = rect.height;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      heroCanvas.width = Math.floor(hW * dpr);
      heroCanvas.height = Math.floor(hH * dpr);
      heroCanvas.style.width = hW + 'px';
      heroCanvas.style.height = hH + 'px';
      hCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function heroInitParticles() {
      particles = [];
      for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * hW, y: Math.random() * hH,
          baseX: Math.random() * hW, baseY: Math.random() * hH,
          vx: 0, vy: 0,
          radius: Math.random() * 2.2 + 0.6,
          phase: Math.random() * Math.PI * 2,
          freq: Math.random() * 0.006 + 0.002,
          amp: Math.random() * 40 + 10,
          depth: Math.random()
        });
      }
    }

    function springTo(current, target, tension, friction, dt) {
      var accel = (target - current) * tension;
      return accel * dt;
    }

    function heroDraw() {
      hCtx.clearRect(0, 0, hW, hH);
      time += 0.016;

      // Smooth mouse tracking with spring
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      // Draw connections — only for nearby particles
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var maxConn = 160;

          if (dist < maxConn) {
            var t = 1 - dist / maxConn;
            var alpha = t * t * 0.14;
            hCtx.strokeStyle = 'rgba(' + ACCENT_R + ',' + ACCENT_G + ',' + ACCENT_B + ',' + alpha + ')';
            hCtx.lineWidth = 0.5;
            hCtx.beginPath();
            hCtx.moveTo(particles[i].x, particles[i].y);
            hCtx.lineTo(particles[j].x, particles[j].y);
            hCtx.stroke();
          }
        }
      }

      // Update and draw particles
      for (var k = 0; k < particles.length; k++) {
        var p = particles[k];

        // Base oscillation around home position
        var tx = p.baseX + Math.sin(time * p.freq * 1.3 + p.phase) * p.amp;
        var ty = p.baseY + Math.cos(time * p.freq * 0.8 + p.phase) * p.amp * 0.7;

        // Scroll-based vertical drift
        ty -= scrollNormal * p.depth * 40;

        // Mouse vortex effect — particles orbit
        var mdx = mouse.x - p.x;
        var mdy = mouse.y - p.y;
        var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        var influence = 220;

        if (mdist < influence && mouse.x > 0) {
          var force = (1 - mdist / influence);
          force = force * force;
          // Pull toward mouse
          tx = p.x + (mdx / mdist) * force * 60;
          ty = p.y + (mdy / mdist) * force * 60;
        }

        // Spring physics toward target
        var springForce = 0.025;
        p.vx += (tx - p.x) * springForce;
        p.vy += (ty - p.y) * springForce;
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -50) p.x = hW + 50; if (p.x > hW + 50) p.x = -50;
        if (p.y < -50) p.y = hH + 50; if (p.y > hH + 50) p.y = -50;

        // Draw
        var pAlpha = 0.3 + p.depth * 0.35;
        hCtx.fillStyle = 'rgba(' + ACCENT_R + ',' + ACCENT_G + ',' + ACCENT_B + ',' + pAlpha + ')';
        hCtx.beginPath();
        hCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        hCtx.fill();
      }

      // Mouse glow
      if (mouse.x > 0) {
        var glow = hCtx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        glow.addColorStop(0, 'rgba(' + ACCENT_R + ',' + ACCENT_G + ',' + ACCENT_B + ',0.07)');
        glow.addColorStop(0.6, 'rgba(' + ACCENT_R + ',' + ACCENT_G + ',' + ACCENT_B + ',0.02)');
        glow.addColorStop(1, 'rgba(' + ACCENT_R + ',' + ACCENT_G + ',' + ACCENT_B + ',0)');
        hCtx.fillStyle = glow;
        hCtx.fillRect(mouse.x - 180, mouse.y - 180, 360, 360);
      }

      requestAnimationFrame(heroDraw);
    }

    heroResize();
    heroInitParticles();
    heroDraw();

    window.addEventListener('resize', function () {
      heroResize();
      heroInitParticles();
    });

    document.addEventListener('mousemove', function (e) {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    });
    document.addEventListener('touchmove', function (e) {
      mouse.tx = e.touches[0].clientX;
      mouse.ty = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('scroll', function () {
      scrollNormal = (window.scrollY || window.pageYOffset) / (hH * 0.8);
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════════
  // MAGNETIC BUTTONS — spring-based cursor attraction
  // ═══════════════════════════════════════════════════════════════════
  document.querySelectorAll('.btn-magnetic').forEach(function (btn) {
    var magnetX = 0, magnetY = 0;
    var tx = 0, ty = 0;

    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      tx = (e.clientX - cx) * 0.3;
      ty = (e.clientY - cy) * 0.3;
    });

    btn.addEventListener('mouseleave', function () {
      tx = 0; ty = 0;
    });

    function animateMagnet() {
      magnetX += (tx - magnetX) * 0.2;
      magnetY += (ty - magnetY) * 0.2;
      btn.style.transform = 'translate(' + magnetX.toFixed(2) + 'px, ' + magnetY.toFixed(2) + 'px)';
      if (Math.abs(tx - magnetX) > 0.05 || Math.abs(ty - magnetY) > 0.05) {
        requestAnimationFrame(animateMagnet);
      }
    }

    btn.addEventListener('mouseenter', function () {
      requestAnimationFrame(animateMagnet);
    });
  });

  // ═══════════════════════════════════════════════════════════════════
  // EMBEDDED SIGNAL VISUALIZATION
  // ═══════════════════════════════════════════════════════════════════
  var signalCanvas = document.getElementById('signalCanvas');
  if (signalCanvas) {
    var sCtx = signalCanvas.getContext('2d');
    var tooltip = document.getElementById('signalTooltip');
    var thresholdSlider = document.getElementById('signalThreshold');
    var thresholdValue = document.getElementById('signalValue');
    var threshold = 0.25;

    var freqBins = [
      { label: 'Sub 30Hz', value: 0.14 },{ label: '40Hz', value: 0.20 },
      { label: '50Hz', value: 0.28 },  { label: '63Hz', value: 0.38 },
      { label: '80Hz', value: 0.52 },   { label: '100Hz', value: 0.34 },
      { label: '125Hz', value: 0.26 },  { label: '160Hz', value: 0.66 },
      { label: '200Hz', value: 0.75 },  { label: '250Hz', value: 0.44 },
      { label: '315Hz', value: 0.31 },  { label: '400Hz', value: 0.83 },
      { label: '500Hz', value: 0.91 },  { label: '630Hz', value: 0.56 },
      { label: '800Hz', value: 0.42 },  { label: '1kHz', value: 0.78 },
      { label: '1.25kHz', value: 0.52 }, { label: '1.6kHz', value: 0.36 },
      { label: '2kHz', value: 0.28 },    { label: '2.5kHz', value: 0.55 },
      { label: '3.15kHz', value: 0.68 }, { label: '4kHz', value: 0.44 },
      { label: '5kHz', value: 0.30 },    { label: '6.3kHz', value: 0.22 },
      { label: '8kHz', value: 0.34 },    { label: '10kHz', value: 0.40 },
      { label: '12.5kHz', value: 0.19 }, { label: '16kHz', value: 0.13 },
      { label: '20kHz', value: 0.07 }
    ];

    function drawSignal() {
      var w = signalCanvas.width;
      var h = signalCanvas.height;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      signalCanvas.width = w * dpr;
      signalCanvas.height = h * dpr;
      signalCanvas.style.width = w + 'px'; signalCanvas.style.height = h + 'px';
      sCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sCtx.clearRect(0, 0, w, h);

      var pad = 50;
      var barW = (w - pad * 2) / freqBins.length;
      var maxH = h - pad * 2;
      var barGap = Math.max(1, barW * 0.2);

      for (var i = 0; i < freqBins.length; i++) {
        var val = freqBins[i].value;
        var barH = val * maxH;
        var x = pad + i * barW + barGap / 2;
        var bw = barW - barGap;
        var y = h - pad - barH;

        var grad = sCtx.createLinearGradient(x, y, x, h - pad);
        if (val >= threshold) {
          grad.addColorStop(0, 'rgba(200,117,30,0.9)');
          grad.addColorStop(1, 'rgba(200,117,30,0.15)');
        } else {
          grad.addColorStop(0, 'rgba(160,152,144,0.3)');
          grad.addColorStop(1, 'rgba(160,152,144,0.05)');
        }
        sCtx.fillStyle = grad;
        sCtx.fillRect(x, y, bw, barH);

        if (i % 5 === 0) {
          sCtx.fillStyle = '#4A443E'; sCtx.font = '9px "JetBrains Mono",monospace';
          sCtx.textAlign = 'center'; sCtx.fillText(freqBins[i].label, x + bw / 2, h - pad + 14);
        }
      }

      // Baseline and threshold line
      sCtx.strokeStyle = '#282420'; sCtx.lineWidth = 1;
      sCtx.beginPath(); sCtx.moveTo(pad, h - pad); sCtx.lineTo(w - pad, h - pad); sCtx.stroke();

      var tY = h - pad - threshold * maxH;
      sCtx.strokeStyle = 'rgba(200,117,30,0.35)'; sCtx.setLineDash([3, 8]);
      sCtx.beginPath(); sCtx.moveTo(pad, tY); sCtx.lineTo(w - pad, tY); sCtx.stroke();
      sCtx.setLineDash([]);
    }

    drawSignal();

    signalCanvas.addEventListener('mousemove', function (e) {
      var rect = signalCanvas.getBoundingClientRect();
      var scaleX = signalCanvas.width / rect.width;
      var x = (e.clientX - rect.left) * scaleX;
      var pad = 50; var barW = (signalCanvas.width - pad * 2) / freqBins.length;
      var idx = Math.floor((x - pad) / barW);
      if (idx >= 0 && idx < freqBins.length) {
        tooltip.hidden = false;
        tooltip.textContent = freqBins[idx].label + ' · ' + (freqBins[idx].value * 100).toFixed(0) + '%';
        tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 34) + 'px';
      } else { tooltip.hidden = true; }
    });
    signalCanvas.addEventListener('mouseleave', function () { tooltip.hidden = true; });

    if (thresholdSlider && thresholdValue) {
      thresholdSlider.addEventListener('input', function () {
        threshold = parseFloat(this.value) / 100;
        thresholdValue.textContent = threshold.toFixed(2);
        drawSignal();
      });
    }

    window.addEventListener('resize', drawSignal);
  }

})();