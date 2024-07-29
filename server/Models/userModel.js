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
    enterTime: {
      type: Date,
      default: null,
    },
    duration: {
      type: Number,
      default: 0
    },
    favoriteEntries: [
      {
        topicType: {
          type: String,
          required: true,
        },
        entryId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        coverImage: {
          type: String,
          required: true,
        },
        background: {
          type: String,
          required: true,
        },
        timeUsed: {
          type: Number,
          default: 1,
        },
        lastAccessedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
)

const UserModel = mongoose.model('User', userSchema)

export default UserModel
