import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.scss'

const PostSide = () => {
  return (
    <div>
      <div className="PostSide">
        <PostShare />
        <Posts />
      </div>
    </div>
  )
}

export default PostSide
