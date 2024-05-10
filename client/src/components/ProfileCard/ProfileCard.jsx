import React from 'react'
import './ProfileCard.css'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'

const ProfileCard = () => {
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="Profile" />
        <img src={Profile} alt="Profile" />
      </div>
      <div className="ProfileName">
        <span>John Doe</span>
        <span>Senior UI/UX Designer</span>
      </div>

      <div className="ProfileFollow">
        <hr />
        <div>
          <div className="Follow">
            <span>1.5k</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="Follow">
            <span>2k</span>
            <span>Following</span>
          </div>
        </div>
        <hr />
      </div>
      <span>
        My Profile
      </span>
    </div>
  )
}

export default ProfileCard
