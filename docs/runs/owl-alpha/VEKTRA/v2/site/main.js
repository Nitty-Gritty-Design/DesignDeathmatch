/**
 * VEKTRA Site — main.js v2
 *
 * Architecture:
 * - Custom cursor with smooth follow, hover detection, click feedback
 * - Mobile navigation with animated overlay
 * - Scroll-driven reveal system (IntersectionObserver + requestAnimationFrame)
 * - Nav scroll state with RAF-throttled scroll handler
 * - Generative hero canvas: Lissajous-based signal field with Perlin-like noise,
 *   particle physics, flowing connections, and multi-layered mouse interaction
 * - D3 force-directed signal graph with animated particles, glow effects,
 *   and enhanced interaction patterns
 *
 * Performance: All animations use requestAnimationFrame. Canvas uses offscreen
 * buffering where possible. IntersectionObserver for scroll triggers (no scroll
 * event listeners for reveals). RAF-throttled scroll handler for nav state only.
 */

(function () {
  'use strict';

  /* =============================================
     # Custom Cursor
     ============================================= */
  var cursor = document.getElementById('cursor');
  var cursorFollower = document.getElementById('cursorFollower');
  var mouseX = 0, mouseY = 0;
  var cursorX = 0, cursorY = 0;
  var followerX = 0, followerY = 0;
  var cursorRAF = null;

  if (cursor && cursorFollower && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mousedown', function () {
      cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', function () {
      cursor.classList.remove('clicking');
    });

    // Hover detection for interactive elements
    var hoverTargets = document.querySelectorAll('a, button, .how-card, .who-card, .viz-node, input, textarea');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
      });
    });

    function animateCursor() {
      // Sharp cursor follows closely
      cursorX += (mouseX - cursorX) * 0.35;
      cursorY += (mouseY - cursorY) * 0.35;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      // Follower lags behind
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';

      cursorRAF = requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  /* =============================================
     # Mobile Navigation
     ============================================= */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* =============================================
     # Nav Scroll State
     ============================================= */
  var nav = document.getElementById('nav');
  var scrollTicking = false;

  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* =============================================
     # Scroll-Driven Reveal System
     ============================================= */
  var revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* =============================================
     # Generative Hero Background v2
     Lissajous-based signal field with:
     - Multi-layered flowing waveforms (Perlin-like noise)
     - Particle system with spring physics
     - Flowing connection lines with distance-based opacity
     - Mouse-reactive signal distortion
     - Subtle scanline and vignette effects
     ============================================= */
  var heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    var ctx = heroCanvas.getContext('2d');
    var w, h, dpr;
    var mouseX = 0.5, mouseY = 0.5;
    var targetMouseX = 0.5, targetMouseY = 0.5;
    var time = 0;

    // Noise function (simplex-like, no library)
    function noise(x, y, t) {
      return Math.sin(x * 0.01 + t) * Math.cos(y * 0.013 + t * 0.7) +
             Math.sin(x * 0.023 - t * 0.5) * Math.cos(y * 0.017 + t * 0.3) * 0.5 +
             Math.sin((x + y) * 0.008 + t * 0.2) * 0.25;
    }

    // Wave layers
    var waveLayers = [];
    var numWaveLayers = 8;
    for (var i = 0; i < numWaveLayers; i++) {
      waveLayers.push({
        amplitude: 12 + Math.random() * 28,
        frequency: 0.0015 + Math.random() * 0.003,
        speed: 0.003 + Math.random() * 0.008,
        phase: Math.random() * Math.PI * 2,
        yOffset: 0.12 + (i / numWaveLayers) * 0.76,
        opacity: 0.015 + Math.random() * 0.04,
        harmonic: 1.8 + Math.random() * 1.5,
        noiseScale: 0.5 + Math.random() * 1.5
      });
    }

    // Particles with spring physics
    var particles = [];
    var numParticles = 55;
    for (var p = 0; p < numParticles; p++) {
      var px = Math.random();
      var py = Math.random();
      particles.push({
        x: px, y: py,
        ox: px, oy: py,  // origin for spring
        vx: 0, vy: 0,
        radius: 0.6 + Math.random() * 1.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
        springK: 0.0005 + Math.random() * 0.001,
        damping: 0.985 + Math.random() * 0.01
      });
    }

    // Signal flow particles (faster, along wave paths)
    var flowParticles = [];
    var numFlow = 15;
    for (var f = 0; f < numFlow; f++) {
      flowParticles.push({
        x: Math.random(),
        y: 0.1 + Math.random() * 0.8,
        speed: 0.0005 + Math.random() * 0.0015,
        size: 1 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.4
      });
    }

    function resize() {
      w = heroCanvas.parentElement.clientWidth;
      h = heroCanvas.parentElement.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      heroCanvas.width = w * dpr;
      heroCanvas.height = h * dpr;
      heroCanvas.style.width = w + 'px';
      heroCanvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resize);
    resize();

    heroCanvas.parentElement.addEventListener('mousemove', function (e) {
      var rect = heroCanvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = (e.clientY - rect.top) / rect.height;
    });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function draw() {
      time++;
      mouseX = lerp(mouseX, targetMouseX, 0.02);
      mouseY = lerp(mouseY, targetMouseY, 0.02);

      ctx.clearRect(0, 0, w, h);

      // === Wave layers ===
      waveLayers.forEach(function (wave) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 229, 255, ' + wave.opacity + ')';
        ctx.lineWidth = 0.8;

        for (var x = 0; x <= w; x += 3) {
          var baseY = h * wave.yOffset;
          var nx = x / w;

          // Multi-frequency synthesis
          var y = baseY +
            Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
            Math.sin(x * wave.frequency * wave.harmonic + time * wave.speed * 0.6) * (wave.amplitude * 0.3) +
            noise(x, baseY, time * wave.speed * 10) * wave.amplitude * wave.noiseScale;

          // Mouse distortion: waves bend toward cursor
          var dx = nx - mouseX;
          var dy = (baseY / h) - mouseY;
          var dist = Math.sqrt(dx * dx * 3 + dy * dy);
          var influence = Math.max(0, 1 - dist * 1.5);
          y += influence * 35 * Math.sin(time * 0.02 + nx * 12);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Ghost wave (offset, dimmer)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 229, 255, ' + (wave.opacity * 0.2) + ')';
        ctx.lineWidth = 0.4;
        for (var gx = 0; gx <= w; gx += 5) {
          var gBaseY = h * wave.yOffset;
          var gy = gBaseY +
            Math.sin(gx * wave.frequency * 0.4 + time * wave.speed * 0.25 + wave.phase + 2) * (wave.amplitude * 2);
          if (gx === 0) ctx.moveTo(gx, gy);
          else ctx.lineTo(gx, gy);
        }
        ctx.stroke();
      });

      // === Flow particles (signal traveling along waves) ===
      flowParticles.forEach(function (fp) {
        fp.x += fp.speed;
        if (fp.x > 1.05) fp.x = -0.05;

        var fpx = fp.x * w;
        var fpy = h * fp.y + Math.sin(fpx * 0.003 + time * 0.01) * 20;

        ctx.beginPath();
        ctx.arc(fpx, fpy, fp.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, ' + fp.opacity + ')';
        ctx.fill();

        // Trail
        for (var t = 1; t <= 6; t++) {
          var tx = (fp.x - fp.speed * t * 8) * w;
          var ty = h * fp.y + Math.sin(tx * 0.003 + time * 0.01) * 20;
          ctx.beginPath();
          ctx.arc(tx, ty, fp.size * (1 - t * 0.12), 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 229, 255, ' + (fp.opacity * (1 - t * 0.14)) + ')';
          ctx.fill();
        }
      });

      // === Particle system with spring physics ===
      particles.forEach(function (particle) {
        // Spring force toward origin
        var sx = particle.ox - particle.x;
        var sy = particle.oy - particle.y;
        particle.vx += sx * particle.springK;
        particle.vy += sy * particle.springK;

        // Gentle drift
        particle.vx += (Math.random() - 0.5) * 0.00003;
        particle.vy += (Math.random() - 0.5) * 0.00003;

        // Mouse interaction: gentle push
        var mdx = particle.x - mouseX;
        var mdy = particle.y - mouseY;
        var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 0.2) {
          var force = (0.2 - mDist) * 0.0003;
          particle.vx += mdx * force;
          particle.vy += mdy * force;
        }

        // Damping
        particle.vx *= particle.damping;
        particle.vy *= particle.damping;

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Soft bounds
        if (particle.x < 0) { particle.x = 0; particle.vx *= -0.5; }
        if (particle.x > 1) { particle.x = 1; particle.vx *= -0.5; }
        if (particle.y < 0) { particle.y = 0; particle.vy *= -0.5; }
        if (particle.y > 1) { particle.y = 1; particle.vy *= -0.5; }

        particle.pulse += particle.pulseSpeed;

        var px = particle.x * w;
        var py = particle.y * h;
        var pr = particle.radius + Math.sin(particle.pulse) * 0.3;

        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.3)';
        ctx.fill();
      });

      // === Connection lines (distance-based, with glow) ===
      ctx.lineWidth = 0.4;
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var cdx = particles[i].x - particles[j].x;
          var cdy = particles[i].y - particles[j].y;
          var cd = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cd < 0.1) {
            var alpha = (1 - cd / 0.1) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 229, 255, ' + alpha + ')';
            ctx.moveTo(particles[i].x * w, particles[i].y * h);
            ctx.lineTo(particles[j].x * w, particles[j].y * h);
            ctx.stroke();
          }
        }
      }

      // === Mouse glow (multi-layered) ===
      var glow1 = ctx.createRadialGradient(mouseX * w, mouseY * h, 0, mouseX * w, mouseY * h, 180);
      glow1.addColorStop(0, 'rgba(0, 229, 255, 0.035)');
      glow1.addColorStop(0.5, 'rgba(0, 229, 255, 0.01)');
      glow1.addColorStop(1, 'rgba(0, 229, 255, 0)');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, w, h);

      // === Vignette ===
      var vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.75);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // === Scanline (very subtle) ===
      var scanY = (time * 0.3) % h;
      ctx.fillStyle = 'rgba(0, 229, 255, 0.006)';
      ctx.fillRect(0, scanY, w, 1);

      requestAnimationFrame(draw);
    }

    draw();
  }

  /* =============================================
     # D3 Signal Graph Visualization v2
     Enhanced with: animated signal particles along edges,
     glow filters, pulsing sources, and refined interaction.
     ============================================= */
  if (typeof d3 !== 'undefined') {
    var vizSvgEl = document.getElementById('vizSvg');
    var vizTooltip = document.getElementById('vizTooltip');

    if (vizSvgEl && vizTooltip) {
      var containerEl = vizSvgEl.parentElement;
      var vizW = 900, vizH = 520;

      var graphData = {
        nodes: [
          { id: 'osc1', label: 'osc(440)', type: 'source', desc: 'Oscillator — 440 Hz sine' },
          { id: 'osc2', label: 'osc(220)', type: 'source', desc: 'Oscillator — 220 Hz saw' },
          { id: 'lfo1', label: 'lfo(0.5)', type: 'source', desc: 'LFO — 0.5 Hz' },
          { id: 'noise1', label: 'noise()', type: 'source', desc: 'White noise source' },
          { id: 'midi1', label: 'midi.in', type: 'source', desc: 'MIDI input — CC#1' },
          { id: 'audio1', label: 'audio.in', type: 'source', desc: 'Audio input — mic/line' },
          { id: 'filter1', label: 'filter.lp', type: 'processor', desc: 'Low-pass filter — 2kHz' },
          { id: 'filter2', label: 'filter.hp', type: 'processor', desc: 'High-pass filter — 80Hz' },
          { id: 'delay1', label: 'delay(250ms)', type: 'processor', desc: 'Delay — 250ms, 40% feedback' },
          { id: 'reverb1', label: 'reverb()', type: 'processor', desc: 'Convolution reverb — large hall' },
          { id: 'gain1', label: 'gain(-6dB)', type: 'processor', desc: 'Gain stage — -6dB' },
          { id: 'pan1', label: 'pan()', type: 'processor', desc: 'Stereo panner' },
          { id: 'comp1', label: 'compress()', type: 'processor', desc: 'Dynamics compressor' },
          { id: 'gran1', label: 'granular()', type: 'processor', desc: 'Granular processor' },
          { id: 'particles1', label: 'particles', type: 'processor', desc: 'Particle system renderer' },
          { id: 'shader1', label: 'shader.gl', type: 'processor', desc: 'GLSL shader — feedback' },
          { id: 'audioOut', label: 'audio.out', type: 'output', desc: 'Audio output — stereo' },
          { id: 'visualOut', label: 'visual.out', type: 'output', desc: 'Visual output — fullscreen' },
          { id: 'midiOut', label: 'midi.out', type: 'output', desc: 'MIDI output — CC#74' }
        ],
        links: [
          { source: 'osc1', target: 'filter1' },
          { source: 'osc2', target: 'filter1' },
          { source: 'lfo1', target: 'filter1' },
          { source: 'filter1', target: 'delay1' },
          { source: 'delay1', target: 'reverb1' },
          { source: 'reverb1', target: 'gain1' },
          { source: 'noise1', target: 'filter2' },
          { source: 'filter2', target: 'gran1' },
          { source: 'gran1', target: 'gain1' },
          { source: 'gain1', target: 'comp1' },
          { source: 'comp1', target: 'pan1' },
          { source: 'pan1', target: 'audioOut' },
          { source: 'midi1', target: 'lfo1' },
          { source: 'midi1', target: 'filter1' },
          { source: 'audio1', target: 'filter2' },
          { source: 'osc1', target: 'particles1' },
          { source: 'filter1', target: 'particles1' },
          { source: 'lfo1', target: 'shader1' },
          { source: 'particles1', target: 'shader1' },
          { source: 'shader1', target: 'visualOut' },
          { source: 'gain1', target: 'midiOut' },
          { source: 'reverb1', target: 'audioOut' }
        ]
      };

      var colorMap = { source: '#00E5FF', processor: '#8A8A96', output: '#EDEAE5' };
      var radiusMap = { source: 9, processor: 6, output: 11 };

      var svg = d3.select(vizSvgEl).attr('viewBox', '0 0 ' + vizW + ' ' + vizH);

      // Glow filter
      var defs = svg.append('defs');
      var glowFilter = defs.append('filter').attr('id', 'vizGlow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
      glowFilter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'blur');
      glowFilter.append('feMerge').selectAll('feMergeNode').data(['blur', 'SourceGraphic']).enter().append('feMergeNode').attr('in', function(d) { return d; });

      var g = svg.append('g');

      // Zoom
      svg.call(d3.zoom().scaleExtent([0.4, 3]).on('zoom', function (e) {
        g.attr('transform', e.transform);
      }));

      var simulation = d3.forceSimulation(graphData.nodes)
        .force('link', d3.forceLink(graphData.links).id(function (d) { return d.id; }).distance(90))
        .force('charge', d3.forceManyBody().strength(-250))
        .force('center', d3.forceCenter(vizW / 2, vizH / 2))
        .force('collision', d3.forceCollide().radius(22))
        .force('x', d3.forceX(vizW / 2).strength(0.02))
        .force('y', d3.forceY(vizH / 2).strength(0.02));

      // Links with gradient
      var link = g.append('g').selectAll('line').data(graphData.links).enter().append('line')
        .attr('stroke', '#1E1E24').attr('stroke-width', 1).attr('stroke-opacity', 0.7);

      // Animated signal dots on links
      var signalDots = g.append('g').selectAll('circle').data(graphData.links).enter().append('circle')
        .attr('r', 1.5).attr('fill', '#00E5FF').attr('opacity', 0);

      // Nodes
      var node = g.append('g').selectAll('g').data(graphData.nodes).enter().append('g')
        .attr('class', 'viz-node').style('cursor', 'pointer')
        .call(d3.drag().on('start', dragStart).on('drag', dragging).on('end', dragEnd));

      // Node glow ring (sources only)
      node.filter(function (d) { return d.type === 'source'; })
        .append('circle').attr('r', function (d) { return radiusMap[d.type]; })
        .attr('fill', 'none').attr('stroke', colorMap.source).attr('stroke-width', 0.5).attr('opacity', 0.3)
        .append('animate').attr('attributeName', 'r').attr('values', '9;16;9').attr('dur', '3s').attr('repeatCount', 'indefinite');

      // Node circles
      node.append('circle')
        .attr('r', function (d) { return radiusMap[d.type]; })
        .attr('fill', function (d) { return colorMap[d.type]; }).attr('fill-opacity', 0.08)
        .attr('stroke', function (d) { return colorMap[d.type]; }).attr('stroke-width', 1.2)
        .attr('class', 'node-circle');

      // Labels
      node.append('text')
        .text(function (d) { return d.label; })
        .attr('x', 14).attr('y', 4)
        .attr('font-family', "'JetBrains Mono', monospace").attr('font-size', '10px')
        .attr('fill', '#8A8A96').attr('pointer-events', 'none');

      // Tooltip + highlight
      var activeNode = null;
      node.on('mouseenter', function (event, d) {
        activeNode = d;
        vizTooltip.textContent = d.desc;
        vizTooltip.classList.add('visible');
        vizTooltip.setAttribute('aria-hidden', 'false');

        link.attr('stroke', function (l) {
          return (l.source.id === d.id || l.target.id === d.id) ? '#00E5FF' : '#1E1E24';
        }).attr('stroke-opacity', function (l) {
          return (l.source.id === d.id || l.target.id === d.id) ? 0.8 : 0.15;
        }).attr('stroke-width', function (l) {
          return (l.source.id === d.id || l.target.id === d.id) ? 1.5 : 0.8;
        });

        // Show signal dots on connected links
        signalDots.attr('opacity', function (l) {
          return (l.source.id === d.id || l.target.id === d.id) ? 0.6 : 0;
        });

        node.select('.node-circle')
          .attr('fill-opacity', function (n) {
            return (n.id === d.id) ? 0.3 : 0.08;
          })
          .attr('stroke-width', function (n) {
            return (n.id === d.id) ? 2 : 1.2;
          });
      })
      .on('mousemove', function (event) {
        var rect = containerEl.getBoundingClientRect();
        vizTooltip.style.left = (event.clientX - rect.left + 14) + 'px';
        vizTooltip.style.top = (event.clientY - rect.top - 12) + 'px';
      })
      .on('mouseleave', function () {
        activeNode = null;
        vizTooltip.classList.remove('visible');
        vizTooltip.setAttribute('aria-hidden', 'true');
        link.attr('stroke', '#1E1E24').attr('stroke-opacity', 0.7).attr('stroke-width', 1);
        signalDots.attr('opacity', 0);
        node.select('.node-circle').attr('fill-opacity', 0.08).attr('stroke-width', 1.2);
      });

      // Animate signal dots along links
      function animateSignals() {
        signalDots.each(function () {
          var dot = d3.select(this);
          var opacity = dot.attr('opacity');
          if (parseFloat(opacity) > 0) {
            // Animate along the link path
            var progress = (Date.now() % 2000) / 2000;
            dot.attr('opacity', 0.6 * (1 - Math.abs(progress - 0.5) * 2));
          }
        });
        requestAnimationFrame(animateSignals);
      }
      animateSignals();

      simulation.on('tick', function () {
        link
          .attr('x1', function (d) { return d.source.x; }).attr('y1', function (d) { return d.source.y; })
          .attr('x2', function (d) { return d.target.x; }).attr('y2', function (d) { return d.target.y; });

        signalDots
          .attr('cx', function (d) { return d.source.x + (d.target.x - d.source.x) * ((Date.now() % 2000) / 2000); })
          .attr('cy', function (d) { return d.source.y + (d.target.y - d.source.y) * ((Date.now() % 2000) / 2000); });

        node.attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; });
      });

      function dragStart(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
      }
      function dragging(event, d) { d.fx = event.x; d.fy = event.y; }
      function dragEnd(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null; d.fy = null;
      }
    }
  }
})();
