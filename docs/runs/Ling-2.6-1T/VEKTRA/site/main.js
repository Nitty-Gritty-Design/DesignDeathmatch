// VEKTRA Main JavaScript
// Mobile navigation, scroll animations, and interactive elements

(function() {
  'use strict';

  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const nav = document.querySelector('.nav');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      
      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ============================================
  // Scroll-based Nav Background
  // ============================================
  let lastScrollY = 0;
  
  function handleScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ============================================
  // Scroll Reveal Animations
  // ============================================
  const revealElements = document.querySelectorAll('.feature-card, .user-card, .section');
  
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
      if (entry.isIntersecting) {
        // Staggered delay based on element index
        const delay = Math.min(index * 80, 400);
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(function(el) {
    revealObserver.observe(el);
  });

  // ============================================
  // Hero Interactive Background (Signal Field)
  // ============================================
  const heroVisual = document.getElementById('hero-visual');
  const heroCanvas = document.createElement('canvas');
  const heroCtx = heroCanvas.getContext('2d');
  heroVisual.appendChild(heroCanvas);
  
  let heroParticles = [];
  let heroMouseX = 0;
  let heroMouseY = 0;
  let heroTargetMouseX = 0;
  let heroTargetMouseY = 0;
  
  function initHeroParticles() {
    heroParticles = [];
    const count = Math.min(40, Math.floor(window.innerWidth / 32));
    for (let i = 0; i < count; i++) {
      heroParticles.push({
        x: Math.random() * heroCanvas.width,
        y: Math.random() * heroCanvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.max(1, 1 + Math.random() * 2),
        baseRadius: Math.max(1, 1 + Math.random() * 2),
        phase: Math.random() * Math.PI * 2
      });
    }
  }
  
  function resizeHeroCanvas() {
    const rect = heroVisual.getBoundingClientRect();
    heroCanvas.width = rect.width * window.devicePixelRatio;
    heroCanvas.height = rect.height * window.devicePixelRatio;
    heroCanvas.style.width = rect.width + 'px';
    heroCanvas.style.height = rect.height + 'px';
    heroCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
    initHeroParticles();
  }
  
  function updateHeroParticles() {
    const rect = heroVisual.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    heroMouseX += (heroTargetMouseX - heroMouseX) * 0.05;
    heroMouseY += (heroTargetMouseY - heroMouseY) * 0.05;
    
    heroCtx.clearRect(0, 0, rect.width, rect.height);
    
    heroParticles.forEach(function(p, i) {
      // Move particles
      const dx = heroMouseX - p.x;
      const dy = heroMouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 150;
      
      if (dist < maxDist && dist > 0) {
        const force = (1 - dist / maxDist) * 0.3;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
      
      // Gentle wave motion
      p.phase += 0.02;
      p.vx += Math.sin(p.phase) * 0.01;
      p.vy += Math.cos(p.phase * 0.7) * 0.01;
      
      // Damping
      p.vx *= 0.98;
      p.vy *= 0.98;
      
      p.x += p.vx;
      p.y += p.vy;
      
      // Boundary wrap
      if (p.x < 0) p.x = rect.width;
      if (p.x > rect.width) p.x = 0;
      if (p.y < 0) p.y = rect.height;
      if (p.y > rect.height) p.y = 0;
      
      // Draw particle
      const radius = p.baseRadius + (dist < maxDist ? (1 - dist / maxDist) * 2 : 0);
      
      heroCtx.beginPath();
      heroCtx.arc(p.x, p.y, Math.max(0.5, radius), 0, Math.PI * 2);
      heroCtx.fillStyle = 'rgba(255, 106, 0, 0.6)';
      heroCtx.fill();
    });
    
    // Draw connections
    heroCtx.strokeStyle = 'rgba(255, 106, 0, 0.1)';
    heroCtx.lineWidth = 0.5;
    
    for (let i = 0; i < heroParticles.length; i++) {
      for (let j = i + 1; j < heroParticles.length; j++) {
        const dx = heroParticles[i].x - heroParticles[j].x;
        const dy = heroParticles[i].y - heroParticles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          heroCtx.beginPath();
          heroCtx.moveTo(heroParticles[i].x, heroParticles[i].y);
          heroCtx.lineTo(heroParticles[j].x, heroParticles[j].y);
          heroCtx.globalAlpha = 1 - dist / 100;
          heroCtx.stroke();
          heroCtx.globalAlpha = 1;
        }
      }
    }
  }
  
  function animateHero() {
    updateHeroParticles();
    requestAnimationFrame(animateHero);
  }
  
  if (heroVisual) {
    resizeHeroCanvas();
    window.addEventListener('resize', resizeHeroCanvas);
    
    heroVisual.addEventListener('mousemove', function(e) {
      const rect = heroVisual.getBoundingClientRect();
      heroTargetMouseX = e.clientX - rect.left;
      heroTargetMouseY = e.clientY - rect.top;
    });
    
    heroVisual.addEventListener('mouseleave', function() {
      heroTargetMouseX = heroCanvas.width / 2;
      heroTargetMouseY = heroCanvas.height / 2;
    });
    
    animateHero();
  }

  // ============================================
  // Signal Visualization (Phase 4)
  // ============================================
  // Visualization type: Real-time frequency spectrum analyzer
  // Rationale: Shows VEKTRA's core concept — signal processing made visible.
  // The visualization displays 32 frequency bands as vertical bars, overlaid
  // with a waveform that responds to user-controlled frequency and amplitude.
  // Mouse hover reveals exact frequency values, embodying VEKTRA's inspectable ethos.
  const vizCanvas = document.getElementById('signal-viz');
  if (vizCanvas) {
    const vizCtx = vizCanvas.getContext('2d');
    const freqSlider = document.getElementById('freq-slider');
    const ampSlider = document.getElementById('amp-slider');
    const freqValue = document.getElementById('freq-value');
    const ampValue = document.getElementById('amp-value');
    const vizReset = document.getElementById('viz-reset');
    
    let vizTime = 0;
    let vizFrequency = 5;
    let vizAmplitude = 50;
    let vizMouseX = -1;
    let vizMouseY = -1;
    
    function resizeVizCanvas() {
      const rect = vizCanvas.parentElement.getBoundingClientRect();
      vizCanvas.width = rect.width * window.devicePixelRatio;
      vizCanvas.height = 300 * window.devicePixelRatio;
      vizCanvas.style.width = rect.width + 'px';
      vizCanvas.style.height = '300px';
      vizCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    function drawVisualization() {
      const width = vizCanvas.width / window.devicePixelRatio;
      const height = vizCanvas.height / window.devicePixelRatio;
      
      vizCtx.clearRect(0, 0, width, height);
      
      // Draw grid
      vizCtx.strokeStyle = 'rgba(42, 42, 42, 0.5)';
      vizCtx.lineWidth = 0.5;
      
      for (let x = 0; x < width; x += 40) {
        vizCtx.beginPath();
        vizCtx.moveTo(x, 0);
        vizCtx.lineTo(x, height);
        vizCtx.stroke();
      }
      
      for (let y = 0; y < height; y += 40) {
        vizCtx.beginPath();
        vizCtx.moveTo(0, y);
        vizCtx.lineTo(width, y);
        vizCtx.stroke();
      }
      
      // Draw center line
      vizCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      vizCtx.lineWidth = 1;
      vizCtx.beginPath();
      vizCtx.moveTo(0, height / 2);
      vizCtx.lineTo(width, height / 2);
      vizCtx.stroke();
      
      // Draw frequency spectrum
      const numFrequencies = 32;
      const barWidth = width / numFrequencies - 4;
      const centerY = height / 2;
      
      vizTime += 0.02;
      
      for (let i = 0; i < numFrequencies; i++) {
        const freq = (i + 1) * vizFrequency * 0.5;
        const baseAmp = Math.sin(vizTime * freq * 0.1 + i * 0.5) * 0.3 + 0.7;
        const mouseInfluence = vizMouseX > 0 ? Math.max(0, 1 - Math.abs(i - (vizMouseX / width * numFrequencies)) / 10) : 0;
        const amp = (vizAmplitude / 100) * baseAmp * 30 + mouseInfluence * 40;
        
        const hue = 20 + (i / numFrequencies) * 20;
        const alpha = 0.6 + mouseInfluence * 0.4;
        
        vizCtx.fillStyle = `hsla(${hue}, 85%, 60%, ${alpha})`;
        
        const x = i * (barWidth + 4) + 2;
        vizCtx.fillRect(x, centerY - amp / 2, barWidth, amp);
      }
      
      // Draw waveform overlay
      vizCtx.strokeStyle = '#ff6a00';
      vizCtx.lineWidth = 2;
      vizCtx.beginPath();
      
      for (let x = 0; x < width; x++) {
        const t = x / width;
        const y = centerY + Math.sin(t * Math.PI * 2 * vizFrequency + vizTime * 2) * (vizAmplitude / 100) * 50 * Math.sin(vizTime * 0.5);
        
        if (x === 0) {
          vizCtx.moveTo(x, y);
        } else {
          vizCtx.lineTo(x, y);
        }
      }
      vizCtx.stroke();
      
      // Draw tooltip on hover
      if (vizMouseX >= 0 && vizMouseY >= 0) {
        const freqIndex = Math.floor((vizMouseX / width) * numFrequencies);
        const freqHz = (freqIndex + 1) * vizFrequency * 0.5;
        
        vizCtx.fillStyle = 'rgba(10, 10, 11, 0.9)';
        vizCtx.strokeStyle = '#ff6a00';
        vizCtx.lineWidth = 1;
        
        const tooltipText = `${freqHz.toFixed(1)} Hz`;
        const textWidth = vizCtx.measureText(tooltipText).width;
        
        vizCtx.beginPath();
        vizCtx.roundRect(vizMouseX + 10, vizMouseY - 30, textWidth + 16, 20, 4);
        vizCtx.fill();
        vizCtx.stroke();
        
        vizCtx.fillStyle = '#ff6a00';
        vizCtx.font = '12px "IBM Plex Mono", monospace';
        vizCtx.fillText(tooltipText, vizMouseX + 18, vizMouseY - 16);
      }
    }
    
    function animateViz() {
      drawVisualization();
      vizTime += 0.016;
      requestAnimationFrame(animateViz);
    }
    
    // Event listeners
    freqSlider.addEventListener('input', function() {
      vizFrequency = parseInt(this.value);
      freqValue.textContent = vizFrequency + ' Hz';
    });
    
    ampSlider.addEventListener('input', function() {
      vizAmplitude = parseInt(this.value);
      ampValue.textContent = vizAmplitude + '%';
    });
    
    vizReset.addEventListener('click', function() {
      freqSlider.value = 5;
      ampSlider.value = 50;
      vizFrequency = 5;
      vizAmplitude = 50;
      freqValue.textContent = '5 Hz';
      ampValue.textContent = '50%';
    });
    
    vizCanvas.addEventListener('mousemove', function(e) {
      const rect = vizCanvas.getBoundingClientRect();
      vizMouseX = e.clientX - rect.left;
      vizMouseY = e.clientY - rect.top;
    });
    
    vizCanvas.addEventListener('mouseleave', function() {
      vizMouseX = -1;
      vizMouseY = -1;
    });
    
    // Polyfill for roundRect if not available
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (typeof r === 'number') r = [r, r, r, r];
        this.moveTo(x + r[0], y);
        this.lineTo(x + w - r[1], y);
        this.quadraticCurveTo(x + w, y, x + w, y + r[1]);
        this.lineTo(x + w, y + h - r[2]);
        this.quadraticCurveTo(x + w, y + h, x + w - r[2], y + h);
        this.lineTo(x + r[3], y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r[3]);
        this.lineTo(x, y + r[0]);
        this.quadraticCurveTo(x, y, x + r[0], y);
        this.closePath();
        return this;
      };
    }
    
    resizeVizCanvas();
    window.addEventListener('resize', resizeVizCanvas);
    animateViz();
  }

  // ============================================
  // CTA Buttons
  // ============================================
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (this.classList.contains('nav-cta') || this.textContent.includes('Get Started') || this.textContent.includes('Start Building')) {
        e.preventDefault();
        document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();