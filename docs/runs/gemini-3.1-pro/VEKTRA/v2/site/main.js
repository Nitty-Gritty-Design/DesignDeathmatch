// site/main.js v2

document.addEventListener('DOMContentLoaded', () => {
  initPremiumBackgroundCanvas();
  initRevealAnimations();
  initPremiumDataViz();
  initNavEffect();
});

// 1. Navbar Blur Effect
function initNavEffect() {
  const nav = document.querySelector('.nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.borderBottom = '1px solid var(--color-accent)';
    } else {
      nav.style.borderBottom = '1px solid var(--color-border)';
    }
    lastScrollY = window.scrollY;
  });
}

// 2. High-End Reveal Animations
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const elements = document.querySelectorAll('.section-content, .card, .list-item, .hero-headline, .hero-subheadline');
  elements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${index % 3 * 100}ms`;
    observer.observe(el);
  });
}

// 3. Ultra-Premium Generative Background Canvas
function initPremiumBackgroundCanvas() {
  const canvas = document.getElementById('vektra-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });
  
  let width, height;
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
  const particles = [];
  const PARTICLE_COUNT = 150;
  const MAX_DISTANCE = 150;

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

  const style = getComputedStyle(document.body);
  const bgColor = style.getPropertyValue('--color-bg-primary').trim() || '#050505';

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.baseSize = Math.random() * 1.5 + 0.5;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Screen wrap
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
      
      // Mouse repulsion
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 200) {
        const angle = Math.atan2(dy, dx);
        const force = (200 - dist) / 200;
        this.x -= Math.cos(angle) * force * 2;
        this.y -= Math.sin(angle) * force * 2;
      }
    }
    
    draw() {
      ctx.fillStyle = '#333333';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.baseSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function draw() {
    // Elegant fade for trails
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < MAX_DISTANCE) {
          const opacity = 1 - (dist / MAX_DISTANCE);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          
          // Color changes based on distance to mouse
          const mDx = mouse.x - (particles[i].x + particles[j].x)/2;
          const mDy = mouse.y - (particles[i].y + particles[j].y)/2;
          const mDist = Math.sqrt(mDx*mDx + mDy*mDy);
          
          if(mDist < 250) {
            ctx.strokeStyle = `rgba(255, 51, 0, ${opacity * 0.8})`;
            ctx.lineWidth = 1.5;
          } else {
            ctx.strokeStyle = `rgba(80, 80, 80, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
          }
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// 4. Upgraded Data Visualization (D3 Graph)
function initPremiumDataViz() {
  const container = document.getElementById('vektra-viz');
  if (!container || typeof d3 === 'undefined') return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = d3.select(container).append("svg")
      .attr("width", width)
      .attr("height", height);

  // More complex network
  const data = {
    nodes: [
      { id: "DSP_CORE", group: 1, radius: 12 },
      { id: "LFO_ALPHA", group: 1, radius: 6 },
      { id: "LFO_BETA", group: 1, radius: 6 },
      { id: "GLSL_DISPLACE", group: 2, radius: 10 },
      { id: "GLSL_FRAG", group: 2, radius: 10 },
      { id: "FFT_ANALYSIS", group: 3, radius: 8 },
      { id: "OUTPUT_BUS", group: 1, radius: 14 },
      { id: "RENDER_TGT", group: 2, radius: 14 }
    ],
    links: [
      { source: "DSP_CORE", target: "OUTPUT_BUS", value: 4 },
      { source: "LFO_ALPHA", target: "DSP_CORE", value: 2 },
      { source: "LFO_BETA", target: "GLSL_DISPLACE", value: 2 },
      { source: "DSP_CORE", target: "FFT_ANALYSIS", value: 3 },
      { source: "FFT_ANALYSIS", target: "GLSL_FRAG", value: 3 },
      { source: "GLSL_DISPLACE", target: "RENDER_TGT", value: 4 },
      { source: "GLSL_FRAG", target: "RENDER_TGT", value: 4 }
    ]
  };

  const style = getComputedStyle(document.body);
  const accentPrimary = style.getPropertyValue('--color-accent').trim() || '#FF3300';
  const accentSecondary = style.getPropertyValue('--color-accent-secondary').trim() || '#00F0FF';
  const textColor = style.getPropertyValue('--color-text-primary').trim() || '#EDEDED';
  const surfaceColor = style.getPropertyValue('--color-surface').trim() || '#111111';

  const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

  // Add glow filter
  const defs = svg.append("defs");
  const filter = defs.append("filter").attr("id", "glow");
  filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "coloredBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  const link = svg.append("g")
      .attr("stroke", "#333")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", d => d.value);

  const node = svg.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(drag(simulation));

  node.append("circle")
      .attr("r", d => d.radius)
      .attr("fill", surfaceColor)
      .attr("stroke", d => d.group === 1 ? textColor : (d.group === 2 ? accentSecondary : accentPrimary))
      .attr("stroke-width", 2)
      .style("filter", "url(#glow)");

  node.append("text")
      .text(d => d.id)
      .attr("x", 18)
      .attr("y", 4)
      .attr("font-family", "'JetBrains Mono', monospace")
      .attr("font-size", "10px")
      .attr("letter-spacing", "0.1em")
      .attr("fill", textColor);

  // Pulse animation on nodes
  d3.interval(() => {
    node.select("circle")
      .transition()
      .duration(100)
      .attr("r", d => d.radius * 1.3)
      .transition()
      .duration(300)
      .attr("r", d => d.radius);
  }, 2000);

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

  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    svg.attr("width", newWidth).attr("height", newHeight);
    simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
    simulation.alpha(0.3).restart();
  });
}
