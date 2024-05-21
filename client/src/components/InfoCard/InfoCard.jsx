import React, { useEffect } from 'react'
import './InfoCard.scss'
import { UilPen } from '@iconscout/react-unicons'
import { useState } from 'react'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest'
import { logOut } from '../../actions/AuthAction'

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false)

  const dispatch = useDispatch()
  const params = useParams()

  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState({})

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
  }, [user])

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        {profileUserId === user._id ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.liveIn}</span>
      </div>

      <div className="info">
        <span>
          <b>Work at </b>
        </span>
        <span>{profileUser.workAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  )
}

export default InfoCard
