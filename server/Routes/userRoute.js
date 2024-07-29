import express from 'express'
import authMiddleware from '../Middleware/authMiddleware.js'
import { getUser, getAllUser, updateUser, deleteUser, followUser, unFollowUser, searchUsers, accessEntry, getTopEntries } from '../Controllers/userController.js'

const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getUser)
router.post('/search', searchUsers)
router.put('/:id', updateUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unFollowUser)
router.delete('/:id', deleteUser)
router.post('/:userId/entry/access', accessEntry)
router.get('/:userId/top-entries', getTopEntries)
// router.put('/:id', authMiddleware, updateUser)
// router.put('/:id/follow', authMiddleware, followUser)
// router.put('/:id/unfollow', authMiddleware, unFollowUser)
// router.delete('/:id', authMiddleware, deleteUser)


export default router
