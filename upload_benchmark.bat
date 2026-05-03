@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo   DesignDeathmatch - Upload Benchmark Runs
echo ===================================================
echo.

set DOCS_RUNS=%~dp0docs\runs
cd /d "%~dp0"

echo Checking for changes...
git status --porcelain docs > temp_status.txt

set STATUS_OUT=
for /f "delims=" %%A in (temp_status.txt) do set STATUS_OUT=%%A

if "!STATUS_OUT!"=="" (
    echo No new or modified runs found.
    del temp_status.txt
    
    exit /b 0
)

echo.
echo Changes detected. Staging...
git add docs

echo Committing...
git commit -m "docs: update benchmark runs and showcase"

echo Pushing to repository...
git push origin main

echo.
echo ===================================================
echo [SUCCESS] Upload complete!
echo ===================================================
echo.

del temp_status.txt

