// ═══════════════════════════════════════════════════════════════════
// VEKTRA v2 — Signal Laboratory
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // ── Frequency Spectrum ──
  (function () {
    var canvas = document.getElementById('specCanvas');
    var ctx = canvas.getContext('2d');
    var rangeSlider = document.getElementById('rangeSlider');
    var qSlider = document.getElementById('qSlider');
    var tooltip = document.getElementById('specTooltip');

    var bins = [
      { label: '20', freq: 20, value: 0.08 },{ label: '31', freq: 31, value: 0.13 },
      { label: '40', freq: 40, value: 0.20 }, { label: '50', freq: 50, value: 0.29 },
      { label: '63', freq: 63, value: 0.37 }, { label: '80', freq: 80, value: 0.50 },
      { label: '100', freq: 100, value: 0.33 },{ label: '125', freq: 125, value: 0.25 },
      { label: '160', freq: 160, value: 0.62 },{ label: '200', freq: 200, value: 0.73 },
      { label: '250', freq: 250, value: 0.43 },{ label: '315', freq: 315, value: 0.30 },
      { label: '400', freq: 400, value: 0.81 },{ label: '500', freq: 500, value: 0.89 },
      { label: '630', freq: 630, value: 0.55 },{ label: '800', freq: 800, value: 0.41 },
      { label: '1k', freq: 1000, value: 0.77 },{ label: '1.2k', freq: 1250, value: 0.51 },
      { label: '1.6k', freq: 1600, value: 0.35 },{ label: '2k', freq: 2000, value: 0.27 },
      { label: '2.5k', freq: 2500, value: 0.53 },{ label: '3.1k', freq: 3150, value: 0.66 },
      { label: '4k', freq: 4000, value: 0.42 },  { label: '5k', freq: 5000, value: 0.29 },
      { label: '6.3k', freq: 6300, value: 0.20 },{ label: '8k', freq: 8000, value: 0.32 },
      { label: '10k', freq: 10000, value: 0.38 },{ label: '12k', freq: 12500, value: 0.18 },
      { label: '16k', freq: 16000, value: 0.11 },{ label: '20k', freq: 20000, value: 0.05 }
    ];
    var t = 0;
    var hoverIdx = -1;

    function drawSpec() {
      var w = canvas.width, h = canvas.height;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      var range = parseInt(rangeSlider.value) / 100;
      var q = parseInt(qSlider.value) / 100;
      t += 0.018;

      var pad = 40, barW = (w - pad * 2) / bins.length, maxH = h - pad * 2;

      for (var i = 0; i < bins.length; i++) {
        var val = bins[i].value * range;
        val += Math.sin(t * 2.5 + i * 0.35) * q * 0.08;
        val = Math.max(0, Math.min(1, val));

        var barH = val * maxH;
        var x = pad + i * barW, y = h - pad - barH;
        var bw = barW - 1.5;

        var grad = ctx.createLinearGradient(x, y, x, h - pad);
        grad.addColorStop(0, 'rgba(200,117,30,' + (0.7 + val * 0.3) + ')');
        grad.addColorStop(1, 'rgba(200,117,30,0.08)');
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, bw, barH);

        if (i % 5 === 0) {
          ctx.fillStyle = '#4A443E'; ctx.font = '8px "JetBrains Mono",monospace';
          ctx.textAlign = 'center';
          ctx.fillText(bins[i].label, x + bw / 2, h - pad + 12);
        }
      }

      ctx.strokeStyle = '#282420'; ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();

      requestAnimationFrame(drawSpec);
    }

    drawSpec();

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;
      var x = (e.clientX - rect.left) * scaleX;
      var pad = 40; var barW = (canvas.width - pad * 2) / bins.length;
      var idx = Math.floor((x - pad) / barW);
      if (idx >= 0 && idx < bins.length) {
        tooltip.style.display = 'block';
        tooltip.textContent = bins[idx].freq + 'Hz · ' + (bins[idx].value * 100).toFixed(0) + '%';
        tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 32) + 'px';
      } else { tooltip.style.display = 'none'; }
    });
    canvas.addEventListener('mouseleave', function () { tooltip.style.display = 'none'; });
  })();

  // ── Waveform ──
  (function () {
    var canvas = document.getElementById('waveCanvas');
    var ctx = canvas.getContext('2d');
    var rateSlider = document.getElementById('rateSlider'), detuneSlider = document.getElementById('detuneSlider');
    var phases = [0, 1.8, 3.5, 5.0];
    var freqs = [1.0, 2.35, 4.1, 7.8];
    var amps = [0.6, 0.38, 0.52, 0.28];
    var colors = [[200,117,30],[160,152,144],[110,102,96],[74,68,62]];

    function drawWave() {
      var w = canvas.width, h = canvas.height;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      var rate = parseInt(rateSlider.value) * 0.008;
      var detune = parseInt(detuneSlider.value) * 0.008;
      var mid = h / 2, amp = (h - 60) / 2;
      var steps = Math.max(4, Math.floor(w / 1.5));

      // Grid
      ctx.strokeStyle = '#282420'; ctx.lineWidth = 0.4;
      for (var gy = 30; gy < h - 30; gy += 40) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }

      for (var ch = 0; ch < 4; ch++) {
        ctx.strokeStyle = 'rgba(' + colors[ch][0] + ',' + colors[ch][1] + ',' + colors[ch][2] + ',' + (0.85 - ch * 0.18) + ')';
        ctx.lineWidth = ch === 0 ? 2.2 : 1.4;
        ctx.beginPath();

        for (var i = 0; i <= steps; i++) {
          var t = i / steps;
          var x = t * w;
          var y = mid + Math.sin(t * freqs[ch] * Math.PI * 4 + phases[ch]) * amps[ch] * amp;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        phases[ch] += rate * (freqs[ch] + detune * ch * 0.3) * 0.5;
      }
      requestAnimationFrame(drawWave);
    }
    drawWave();
  })();

  // ── Signal Graph (D3) ──
  (function () {
    var svg = d3.select('#graphSvg');
    var width = 1100, height = 420;
    var tooltip = d3.select('#graphTooltip');
    var tipNode = document.getElementById('graphTooltip');

    var nodes = [
      { id: 'osc-a', label: 'Osc A', group: 'source', desc: 'Carrier: 220 Hz, sine' },
      { id: 'osc-b', label: 'Osc B', group: 'source', desc: 'LFO: 4.3 Hz, triangle' },
      { id: 'mic-in', label: 'Mic', group: 'source', desc: 'Live input, 48kHz' },
      { id: 'bp', label: 'BP Filter', group: 'process', desc: 'fc=800Hz, Q=6, 24dB/oct' },
      { id: 'delay', label: 'Delay', group: 'process', desc: '3/16 note, 45% fb, ping-pong' },
      { id: 'env', label: 'Env', group: 'process', desc: 'Attack 8ms, Release 120ms' },
      { id: 'shader', label: 'Shader', group: 'process', desc: 'Frag shader, 60fps, GLSL' },
      { id: 'vertex', label: 'Vertex', group: 'output', desc: 'Position output 1920×1080' },
      { id: 'audio', label: 'Audio Out', group: 'output', desc: 'Stereo, 48kHz, 24-bit' },
      { id: 'midi', label: 'MIDI', group: 'output', desc: 'Channel 1, CC data stream' }
    ];

    var links = [
      { source: 'osc-a', target: 'bp' },{ source: 'osc-b', target: 'bp' },
      { source: 'mic-in', target: 'env' },{ source: 'bp', target: 'delay' },
      { source: 'delay', target: 'audio' },{ source: 'env', target: 'shader' },
      { source: 'osc-b', target: 'shader' },{ source: 'shader', target: 'vertex' },
      { source: 'delay', target: 'midi' },  { source: 'env', target: 'delay' }
    ];

    var colorByGroup = { source: '#C8751E', process: '#A09890', output: '#6E6660' };

    var sim = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(function (d) { return d.id; }).distance(130))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(32));

    var link = svg.append('g').selectAll('line').data(links).join('line').attr('class', 'link');

    var node = svg.append('g').selectAll('.node').data(nodes).join('g').attr('class', 'node')
      .call(d3.drag()
        .on('start', function (e, d) { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag', function (e, d) { d.fx = e.x; d.fy = e.y; })
        .on('end', function (e, d) { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    node.append('circle')
      .attr('r', function (d) { return d.group === 'source' ? 8 : d.group === 'process' ? 6 : 5; })
      .attr('fill', function (d) { return colorByGroup[d.group]; })
      .on('mouseenter', function (e, d) {
        tipNode.style.display = 'block';
        tipNode.innerHTML = '<strong>' + d.label + '</strong><br>' + (d.desc || '');
        tipNode.style.left = (e.pageX + 14) + 'px';
        tipNode.style.top = (e.pageY - 44) + 'px';
        link.classed('highlight', function (l) { return l.source.id === d.id || l.target.id === d.id; });
        d3.select(this).transition().duration(150).attr('r', function (d) { return (d.group === 'source' ? 8 : d.group === 'process' ? 6 : 5) + 3; });
      })
      .on('mouseleave', function () {
        tipNode.style.display = 'none'; link.classed('highlight', false);
        d3.select(this).transition().duration(300).attr('r', function (d) { return d.group === 'source' ? 8 : d.group === 'process' ? 6 : 5; });
      })
      .on('click', function (e, d) {
        d3.select(this).transition().duration(100).attr('r', 14).transition().duration(400).attr('r', function (d) { return d.group === 'source' ? 8 : d.group === 'process' ? 6 : 5; });
      });

    node.append('text').attr('dx', 12).attr('dy', '.35em').text(function (d) { return d.label; });

    sim.on('tick', function () {
      link.attr('x1', function (d) { return d.source.x; }).attr('y1', function (d) { return d.source.y; })
          .attr('x2', function (d) { return d.target.x; }).attr('y2', function (d) { return d.target.y; });
      node.attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; });
    });
  })();
})();