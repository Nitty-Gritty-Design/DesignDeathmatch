/* VEKTRA v2 — site/viz_v2.js
   Premium signal visualization: waveform + spectrum with smooth interpolation,
   interactive tooltips, spring-smoothed controls.
*/

(() => {
  'use strict';

  const waveCanvas = document.getElementById('waveform');
  const specCanvas = document.getElementById('spectrum');
  const wctx = waveCanvas.getContext('2d');
  const sctx = specCanvas.getContext('2d');
  const tooltip = document.getElementById('tooltip');
  const timeLabel = document.getElementById('waveform-time');
  const peakLabel = document.getElementById('spectrum-peak');
  const readout = document.getElementById('param-readout');
  const sInput = document.getElementById('sensitivity');
  const vInput = document.getElementById('speed');
  const dInput = document.getElementById('density');

  let W, H, Sw, Sh;
  let s = 1, v = 1, d = 3;
  let frame = 0;
  const BIN_COUNT = 80;
  const bins = new Float32Array(BIN_COUNT).fill(0);
  const targets = new Float32Array(BIN_COUNT).fill(0);

  function resize() {
    const wr = waveCanvas.parentElement.getBoundingClientRect();
    const sr = specCanvas.parentElement.getBoundingClientRect();
    W = Math.floor(wr.width); H = 240;
    Sw = Math.floor(sr.width); Sh = 240;
    waveCanvas.width = W; waveCanvas.height = H;
    specCanvas.width = Sw; specCanvas.height = Sh;
  }
  window.addEventListener('resize', resize);
  resize();

  sInput.addEventListener('input', e => { s = +e.target.value; updateReadout(); });
  vInput.addEventListener('input', e => { v = +e.target.value; updateReadout(); });
  dInput.addEventListener('input', e => { d = +e.target.value; updateReadout(); });

  function updateReadout() {
    readout.textContent = `s:${s.toFixed(1)} · v:${v.toFixed(1)} · d:${d}`;
  }

  function generate(x, t) {
    const base = 110 * d;
    let sample = 0;
    sample += Math.sin((x / W) * Math.PI * 2 + t * v * 2.3) * 0.4;
    sample += Math.sin((x / W) * Math.PI * 4.1 + t * v * 4.7) * 0.28;
    sample += Math.sin((x / W) * Math.PI * 6.3 + t * v * 7.2) * 0.2;
    sample += Math.sin((x / W) * Math.PI * 9.7 + t * v * 11.3) * 0.12;
    sample += (Math.random() - 0.5) * 0.04;
    sample += Math.sin(t * v * 0.9) * Math.sin((x / W) * Math.PI * 14) * 0.08;
    return sample * s;
  }

  function updateTargets(sample) {
    for (let i = 0; i < BIN_COUNT; i++) {
      const freq = 20 + (i / BIN_COUNT) * 12000;
      const proximity = 1 - Math.abs(freq - (80 + d * 200 + Math.sin(frame * 0.02 + i) * 400)) / 2000;
      targets[i] = Math.abs(sample) * (0.3 + 0.7 * Math.random()) * VEKTRA.clamp(proximity, 0, 1);
    }
  }

  function draw(t) {
    frame++;

    // Waveform
    wctx.fillStyle = '#161820';
    wctx.fillRect(0, 0, W, H);

    wctx.strokeStyle = '#25282E';
    wctx.lineWidth = 1;
    wctx.beginPath(); wctx.moveTo(0, H / 2); wctx.lineTo(W, H / 2); wctx.stroke();

    // Glow
    wctx.strokeStyle = 'rgba(255, 92, 54, 0.15)';
    wctx.lineWidth = 4;
    wctx.beginPath();
    for (let x = 0; x <= W; x += 2) {
      const y = H / 2 + generate(x, t) * (H / 2 - 18);
      x === 0 ? wctx.moveTo(x, y) : wctx.lineTo(x, y);
      updateTargets(y - H / 2);
    }
    wctx.stroke();

    // Core
    wctx.strokeStyle = '#FF5C36';
    wctx.lineWidth = 1.5;
    wctx.beginPath();
    for (let x = 0; x <= W; x += 2) {
      const y = H / 2 + generate(x, t) * (H / 2 - 18);
      x === 0 ? wctx.moveTo(x, y) : wctx.lineTo(x, y);
    }
    wctx.stroke();

    if (timeLabel) timeLabel.textContent = `t = ${(t / 1000).toFixed(3)}s`;

    // Spectrum
    sctx.fillStyle = '#161820';
    sctx.fillRect(0, 0, Sw, Sh);

    const barW = Sw / BIN_COUNT;
    let peakVal = 0, peakIdx = 0;

    for (let i = 0; i < BIN_COUNT; i++) {
      bins[i] += (targets[i] - bins[i]) * 0.14;
      const h = Math.max(1, bins[i] * (Sh - 24));
      if (bins[i] > peakVal) { peakVal = bins[i]; peakIdx = i; }
      const isAccent = i < 4 || (i > BIN_COUNT * 0.55 && i < BIN_COUNT * 0.78);
      sctx.fillStyle = isAccent ? 'rgba(255, 92, 54, 0.85)' : 'rgba(160, 157, 150, 0.55)';
      sctx.fillRect(i * barW + (barW < 2 ? 0 : 0.5), Sh - h, barW - (barW < 2 ? 0 : 1), h);
    }

    if (peakLabel) {
      peakLabel.textContent = `peak: ${Math.round(20 + (peakIdx / BIN_COUNT) * 12000)} Hz`;
    }

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  // Tooltip
  [waveCanvas, specCanvas].forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const fx = (x / r.width * 100).toFixed(1);
      const fy = ((1 - y / r.height) * 100).toFixed(0);
      tooltip.style.display = 'block';
      tooltip.style.left = `${e.pageX + 14}px`;
      tooltip.style.top = `${e.pageY + 14}px`;
      if (c === waveCanvas) {
        tooltip.innerHTML = `<span class="mono-label">x: ${fx}% · amp: ${fy}%</span>`;
      } else {
        tooltip.innerHTML = `<span class="mono-label">${Math.round(20 + (x / r.width) * 12000)} Hz · amp: ${fy}%</span>`;
      }
    });
    c.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
  });
})();
