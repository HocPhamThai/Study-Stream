import TotalWorkingTime from '../models/workingTimeModel.js'

const saveTotalWorkingTime = async (req, res) => {
  const { userId, duration } = req.body
  const today = new Date()
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  // Tính toán ngày bắt đầu tuần
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  try {
    let existingRecord = await TotalWorkingTime.findOne({ userId })

    if (existingRecord) {
      // Cập nhật hoặc thêm bản ghi
      const dailyRecordIndex = existingRecord.dailyRecords.findIndex(
        (record) => record.date.getTime() === date.getTime()
      )
      if (dailyRecordIndex >= 0) {
        existingRecord.dailyRecords[dailyRecordIndex].duration += duration
      } else {
        existingRecord.dailyRecords.push({ date, duration })
      }

      // Cập nhật tuần dữa trên bản ghi ngày
      const weeklyRecordIndex = existingRecord.weeklyTotals.findIndex(
        (record) => record.weekStart.getTime() === startOfWeek.getTime()
      )
      if (weeklyRecordIndex >= 0) {
        existingRecord.weeklyTotals[weeklyRecordIndex].duration += duration
      } else {
        existingRecord.weeklyTotals.push({ weekStart: startOfWeek, duration })
      }

      // Cập nhật tháng dựa trên bản ghi mới của ngày
      const month = today.getMonth() + 1 // Tháng được lập chỉ mục là 0
      const year = today.getFullYear()
      const monthlyRecordIndex = existingRecord.monthlyTotals.findIndex(
        (record) => record.month === month && record.year === year
      )
      if (monthlyRecordIndex >= 0) {
        existingRecord.monthlyTotals[monthlyRecordIndex].duration += duration
      } else {
        existingRecord.monthlyTotals.push({ month, year, duration })
      }

      // Cập nhật tổng hàng năm dựa trên ngày
      const yearlyRecordIndex = existingRecord.yearlyTotals.findIndex(
        (record) => record.year === year
      )
      if (yearlyRecordIndex >= 0) {
        existingRecord.yearlyTotals[yearlyRecordIndex].duration += duration
      } else {
        existingRecord.yearlyTotals.push({ year, duration })
      }

      // Cập nhật tổng duration
      existingRecord.totalDuration += duration

      // Lưu cập nhật bản ghi
      await existingRecord.save()
      res.status(200).json(existingRecord)
    } else {
      // Tạo bản ghi ngày mới
      const newTotalWorkingTime = new TotalWorkingTime({
        userId,
        dailyRecords: [{ date, duration }],
        weeklyTotals: [{ weekStart: startOfWeek, duration }],
        monthlyTotals: [
          { month: today.getMonth() + 1, year: today.getFullYear(), duration },
        ],
        yearlyTotals: [{ year: today.getFullYear(), duration }],
        totalDuration: duration,
      })

      // Lưu bản ghi mới
      await newTotalWorkingTime.save()
      res.status(201).json(newTotalWorkingTime)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getTodayDate = () => {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate())
}

// Thêm bản ghi hàng ngày
export const addDailyRecord = async (req, res) => {
  const { userId, date, duration } = req.body
  const recordDate = new Date(date)

  try {
    let existingRecord = await TotalWorkingTime.findOne({ userId })

    if (existingRecord) {
      // Update or add daily record
      const dailyRecordIndex = existingRecord.dailyRecords.findIndex(
        (record) => record.date.getTime() === recordDate.getTime()
      )
      if (dailyRecordIndex >= 0) {
        existingRecord.dailyRecords[dailyRecordIndex].duration += duration
      } else {
        existingRecord.dailyRecords.push({ date: recordDate, duration })
      }

      // Save the updated record
      await existingRecord.save()
      res.status(200).json(existingRecord)
    } else {
      // Create new record with daily record
      const newTotalWorkingTime = new TotalWorkingTime({
        userId,
        dailyRecords: [{ date: recordDate, duration }],
        weeklyTotals: [],
        monthlyTotals: [],
        yearlyTotals: [],
        totalDuration: duration,
      })

      // Save the new record
      await newTotalWorkingTime.save()
      res.status(201).json(newTotalWorkingTime)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getStartOfWeek = () => {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  return startOfWeek
}

const getCurrentMonthAndYear = () => {
  const today = new Date()
  const month = today.getMonth() + 1 // Month is 0-indexed
  const year = today.getFullYear()
  return { month, year }
}

// Lấy duration cho mỗi ngày trong tuần
const getWeeklyDailyDurations = async (req, res) => {
  const { userId } = req.params

  try {
    const record = await TotalWorkingTime.findOne({ userId })

    if (!record) {
      return res.status(404).json({ message: 'No record found for this user.' })
    }

    const startOfWeek = getStartOfWeek()
    const weekDurations = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek)
      currentDate.setDate(startOfWeek.getDate() + i)

      const dailyRecord = record.dailyRecords.find(
        (record) => record.date.getTime() === currentDate.getTime()
      )
      weekDurations.push({
        date: currentDate,
        duration: dailyRecord ? dailyRecord.duration : 0,
      })
    }

    res.status(200).json(weekDurations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy duration theo ngày
const getDailyDuration = async (req, res) => {
  const { userId } = req.params

  try {
    const record = await TotalWorkingTime.findOne({ userId })

    if (!record) {
      return res.status(404).json({ message: 'No record found for this user.' })
    }

    const today = getTodayDate()
    const dailyRecord = record.dailyRecords.find(
      (record) => record.date.getTime() === today.getTime()
    )
    const todayDuration = dailyRecord ? dailyRecord.duration : 0

    res.status(200).json({ todayDuration })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy duration theo tuần
const getWeeklyDuration = async (req, res) => {
  const { userId } = req.params

  try {
    const record = await TotalWorkingTime.findOne({ userId })

    if (!record) {
      return res.status(404).json({ message: 'No record found for this user.' })
    }

    const startOfWeek = getStartOfWeek()
    const weeklyRecord = record.weeklyTotals.find(
      (record) => record.weekStart.getTime() === startOfWeek.getTime()
    )
    const weekDuration = weeklyRecord ? weeklyRecord.duration : 0

    res.status(200).json({ weekDuration })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy duration theo tháng
const getMonthlyDuration = async (req, res) => {
  const { userId } = req.params

  try {
    const record = await TotalWorkingTime.findOne({ userId })

    if (!record) {
      return res.status(404).json({ message: 'No record found for this user.' })
    }

    const { month, year } = getCurrentMonthAndYear()
    const monthlyRecord = record.monthlyTotals.find(
      (record) => record.month === month && record.year === year
    )
    const monthDuration = monthlyRecord ? monthlyRecord.duration : 0

    res.status(200).json({ monthDuration })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy duration theo năm
const getYearlyDuration = async (req, res) => {
  const { userId } = req.params

  try {
    const record = await TotalWorkingTime.findOne({ userId })

    if (!record) {
      return res.status(404).json({ message: 'No record found for this user.' })
    }

    const year = new Date().getFullYear()
    const yearlyRecord = record.yearlyTotals.find(
      (record) => record.year === year
    )
    const yearDuration = yearlyRecord ? yearlyRecord.duration : 0

    res.status(200).json({ yearDuration })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy tổng duration
const getTotalDuration = async (req, res) => {
  const { userId } = req.params

  try {
    const record = await TotalWorkingTime.findOne({ userId })

    if (!record) {
      return res.status(404).json({ message: 'No record found for this user.' })
    }

    const totalDuration = record.totalDuration
    res.status(200).json({ totalDuration })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy tất cả ngày trong tháng
const getMonthlyDailyDurations = async (req, res) => {
  const { userId } = req.params

  try {
    const record = await TotalWorkingTime.findOne({ userId })

    if (!record) {
      return res.status(404).json({ message: 'No record found for this user.' })
    }

    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()

    // Tìm ngày đầu tiên và cuối cùng của tháng
    const startOfMonth = new Date(currentYear, currentMonth, 1)
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0)

    const monthDurations = []

    for (let day = startOfMonth.getDate(); day <= endOfMonth.getDate(); day++) {
      const currentDate = new Date(currentYear, currentMonth, day)
      const dailyRecord = record.dailyRecords.find(
        (record) => record.date.getTime() === currentDate.getTime()
      )
      monthDurations.push({
        date: currentDate,
        duration: dailyRecord ? dailyRecord.duration : 0,
      })
    }

    res.status(200).json(monthDurations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAverageDailyDuration = async (req, res) => {
  const { userId } = req.params

  try {
    const record = await TotalWorkingTime.findOne({ userId })

    if (!record) {
      return res.status(404).json({ message: 'No record found for this user.' })
    }

    // Tính số ngày có bản ghi trong dailyRecords
    const numberOfDays = record.dailyRecords.length
    // Tính thời gian trung bình
    const averageDuration = numberOfDays > 0 ? Math.floor(record.totalDuration / numberOfDays) : 0

    // Trả về cả số ngày và thời gian trung bình
    res.status(200).json({ averageDuration, numberOfDays })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export {
  getDailyDuration,
  getWeeklyDuration,
  getMonthlyDuration,
  getYearlyDuration,
  getTotalDuration,
  saveTotalWorkingTime,
  getWeeklyDailyDurations,
  getMonthlyDailyDurations,
  getAverageDailyDuration,
}
