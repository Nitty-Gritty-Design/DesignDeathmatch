/**
 * VEKTRA Site — main.js
 * - Mobile nav toggle
 * - Scroll-triggered entrance animations (IntersectionObserver)
 * - Nav background on scroll
 * - Generative hero canvas background (signal field)
 * - Mouse-reactive cursor glow
 * - D3 force-directed signal graph visualization
 */

(function () {
  'use strict';

  /* =============================================
     # Mobile Navigation
     ============================================= */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });
  }

  /* =============================================
     # Nav scroll state
     ============================================= */
  var nav = document.getElementById('nav');
  var ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* =============================================
     # Reveal on scroll
     ============================================= */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) { el.classList.add('visible'); });
  }

  /* =============================================
     # Generative Hero Background
     Canvas-based signal field: oscillating waveforms
     that respond to mouse position.
     ============================================= */
  var canvas = document.getElementById('heroCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var w, h;
    var mouseX = 0.5;
    var mouseY = 0.5;
    var targetMouseX = 0.5;
    var targetMouseY = 0.5;
    var time = 0;
    var dpr = window.devicePixelRatio || 1;

    // Wave parameters
    var waves = [];
    var numWaves = 6;
    for (var i = 0; i < numWaves; i++) {
      waves.push({
        amplitude: 20 + Math.random() * 40,
        frequency: 0.003 + Math.random() * 0.004,
        speed: 0.008 + Math.random() * 0.012,
        phase: Math.random() * Math.PI * 2,
        yOffset: 0.2 + (i / numWaves) * 0.6,
        opacity: 0.03 + Math.random() * 0.06
      });
    }

    // Particle nodes
    var particles = [];
    var numParticles = 40;
    for (var p = 0; p < numParticles; p++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        radius: 1 + Math.random() * 1.5,
        pulse: Math.random() * Math.PI * 2
      });
    }

    function resize() {
      w = canvas.parentElement.clientWidth;
      h = canvas.parentElement.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resize);
    resize();

    // Mouse tracking
    canvas.parentElement.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = (e.clientY - rect.top) / rect.height;
    });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function draw() {
      time++;
      mouseX = lerp(mouseX, targetMouseX, 0.03);
      mouseY = lerp(mouseY, targetMouseY, 0.03);

      ctx.clearRect(0, 0, w, h);

      // Draw wave lines
      waves.forEach(function (wave) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 229, 255, ' + wave.opacity + ')';
        ctx.lineWidth = 1;

        for (var x = 0; x <= w; x += 2) {
          var baseY = h * wave.yOffset;
          var dist = Math.sqrt(Math.pow((x / w - mouseX) * 2, 2) + Math.pow((baseY / h - mouseY) * 2, 2));
          var mouseInfluence = Math.max(0, 1 - dist * 1.5) * 30;
          var y = baseY +
            Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
            Math.sin(x * wave.frequency * 2.3 + time * wave.speed * 0.7) * (wave.amplitude * 0.3) +
            mouseInfluence * Math.sin(time * 0.02 + x * 0.01);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Draw particles
      particles.forEach(function (particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.02;

        // Bounce
        if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
        if (particle.y < 0 || particle.y > 1) particle.vy *= -1;

        // Mouse attraction
        var dx = mouseX - particle.x;
        var dy = mouseY - particle.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.3) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
        }

        // Damping
        particle.vx *= 0.999;
        particle.vy *= 0.999;

        var px = particle.x * w;
        var py = particle.y * h;
        var pulseRadius = particle.radius + Math.sin(particle.pulse) * 0.5;

        ctx.beginPath();
        ctx.arc(px, py, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
        ctx.fill();
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.06)';
      ctx.lineWidth = 0.5;
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 0.15) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x * w, particles[i].y * h);
            ctx.lineTo(particles[j].x * w, particles[j].y * h);
            ctx.stroke();
          }
        }
      }

      // Mouse glow
      var gradient = ctx.createRadialGradient(mouseX * w, mouseY * h, 0, mouseX * w, mouseY * h, 200);
      gradient.addColorStop(0, 'rgba(0, 229, 255, 0.04)');
      gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      requestAnimationFrame(draw);
    }

    draw();
  }

  /* =============================================
     # D3 Signal Graph Visualization
     Interactive force-directed graph showing
     a VEKTRA signal patch with realistic node
     types and connections.
     ============================================= */
  if (typeof d3 !== 'undefined') {
    var vizSvg = document.getElementById('vizSvg');
    var vizTooltip = document.getElementById('vizTooltip');

    if (vizSvg && vizTooltip) {
      var container = document.getElementById('vizContainer');
      var containerWidth = container ? container.clientWidth : 800;
      var containerHeight = 500;

      // Realistic VEKTRA patch data
      var graphData = {
        nodes: [
          // Signal sources
          { id: 'osc1', label: 'osc(440)', type: 'source', desc: 'Oscillator — 440 Hz sine' },
          { id: 'osc2', label: 'osc(220)', type: 'source', desc: 'Oscillator — 220 Hz saw' },
          { id: 'lfo1', label: 'lfo(0.5)', type: 'source', desc: 'LFO — 0.5 Hz' },
          { id: 'noise1', label: 'noise()', type: 'source', desc: 'White noise source' },
          { id: 'midi1', label: 'midi.in', type: 'source', desc: 'MIDI input — CC#1' },
          { id: 'audio1', label: 'audio.in', type: 'source', desc: 'Audio input — mic/line' },
          // Processors
          { id: 'filter1', label: 'filter.lp', type: 'processor', desc: 'Low-pass filter — 2kHz' },
          { id: 'filter2', label: 'filter.hp', type: 'processor', desc: 'High-pass filter — 80Hz' },
          { id: 'delay1', label: 'delay(250ms)', type: 'processor', desc: 'Delay — 250ms, 40% feedback' },
          { id: 'reverb1', label: 'reverb()', type: 'processor', desc: 'Convolution reverb — large hall' },
          { id: 'gain1', label: 'gain(-6dB)', type: 'processor', desc: 'Gain stage — -6dB' },
          { id: 'pan1', label: 'pan()', type: 'processor', desc: 'Stereo panner' },
          { id: 'comp1', label: 'compress()', type: 'processor', desc: 'Dynamics compressor' },
          { id: 'gran1', label: 'granular()', type: 'processor', desc: 'Granular processor' },
          // Visual processors
          { id: 'particles1', label: 'particles', type: 'processor', desc: 'Particle system renderer' },
          { id: 'shader1', label: 'shader.gl', type: 'processor', desc: 'GLSL shader — feedback' },
          // Outputs
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

      var colorMap = {
        source: '#00E5FF',
        processor: '#9B9BA3',
        output: '#E8E6E1'
      };

      var radiusMap = {
        source: 8,
        processor: 6,
        output: 10
      };

      var svg = d3.select(vizSvg)
        .attr('viewBox', '0 0 ' + containerWidth + ' ' + containerHeight);

      var g = svg.append('g');

      // Zoom behavior
      var zoom = d3.zoom()
        .scaleExtent([0.5, 3])
        .on('zoom', function (event) {
          g.attr('transform', event.transform);
        });
      svg.call(zoom);

      var simulation = d3.forceSimulation(graphData.nodes)
        .force('link', d3.forceLink(graphData.links).id(function (d) { return d.id; }).distance(80))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(containerWidth / 2, containerHeight / 2))
        .force('collision', d3.forceCollide().radius(20));

      var link = g.append('g')
        .selectAll('line')
        .data(graphData.links)
        .enter().append('line')
        .attr('stroke', '#2A2A32')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.6);

      var node = g.append('g')
        .selectAll('g')
        .data(graphData.nodes)
        .enter().append('g')
        .attr('class', 'viz-node')
        .style('cursor', 'pointer')
        .call(d3.drag()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded));

      // Node circles
      node.append('circle')
        .attr('r', function (d) { return radiusMap[d.type]; })
        .attr('fill', function (d) { return colorMap[d.type]; })
        .attr('fill-opacity', 0.15)
        .attr('stroke', function (d) { return colorMap[d.type]; })
        .attr('stroke-width', 1.5)
        .attr('class', 'node-circle');

      // Pulse ring for sources
      node.filter(function (d) { return d.type === 'source'; })
        .append('circle')
        .attr('r', function (d) { return radiusMap[d.type]; })
        .attr('fill', 'none')
        .attr('stroke', colorMap.source)
        .attr('stroke-width', 1)
        .attr('opacity', 0.4)
        .append('animate')
        .attr('attributeName', 'r', null)
        .attr('values', '8;14;8')
        .attr('dur', '2s')
        .attr('repeatCount', 'indefinite');

      // Labels
      node.append('text')
        .text(function (d) { return d.label; })
        .attr('x', 12)
        .attr('y', 4)
        .attr('font-family', "'JetBrains Mono', monospace")
        .attr('font-size', '10px')
        .attr('fill', '#9B9BA3')
        .attr('pointer-events', 'none');

      // Tooltip
      node.on('mouseenter', function (event, d) {
        vizTooltip.textContent = d.desc;
        vizTooltip.classList.add('visible');
        vizTooltip.setAttribute('aria-hidden', 'false');

        // Highlight connected links
        link.attr('stroke', function (l) {
          return (l.source.id === d.id || l.target.id === d.id) ? '#00E5FF' : '#2A2A32';
        }).attr('stroke-opacity', function (l) {
          return (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.2;
        });

        d3.select(this).select('.node-circle')
          .attr('fill-opacity', 0.4)
          .attr('stroke-width', 2);
      })
      .on('mousemove', function (event) {
        var rect = container.getBoundingClientRect();
        vizTooltip.style.left = (event.clientX - rect.left + 12) + 'px';
        vizTooltip.style.top = (event.clientY - rect.top - 10) + 'px';
      })
      .on('mouseleave', function () {
        vizTooltip.classList.remove('visible');
        vizTooltip.setAttribute('aria-hidden', 'true');
        link.attr('stroke', '#2A2A32').attr('stroke-opacity', 0.6);
        d3.select(this).select('.node-circle')
          .attr('fill-opacity', 0.15)
          .attr('stroke-width', 1.5);
      });

      simulation.on('tick', function () {
        link
          .attr('x1', function (d) { return d.source.x; })
          .attr('y1', function (d) { return d.source.y; })
          .attr('x2', function (d) { return d.target.x; })
          .attr('y2', function (d) { return d.target.y; });

        node.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
      });

      function dragStarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }
  }
})();
