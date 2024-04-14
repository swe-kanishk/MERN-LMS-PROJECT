import { Router } from 'express';
import { getAllCourses, getLecturesByCourseId, createCourse, updateCourse, destroyCourse, addLectureToCourseById } from '../controllers/courseController.js';
import { isLoggedIn, authorizedRoles } from '../middlewares/authMiddleware.js';
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.route('/')
    .get(getAllCourses)
    .post(isLoggedIn, authorizedRoles('ADMIN'), upload.single("thumbnail"), createCourse)

router.get('/:id')
    .get(isLoggedIn, getLecturesByCourseId)
    .put(isLoggedIn, authorizedRoles('ADMIN'), updateCourse)
    .delete(isLoggedIn, authorizedRoles('ADMIN'), destroyCourse)
    .post(isLoggedIn, authorizedRoles('ADMIN'), upload.single("lecture"), addLectureToCourseById)

export default router;