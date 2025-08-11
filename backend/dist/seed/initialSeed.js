"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const models_1 = require("../models");
async function seed() {
    try {
        // Desactivar checks para poder dropear tablas con FKs legacy (assessmentId antiguo)
        await models_1.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await models_1.sequelize.sync({ force: true });
        await models_1.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        const frontend = await models_1.Category.create({ name: "Programación Frontend" });
        const backend = await models_1.Category.create({ name: "Programación Backend" });
        const fullstackCourse = await models_1.Course.create({
            name: 'Desarrollo Fullstack',
            description: 'Curso que cubre fundamentos frontend y backend.'
        });
        // Cursos adicionales sin assessment (solo para listado)
        const frontendCourse = await models_1.Course.create({
            name: 'Desarrollo Frontend',
            description: 'Curso enfocado en HTML, CSS, JavaScript y frameworks de interfaz.'
        });
        const backendCourse = await models_1.Course.create({
            name: 'Desarrollo Backend',
            description: 'Curso enfocado en APIs, bases de datos, autenticación y lógica de negocio.'
        });
        const assessment = await models_1.Assessment.create({
            name: 'Assessment Inicial Fullstack',
            description: 'Evaluación diagnóstica de fundamentos frontend y backend.',
            courseId: fullstackCourse.id
        });
        const frontendQuestions = [
            {
                text: "¿Qué lenguaje se utiliza principalmente para estilos en la web?",
                answers: [
                    { text: "JavaScript", isCorrect: false },
                    { text: "HTML", isCorrect: false },
                    { text: "CSS", isCorrect: true },
                    { text: "Python", isCorrect: false },
                ],
            },
            {
                text: "¿Qué librería de JavaScript es mantenida por Facebook?",
                answers: [
                    { text: "Angular", isCorrect: false },
                    { text: "React", isCorrect: true },
                    { text: "Vue", isCorrect: false },
                    { text: "jQuery", isCorrect: false },
                ],
            },
            {
                text: "¿Cuál es el propósito de React?",
                answers: [
                    { text: "Gestionar bases de datos", isCorrect: false },
                    { text: "Construir interfaces de usuario", isCorrect: true },
                    { text: "Diseñar logos", isCorrect: false },
                    { text: "Crear servidores", isCorrect: false },
                ],
            },
            {
                text: "¿Qué es JSX?",
                answers: [
                    { text: "Un lenguaje de programación", isCorrect: false },
                    { text: "Una extensión de CSS", isCorrect: false },
                    {
                        text: "Una sintaxis que combina JavaScript y HTML",
                        isCorrect: true,
                    },
                    { text: "Un framework backend", isCorrect: false },
                ],
            },
            {
                text: "¿Qué herramienta se usa para gestionar paquetes en proyectos JavaScript?",
                answers: [
                    { text: "npm", isCorrect: true },
                    { text: "Python", isCorrect: false },
                    { text: "Docker", isCorrect: false },
                    { text: "MySQL", isCorrect: false },
                ],
            },
            {
                text: "¿Qué significa CSS?",
                answers: [
                    { text: "Cascading Style Sheets", isCorrect: true },
                    { text: "Computer Style Sheets", isCorrect: false },
                    { text: "Creative Style Sheets", isCorrect: false },
                    { text: "Colorful Style Sheets", isCorrect: false },
                ],
            },
            {
                text: "¿Cuál es la función de un componente en React?",
                answers: [
                    { text: "Un archivo de configuración", isCorrect: false },
                    { text: "Una función para manejar eventos", isCorrect: false },
                    { text: "Una unidad reutilizable de UI", isCorrect: true },
                    { text: "Un tipo de base de datos", isCorrect: false },
                ],
            },
            {
                text: "¿Qué propiedad CSS cambia el color de fondo?",
                answers: [
                    { text: "color", isCorrect: false },
                    { text: "background-color", isCorrect: true },
                    { text: "font-size", isCorrect: false },
                    { text: "border", isCorrect: false },
                ],
            },
            {
                text: "¿Cuál es el estándar actual de JavaScript?",
                answers: [
                    { text: "ES6", isCorrect: true },
                    { text: "ES5", isCorrect: false },
                    { text: "ES3", isCorrect: false },
                    { text: "ES7", isCorrect: false },
                ],
            },
            {
                text: "¿Qué etiqueta HTML se usa para incluir JavaScript?",
                answers: [
                    { text: "<script>", isCorrect: true },
                    { text: "<style>", isCorrect: false },
                    { text: "<js>", isCorrect: false },
                    { text: "<code>", isCorrect: false },
                ],
            },
        ];
        const backendQuestions = [
            {
                text: "¿Qué es Node.js?",
                answers: [
                    { text: "Un entorno de ejecución para JavaScript", isCorrect: true },
                    { text: "Un lenguaje de programación", isCorrect: false },
                    { text: "Un sistema operativo", isCorrect: false },
                    { text: "Un servidor web", isCorrect: false },
                ],
            },
            {
                text: "¿Qué base de datos es NoSQL?",
                answers: [
                    { text: "MySQL", isCorrect: false },
                    { text: "PostgreSQL", isCorrect: false },
                    { text: "MongoDB", isCorrect: true },
                    { text: "Oracle", isCorrect: false },
                ],
            },
            {
                text: "¿Cuál es la función de Express en Node.js?",
                answers: [
                    { text: "Un framework para Node.js", isCorrect: true },
                    { text: "Un sistema operativo", isCorrect: false },
                    { text: "Una base de datos", isCorrect: false },
                    { text: "Un lenguaje de programación", isCorrect: false },
                ],
            },
            {
                text: "¿Qué es una API REST?",
                answers: [
                    { text: "Un protocolo para transferir archivos", isCorrect: false },
                    { text: "Una interfaz para bases de datos", isCorrect: false },
                    { text: "Un estilo de API para servicios web", isCorrect: true },
                    { text: "Un lenguaje de programación", isCorrect: false },
                ],
            },
            {
                text: "¿Qué lenguaje se usa comúnmente para desarrollo backend?",
                answers: [
                    { text: "JavaScript", isCorrect: false },
                    { text: "Python", isCorrect: true },
                    { text: "HTML", isCorrect: false },
                    { text: "CSS", isCorrect: false },
                ],
            },
            {
                text: "¿Qué es una base de datos relacional?",
                answers: [
                    {
                        text: "Una base de datos que almacena datos en tablas",
                        isCorrect: true,
                    },
                    {
                        text: "Una base de datos que almacena datos en documentos",
                        isCorrect: false,
                    },
                    { text: "Un lenguaje de programación", isCorrect: false },
                    { text: "Un sistema operativo", isCorrect: false },
                ],
            },
            {
                text: "¿Qué es ORM?",
                answers: [
                    { text: "Object-Relational Mapping", isCorrect: true },
                    { text: "Online Resource Manager", isCorrect: false },
                    { text: "Open Relational Model", isCorrect: false },
                    { text: "Operating Remote Method", isCorrect: false },
                ],
            },
            {
                text: "¿Qué puerto usa comúnmente un servidor HTTP?",
                answers: [
                    { text: "Puerto 80", isCorrect: true },
                    { text: "Puerto 21", isCorrect: false },
                    { text: "Puerto 443", isCorrect: false },
                    { text: "Puerto 3306", isCorrect: false },
                ],
            },
            {
                text: "¿Qué es autenticación?",
                answers: [
                    { text: "Proceso de verificar identidad", isCorrect: true },
                    { text: "Proceso de almacenar datos", isCorrect: false },
                    { text: "Proceso de diseñar interfaces", isCorrect: false },
                    { text: "Proceso de compilar código", isCorrect: false },
                ],
            },
            {
                text: "¿Qué significa SQL?",
                answers: [
                    { text: "Structured Query Language", isCorrect: true },
                    { text: "Simple Query Language", isCorrect: false },
                    { text: "Structured Question Language", isCorrect: false },
                    { text: "Standard Query Language", isCorrect: false },
                ],
            },
        ];
        // Función para insertar preguntas y respuestas
        async function insertQuestions(questions, categoryId, assessmentId) {
            for (const q of questions) {
                const question = await models_1.Question.create({ text: q.text, categoryId, assessmentId });
                for (const a of q.answers) {
                    await models_1.Answer.create({
                        text: a.text,
                        isCorrect: a.isCorrect,
                        questionId: question.id,
                    });
                }
            }
        }
        await insertQuestions(frontendQuestions.slice(0, 5), frontend.id, assessment.id);
        await insertQuestions(backendQuestions.slice(0, 5), backend.id, assessment.id);
        // Usuario demo
        const demoUser = await models_1.User.create({ name: 'Demo User', email: 'demo@example.com', passwordHash: 'demo-hash' });
        console.log(`✅ Cursos creados: ${fullstackCourse.name} (con assessment), ${frontendCourse.name}, ${backendCourse.name}. Usuario demo ${demoUser.email}`);
        console.log("✅ Seed completado con éxito");
    }
    catch (error) {
        console.error("❌ Error en seed:", error);
    }
    finally {
        await models_1.sequelize.close();
    }
}
seed();
