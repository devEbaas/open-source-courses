"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const models_1 = require("../models");
async function syncAll() {
    try {
        await models_1.sequelize.authenticate();
        console.log('[sync:all] Conectado a DB');
        // Sin force para no borrar datos; alter ajusta columnas si es necesario
        await models_1.User.sync({ alter: true });
        await models_1.Category.sync({ alter: true });
        await models_1.Course.sync({ alter: true });
        await models_1.Assessment.sync({ alter: true });
        await models_1.Question.sync({ alter: true });
        await models_1.Answer.sync({ alter: true });
        await models_1.AssessmentResult.sync({ alter: true });
        if (models_1.AssessmentResultQuestion)
            await models_1.AssessmentResultQuestion.sync({ alter: true });
        console.log('[sync:all] Todas las tablas sincronizadas');
    }
    catch (e) {
        console.error('[sync:all] Error:', e);
    }
    finally {
        await models_1.sequelize.close();
    }
}
syncAll();
