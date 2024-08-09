import RewardsModel from '../models/rewardsModel.js'

// Thêm mới reward
export const addReward = async (req, res) => {
  try {
    const { tittle, link, hour } = req.body
    const newReward = new RewardsModel({ tittle, link, hour })
    await newReward.save()
    res.status(201).json(newReward)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Cập nhật reward
export const updateReward = async (req, res) => {
  try {
    const { id } = req.params
    const { tittle, link, hour } = req.body
    const updatedReward = await RewardsModel.findByIdAndUpdate(
      id,
      { tittle, link, hour },
      { new: true }
    )
    res.status(200).json(updatedReward)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Xóa reward
export const deleteReward = async (req, res) => {
  try {
    const { id } = req.params
    await RewardsModel.findByIdAndDelete(id)
    res.status(200).json({ message: 'Reward deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Lấy tất cả rewards
export const getAllRewards = async (req, res) => {
  try {
    const rewards = await RewardsModel.find()
    res.status(200).json(rewards)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
