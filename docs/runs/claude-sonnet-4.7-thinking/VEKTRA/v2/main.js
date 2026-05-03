/**
 * VEKTRA v2 — main.js
 * Dual-layer cursor · GSAP-quality easing in vanilla · 
 * Magnetic buttons · Number counters · Scroll reveal
 */
(function(){
'use strict';

/* ── Cursor ──────────────────────────────────────────────── */
const dot  = document.createElement('div'); dot.className  = 'cursor-dot';
const ring = document.createElement('div'); ring.className = 'cursor-ring';
document.body.append(dot, ring);

let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });

(function cursorLoop(){
  // dot follows instantly
  dot.style.left = mx+'px';  dot.style.top = my+'px';
  // ring lags — lerp
  rx += (mx-rx)*0.14; ry += (my-ry)*0.14;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(cursorLoop);
})();

const hoverEls = document.querySelectorAll('a,button,[data-hover]');
hoverEls.forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
  el.addEventListener('mousedown', ()=>ring.classList.add('click'));
  el.addEventListener('mouseup',   ()=>ring.classList.remove('click'));
});

/* ── Nav ─────────────────────────────────────────────────── */
const nav  = document.getElementById('nav');
const ham  = document.getElementById('hamburger');
const mob  = document.getElementById('mobile-menu');

window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled', window.scrollY>24);
},{passive:true});

ham.addEventListener('click',()=>{
  const o = ham.classList.toggle('open');
  mob.classList.toggle('open',o);
  ham.setAttribute('aria-expanded', String(o));
});

mob.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',()=>{ ham.classList.remove('open'); mob.classList.remove('open'); });
});

/* ── Scroll reveal ───────────────────────────────────────── */
const revObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
},{ threshold:0.1, rootMargin:'0px 0px -40px 0px' });

document.querySelectorAll('.reveal,.reveal--left').forEach(el=>revObs.observe(el));

// Hero elements — trigger on load
setTimeout(()=>{
  document.querySelectorAll('[data-hero]').forEach(el=>el.classList.add('visible'));
},100);

/* ── Number counters ─────────────────────────────────────── */
function animateCount(el){
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix||'';
  const dur = 1800;
  const start = performance.now();
  function step(now){
    const t = Math.min((now-start)/dur, 1);
    // ease out expo
    const v = t===1 ? 1 : 1-Math.pow(2,-10*t);
    const cur = target*v;
    el.textContent = (Number.isInteger(target)?Math.round(cur):cur.toFixed(1)) + suffix;
    if(t<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const countObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ animateCount(e.target); countObs.unobserve(e.target); }
  });
},{threshold:0.5});
document.querySelectorAll('[data-count]').forEach(el=>countObs.observe(el));

/* ── Magnetic buttons ────────────────────────────────────── */
document.querySelectorAll('.btn--primary').forEach(btn=>{
  btn.addEventListener('mousemove', e=>{
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - r.left - r.width/2;
    const dy = e.clientY - r.top  - r.height/2;
    btn.style.transform = `translate(${dx*0.22}px,${dy*0.22}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave',()=>{ btn.style.transform=''; });
});

/* ── Hero canvas background (fallback if WebGL iframe fails) ─
   The hero's iframe loads background.html. If it fails, the 
   overlay gradient provides adequate fallback. No extra code needed. */

/* ── Stagger how__item reveals ───────────────────────────── */
document.querySelectorAll('.how__item').forEach((el,i)=>{
  el.style.transitionDelay = (i*90)+'ms';
  el.classList.add('reveal');
  revObs.observe(el);
});

/* ── Parallax hero headline ──────────────────────────────── */
const heroHeadline = document.querySelector('.hero__headline');
if(heroHeadline){
  window.addEventListener('scroll',()=>{
    const y = window.scrollY;
    heroHeadline.style.transform = `translateY(${y*0.18}px)`;
    heroHeadline.style.opacity = Math.max(0, 1 - y/400);
  },{passive:true});
}

})();
