// DesignDeathmatch Showcase - Gallery Script
document.addEventListener('DOMContentLoaded', () => loadShowcaseData());

async function loadShowcaseData() {
  try {
    const response = await fetch('showcase-config.json');
    const config = await response.json();
    renderGallery(config.entries);
  } catch (error) {
    document.getElementById('gallery').innerHTML = '<div class="loading">No benchmark data available. Add entries to showcase-config.json</div>';
  }
}

function renderGallery(entries) {
  const gallery = document.getElementById('gallery');
  if (!entries || entries.length === 0) {
    gallery.innerHTML = '<div class="loading">No benchmark data available.</div>';
    return;
  }
  gallery.innerHTML = entries.map((entry, index) => `
    <div class="result-card" style="animation-delay: ${index * 0.1}s">
      <div class="card-thumbnail">
        <img src="${entry.thumbnail}" alt="${entry.model} preview">
      </div>
      <div class="card-content">
        <div class="card-model">${entry.model}</div>
        <div class="card-version">Version: ${entry.version}</div>
        <div class="card-score">
          <div class="score-bar"><div class="score-fill" style="width: ${(entry.score.total / 157.5) * 100}%"></div></div>
          <span class="score-text">${entry.score.total} / 157.5</span>
        </div>
        <a href="preview.html?id=${entry.id}" class="card-button">View Preview →</a>
      </div>
    </div>
  `).join('');
}