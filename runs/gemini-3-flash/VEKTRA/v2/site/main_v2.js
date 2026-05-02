/**
 * VEKTRA V2 Main Application Logic
 * Implements high-end WebGL background, GSAP animations, and custom interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursorV2();
    initThreeJSBackground();
    initGSAPAnimations();
    initSignalVizV2();
});

/**
 * Custom Cursor V2
 * Smooth following cursor with interactive states.
 */
function initCustomCursorV2() {
    const cursor = document.getElementById('cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animate = () => {
        // Smooth interpolation (lerp)
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animate);
    };
    animate();

    // Hover states
    const interactives = document.querySelectorAll('a, button, .btn-v2, .feature-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

/**
 * Three.js WebGL Background
 * A 3D field of points forming a generative wave mesh.
 */
function initThreeJSBackground() {
    const container = document.getElementById('webgl-bg');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);
    const accentColor = new THREE.Color(0xFF3300);

    for(let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: accentColor,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 10;

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const animate = (time) => {
        const t = time * 0.001;
        
        // Gentle rotation
        points.rotation.y = t * 0.05;
        
        // Mouse influence
        points.position.x += (mouseX * 2 - points.position.x) * 0.02;
        points.position.y += (-mouseY * 2 - points.position.y) * 0.02;

        // Animate individual points (wave effect)
        const posAttr = geometry.attributes.position;
        for(let i = 0; i < particlesCount; i++) {
            const x = posAttr.getX(i);
            const z = posAttr.getZ(i);
            const y = Math.sin(x * 0.5 + t) * 0.5 + Math.cos(z * 0.3 + t) * 0.5;
            posAttr.setY(i, y + (Math.random() - 0.5) * 0.02);
        }
        posAttr.needsUpdate = true;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate(0);
}

/**
 * GSAP Entrance Animations
 * High-end reveals using ScrollTrigger.
 */
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const reveals = document.querySelectorAll('.reveal-v2');
    
    reveals.forEach((el, i) => {
        gsap.fromTo(el, 
            { 
                opacity: 0, 
                y: 50,
                clipPath: 'inset(100% 0% 0% 0%)'
            }, 
            {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: "power4.out",
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
}

/**
 * Signal Visualization V2 (The Monitor)
 * A sophisticated Canvas-based real-time multi-dimensional signal plot.
 */
function initSignalVizV2() {
    const container = document.getElementById('viz-container-v2');
    if (!container) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    const resize = () => {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const signalCount = 5;
    const points = Array.from({ length: 100 }, (_, i) => i);
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();

    const animate = (time) => {
        const t = time * 0.002;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Grid
        ctx.strokeStyle = '#1A1A1A';
        ctx.lineWidth = 1;
        for(let x = 0; x < canvas.width; x += 50) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for(let y = 0; y < canvas.height; y += 50) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // Draw Signals
        for(let s = 0; s < signalCount; s++) {
            ctx.beginPath();
            ctx.strokeStyle = s === 0 ? accentColor : `rgba(255, 255, 255, ${0.1 - s * 0.02})`;
            ctx.lineWidth = s === 0 ? 2 : 1;

            points.forEach((p, i) => {
                const x = (p / 100) * canvas.width;
                const phase = t + (s * 0.5);
                const freq = 0.05 + s * 0.02;
                const amp = 100 / (s + 1);
                const y = canvas.height / 2 + Math.sin(p * freq + phase) * amp + Math.cos(p * 0.1 - phase * 2) * 20;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);

                // Add data points on the primary signal
                if (s === 0 && i % 10 === 0) {
                    ctx.fillStyle = accentColor;
                    ctx.fillRect(x - 2, y - 2, 4, 4);
                }
            });
            ctx.stroke();
        }

        requestAnimationFrame(animate);
    };

    animate(0);
}
