import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { getAssessment, submitAssessment, listAssessmentResults, getAssessmentResultDetail } from '../controllers/assessment.controller'

const router = Router()

router.get('/:id', asyncHandler(getAssessment))
router.post('/:id/submit', asyncHandler(submitAssessment))
router.get('/:id/results', asyncHandler(listAssessmentResults))

// detalle resultado separado
router.get('/result/detail/:id', asyncHandler(getAssessmentResultDetail))

export default router
