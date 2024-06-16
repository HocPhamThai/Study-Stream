import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
    about: {
      type: String,
    },
    liveIn: {
      type: String,
    },
    workAt: {
      type: String,
    },
    relationship: {
      type: String,
    },
    country: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    resetPasswordOTP: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
)

const UserModel = mongoose.model('User', userSchema)

export default UserModel
