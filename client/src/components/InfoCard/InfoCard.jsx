import React from 'react'
import './InfoCard.scss'
import { UilPen } from '@iconscout/react-unicons'
import { useState } from 'react'
import ProfileModals from '../ProfileModal/ProfileModal'
const InfoCard = () => {
  const [modalOpened, setmodalOpened] = useState(false);
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
          <UilPen
            width='2rem'
            height='1.2rem'
            onClick={() => setmodalOpened(true)}
          />
          <ProfileModals
            modalOpened={modalOpened}
            setModalOpened={setmodalOpened}
          />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>In relationship</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>Ho Chi Minh City</span>
      </div>

      <div className="info">
        <span>
          <b>Work at </b>
        </span>
        <span>New Ai</span>
      </div>

      <button className='button logout-button'>Logout</button>
    </div>
  )
}

export default InfoCard
