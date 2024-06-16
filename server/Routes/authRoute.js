import express from 'express'
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  verifyOTP,
} from '../Controllers/authController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/verify-otp', verifyOTP)

export default router
