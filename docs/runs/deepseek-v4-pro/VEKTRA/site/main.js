// VEKTRA — main.js
// Vanilla JS only. Mobile nav, scroll animations, interactive background, cursor tracking.

(function () {
  'use strict';

  // ── Mobile navigation ──
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const nav = document.getElementById('nav');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ── Nav scroll effect ──
  window.addEventListener('scroll', function () {
    var y = window.scrollY || window.pageYOffset;
    if (y > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ── Scroll-triggered reveal animations ──
  var observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-section').forEach(function (el) {
    observer.observe(el);
  });

  // ── Generative background canvas ──
  var heroBg = document.getElementById('heroBg');
  if (heroBg) {
    var ctx = heroBg.getContext('2d');
    var nodes = [];
    var nodeCount = 60;
    var mouseX = -1000;
    var mouseY = -1000;
    var width, height;

    function resize() {
      var rect = heroBg.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      heroBg.width = width * window.devicePixelRatio;
      heroBg.height = height * window.devicePixelRatio;
      heroBg.style.width = width + 'px';
      heroBg.style.height = height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function createNodes() {
      nodes = [];
      for (var i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
          phase: Math.random() * Math.PI * 2,
          freq: Math.random() * 0.02 + 0.005
        });
      }
    }

    var accentR = 232;
    var accentG = 150;
    var accentB = 46;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var maxDist = 180;

          if (dist < maxDist) {
            var alpha = (1 - dist / maxDist) * 0.15;
            ctx.strokeStyle = 'rgba(' + accentR + ',' + accentG + ',' + accentB + ',' + alpha + ')';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw mouse influence
      var mx = mouseX - heroBg.parentElement.getBoundingClientRect().left;
      var my = mouseY - heroBg.parentElement.getBoundingClientRect().top;

      for (var k = 0; k < nodes.length; k++) {
        var ndx = nodes[k].x - mx;
        var ndy = nodes[k].y - my;
        var mdist = Math.sqrt(ndx * ndx + ndy * ndy);
        var influence = 200;

        if (mdist < influence) {
          var force = (1 - mdist / influence) * 0.3;
          nodes[k].vx += (ndx / mdist) * force;
          nodes[k].vy += (ndy / mdist) * force;
        }

        // Update node position with damping
        nodes[k].vx += (Math.sin(nodes[k].phase) * 0.2);
        nodes[k].vy += (Math.cos(nodes[k].phase) * 0.2);
        nodes[k].x += nodes[k].vx;
        nodes[k].y += nodes[k].vy;
        nodes[k].phase += nodes[k].freq;

        // Damping
        nodes[k].vx *= 0.98;
        nodes[k].vy *= 0.98;

        // Wrap around edges
        if (nodes[k].x < -30) nodes[k].x = width + 30;
        if (nodes[k].x > width + 30) nodes[k].x = -30;
        if (nodes[k].y < -30) nodes[k].y = height + 30;
        if (nodes[k].y > height + 30) nodes[k].y = -30;

        // Draw node
        ctx.fillStyle = 'rgba(' + accentR + ',' + accentG + ',' + accentB + ',0.4)';
        ctx.beginPath();
        ctx.arc(nodes[k].x, nodes[k].y, nodes[k].radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    resize();
    createNodes();
    draw();

    window.addEventListener('resize', function () {
      resize();
      createNodes();
    });

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  }

  // ── Data visualization ──
  var vizCanvas = document.getElementById('vizCanvas');
  if (vizCanvas) {
    var vizCtx = vizCanvas.getContext('2d');
    var threshold = 0.30;
    var tooltip = document.getElementById('vizTooltip');
    var thresholdSlider = document.getElementById('vizThreshold');
    var thresholdValue = document.getElementById('vizThresholdValue');

    // Simulated frequency data — 64 bins of FFT-like data
    var frequencyBins = [
      { label: 'Sub 20', value: 0.12, color: '30-60' },
      { label: 'Sub 30', value: 0.18 },
      { label: 'Sub 40', value: 0.25 },
      { label: 'Sub 50', value: 0.35 },
      { label: 'Sub 60', value: 0.42 },
      { label: 'Bass 80', value: 0.55 },
      { label: 'Bass 100', value: 0.38 },
      { label: 'Bass 120', value: 0.28 },
      { label: 'Bass 150', value: 0.65 },
      { label: 'Bass 200', value: 0.72 },
      { label: 'LM 250', value: 0.48 },
      { label: 'LM 300', value: 0.33 },
      { label: 'LM 400', value: 0.85 },
      { label: 'LM 500', value: 0.91 },
      { label: 'LM 600', value: 0.62 },
      { label: 'LM 800', value: 0.44 },
      { label: 'HM 1k', value: 0.78 },
      { label: 'HM 1.2k', value: 0.55 },
      { label: 'HM 1.5k', value: 0.38 },
      { label: 'HM 2k', value: 0.28 },
      { label: 'HM 2.5k', value: 0.52 },
      { label: 'HM 3k', value: 0.67 },
      { label: 'HM 4k', value: 0.45 },
      { label: 'HM 5k', value: 0.30 },
      { label: 'HM 6k', value: 0.22 },
      { label: 'HM 8k', value: 0.35 },
      { label: 'Pres 10k', value: 0.41 },
      { label: 'Pres 12k', value: 0.19 },
      { label: 'Pres 15k', value: 0.14 },
      { label: 'Air 18k+', value: 0.08 },
      { label: 'Air 20k', value: 0.05 },
      { label: 'Air 22k', value: 0.03 }
    ];

    // Node/connection data for the graph overlay
    var graphNodes = [
      { x: 0.15, y: 0.45, label: 'Osc A', type: 'source' },
      { x: 0.28, y: 0.30, label: 'Filter', type: 'process' },
      { x: 0.50, y: 0.55, label: 'Shader', type: 'process' },
      { x: 0.72, y: 0.35, label: 'LFO', type: 'source' },
      { x: 0.40, y: 0.70, label: 'Vertex', type: 'output' },
      { x: 0.85, y: 0.60, label: 'Output', type: 'output' }
    ];

    var graphEdges = [
      { from: 0, to: 1 },
      { from: 1, to: 5 },
      { from: 3, to: 1 },
      { from: 3, to: 2 },
      { from: 2, to: 4 },
      { from: 1, to: 5 },
      { from: 4, to: 5 }
    ];

    function drawViz() {
      var vw = vizCanvas.width;
      var vh = vizCanvas.height;
      var dpr = window.devicePixelRatio || 1;
      vizCanvas.width = vw * dpr;
      vizCanvas.height = vh * dpr;
      vizCanvas.style.width = vw + 'px';
      vizCanvas.style.height = vh + 'px';
      vizCtx.scale(dpr, dpr);

      vizCtx.clearRect(0, 0, vw, vh);

      var barWidth = (vw - 80) / frequencyBins.length;
      var maxBarHeight = vh * 0.6;
      var barPadding = 2;

      // Draw bars
      for (var i = 0; i < frequencyBins.length; i++) {
        var val = frequencyBins[i].value;
        var barH = val * maxBarHeight;
        var x = 40 + i * barWidth;
        var y = vh - 60 - barH;

        var alpha;
        var color;

        if (val >= threshold) {
          alpha = 0.7 + (val - threshold) * 0.5;
          color = 'rgba(232,150,46,' + alpha + ')';
        } else {
          alpha = 0.15;
          color = 'rgba(158,152,144,' + alpha + ')';
        }

        vizCtx.fillStyle = color;
        vizCtx.fillRect(x + barPadding, y, barWidth - barPadding * 2, barH);

        // Bar label — every 4th bar
        if (i % 4 === 0) {
          vizCtx.fillStyle = '#5C5650';
          vizCtx.font = '9px "JetBrains Mono", monospace';
          vizCtx.textAlign = 'center';
          vizCtx.fillText(frequencyBins[i].label, x + barWidth / 2, vh - 42);
        }
      }

      // Axis line
      vizCtx.strokeStyle = '#2A2622';
      vizCtx.lineWidth = 1;
      vizCtx.beginPath();
      vizCtx.moveTo(40, vh - 60);
      vizCtx.lineTo(vw - 40, vh - 60);
      vizCtx.stroke();

      // Threshold line
      var tY = vh - 60 - threshold * maxBarHeight;
      vizCtx.strokeStyle = 'rgba(232,150,46,0.5)';
      vizCtx.setLineDash([4, 8]);
      vizCtx.beginPath();
      vizCtx.moveTo(40, tY);
      vizCtx.lineTo(vw - 40, tY);
      vizCtx.stroke();
      vizCtx.setLineDash([]);

      // Graph nodes
      var nodeRadius = 5;
      for (var j = 0; j < graphNodes.length; j++) {
        var nx = graphNodes[j].x * vw;
        var ny = graphNodes[j].y * vh;
        vizCtx.fillStyle = '#E8962E';
        vizCtx.beginPath();
        vizCtx.arc(nx, ny, nodeRadius, 0, Math.PI * 2);
        vizCtx.fill();

        vizCtx.fillStyle = '#E8E4E0';
        vizCtx.font = '10px "JetBrains Mono", monospace';
        vizCtx.textAlign = 'left';
        vizCtx.fillText(graphNodes[j].label, nx + 8, ny + 4);
      }
    }

    drawViz();

    // Interaction
    if (thresholdSlider && thresholdValue) {
      thresholdSlider.addEventListener('input', function () {
        threshold = parseInt(this.value) / 100;
        thresholdValue.textContent = threshold.toFixed(2);
        drawViz();
      });
    }

    vizCanvas.addEventListener('mousemove', function (e) {
      var rect = vizCanvas.getBoundingClientRect();
      var scaleX = vizCanvas.width / rect.width;
      var x = (e.clientX - rect.left) * scaleX;

      var barWidth = (vizCanvas.width - 80) / frequencyBins.length;
      var idx = Math.floor((x - 40) / barWidth);

      if (idx >= 0 && idx < frequencyBins.length) {
        var bin = frequencyBins[idx];
        tooltip.hidden = false;
        tooltip.textContent = bin.label + ': ' + (bin.value * 100).toFixed(0) + '%';
        tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 36) + 'px';
      } else {
        tooltip.hidden = true;
      }
    });

    vizCanvas.addEventListener('mouseleave', function () {
      tooltip.hidden = true;
    });

    window.addEventListener('resize', function () {
      drawViz();
    });
  }

  // ── Cursor-following element: add magnetic effect to buttons ──
  document.querySelectorAll('.btn-accent').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = e.clientX - cx;
      var dy = e.clientY - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var maxShift = 4;
      var shift = Math.min(dist * 0.15, maxShift);
      var angle = Math.atan2(dy, dx);
      btn.style.transform = 'translate(' + Math.cos(angle) * shift + 'px, ' + Math.sin(angle) * shift + 'px) translateY(-1px)';
    });

    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });
})();
