import React from 'react'
import Post from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.scss'

const PostSide = () => {
  return (
    <div>
      <div className="PostSide">
        <PostShare />
        <Post />
      </div>
    </div>
  )
}

export default PostSide
