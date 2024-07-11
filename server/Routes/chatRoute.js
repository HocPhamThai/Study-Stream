import express from 'express'
import { findChat, userChats, createChat } from '../Controllers/chatController.js'

const router = express.Router()

router.get('/:userId', userChats)
router.post('/', createChat)
router.get('/find/:firstUserId/:secondUserId', findChat)

export default router
