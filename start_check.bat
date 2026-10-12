@echo off
cd C:\mockups_dashboard
echo Iniciando Vite...
echo.
npx vite dev --port 5173 > vite.log 2>&1 &
echo Vite iniciado en segundo plano
timeout 5
echo.
echo Verificando si el servidor esta corriendo...
curl -s -o nul -w "%%http_code%%" http://localhost:5173/ | find "200" && echo. || echo.
echo.
echo Presiona Ctrl+C para detener o espera...
timeout >0