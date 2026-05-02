/* VEKTRA main.js */

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
  
  // Interactive cursor effect for hero
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', function(e) {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      hero.style.setProperty('--mouse-x', x);
      hero.style.setProperty('--mouse-y', y);
      
      const title = hero.querySelector('.hero-title');
      if (title) {
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        title.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
  }
});

// Signal visualization for hero background
(function() {
  const canvas = document.getElementById('signal-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let time = 0;
  
  function draw() {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const centerY = height / 2;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(42, 42, 42, 0.3)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 10; i++) {
      const y = (height / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw signal lines
    ctx.strokeStyle = 'rgba(255, 140, 0, 0.4)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      for (let x = 0; x < width; x += 10) {
        const freq = 0.01 + i * 0.005;
        const amp = 10 + i * 5;
        const y = centerY + Math.sin(x * freq + time * (0.02 + i * 0.005)) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    
    time += 0.5;
    requestAnimationFrame(draw);
  }
  
  draw();
})();

// Data visualization - Signal Flow Network
// VEKTRA patch network visualization using Canvas - shows how audio parameters connect
(function() {
  const canvas = document.getElementById('signal-visualization');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const nodes = [
    { id: 'audio.in', label: 'Audio In', type: 'input', x: 50, y: 150, value: 0.7 },
    { id: 'freq.shift', label: 'Frequency Shift', type: 'process', x: 200, y: 100, value: 0.4 },
    { id: 'amp.mod', label: 'Amplitude Mod', type: 'process', x: 200, y: 200, value: 0.8 },
    { id: 'filter.low', label: 'Low Pass', type: 'filter', x: 350, y: 150, value: 0.6 },
    { id: 'vis.reactive', label: 'Visual Reactive', type: 'visual', x: 500, y: 100, value: 0.9 },
    { id: 'shader.mod', label: 'Shader Mod', type: 'visual', x: 500, y: 200, value: 0.3 },
    { id: 'out.audio', label: 'Audio Out', type: 'output', x: 650, y: 100, value: 0.7 },
    { id: 'out.vis', label: 'Visual Out', type: 'output', x: 650, y: 200, value: 0.9 }
  ];
  
  const connections = [
    { from: 0, to: 1 }, { from: 0, to: 2 },
    { from: 1, to: 3 }, { from: 2, to: 3 },
    { from: 3, to: 4 }, { from: 3, to: 5 },
    { from: 4, to: 6 }, { from: 5, to: 7 }
  ];
  
  let hoveredNode = null;
  
  function draw() {
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections
    ctx.strokeStyle = 'rgba(255, 140, 0, 0.3)';
    ctx.lineWidth = 2;
    connections.forEach(conn => {
      const from = nodes[conn.from];
      const to = nodes[conn.to];
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });
    
    // Draw nodes
    nodes.forEach((node, i) => {
      const isHovered = hoveredNode === i;
      ctx.fillStyle = isHovered ? 'rgba(255, 140, 0, 0.3)' : 'rgba(255, 140, 0, 0.15)';
      ctx.strokeStyle = 'rgba(255, 140, 0, 0.8)';
      ctx.lineWidth = isHovered ? 2 : 1;
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Value indicator
      ctx.fillStyle = 'rgba(255, 140, 0, 0.9)';
      ctx.fillRect(node.x - 15, node.y + 25, 30 * node.value, 4);
      
      // Label
      ctx.fillStyle = '#f0f0f0';
      ctx.font = '12px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + 45);
    });
  }
  
  canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    let found = null;
    nodes.forEach((node, i) => {
      const dist = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      if (dist < 20) found = i;
    });
    
    hoveredNode = found;
    canvas.style.cursor = found !== null ? 'pointer' : 'default';
  });
  
  canvas.addEventListener('click', function(e) {
    if (hoveredNode !== null) {
      nodes[hoveredNode].value = Math.random();
    }
  });
  
  draw();
})();
