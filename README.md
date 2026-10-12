# 🌐 QoS Rural Monitoring Dashboard UI/UX

> **Proyecto de Ingeniería II (Código 202337121) — Fase 3: Gestión del Proyecto**
> **Universidad Nacional Abierta y a Distancia (UNAD)**
> **Grupo:** 202337121_29

---

## 📋 Descripción del Proyecto

Prototipo de interfaz gráfica (Dashboard UI/UX) desarrollado para el **Sistema de Monitoreo Preventivo de Calidad de Servicio (QoS)** orientado a instituciones educativas rurales en Colombia.

La solución busca reducir la brecha digital y la complejidad técnica, proporcionando un entorno de visualización intuitivo con **presupuesto \$0** mediante software libre y simulación sobre **GNS3** y **MikroTik RouterOS**.

> **Estado actual:** prototipo de frontend funcionando con datos simulados (mock). La integración con el backend (Python + PostgreSQL) se realizará en una fase posterior.

---

## ✨ Características Principales

- 🟢 **Semáforo Operativo Visual (QoS):** Clasificación automática del estado de la red en **Óptimo**, **Degradado** y **Crítico** según umbrales técnicos de latencia y jitter.
- ⚡ **Telemetría en Tiempo Real:** Despliegue de latencia promedio, jitter, porcentaje de pérdida de paquetes y utilización de ancho de banda SNMP.
- 📈 **Gráficos de Tendencia Temporal:** Gráfico de series temporales con líneas de umbral preventivo (50 ms) y crítico (80 ms).
- 🔒 **Privacidad por Diseño (_Privacy by Design_):** Monitoreo limitado estrictamente a telemetría de infraestructura en direcciones IP privadas, sin inspección de contenido ni captura de datos personales.
- 📊 **Tabla de Auditoría e Histórico:** Registro de eventos de degradación almacenados para consulta y seguimiento técnico.

---

## 🚀 Tecnologías Utilizadas

- **Frontend:** React + TypeScript + Vite, Tailwind CSS.
- **Visualización de Datos:** Apache ECharts.
- **Gestión de datos en cliente:** TanStack Query (con capa de servicios y datos mock intercambiables).
- **Entorno de Simulación:** GNS3 + MikroTik RouterOS.
- **Base de Datos & Backend (fase siguiente):** PostgreSQL + Python (scripts ICMP/SNMP).

---

## 🎯 Historias de Usuario Cubiertas (Product Backlog)

Este prototipo UI/UX valida los Criterios de Aceptación (UAT) de las siguientes Historias de Usuario:

| Historia de Usuario | Descripción / Requerimiento                                            |
| :------------------ | :--------------------------------------------------------------------- |
| **US-04 (Must)**    | Visualización de Métricas QoS (Latencia, Jitter, Pérdida de paquetes). |
| **US-05 (Must)**    | Clasificación del Estado Operativo (Óptimo, Degradado, Crítico).       |
| **US-06 (Must)**    | Almacenamiento e Histórico de Eventos en PostgreSQL.                   |
| **US-07 (Must)**    | Dashboard Integrado con las 5 métricas principales.                    |
| **US-08 (Should)**  | Alertas Tempranas por Degradación Preventiva.                          |
| **US-10 (Should)**  | Consulta de Tendencias y Reportes Básicos.                             |
| **US-11 (Must)**    | Garantía de Privacidad y Uso Exclusivo de IP Privadas.                 |

---

## 👥 Equipo de Desarrollo (Scrum Team)

- **Product Owner:** Eliot Aress Blanco Colmenares
- **Scrum Master:** Jhon Alexander Ospino Figueroa
- **Lead UI/UX (SDT3):** Edwin Porras Molina
- **Software Development Team (SDT1 & SDT2):** Víctor Orduz, Rolando Rodríguez

---

## 🛠️ Instrucciones de Uso Rápido

1. Clona el repositorio:

```bash
   git clone https://github.com/jhologic12/qos-rural-monitoring-dashboard.git
   cd qos-rural-monitoring-dashboard
```

2. Instala las dependencias:

```bash
   npm install
```

3. Inicia el servidor de desarrollo:

```bash
   npm run dev
```

4. Abre el navegador en `http://localhost:5173`.

5. (Opcional) Genera la versión de producción:

```bash
   npm run build
   npm run preview
```

### Datos simulados y backend

Por defecto el dashboard usa datos de relleno (mock). Para conectarlo a un backend real, crea un archivo `.env` con:

```
VITE_USE_MOCK=false
```

y expón los endpoints `/api/qos/*` (métricas, serie de tiempo, nodos y eventos).
