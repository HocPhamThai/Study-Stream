import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    likes: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)

const PostModel = mongoose.model('Post', postSchema)

export default PostModel
