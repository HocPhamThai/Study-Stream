import UserModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'

const registerUser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body

  //bcrypt
  const salt = await bcrypt.genSalt(10)
  const hassedPassword = await bcrypt.hash(password, salt)

  const newUser = new UserModel({
    username,
    password: hassedPassword,
    firstname,
    lastname,
  })

  try {
    newUser.save()
    res.status(200).json({ message: 'User has been registered' })
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
      if (validity) {
        res.status(200).json({ message: 'Login successful' })
      } else {
        res.status(400).json({ message: 'Invalid password' })
      }
    }
  } catch (error) {
    res.status(500).json({ err: error.message })
  }
}

export { registerUser, loginUser }
