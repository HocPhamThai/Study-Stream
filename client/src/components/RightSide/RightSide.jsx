import React, { useState } from 'react'
import './RightSide.scss'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'
import ShareModal2 from '../ShareModal/ShareModal2'

import { Link } from 'react-router-dom'
import RewardCard from '../TrendCard/RewardCard'

const RightSide = () => {
  const [modalOpened, setmodalOpened] = useState(false)

  return (
    <div className="RightSide">
      {/* <div className="navIcons">
        <Link to="/home">
          <img src={Home} alt="" />
        </Link>
        <Link to="/chat">
          <img src={Comment} alt="" />
        </Link>
      </div> */}
      {/* <TrendCard /> */}
      <RewardCard />

      <button className="button right-button" onClick={() => setmodalOpened(true)}>
        Share
      </button>
      <ShareModal2 modalOpened={modalOpened} setModalOpened={setmodalOpened} />
    </div>
  )
}

export default RightSide
