import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { listCourses, getCourse } from '../controllers/course.controller'

const router = Router()

router.get('/', asyncHandler(listCourses))
router.get('/:id', asyncHandler(getCourse))

export default router
