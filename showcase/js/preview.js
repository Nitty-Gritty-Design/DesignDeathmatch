// DesignDeathmatch Preview Script
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const modelId = urlParams.get('id');
  
  if (modelId) {
    loadModelData(modelId);
  } else {
    document.getElementById('preview-content').innerHTML = '<div class="loading">No model specified. <a href="index.html">Return to gallery</a></div>';
  }
});

async function loadModelData(modelId) {
  try {
    const response = await fetch('../showcase-config.json');
    const config = await response.json();
    const entry = config.entries.find(e => e.id === modelId);
    
    if (!entry) {
      document.getElementById('preview-content').innerHTML = '<div class="loading">Model not found. <a href="index.html">Return to gallery</a></div>';
      return;
    }
    
    renderPreview(entry);
  } catch (error) {
    console.error('Error loading model data:', error);
    document.getElementById('preview-content').innerHTML = '<div class="loading">Error loading data. <a href="index.html">Return to gallery</a></div>';
  }
}

function renderPreview(entry) {
  document.getElementById('model-name').textContent = entry.model;
  
  const html = `
    <div class="preview-screenshot">
      <img src="${entry.screenshot}" alt="${entry.model} full screenshot">
    </div>
    
    <div class="preview-details">
      <div class="detail-section">
        <h2>Model Information</h2>
        <div class="detail-row">
          <span class="detail-label">Model:</span>
          <span>${entry.model}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Version:</span>
          <span>${entry.version}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Run Date:</span>
          <span>${entry.runDate || 'N/A'}</span>
        </div>
      </div>

      <div class="detail-section">
        <h2>Scores</h2>
        <div class="score-total">${entry.score.total} / 157.5</div>
        <div class="score-breakdown">
          <div class="phase-score">
            <span>Phase 1 (Foundation):</span>
            <strong>${entry.phases.foundation}/10</strong>
          </div>
          <div class="phase-score">
            <span>Phase 2 (Logo):</span>
            <strong>${entry.phases.logo}/20</strong>
          </div>
          <div class="phase-score">
            <span>Phase 3 (Website):</span>
            <strong>${entry.phases.website}/25</strong>
          </div>
          <div class="phase-score">
            <span>Phase 4 (Visualization):</span>
            <strong>${entry.phases.visualization}/20</strong>
          </div>
          <div class="phase-score">
            <span>Phase 5 (Style Guide):</span>
            <strong>${entry.phases.styleguide}/17.5</strong>
          </div>
          <div class="phase-score">
            <span>Phase 6 (Wildcard):</span>
            <strong>${entry.phases.wildcard}/25</strong>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h2>Deliverables</h2>
        <a href="../${entry.runPath}VEKTRA/site/index.html" class="card-button" target="_blank" style="margin-bottom: 8px">View Full Website →</a>
        <a href="../${entry.runPath}VEKTRA/brand/styleguide.html" class="card-button" target="_blank">View Style Guide →</a>
      </div>
    </div>
  `;
  
  document.getElementById('preview-content').innerHTML = html;
}

// Add preview styles
const style = document.createElement('style');
style.textContent = `
  .back-link {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--color-text-secondary);
    text-decoration: none;
    margin-bottom: 8px;
    display: inline-block;
  }
  
  .back-link:hover {
    color: var(--color-accent);
  }
  
  .preview-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 48px;
    margin: 48px 0;
  }
  
  .preview-screenshot img {
    width: 100%;
    border-radius: 8px;
    border: 1px solid var(--color-border);
  }
  
  .preview-details {
    position: sticky;
    top: 48px;
    align-self: start;
  }
  
  .detail-section {
    margin-bottom: 32px;
  }
  
  .detail-section h2 {
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--color-accent);
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--color-border);
    font-size: 14px;
  }
  
  .detail-label {
    color: var(--color-text-secondary);
  }
  
  .score-total {
    font-family: var(--font-mono);
    font-size: 32px;
    color: var(--color-accent);
    margin-bottom: 16px;
  }
  
  .phase-score {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 13px;
  }
  
  @media (max-width: 900px) {
    .preview-layout {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
`;
document.head.appendChild(style);