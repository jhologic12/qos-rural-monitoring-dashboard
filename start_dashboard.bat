@echo off
cd C:\mockups_dashboard
echo.
echo Iniciando Dashboard QoS...
echo.
echo Puerto 5173...
echo.
echo.
start "" cmd /C "npx vite dev --port 5173" >NUL 2>&1
timeout 10
echo.
echo Verificando si el servidor esta corriendo...
echo.
curl -s -m 3 http://localhost:5173/ >NUL && echo "Dashboard accesible en http://localhost:5173" || echo "Esperando inicio del servidor..."
echo.
timeout /t 5 /nobreak >nul
echo.
echo Dashboard QoS listo para usar.
echo.
timeout /t 5 /nobreak >nul