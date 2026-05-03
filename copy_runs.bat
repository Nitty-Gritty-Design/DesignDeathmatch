@echo off
REM Batch script to copy DesignDeathmatch runs folder from source to repo

set SOURCE_DIR=F:\_software\_AI\DesignDeathmatch_Runs
set DEST_DIR=%~dp0docs\runs

echo Copying runs from %SOURCE_DIR% to %DEST_DIR%

if not exist "%SOURCE_DIR%" (
    echo Source directory does not exist: %SOURCE_DIR%
    pause
    exit /b 1
)

if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"

robocopy "%SOURCE_DIR%" "%DEST_DIR%" /E /NFL /NDL /NJH /NJS

echo Copy complete.
pause