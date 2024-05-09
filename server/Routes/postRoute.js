import express from 'express'
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
  getAllPost,
} from '../Controllers/postController.js'

const router = express.Router()

router.get('/', getAllPost)
router.get('/:id', getPost)
router.post('/', createPost)
router.put('/:id', updatePost)
router.put('/:id/like', likePost)
router.delete('/:id', deletePost)
router.get('/:id/timeline', getTimelinePosts)

export default router
