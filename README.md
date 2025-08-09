# courses-open-source

Monorepositorio básico para una plataforma open source de cursos en línea. Incluye un frontend en Next.js (App Router, TypeScript, Tailwind CSS) y un backend mínimo en Express con CORS y un endpoint de prueba.

## Estructura

\`\`\`
.
├─ frontend/         # Next.js 14 + TypeScript + Tailwind (App Router)
│  ├─ app/
│  ├─ components/
│  ├─ .env.example
│  └─ package.json
├─ backend/          # Node.js + Express
│  ├─ src/
│  ├─ .env.example
│  └─ package.json
├─ package.json      # Workspaces y scripts
└─ README.md
\`\`\`

## Requisitos

- Node.js 18+ (recomendado)
- npm 8+ (soporta workspaces)

## Variables de entorno

- `frontend/.env.example`:
  \`\`\`
  NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
  \`\`\`
- `backend/.env.example`:
  \`\`\`
  PORT=4000
  CORS_ORIGIN=http://localhost:3000
  \`\`\`

Copia cada `.env.example` a `.env` y ajusta si es necesario.

## Instalación

Desde la raíz del monorepo:

\`\`\`
npm install
\`\`\`

Esto instalará dependencias en `frontend` y `backend` gracias a npm workspaces.

## Desarrollo

Opción A (todo junto, dos procesos en paralelo):

\`\`\`
npm run dev
\`\`\`

Opción B (en dos terminales):

- Terminal 1:
  \`\`\`
  npm run dev -w backend
  \`\`\`
- Terminal 2:
  \`\`\`
  npm run dev -w frontend
  \`\`\`

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Producción (solo frontend)

\`\`\`
npm run build
npm run start
\`\`\`

Asegúrate de tener el backend corriendo en el host/puerto configurado por `NEXT_PUBLIC_BACKEND_URL`.

## Rutas incluidas (maquetas)

- `/` Landing Page
- `/register` Registro de estudiantes
- `/assessment` Assessment de 10 preguntas (estático)
- `/results` Resultados (datos ficticios)

El frontend usa el App Router de Next.js (layouts y pages en la carpeta `app/`) y Tailwind CSS para estilos responsivos. [^2]  
Si deseas crear un proyecto Next.js desde cero en otro contexto, `create-next-app` es la forma más sencilla. [^3]

## Backend

- Express con:
  - CORS (usa `CORS_ORIGIN` de .env)
  - JSON parser
  - `GET /ping` → `{ "message": "pong" }`

## Nota

Este repositorio es una base lista para implementar la lógica real después (autenticación, flujos de negocio, persistencia, etc.).
