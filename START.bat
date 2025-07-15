@echo off
chcp 65001 > nul
echo ============================================
echo   KCPO.US TeamSpeak Web Project - All In One
echo ============================================
echo.

echo [1/4] Installing frontend dependencies...
cd "%~dp0frontend"
IF NOT EXIST node_modules (
    call npm install
) ELSE (
    echo Frontend dependencies already installed.
)

echo [2/4] Installing backend dependencies...
cd "%~dp0backend"
IF NOT EXIST node_modules (
    echo Installing required backend dependencies...
    call npm install express cors helmet compression morgan dotenv node-cron winston ts3-nodejs-library nodemailer joi rate-limiter-flexible
    call npm install -D @types/node @types/express @types/cors @types/compression @types/morgan @types/node-cron @types/nodemailer typescript tsx
) ELSE (
    echo Backend dependencies already installed.
)

echo [3/4] Starting frontend server...
cd "%~dp0frontend"
start cmd /k "title Frontend Server && npm run dev"

echo [4/4] Starting backend server...
cd "%~dp0backend"
start cmd /k "title Backend Server && npm run dev"

echo.
echo All done! Your servers should be running:
echo - Frontend: http://localhost:5173 (Vite default)
echo - Backend: http://localhost:3001
echo.
echo Press any key to exit this window.
pause
