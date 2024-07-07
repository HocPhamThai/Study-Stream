import express from 'express'
import { findChat, userChats } from '../Controllers/chatController.js'

const router = express.Router()

router.get('/:userId', userChats)
router.get('/find/:firstUserId/:secondUserId', findChat)

export default router
