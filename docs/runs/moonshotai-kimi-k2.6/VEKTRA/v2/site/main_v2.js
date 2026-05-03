/**
 * VEKTRA v2 — Main JavaScript
 * ===========================
 * Modular architecture with the following systems:
 * 1. Cursor — dual-element custom cursor with lerp physics
 * 2. Navigation — mobile menu toggle with staggered link reveals
 * 3. ScrollReveal — IntersectionObserver-based entrance animations
 * 4. HeroCanvas — multi-layer generative signal field (vanilla Canvas 2D)
 * 5. PatchGraph — D3.js force-directed network visualization
 *
 * All external libraries loaded via CDN only.
 */

(function() {
  'use strict';

  /* ================================================================
     UTILITIES
     ================================================================ */
  const lerp = (a, b, t) => a + (b - a) * t;

  const throttle = (fn, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  /* ================================================================
     1. CUSTOM CURSOR
     ================================================================ */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let dotX = -100, dotY = -100;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      mouseX = -100; mouseY = -100;
    });

    // Hover detection
    const interactiveSelectors = 'a, button, .btn, .card, .user-item, input, .nav-logo';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursorRing.classList.add('hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursorRing.classList.remove('hover');
      }
    });

    function animateCursor() {
      dotX = lerp(dotX, mouseX, 0.35);
      dotY = lerp(dotY, mouseY, 0.35);
      ringX = lerp(ringX, mouseX, 0.08);
      ringY = lerp(ringY, mouseY, 0.08);

      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  /* ================================================================
     2. NAVIGATION
     ================================================================ */
  const ham = document.querySelector('.nav-ham');
  const mobileMenu = document.getElementById('mobile-menu');

  if (ham && mobileMenu) {
    ham.addEventListener('click', () => {
      const open = ham.classList.toggle('active');
      mobileMenu.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', open);
      mobileMenu.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('active');
        mobileMenu.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ================================================================
     3. SCROLL REVEAL
     ================================================================ */
  const reveals = document.querySelectorAll('.reveal, .reveal-left');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ================================================================
     4. HERO CANVAS — Generative Signal Field
     ================================================================ */
  const canvas = document.getElementById('heroCanvas');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };
    let time = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', throttle(resize, 200));

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    });

    // Wave configuration — 7 layers of oscillation
    const waves = Array.from({ length: 7 }, (_, i) => ({
      yOffset: 0.35 + (i / 6) * 0.3, // distributed vertically
      amp: 18 + i * 6,
      freq: 0.004 + i * 0.0015,
      speed: 0.6 + i * 0.25,
      phase: i * 1.1,
      opacity: 0.08 + (6 - i) * 0.025,
      lineWidth: 0.8 + (6 - i) * 0.15,
    }));

    // Particle field
    const PARTICLE_COUNT = 120;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      baseX: Math.random(),
      baseY: Math.random(),
      x: 0, y: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.4,
      radius: 0.6 + Math.random() * 1.2,
    }));

    function drawHero() {
      time += 0.016;

      // Smooth mouse lerp
      mouse.x = lerp(mouse.x, mouse.targetX, 0.04);
      mouse.y = lerp(mouse.y, mouse.targetY, 0.04);

      const mouseActive = mouse.x > -1000;
      const mx = mouseActive ? mouse.x : width * 0.5;
      const my = mouseActive ? mouse.y : height * 0.5;
      const mouseNormX = (mx / width - 0.5) * 2;
      const mouseNormY = (my / height - 0.5) * 2;

      // Clear with void color
      ctx.fillStyle = '#060A09';
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const px = p.baseX * width;
        const py = p.baseY * height;
        const dx = px - mx;
        const dy = py - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = mouseActive ? Math.max(0, 1 - dist / 250) : 0;

        p.x = px + Math.sin(time * p.speed + p.phase) * 3 * (1 + influence * 4);
        p.y = py + Math.cos(time * p.speed * 0.7 + p.phase) * 2 * (1 + influence * 4);

        const alpha = 0.12 + influence * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 + influence * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 168, 164, ${alpha})`;
        ctx.fill();
      }

      // Draw connection web (subtle)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            const a = (1 - d / 90) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 229, 191, ${a})`;
            ctx.stroke();
          }
        }
      }

      // Draw layered sine waves with additive blending
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < waves.length; i++) {
        const w = waves[i];
        const waveY = height * w.yOffset + mouseNormY * 15 * (i + 1) / waves.length;
        const ampMod = 1 + Math.abs(mouseNormY) * 0.6 + (mouseActive ? 0.3 : 0);
        const freqMod = 1 + mouseNormX * 0.2;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const envelope = Math.sin((x / width) * Math.PI); // fade at edges
          const y = waveY + Math.sin(x * w.freq * freqMod + time * w.speed + w.phase) * w.amp * ampMod * envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(0, 229, 191, ${w.opacity})`;
        ctx.lineWidth = w.lineWidth;
        ctx.stroke();
      }

      ctx.restore();

      // Mouse field cursor
      if (mouseActive) {
        ctx.beginPath();
        ctx.arc(mx, my, 48 + Math.sin(time * 2) * 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 229, 191, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 191, 0.6)';
        ctx.fill();
      }

      // Scanline overlay
      ctx.fillStyle = 'rgba(6, 10, 9, 0.03)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
      }

      requestAnimationFrame(drawHero);
    }

    requestAnimationFrame(drawHero);
  }

  /* ================================================================
     5. PATCH GRAPH VISUALIZATION (D3.js)
     ================================================================ */
  // Using D3 v7 via CDN. Force-directed graph is the ideal choice for
  // showing how a VEKTRA patch connects audio, modulation, visual, and
  // system nodes in a unified graph. Vanilla Canvas would require
  // reimplementing physics simulation and drag logic.
  (function initPatchGraph() {
    const svg = d3.select('#vizSvg');
    if (svg.empty()) return;

    const tooltip = d3.select('#vizTooltip');
    const vw = 900;
    const vh = 480;

    const nodes = [
      { id: 'osc1', name: 'Oscillator', type: 'audio', freq: '440 Hz', amp: '0.80', x: 120, y: 240 },
      { id: 'lfo1', name: 'LFO', type: 'modulation', rate: '0.25 Hz', depth: '1.00', x: 280, y: 100 },
      { id: 'filter', name: 'Lowpass Filter', type: 'audio', cutoff: '2000 Hz', resonance: '0.50', x: 340, y: 260 },
      { id: 'delay', name: 'Spectral Delay', type: 'audio', time: '350 ms', feedback: '0.40', x: 520, y: 340 },
      { id: 'grain', name: 'Grain Cloud', type: 'audio', density: '50', spread: '0.30', x: 500, y: 140 },
      { id: 'plane', name: 'Visual Plane', type: 'visual', scale: '1.20', rotation: '0°', x: 680, y: 200 },
      { id: 'cam', name: 'Camera', type: 'visual', fov: '45°', distance: '10.0', x: 800, y: 140 },
      { id: 'out', name: 'Output', type: 'system', channels: '2', sampleRate: '48 kHz', x: 760, y: 380 },
    ];

    const links = [
      { source: 'osc1', target: 'filter', signal: 'audio' },
      { source: 'lfo1', target: 'filter', signal: 'modulation' },
      { source: 'filter', target: 'delay', signal: 'audio' },
      { source: 'filter', target: 'grain', signal: 'audio' },
      { source: 'grain', target: 'out', signal: 'audio' },
      { source: 'delay', target: 'out', signal: 'audio' },
      { source: 'osc1', target: 'plane', signal: 'visual' },
      { source: 'plane', target: 'cam', signal: 'visual' },
      { source: 'lfo1', target: 'plane', signal: 'modulation' },
    ];

    const typeColor = {
      audio: '#00E5BF',
      modulation: '#9BA8A4',
      visual: '#F2F0EC',
      system: '#4F5956',
    };

    const signalColor = {
      audio: '#00E5BF',
      modulation: '#9BA8A4',
      visual: '#F2F0EC',
    };

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100).strength(0.6))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(vw / 2, vh / 2))
      .force('collide', d3.forceCollide().radius(48))
      .force('x', d3.forceX(vw / 2).strength(0.05))
      .force('y', d3.forceY(vh / 2).strength(0.05));

    // Animated signal flow pattern
    const defs = svg.append('defs');
    const flowPattern = defs.append('pattern')
      .attr('id', 'flow')
      .attr('width', 12)
      .attr('height', 1)
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('patternTransform', 'translate(0,0)');

    flowPattern.append('rect')
      .attr('width', 6)
      .attr('height', 1)
      .attr('fill', '#00E5BF');

    // Links
    const linkGroup = svg.append('g');
    const linkBase = linkGroup.selectAll('.link-base')
      .data(links)
      .join('line')
      .attr('class', 'link-base')
      .attr('stroke', '#1A211E')
      .attr('stroke-width', 1.5);

    const linkFlow = linkGroup.selectAll('.link-flow')
      .data(links)
      .join('line')
      .attr('class', 'link-flow')
      .attr('stroke', 'url(#flow)')
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.35);

    // Animate flow pattern
    let flowOffset = 0;
    function animateFlow() {
      flowOffset -= 0.4;
      flowPattern.attr('patternTransform', `translate(${flowOffset}, 0)`);
      requestAnimationFrame(animateFlow);
    }
    animateFlow();

    // Nodes
    const nodeGroup = svg.append('g');
    const node = nodeGroup.selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .attr('cursor', 'pointer')
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        }));

    // Node outer ring
    node.append('circle')
      .attr('class', 'node-ring')
      .attr('r', 14)
      .attr('fill', 'none')
      .attr('stroke', d => typeColor[d.type])
      .attr('stroke-width', 1)
      .attr('opacity', 0.25);

    // Node core
    node.append('circle')
      .attr('class', 'node-core')
      .attr('r', 8)
      .attr('fill', '#060A09')
      .attr('stroke', d => typeColor[d.type])
      .attr('stroke-width', 2);

    // Node label
    node.append('text')
      .attr('dy', 28)
      .attr('text-anchor', 'middle')
      .text(d => d.name)
      .attr('fill', '#9BA8A4')
      .attr('font-family', "'IBM Plex Mono', monospace")
      .attr('font-size', '10px')
      .attr('font-weight', 500);

    // Node type label
    node.append('text')
      .attr('dy', 40)
      .attr('text-anchor', 'middle')
      .text(d => d.type)
      .attr('fill', '#4F5956')
      .attr('font-family', "'IBM Plex Mono', monospace")
      .attr('font-size', '8px')
      .attr('text-transform', 'uppercase')
      .attr('letter-spacing', '0.06em');

    // Interactions
    node.on('mouseenter', function(event, d) {
      const sel = d3.select(this);
      sel.select('.node-core')
        .transition().duration(200)
        .attr('r', 11)
        .attr('stroke-width', 3)
        .attr('stroke', '#00E5BF');
      sel.select('.node-ring')
        .transition().duration(200)
        .attr('r', 20)
        .attr('opacity', 0.5)
        .attr('stroke', '#00E5BF');

      linkBase
        .attr('stroke', l => (l.source.id === d.id || l.target.id === d.id) ? '#00E5BF' : '#1A211E')
        .attr('stroke-opacity', l => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.15)
        .attr('stroke-width', l => (l.source.id === d.id || l.target.id === d.id) ? 2.5 : 1.5);

      linkFlow
        .attr('opacity', l => (l.source.id === d.id || l.target.id === d.id) ? 0.7 : 0.1);

      const params = Object.entries(d)
        .filter(([k]) => !['id','name','type','x','y','vx','vy','index','fx','fy'].includes(k))
        .map(([k,v]) => `${k}: ${v}`).join(' · ');

      tooltip.style('opacity', 1)
        .html(`<div style="color:#00E5BF;font-weight:700;margin-bottom:4px">${d.name}</div><div style="color:#9BA8A4;font-size:0.7rem">${params}</div>`);
    })
    .on('mousemove', function(event) {
      const wrap = document.querySelector('.viz-wrap').getBoundingClientRect();
      tooltip
        .style('left', (event.clientX - wrap.left + 16) + 'px')
        .style('top', (event.clientY - wrap.top + 16) + 'px');
    })
    .on('mouseleave', function(event, d) {
      const sel = d3.select(this);
      sel.select('.node-core')
        .transition().duration(200)
        .attr('r', 8)
        .attr('stroke-width', 2)
        .attr('stroke', typeColor[d.type]);
      sel.select('.node-ring')
        .transition().duration(200)
        .attr('r', 14)
        .attr('opacity', 0.25)
        .attr('stroke', typeColor[d.type]);

      linkBase.attr('stroke', '#1A211E').attr('stroke-opacity', 1).attr('stroke-width', 1.5);
      linkFlow.attr('opacity', 0.35);
      tooltip.style('opacity', 0);
    })
    .on('click', function(event, d) {
      const sel = d3.select(this);
      sel.select('.node-core')
        .attr('fill', '#00E5BF')
        .transition().duration(400)
        .attr('fill', '#060A09');

      // Pulse connected links
      linkBase.filter(l => l.source.id === d.id || l.target.id === d.id)
        .attr('stroke', '#00E5BF')
        .attr('stroke-width', 3)
        .transition().duration(600)
        .attr('stroke', '#1A211E')
        .attr('stroke-width', 1.5);
    });

    simulation.on('tick', () => {
      linkBase
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      linkFlow
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });
  })();
})();
