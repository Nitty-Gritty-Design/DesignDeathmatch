/* ══════════════════════════════════════════════════════
   VEKTRA v2 — site/main.js
   GSAP-powered animations, generative canvas, D3 spectrum.
   ══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Mobile nav ──
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var nav = document.getElementById('nav');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(function (l) {
      l.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Nav scroll state ──
  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        if (window.scrollY > 60) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // ── GSAP ScrollTrigger reveal animations ──
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    var heroEls = document.querySelectorAll('#hero [data-reveal]');
    var heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    heroEls.forEach(function (el, i) {
      heroTl.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        0.3 + i * 0.15
      );
    });

    // Section reveals
    document.querySelectorAll('.section [data-reveal]').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Capability cards — staggered
    gsap.utils.toArray('.cap').forEach(function (card, i) {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Archetype cards — staggered
    gsap.utils.toArray('.arch').forEach(function (card, i) {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Parallax on hero headline
    gsap.to('.hero__headline', {
      y: 80,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Parallax on hero canvas
    gsap.to('.hero__canvas', {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Section headline split emphasis
    gsap.utils.toArray('.section__headline').forEach(function (h) {
      gsap.fromTo(h,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: h,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  // ── Mouse parallax on hero ──
  var hero = document.getElementById('hero');
  var heroHeadline = document.querySelector('.hero__headline');

  if (hero && heroHeadline) {
    var mx = 0, my = 0, tmx = 0, tmy = 0;

    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      tmx = (e.clientX - rect.left) / rect.width - 0.5;
      tmy = (e.clientY - rect.top) / rect.height - 0.5;
    });
    hero.addEventListener('mouseleave', function () {
      tmx = 0; tmy = 0;
    });

    function smoothFollow() {
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;
      heroHeadline.style.transform = 'translate(' + (mx * 8) + 'px, ' + (my * 5) + 'px)';
      requestAnimationFrame(smoothFollow);
    }
    smoothFollow();
  }

  // ══════════════════════════════════════
  // GENERATIVE HERO CANVAS — Signal Field v2
  // ══════════════════════════════════════
  var canvas = document.getElementById('heroCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var cmx = -9999, cmy = -9999;
    var tcmx = -9999, tcmy = -9999;
    var time = 0;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (hero) {
      hero.addEventListener('mousemove', function (e) {
        var rect = hero.getBoundingClientRect();
        tcmx = e.clientX - rect.left;
        tcmy = e.clientY - rect.top;
      });
      hero.addEventListener('mouseleave', function () {
        tcmx = -9999; tcmy = -9999;
      });
    }

    // Brand colors extracted for canvas
    var AR = 255, AG = 94, AB = 26;
    var SR = 0, SG = 212, SB = 170;
    var TR = 237, TG = 236, TB = 234;

    var LINE_COUNT = 42;
    var SPACING = 13;
    var BASE_AMP = 16;

    function drawSignalField() {
      time += 0.005;

      // Smooth mouse
      cmx += (tcmx - cmx) * 0.06;
      cmy += (tcmy - cmy) * 0.06;

      var w = canvas.offsetWidth;
      var h = canvas.offsetHeight;
      var midY = h * 0.5;

      ctx.clearRect(0, 0, w, h);

      // Ambient radial glow near cursor
      if (cmx > -999) {
        var grad = ctx.createRadialGradient(cmx, cmy, 0, cmx, cmy, 400);
        grad.addColorStop(0, 'rgba(' + AR + ',' + AG + ',' + AB + ',0.04)');
        grad.addColorStop(0.4, 'rgba(' + AR + ',' + AG + ',' + AB + ',0.015)');
        grad.addColorStop(1, 'rgba(' + AR + ',' + AG + ',' + AB + ',0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      for (var i = 0; i < LINE_COUNT; i++) {
        var baseY = midY + (i - LINE_COUNT / 2) * SPACING;
        var amp = BASE_AMP + i * 0.9;
        var freq = 0.0022 + i * 0.00012;
        var phase = time * (0.5 + i * 0.035);
        var distMouse = Math.abs(baseY - cmy);
        var mInf = Math.max(0, 1 - distMouse / 280);
        var baseAlpha = 0.02 + (i / LINE_COUNT) * 0.04 + mInf * 0.22;

        ctx.beginPath();
        for (var x = 0; x <= w; x += 2) {
          var dx = Math.abs(x - cmx);
          var prox = Math.exp(-dx / 280) * mInf;
          var mouseAmp = prox * 35;
          var y = baseY
            + Math.sin(x * freq + phase) * amp
            + Math.sin(x * freq * 2.13 + phase * 1.4) * (amp * 0.22)
            + Math.sin(x * freq * 3.37 + phase * 0.7) * (amp * 0.08)
            + mouseAmp * Math.sin(x * 0.005 + time * 2.8);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Color interpolation: text -> accent near cursor, text -> signal far from cursor
        if (mInf > 0.05) {
          var b = mInf * 0.8;
          var r = Math.round(TR + (AR - TR) * b);
          var g = Math.round(TG + (AG - TG) * b);
          var bl = Math.round(TB + (AB - TB) * b);
          ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + bl + ',' + baseAlpha + ')';
          ctx.lineWidth = 0.6 + mInf * 0.8;
        } else {
          // Faint signal-teal hint on every 5th line
          if (i % 5 === 0) {
            ctx.strokeStyle = 'rgba(' + SR + ',' + SG + ',' + SB + ',' + (baseAlpha * 0.5) + ')';
          } else {
            ctx.strokeStyle = 'rgba(' + TR + ',' + TG + ',' + TB + ',' + baseAlpha + ')';
          }
          ctx.lineWidth = 0.6;
        }
        ctx.stroke();
      }

      // Floating accent particles near cursor
      if (cmx > -999) {
        for (var p = 0; p < 8; p++) {
          var pPhase = time * (1.5 + p * 0.4);
          var px = cmx + Math.sin(pPhase * 1.3) * 120 - 60;
          var lineIdx = Math.round(LINE_COUNT / 2 + (cmy - midY) / SPACING);
          lineIdx = Math.max(0, Math.min(LINE_COUNT - 1, lineIdx));
          var pFreq = 0.0022 + lineIdx * 0.00012;
          var py = (midY + (lineIdx - LINE_COUNT / 2) * SPACING)
            + Math.sin(px * pFreq + pPhase) * (BASE_AMP + lineIdx * 0.9);
          var pAlpha = (0.15 + Math.sin(pPhase * 2) * 0.1) * Math.max(0, 1 - Math.abs(px - cmx) / 200);

          ctx.beginPath();
          ctx.arc(px, py, 1.2 + Math.sin(pPhase) * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + pAlpha + ')';
          ctx.fill();
        }

        // Peak glow dot at cursor
        var glowGrad = ctx.createRadialGradient(cmx, cmy, 0, cmx, cmy, 60);
        glowGrad.addColorStop(0, 'rgba(' + AR + ',' + AG + ',' + AB + ',0.06)');
        glowGrad.addColorStop(1, 'rgba(' + AR + ',' + AG + ',' + AB + ',0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(cmx - 60, cmy - 60, 120, 120);
      }

      requestAnimationFrame(drawSignalField);
    }
    drawSignalField();
  }

  // ══════════════════════════════════════
  // D3 FREQUENCY SPECTRUM v2
  // ══════════════════════════════════════
  var vizContainer = document.getElementById('vizContainer');
  if (vizContainer && typeof d3 !== 'undefined') {
    var spectrumData = [
      { band: '20–60 Hz',    freq: 'Sub-bass',       db: -18, harmonic: false, type: 'noise'    },
      { band: '60–150 Hz',   freq: 'Bass',           db: -8,  harmonic: false, type: 'fund'     },
      { band: '150–300 Hz',  freq: 'Low-mid',        db: -12, harmonic: false, type: 'noise'    },
      { band: '300–600 Hz',  freq: 'Mid',            db: -14, harmonic: true,  type: 'harm'     },
      { band: '600–1.2k Hz', freq: 'Upper-mid',      db: -6,  harmonic: true,  type: 'harm'     },
      { band: '1.2–2.4k Hz', freq: 'Presence',       db: -3,  harmonic: true,  type: 'fund'     },
      { band: '2.4–5k Hz',   freq: 'Brilliance',     db: -9,  harmonic: true,  type: 'harm'     },
      { band: '5–10k Hz',    freq: 'Upper',          db: -16, harmonic: false, type: 'noise'    },
      { band: '10–16k Hz',   freq: 'Air',            db: -28, harmonic: false, type: 'noise'    },
      { band: '16–20k Hz',   freq: 'Ultrasonic',     db: -42, harmonic: false, type: 'noise'    },
      { band: '60 Hz',       freq: 'Fundamental',     db: -7,  harmonic: true,  type: 'fund'     },
      { band: '120 Hz',      freq: '2nd harmonic',    db: -11, harmonic: true,  type: 'harm'     },
      { band: '180 Hz',      freq: '3rd harmonic',    db: -16, harmonic: true,  type: 'harm'     },
      { band: '240 Hz',      freq: '4th harmonic',    db: -22, harmonic: true,  type: 'harm'     },
      { band: '300 Hz',      freq: '5th harmonic',    db: -28, harmonic: true,  type: 'harm'     },
      { band: '440 Hz',      freq: 'Tuning ref',      db: -5,  harmonic: true,  type: 'fund'     },
      { band: '880 Hz',      freq: 'Octave',          db: -9,  harmonic: true,  type: 'harm'     },
      { band: '1.76k Hz',    freq: '2nd octave',      db: -13, harmonic: true,  type: 'harm'     },
      { band: '3.52k Hz',    freq: '3rd octave',      db: -19, harmonic: true,  type: 'harm'     },
      { band: '7.04k Hz',    freq: '4th octave',      db: -31, harmonic: false, type: 'noise'    }
    ];

    var selectedBand = null;
    var vizW = vizContainer.clientWidth;
    var vizH = 420;
    var margin = { top: 50, right: 30, bottom: 70, left: 65 };
    var innerW = vizW - margin.left - margin.right;
    var innerH = vizH - margin.top - margin.bottom;

    var svg = d3.select(vizContainer)
      .append('svg')
      .attr('viewBox', '0 0 ' + vizW + ' ' + vizH)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var x = d3.scaleBand()
      .domain(spectrumData.map(function (d) { return d.band; }))
      .range([0, innerW])
      .padding(0.22);

    var y = d3.scaleLinear()
      .domain([-50, 0])
      .range([innerH, 0]);

    // Grid
    svg.selectAll('.grid-line')
      .data([-40, -30, -20, -10, 0])
      .enter().append('line')
      .attr('x1', 0).attr('x2', innerW)
      .attr('y1', function (d) { return y(d); })
      .attr('y2', function (d) { return y(d); })
      .attr('stroke', '#222228')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', function (d) { return d === 0 ? 'none' : '2,4'; });

    // dB labels
    svg.selectAll('.db-label')
      .data([-40, -20, 0])
      .enter().append('text')
      .attr('x', -12).attr('y', function (d) { return y(d) + 4; })
      .attr('text-anchor', 'end')
      .attr('fill', '#4A4740')
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('font-size', '10px')
      .text(function (d) { return d + ' dB'; });

    // "0 dB" reference line
    svg.append('line')
      .attr('x1', 0).attr('x2', innerW)
      .attr('y1', y(0)).attr('y2', y(0))
      .attr('stroke', '#FF5E1A')
      .attr('stroke-width', 0.8)
      .attr('opacity', 0.3);

    // Bars — animated entrance with GSAP if available
    var bars = svg.selectAll('.bar')
      .data(spectrumData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function (d) { return x(d.band); })
      .attr('width', x.bandwidth())
      .attr('rx', 1)
      .attr('y', innerH)
      .attr('height', 0)
      .attr('fill', function (d) {
        if (d.type === 'fund') return '#FF5E1A';
        if (d.type === 'harm') return '#00D4AA';
        return '#4A4740';
      })
      .attr('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        d3.select(this).attr('opacity', 0.85);
        var tip = d3.select(vizContainer).append('div').attr('class', 'viz__tooltip')
          .style('left', (event.offsetX + 14) + 'px')
          .style('top', (event.offsetY - 32) + 'px');
        tip.html('<strong style="color:#FF5E1A">' + d.freq + '</strong><br>' +
          d.band + ' &middot; ' + d.db + ' dB<br>' +
          '<span style="color:#4A4740">' + (d.harmonic ? 'Harmonic' : 'Noise floor') + '</span>');
      })
      .on('mouseleave', function (event, d) {
        d3.select(this).attr('opacity', 1);
        d3.select(vizContainer).selectAll('.viz__tooltip').remove();
      })
      .on('click', function (event, d) {
        if (selectedBand === d.band) {
          selectedBand = null;
          bars.transition().duration(300).attr('opacity', 1)
            .attr('fill', function (b) {
              if (b.type === 'fund') return '#FF5E1A';
              if (b.type === 'harm') return '#00D4AA';
              return '#4A4740';
            });
        } else {
          selectedBand = d.band;
          bars.transition().duration(300)
            .attr('opacity', function (b) { return b.band === d.band ? 1 : 0.15; })
            .attr('fill', function (b) {
              return b.band === d.band
                ? (b.type === 'noise' ? '#FF5E1A' : '#FF5E1A')
                : '#222228';
            });
        }
      });

    // Animate bar entrance
    if (typeof gsap !== 'undefined') {
      ScrollTrigger.create({
        trigger: vizContainer,
        start: 'top 80%',
        onEnter: function () {
          bars.transition()
            .duration(800)
            .delay(function (d, i) { return i * 30; })
            .ease(d3.easeCubicOut)
            .attr('y', function (d) { return y(d.db); })
            .attr('height', function (d) { return innerH - y(d.db); });
        },
        once: true
      });
    } else {
      bars.attr('y', function (d) { return y(d.db); })
        .attr('height', function (d) { return innerH - y(d.db); });
    }

    // X-axis labels
    svg.selectAll('.x-label')
      .data(spectrumData)
      .enter().append('text')
      .attr('x', function (d) { return x(d.band) + x.bandwidth() / 2; })
      .attr('y', innerH + 16)
      .attr('text-anchor', 'end')
      .attr('transform', function (d) {
        return 'rotate(-50 ' + (x(d.band) + x.bandwidth() / 2) + ' ' + (innerH + 16) + ')';
      })
      .attr('fill', '#4A4740')
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('font-size', '9px')
      .text(function (d) { return d.freq; });

    // Legend
    var legend = svg.append('g').attr('transform', 'translate(' + (innerW - 260) + ', -28)');
    legend.append('rect').attr('width', 10).attr('height', 10).attr('rx', 1).attr('fill', '#FF5E1A');
    legend.append('text').attr('x', 16).attr('y', 9).attr('fill', '#8A8680')
      .attr('font-family', "'JetBrains Mono', monospace").attr('font-size', '10px')
      .text('Fundamental');
    legend.append('rect').attr('x', 100).attr('width', 10).attr('height', 10).attr('rx', 1).attr('fill', '#00D4AA');
    legend.append('text').attr('x', 116).attr('y', 9).attr('fill', '#8A8680')
      .attr('font-family', "'JetBrains Mono', monospace").attr('font-size', '10px')
      .text('Harmonic');
    legend.append('rect').attr('x', 190).attr('width', 10).attr('height', 10).attr('rx', 1).attr('fill', '#4A4740');
    legend.append('text').attr('x', 206).attr('y', 9).attr('fill', '#8A8680')
      .attr('font-family', "'JetBrains Mono', monospace").attr('font-size', '10px')
      .text('Noise');
  }

})();
