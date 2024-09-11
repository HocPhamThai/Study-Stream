import express from 'express'

import {
  forgotPassword,
  loginUser,
  refreshToken,
  registerUser,
  resetPassword,
  verifyOTP,
} from '../controllers/authController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/verify-otp', verifyOTP)
router.post('/refresh-token', refreshToken)

export default router
