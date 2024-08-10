import PostModel from '../models/postModel.js'
import mongoose from 'mongoose'
import UserModel from '../models/userModel.js'

// get all posts
const getAllPost = async (req, res) => {
  try {
    const posts = await PostModel.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// create new post
const createPost = async (req, res) => {
  const newPost = new PostModel(req.body)
  try {
    await newPost.save()
    res.status(200).json(newPost)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// get a post
const getPost = async (req, res) => {
  const id = req.params.id
  try {
    const post = await PostModel.findById(id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// update a post
const updatePost = async (req, res) => {
  const postId = req.params.id
  const { userId } = req.body

  try {
    const post = await PostModel.findById(postId)
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json({ message: 'Post has been updated' })
    } else {
      res.status(403).json({ message: 'Action forbidden' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//delete a post
const deletePost = async (req, res) => {
  const id = req.params.id
  const { userId } = req.body

  try {
    const post = await PostModel.findById(id)
    if (post.userId === userId) {
      await post.deleteOne()
      res.status(200).json({ message: 'Post has been deleted' })
    } else {
      res.status(403).json({ message: 'Action forbidden' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Like/dislike a post
const likePost = async (req, res) => {
  const id = req.params.id
  const { userId } = req.body

  try {
    const post = await PostModel.findById(id)
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } })
      res.status(200).json({ message: 'Post has been liked' })
    } else {
      await post.updateOne({ $pull: { likes: userId } })
      res.status(200).json({ message: 'Post has been unliked' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get timeline posts
const getTimelinePosts = async (req, res) => {
  const userId = req.params.id

  try {
    const currentUserPosts = await PostModel.find({ userId: userId })
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'followings',
          foreignField: 'userId',
          as: 'followingPosts',
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ])

    res
      .status(200)
      .json(currentUserPosts.concat(...followingPosts[0]?.followingPosts))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
  getAllPost,
}
