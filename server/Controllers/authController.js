import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../Models/userModel.js'
import nodemailer from 'nodemailer'

const registerUser = async (req, res) => {
  //bcrypt
  const salt = await bcrypt.genSalt(10)
  const hassedPassword = await bcrypt.hash(req.body.password, salt)

  const newUser = new UserModel({ ...req.body, password: hassedPassword })
  const { username } = req.body

  try {
    const oldUser = await UserModel.findOne({ username: username })
    if (oldUser) {
      return res.status(400).json({ error: 'User already exists' })
    }
    const user = await newUser.save()

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      {
        expiresIn: '1h',
      }
    )
    res.status(200).json({ user, token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserModel.findOne({ username: username })

    if (user) {
      const validity = await bcrypt.compare(password, user.password)
      if (!validity) {
        res.status(400).json({ error: 'Invalid password' })
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_KEY,
          {
            expiresIn: '1h',
          }
        )
        res.status(200).json({ user, token })
      }
    } else {
      res.status(400).json({ error: 'Username does not exist' })
    }
  } catch (error) {
    res.status(500).json({ err: error.message })
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await UserModel.findOne({ username: email })
    if (!user) {
      return res.status(400).json({ error: 'Email does not exist' })
    }
    // otp generation logic here (otp is a 6 digit number)
    const otp = Math.floor(100000 + Math.random() * 900000)
    user.resetPasswordOTP = otp
    // 60000 milliseconds = 1 minute
    user.resetPasswordExpires = Date.now() + 3600000 //10 minutes
    await user.save()
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      service: 'gmail',
      secure: true,
      auth: {
        user: 'phamthaihoc008@gmail.com',
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      to: user.username,
      from: 'studystreamSystem',
      subject: 'Password Reset OTP Study Stream',
      text: `Your OTP for password reset is ${otp} `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(process.env.EMAIL_PASSWORD)
        console.log(error)
        return res.status(500).json({ message: 'Error sending email' })
      }
      res.status(200).json({ message: 'OTP đã được gửi đến email của bạn' })
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body
  const user = await UserModel.findOne({ username: email })
  if (!user) {
    return res.status(400).json({ error: 'Email does not exist' })
  }
  if (user.resetPasswordOTP !== otp || user.resetPasswordExpires < Date.now()) {
    return res.status(400).json({ message: 'OTP is invalid' })
  }
  return res.status(200).json({ message: 'OTP is valid' })
}

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body
  const user = await UserModel.findOne({ username: email })

  try {
    if (!user) {
      return res.status(400).json({ error: 'Email does not exist' })
    }
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP is expires' })
    }
    const salt = await bcrypt.genSalt(10)
    const hassedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hassedPassword
    user.resetPasswordOTP = null
    user.resetPasswordExpires = null
    await user.save()

    return res.status(200).json({ message: 'Password has been reset' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
export { forgotPassword, loginUser, registerUser, resetPassword, verifyOTP }
