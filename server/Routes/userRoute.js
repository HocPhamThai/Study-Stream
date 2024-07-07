import express from 'express'
import authMiddleware from '../Middleware/authMiddleware.js'
import { getUser, getAllUser, updateUser, deleteUser, followUser, unFollowUser, searchUser } from '../Controllers/userController.js'

const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getUser)
router.get('/search', searchUser)
router.put('/:id', authMiddleware, updateUser)
router.put('/:id/follow', authMiddleware, followUser)
router.put('/:id/unfollow', authMiddleware, unFollowUser)
router.delete('/:id', authMiddleware, deleteUser)

export default router
