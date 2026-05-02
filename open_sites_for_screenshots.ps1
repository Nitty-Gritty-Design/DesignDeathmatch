# Open all LLM V2 sites in browser for screenshot capture
# Run this script, then manually take screenshots of each page

$baseUrl = "file:///" + $PSScriptRoot.Replace("\", "/") + "/"

$sites = @(
    "runs/claude-sonnet-4.6-thinking/VEKTRA/v2/index.html",
    "runs/gemini-3-flash/VEKTRA/v2/site/index_v2.html",
    "runs/gemini-3.1-pro/VEKTRA/v2/site/index.html",
    "runs/laguna-m.1/VEKTRA/v2/site/index.html",
    "runs/Ling-2.6-1T/VEKTRA/v2/site/index.html",
    "runs/owl-alpha/VEKTRA/v2/site/index.html",
    "runs/tencent-hy3-preview/VEKTRA/v2/site/index.html"
)

foreach ($site in $sites) {
    $fullUrl = $baseUrl + $site
    Write-Host "Opening: $fullUrl"
    Start-Process $fullUrl
    Start-Sleep -Seconds 2  # Wait a bit between openings
}

Write-Host "All sites opened. Take screenshots and save as:"
Write-Host "- Thumbnails: docs/assets/thumbnails/[model-id].jpg (small, ~300x200)"
Write-Host "- Screenshots: docs/assets/screenshots/[model-id]-full.jpg (full page)"