import express from 'express'
import {
  saveTotalWorkingTime,
  getDailyDuration,
  getWeeklyDuration,
  getMonthlyDuration,
  getYearlyDuration,
  getTotalDuration,
  getWeeklyDailyDurations,
  getMonthlyDailyDurations,
  getAverageDailyDuration,
} from '../controllers/workingTimeController.js'

const router = express.Router()

router.post('/save', saveTotalWorkingTime)
router.get('/:userId/daily', getDailyDuration)
router.get('/:userId/weekly', getWeeklyDuration)
router.get('/:userId/monthly', getMonthlyDuration)
router.get('/:userId/yearly', getYearlyDuration)
router.get('/:userId/total', getTotalDuration)
router.get('/:userId/average', getAverageDailyDuration)
router.get('/:userId/weekly/daily', getWeeklyDailyDurations) // Route mới cho lấy thời gian làm việc theo ngày trong tuần
// router.post('/add-daily-record', addDailyRecord)
router.get('/:userId/monthly/daily', getMonthlyDailyDurations)

export default router
