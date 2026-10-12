@echo off
title Dashboard QoS - Modo Desarrollo
cd C:\mockups_dashboard
:retry
echo Iniciando servidor Vite en el puerto 5173...
timeout /t 2 /nobreak > nul
npx vite dev --port 5173 > .\vite.log 2>&1
if errorlevel 1 (
    echo Error iniciando Vite, reintentando en 5 segundos...
    timeout /t 5 /nobreak > nul
    goto retry
)