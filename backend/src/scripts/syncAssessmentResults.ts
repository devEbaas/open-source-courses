import 'dotenv/config'
import { sequelize, AssessmentResult, AssessmentResultQuestion } from '../models'

async function syncAssessmentResults() {
  try {
    await sequelize.authenticate()
    console.log('[sync:results] Conectado a DB')
    // Crear/alter principal
    await AssessmentResult.sync({ alter: true })
    console.log('[sync:results] Tabla assessment_results sincronizada')
    // Crear/alter detalle
    if (AssessmentResultQuestion) {
      await AssessmentResultQuestion.sync({ alter: true })
      console.log('[sync:results] Tabla assessment_result_questions sincronizada')
    }
  } catch (e) {
    console.error('[sync:results] Error:', e)
  } finally {
    await sequelize.close()
  }
}

syncAssessmentResults()
