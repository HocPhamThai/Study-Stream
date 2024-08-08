import express from 'express'
import { enterRoom, exitRoom } from '../controllers/userController.js'

const router = express.Router()

router.post('/enter', enterRoom)
router.post('/exit', exitRoom)

export default router
