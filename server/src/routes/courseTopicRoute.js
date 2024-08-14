import express from 'express'
import {
  createCourseTopic,
  getCourseTopics,
  getCourseTopicById,
  updateCourseTopic,
  deleteCourseTopic,
  createCourse,
  updateCourse,
  deleteCourse,
  createLesson,
  updateLesson,
  deleteLesson,
  getCoursesByTopic,
  getCourseById,
  getLessonsByCourse,
  getLessonById,
} from '../controllers/courseTopicController.js'

const router = express.Router()

// CourseTopic routes
router.post('/', createCourseTopic)        // Create a new courseTopic
router.get('/', getCourseTopics)           // Get all courseTopics
router.get('/:courseTopicId', getCourseTopicById)  // Get a courseTopic by ID
router.put('/courseTopics/:id', updateCourseTopic)     // Update a courseTopic by ID
router.delete('/courseTopics/:id', deleteCourseTopic)  // Delete a courseTopic by ID

// Course routes within a courseTopic
router.get('/:courseTopicId/courses', getCoursesByTopic);
router.get('/:courseTopicId/courses/:courseId', getCourseById);
router.post('/courseTopics/:id/courses', createCourse)          // Add new course(s) to a courseTopic
router.put('/courseTopics/:id/courses/:courseId', updateCourse) // Update a specific course within a courseTopic
router.delete('/courseTopics/:id/courses/:courseId', deleteCourse)  // Delete a specific course within a courseTopic

// Lesson routes within a course
router.get('/:courseTopicId/courses/:courseId/lessons', getLessonsByCourse);
router.get('/:courseTopicId/courses/:courseId/lessons/:lessonId', getLessonById);
router.post('/courseTopics/:id/courses/:courseId/lessons', createLesson)  // Add new lesson(s) to a course
router.put('/courseTopics/:id/courses/:courseId/lessons/:lessonId', updateLesson) // Update a specific lesson within a course
router.delete('/courseTopics/:id/courses/:courseId/lessons/:lessonId', deleteLesson) // Delete a specific lesson within a course

export default router
