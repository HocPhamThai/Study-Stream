import React from 'react'
import './Profile.css'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import PostSide from '../../components/PostSide/PostSide'

const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <dir className="Profile-center">
        <ProfileCard />
        <PostSide />
      </dir>
    </div>
  )
}

export default Profile
