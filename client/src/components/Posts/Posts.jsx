import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTimelinePosts } from '../../actions/postAction'
import Post from '../Post/Post'
import './Posts.scss'

function Posts() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading } = useSelector((state) => state.postReducer)
  const params = useParams()

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [dispatch, user._id])

  if (!posts) return 'No Posts'
  if (params.id) posts = posts.filter((post) => post.userId === params.id)

  // sort posts by date
  posts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return loading ? (
    'Fetching Timeline Posts...'
  ) : (
    <div className="Posts">
      {posts.map((post, id) => {
        return <Post data={post} id={id} />
      })}
    </div>
  )
}

export default Posts
