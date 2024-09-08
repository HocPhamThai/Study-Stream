import React, { useState } from 'react'
import './RightSide.scss'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'
import ShareModal2 from '../ShareModal/ShareModal2'
import { Modal, useMantineTheme } from '@mantine/core'
import axios from 'axios'
import { useEffect } from 'react'
import PostShare from '../PostShare/PostShare'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import RewardCard from '../TrendCard/RewardCard'
import { useTranslation } from 'react-i18next'

const RightSide = () => {
  const [modalOpened, setmodalOpened] = useState(false)
  const [rewards, setRewards] = useState([])
  const [totalDuration, setTotalDuration] = useState(0)
  const { user } = useSelector((state) => state.authReducer.authData)
  const { t } = useTranslation(['profile'])

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/rewards`
        )
        setRewards(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchTotalDuration = async (id) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/workingtime/${user._id}/total`
        )
        setTotalDuration(response.data.totalDuration / 3600)
      } catch (err) {
        console.log(err)
      }
    }

    fetchRewards()
    fetchTotalDuration()
  }, [])

  return (
    <div className="RightSide ">
      <RewardCard rewards={rewards} totalDuration={totalDuration} />

      <button
        className="button right-button"
        onClick={() => setmodalOpened(true)}
      >
        {t('view more')}
      </button>
      <ShareModal2
        modalOpened={modalOpened}
        setModalOpened={setmodalOpened}
        rewards={rewards}
        totalDuration={totalDuration}
      />
    </div>
  )
}

export default RightSide
