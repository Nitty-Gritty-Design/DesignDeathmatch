/**
 * VEKTRA Website Logic
 * Handles interactive elements: mobile nav, scroll triggers, theme toggle,
 * generative background canvas, and the parameter-driven oscilloscope.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollReveals();
  initGenerativeBackground();
  initOscilloscope();
});

/* ==========================================================================
   1. Theme Management
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('vektra-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeButtonLabel(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vektra-theme', theme);
    updateThemeButtonLabel(toggleBtn, theme);
    
    // Trigger canvas recolor updates
    window.dispatchEvent(new CustomEvent('vektra-theme-changed', { detail: { theme } }));
  });
}

function updateThemeButtonLabel(btn, theme) {
  btn.innerHTML = `Theme: ${theme === 'dark' ? 'Dark' : 'Light'}`;
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle-btn');
  const menu = document.getElementById('nav-menu-list');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Close when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    }
  });
}

/* ==========================================================================
   3. Scroll Entrance Animations
   ========================================================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if observer not supported
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* ==========================================================================
   4. Generative Background (Constellation Signal Field)
   ========================================================================== */
function initGenerativeBackground() {
  const container = document.getElementById('bg-canvas-container');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  
  let width = 0;
  let height = 0;
  let nodes = [];
  let mouse = { x: null, y: null, active: false };

  // Read brand styles dynamically
  let accentColor = '';
  let borderColor = '';
  
  function getThemeColors() {
    const styles = window.getComputedStyle(document.documentElement);
    accentColor = styles.getPropertyValue('--color-accent').trim() || '#caff00';
    borderColor = styles.getPropertyValue('--color-border').trim() || '#2d2e33';
  }
  
  getThemeColors();
  window.addEventListener('vektra-theme-changed', getThemeColors);

  function resize() {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    createNodes();
  }

  function createNodes() {
    nodes = [];
    // Calculate density based on screen space
    const count = Math.floor((width * height) / 18000);
    const limit = Math.min(count, 80); // Cap nodes for performance

    for (let i = 0; i < limit; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8
      });
    }
  }

  // Tracking mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Main animation tick
  function tick() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      // Wrap around bounds
      if (n.x < 0) n.x = width;
      if (n.x > width) n.x = 0;
      if (n.y < 0) n.y = height;
      if (n.y > height) n.y = 0;

      // Cursor interaction (pull slightly)
      if (mouse.active) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 1500;
          n.x += dx * force;
          n.y += dy * force;
        }
      }

      // Draw node point
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = accentColor;
      ctx.globalAlpha = 0.25;
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }

    // Draw lines between nodes
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          // Fade opacity of line based on distance
          const alpha = (100 - dist) / 100 * 0.15;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = alpha;
          ctx.stroke();
        }
      }
    }
    
    ctx.globalAlpha = 1.0;
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(tick);
}

/* ==========================================================================
   5. Interactive Oscilloscope (Data Visualization)
   ========================================================================== */
// Rationale: An interactive vector oscilloscope simulation reveals the mathematical and signal-driven core of VEKTRA's generative DSP audio-visual engine.
function initOscilloscope() {
  const canvas = document.getElementById('viz-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Controls
  const inputFreq = document.getElementById('control-freq');
  const inputAmp = document.getElementById('control-amp');
  const inputPhase = document.getElementById('control-phase');
  const inputNoise = document.getElementById('control-noise');

  // Value readouts
  const readFreq = document.getElementById('read-freq');
  const readAmp = document.getElementById('read-amp');
  const readPhase = document.getElementById('read-phase');
  const readNoise = document.getElementById('read-noise');

  let width = canvas.width = canvas.parentElement.clientWidth;
  let height = canvas.height = canvas.parentElement.clientHeight || 250;

  function resize() {
    if (canvas.parentElement) {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 250;
    }
  }
  window.addEventListener('resize', resize);

  // Initial wave variables
  let time = 0;

  function drawGrid() {
    ctx.strokeStyle = window.getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim() || '#2d2e33';
    ctx.lineWidth = 0.5;

    // Vertical grid lines
    const cols = 10;
    for (let i = 0; i <= cols; i++) {
      const x = (width / cols) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal grid lines
    const rows = 6;
    for (let i = 0; i <= rows; i++) {
      const y = (height / rows) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  function renderWave() {
    // Read input values
    const freq = parseFloat(inputFreq.value);
    const amp = parseFloat(inputAmp.value);
    const phaseSpeed = parseFloat(inputPhase.value);
    const noiseLevel = parseFloat(inputNoise.value);

    // Update readouts
    readFreq.textContent = freq.toFixed(1) + ' Hz';
    readAmp.textContent = (amp * 100).toFixed(0) + '%';
    readPhase.textContent = phaseSpeed.toFixed(2);
    readNoise.textContent = (noiseLevel * 10).toFixed(1) + ' V';

    ctx.clearRect(0, 0, width, height);
    
    // Draw oscilloscope grids
    drawGrid();

    // Setup stroke styling
    const styles = window.getComputedStyle(document.documentElement);
    const accentColor = styles.getPropertyValue('--color-accent').trim() || '#caff00';
    
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const midY = height / 2;
    time += phaseSpeed * 0.05;

    for (let x = 0; x < width; x++) {
      // Base math formula for synthesis wave: sine + noise
      const angle = (x / width) * Math.PI * 2 * freq + time;
      
      // Basic sine
      let yOffset = Math.sin(angle) * amp * (height * 0.4);

      // Add high-frequency harmonics (to make it look like a vector synthesizer)
      yOffset += Math.sin(angle * 3) * (amp * 0.25) * (height * 0.1);

      // Add noise modulation
      if (noiseLevel > 0) {
        yOffset += (Math.random() - 0.5) * noiseLevel * 25;
      }

      const y = midY + yOffset;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();

    // Trigger next redraw frame for interactive oscilloscope running state
    requestAnimationFrame(renderWave);
  }

  // Start oscilloscope frame loop
  requestAnimationFrame(renderWave);
}
