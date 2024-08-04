import express from 'express'
import {
  findChat,
  userChats,
  createChat,
  deleteChat,
} from '../Controllers/chatController.js'

const router = express.Router()

router.get('/:userId', userChats)
router.post('/', createChat)
router.delete('/:chatId', deleteChat)
router.get('/find/:firstUserId/:secondUserId', findChat)

export default router
