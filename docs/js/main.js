// DesignDeathmatch Showcase - Gallery Script
let allEntries = [];

document.addEventListener('DOMContentLoaded', () => loadShowcaseData());

async function loadShowcaseData() {
  try {
    const response = await fetch('showcase-config.json');
    const config = await response.json();
    allEntries = config.entries || [];
    
    setupFilters();
    renderGallery(allEntries);
    
    document.getElementById('sort-select').addEventListener('change', updateGallery);
    document.getElementById('filter-select').addEventListener('change', updateGallery);
  } catch (error) {
    document.getElementById('gallery').innerHTML = '<div class="loading">No benchmark data available. Add entries to showcase-config.json</div>';
  }
}

function setupFilters() {
  const filterSelect = document.getElementById('filter-select');
  // Get distinct first word (family name)
  const families = new Set();
  allEntries.forEach(entry => {
    const family = entry.model.split(' ')[0];
    families.add(family);
  });
  
  families.forEach(family => {
    const option = document.createElement('option');
    option.value = family;
    option.textContent = family + ' Family';
    filterSelect.appendChild(option);
  });
}

function updateGallery() {
  const sortVal = document.getElementById('sort-select').value;
  const filterVal = document.getElementById('filter-select').value;
  
  let filtered = allEntries;
  if (filterVal !== 'all') {
    filtered = filtered.filter(entry => entry.model.startsWith(filterVal));
  }
  
  filtered.sort((a, b) => {
    if (sortVal === 'score-desc') return b.score.total - a.score.total;
    if (sortVal === 'score-asc') return a.score.total - b.score.total;
    if (sortVal === 'name-asc') return a.model.localeCompare(b.model);
    if (sortVal === 'name-desc') return b.model.localeCompare(a.model);
    return 0;
  });
  
  renderGallery(filtered);
}

function renderGallery(entries) {
  const gallery = document.getElementById('gallery');
  if (!entries || entries.length === 0) {
    gallery.innerHTML = '<div class="loading">No results match your criteria.</div>';
    return;
  }
  gallery.innerHTML = entries.map((entry, index) => `
    <div class="result-card" style="animation-delay: ${index * 0.1}s">
      <div class="card-thumbnail">
        <iframe src="${entry.v1_site || entry.site}" scrolling="no" tabindex="-1"></iframe>
      </div>
      <div class="card-content">
        <div class="card-model">${entry.model}</div>
        <div class="card-version">Version: ${entry.version}</div>
        <div class="card-score">
          <div class="score-bar"><div class="score-fill" style="width: ${(entry.score.total / 157.5) * 100}%"></div></div>
          <span class="score-text">${entry.score.total} / 157.5</span>
        </div>
        <a href="preview.html?id=${entry.id}" class="card-button">View Details →</a>
      </div>
    </div>
  `).join('');
}
