import { UilPen } from '@iconscout/react-unicons'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { logOut } from '../../actions/AuthAction'
import * as UserApi from '../../api/UserRequest'
import ProfileModal from '../ProfileModal/ProfileModal'
import './InfoCard.scss'
import { useTranslation } from 'react-i18next'

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false)

  const dispatch = useDispatch()
  const params = useParams()

  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState({})
  const { t } = useTranslation(['profile'])

  const { user } = useSelector((state) => state.authReducer.authData)

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user)
      } else {
        const profilerUser = await UserApi.getUser(profileUserId)
        setProfileUser(profilerUser)
      }
    }
    fetchProfileUser()
  }, [profileUserId, user])

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4 className='font-bold text-md'>{t('information')}</h4>
        {profileUserId === user._id ? (
          <div>
            <UilPen width="2rem" height="1.2rem" onClick={() => setModalOpened(true)} />
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="info">
        <span>
          <b>{t('status')}</b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>{t('live')}</b>
        </span>
        <span>{profileUser.liveIn}</span>
      </div>

      <div className="info">
        <span>
          <b>{t('work')}</b>
        </span>
        <span>{profileUser.workAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>
        {t('logout')}
      </button>
    </div>
  )
}

export default InfoCard
