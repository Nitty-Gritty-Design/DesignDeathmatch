@echo off
echo ===================================================
echo   DesignDeathmatch - Complete Processing Pipeline
echo ===================================================
echo.
echo This master script runs all necessary steps to process,
echo validate, and upload new benchmark results.
echo.

echo ---------------------------------------------------
echo Step 1/4: Copying new benchmark runs into the repository
echo ---------------------------------------------------
call copy_runs.bat

echo.
echo ---------------------------------------------------
echo Step 2/4: Running automated validation on all runs
echo ---------------------------------------------------
for /d %%D in (docs\runs\*) do (
    if exist "%%D\VEKTRA\v2" (
        echo Validating %%~nxD [V2]...
        node validate_run.js "%%D\VEKTRA\v2"
    )
    if exist "%%D\VEKTRA" (
        echo Validating %%~nxD [V1]...
        node validate_run.js "%%D\VEKTRA"
    )
)

echo.
echo ---------------------------------------------------
echo Step 3/4: Updating the showcase gallery data
echo ---------------------------------------------------
call sync_showcase.bat

echo.
echo ---------------------------------------------------
echo Step 4/4: Committing and pushing to GitHub
echo ---------------------------------------------------
call upload_benchmark.bat

echo.
echo ===================================================
echo   Pipeline Complete!
echo ===================================================