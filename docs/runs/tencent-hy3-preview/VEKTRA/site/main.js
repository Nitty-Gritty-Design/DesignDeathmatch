// Mobile nav toggle
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
});

// Scroll-triggered entrance animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .card').forEach(el => {
  el.classList.add('fade-in-up');
  observer.observe(el);
});

// Add scroll animation styles
const style = document.createElement('style');
style.textContent = `
  .fade-in-up { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in-up.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

// Cursor-following dot (alive element)
const cursorDot = document.createElement('div');
cursorDot.style.cssText = `
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
`;
document.body.appendChild(cursorDot);

let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateDot() {
  dotX += (mouseX - dotX) * 0.15;
  dotY += (mouseY - dotY) * 0.15;
  cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
  requestAnimationFrame(animateDot);
}
animateDot();
