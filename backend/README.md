# Backend - Open Source Courses

API en Node.js + Express + TypeScript + Sequelize (MySQL) para gestionar cursos, assessments y resultados de evaluaciones.

## Requisitos
- Node.js >= 18
- PNPM (recomendado) o npm
- MySQL 8.x (o compatible)

## Variables de Entorno (.env)
Crea un archivo `.env` en `backend/` basado en `.env.example`:
```
DB_NAME=courses
DB_USER=root
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=3306
PORT=4000
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=una_clave_segura
```

## Instalación
Desde la carpeta `backend/`:
```bash
pnpm install
```

## Scripts principales
```bash
pnpm dev           # Desarrollo con reload
pnpm build         # Compilar a dist/
pnpm start         # Ejecutar compilado
pnpm seed          # Recrea esquema + datos iniciales (destruye datos previos)
pnpm db:sync       # Sincroniza todas las tablas (global, alter, sin borrar datos)
pnpm sync:users    # Sincroniza SOLO tabla users
pnpm sync:results  # Sincroniza tablas assessment_results y detalle
pnpm sync:all      # Sincroniza todas las tablas (alter, sin borrar datos)
```

## Flujo rápido de desarrollo
1. Configura `.env`.
2. Ejecuta MySQL y crea la base (si no existe):
   ```sql
   CREATE DATABASE IF NOT EXISTS courses CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. (Elige UNO de estos) Crear tablas:
   - Opción A (no destructivo):
     ```bash
     pnpm db:sync    # o pnpm sync:all
     ```
   - Opción B (reset + datos demo, DESTRUCTIVO):
     ```bash
     pnpm seed
     ```
4. Levanta el servidor:
   ```bash
   pnpm dev
   ```
5. Prueba healthcheck: `GET http://localhost:4000/ping` -> `{ "message": "pong", "db": "ok|pending" }`

## Datos insertados por el seed
- Categorías: Programación Frontend / Programación Backend
- Curso principal: "Desarrollo Fullstack" con un Assessment y 10 preguntas (5 por categoría)
- Cursos adicionales sin assessment: "Desarrollo Frontend" y "Desarrollo Backend"

## Estructura de carpetas (principal)
```
src/
  server.ts                # Configuración Express + montaje de rutas
  models/                  # Definiciones Sequelize
  controllers/             # Controladores de dominio
  routes/                  # Definición de endpoints
  middleware/              # auth & error handler
  utils/                   # helpers (asyncHandler)
  seed/initialSeed.ts      # Script de seeding
  scripts/                 # sync scripts de tablas
```

## Rutas (Resumen)
Health:
- GET /ping

Auth:
- POST /auth/register
- POST /auth/login
- GET  /auth/me
- POST /auth/logout

Cursos:
- GET /courses
- GET /courses/:id -> Detalle no implementado en front

Assessments:
- GET  /assessments/:id
- POST /assessments/:id/submit
- GET  /assessments/:id/results (?userId= opcional) -> Listado no implementado en front
- GET  /assessments/result/detail/:id

## Detalles de submit
POST /assessments/:id/submit
Payload ejemplo:
```json
{
  "userId": 1,
  "answers": [
    { "questionId": 3, "answerId": 11 },
    { "questionId": 4, "answerId": 15 }
  ]
}
```
Respuesta:
```json
{ "resultId": 5, "score": 8, "totalQuestions": 10 }
```

## Resultado detallado
GET /assessments/result/detail/:id
Devuelve:
```json
{
  "result": { "id": 5, "assessmentId": 1, "score": 8, ... },
  "detail": [ { "questionId": 3, "isCorrect": true, ... } ],
  "categories": [ { "categoryId": 1, "categoryName": "Programación Frontend", "correct": 4, "incorrect": 1, "total": 5 } ]
}
```

## Creación / sincronización de tablas
Escenarios:
- Cambias un solo campo del modelo User: `pnpm sync:users`
- Añades modelos de resultados: `pnpm sync:results`
- Ajustes generales (sin borrar datos): `pnpm sync:all`
- Reset completo + datos demo: `pnpm seed`

`db:sync` y `sync:*` usan `Model.sync({ alter: true })` (intenta aplicar cambios sin truncar). `seed` hace `sync({ force: true })` internamente (borra y recrea todo) y luego inserta datos demo.

Advertencias:
- Usa `seed` solo en entornos de desarrollo o para un reset controlado.
- `alter` es heurístico; para producción real conviene migraciones (umzug / sequelize-cli).

## Buenas prácticas implementadas
- Separación de capas (controllers / routes / middleware)
- Manejo centralizado de errores (`errorHandler`)
- Hash de contraseñas con bcrypt
- JWT simple en cookie httpOnly
- Snapshot de respuestas por assessment (tabla assessment_result_questions)

## Licencia
MIT

