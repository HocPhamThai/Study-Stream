import express from 'express'
import {
  createChat,
  findChat,
  userChats,
} from '../Controllers/chatController.js'

const router = express.Router()

router.post('/', createChat)
router.get('/:userId', userChats)
router.get('/find/:firstUserId/:secondUserId', findChat)

export default router
