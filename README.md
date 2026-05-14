# Vitalia Pro

Plataforma SaaS de gestión clínica para fisioterapeutas, centros de rehabilitación y clínicas de salud. Gestiona pacientes, agenda, facturación y analíticas desde un único dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06b6d4?logo=tailwindcss)

## Características

- **Dashboard** — KPIs en tiempo real: ingresos, pacientes activos, citas del día y adherencia al tratamiento. Gráfico de evolución de ingresos y alertas clínicas.
- **Pacientes** — Listado filtrable con vista grid/lista. Ficha individual con historial clínico, puntuación de recuperación, nivel de riesgo y progreso del plan de tratamiento.
- **Agenda** — Gestión de citas con filtros por fecha, terapeuta y especialidad. Vista detallada por cita con estado y ubicación.
- **Analíticas** — Gráficos interactivos de tendencia de ingresos, crecimiento de pacientes, tasa de cancelaciones y desglose por servicio. Filtro por rango de fechas y exportación.
- **Facturación** — Gestión de cobros con tres planes de suscripción (Starter / Professional / Enterprise).
- **Configuración** — Perfil de clínica, notificaciones, idioma y modo oscuro.
- **Landing page** — Hero animado, sección de features con comparativa antes/después, pricing interactivo con toggle mensual/anual, testimonios y FAQ.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router + Turbopack) |
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| Gráficos | Recharts |
| Componentes | Radix UI |
| Estado | Zustand |
| i18n | Hook `useT` con soporte multiidioma |

## Instalación

```bash
git clone https://github.com/Diegh0/vitaliaPro.git
cd vitaliaPro
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev          # Turbopack (por defecto)
npm run dev:webpack  # Webpack (fallback)
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # ESLint
```

## Estructura

```
app/
  page.tsx                    # Landing page
  dashboard/
    page.tsx                  # Dashboard principal
    patients/                 # Gestión de pacientes
    appointments/             # Agenda
    analytics/                # Analíticas
    billing/                  # Facturación
    settings/                 # Configuración
components/
  landing/                    # Secciones de la landing
  dashboard/                  # Componentes del dashboard
  charts/                     # Gráficos (Recharts)
  layout/                     # Sidebar, topbar
  ui/                         # Design system base
```

## Deploy

Desplegado en Vercel. Cada push a `main` genera un deploy automático.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Diegh0/vitaliaPro)
