import 'dotenv/config';
import { sequelize, User, Category, Course, Assessment, Question, Answer, AssessmentResult, AssessmentResultQuestion } from '../models';
async function syncAll() {
    try {
        await sequelize.authenticate();
        console.log('[sync:all] Conectado a DB');
        // Sin force para no borrar datos; alter ajusta columnas si es necesario
        await User.sync({ alter: true });
        await Category.sync({ alter: true });
        await Course.sync({ alter: true });
        await Assessment.sync({ alter: true });
        await Question.sync({ alter: true });
        await Answer.sync({ alter: true });
        await AssessmentResult.sync({ alter: true });
        if (AssessmentResultQuestion)
            await AssessmentResultQuestion.sync({ alter: true });
        console.log('[sync:all] Todas las tablas sincronizadas');
    }
    catch (e) {
        console.error('[sync:all] Error:', e);
    }
    finally {
        await sequelize.close();
    }
}
syncAll();
