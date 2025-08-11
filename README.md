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

## Preguntas para la prueba técnica

Responde a continuación (deja cada respuesta bajo la pregunta correspondiente):

1. Describe tu enfoque para la planificación y el desarrollo de esta prueba técnica.

  - La primera fase de la planificación fue el análisis de requerimientos que se solicitaban para el cumplimiento exitoso del proyecto. Se planificó desde los requerimientos funcionales del sistema y sus flujos correspondientes hasta los requerimientos técnicos para poder realizar el desarrollo de la mejor manera posible.
  - Seguido de esto, se comenzó por el desarollo de la estructura base del proyecto (frontend y backend) con ayuda de v0 de vercel para agilizar el tiempo de desarrollo, obteniendo como resultado
  un proyecto base con lo mínimo indispensable para que el frontend y el backend pueda ejecutarse.
  - Seguido de esto se comenzó a realizar el desarrollo del backend, creación de modelos, controladores, rutas básicas para poder comenzar con su implementación en el frontend.
  - Al finalizar algunos endpoints, se procedió a implementar la funcionalidad en el frontend, crear las funciones para obtener datos de la API y manejarlas en el cliente, realizar login, registro, listado de cursos, contestar el assessment y los resultados obtenidos por el usuario
  - Como penúltimo paso se procedió a agregarle una capa básica de autenticación para hacer el proyecto más completo.
  - Como último se procedió a corregir errores y aplicar mejoras en el código para poder mantener una buena estructura.
  - Como paso adicional se montó la app Frontend en Vercel

2. ¿Qué desafíos encontraste durante el desarrollo y cómo los resolviste?

  - Uno de los grandes desafíos era que no había desarrollado un proyecto Fullstack en un mismo repositorio, por lo cual no sabía exactamente cómo estructurar mis carpetas
  y como manejar las dependencias de cada uno de los proyectos, por lo cual tuve que investigar cuál era la mejor manera de organizar este proyecto y con ayuda de v0 pude crear la estructura 
  adecuada para poder desarollar este proyecto.
  - Otro desafió que tuve es la experiencia que tengo desarollando en backend, puesto que estoy más enfocado con el desarollo Frontend, habia nociones que no conocía pero que fui aprendiendo en el transcurso del desarollo de este proyecto, tales como estructura de carpetas, funciones específicas de backend como la creación de controladores, rutas, configuración de base de datos etc. Pude lograr realizar el backend gracias a la ayuda de la IA y de la documentación encontrada en internet.
  - De igual manera el tiempo fue un elemento que fue un desafío, pero sin embargo gracias a la ayuda de v0 se pudo agilizar el desarollo.

3. Explica las decisiones arquitectónicas clave que tomaste (por ejemplo, estructura de carpetas, elección de tecnologías).
 
  - Separé el proyecto en dos carpetas: `frontend` (para la parte visual) y `backend` (para la lógica y la base de datos). Así es más fácil entender y trabajar cada lado.
  - Elegí Next.js en el frontend porque permite crear páginas de manera más rápida y ya trae cosas listas como rutas y optimizaciones.
  - Usé Express en el backend porque es simple y directo para crear rutas y manejar peticiones.
  - Organicé el backend en partes claras (modelos, controladores, rutas y middlewares) para que cada elemento tenga su lugar y sea fácil de mantener.
  - Guardé los resultados de las evaluaciones en tablas separadas para poder ver después qué respondió cada usuario.
  - Añadí autenticación básica con tokens para que el usuario pueda registrarse, iniciar sesión y mantener su sesión.
  - Las variables de entorno permiten cambiar direcciones y credenciales sin tocar el código.
  - Mantengo la estructura sencilla pensando en poder agregar validaciones, pruebas o nuevas funciones más adelante sin tener que cambiarlo todo.

4. ¿Cómo probaste tu código? ¿Qué estrategias de prueba utilizaste?

  <!-- Tu respuesta aquí -->

5. ¿Qué mejoras o características adicionales agregarías si tuvieras más tiempo?

  - Agregaría mejoras para que la app esté más completa:
  - IA para el análisis de resultados de un assessment de un usuario para obtener recomendaciones de cursos más precisa.
  - Manejo de idiomas en el sitio para que sea multilenguaje.
  - Mejora en la implementación de SEO para mejor busqueda en la web.
  - Mejor manejo de la sesión de usuario (middleware, session management)
  - Agregar más modulos de detalle, como detalle del curso, listado de los assessments hechos por el usuario, capacidad para que un curso tenga muchos assessments y se clasifiquen por tipos 
  (diagnóstico, asessment de un módulo, assessment final, etc).

6. Describe tu experiencia trabajando con React.js/Next.js (o la tecnología frontend elegida).

  - Trabajar con Nextjs ha sido bastante cómodo para mi, debido a que ya tenía experiencia trabajando con esta tecnología y con React.
  - El desarollo de las funcionalidades en frontend fue bastante rápido y sencillo además que nextjs te ofrece varias caracteristicas que te permiten desarollar de manera más sencilla, como por ejemplo su Router basado en la estructura de archivos que ya esta implementado, por lo que no necesitas configurar tus rutas, solo necesitas crear tus carpetas y tus page.tsx dentro de la carpeta app para que ya funcione como ruta.
  - Otra caracteristica muy buena es la implementación de rutas dinámicas (en el proyecto hay dos) que te permiten crear vistas a las cuales les puedes pasar ids que en mi caso me permitieron crear las vistas de assessment y de resultados a las cuales les mando un id para traer las preguntas de los assessment y los resultados de un assessment.
  - En resumen fue una experiencia bastante buena y sencilla, en parte por la experiencia desarollando con esta tecnología y tambipen por las caracteristicas y beneficios que te otorga este framework.

7. ¿Cuál fue tu experiencia con el backend (Node.js/Express o PHP)?

 - En este caso mi experiencia fue un poco más compleja, debido a que con nodejs y express había realizado solo pequeñas pruebas de concepto anteriormente, esto con el objetivo de aprender lo básico de esta tecnología. El hacer un backend funcional con rutas, controladores, middleware, modelos fue un gran reto personal y profesional para mi.
 - Desde el inicio estuve investigando, documentandome y buscando respuestas a las dudas sobre la implementación de estas tecnologías para un correcto desarollo de un backend. Gracias a la documentación, algunos cursos y ayuda de IA pude completar el desarollo de los endpoints de manera correcta, sin embargo me queda como aprendizaje el mejorar mis habilidades en esta área.
 - En cuanto a código como tal, no tuve muchos problemas, debido a que sigue siendo javascript, un lenguaje con el que ya tengo experiencia desarollando.

8. ¿Cómo manejaste la gestión de estados en tu aplicación frontend?
 
  - Al inicio usé sólo `useState` local en cada página o componente para avanzar rápido.
  - Luego añadí un contexto sencillo para la sesión del usuario (datos básicos tras login) y evitar repetir props en varias vistas.
  - El resto de estados (formularios, respuestas del assessment) siguen siendo locales para mantener simplicidad.
  - No incorporé librerías más complejas (Redux, Zustand, React Query) porque el tamaño actual no lo requiere.
  - Si escala, evaluaría React Query para cachear peticiones y mejorar sincronización de datos.
  - Mantenerlo ligero me permitió enfocarme en terminar las funciones principales sin sobre‑ingeniería.

9. Si utilizaste herramientas de IA como bolt.new o v0 by Vercel, explica por qué y cómo las usaste.
 
  - Utilicé v0 principalmente para generar más rápido la base de algunas páginas y componentes de interfaz.
  - Me ayudó a ahorrar tiempo en estructura inicial y estilos repetitivos.
  - Después hice ajustes manuales: rutas, lógica de autenticación, integración con el backend y modelos.
  - La IA fue un apoyo puntual, pero las decisiones de flujo, endpoints y estructura las tomé revisando lo que necesitaba el proyecto.
  - Intenté siempre entender y revisar el código generado antes de seguir avanzando.

10. ¿Qué aprendiste o reforzaste al completar esta prueba técnica?

  <!-- Tu respuesta aquí -->
