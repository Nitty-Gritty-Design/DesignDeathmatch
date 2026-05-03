const fs = require('fs');
const path = require('path');

// This script is intended to be run by a GitHub Action
// It parses the issue body for a JSON score and updates docs/scores/

const issueBody = process.env.ISSUE_BODY;
const issueUser = process.env.ISSUE_USER;

if (!issueBody) {
  console.error('No issue body found in environment variable ISSUE_BODY');
  process.exit(1);
}

// Regex to find JSON block
const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
const match = issueBody.match(jsonRegex);

if (!match) {
  console.error('No JSON block found in issue body');
  process.exit(1);
}

let scoreData;
try {
  scoreData = JSON.parse(match[1]);
  console.log('Parsed score data for model:', scoreData.modelId);
} catch (e) {
  console.error('Failed to parse JSON block from issue body:', e.message);
  console.log('JSON block content was:', match[1]);
  process.exit(1);
}

if (!scoreData.modelId) {
  console.error('modelId is missing in score data JSON');
  process.exit(1);
}

// Sanitize modelId for filename - allowing dots to match directory names
const modelId = scoreData.modelId.replace(/[^a-z0-9.-]/gi, '_').toLowerCase();
console.log('Sanitized modelId:', modelId);
const scoreFile = path.join(__dirname, '..', 'docs', 'scores', `${modelId}.json`);

// Check if model exists in runs
const runsDir = path.join(__dirname, '..', 'docs', 'runs');
if (!fs.existsSync(path.join(runsDir, modelId))) {
  console.warn(`WARNING: modelId "${modelId}" not found in docs/runs/. This score might not be displayed in the showcase.`);
}

const userDir = path.join(__dirname, '..', 'docs', 'scores', modelId);
if (!fs.existsSync(userDir)) {
  fs.mkdirSync(userDir, { recursive: true });
}

const sanitizedUser = issueUser.replace(/[^a-z0-9-]/gi, '_').toLowerCase();
const userScoreFile = path.join(userDir, `${sanitizedUser}.json`);

fs.writeFileSync(userScoreFile, JSON.stringify({
  ...scoreData,
  user: issueUser,
  submittedAt: new Date().toISOString(),
  issueUrl: process.env.ISSUE_URL
}, null, 2));

console.log(`Successfully saved score for ${modelId} from ${issueUser} to ${userScoreFile}`);
