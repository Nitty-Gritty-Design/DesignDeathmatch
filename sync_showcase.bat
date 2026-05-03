@echo off
REM DesignDeathmatch Showcase Sync Script
REM This script generates the JSON configuration for the docs showcase

echo ===================================================
echo   DesignDeathmatch Showcase Sync
echo ===================================================
echo.

set PROJECT_ROOT=%~dp0
set SHOWCASE_ROOT=%PROJECT_ROOT%docs

echo Project root: %PROJECT_ROOT%
echo.

echo Running config generation script...
node generate_config.js

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to generate config.
    
    exit /b %errorlevel%
)

echo.
echo Showcase structure:
echo   - docs/index.html (gallery)
echo   - docs/preview.html (detail view)
echo   - docs/css/style.css
echo   - docs/js/main.js
echo   - docs/showcase-config.json (auto-generated config)
echo.

echo Next steps:
echo   1. Commit and push to GitHub using upload_benchmark.bat
echo.
