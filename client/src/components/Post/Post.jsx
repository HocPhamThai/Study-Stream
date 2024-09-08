import React, { useState } from 'react'
import './Post.scss'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/PostRequest'
import { useTranslation } from 'react-i18next'

const Post = ({ data, id }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)
  const { t } = useTranslation(['profile'])

  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    setLikes(liked ? likes - 1 : likes + 1)
  }
  return (
    <div className="Post">
      <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''} alt="" />
      <div className="postReact">
        <img onClick={handleLike} src={liked ? Heart : NotLike} alt="" style={{ cursor: 'pointer' }} />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likes} {t('likes')}</span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  )
}

export default Post
