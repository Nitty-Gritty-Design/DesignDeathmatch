(function () {
  'use strict';

  /* VEKTRA — site/viz.js
     Simulated patch signal analysis:
       Granular.scatter(3) → Resonant.lp(1200) → Spectral.analyze
     Vanilla Canvas. No heavy library needed for 2D waveform/spectrum.
  */

  const waveformCanvas = document.getElementById('waveform');
  const spectrumCanvas = document.getElementById('spectrum');
  const wctx = waveformCanvas.getContext('2d');
  const sctx = spectrumCanvas.getContext('2d');
  const tooltip = document.getElementById('tooltip');
  const timeLabel = document.getElementById('waveform-time');
  const peakLabel = document.getElementById('spectrum-peak');
  const readout = document.getElementById('param-readout');
  const sensitivityInput = document.getElementById('sensitivity');
  const speedInput = document.getElementById('speed');
  const densityInput = document.getElementById('density');

  let W, H, Sw, Sh;
  let sensitivity = 1;
  let speed = 1;
  let density = 3;
  let time = 0;
  let frame = 0;

  function resize() {
    const wRect = waveformCanvas.parentElement.getBoundingClientRect();
    const sRect = spectrumCanvas.parentElement.getBoundingClientRect();
    W = Math.floor(wRect.width);
    H = 220;
    Sw = Math.floor(sRect.width);
    Sh = 220;
    waveformCanvas.width = W;
    waveformCanvas.height = H;
    spectrumCanvas.width = Sw;
    spectrumCanvas.height = Sh;
  }
  window.addEventListener('resize', resize);
  resize();

  sensitivityInput.addEventListener('input', e => {
    sensitivity = parseFloat(e.target.value);
    readout.textContent = `s:${sensitivity.toFixed(1)} · v:${speed.toFixed(1)} · d:${density}`;
  });
  speedInput.addEventListener('input', e => {
    speed = parseFloat(e.target.value);
    readout.textContent = `s:${sensitivity.toFixed(1)} · v:${speed.toFixed(1)} · d:${density}`;
  });
  densityInput.addEventListener('input', e => {
    density = parseInt(e.target.value, 10);
    readout.textContent = `s:${sensitivity.toFixed(1)} · v:${speed.toFixed(1)} · d:${density}`;
  });

  // FFT-style spectrum bins (simulated: 64 bins from 20Hz to 12kHz)
  const BIN_COUNT = 64;
  const bins = new Float32Array(BIN_COUNT).fill(0);

  function generateSample(x, t) {
    // Simulated "Granular.scatter" output: layered harmonics + noise
    const baseFreq = 110 * density;
    const amp = sensitivity * 0.9;
    const spd = speed;
    let s = Math.sin((x / W) * Math.PI * 2 + t * spd * 2.8) * 0.5;
    s += Math.sin((x / W) * Math.PI * 4 + t * spd * 5.1) * 0.3;
    s += Math.sin((x / W) * Math.PI * 6.3 + t * spd * 8.4) * 0.2;
    s += (Math.random() - 0.5) * 0.08;
    s += Math.sin(t * spd * 1.2) * Math.sin((x / W) * Math.PI * 12) * 0.15;
    return s * amp;
  }

  function updateSpectrum(sample) {
    // Drift bins toward target values
    for (let i = 0; i < BIN_COUNT; i++) {
      const freq = 20 + (i / BIN_COUNT) * 12000;
      const target = Math.abs(sample) * (0.4 + 0.6 * Math.random()) * (1 - i / BIN_COUNT * 0.7);
      bins[i] += (target - bins[i]) * 0.18;
    }
  }

  function draw(t) {
    time = t;
    frame++;

    // ---- Waveform ----
    wctx.fillStyle = '#1A1918';
    wctx.fillRect(0, 0, W, H);

    wctx.strokeStyle = '#2A2724';
    wctx.lineWidth = 1;
    wctx.beginPath();
    wctx.moveTo(0, H / 2);
    wctx.lineTo(W, H / 2);
    wctx.stroke();

    wctx.strokeStyle = '#FF4D2A';
    wctx.lineWidth = 1.6;
    wctx.beginPath();
    for (let x = 0; x <= W; x++) {
      const y = H / 2 + generateSample(x, t) * (H / 2 - 16);
      if (x === 0) wctx.moveTo(x, y); else wctx.lineTo(x, y);
      updateSpectrum(y - H / 2);
    }
    wctx.stroke();

    // Glow pass
    wctx.strokeStyle = 'rgba(255, 77, 42, 0.18)';
    wctx.lineWidth = 4;
    wctx.beginPath();
    for (let x = 0; x <= W; x++) {
      const y = H / 2 + generateSample(x, t) * (H / 2 - 16);
      if (x === 0) wctx.moveTo(x, y); else wctx.lineTo(x, y);
    }
    wctx.stroke();

    if (timeLabel) timeLabel.textContent = `t = ${(t / 1000).toFixed(3)}s`;

    // ---- Spectrum ----
    sctx.fillStyle = '#1A1918';
    sctx.fillRect(0, 0, Sw, Sh);

    const barW = Sw / BIN_COUNT;
    let peakVal = 0;
    let peakIdx = 0;

    for (let i = 0; i < BIN_COUNT; i++) {
      const h = Math.max(1, bins[i] * (Sh - 20));
      if (bins[i] > peakVal) { peakVal = bins[i]; peakIdx = i; }
      const freq = 20 + (i / BIN_COUNT) * 12000;
      const isAccent = i < 3 || (i > BIN_COUNT * 0.6 && i < BIN_COUNT * 0.8);
      sctx.fillStyle = isAccent ? '#FF4D2A' : 'rgba(160, 157, 150, 0.7)';
      sctx.fillRect(i * barW + 0.5, Sh - h, barW - 1, h);
    }

    if (peakLabel) {
      const peakFreq = Math.round(20 + (peakIdx / BIN_COUNT) * 12000);
      peakLabel.textContent = `peak: ${peakFreq} Hz`;
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);

  // --- Tooltip on hover (frequency / amplitude readout) ---
  waveHover(waveformCanvas, 'waveform');
  waveHover(spectrumCanvas, 'spectrum');

  function waveHover(canvas, kind) {
    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const fx = ((x / rect.width) * 100).toFixed(1);
      const fy = ((1 - y / rect.height) * 100).toFixed(0);
      tooltip.style.display = 'block';
      tooltip.style.left = `${e.pageX + 12}px`;
      tooltip.style.top = `${e.pageY + 12}px`;
      if (kind === 'waveform') {
        tooltip.innerHTML = `<span class="mono-label">x: ${fx}% • y: ${fy}%</span>`;
      } else {
        const freq = Math.round(20 + (x / rect.width) * 12000);
        tooltip.innerHTML = `<span class="mono-label">${freq} Hz • amp: ${fy}%</span>`;
      }
    });
    canvas.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
  }

  // --- Tooltip styling (inline) ---
  const ttStyle = document.createElement('style');
  ttStyle.textContent = `
    #tooltip {
      position: fixed;
      pointer-events: none;
      background: #0D0C0B;
      border: 1px solid #FF4D2A;
      padding: 6px 10px;
      z-index: 200;
      font-family: var(--font-mono);
      font-size: 11px;
      color: #F2F0EB;
      letter-spacing: 0.06em;
    }
  `;
  document.head.appendChild(ttStyle);
})();
