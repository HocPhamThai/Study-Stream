import React, { useEffect } from 'react'
import './Posts.scss'
import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
import { useSelector, useDispatch } from 'react-redux'
import { getTimelinePosts } from '../../actions/postAction'

function Posts() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const { posts, loading } = useSelector((state) => state.postReducer)

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [])
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
