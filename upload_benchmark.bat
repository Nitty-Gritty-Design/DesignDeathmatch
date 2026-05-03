@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo   DesignDeathmatch - Upload Benchmark Runs
echo ===================================================
echo.

set DOCS_RUNS=%~dp0docs\runs
cd /d "%~dp0"

echo Checking for changes in docs/runs...
git status --porcelain docs/runs > temp_status.txt

set STATUS_OUT=
for /f "delims=" %%A in (temp_status.txt) do set STATUS_OUT=%%A

if "!STATUS_OUT!"=="" (
    echo No new or modified runs found in docs/runs.
    del temp_status.txt
    pause
    exit /b 0
)

echo.
echo Changes detected in docs/runs. Staging...
git add docs/runs

echo Committing...
git commit -m "docs: add new benchmark runs to showcase"

echo Pushing to repository...
git push

echo.
echo ===================================================
echo [SUCCESS] Upload complete!
echo ===================================================
echo.

del temp_status.txt
pause
