// site/main.js

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollAnimations();
  initBackgroundCanvas();
  initDataViz();
});

// 1. Mobile Nav
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const links = document.querySelector('.nav-links');
  
  if(toggle && links) {
    toggle.addEventListener('click', () => {
      if (links.style.display === 'flex') {
        links.style.display = 'none';
      } else {
        links.style.display = 'flex';
        links.style.flexDirection = 'column';
        links.style.position = 'absolute';
        links.style.top = '100%';
        links.style.left = '0';
        links.style.width = '100%';
        links.style.backgroundColor = 'var(--color-bg-primary)';
        links.style.padding = 'var(--space-4)';
        links.style.borderBottom = '1px solid var(--color-border)';
      }
    });
  }
}

// 2. Scroll Animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  const sections = document.querySelectorAll('.section-content, .hero-headline, .card, .list-item');
  sections.forEach(sec => {
    sec.classList.add('fade-in-up');
    observer.observe(sec);
  });
}

// 3. Generative Background Canvas (Phase 6.1 Wildcard)
// Creates an oscillating, breathing signal field that responds to mouse position.
function initBackgroundCanvas() {
  const canvas = document.getElementById('vektra-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let time = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Get accent color from computed style or fallback to #FF3300
  const style = getComputedStyle(document.body);
  let accentRaw = style.getPropertyValue('--color-accent').trim() || '#FF3300';
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw a grid of points that distort based on noise/sine and mouse proximity
    const spacing = 40;
    const cols = Math.floor(width / spacing) + 1;
    const rows = Math.floor(height / spacing) + 1;
    
    ctx.strokeStyle = accentRaw;
    ctx.lineWidth = 1;

    for (let i = 0; i < cols; i++) {
      ctx.beginPath();
      for (let j = 0; j < rows; j++) {
        const x0 = i * spacing;
        const y0 = j * spacing;
        
        // Calculate distance to mouse
        const dx = mouse.x - x0;
        const dy = mouse.y - y0;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Oscillation and distortion
        const influence = Math.max(0, 1 - dist / 300);
        const waveX = Math.sin(time * 0.002 + j * 0.1) * 15 * influence;
        const waveY = Math.cos(time * 0.002 + i * 0.1) * 15 * influence;
        
        const x = x0 + waveX;
        const y = y0 + waveY;
        
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        
        // Occasionally draw dots at intersections for terminal feel
        if ((i + j) % 5 === 0 && influence > 0.1) {
          ctx.fillStyle = accentRaw;
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }
      ctx.globalAlpha = 0.15;
      ctx.stroke();
    }
    
    time += 16; // Approx 60fps
    requestAnimationFrame(draw);
  }
  
  draw();
}

// 4. Data Visualization (Phase 4)
// Using D3.js to render a force-directed graph of audio/visual parameters
// Rationale: A force-directed network graph perfectly illustrates VEKTRA's core concept: treating audio and visual nodes as part of a single continuous graph environment.
function initDataViz() {
  const container = document.getElementById('vektra-viz');
  if (!container || typeof d3 === 'undefined') return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = d3.select(container).append("svg")
      .attr("width", width)
      .attr("height", height);

  // Plausible network data
  const data = {
    nodes: [
      { id: "LFO_1", type: "audio", val: 5 },
      { id: "Filter_Cutoff", type: "audio", val: 3 },
      { id: "Env_Follower", type: "analysis", val: 7 },
      { id: "Camera_FOV", type: "visual", val: 4 },
      { id: "Particle_Emit", type: "visual", val: 6 },
      { id: "Kick_Drum", type: "audio", val: 8 },
      { id: "Noise_Gen", type: "audio", val: 3 },
      { id: "Displacement_Map", type: "visual", val: 5 }
    ],
    links: [
      { source: "LFO_1", target: "Filter_Cutoff", value: 1 },
      { source: "LFO_1", target: "Camera_FOV", value: 2 },
      { source: "Kick_Drum", target: "Env_Follower", value: 1 },
      { source: "Env_Follower", target: "Particle_Emit", value: 3 },
      { source: "Noise_Gen", target: "Displacement_Map", value: 1 },
      { source: "Env_Follower", target: "Displacement_Map", value: 2 }
    ]
  };

  const style = getComputedStyle(document.body);
  const accentColor = style.getPropertyValue('--color-accent').trim() || '#FF3300';
  const mutedColor = style.getPropertyValue('--color-text-muted').trim() || '#52525B';
  const textColor = style.getPropertyValue('--color-text-primary').trim() || '#FFFFFF';

  const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg.append("g")
      .attr("stroke", mutedColor)
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value) * 1.5);

  const node = svg.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(drag(simulation));

  node.append("circle")
      .attr("r", d => d.val * 1.5)
      .attr("fill", d => d.type === "visual" ? accentColor : "#121214")
      .attr("stroke", d => d.type === "audio" ? textColor : accentColor)
      .attr("stroke-width", 2);

  node.append("text")
      .text(d => d.id)
      .attr("x", 12)
      .attr("y", 3)
      .attr("font-family", "'JetBrains Mono', monospace")
      .attr("font-size", "10px")
      .attr("fill", textColor);

  // Hover interactivity
  node.on("mouseover", function() {
    d3.select(this).select("circle").attr("fill", accentColor);
  }).on("mouseout", function(event, d) {
    d3.select(this).select("circle").attr("fill", d.type === "visual" ? accentColor : "#121214");
  });

  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x},${d.y})`);
  });

  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

  // Handle window resize for D3
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    svg.attr("width", newWidth).attr("height", newHeight);
    simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
    simulation.alpha(0.3).restart();
  });
}
