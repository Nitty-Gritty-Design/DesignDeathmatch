@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo   DesignDeathmatch - VEKTRA Benchmark Run Setup
echo ===================================================
echo.

:: Prompt the user for the model name
set /p MODEL_NAME="Enter the name of the LLM to benchmark (e.g., GPT-4o, Claude-3.5-Sonnet): "

:: Check if the input is empty
if "!MODEL_NAME!"=="" (
    echo.
    echo ERROR: Model name cannot be empty.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

:: Replace spaces with underscores for a safe folder name
set SAFE_MODEL_NAME=!MODEL_NAME: =_!

:: Define the isolated sandbox path
:: This creates the folder outside of DesignDeathmatch to prevent the LLM from reading the rubric
set RUNS_BASE_DIR=..\DesignDeathmatch_Runs
set MODEL_DIR=!RUNS_BASE_DIR!\!SAFE_MODEL_NAME!
set WORKSPACE_DIR=!MODEL_DIR!\VEKTRA

echo.
echo Sandboxing environment...

:: Check if folder already exists
if exist "!WORKSPACE_DIR!" (
    echo.
    echo ERROR: The workspace '!WORKSPACE_DIR!' already exists. 
    echo Please delete it or choose a different model name.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

:: Create the nested directory structure
mkdir "!WORKSPACE_DIR!"

:: Copy ONLY the files meant for the model (omitting README and SCORING)
echo Copying framework files into the isolated workspace...
copy "BRIEF.md" "!WORKSPACE_DIR!\BRIEF.md" >nul
copy "DESIGN.md" "!WORKSPACE_DIR!\DESIGN.md" >nul
copy "RULES.md" "!WORKSPACE_DIR!\RULES.md" >nul
copy "TASKS.md" "!WORKSPACE_DIR!\TASKS.md" >nul

:: Convert relative path to absolute path for easy reading
for %%i in ("!WORKSPACE_DIR!") do set ABS_WORKSPACE_DIR=%%~fi

echo.
echo ===================================================
echo [SUCCESS] Isolated setup complete!
echo ===================================================
echo.
echo 1. In VS Code, go to File ^> Open Folder...
echo 2. Open this EXACT isolated directory:
echo    !ABS_WORKSPACE_DIR!
echo 3. Make sure the model is selected in Kilo.
echo 4. Send the model this EXACT prompt to start:
echo.
echo ---------------------------------------------------
echo Read BRIEF.md, DESIGN.md, TASKS.md, and RULES.md in that order.
echo Then begin executing the tasks. Do not ask for clarification —
echo invent what is not specified and proceed. Update TASKS.md checkboxes
echo as you complete each item. Create RUNLOG.md as your final act.
echo ---------------------------------------------------
echo.
pause
