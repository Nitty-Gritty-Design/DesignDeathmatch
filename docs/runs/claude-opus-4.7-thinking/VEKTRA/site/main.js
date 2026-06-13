/**
 * VEKTRA — Site JavaScript
 * Mobile nav toggle, scroll-triggered reveals, signal dot, hero background.
 * No external libraries — vanilla JS only.
 */

(function () {
  'use strict';

  // ── Mobile nav toggle ──
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Scroll-triggered entrance animations ──
  const reveals = document.querySelectorAll('.reveal');
  const heroEls = document.querySelectorAll('.hero__label, .hero__headline, .hero__sub, .hero__cta-group');

  // Hero entrance with stagger
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('animate-in'), 300 + i * 180);
  });

  // Intersection Observer for scroll reveals
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));

  // ── Signal dot — follows cursor with lag ──
  const dot = document.createElement('div');
  dot.className = 'signal-dot';
  document.body.appendChild(dot);
  let dotX = 0, dotY = 0, mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateDot() {
    dotX += (mouseX - dotX) * 0.12;
    dotY += (mouseY - dotY) * 0.12;
    dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
    requestAnimationFrame(animateDot);
  }
  animateDot();

  // Hide dot on touch devices
  if ('ontouchstart' in window) dot.style.display = 'none';

  // ── Hero generative background ──
  const bgCanvas = document.getElementById('heroBg');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let w, h, time = 0;
    const lines = [];
    const LINE_COUNT = 40;
    const accentRGB = { r: 232, g: 160, b: 18 }; // matches --color-accent

    function resize() {
      w = bgCanvas.width = bgCanvas.parentElement.offsetWidth;
      h = bgCanvas.height = bgCanvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Initialize signal lines
    for (let i = 0; i < LINE_COUNT; i++) {
      lines.push({
        y: (h / LINE_COUNT) * i,
        freq: 0.002 + Math.random() * 0.004,
        amp: 20 + Math.random() * 40,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
        alpha: 0.03 + Math.random() * 0.06
      });
    }

    let hovX = w / 2, hovY = h / 2;
    bgCanvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = bgCanvas.parentElement.getBoundingClientRect();
      hovX = e.clientX - rect.left;
      hovY = e.clientY - rect.top;
    });

    function drawBg() {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      for (const line of lines) {
        ctx.beginPath();
        const baseY = line.y + (h / LINE_COUNT) * 0.5;

        for (let x = 0; x < w; x += 3) {
          // Distance from cursor affects amplitude
          const dx = x - hovX;
          const dy = baseY - hovY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 350);

          const yOff = Math.sin(x * line.freq + time * line.speed + line.phase) * (line.amp + influence * 30);
          if (x === 0) ctx.moveTo(x, baseY + yOff);
          else ctx.lineTo(x, baseY + yOff);
        }

        ctx.strokeStyle = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, ${line.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      requestAnimationFrame(drawBg);
    }
    drawBg();
  }

  // ── Data visualization: signal patch graph ──
  // Using D3.js for force-directed graph — Three.js would be overkill for 2D network
  const vizContainer = document.getElementById('vizContainer');
  if (vizContainer && typeof d3 !== 'undefined') {
    initViz(vizContainer);
  }

  function initViz(container) {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const svg = d3.select(container).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    // Signal patch graph: nodes are audio/visual modules, links are signal connections
    const nodes = [
      { id: 'osc_1', label: 'OSC.sine', group: 'source', desc: 'Sine oscillator at 220Hz' },
      { id: 'osc_2', label: 'OSC.saw', group: 'source', desc: 'Sawtooth wave at 110Hz' },
      { id: 'lfo', label: 'LFO', group: 'mod', desc: 'Low-frequency modulator, 0.25Hz' },
      { id: 'noise', label: 'NOISE.pink', group: 'source', desc: 'Pink noise generator' },
      { id: 'filter', label: 'FILT.lp', group: 'process', desc: 'Resonant low-pass, cutoff 800Hz' },
      { id: 'env', label: 'ENV.adsr', group: 'mod', desc: 'Attack 12ms, decay 200ms, sustain 0.6' },
      { id: 'delay', label: 'DLY.sync', group: 'process', desc: 'Tempo-synced delay, 3/8 ratio' },
      { id: 'reverb', label: 'REV.hall', group: 'process', desc: 'Algorithmic hall, 4.2s decay' },
      { id: 'gain', label: 'GAIN', group: 'output', desc: 'Master gain -6dB' },
      { id: 'out', label: 'OUT.stereo', group: 'output', desc: 'Stereo output bus' },
      { id: 'scope', label: 'SCOPE', group: 'viz', desc: 'Waveform oscilloscope view' },
      { id: 'spectrum', label: 'FFT', group: 'viz', desc: 'Spectral analyzer, 2048 bins' },
      { id: 'xy_pad', label: 'XY.pad', group: 'control', desc: 'Touch/mouse XY controller' },
      { id: 'midi', label: 'MIDI.in', group: 'control', desc: 'MIDI CC input, ch.1' },
    ];

    const links = [
      { source: 'osc_1', target: 'filter' },
      { source: 'osc_2', target: 'filter' },
      { source: 'noise', target: 'filter' },
      { source: 'lfo', target: 'filter' },
      { source: 'filter', target: 'delay' },
      { source: 'filter', target: 'gain' },
      { source: 'env', target: 'gain' },
      { source: 'delay', target: 'reverb' },
      { source: 'reverb', target: 'gain' },
      { source: 'gain', target: 'out' },
      { source: 'gain', target: 'scope' },
      { source: 'gain', target: 'spectrum' },
      { source: 'xy_pad', target: 'lfo' },
      { source: 'midi', target: 'osc_1' },
      { source: 'midi', target: 'env' },
    ];

    const groupColors = {
      source: '#E8A012',   // accent
      mod: '#8B6010',      // accent-dim
      process: '#9E9B93',  // text-secondary
      output: '#E8E6E1',   // text-primary
      viz: '#5C5A54',      // text-muted
      control: '#3DB86A',  // success
    };

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(90))
      .force('charge', d3.forceManyBody().strength(-280))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // Links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#2A2A2F')
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.6);

    // Nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded));

    node.append('circle')
      .attr('r', 6)
      .attr('fill', d => groupColors[d.group])
      .attr('stroke', '#0A0A0C')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) { showTooltip(event, d); d3.select(this).attr('r', 9); })
      .on('mouseleave', function() { hideTooltip(); d3.select(this).attr('r', 6); });

    node.append('text')
      .text(d => d.label)
      .attr('dx', 12)
      .attr('dy', 4)
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('font-size', '10px')
      .attr('fill', '#9E9B93')
      .attr('letter-spacing', '0.04em');

    // Tooltip
    const tooltipEl = document.createElement('div');
    tooltipEl.className = 'tooltip';
    tooltipEl.style.display = 'none';
    container.appendChild(tooltipEl);

    function showTooltip(event, d) {
      const rect = container.getBoundingClientRect();
      tooltipEl.textContent = d.desc;
      tooltipEl.style.display = 'block';
      tooltipEl.style.left = (event.clientX - rect.left + 16) + 'px';
      tooltipEl.style.top = (event.clientY - rect.top - 8) + 'px';
    }
    function hideTooltip() { tooltipEl.style.display = 'none'; }

    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragStarted(event) { if (!event.active) simulation.alphaTarget(0.3).restart(); event.subject.fx = event.subject.x; event.subject.fy = event.subject.y; }
    function dragged(event) { event.subject.fx = event.x; event.subject.fy = event.y; }
    function dragEnded(event) { if (!event.active) simulation.alphaTarget(0); event.subject.fx = null; event.subject.fy = null; }
  }

})();
