import express from 'express'
import {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
} from '../Controllers/userController.js'

const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unFollowUser)
router.delete('/:id', deleteUser)

export default router
