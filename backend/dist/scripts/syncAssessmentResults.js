"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const models_1 = require("../models");
async function syncAssessmentResults() {
    try {
        await models_1.sequelize.authenticate();
        console.log('[sync:results] Conectado a DB');
        // Crear/alter principal
        await models_1.AssessmentResult.sync({ alter: true });
        console.log('[sync:results] Tabla assessment_results sincronizada');
        // Crear/alter detalle
        if (models_1.AssessmentResultQuestion) {
            await models_1.AssessmentResultQuestion.sync({ alter: true });
            console.log('[sync:results] Tabla assessment_result_questions sincronizada');
        }
    }
    catch (e) {
        console.error('[sync:results] Error:', e);
    }
    finally {
        await models_1.sequelize.close();
    }
}
syncAssessmentResults();
