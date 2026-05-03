// DesignDeathmatch Charts - Analytics & Visualization
let allEntries = [];
let charts = {};

document.addEventListener('DOMContentLoaded', () => loadChartData());

async function loadChartData() {
  try {
    const response = await fetch('showcase-config.json');
    const config = await response.json();
    allEntries = config.entries || [];
    
    // Fetch accent colors from each model's tokens.css
    await Promise.all(allEntries.map(async (entry) => {
      try {
        const tokenPath = `runs/${entry.id}/VEKTRA/brand/tokens.css`;
        const res = await fetch(tokenPath);
        if (res.ok) {
          const cssText = await res.text();
          // Extract --color-accent value
          const match = cssText.match(/--color-accent\s*:\s*([^;]+)/);
          if (match) {
            entry.brandColor = match[1].trim();
          }
        }
      } catch (e) {
        console.warn(`Could not load tokens for ${entry.id}`, e);
      }
    }));
    
    initRadarSelects();
    renderCharts();
  } catch (error) {
    console.error('Error loading chart data:', error);
  }
}

function initRadarSelects() {
  const s1 = document.getElementById('radar-model-1');
  const s2 = document.getElementById('radar-model-2');
  
  allEntries.forEach((entry, idx) => {
    const opt1 = document.createElement('option');
    opt1.value = entry.id;
    opt1.textContent = entry.model;
    if (idx === 0) opt1.selected = true;
    s1.appendChild(opt1);
    
    const opt2 = document.createElement('option');
    opt2.value = entry.id;
    opt2.textContent = entry.model;
    if (idx === 1 || (allEntries.length === 1 && idx === 0)) opt2.selected = true;
    s2.appendChild(opt2);
  });
  
  s1.addEventListener('change', updateRadarChart);
  s2.addEventListener('change', updateRadarChart);
}

function renderCharts() {
  renderRadarChart();
  renderV1V2Chart();
  renderRankingChart();
  renderScatterChart();
  renderPhaseAvgChart();
}

const colors = {
  primary: '#5ea2ef', // Muted Blue
  secondary: '#a18cd1', // Muted Purple
  accent: '#fbc2eb', // Muted Pink
  grid: 'rgba(255, 255, 255, 0.05)',
  text: '#888888',
  tooltipBg: 'rgba(20, 20, 20, 0.9)',
};

function getModelColor(index, alpha = 1) {
  const entry = allEntries[index];
  let color = entry && entry.brandColor ? entry.brandColor : '#748cab';
  
  // If color is rgba or hex, handle it
  if (alpha === 1) return color;
  
  // Simple check for hex
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  return color;
}

// Detect light mode to adjust grid/text
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  colors.grid = 'rgba(0, 0, 0, 0.05)';
  colors.text = '#666666';
}

function renderRadarChart() {
  const ctx = document.getElementById('radarChart').getContext('2d');
  const m1Id = document.getElementById('radar-model-1').value;
  const m2Id = document.getElementById('radar-model-2').value;
  
  const m1Index = allEntries.findIndex(e => e.id === m1Id);
  const m2Index = allEntries.findIndex(e => e.id === m2Id);
  
  const m1 = allEntries[m1Index];
  const m2 = allEntries[m2Index];
  
  const labels = ['Foundation', 'Logo', 'Website', 'Data Viz', 'Style Guide', 'Wildcard'];
  
  const getData = (m) => [
    (m.phases.foundation / 10) * 100,
    (m.phases.logo / 20) * 100,
    (m.phases.website / 25) * 100,
    (m.phases.visualization / 20) * 100,
    (m.phases.styleguide / 17.5) * 100,
    (m.phases.wildcard / 25) * 100
  ];

  charts.radar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [
        {
          label: m1.model,
          data: getData(m1),
          backgroundColor: getModelColor(m1Index, 0.1),
          borderColor: getModelColor(m1Index, 0.8),
          pointBackgroundColor: getModelColor(m1Index, 1),
          borderWidth: 2
        },
        {
          label: m2.model,
          data: getData(m2),
          backgroundColor: getModelColor(m2Index, 0.1),
          borderColor: getModelColor(m2Index, 0.8),
          pointBackgroundColor: getModelColor(m2Index, 1),
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: colors.grid },
          grid: { color: colors.grid },
          pointLabels: { color: colors.text, font: { family: 'JetBrains Mono', size: 9 } },
          ticks: { display: false },
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
      plugins: {
        legend: { position: 'bottom', labels: { color: colors.text, boxWidth: 10, font: { family: 'Inter', size: 10 } } }
      }
    }
  });
}

function updateRadarChart() {
  if (charts.radar) {
    const m1Id = document.getElementById('radar-model-1').value;
    const m2Id = document.getElementById('radar-model-2').value;
    
    const m1Index = allEntries.findIndex(e => e.id === m1Id);
    const m2Index = allEntries.findIndex(e => e.id === m2Id);
    
    const m1 = allEntries[m1Index];
    const m2 = allEntries[m2Index];
    
    const getData = (m) => [
      (m.phases.foundation / 10) * 100,
      (m.phases.logo / 20) * 100,
      (m.phases.website / 25) * 100,
      (m.phases.visualization / 20) * 100,
      (m.phases.styleguide / 17.5) * 100,
      (m.phases.wildcard / 25) * 100
    ];
    
    charts.radar.data.datasets[0].label = m1.model;
    charts.radar.data.datasets[0].data = getData(m1);
    charts.radar.data.datasets[0].backgroundColor = getModelColor(m1Index, 0.1);
    charts.radar.data.datasets[0].borderColor = getModelColor(m1Index, 0.8);
    charts.radar.data.datasets[0].pointBackgroundColor = getModelColor(m1Index, 1);
    
    charts.radar.data.datasets[1].label = m2.model;
    charts.radar.data.datasets[1].data = getData(m2);
    charts.radar.data.datasets[1].backgroundColor = getModelColor(m2Index, 0.1);
    charts.radar.data.datasets[1].borderColor = getModelColor(m2Index, 0.8);
    charts.radar.data.datasets[1].pointBackgroundColor = getModelColor(m2Index, 1);
    
    charts.radar.update();
  }
}

function renderV1V2Chart() {
  const ctx = document.getElementById('v1v2Chart').getContext('2d');
  const sorted = [...allEntries].sort((a,b) => b.score.total - a.score.total);
  
  charts.v1v2 = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(e => e.model),
      datasets: [
        {
          label: 'V1 Base',
          data: sorted.map(e => e.score.v1),
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          borderRadius: 2
        },
        {
          label: 'V2 Peak',
          data: sorted.map(e => e.score.v2),
          backgroundColor: sorted.map((e, i) => {
            const index = allEntries.findIndex(entry => entry.id === e.id);
            return getModelColor(index, 0.6);
          }),
          borderRadius: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.text, font: { size: 9 } } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.text } }
      },
      plugins: {
        legend: { position: 'bottom', labels: { color: colors.text, boxWidth: 10, font: { size: 10 } } }
      }
    }
  });
}

function renderRankingChart() {
  const ctx = document.getElementById('rankingChart').getContext('2d');
  const sorted = [...allEntries].sort((a,b) => b.score.total - a.score.total);
  
  charts.ranking = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(e => e.model),
      datasets: [{
        label: 'Benchmark Score',
        data: sorted.map(e => e.score.total),
        backgroundColor: sorted.map((e, i) => {
          const index = allEntries.findIndex(entry => entry.id === e.id);
          return getModelColor(index, 0.7);
        }),
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { 
          grid: { color: colors.grid }, 
          ticks: { color: colors.text },
          max: 157.5
        },
        y: { 
          grid: { display: false }, 
          ticks: { color: colors.text, font: { family: 'JetBrains Mono', size: 11 } } 
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function renderScatterChart() {
  const ctx = document.getElementById('scatterChart').getContext('2d');
  
  charts.scatter = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Models',
        data: allEntries.map((e, i) => ({ 
          x: e.score.automated, 
          y: e.score.human, 
          model: e.model,
          color: getModelColor(i, 0.8)
        })),
        backgroundColor: (context) => context.raw ? context.raw.color : colors.accent,
        pointRadius: 6,
        pointHoverRadius: 10,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { 
          title: { display: true, text: 'Automated Precision', color: colors.text, font: { family: 'JetBrains Mono', size: 10 } },
          grid: { color: colors.grid }, 
          ticks: { color: colors.text },
          min: 0,
          max: 127.5
        },
        y: { 
          title: { display: true, text: 'Human Taste', color: colors.text, font: { family: 'JetBrains Mono', size: 10 } },
          grid: { color: colors.grid }, 
          ticks: { color: colors.text },
          min: 0,
          max: 30
        }
      },
      plugins: {
        tooltip: {
          backgroundColor: colors.tooltipBg,
          padding: 10,
          titleFont: { size: 12 },
          bodyFont: { size: 11 },
          callbacks: {
            label: (ctx) => ` ${ctx.raw.model} | Auto: ${ctx.raw.x} | Human: ${ctx.raw.y}`
          }
        },
        legend: { display: false }
      }
    }
  });
}

function renderPhaseAvgChart() {
  const ctx = document.getElementById('phaseAvgChart').getContext('2d');
  
  const phases = ['foundation', 'logo', 'website', 'visualization', 'styleguide', 'wildcard'];
  const maxes = [10, 20, 25, 20, 17.5, 25];
  
  const avgs = phases.map((phase, i) => {
    const sum = allEntries.reduce((acc, curr) => acc + curr.phases[phase], 0);
    return (sum / allEntries.length / maxes[i]) * 100;
  });

  charts.phaseAvg = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Found.', 'Logo', 'Web', 'Viz', 'Style', 'Wild'],
      datasets: [{
        label: 'Avg Skill Level %',
        data: avgs,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.text, font: { size: 9 } } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.text }, min: 0, max: 100 }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}
