// VEKTRA v2 Main JS — Premium Interactions
// No libraries, vanilla JS only, optimized performance

'use strict';

// --- Mobile Nav Toggle ---
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    // Animate hamburger spans
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = isActive ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = isActive ? '0' : '1';
    spans[2].style.transform = isActive ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
}

// --- Scroll-Triggered Entrance Animations ---
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target); // Animate once
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section, .card').forEach(el => {
  el.classList.add('fade-in-up');
  scrollObserver.observe(el);
});

// --- Premium Cursor-Following Dot ---
const cursorDot = document.getElementById('cursorDot');
if (cursorDot) {
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  const ease = 0.12; // Slower, smoother follow

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    dotX += (mouseX - dotX) * ease;
    dotY += (mouseY - dotY) * ease;
    cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px) scale(${dotX === mouseX ? 0.8 : 1})`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Click effect
  document.addEventListener('click', () => {
    cursorDot.style.transform += ' scale(1.5)';
    setTimeout(() => { cursorDot.style.transform = cursorDot.style.transform.replace(' scale(1.5)', ''); }, 100);
  });
}

// --- Generative Hero Background (Embedded from v2/brand/background.html) ---
const heroBg = document.getElementById('hero-bg');
if (heroBg) {
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'heroCanvas';
  canvas.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; z-index:0;';
  heroBg.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let mouseX = 0, mouseY = 0;
  const particles = [];
  const PARTICLE_COUNT = 120; // Higher density for premium feel

  function resizeCanvas() {
    canvas.width = heroBg.offsetWidth;
    canvas.height = heroBg.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  document.addEventListener('mousemove', (e) => {
    const rect = heroBg.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.oscillation = Math.random() * Math.PI * 2;
      this.oscillationSpeed = Math.random() * 0.015 + 0.008;
      this.hue = 185 + Math.random() * 10; // Accent hue range
    }
    update() {
      this.oscillation += this.oscillationSpeed;
      this.y += Math.sin(this.oscillation) * 0.4;
      this.x += this.speedX;
      // Mouse repulsion (premium, stronger)
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 2;
        this.x += (dx / dist) * force;
        this.y += (dy / dist) * force;
      }
      // Wrap edges
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${0.5 + Math.sin(this.oscillation) * 0.2})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Init particles
  for (let i=0; i<PARTICLE_COUNT; i++) particles.push(new Particle());

  // Draw connections
  function drawConnections() {
    for (let i=0; i<particles.length; i++) {
      for (let j=i+1; j<particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 180) {
          ctx.strokeStyle = `rgba(0, 236, 255, ${0.15 * (1 - dist/180)})`;
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateBg() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateBg);
  }
  animateBg();
}
