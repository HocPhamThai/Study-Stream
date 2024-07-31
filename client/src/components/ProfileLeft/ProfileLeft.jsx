import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import InfoCard from '../InfoCard/InfoCard'
import './ProfileLeft.scss'
import LeftSideBar from './../LeftSideBar/LeftSideBar'
const ProfileLeft = () => {
  return (
    <div className="ProfileLeft">
      <LogoSearch />

      <div className="SideBar">
        <div>
          <LeftSideBar />
        </div>
        <div style={{ flex: '1' }}>
          <InfoCard />
          {/* <FollowersCard /> */}
        </div>
      </div>
    </div>
  )
}

export default ProfileLeft
