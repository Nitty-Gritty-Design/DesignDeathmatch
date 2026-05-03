/* VEKTRA main.js
   Includes:
   - Mobile nav toggle
   - Scroll-triggered entrance animations (IntersectionObserver)
   - Generative Canvas background (hero signal field)
   - D3.js force-directed patch graph visualization
   Library choices documented inline.
*/

/* ---------- Mobile nav ---------- */
const ham = document.querySelector('.nav-ham');
const mobileMenu = document.getElementById('mobile-menu');
if (ham && mobileMenu) {
  ham.addEventListener('click', () => {
    const open = ham.classList.toggle('active');
    mobileMenu.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('active');
      mobileMenu.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });
}

/* ---------- Scroll reveal ---------- */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObserver.observe(el));

/* ---------- Generative hero background ---------- */
// Using vanilla Canvas 2D API. No library needed — this is a particle/line field
// that responds to mouse position, which is straightforward with raw Canvas.
const canvas = document.getElementById('heroCanvas');
let ctx, width, height, dpr;
let mouse = { x: -1000, y: -1000 };
let particles = [];
const PARTICLE_COUNT = 90;

function resizeCanvas() {
  if (!canvas) return;
  dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      vx: 0, vy: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.4,
      amp: 10 + Math.random() * 30,
      freq: 0.001 + Math.random() * 0.002,
    });
  }
}

function drawHero() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#00F0C8';
  const muted = getComputedStyle(document.documentElement).getPropertyValue('--color-text-muted').trim() || '#5A6461';

  const time = performance.now();
  const mouseInfluenceX = (mouse.x / width - 0.5) * 2;
  const mouseInfluenceY = (mouse.y / height - 0.5) * 2;

  // Update and draw particles as oscillating signal points
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.phase += p.speed * 0.016;
    const freqMod = 1 + mouseInfluenceX * 0.3;
    const ampMod = 1 + mouseInfluenceY * 0.3;
    p.x = p.baseX + Math.sin(time * p.freq * freqMod + p.phase) * p.amp * ampMod;
    p.y = p.baseY + Math.cos(time * p.freq * freqMod * 0.7 + p.phase) * p.amp * ampMod * 0.5;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = muted;
    ctx.fill();
  }

  // Draw connections when close — signal lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const alpha = 1 - dist / 100;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 240, 200, ${alpha * 0.25})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  // Draw a central oscillating waveform
  ctx.beginPath();
  const waveY = height * 0.5;
  const waveAmp = 30 + Math.abs(mouseInfluenceY) * 40;
  const waveFreq = 0.008 + Math.abs(mouseInfluenceX) * 0.004;
  for (let x = 0; x < width; x += 2) {
    const y = waveY + Math.sin(x * waveFreq + time * 0.002) * waveAmp * Math.sin(x / width * Math.PI);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  requestAnimationFrame(drawHero);
}

if (canvas) {
  resizeCanvas();
  initParticles();
  requestAnimationFrame(drawHero);
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.parentElement.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });
}

/* ---------- D3 Patch Graph Visualization ---------- */
// Using D3.js (loaded via CDN) for the force-directed graph because it handles
// physics simulation, dragging, and complex interactivity far better than
// vanilla Canvas for network data. Three.js would be overkill for a 2D graph.
(function initViz() {
  const svg = d3.select('#vizSvg');
  if (svg.empty()) return;

  const tooltip = d3.select('#vizTooltip');
  const box = svg.node().getBoundingClientRect();
  const vw = 800;
  const vh = 400;

  // Realistic patch node data
  const nodes = [
    { id: 'osc1', name: 'Oscillator', type: 'audio', freq: '440 Hz', amp: '0.80', x: 150, y: 200 },
    { id: 'lfo1', name: 'LFO', type: 'modulation', rate: '0.25 Hz', depth: '1.00', x: 300, y: 100 },
    { id: 'filter', name: 'Lowpass Filter', type: 'audio', cutoff: '2000 Hz', resonance: '0.50', x: 350, y: 220 },
    { id: 'delay', name: 'Spectral Delay', type: 'audio', time: '350 ms', feedback: '0.40', x: 500, y: 280 },
    { id: 'grain', name: 'Grain Cloud', type: 'audio', density: '50', spread: '0.30', x: 480, y: 120 },
    { id: 'plane', name: 'Visual Plane', type: 'visual', scale: '1.20', rotation: '0°', x: 620, y: 180 },
    { id: 'cam', name: 'Camera', type: 'visual', fov: '45°', distance: '10.0', x: 720, y: 140 },
    { id: 'out', name: 'Output', type: 'system', channels: '2', sampleRate: '48 kHz', x: 680, y: 320 },
  ];

  const links = [
    { source: 'osc1', target: 'filter' },
    { source: 'lfo1', target: 'filter' },
    { source: 'filter', target: 'delay' },
    { source: 'filter', target: 'grain' },
    { source: 'grain', target: 'out' },
    { source: 'delay', target: 'out' },
    { source: 'osc1', target: 'plane' },
    { source: 'plane', target: 'cam' },
    { source: 'lfo1', target: 'plane' },
  ];

  const colorMap = {
    audio: '#00F0C8',
    modulation: '#A8B0AD',
    visual: '#F4F2EE',
    system: '#5A6461',
  };

  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(90))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(vw / 2, vh / 2))
    .force('collide', d3.forceCollide().radius(40));

  // Draw links
  const link = svg.append('g')
    .attr('stroke', '#1F2624')
    .attr('stroke-width', 1.5)
    .selectAll('line')
    .data(links)
    .join('line');

  // Draw nodes
  const node = svg.append('g')
    .selectAll('g')
    .data(nodes)
    .join('g')
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

  node.append('circle')
    .attr('r', 10)
    .attr('fill', '#0A0E0D')
    .attr('stroke', d => colorMap[d.type] || '#5A6461')
    .attr('stroke-width', 2);

  node.append('text')
    .attr('dy', 24)
    .attr('text-anchor', 'middle')
    .text(d => d.name)
    .attr('fill', '#A8B0AD')
    .attr('font-family', "'IBM Plex Mono', monospace")
    .attr('font-size', '10px')
    .attr('font-weight', 500);

  // Interaction
  node.on('mouseenter', function(event, d) {
    d3.select(this).select('circle')
      .transition().duration(150)
      .attr('r', 14)
      .attr('stroke-width', 3)
      .attr('stroke', '#00F0C8');

    // Highlight connected links
    link.attr('stroke', l => (l.source.id === d.id || l.target.id === d.id) ? '#00F0C8' : '#1F2624')
        .attr('stroke-opacity', l => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.2)
        .attr('stroke-width', l => (l.source.id === d.id || l.target.id === d.id) ? 2 : 1);

    // Tooltip
    const params = Object.entries(d)
      .filter(([k]) => !['id','name','type','x','y','vx','vy','index','fx','fy'].includes(k))
      .map(([k,v]) => `${k}: ${v}`).join(' · ');
    tooltip.style('opacity', 1)
      .html(`<strong style="color:#00F0C8">${d.name}</strong><br/><span style="color:#A8B0AD">${params}</span>`);
  })
  .on('mousemove', function(event) {
    const wrap = document.querySelector('.viz-wrap').getBoundingClientRect();
    tooltip
      .style('left', (event.clientX - wrap.left + 12) + 'px')
      .style('top', (event.clientY - wrap.top + 12) + 'px');
  })
  .on('mouseleave', function() {
    d3.select(this).select('circle')
      .transition().duration(150)
      .attr('r', 10)
      .attr('stroke-width', 2)
      .attr('stroke', d => colorMap[d.type] || '#5A6461');
    link.attr('stroke', '#1F2624').attr('stroke-opacity', 1).attr('stroke-width', 1.5);
    tooltip.style('opacity', 0);
  })
  .on('click', function(event, d) {
    // Pulse effect
    const c = d3.select(this).select('circle');
    c.attr('fill', '#00F0C8')
     .transition().duration(300)
     .attr('fill', '#0A0E0D');
  });

  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    node.attr('transform', d => `translate(${d.x},${d.y})`);
  });
})();
