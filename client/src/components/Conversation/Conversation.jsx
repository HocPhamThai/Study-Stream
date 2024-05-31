import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import './Conversation.scss'

const Conversation = ({ data, currentUserId }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [userData, setUserData] = useState(null)

  const friendId = data.members.find((id) => id !== currentUserId)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getUser(friendId)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])
  return (
    <>
      <div className="conversation">
        <div>
          <div className="online-dot"></div>
          <img
            src={
              userData?.profilePicture
                ? serverPublic + userData.profilePicture
                : serverPublic + 'defaultProfile.jpg'
            }
            className="followerImage"
            style={{ width: '50px', height: '50px' }}
            alt="failed to load"
          />
          <div className="name" style={{ fontSize: '0.8rem' }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span>Online</span>
          </div>
        </div>
      </div>
      <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
    </>
  )
}

export default Conversation
