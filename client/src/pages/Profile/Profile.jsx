import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import { useState } from 'react'
import './Profile.scss'
import HorizontalNavBar from '../../components/HorizontalNavbar/HorizontalNavbar'

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <div className="Profile">
      <div className="hidden sm:block">
        <ProfileLeft />
      </div>
      <div className="Profile-center">
        <div className="fixed bottom-3 left-0 right-0 sm:hidden mt-2 mx-auto w-max z-50">
          <HorizontalNavBar />
        </div>
        <ProfileCard location="ProfilePage" />
        <PostSide />
      </div>

      <div className="hidden md:block">
        <RightSide />
      </div>
    </div>
  )
}

export default Profile
