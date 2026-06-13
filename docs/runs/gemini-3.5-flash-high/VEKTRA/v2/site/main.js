/**
 * VEKTRA V2 — Advanced Generative Systems Script
 * Orchestrates premium UX: mobile menus, theme controls, scroll observers,
 * a 3D vector field canvas, and the dual-trace Lissajous scope analyzer.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeV2();
  initMobileNavV2();
  initScrollRevealsV2();
  initVectorFieldBackground();
  initLissajousScope();
});

/* ==========================================================================
   1. Theme Management (V2)
   ========================================================================== */
function initThemeV2() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('vektra-theme-v2') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeButtonV2(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('vektra-theme-v2', nextTheme);
    updateThemeButtonV2(toggleBtn, nextTheme);
    
    // Dispatch event to redraw dynamic canvas colors
    window.dispatchEvent(new CustomEvent('vektra-theme-changed-v2', { detail: { theme: nextTheme } }));
  });
}

function updateThemeButtonV2(btn, theme) {
  btn.innerHTML = `Theme: ${theme === 'dark' ? 'Dark' : 'Light'}`;
}

/* ==========================================================================
   2. Mobile Navigation Overlay
   ========================================================================== */
function initMobileNavV2() {
  const toggle = document.getElementById('nav-toggle-btn');
  const menu = document.getElementById('nav-menu-list');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   3. Intersection Observer Reveals
   ========================================================================== */
function initScrollRevealsV2() {
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* ==========================================================================
   4. 3D Vector Flow-Field Canvas Background
   ========================================================================== */
function initVectorFieldBackground() {
  const container = document.getElementById('bg-canvas-container');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;
  
  let mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false };
  let time = 0;
  
  let gridPoints = [];
  const spacing = 45; // density spacing of lattice lines

  // Dynamic theme colors read
  let colorGrid = '';
  let colorAccent = '';
  let colorSecondary = '';

  function readColors() {
    const styles = window.getComputedStyle(document.documentElement);
    colorGrid = styles.getPropertyValue('--color-border').trim() || '#1d2433';
    colorAccent = styles.getPropertyValue('--color-accent').trim() || '#00e65c';
    colorSecondary = styles.getPropertyValue('--color-accent-sec').trim() || '#00d4ff';
  }
  
  readColors();
  window.addEventListener('vektra-theme-changed-v2', readColors);

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initGrid();
  }

  function initGrid() {
    gridPoints = [];
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    for (let r = 0; r < rows; r++) {
      gridPoints[r] = [];
      for (let c = 0; c < cols; c++) {
        gridPoints[r][c] = {
          baseX: c * spacing,
          baseY: r * spacing,
          x: c * spacing,
          y: r * spacing,
          vx: 0,
          vy: 0
        };
      }
    }
  }

  window.addEventListener('mousemove', (e) => {
    mouse.tx = e.clientX;
    mouse.ty = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  function animateField() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse coordinates dampening (expensive easing curve)
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;

    time += 0.003;
    const cols = gridPoints[0] ? gridPoints[0].length : 0;
    const rows = gridPoints.length;

    // First update positions with coordinate wave mathematics
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const pt = gridPoints[r][c];
        
        // Multi-frequency wave calculation simulating vector noise flows
        const angle1 = (pt.baseX / width) * Math.PI * 4 + time * 3;
        const angle2 = (pt.baseY / height) * Math.PI * 3 + time * 2;
        
        // Drift offsets
        let dx = Math.sin(angle1) * Math.cos(angle2) * 8;
        let dy = Math.cos(angle1) * Math.sin(angle2) * 8;

        // Warp fabric around mouse position
        if (mouse.active) {
          const mdx = mouse.x - pt.baseX;
          const mdy = mouse.y - pt.baseY;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (dist < 250) {
            // Push field slightly, calculating ripple modulation
            const warpFactor = (250 - dist) / 250;
            const ripple = Math.sin(dist * 0.05 - time * 20) * 12;
            dx += (mdx / dist) * ripple * warpFactor;
            dy += (mdy / dist) * ripple * warpFactor;
          }
        }

        // Apply positions
        pt.x = pt.baseX + dx;
        pt.y = pt.baseY + dy;
      }
    }

    // Draw grid lattice lines (Horizontal)
    ctx.strokeStyle = colorGrid;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.35;

    for (let r = 0; r < rows; r++) {
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        const pt = gridPoints[r][c];
        if (c === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
    }

    // Vertical lines
    for (let c = 0; c < cols; c++) {
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        const pt = gridPoints[r][c];
        if (r === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
    }

    // Draw coordinates nodes at active highlight positions
    ctx.globalAlpha = 0.8;
    for (let r = 0; r < rows; r += 2) {
      for (let c = 0; c < cols; c += 2) {
        const pt = gridPoints[r][c];
        
        // Calculate dynamic proximity opacity
        if (mouse.active) {
          const mdx = mouse.x - pt.x;
          const mdy = mouse.y - pt.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          
          if (dist < 150) {
            const ratio = (150 - dist) / 150;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.5 + ratio * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = ratio > 0.5 ? colorAccent : colorSecondary;
            ctx.globalAlpha = 0.15 + ratio * 0.45;
            ctx.fill();
          }
        }
      }
    }

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(animateField);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(animateField);
}

/* ==========================================================================
   5. Dual-Trace Phase-Correlation Scope (Data Visualization V2)
   ========================================================================== */
// Rationale: A vector-scope plots the phase relationship between two sound waves (Lissajous curves), demonstrating VEKTRA's audio-visual synchronization logic at a sub-millisecond level.
function initLissajousScope() {
  const canvas = document.getElementById('viz-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Custom interface widgets
  const ctrlFreqX = document.getElementById('control-freq-x');
  const ctrlFreqY = document.getElementById('control-freq-y');
  const ctrlPhase = document.getElementById('control-phase-v2');
  const ctrlAmp = document.getElementById('control-amp-v2');
  const selectShape = document.getElementById('control-shape-v2');

  // Text readouts
  const readFreqX = document.getElementById('read-freq-x');
  const readFreqY = document.getElementById('read-freq-y');
  const readPhase = document.getElementById('read-phase-v2');
  const readAmp = document.getElementById('read-amp-v2');
  const readStatus = document.getElementById('read-status-v2');

  let width = canvas.width = canvas.parentElement.clientWidth;
  let height = canvas.height = canvas.parentElement.clientHeight || 300;

  function resizeScope() {
    if (canvas.parentElement) {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 300;
    }
  }
  window.addEventListener('resize', resizeScope);

  let runTime = 0;

  function drawScopeGrid() {
    const styles = window.getComputedStyle(document.documentElement);
    const gridColor = styles.getPropertyValue('--color-border').trim() || '#1d2433';
    
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;

    // Drawing concentric correlation circles
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.45;

    for (let r = 0.25; r <= 1.00; r += 0.25) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw Crosshair Axes
    ctx.beginPath();
    ctx.moveTo(centerX - maxRadius, centerY);
    ctx.lineTo(centerX + maxRadius, centerY);
    ctx.moveTo(centerX, centerY - maxRadius);
    ctx.lineTo(centerX, centerY + maxRadius);
    ctx.stroke();
  }

  // Wave mathematical generator functions
  function getWaveVal(shape, angle) {
    switch(shape) {
      case 'sine':
        return Math.sin(angle);
      case 'triangle':
        // Triangle wave: maps angle mapped from -1 to 1
        const normAngle = (angle % (Math.PI * 2)) / (Math.PI * 2);
        return 4 * Math.abs(normAngle - 0.5) - 1;
      case 'square':
        return Math.sin(angle) >= 0 ? 0.8 : -0.8;
      default:
        return Math.sin(angle);
    }
  }

  function renderScope() {
    const fX = parseFloat(ctrlFreqX.value);
    const fY = parseFloat(ctrlFreqY.value);
    const phOffset = parseFloat(ctrlPhase.value) * Math.PI; // Phase in radians
    const gain = parseFloat(ctrlAmp.value);
    const shape = selectShape.value;

    // Update readouts
    readFreqX.textContent = fX.toFixed(1) + ' Hz';
    readFreqY.textContent = fY.toFixed(1) + ' Hz';
    readPhase.textContent = (parseFloat(ctrlPhase.value) * 180).toFixed(0) + '°';
    readAmp.textContent = (gain * 100).toFixed(0) + '%';
    
    // Status text (Lissajous relationship)
    if (fX === fY) {
      if (parseFloat(ctrlPhase.value) === 0) readStatus.textContent = "LOCK: Phase Coherent Line";
      else if (parseFloat(ctrlPhase.value) === 0.5) readStatus.textContent = "LOCK: Circle Orthogonal";
      else readStatus.textContent = "LOCK: Out of Phase Ellipse";
    } else {
      readStatus.textContent = `RATIO: ${fX.toFixed(0)}:${fY.toFixed(0)} Complex Vector`;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Draw grids
    drawScopeGrid();

    // 2. Plot vector Lissajous curves
    const styles = window.getComputedStyle(document.documentElement);
    const accentCol = styles.getPropertyValue('--color-accent').trim() || '#00e65c';
    
    ctx.strokeStyle = accentCol;
    ctx.lineWidth = 1.75;
    ctx.shadowBlur = 12;
    ctx.shadowColor = styles.getPropertyValue('--color-accent-dim').trim() || 'rgba(0, 230, 92, 0.4)';
    ctx.beginPath();

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.4;

    runTime += 0.012; // trace speed animation coefficient

    // Sample resolution: larger number is smoother curve
    const resolution = 250; 
    for (let i = 0; i <= resolution; i++) {
      const t = (i / resolution) * Math.PI * 2;
      
      const angleX = t * fX + runTime;
      const angleY = t * fY + phOffset;

      const posX = getWaveVal(shape, angleX) * gain * maxRadius;
      const posY = getWaveVal(shape, angleY) * gain * maxRadius;

      const x = centerX + posX;
      const y = centerY + posY;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
    
    // Reset shadow values for next draw runs
    ctx.shadowBlur = 0;

    requestAnimationFrame(renderScope);
  }

  requestAnimationFrame(renderScope);
}
