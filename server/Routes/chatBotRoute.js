import express from 'express'

import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from '../controllers/chatbotController.js'

//Protected API
const router = express.Router()

router.post('/new', generateChatCompletion)
router.post('/all-chats', sendChatsToUser)
router.post('/delete', deleteChats)

export default router
