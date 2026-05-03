const fs = require('fs');
const path = require('path');

const runFolder = process.argv[2];

if (!runFolder) {
  console.error('Usage: node validate_run.js <path_to_run_folder_e.g._docs/runs/VEKTRA/v2>');
  process.exit(1);
}

const resolvePath = (p) => path.join(runFolder, p);

const report = {
  score: 100,
  maxScore: 100,
  deductions: [],
  checks: {},
};

function checkFileExists(relPath, points = 5) {
  const exists = fs.existsSync(resolvePath(relPath));
  report.checks[relPath] = exists;
  if (!exists) {
    report.score -= points;
    report.deductions.push(`Missing file: ${relPath} (-${points} pts)`);
  }
  return exists;
}

// 1. Check required files
const requiredFiles = [
  'brand/tokens.css',
  'brand/typography.md',
  'brand/voice.md',
  'brand/logo-concept.md',
  'brand/logo.svg',
  'brand/logo-mark.svg',
  'brand/logo-animated.html',
  'brand/logo-light.svg',
  'site/index.html',
  'site/style.css',
  'site/main.js',
  'brand/styleguide.html'
];

requiredFiles.forEach(file => checkFileExists(file, 2.5));

// Check visualization file (either viz.html or inside index.html)
const vizExists = fs.existsSync(resolvePath('site/viz.html'));
report.checks['site/viz.html'] = vizExists;
if (!vizExists) {
  // Check if index.html might contain it
  if (fs.existsSync(resolvePath('site/index.html'))) {
    const indexContent = fs.readFileSync(resolvePath('site/index.html'), 'utf8');
    if (!indexContent.includes('<canvas') && !indexContent.includes('viz') && !indexContent.includes('d3') && !indexContent.includes('chart')) {
       report.score -= 5;
       report.deductions.push('Missing visualization (no site/viz.html and no canvas/chart found in index.html) (-5 pts)');
    }
  } else {
    report.score -= 5;
    report.deductions.push('Missing visualization (-5 pts)');
  }
}

// 2. Check site/style.css for hardcoded hex colors
if (fs.existsSync(resolvePath('site/style.css'))) {
  const css = fs.readFileSync(resolvePath('site/style.css'), 'utf8');
  // Simple regex for hex colors, but we should ignore comments if possible, but let's just do a basic check
  // Ignore CSS variables like --color: #fff
  // We want to find cases where properties use #fff instead of var()
  // A regex that matches #[0-9a-fA-F]{3,6} not immediately preceded by a variable declaration
  const lines = css.split('\n');
  let hexCount = 0;
  lines.forEach(line => {
    // Ignore custom property definitions like --something: #hex
    if (!line.includes('--') && /#[0-9a-fA-F]{3,6}\b/.test(line)) {
      hexCount++;
    }
  });

  if (hexCount > 0) {
    report.score -= 5;
    report.deductions.push(`Found hardcoded hex colors in site/style.css (${hexCount} instances) (-5 pts)`);
    report.checks['no_hardcoded_hex'] = false;
  } else {
    report.checks['no_hardcoded_hex'] = true;
  }
}

// 3. Check for broken links/images in site/index.html
if (fs.existsSync(resolvePath('site/index.html'))) {
  const html = fs.readFileSync(resolvePath('site/index.html'), 'utf8');
  // Very basic regex for href="xxx" or src="xxx"
  const links = [...html.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
  const srcs = [...html.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
  
  let brokenCount = 0;
  [...links, ...srcs].forEach(link => {
    if (link.startsWith('http') || link.startsWith('#') || link.startsWith('mailto:')) return;
    // local file check
    const localPath = path.join(runFolder, 'site', link);
    if (!fs.existsSync(localPath)) {
      brokenCount++;
    }
  });

  if (brokenCount > 0) {
    report.score -= 5;
    report.deductions.push(`Found broken links/images in site/index.html (${brokenCount} instances) (-5 pts)`);
    report.checks['no_broken_links'] = false;
  } else {
    report.checks['no_broken_links'] = true;
  }
}

// 4. Check if logo-animated.html works (basic sanity check)
if (fs.existsSync(resolvePath('brand/logo-animated.html'))) {
  const html = fs.readFileSync(resolvePath('brand/logo-animated.html'), 'utf8');
  if (!html.includes('<style') && !html.includes('<svg') && !html.includes('<animate')) {
    report.score -= 2.5;
    report.deductions.push('brand/logo-animated.html seems invalid (missing style/svg) (-2.5 pts)');
    report.checks['logo_animated_valid'] = false;
  } else {
    report.checks['logo_animated_valid'] = true;
  }
}

// Check Phase 6 (Wildcards)
const wildcards = [
  'brand/background.html',
  'brand/configurator.html',
  'brand/intro.html',
  'brand/generative-logo.html'
];

let wildcardCount = 0;
wildcards.forEach(wc => {
  if (fs.existsSync(resolvePath(wc))) wildcardCount++;
});
report.checks['wildcard_completed'] = wildcardCount > 0;
if (wildcardCount === 0) {
  // It's bonus in the TASKS, but we'll deduct from base or just flag it
  report.deductions.push('No wildcard tasks completed (0 bonus pts)');
} else {
  report.score += 5 * wildcardCount; // bonus
}

report.score = Math.max(0, report.score); // don't go below 0

fs.writeFileSync(path.join(runFolder, 'validation-report.json'), JSON.stringify(report, null, 2));
console.log(`Validation complete. Score: ${report.score}. Report saved to ${path.join(runFolder, 'validation-report.json')}`);
