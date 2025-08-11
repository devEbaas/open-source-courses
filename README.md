# courses-open-source

Monorepositorio básico para una plataforma open source de cursos en línea. Incluye un frontend en Next.js (App Router, TypeScript, Tailwind CSS) y un backend en Express con CORS y endpoints REST.

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

Copiar cada `.env.example` a `.env` y ajustar.

Frontend (`frontend/.env`):
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

Backend (`backend/.env`):
```
PORT=4000
CORS_ORIGIN=http://localhost:3000
# Opción A (variables separadas):
DB_HOST=localhost
DB_PORT=3306
DB_NAME=courses
DB_USER=root
DB_PASSWORD=tu_clave
# Opción B (una sola):
# DATABASE_URL=mysql://user:pass@host:3306/courses

JWT_SECRET=algún_valor_seguro
```

Notas:
- Si usas `DATABASE_URL`, no necesitas las variables separadas.
- Sequelize crea tablas, PERO no crea la base de datos: debes crear el schema antes.

## Instalación

Desde la raíz del monorepo:

```
pnpm install   # (o npm install)
```

Esto instalará dependencias en `frontend` y `backend` (workspaces). Alternativamente puedes entrar a cada carpeta y ejecutar la instalación por separado.

### Crear la base de datos (una sola vez)

Asegúrate de tener MySQL/MariaDB en marcha y crea el schema:
```
CREATE DATABASE courses CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Configura luego las variables de entorno del backend apuntando a ese schema.

## Desarrollo local

En dos terminales (recomendado):

Terminal 1 (backend):
```
cd backend
pnpm dev
```

Terminal 2 (frontend):
```
cd frontend
pnpm dev
```

URLs por defecto:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

### Inicializar tablas y datos

Tienes dos enfoques (ejecutar dentro de `backend/`):

1. Sin destruir datos (crea/ajusta tablas):
```
pnpm run db:sync
```
2. Destructivo (DROP + recreate + datos demo):
```
pnpm run seed
```

El seed inserta categorías, cursos, assessment, preguntas/respuestas y un usuario demo. Úsalo solo al inicio o cuando quieras resetear todo.

Resumen rápido:
- `db:sync` -> conserva datos (usa `sync` por tabla con `alter: true`).
- `seed` -> borra y recrea (usa `sync({ force: true })`).

## Producción (frontend y backend)

Backend (desde `backend/`):
```
pnpm build
pnpm start
```
Si es la primera vez en un entorno limpio y ya creaste la base de datos vacía:
```
pnpm run db:sync   # o pnpm run seed si quieres datos demo y no hay nada que conservar
```

Frontend (desde `frontend/`):
```
pnpm build
pnpm start
```

Verifica que `NEXT_PUBLIC_BACKEND_URL` apunte a la URL pública del backend en producción.

## Rutas incluidas (maquetas)

- `/` Landing Page
- `/register` Registro de estudiantes
- `/login` Login de estudiantes
- `/assessment` Assessment de 10 preguntas
- `/results` Resultados

El frontend usa el App Router de Next.js (layouts y pages en la carpeta `app/`) y Tailwind CSS para estilos responsivos. [^2]  
Si deseas crear un proyecto Next.js desde cero en otro contexto, `create-next-app` es la forma más sencilla. [^3]

## Backend

Stack / características:
- Express
- CORS (usa `CORS_ORIGIN` de .env)
- JSON parser
- Healthcheck: `GET /ping` -> `{ message: "pong", db: "ok|pending" }`
- Scripts utilitarios:
  - `db:sync` (sin destruir datos)
  - `seed` / `db:seed` (reset + datos demo)
  - `sync:all` (sync incremental por modelo – similar a `db:sync` pero explícito por tabla)

## Nota de despliegue

- Frontend: Vercel (root `frontend/`) con dominio personalizado.
- Backend: Render (servicio Node) + instancia MySQL gratuita. URL pública: https://courses.bekadev.online/
  - Crear schema manual antes del primer deploy.
  - Ejecutar `db:sync` o, si quieres datos demo, `seed` (solo una vez) localmente o mediante un job manual.
  - Evitar usar `seed` automáticamente en cada arranque en producción.

## Preguntas para la prueba técnica

Responde a continuación (deja cada respuesta bajo la pregunta correspondiente):

1. Describe tu enfoque para la planificación y el desarrollo de esta prueba técnica.

  - La primera fase de la planificación fue el análisis de requerimientos que se solicitaban para el cumplimiento exitoso del proyecto. Se planificó desde los requerimientos funcionales del sistema y sus flujos correspondientes hasta los requerimientos técnicos para poder realizar el desarrollo de la mejor manera posible.
  - Seguido de esto, se comenzó por el desarrollo de la estructura base del proyecto (frontend y backend) con ayuda de v0 de Vercel para agilizar el tiempo de desarrollo, obteniendo como resultado
  un proyecto base con lo mínimo indispensable para que el frontend y el backend pueda ejecutarse.
  - Seguido de esto se comenzó a realizar el desarrollo del backend, creación de modelos, controladores y rutas básicas para poder comenzar con su implementación en el frontend.
  - Al finalizar algunos endpoints, se procedió a implementar la funcionalidad en el frontend: crear las funciones para obtener datos de la API y manejarlas en el cliente, realizar login, registro, listado de cursos, contestar el assessment y mostrar los resultados obtenidos por el usuario.
  - Como penúltimo paso se procedió a agregarle una capa básica de autenticación para hacer el proyecto más completo.
  - Como último se procedió a corregir errores y aplicar mejoras en el código para poder mantener una buena estructura.
  - Como paso adicional se montó la app Frontend en Vercel

2. ¿Qué desafíos encontraste durante el desarrollo y cómo los resolviste?

  - Uno de los grandes desafíos era que no había desarrollado un proyecto Fullstack en un mismo repositorio, por lo cual no sabía exactamente cómo estructurar mis carpetas
  y cómo manejar las dependencias de cada uno de los proyectos. Tuve que investigar cuál era la mejor manera de organizar este proyecto y con ayuda de v0 pude crear la estructura 
  adecuada para poder desarrollar este proyecto.
  - Otro desafío que tuve es la experiencia limitada desarrollando en backend, puesto que estoy más enfocado en el desarrollo frontend. Había nociones que no conocía pero que fui aprendiendo en el transcurso del desarrollo de este proyecto, tales como estructura de carpetas, creación de controladores, rutas y configuración de base de datos. Pude realizar el backend gracias a la ayuda de la IA y de la documentación encontrada en internet.
  - De igual manera el tiempo fue un elemento que representó un desafío, pero gracias a la ayuda de v0 se pudo agilizar el desarrollo.

3. Explica las decisiones arquitectónicas clave que tomaste (por ejemplo, estructura de carpetas, elección de tecnologías).
 
  - Separé el proyecto en dos carpetas: `frontend` (para la parte visual) y `backend` (para la lógica y la base de datos). Así es más fácil entender y trabajar cada lado.
  - Elegí Next.js en el frontend porque permite crear páginas de manera más rápida y ya trae cosas listas como rutas y optimizaciones.
  - Usé Express en el backend porque es simple y directo para crear rutas y manejar peticiones.
  - Organicé el backend en partes claras (modelos, controladores, rutas y middlewares) para que cada elemento tenga su lugar y sea fácil de mantener.
  - Guardé los resultados de las evaluaciones en tablas separadas para poder ver después qué respondió cada usuario.
  - Añadí autenticación básica con tokens para que el usuario pueda registrarse, iniciar sesión y mantener su sesión.
  - Las variables de entorno permiten cambiar direcciones y credenciales sin tocar el código.
  - Mantengo la estructura sencilla pensando en poder agregar validaciones, pruebas o nuevas funciones más adelante sin tener que cambiarlo todo.
  - Seguridad básica: JWT en cookie httpOnly para reducir exposición del token en el navegador.

4. ¿Cómo probaste tu código? ¿Qué estrategias de prueba utilizaste?
 
  - Probé manualmente en el navegador los flujos principales: registro, login, listado de cursos, iniciar assessment, enviar respuestas y ver resultados.
  - Verifiqué en la pestaña Network los status codes y el JSON devuelto para asegurar que coincidía con lo esperado.
  - Agregué un test básico en el backend (Jest + Supertest) para comprobar que el endpoint `/ping` responde correctamente.
  - Añadí un test sencillo en el frontend (Vitest) para la función utilitaria `cn` que combina clases y evita duplicados.
  - Probé errores comunes: ID inválido, usuario no encontrado, credenciales incorrectas, asegurando respuestas claras.

5. ¿Qué mejoras o características adicionales agregarías si tuvieras más tiempo?

  - Funcional:
    - Más módulos de detalle (curso, historial de assessments del usuario).
    - Múltiples assessments por curso con tipos (diagnóstico, módulo, final).
    - Multilenguaje (i18n) para ampliar alcance.
    - Recomendaciones de cursos basadas en análisis de resultados con IA.
  - Técnico:
    - Migraciones formales en lugar de `sync` forzado para entornos productivos.
    - Cache / React Query para mejoras de rendimiento y menor tráfico.
    - Seguridad adicional: rate limiting, refresh tokens, mejores políticas de cookies.
    - Ampliar cobertura de tests (controladores, integración, componentes UI críticos).
  - UX / UI:
    - Tema claro/oscuro completo y branding consistente.
    - Accesibilidad (roles ARIA, focus visible, contraste).
    - SEO avanzado (meta dinámicas, Open Graph, sitemap, structured data).
  - Observabilidad:
    - Logging estructurado y métricas simples (latencia, errores) + healthchecks ampliados.
  - Documentación:
    - Swagger / OpenAPI para describir la API y facilitar colaboración.

6. Describe tu experiencia trabajando con React.js/Next.js (o la tecnología frontend elegida).

  - Trabajar con Next.js ha sido bastante cómodo para mí, debido a que ya tenía experiencia trabajando con esta tecnología y con React.
  - El desarrollo de las funcionalidades en frontend fue bastante rápido y sencillo; además Next.js ofrece varias características que permiten desarrollar de manera más fácil, como su router basado en la estructura de archivos. No necesitas configurar rutas manualmente: sólo creas las carpetas y los `page.tsx` dentro de `app`.
  - Otra característica muy buena es la implementación de rutas dinámicas (en el proyecto hay dos) que permiten crear vistas a las cuales les puedes pasar IDs; en mi caso me permitió crear las vistas de assessment y de resultados para traer preguntas y resultados por ID.
  - En resumen fue una experiencia bastante buena y sencilla, en parte por la experiencia desarrollando con esta tecnología y también por las características y beneficios que ofrece este framework.

7. ¿Cuál fue tu experiencia con el backend (Node.js/Express o PHP)?

 - En este caso mi experiencia fue un poco más compleja, debido a que con Node.js y Express había realizado solo pequeñas pruebas de concepto anteriormente. Hacer un backend funcional con rutas, controladores, middleware y modelos fue un gran reto personal y profesional para mí.
 - Desde el inicio estuve investigando, documentándome y buscando respuestas a las dudas sobre la implementación de estas tecnologías para un correcto desarrollo de un backend. Gracias a la documentación, algunos cursos y ayuda de IA pude completar el desarrollo de los endpoints de manera correcta; sin embargo, me queda como aprendizaje mejorar mis habilidades en esta área.
 - En cuanto a código como tal, no tuve muchos problemas, debido a que sigue siendo JavaScript, un lenguaje con el que ya tengo experiencia desarrollando.

8. ¿Cómo manejaste la gestión de estados en tu aplicación frontend?
 
  - Al inicio usé sólo `useState` local en cada página o componente para avanzar rápido.
  - Luego añadí un contexto sencillo para la sesión del usuario (datos básicos tras login) y evitar repetir props en varias vistas.
  - El resto de estados (formularios, respuestas del assessment) siguen siendo locales para mantener simplicidad.
  - No incorporé librerías más complejas (Redux, Zustand, React Query) porque el tamaño actual no lo requiere.
  - Mantenerlo ligero me permitió enfocarme en terminar las funciones principales sin sobre‑ingeniería.

9. Si utilizaste herramientas de IA como bolt.new o v0 by Vercel, explica por qué y cómo las usaste.
 
  - Usé v0 para acelerar el arranque del proyecto y generar una base funcional (páginas iniciales, algunos componentes y estructura).
  - Me ahorró tiempo en maquetado y estilos repetitivos, y preparó un backend básico para continuar.
  - Después ajusté manualmente rutas, autenticación, modelos, endpoints y la integración real con la base de datos.
  - La IA fue apoyo puntual; no definió el flujo de negocio ni las implementaciones.
  - Decidí limitar su uso a scaffolding: cuando necesito lógica específica o validaciones, las desarrollo yo.
  - Siempre revisé y edité el código generado antes de continuar para asegurar consistencia con los objetivos del proyecto.
  - Beneficio principal: menos tiempo en tareas repetitivas y más foco en la funcionalidad central.

10. ¿Qué aprendiste o reforzaste al completar esta prueba técnica?

  - Al completar esta prueba, comprendí mejor todo lo que implica desarrollar una aplicación web Fullstack, área con la que no estaba tan familiarizado porque mayormente he estado desarrollando en el frontend. Aprendí más sobre la creación de modelos, creación de controladores, manejo básico de sesión y sobre cómo manejar las rutas con sus respuestas en formato JSON.
  - Reforcé mis conocimientos en el desarrollo e implementación de un backend con Node.js y Express: creación de modelos, uso de relaciones, conexión a base de datos y configuración de variables de entorno.
  - En cuanto al desarrollo de la UI frontend, reforcé mis conocimientos sobre el uso de Next.js y los beneficios que ofrece para desarrollar interfaces de usuario de forma rápida, modular y limpia.
  - Sobre el uso de la IA, aprendí cómo puede agilizar la construcción de un prototipo base, minimizando el tiempo de configuración inicial. La utilicé sólo para arrancar la estructura, manteniendo control manual del resto.
  - De igual manera apredí a realizar el despliegue del Frontend en Vercel, asignando un Root Directory diferente al normal (debido a que son dos proyectos en el mismo repositorio) para el correcto despliegue y al final le puse mi dominio para que tenga una url más real.
