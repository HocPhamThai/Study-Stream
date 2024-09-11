import express from 'express'
import {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  // followUser,
  // unFollowUser,
  searchUsers,
  accessEntry,
  getTopEntries,
} from '../controllers/userController.js'

const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getUser)
router.post('/search', searchUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/:userId/entry/access', accessEntry)
router.get('/:userId/top-entries', getTopEntries)

export default router
