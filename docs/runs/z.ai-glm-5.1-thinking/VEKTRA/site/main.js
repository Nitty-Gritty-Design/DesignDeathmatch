/* ══════════════════════════════════════════
   VEKTRA — site/main.js
   Mobile nav, scroll reveals, mouse response,
   generative hero background, frequency viz.
   ══════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Mobile nav toggle ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Scroll-triggered entrance animations ──
  var revealElements = document.querySelectorAll(
    '.section-label, .section-headline, .section-intro, .section-text, ' +
    '.code-block, .cap-card, .arch-card, .cta-headline, .cta-text, .btn'
  );
  revealElements.forEach(function (el) { el.classList.add('reveal'); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(function (el) { observer.observe(el); });

  // ── Mouse-responsive element (hero headline follows cursor subtly) ──
  var heroHeadline = document.querySelector('.hero-headline');
  var heroSection = document.getElementById('hero');

  if (heroHeadline && heroSection) {
    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      heroHeadline.style.transform =
        'translate(' + (x * 6) + 'px, ' + (y * 4) + 'px)';
    });

    heroSection.addEventListener('mouseleave', function () {
      heroHeadline.style.transform = 'translate(0, 0)';
      heroHeadline.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(function () { heroHeadline.style.transition = ''; }, 600);
    });
  }

  // ── Generative hero canvas background ──
  var canvas = document.getElementById('heroCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var mouseX = 0;
    var mouseY = 0;
    var animId;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    // Signal field — oscillating lines that respond to cursor
    var lineCount = 28;
    var time = 0;

    function getComputedColor(varName) {
      var temp = document.createElement('div');
      temp.style.color = varName;
      document.body.appendChild(temp);
      var computed = getComputedStyle(temp).color;
      document.body.removeChild(temp);
      return computed;
    }

    function drawFrame() {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var w = canvas.width;
      var h = canvas.height;
      var midY = h * 0.5;

      for (var i = 0; i < lineCount; i++) {
        var baseY = midY + (i - lineCount / 2) * 14;
        var amplitude = 20 + i * 1.2;
        var frequency = 0.003 + i * 0.0002;
        var phase = time * (0.8 + i * 0.05);
        var distFromMouse = Math.abs(baseY - mouseY);
        var mouseInfluence = Math.max(0, 1 - distFromMouse / 200);
        var alpha = 0.04 + (i / lineCount) * 0.06 + mouseInfluence * 0.15;

        ctx.beginPath();
        for (var x = 0; x <= w; x += 3) {
          var distX = Math.abs(x - mouseX);
          var mouseAmp = mouseInfluence * Math.exp(-distX / 300) * 30;
          var y = baseY +
            Math.sin(x * frequency + phase) * amplitude +
            Math.sin(x * frequency * 2.3 + phase * 1.4) * (amplitude * 0.3) +
            mouseAmp * Math.sin(x * 0.008 + time * 2);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Use accent color for lines near the mouse, muted otherwise
        if (mouseInfluence > 0.1) {
          ctx.strokeStyle = 'rgba(255, 107, 43, ' + (alpha + 0.1) + ')';
        } else {
          ctx.strokeStyle = 'rgba(232, 230, 225, ' + alpha + ')';
        }
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      animId = requestAnimationFrame(drawFrame);
    }

    drawFrame();
  }

  // ── Frequency spectrum visualization (D3) ──
  // Chosen type: frequency spectrum — directly represents VEKTRA's audio-signal domain.
  // D3 is used because it provides precise DOM-driven data binding for the bar chart
  // and interactivity (hover, click) without canvas opacity — accessible and inspectable.

  var vizContainer = document.getElementById('vizContainer');
  if (vizContainer && typeof d3 !== 'undefined') {
    var spectrumData = [
      { band: '20–60 Hz',    freq: 'Sub-bass',       db: -18, harmonic: false },
      { band: '60–150 Hz',   freq: 'Bass',           db: -8,  harmonic: false },
      { band: '150–300 Hz',  freq: 'Low-mid',        db: -12, harmonic: false },
      { band: '300–600 Hz',  freq: 'Mid',            db: -14, harmonic: true  },
      { band: '600–1.2k Hz', freq: 'Upper-mid',      db: -6,  harmonic: true  },
      { band: '1.2–2.4k Hz', freq: 'Presence',       db: -3,  harmonic: true  },
      { band: '2.4–5k Hz',   freq: 'Brilliance',     db: -9,  harmonic: true  },
      { band: '5–10k Hz',    freq: 'Upper',          db: -16, harmonic: false },
      { band: '10–16k Hz',   freq: 'Air',            db: -28, harmonic: false },
      { band: '16–20k Hz',   freq: 'Ultrasonic',     db: -42, harmonic: false },
      { band: '60 Hz',       freq: 'Fundamental',     db: -7,  harmonic: true  },
      { band: '120 Hz',      freq: '2nd harmonic',    db: -11, harmonic: true  },
      { band: '180 Hz',      freq: '3rd harmonic',    db: -16, harmonic: true  },
      { band: '240 Hz',      freq: '4th harmonic',    db: -22, harmonic: true  },
      { band: '300 Hz',      freq: '5th harmonic',    db: -28, harmonic: true  },
      { band: '440 Hz',      freq: 'Tuning ref',      db: -5,  harmonic: true  },
      { band: '880 Hz',      freq: 'Octave',          db: -9,  harmonic: true  },
      { band: '1.76k Hz',    freq: '2nd octave',      db: -13, harmonic: true  },
      { band: '3.52k Hz',    freq: '3rd octave',      db: -19, harmonic: true  },
      { band: '7.04k Hz',    freq: '4th octave',      db: -31, harmonic: false }
    ];

    var selectedBand = null;
    var containerRect = vizContainer.getBoundingClientRect();

    var margin = { top: 40, right: 30, bottom: 60, left: 60 };
    var width = containerRect.width - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var svg = d3.select(vizContainer)
      .append('svg')
      .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var x = d3.scaleBand()
      .domain(spectrumData.map(function (d) { return d.band; }))
      .range([0, width])
      .padding(0.25);

    var y = d3.scaleLinear()
      .domain([-50, 0])
      .range([height, 0]);

    // Grid lines
    svg.selectAll('.grid-line')
      .data([-40, -30, -20, -10, 0])
      .enter()
      .append('line')
      .attr('x1', 0).attr('x2', width)
      .attr('y1', function (d) { return y(d); })
      .attr('y2', function (d) { return y(d); })
      .attr('stroke', '#2A2A2D')
      .attr('stroke-width', 0.5);

    // dB labels
    svg.selectAll('.db-label')
      .data([-40, -20, 0])
      .enter()
      .append('text')
      .attr('x', -10)
      .attr('y', function (d) { return y(d) + 4; })
      .attr('text-anchor', 'end')
      .attr('fill', '#5C5952')
      .attr('font-family', "'Space Mono', monospace")
      .attr('font-size', '10px')
      .text(function (d) { return d + ' dB'; });

    // Bars
    var bars = svg.selectAll('.bar')
      .data(spectrumData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function (d) { return x(d.band); })
      .attr('width', x.bandwidth())
      .attr('y', function (d) { return y(d.db); })
      .attr('height', function (d) { return height - y(d.db); })
      .attr('fill', function (d) { return d.harmonic ? '#FF6B2B' : '#9B978F'; })
      .attr('rx', 1)
      .attr('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        d3.select(this)
          .attr('fill', '#FF6B2B')
          .attr('opacity', 0.9);

        var tooltip = d3.select(vizContainer)
          .append('div')
          .attr('class', 'viz-tooltip')
          .style('left', (event.offsetX + 12) + 'px')
          .style('top', (event.offsetY - 28) + 'px');
        tooltip.html('<strong>' + d.freq + '</strong><br>' +
          d.band + ' &middot; ' + d.db + ' dB');
      })
      .on('mouseleave', function (event, d) {
        d3.select(this)
          .attr('fill', d.harmonic ? '#FF6B2B' : '#9B978F')
          .attr('opacity', 1);
        d3.select(vizContainer).selectAll('.viz-tooltip').remove();
      })
      .on('click', function (event, d) {
        if (selectedBand === d.band) {
          selectedBand = null;
          bars.attr('opacity', 1).attr('fill', function (d) {
            return d.harmonic ? '#FF6B2B' : '#9B978F';
          });
        } else {
          selectedBand = d.band;
          bars.attr('opacity', 0.2)
            .attr('fill', function (b) {
              return b.band === d.band ? '#FF6B2B' : '#2A2A2D';
            });
          d3.select(this).attr('opacity', 1);
        }
      });

    // X-axis labels (rotated)
    svg.selectAll('.x-label')
      .data(spectrumData)
      .enter()
      .append('text')
      .attr('x', function (d) { return x(d.band) + x.bandwidth() / 2; })
      .attr('y', height + 16)
      .attr('text-anchor', 'end')
      .attr('transform', function (d) {
        return 'rotate(-45 ' + (x(d.band) + x.bandwidth() / 2) + ' ' + (height + 16) + ')';
      })
      .attr('fill', '#5C5952')
      .attr('font-family', "'Space Mono', monospace")
      .attr('font-size', '9px')
      .text(function (d) { return d.freq; });

    // Legend
    var legend = svg.append('g').attr('transform', 'translate(' + (width - 200) + ', -20)');
    legend.append('rect').attr('width', 10).attr('height', 10).attr('fill', '#FF6B2B');
    legend.append('text').attr('x', 16).attr('y', 9).attr('fill', '#9B978F')
      .attr('font-family', "'Space Mono', monospace").attr('font-size', '10px')
      .text('Harmonic content');
    legend.append('rect').attr('x', 130).attr('width', 10).attr('height', 10).attr('fill', '#9B978F');
    legend.append('text').attr('x', 146).attr('y', 9).attr('fill', '#9B978F')
      .attr('font-family', "'Space Mono', monospace").attr('font-size', '10px')
      .text('Noise floor');
  }

})();
