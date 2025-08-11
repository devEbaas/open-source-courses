"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../utils/asyncHandler");
const assessment_controller_1 = require("../controllers/assessment.controller");
const router = (0, express_1.Router)();
router.get('/:id', (0, asyncHandler_1.asyncHandler)(assessment_controller_1.getAssessment));
router.post('/:id/submit', (0, asyncHandler_1.asyncHandler)(assessment_controller_1.submitAssessment));
router.get('/:id/results', (0, asyncHandler_1.asyncHandler)(assessment_controller_1.listAssessmentResults));
// detalle resultado separado
router.get('/result/detail/:id', (0, asyncHandler_1.asyncHandler)(assessment_controller_1.getAssessmentResultDetail));
exports.default = router;
