import express from 'express'
import {
  addTask,
  updateTask,
  deleteTask,
  getIncompleteTasks,
  getCompletedTasks,
  getAllTasks,
  getTasksByDate,
  completeTask
} from '../controllers/taskController.js'
const router = express.Router()

router.post('/', addTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)
router.get('/upcoming', getIncompleteTasks)
router.get('/completed', getCompletedTasks)
router.get('/', getAllTasks)
router.get('/date', getTasksByDate)
router.put('/:id/complete', completeTask)
export default router
