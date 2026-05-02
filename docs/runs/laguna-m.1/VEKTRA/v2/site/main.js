/* VEKTRA main.js v2 */

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Scroll-triggered animations with staggered reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 50);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
  
  // Interactive cursor effect with magnetic attraction
  const hero = document.querySelector('.hero');
  if (hero) {
    let targetX = 0;
    let targetY = 0;
    
    hero.addEventListener('mousemove', function(e) {
      const rect = hero.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = (e.clientY - rect.top) / rect.height;
      
      const title = hero.querySelector('.hero-title');
      if (title) {
        const moveX = (targetX - 0.5) * 30;
        const moveY = (targetY - 0.5) * 20;
        title.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }
    });
  }
});

// Hero background signal visualization
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
    
    // Draw subtle grid
    ctx.strokeStyle = 'rgba(42, 42, 42, 0.2)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= 8; i++) {
      const y = (height / 8) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw signal waves
    ctx.strokeStyle = 'rgba(255, 122, 0, 0.3)';
    ctx.lineWidth = 1.5;
    
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 5) {
        const freq = 0.008 + i * 0.004;
        const amp = 15 + i * 5;
        const y = centerY + Math.sin(x * freq + time * (0.03 + i * 0.01)) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    
    time += 0.8;
    requestAnimationFrame(draw);
  }
  
  draw();
})();

// Data visualization - Signal Flow Network
(function() {
  const canvas = document.getElementById('signal-visualization');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const nodes = [
    { id: 0, label: 'Audio In', type: 'input', value: 0.7 },
    { id: 1, label: 'Freq Shift', type: 'process', value: 0.4 },
    { id: 2, label: 'Amp Mod', type: 'process', value: 0.8 },
    { id: 3, label: 'Low Pass', type: 'filter', value: 0.6 },
    { id: 4, label: 'Visual Rx', type: 'visual', value: 0.9 },
    { id: 5, label: 'Shader', type: 'visual', value: 0.3 },
    { id: 6, label: 'Audio Out', type: 'output', value: 0.7 },
    { id: 7, label: 'Vis Out', type: 'output', value: 0.9 }
  ];
  
  const positions = [
    { x: 50, y: 150 }, { x: 180, y: 80 }, { x: 180, y: 220 },
    { x: 310, y: 150 }, { x: 440, y: 80 }, { x: 440, y: 220 },
    { x: 570, y: 80 }, { x: 570, y: 220 }
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
    ctx.strokeStyle = 'rgba(255, 122, 0, 0.3)';
    ctx.lineWidth = 2;
    connections.forEach(conn => {
      const from = positions[conn.from];
      const to = positions[conn.to];
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });
    
    // Draw nodes
    nodes.forEach((node, i) => {
      const pos = positions[i];
      const isHovered = hoveredNode === i;
      
      ctx.fillStyle = isHovered ? 'rgba(255, 122, 0, 0.3)' : 'rgba(255, 122, 0, 0.15)';
      ctx.strokeStyle = isHovered ? 'rgba(255, 122, 0, 0.9)' : 'rgba(255, 122, 0, 0.6)';
      ctx.lineWidth = isHovered ? 2 : 1;
      
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, isHovered ? 24 : 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Value bar
      ctx.fillStyle = 'rgba(255, 122, 0, 0.8)';
      ctx.fillRect(pos.x - 15, pos.y + 30, 30 * node.value, 3);
      
      // Label
      ctx.fillStyle = '#f0f0f0';
      ctx.font = '11px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, pos.x, pos.y + 50);
    });
  }
  
  canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    let found = null;
    positions.forEach((pos, i) => {
      const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      if (dist < 20) found = i;
    });
    
    hoveredNode = found;
    canvas.style.cursor = found !== null ? 'pointer' : 'default';
  });
  
  canvas.addEventListener('click', function() {
    if (hoveredNode !== null) {
      nodes[hoveredNode].value = Math.random();
    }
  });
  
  draw();
})();
