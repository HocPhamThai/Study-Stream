import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import TaskModal from '../../components/TaskModal/TaskModal'
import { useState } from 'react'
import './Profile.scss'

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <div className="Profile">
      <ProfileLeft />

      <div className="Profile-center">
        <ProfileCard location="ProfilePage" />
        <PostSide />
        <div>
          <TaskModal />
        </div>
      </div>

      <RightSide />

    </div>
  )
}

export default Profile
