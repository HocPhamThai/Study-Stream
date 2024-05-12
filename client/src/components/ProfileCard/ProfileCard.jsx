import React from 'react'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import './ProfileCard.scss'

function ProfileCard() {

  const ProfilePage = true
  return (
    <div className="ProfileCard">

      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="ProfileName">
        <span>De Kento</span>
        <span>Intern Developer</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>1</span>
            <span>Followings</span>
          </div>
          <div className="verticalLine"></div>
          <div className="follow">
            <span>6,890</span>
            <span>Followers</span>
          </div>
          {ProfilePage && (
            <>
              <div className='vertical-line'>
              </div>
              <div className="follow">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {ProfilePage ? '' :
        <span>
          My Profile
        </span>}
    </div >
  )
}

export default ProfileCard
