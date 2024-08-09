import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/// Hàm xử lý khi người dùng vào phòng
const enterRoom = async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { enterTime: new Date() },
      { new: true } // Để trả về tài liệu đã được cập nhật
    )

    if (user) {
      res.status(200).json({ message: 'User entered the room' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Hàm xử lý khi người dùng thoát phòng
const exitRoom = async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.params.id, enterTime: { $ne: null } }, // Kiểm tra enterTime != null
      [
        { $set: { enterTime: null } },
        {
          $inc: {
            duration: {
              $divide: [{ $subtract: [new Date(), '$enterTime'] }, 1000],
            },
          },
        },
      ],
      { new: true }
    )

    if (user) {
      res
        .status(200)
        .json({ message: 'User exited the room', duration: user.duration })
    } else {
      res.status(404).json({
        message: 'User not found or has not entered the room',
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//get all User
const getAllUser = async (req, res) => {
  try {
    let users = await UserModel.find()

    users = users.map((user) => {
      const { password, ...other } = user._doc
      return other
    })

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

// update a user
const updateUser = async (req, res) => {
  const id = req.params.id
  const { _id, currentUserAdminStatus, password } = req.body

  if (id === _id || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(password, salt)
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      })

      // const token = jwt.sign(
      //   {
      //     username: user.username,
      //     id: user._id,
      //   },
      //   process.env.JWT_KEY,
      //   { expiresIn: '1h' }
      // )
      // res.status(200).json({ user, token })
      res.status(200).json({ user })
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
  const { _id } = req.body

  if (id === _id) {
    res.status(403).json({ message: "You can't follow yourself" })
  } else {
    try {
      const followUser = await UserModel.findById(id)
      const followingUser = await UserModel.findById(_id)

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } })
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
  const { _id } = req.body // _id is the id of the user who wants to unfollow

  if (id === _id) {
    res.status(403).json({ message: "You can't unfollow yourself" })
  } else {
    try {
      const followUser = await UserModel.findById(id)
      const followingUser = await UserModel.findById(_id)

      // check if the user is already followed then unfollow
      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } })
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

// use to search the user to chat
const searchUsers = async (req, res) => {
  const { query } = req.query

  const regex = new RegExp(query.trim().replace(/\s+/g, '|'), 'i')

  try {
    const users = await UserModel.find({
      $or: [{ firstname: { $regex: regex } }, { lastname: { $regex: regex } }],
    })

    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

//
const accessEntry = async (req, res) => {
  const { entry } = req.body
  const { userId } = req.params

  try {
    // Tìm người dùng theo userId
    const user = await UserModel.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    // Tìm entry trong favoriteEntries
    const favoriteEntryIndex = user.favoriteEntries.findIndex(
      (e) => e.entryId === entry.entryId
    )
    console.log('favoriteEntryIndex: ', favoriteEntryIndex)

    if (favoriteEntryIndex === -1) {
      // Nếu entry chưa tồn tại, thêm mới vào favoriteEntries
      const newEntry = {
        ...entry,
        timeUsed: 1,
        lastAccessedAt: new Date(),
      }
      user.favoriteEntries.push(newEntry)
    } else {
      // Nếu entry đã tồn tại, cập nhật timeUsed và lastAccessedAt
      user.favoriteEntries[favoriteEntryIndex].timeUsed += 1
      console.log(
        'user.favoriteEntries[favoriteEntryIndex].timeUsed: ',
        user.favoriteEntries[favoriteEntryIndex].timeUsed
      )
      user.favoriteEntries[favoriteEntryIndex].lastAccessedAt = new Date()
    }

    await user.save()
    res.status(200).json({ message: 'Access count updated successfully.' })
  } catch (error) {
    console.error('Error updating access count:', error)
    res.status(500).json({ message: 'Error updating access count.' })
  }
}

const getTopEntries = async (req, res) => {
  const { userId } = req.params

  try {
    // Tìm người dùng theo userId
    const user = await UserModel.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    // Sắp xếp favoriteEntries theo timeUsed giảm dần và lấy 4 entry đầu tiên
    const topEntries = user.favoriteEntries
      .sort((a, b) => b.timeUsed - a.timeUsed) // Sắp xếp giảm dần theo timeUsed
      .slice(0, 4) // Lấy 4 entry đầu tiên

    res.status(200).json(topEntries)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error retrieving top entries.' })
  }
}

export {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
  enterRoom,
  exitRoom,
  searchUsers,
  accessEntry,
  getTopEntries,
}
