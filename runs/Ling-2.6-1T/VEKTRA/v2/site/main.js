// VEKTRA v2 Main JavaScript
// Ultra-premium animations, interactions, and generative systems
// Optimized for performance with RAF-driven updates

(function() {
  'use strict';

  // ============================================
  // Performance Monitoring
  // ============================================
  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 60;

  // ============================================
  // Utility Functions
  // ============================================
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const lerp = (a, b, t) => a + (b - a) * t;
  const map = (value, inMin, inMax, outMin, outMax) =>
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  // ============================================
  // Mobile Navigation System
  // ============================================
  const initNavigation = function() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const nav = document.querySelector('.nav');

    if (!navToggle || !navLinks) return;

    const openNav = function() {
      navLinks.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      animateHamburger(true);
    };

    const closeNav = function() {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      animateHamburger(false);
    };

    const animateHamburger = function(open) {
      const spans = navToggle.querySelectorAll('span');
      if (spans.length !== 3) return;

      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[0].style.opacity = '1';
        spans[1].style.opacity = '0';
        spans[1].style.transform = 'translateX(-10px)';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        spans[2].style.opacity = '1';
      } else {
        spans[0].style.transform = 'none';
        spans[0].style.opacity = '1';
        spans[1].style.opacity = '1';
        spans[1].style.transform = 'none';
        spans[2].style.transform = 'none';
        spans[2].style.opacity = '1';
      }
    };

    // Initialize hamburger animation state
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(span => {
      span.style.transition = 'all 0.3s cubic-bezier(0.65, 0, 0.35, 1)';
    });

    navToggle.addEventListener('click', function() {
      if (navLinks.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close nav when clicking links
    navLinks.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', closeNav);
    });

    // Close nav on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeNav();
      }
    });

    // Scroll-based nav background
    let ticking = false;
    const updateNavOnScroll = function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (window.scrollY > 50) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateNavOnScroll, { passive: true });
    updateNavOnScroll();
  };

  // ============================================
  // Scroll Reveal System
  // ============================================
  const initScrollReveal = function() {
    const revealElements = document.querySelectorAll('.feature-card, .user-card, .content-block');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
          if (entry.isIntersecting) {
            const delay = Math.min(index * 100, 300);
            setTimeout(function() {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      // Fallback for older browsers
      revealElements.forEach(function(el) {
        el.classList.add('visible');
      });
    }
  };

  // ============================================
  // Hero Particle System (Premium)
  // ============================================
  const initHeroParticles = function() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let time = 0;
    let animationId = null;

    const PARTICLE_COUNT = 60;
    const MAX_DISTANCE = 150;

    const resize = function() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initParticles();
    };

    const initParticles = function() {
      particles = [];
      const count = Math.min(PARTICLE_COUNT, Math.floor(width / 20));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.max(0.5, 1 + Math.random() * 1.5),
          baseRadius: Math.max(0.5, 1 + Math.random() * 1.5),
          phase: Math.random() * Math.PI * 2,
          frequency: 0.5 + Math.random() * 1.5,
          hue: 20 + Math.random() * 20
        });
      }
    };

    const draw = function() {
      time += 0.016;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Clear with subtle trail
      ctx.fillStyle = 'rgba(8, 8, 9, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach(function(p, i) {
        // Wave motion
        p.phase += 0.015 * p.frequency;
        const waveForce = Math.sin(p.phase) * 0.2;

        // Mouse influence
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = dist < 200 ? (1 - dist / 200) * 0.4 : 0;

        if (dist > 0 && influence > 0) {
          p.vx += (dx / dist) * influence * 0.15;
          p.vy += (dy / dist) * influence * 0.15;
        }

        // Apply forces
        p.vx += waveForce * 0.08;
        p.vy += Math.cos(p.phase * 0.5) * 0.03;
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // Boundary wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw particle
        const radius = Math.max(0.5, p.baseRadius + influence * 2);
        const alpha = 0.4 + influence * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + p.hue + ', 85%, 65%, ' + alpha + ')';
        ctx.fill();

        // Glow for nearby particles
        if (influence > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2.5);
          gradient.addColorStop(0, 'hsla(' + p.hue + ', 85%, 65%, ' + (influence * 0.3) + ')');
          gradient.addColorStop(1, 'hsla(' + p.hue + ', 85%, 65%, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(232, 77, 27, 0.08)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            ctx.globalAlpha = (1 - dist / MAX_DISTANCE) * 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Draw central waveform
      const centerX = width / 2;
      const centerY = height / 2;
      const waveAmp = 30 + Math.sin(time * 0.5) * 10;

      ctx.strokeStyle = 'rgba(232, 77, 27, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = centerX - 100; x <= centerX + 100; x += 2) {
        const y = centerY + Math.sin(x * 0.05 + time * 2) * waveAmp;
        if (x === centerX - 100) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    // Event listeners
    const handleMouseMove = function(e) {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleTouchMove = function(e) {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        targetMouseX = e.touches[0].clientX - rect.left;
        targetMouseY = e.touches[0].clientY - rect.top;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('mouseleave', function() {
      targetMouseX = width / 2;
      targetMouseY = height / 2;
    });

    window.addEventListener('resize', resize);

    // Initialize
    targetMouseX = width / 2;
    targetMouseY = height / 2;
    resize();
    draw();

    // Cleanup function
    return function cleanup() {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  };

  // ============================================
  // Signal Visualization (Premium)
  // ============================================
  const initSignalViz = function() {
    const vizCanvas = document.getElementById('signal-viz');
    if (!vizCanvas) return;

    const ctx = vizCanvas.getContext('2d');
    const freqSlider = document.getElementById('freq-slider');
    const ampSlider = document.getElementById('amp-slider');
    const compSlider = document.getElementById('comp-slider');
    const freqValue = document.getElementById('freq-value');
    const ampValue = document.getElementById('amp-value');
    const compValue = document.getElementById('comp-value');
    const vizReset = document.getElementById('viz-reset');

    let width = 0;
    let height = 0;
    let time = 0;
    let frequency = 5;
    let amplitude = 50;
    let complexity = 3;
    let mouseX = -1;
    let mouseY = -1;
    let animationId = null;

    const resize = function() {
      const rect = vizCanvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = 320;
      vizCanvas.width = width * window.devicePixelRatio;
      vizCanvas.height = height * window.devicePixelRatio;
      vizCanvas.style.width = width + 'px';
      vizCanvas.style.height = height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const draw = function() {
      time += 0.016;

      // Clear
      ctx.fillStyle = '#080809';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(42, 42, 48, 0.5)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw center line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Draw frequency spectrum bars
      const numBands = 48;
      const barWidth = width / numBands - 2;
      const centerY = height / 2;

      for (let i = 0; i < numBands; i++) {
        const freq = (i + 1) * frequency * 0.3;
        const baseAmp = Math.sin(time * freq * 0.05 + i * 0.3) * 0.4 + 0.6;
        const mouseInfluence = mouseX > 0 ? Math.max(0, 1 - Math.abs(i - (mouseX / width * numBands)) / 8) : 0;
        const compFactor = 1 + (complexity - 1) * 0.3;
        const amp = (amplitude / 100) * baseAmp * 25 * compFactor + mouseInfluence * 35;

        const hue = 20 + (i / numBands) * 25;
        const alpha = 0.5 + mouseInfluence * 0.5;

        ctx.fillStyle = 'hsla(' + hue + ', 90%, 55%, ' + alpha + ')';
        ctx.fillRect(i * (barWidth + 2) + 1, centerY - amp / 2, Math.max(1, barWidth), amp);
      }

      // Draw main waveform
      ctx.strokeStyle = '#e84d1b';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        let y = centerY;
        for (let c = 1; c <= complexity; c++) {
          y += Math.sin(x * 0.01 * c * frequency + time * c * 0.5) * (amplitude / 100) * (60 / c) * Math.sin(time * 0.2);
        }
        y /= complexity;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw hover tooltip
      if (mouseX >= 0 && mouseY >= 0) {
        const bandIndex = Math.floor((mouseX / width) * numBands);
        const freqHz = (bandIndex + 1) * frequency * 0.3;

        ctx.fillStyle = 'rgba(8, 8, 9, 0.95)';
        ctx.strokeStyle = '#e84d1b';
        ctx.lineWidth = 1;

        const tooltipText = freqHz.toFixed(1) + ' Hz';
        const textWidth = ctx.measureText(tooltipText).width;

        ctx.beginPath();
        ctx.roundRect(mouseX + 12, mouseY - 28, textWidth + 16, 22, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#e84d1b';
        ctx.font = 'bold 11px "IBM Plex Mono", monospace';
        ctx.fillText(tooltipText, mouseX + 20, mouseY - 14);
      }

      animationId = requestAnimationFrame(draw);
    };

    // Event listeners
    freqSlider.addEventListener('input', function() {
      frequency = parseInt(this.value);
      freqValue.textContent = frequency + ' Hz';
    });

    ampSlider.addEventListener('input', function() {
      amplitude = parseInt(this.value);
      ampValue.textContent = amplitude + '%';
    });

    compSlider.addEventListener('input', function() {
      complexity = parseInt(this.value);
      compValue.textContent = complexity;
    });

    vizReset.addEventListener('click', function() {
      freqSlider.value = 5;
      ampSlider.value = 50;
      compSlider.value = 3;
      frequency = 5;
      amplitude = 50;
      complexity = 3;
      freqValue.textContent = '5 Hz';
      ampValue.textContent = '50%';
      compValue.textContent = '3';
    });

    vizCanvas.addEventListener('mousemove', function(e) {
      const rect = vizCanvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    vizCanvas.addEventListener('mouseleave', function() {
      mouseX = -1;
      mouseY = -1;
    });

    // Polyfill for roundRect
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

    resize();
    window.addEventListener('resize', resize);
    draw();
  };

  // ============================================
  // Background Grid System
  // ============================================
  const initBackgroundGrid = function() {
    const canvas = document.getElementById('grid-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let offset = 0;
    let animationId = null;

    const resize = function() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const draw = function() {
      offset = (offset + 0.1) % 40;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(232, 77, 27, 0.03)';
      ctx.lineWidth = 1;

      // Vertical lines with subtle movement
      for (let x = -offset; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return function cleanup() {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  };

  // ============================================
  // CTA Button Interactions
  // ============================================
  const initCTAButtons = function() {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        const text = this.textContent.trim();
        if (this.classList.contains('nav-cta') ||
            text.includes('Initialize') ||
            text.includes('Get Started') ||
            text.includes('Start')) {
          e.preventDefault();
          const target = document.getElementById('how-it-works');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  };

  // ============================================
  // Performance Monitoring (Dev only)
  // ============================================
  const initPerformanceMonitor = function() {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') return;

    const monitor = document.createElement('div');
    monitor.style.cssText = `
      position: fixed; bottom: 10px; right: 10px; z-index: 9999;
      background: rgba(8, 8, 9, 0.9); color: #e84d1b;
      padding: 8px 12px; border-radius: 4px;
      font-family: 'IBM Plex Mono', monospace; font-size: 11px;
      pointer-events: none; opacity: 0.5; transition: opacity 0.3s;
    `;
    monitor.textContent = 'FPS: --';
    document.body.appendChild(monitor);

    monitor.addEventListener('mouseenter', () => monitor.style.opacity = '1');
    monitor.addEventListener('mouseleave', () => monitor.style.opacity = '0.5');

    function updateFPS() {
      frameCount++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (now - lastTime));
        monitor.textContent = 'FPS: ' + fps;
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(updateFPS);
    }
    updateFPS();
  };

  // ============================================
  // Initialize All Systems
  // ============================================
  const init = function() {
    initNavigation();
    initScrollReveal();
    const heroCleanup = initHeroParticles();
    initSignalViz();
    const gridCleanup = initBackgroundGrid();
    initCTAButtons();
    initPerformanceMonitor();

    // Handle page visibility for performance
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        // Pause animations when tab is not visible
      } else {
        // Resume animations
      }
    });
  };

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();