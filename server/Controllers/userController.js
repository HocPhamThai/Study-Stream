import UserModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/// Hàm xử lý khi người dùng vào phòng
const enterRoom = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await UserModel.findById(_id);
    if (user) {
      user.enterTime = new Date();
      await user.save();
      res.status(200).json({ message: 'User entered the room' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm xử lý khi người dùng thoát phòng
const exitRoom = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await UserModel.findById(_id);
    if (user) {
      const exitTime = new Date();
      const duration = (exitTime - user.enterTime) / 1000; // Tính thời gian ở trong phòng (đơn vị: giây)
      user.enterTime = null; // Xóa thời gian vào phòng
      user.duration = (user.duration || 0) + duration; // Cộng dồn thời gian
      await user.save();
      res.status(200).json({ message: 'User exited the room', duration });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      )
      res.status(200).json({ user, token })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(403).json({ message: 'Access denied! You can update only your account!' })
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

const searchUser = async (req, res) => {
  const { firstName, lastName } = req.query;
  
  try {
    const users = await UserModel.find({
      $or: [
        { firstName: { $regex: firstName, $options: 'i' } },
        { lastName: { $regex: lastName, $options: 'i' } }
      ]
    });
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export { getUser, getAllUser, updateUser, deleteUser, followUser, unFollowUser, enterRoom, exitRoom, searchUser }
