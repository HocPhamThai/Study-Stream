import React from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'

const InfoCard = () => {
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
          <UilPen width="2rem" height="1.2rem" />
        </div>
      </div>

      <div className="info">
        <span>
          <strong>Status</strong>
        </span>
        <span>in Relationship</span>
      </div>

      <div className="info">
        <span>
          <strong>Lives in</strong>
        </span>
        <span>New York City</span>
      </div>

      <div className="info">
        <span>
          <strong>Works at</strong>
        </span>
        <span>Normal Tech</span>
      </div>

      <button className="button logout-button">Logout</button>
    </div>
  )
}
export default InfoCard
