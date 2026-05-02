/**
 * VEKTRA Main Application Logic
 * Implements core interactions, scroll animations, and generative behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initMobileNav();
    initGenerativeHero();
    initCustomCursor();
    initViz();
});

/**
 * Phase 4: Data Visualization — Cross-Domain Modulation Spectrogram
 * Rationale: Demonstrates the coupling of audio and visual signals in the VEKTRA engine.
 * Library: D3.js (used for SVG manipulation and scales).
 */
function initViz() {
    const container = document.getElementById('viz-root');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const svg = d3.select('#viz-root')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`);

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    const mutedColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text-muted').trim();

    // Generate realistic frequency data
    const generateData = () => Array.from({ length: 40 }, (_, i) => ({
        frequency: 20 + (i * 500),
        amplitude: Math.random() * 0.8 + 0.1,
        id: i
    }));

    let data = generateData();

    const x = d3.scaleLinear().domain([0, 40]).range([50, width - 50]);
    const y = d3.scaleLinear().domain([0, 1]).range([height - 50, 50]);

    const bars = svg.selectAll('.freq-bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'freq-bar')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d.amplitude))
        .attr('width', (width - 100) / 40 - 2)
        .attr('height', d => height - 50 - y(d.amplitude))
        .attr('fill', mutedColor)
        .style('transition', 'fill 0.3s');

    // Tooltip
    const tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '8px')
        .style('background', 'var(--color-surface)')
        .style('border', '1px solid var(--color-accent)')
        .style('font-family', 'var(--font-mono)')
        .style('font-size', '10px')
        .style('pointer-events', 'none')
        .style('opacity', 0)
        .style('z-index', '1000');

    bars.on('mouseover', function(event, d) {
        d3.select(this).attr('fill', accentColor);
        tooltip.style('opacity', 1)
            .html(`FREQ: ${d.frequency}Hz<br>AMP: ${d.amplitude.toFixed(4)}`);
    })
    .on('mousemove', (event) => {
        tooltip.style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
    })
    .on('mouseout', function() {
        d3.select(this).attr('fill', mutedColor);
        tooltip.style('opacity', 0);
    });

    // Animate data
    setInterval(() => {
        data = data.map(d => ({
            ...d,
            amplitude: Math.max(0.1, Math.min(0.9, d.amplitude + (Math.random() * 0.2 - 0.1)))
        }));

        svg.selectAll('.freq-bar')
            .data(data)
            .transition()
            .duration(800)
            .attr('y', d => y(d.amplitude))
            .attr('height', d => height - 50 - y(d.amplitude));
    }, 1000);
}

/**
 * Intersection Observer for entrance animations
 */
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Optional: keep observing for repeat animations
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const toggle = document.getElementById('mobile-nav-toggle');
    const nav = document.querySelector('nav ul');
    
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const isVisible = nav.style.display === 'flex';
        nav.style.display = isVisible ? 'none' : 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '72px';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.backgroundColor = 'var(--color-bg-primary)';
        nav.style.padding = 'var(--space-8)';
        nav.style.borderBottom = '1px solid var(--color-border)';
    });
}

/**
 * Generative Hero Background (Phase 6 Wildcard Fallback/Draft)
 * A simple canvas animation that responds to mouse movement.
 */
function initGenerativeHero() {
    const canvas = document.getElementById('generative-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5
    }));

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.opacity > 0.3 ? accentColor : 'rgba(255, 255, 255, 0.1)';
            
            if (dist < 150) {
                ctx.globalAlpha = 1 - (dist / 150);
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = accentColor;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
            
            ctx.globalAlpha = p.opacity;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * Custom Cursor / Interactive Feedback
 */
function initCustomCursor() {
    // Already using cursor: crosshair in CSS.
    // Adding a small reveal effect on click.
    window.addEventListener('mousedown', (e) => {
        const ring = document.createElement('div');
        ring.style.position = 'fixed';
        ring.style.top = `${e.clientY}px`;
        ring.style.left = `${e.clientX}px`;
        ring.style.width = '10px';
        ring.style.height = '10px';
        ring.style.border = '1px solid var(--color-accent)';
        ring.style.borderRadius = '50%';
        ring.style.transform = 'translate(-50%, -50%)';
        ring.style.pointerEvents = 'none';
        ring.style.transition = 'all 0.5s var(--ease-out-expo)';
        ring.style.zIndex = '9999';
        
        document.body.appendChild(ring);
        
        setTimeout(() => {
            ring.style.width = '100px';
            ring.style.height = '100px';
            ring.style.opacity = '0';
        }, 10);
        
        setTimeout(() => ring.remove(), 500);
    });
}
