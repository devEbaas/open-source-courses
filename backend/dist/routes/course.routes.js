"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../utils/asyncHandler");
const course_controller_1 = require("../controllers/course.controller");
const router = (0, express_1.Router)();
router.get('/', (0, asyncHandler_1.asyncHandler)(course_controller_1.listCourses));
router.get('/:id', (0, asyncHandler_1.asyncHandler)(course_controller_1.getCourse));
exports.default = router;
