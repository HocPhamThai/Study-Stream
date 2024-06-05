import UserModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    res.status(500).json({ message: error.message })
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
    }
  } catch (error) {
    res.status(500).json({ err: error.message })
  }
}

export { registerUser, loginUser }
