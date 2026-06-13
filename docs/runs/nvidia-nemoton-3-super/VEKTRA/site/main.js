// VEKTRA Main JavaScript
// Mobile nav toggle, scroll-triggered animations, and mouse-responsive elements

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Scroll-triggered entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections and features for animation
    const elementsToAnimate = document.querySelectorAll('section, .feature, .user');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class when in view
    document.addEventListener('scroll', function() {
        const animatedElements = document.querySelectorAll('.animate-in');
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
    
    // Mouse-responsive generative background in hero section
    const heroBackground = document.getElementById('generative-background');
    if (heroBackground) {
        // Create a simple particle system that responds to mouse
        let particles = [];
        const particleCount = 30;
        
        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * heroBackground.clientWidth,
                y: Math.random() * heroBackground.clientHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                life: Math.random() * 100
            });
        }
        
        // Mouse position
        let mouseX = 0;
        let mouseY = 0;
        let mouseIsMoving = false;
        
        // Update mouse position
        heroBackground.addEventListener('mousemove', (e) => {
            const rect = heroBackground.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            mouseIsMoving = true;
        });
        
        // Reset mouse movement flag
        setInterval(() => {
            mouseIsMoving = false;
        }, 100);
        
        // Animation loop
        function animateParticles() {
            if (!heroBackground) return;
            
            // Clear background
            heroBackground.innerHTML = '';
            
            // Create canvas for drawing
            const canvas = document.createElement('canvas');
            canvas.width = heroBackground.clientWidth;
            canvas.height = heroBackground.clientHeight;
            heroBackground.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            
            // Update and draw particles
            particles.forEach(p => {
                // Apply mouse attraction/repulsion
                if (mouseIsMoving) {
                    const dx = mouseX - p.x;
                    const dy = mouseY - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const force = Math.max(0.1, Math.min(2, 100 / (distance * distance)));
                    
                    p.vx += (dx / distance) * force * 0.01;
                    p.vy += (dy / distance) * force * 0.01;
                }
                
                // Update position
                p.x += p.vx;
                p.y += p.vy;
                p.life--;
                
                // Boundary wrapping
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                
                // Regenerate if dead
                if (p.life <= 0) {
                    p.x = Math.random() * canvas.width;
                    p.y = Math.random() * canvas.height;
                    p.vx = (Math.random() - 0.5) * 0.5;
                    p.vy = (Math.random() - 0.5) * 0.5;
                    p.size = Math.random() * 2 + 1;
                    p.life = Math.random() * 100;
                }
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                
                // Color based on life and mouse proximity
                const lifeRatio = p.life / 100;
                const mouseDist = Math.sqrt((mouseX - p.x)**2 + (mouseY - p.y)**2);
                const mouseEffect = Math.max(0, 1 - mouseDist / 150);
                
                const alpha = lifeRatio * 0.6 + mouseEffect * 0.4;
                ctx.fillStyle = `rgba(0, 245, 255, ${alpha})`;
                ctx.fill();
                
                // Draw connection lines between nearby particles
                particles.forEach(other => {
                    if (other === p) return;
                    const dx = p.x - other.x;
                    const dy = p.y - other.y;
                    const distance = Math.sqrt(dx*dx + dy*dy);
                    
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(other.x, other.y);
                        const lineAlpha = (1 - distance/120) * lifeRatio * 0.3;
                        ctx.strokeStyle = `rgba(0, 245, 255, ${lineAlpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        // Start animation
        requestAnimationFrame(animateParticles);
        
        // Handle resize
        window.addEventListener('resize', () => {
            if (heroBackground) {
                const canvas = heroBackground.querySelector('canvas');
                if (canvas) {
                    canvas.width = heroBackground.clientWidth;
                    canvas.height = heroBackground.clientHeight;
                }
            }
        });
    }
    
    // Add cursor styling for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .feature, .user, .viz-link');
    interactiveElements.forEach(el => {
        el.style.cursor = 'crosshair';
    });
});