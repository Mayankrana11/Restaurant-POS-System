@echo off
chcp 65001 >nul
title Haru no Yorokobi – Full Stack Launcher

echo ==========================================
echo Starting Haru no Yorokobi (Backend + Frontend)
echo ==========================================

REM Go to project root (where run.bat is located)
cd /d "%~dp0"

REM ================= BACKEND =================
echo.
echo Starting Backend (Node + Express)...

cd backend
start cmd /k "node server.js"

REM Give backend time to boot
timeout /t 3 >nul


REM ================= FRONTEND =================
echo.
echo Starting Frontend (Vite + React)...

cd ..
cd frontend
start cmd /k "npm run dev"

REM Give frontend time to boot
timeout /t 3 >nul

REM Open backend URLs
@REM start http://localhost:5000/
@REM start http://localhost:5000/api/menu
@REM start http://localhost:5000/images/nitamago_ramen.jpg
REM Open frontend
start http://localhost:5173/
start http://localhost:5173/dashboard

echo.
echo ==========================================
echo All services launched successfully 🚀
echo ==========================================
pause
