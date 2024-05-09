import UserModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'

//get all User
const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find()

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//get a user by id
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
    res.status(403).json({ message: 'Access denied!' })
  }
}

const followUser = async (req, res) => {
  const id = req.params.id
  const { currentUserId } = req.body

  if (id === currentUserId) {
    res.status(403).json({ message: "You can't follow yourself" })
  } else {
    try {
      const followUser = await UserModel.findById(id)
      const followingUser = await UserModel.findById(currentUserId)

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } })
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

const unFollowUser = async (req, res) => {
  const id = req.params.id // id is the id of the user who wants to unfollow
  const { currentUserId } = req.body // currentUserId is the id of the user who wants to unfollow

  if (id === currentUserId) {
    res.status(403).json({ message: "You can't unfollow yourself" })
  } else {
    try {
      const followUser = await UserModel.findById(id)
      const followingUser = await UserModel.findById(currentUserId)

      // check if the user is already followed then unfollow
      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } })
        await followingUser.updateOne({ $pull: { followings: id } })
        res.status(200).json({ message: 'User has been unfollowed' })
      } else {
        res.status(403).json({ message: 'User is not followed by you' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export { getUser, getAllUser, updateUser, deleteUser, followUser, unFollowUser }
