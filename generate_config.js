const fs = require('fs');
const path = require('path');

const runsDir = path.join(__dirname, 'docs', 'runs');
const configPath = path.join(__dirname, 'docs', 'showcase-config.json');

let existingConfig = { entries: [] };
if (fs.existsSync(configPath)) {
  existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

const entries = [];
if (fs.existsSync(runsDir)) {
  const models = fs.readdirSync(runsDir).filter(f => fs.statSync(path.join(runsDir, f)).isDirectory());

  models.forEach(modelId => {
    const modelDir = path.join(runsDir, modelId);
    const vektraDir = path.join(modelDir, 'VEKTRA');
    
    if (!fs.existsSync(vektraDir)) return;
    
    // Find v1 site
    let v1_site = `runs/${modelId}/VEKTRA/site/index.html`;
    if (!fs.existsSync(path.join(__dirname, 'docs', v1_site))) {
      if (fs.existsSync(path.join(__dirname, 'docs', `runs/${modelId}/VEKTRA/index.html`))) {
        v1_site = `runs/${modelId}/VEKTRA/index.html`;
      }
    }

    // Find v2 site (Refinement)
    // We check for index_v2.html or index.html in the v2 directory structures
    const v2SearchPaths = [
      `runs/${modelId}/VEKTRA/v2/site/index_v2.html`,
      `runs/${modelId}/VEKTRA/v2/site/index.html`,
      `runs/${modelId}/VEKTRA/v2/index.html`
    ];
    
    let site = v1_site; // Default to v1 if no v2 is found
    for (const p of v2SearchPaths) {
      if (fs.existsSync(path.join(__dirname, 'docs', p))) {
        site = p;
        break;
      }
    }

    // Read validation score
    let automatedScore = 0;
    const v2ReportPath = path.join(__dirname, 'docs', `runs/${modelId}/VEKTRA/v2/validation-report.json`);
    const v1ReportPath = path.join(__dirname, 'docs', `runs/${modelId}/VEKTRA/validation-report.json`);
    
    if (fs.existsSync(v2ReportPath)) {
      const report = JSON.parse(fs.readFileSync(v2ReportPath, 'utf8'));
      automatedScore = report.score;
    } else if (fs.existsSync(v1ReportPath)) {
      const report = JSON.parse(fs.readFileSync(v1ReportPath, 'utf8'));
      automatedScore = report.score;
    }

    // Read human score from individual review files
    const scoreDir = path.join(__dirname, 'docs', 'scores', modelId);
    let humanScore = 0;
    let humanReviewCount = 0;

    if (fs.existsSync(scoreDir)) {
      const reviewFiles = fs.readdirSync(scoreDir).filter(f => f.endsWith('.json'));
      let totalHumanSum = 0;
      reviewFiles.forEach(file => {
        const reviewData = JSON.parse(fs.readFileSync(path.join(scoreDir, file), 'utf8'));
        if (typeof reviewData.humanScore === 'number') {
          totalHumanSum += reviewData.humanScore;
          humanReviewCount++;
        }
      });
      if (humanReviewCount > 0) {
        humanScore = totalHumanSum / humanReviewCount;
      }
    } else {
      // Fallback to existing config human score if no individual files exist
      const existingEntry = existingConfig.entries.find(e => e.id === modelId);
      humanScore = existingEntry ? existingEntry.score.human : 0;
    }
    
    // Find existing entry for other metadata
    const existingEntry = existingConfig.entries.find(e => e.id === modelId);
    
    const modelName = existingEntry ? existingEntry.model : modelId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    const phases = existingEntry ? existingEntry.phases : {
      foundation: 10, logo: 20, website: 25, visualization: 20, styleguide: 17.5, wildcard: 25
    };

    entries.push({
      id: modelId,
      model: modelName,
      version: existingEntry ? existingEntry.version : new Date().toISOString().split('T')[0],
      runDate: existingEntry ? existingEntry.runDate : new Date().toISOString().split('T')[0],
      site: site,
      v1_site: v1_site,
      score: {
        automated: automatedScore,
        human: humanScore,
        total: automatedScore + humanScore
      },
      phases: phases,
      wildcard: existingEntry ? existingEntry.wildcard : "unknown"
    });
  });
}

fs.writeFileSync(configPath, JSON.stringify({ entries }, null, 2));
console.log(`Successfully generated showcase-config.json with ${entries.length} entries.`);
