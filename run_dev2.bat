@echo off
cd C:\mockups_dashboard
title Dashboard QoS - Vite Dev Server
echo.
echo Iniciando servidor de desarrollo Vite...
echo.
echo Puerto 5173...
echo.
echo.
npx vite dev --port 5173 > vite_output.txt 2>&1 &
echo.
echo Servidor iniciado en segundo plano.
echo.
echo Para ver la salida, ejecuta: type vite_output.txt
echo.
timeout /t 5 /nobreak > nul
echo.
echo Presiona cualquier tecla para continuar o espera el timeout...
timeout /t 10 /nobreak > nul