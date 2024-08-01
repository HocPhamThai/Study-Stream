import express from 'express'
import {
  addReward,
  updateReward,
  deleteReward,
  getAllRewards,
} from '../controllers/rewardsController.js'

const router = express.Router()

// Route để thêm mới reward
router.post('/', addReward)

// Route để cập nhật reward
router.put('/:id', updateReward)

// Route để xóa reward
router.delete('/:id', deleteReward)

// Route để lấy tất cả rewards
router.get('/', getAllRewards)

export default router
