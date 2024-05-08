import UserModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'

//get a user
const getUser = async (req, res) => {
  const userId = req.params.id
  try {
    const user = await UserModel.findById(userId)

    if (user) {
      const { password, ...other } = user._doc
      res.status(200).json(other)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUser = async (req, res) => {
  const id = req.params.id
  const { currentUserId, currentUserAdminStatus, password } = req.body

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(password, salt)
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      })

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res
      .status(403)
      .json({ message: 'Access denied! You can update only your account!' })
  }
}

const deleteUser = async (req, res) => {
  const id = req.params.id
  const { currentUserId, currentUserAdminStatus } = req.body

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id)
      res.status(200).json({ message: 'User has been deleted' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res
      .status(403)
      .json({ message: 'Access denied! You can delete only your account!' })
  }
}

const followUser = async (req, res) => {
  const id = req.params.id
  const { currentUserID } = req.body

  if (id === currentUserID) {
    res.status(403).json({ message: "You can't follow yourself" })
  } else {
    try {
      const followUser = await UserModel.findById(id)
      const followingUser = await UserModel.findById(currentUserID)

      if (!followUser.followers.includes(currentUserID)) {
        await followUser.updateOne({ $push: { followers: currentUserID } })
        await followingUser.updateOne({ $push: { followings: id } })
        res.status(200).json({ message: 'User has been followed' })
      } else {
        res.status(403).json({ message: 'You already follow this user' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export { getUser, updateUser, deleteUser }
