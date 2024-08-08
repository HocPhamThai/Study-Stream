import TaskModel from '../Models/taskModel.js' // Cập nhật đường dẫn nếu cần
import UserModel from '../Models/userModel.js' // Cập nhật đường dẫn nếu cần

// Thêm task mới
export const addTask = async (req, res) => {
  try {
    const { title, startDate, endDate, description, userId } = req.body

    // Kiểm tra xem userId có hợp lệ không
    const user = await UserModel.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const newTask = new TaskModel({
      title,
      startDate,
      endDate,
      description,
      userId,
    })

    await newTask.save()
    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Cập nhật task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { title, startDate, endDate, description, completed } = req.body

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { title, startDate, endDate, description, completed },
      { new: true, runValidators: true }
    )

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Xóa task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const deletedTask = await TaskModel.findByIdAndDelete(id)

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy danh sách task chưa hoàn thành
export const getIncompleteTasks = async (req, res) => {
  try {
    const { userId } = req.query
    const tasks = await TaskModel.find({ userId, completed: false })

    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy danh sách task hoàn thành
export const getCompletedTasks = async (req, res) => {
  try {
    const { userId } = req.query
    const tasks = await TaskModel.find({ userId, completed: true })

    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy tổng danh sách task
export const getAllTasks = async (req, res) => {
  try {
    const { userId } = req.query
    const tasks = await TaskModel.find({ userId })

    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Lấy danh sách task của một ngày cụ thể
export const getTasksByDate = async (req, res) => {
  try {
    const { userId, date } = req.query
    const startOfDay = new Date(date)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const tasks = await TaskModel.find({
      userId,
      startDate: { $gte: startOfDay, $lte: endOfDay },
    })

    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// cập nhật complete Task
export const completeTask = async (req, res) => {
  try {
    const { id } = req.params

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true, runValidators: true }
    )

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
