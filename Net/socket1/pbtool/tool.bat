@echo off
if exist out rd /s /q out
mkdir out
:input
cls
set input=:
set /p input= 拖入要解析的文件夹：
set "input=%input:"=%"
if "%input%"==":" goto input
if not exist "%input%" goto input
for %%i in ("%input%") do if /i "%%~di"==%%i goto input
pushd %cd%
cd /d "%input%">nul 2>nul || exit
set cur_dir=%cd%
popd
set /a num = 0
for /f "delims=" %%i in ('dir /b /a-d /s "%input%"') do ( pbjs -t commonjs %%~dpi%%~nxi > out/%%~ni.js )
pause
