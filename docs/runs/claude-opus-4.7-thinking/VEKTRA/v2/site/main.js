/**
 * VEKTRA v2 — Site JavaScript
 * Enhanced: multi-layer generative hero, signal trail cursor, refined D3 viz,
 * smooth scroll nav, staggered reveals. No libraries except D3 (CDN).
 */
(function(){
'use strict';

// ── Utility ──
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

// ── Mobile nav ──
const hamburger=$('.nav__hamburger');
const navLinks=$('.nav__links');
if(hamburger){
  hamburger.addEventListener('click',()=>{hamburger.classList.toggle('active');navLinks.classList.toggle('open')});
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{hamburger.classList.remove('active');navLinks.classList.remove('open')}));
}

// ── Scroll: nav background + active link ──
let lastScroll=0;
const nav=$('.nav');
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  if(nav)nav.classList.toggle('scrolled',y>40);
  lastScroll=y;
},{passive:true});

// ── Hero entrance stagger ──
const heroEls=$$('.hero__label,.hero__headline,.hero__sub,.hero__cta-group');
heroEls.forEach((el,i)=>setTimeout(()=>el.classList.add('anim-in'),400+i*220));

// ── Scroll reveals with stagger ──
const reveals=$$('.reveal');
const revealObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObs.unobserve(e.target)}});
},{threshold:0.12,rootMargin:'0px 0px -60px 0px'});
reveals.forEach(el=>revealObs.observe(el));

// ── Signal dot + trail cursor ──
const isMobile='ontouchstart' in window;
if(!isMobile){
  const dot=document.createElement('div');dot.className='signal-dot';document.body.appendChild(dot);
  const TRAIL_COUNT=5;const trails=[];
  for(let i=0;i<TRAIL_COUNT;i++){const t=document.createElement('div');t.className='signal-trail';t.style.opacity=0.15-i*0.025;t.style.width=t.style.height=(3-i*0.4)+'px';document.body.appendChild(t);trails.push({el:t,x:0,y:0})}

  let mx=0,my=0,dx=0,dy=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});

  function animCursor(){
    dx+=(mx-dx)*0.15;dy+=(my-dy)*0.15;
    dot.style.transform=`translate(${dx-3}px,${dy-3}px)`;
    let px=dx,py=dy;
    trails.forEach((t,i)=>{
      t.x+=(px-t.x)*(0.08-i*0.012);t.y+=(py-t.y)*(0.08-i*0.012);
      t.el.style.transform=`translate(${t.x-1.5}px,${t.y-1.5}px)`;
      px=t.x;py=t.y;
    });
    requestAnimationFrame(animCursor);
  }
  animCursor();
}

// ── Hero generative background (v2: multi-layer) ──
const bgCanvas=document.getElementById('heroBg');
if(bgCanvas){
  const ctx=bgCanvas.getContext('2d');
  let w,h,time=0;
  const A={r:240,g:160,b:0};

  function noise(x,y){const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n)}
  function smooth(x,y){
    const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;
    const sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);
    return noise(ix,iy)+(noise(ix+1,iy)-noise(ix,iy))*sx+(noise(ix,iy+1)-noise(ix,iy))*sy+(noise(ix+1,iy+1)-noise(ix+1,iy)-noise(ix,iy+1)+noise(ix,iy))*sx*sy;
  }

  const LCOUNT=28;const lines=[];
  let hmx=0.5,hmy=0.5;
  const PCOUNT=35;const particles=[];

  function resize(){
    w=bgCanvas.width=bgCanvas.parentElement.offsetWidth;
    h=bgCanvas.height=bgCanvas.parentElement.offsetHeight;
    lines.length=0;particles.length=0;
    for(let i=0;i<LCOUNT;i++)lines.push({yr:i/LCOUNT,f1:0.001+Math.random()*0.004,f2:0.002+Math.random()*0.006,a1:10+Math.random()*25,a2:3+Math.random()*10,p1:Math.random()*6.28,p2:Math.random()*6.28,spd:0.12+Math.random()*0.5,alpha:0.012+Math.random()*0.035});
    for(let i=0;i<PCOUNT;i++)particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.2,vy:(Math.random()-0.5)*0.15,size:0.5+Math.random()*1.2,alpha:0.08+Math.random()*0.2,phase:Math.random()*6.28});
  }
  resize();
  window.addEventListener('resize',resize);
  bgCanvas.parentElement.addEventListener('mousemove',e=>{const r=bgCanvas.parentElement.getBoundingClientRect();hmx=(e.clientX-r.left)/w;hmy=(e.clientY-r.top)/h});

  function drawBg(){
    ctx.fillStyle='rgba(8,8,10,0.1)';ctx.fillRect(0,0,w,h);
    time+=0.007;

    // Signal waveforms
    for(const l of lines){
      ctx.beginPath();const by=l.yr*h;
      for(let x=0;x<=w;x+=4){
        const xr=x/w,dx=xr-hmx,dy=l.yr-hmy;
        const inf=Math.max(0,1-Math.sqrt(dx*dx+dy*dy)/0.35);
        const y=by+Math.sin(x*l.f1+time*l.spd+l.p1)*(l.a1+inf*30)+Math.sin(x*l.f2+time*l.spd*1.6+l.p2)*l.a2;
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle=`rgba(${A.r},${A.g},${A.b},${l.alpha})`;ctx.lineWidth=0.7;ctx.stroke();
    }

    // Particles
    for(const p of particles){
      const angle=smooth(p.x*0.003+time,p.y*0.003)*Math.PI*4;
      p.x+=Math.cos(angle)*0.3+p.vx;p.y+=Math.sin(angle)*0.2+p.vy;
      if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;
      const pulse=0.5+0.5*Math.sin(time*2+p.phase);
      ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,6.28);
      ctx.fillStyle=`rgba(${A.r},${A.g},${A.b},${p.alpha*pulse})`;ctx.fill();
    }

    // Mouse glow
    const gx=hmx*w,gy=hmy*h;
    const grad=ctx.createRadialGradient(gx,gy,0,gx,gy,180);
    grad.addColorStop(0,`rgba(${A.r},${A.g},${A.b},0.025)`);grad.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=grad;ctx.fillRect(gx-180,gy-180,360,360);

    requestAnimationFrame(drawBg);
  }
  ctx.fillStyle='#08080A';ctx.fillRect(0,0,w,h);
  drawBg();
}

// ── D3 Visualization: Signal Patch Graph ──
// Using D3.js for force-directed graph — the most authentic VEKTRA representation
const vizContainer=document.getElementById('vizContainer');
if(vizContainer&&typeof d3!=='undefined'){
  const width=vizContainer.offsetWidth,height=vizContainer.offsetHeight;
  const svg=d3.select(vizContainer).append('svg').attr('width',width).attr('height',height);

  // Gradient defs for links
  const defs=svg.append('defs');
  const linkGrad=defs.append('linearGradient').attr('id','linkGrad');
  linkGrad.append('stop').attr('offset','0%').attr('stop-color','#F0A000').attr('stop-opacity',0.3);
  linkGrad.append('stop').attr('offset','100%').attr('stop-color','#8E8C84').attr('stop-opacity',0.1);

  // Glow filter
  const glow=defs.append('filter').attr('id','glow');
  glow.append('feGaussianBlur').attr('stdDeviation','3').attr('result','blur');
  glow.append('feMerge').selectAll('feMergeNode').data(['blur','SourceGraphic']).join('feMergeNode').attr('in',d=>d);

  const nodes=[
    {id:'osc_1',label:'OSC.sine',group:'source',desc:'Sine oscillator · 220Hz · phase: 0°'},
    {id:'osc_2',label:'OSC.saw',group:'source',desc:'Sawtooth wave · 110Hz · harmonics: 32'},
    {id:'lfo',label:'LFO.tri',group:'mod',desc:'Triangle LFO · 0.25Hz · depth: 0.6'},
    {id:'noise',label:'NOISE.pink',group:'source',desc:'Pink noise · -12dB · spectral slope: -3dB/oct'},
    {id:'filter',label:'FILT.svf',group:'process',desc:'State-variable filter · cutoff: 800Hz · Q: 4.2'},
    {id:'env',label:'ENV.adsr',group:'mod',desc:'Envelope · A:12ms D:200ms S:0.6 R:400ms'},
    {id:'delay',label:'DLY.sync',group:'process',desc:'Tempo-synced delay · ratio: 3/8 · feedback: 0.45'},
    {id:'reverb',label:'REV.plate',group:'process',desc:'Plate reverb · decay: 3.8s · damping: 0.6'},
    {id:'comp',label:'COMP',group:'process',desc:'Compressor · threshold: -18dB · ratio: 4:1'},
    {id:'gain',label:'GAIN.m',group:'output',desc:'Master gain · -6dB · metering: RMS+peak'},
    {id:'out',label:'OUT.st',group:'output',desc:'Stereo output bus · 48kHz/32bit'},
    {id:'scope',label:'SCOPE',group:'viz',desc:'Oscilloscope · buffer: 1024 · trigger: rising edge'},
    {id:'fft',label:'FFT.2048',group:'viz',desc:'Spectral analyzer · 2048 bins · window: Hann'},
    {id:'xy',label:'XY.pad',group:'control',desc:'XY controller · mapped: cutoff × resonance'},
    {id:'midi',label:'MIDI.cc',group:'control',desc:'MIDI CC · ch:1 · cc:74 (brightness)'},
    {id:'seq',label:'SEQ.eu',group:'control',desc:'Euclidean sequencer · steps:16 · pulses:5'},
  ];
  const links=[
    {source:'osc_1',target:'filter'},{source:'osc_2',target:'filter'},
    {source:'noise',target:'filter'},{source:'lfo',target:'filter'},
    {source:'filter',target:'delay'},{source:'filter',target:'comp'},
    {source:'env',target:'comp'},{source:'delay',target:'reverb'},
    {source:'reverb',target:'gain'},{source:'comp',target:'gain'},
    {source:'gain',target:'out'},{source:'gain',target:'scope'},
    {source:'gain',target:'fft'},{source:'xy',target:'lfo'},
    {source:'midi',target:'osc_1'},{source:'midi',target:'env'},
    {source:'seq',target:'osc_2'},{source:'seq',target:'env'},
  ];
  const gColors={source:'#F0A000',mod:'#8A5C00',process:'#8E8C84',output:'#EDEBE6',viz:'#4E4C46',control:'#34C06A'};

  const sim=d3.forceSimulation(nodes)
    .force('link',d3.forceLink(links).id(d=>d.id).distance(100))
    .force('charge',d3.forceManyBody().strength(-320))
    .force('center',d3.forceCenter(width/2,height/2))
    .force('collision',d3.forceCollide(28));

  // Animated signal flow on links
  const link=svg.append('g').selectAll('line').data(links).join('line')
    .attr('stroke','url(#linkGrad)').attr('stroke-width',1.5);

  // Signal flow dots on links
  const flowDots=svg.append('g').selectAll('circle').data(links).join('circle')
    .attr('r',1.5).attr('fill','#F0A000').attr('opacity',0.4);

  const node=svg.append('g').selectAll('g').data(nodes).join('g')
    .call(d3.drag().on('start',(e)=>{if(!e.active)sim.alphaTarget(0.3).restart();e.subject.fx=e.subject.x;e.subject.fy=e.subject.y})
    .on('drag',(e)=>{e.subject.fx=e.x;e.subject.fy=e.y})
    .on('end',(e)=>{if(!e.active)sim.alphaTarget(0);e.subject.fx=null;e.subject.fy=null}));

  // Node glow
  node.append('circle').attr('r',12).attr('fill',d=>gColors[d.group]).attr('opacity',0.06).attr('filter','url(#glow)');
  // Node solid
  node.append('circle').attr('r',5).attr('fill',d=>gColors[d.group]).attr('stroke','#08080A').attr('stroke-width',2).style('cursor','grab');
  // Labels
  node.append('text').text(d=>d.label).attr('dx',14).attr('dy',4)
    .attr('font-family',"'JetBrains Mono',monospace").attr('font-size','9px').attr('fill','#8E8C84').attr('letter-spacing','0.05em');

  // Tooltip
  const tip=document.createElement('div');tip.className='tooltip';tip.style.display='none';vizContainer.appendChild(tip);
  node.selectAll('circle').filter((d,i)=>i%2===1)
    .on('mouseenter',(e,d)=>{const r=vizContainer.getBoundingClientRect();tip.textContent=d.desc;tip.style.display='block';tip.style.left=(e.clientX-r.left+16)+'px';tip.style.top=(e.clientY-r.top-12)+'px';d3.select(e.target).transition().duration(180).attr('r',8)})
    .on('mouseleave',(e)=>{tip.style.display='none';d3.select(e.target).transition().duration(180).attr('r',5)});

  let flowTime=0;
  sim.on('tick',()=>{
    link.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
    node.attr('transform',d=>`translate(${d.x},${d.y})`);
    // Animate flow dots along links
    flowTime+=0.008;
    flowDots.each(function(d){
      const t=(flowTime+links.indexOf(d)*0.15)%1;
      const x=d.source.x+(d.target.x-d.source.x)*t;
      const y=d.source.y+(d.target.y-d.source.y)*t;
      d3.select(this).attr('cx',x).attr('cy',y);
    });
  });
}

})();
