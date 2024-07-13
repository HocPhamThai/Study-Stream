import express from 'express'
import { saveTotalWorkingTime, getDailyDuration, getWeeklyDuration, getMonthlyDuration, getYearlyDuration, getTotalDuration } from '../Controllers/workingTimeController.js'

const router = express.Router()

router.post('/save', saveTotalWorkingTime)
router.get('/:userId/daily', getDailyDuration)
router.get('/:userId/weekly', getWeeklyDuration)
router.get('/:userId/monthly', getMonthlyDuration)
router.get('/:userId/yearly', getYearlyDuration)
router.get('/:userId/total', getTotalDuration)

export default router