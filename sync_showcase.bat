@echo off
REM DesignDeathmatch Showcase Sync Script
REM This script copies benchmark runs and generates thumbnails for the docs

echo ===================================================
echo   DesignDeathmatch Showcase Sync
echo ===================================================
echo.

REM Define paths
set RUNS_SOURCE=F:\_software\_AI\DesignDeathmatch_Runs
set PROJECT_ROOT=%~dp0
set SHOWCASE_ROOT=%PROJECT_ROOT%docs

echo Source runs: %RUNS_SOURCE%
echo Project root: %PROJECT_ROOT%
echo.

REM Check if source exists
if not exist "%RUNS_SOURCE%" (
    echo ERROR: Runs source directory not found!
    echo Please update RUNS_SOURCE in this script.
    pause
    exit /b 1
)

REM List available models
echo Available models in runs:
echo --------------------------------
dir "%RUNS_SOURCE%" /AD /B
echo --------------------------------
echo.

echo To sync specific runs, edit showcase-config.json manually.
echo.
echo The runs folder is stored separately at: %RUNS_SOURCE%
echo This allows for easy updates without large git commits.
echo.

echo Showcase structure created:
echo   - docs/index.html (gallery)
echo   - docs/preview.html (detail view)
echo   - docs/css/style.css
echo   - docs/js/main.js
echo   - docs/js/preview.js
echo   - showcase-config.json (data config)
echo.

echo Next steps:
echo   1. Take screenshots of each run's site/index.html
echo   2. Save thumbnails to docs/assets/thumbnails/
echo   3. Save full screenshots to docs/assets/screenshots/
echo   4. Commit and push to GitHub
echo.

pause