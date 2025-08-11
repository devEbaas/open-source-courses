# Frontend - Open Source Courses

Aplicación Next.js (App Router) que consume la API del backend para registro, login, listado de cursos, presentación de assessment, envío de respuestas y visualización de resultados.

## Stack
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios (HTTP)
- jsPDF (exportar resultados / certificado PDF futuro)

## Requisitos
- Node.js >= 18
- PNPM (recomendado) o npm
- Backend corriendo (por defecto en http://localhost:4000)

## Variables de entorno
Crea `.env.local` en `frontend/` (ejemplo):
```
NEXT_PUBLIC_API_BASE=http://localhost:4000
NEXT_PUBLIC_API_TIMEOUT=10000
```
`NEXT_PUBLIC_` es obligatorio para exponer variables al navegador.

## Instalación
```bash
pnpm install
```

## Scripts
```bash
pnpm dev      # Desarrollo (http://localhost:3000)
pnpm build    # Build producción
pnpm start    # Servir build
pnpm lint     # Linter
```

## Estructura principal
```
frontend/
  app/
    page.tsx                     # Home / landing
    login/page.tsx               # Login de usuario
    register/page.tsx            # Registro
    courses/page.tsx             # Listado de cursos
    assessment/[assessment]/page.tsx  # Vista de assessment (preguntas)
    results/[result]/page.tsx    # Detalle de resultado
  components/                    # Componentes reutilizables
  styles / globals.css           # Estilos globales
  README.md
```

## Flujo funcional
1. Registro / Login: llama al backend (/auth/register, /auth/login) y almacena cookie httpOnly (token manejado por backend) + datos básicos en estado local.
2. Listar cursos: GET /courses.
3. Ver assessment: GET /assessments/:id (devuelve 10 preguntas máximo: 5 por categoría).
4. Enviar respuestas: POST /assessments/:id/submit => obtiene `resultId`.
5. Mostrar resultado: GET /assessments/result/detail/:id => muestra score, desglose por categoría y preguntas.
6. (Opcional) Descargar PDF (jsPDF) con resumen (pendiente de implementación final si aplica).

## Convenciones de código
- Componentes en `components/` con PascalCase.
- Hooks personalizados en `app/**/hooks/` (ej: useResult, useRegister) o `hooks/` global si se generaliza.
- Peticiones HTTP centralizadas para reutilizar `axios.create` con baseURL = `process.env.NEXT_PUBLIC_API_BASE`.

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000',
  withCredentials: true,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 10000)
})
```

## Manejo de Auth
El backend establece cookie httpOnly con el token JWT. Para proteger rutas client-side:
- Verificar usuario en `GET /auth/me` al montar la app o en un layout protegido.
- Guardar user en un contexto (ej: `AuthContext`).

## Tailwind
Configurado vía `tailwind.config.ts` y `globals.css` con las directivas base.

## Rutas (frontend)
- /            (home)
- /login
- /register
- /courses
- /assessment/[assessmentId]
- /results/[resultId]

## Desarrollo conjunto con backend
Levantar ambos:
```bash
# Terminal 1
cd backend && pnpm dev
# Terminal 2
cd frontend && pnpm dev
```
Asegúrate que CORS_ORIGIN en backend contenga `http://localhost:3000`.

## Errores comunes
- 401 en /auth/me: cookie no enviada -> verificar `withCredentials` en axios y `credentials: true` en CORS backend.
- 404 en assessment: ID inválido o seed no ejecutado.
- 0 preguntas: seed no insertó preguntas (re-ejecutar `pnpm seed` backend).

## Licencia
MIT.
