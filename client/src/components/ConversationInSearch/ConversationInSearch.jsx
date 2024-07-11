import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import './ConversationInSearch.scss'

const ConversationInSearch = ({ data, setShowChat }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [userData, setUserData] = useState(null)

  const userId = data._id
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [userId])

  return (
    <>
      <div
        className="conversation"
        onClick={() =>
          setTimeout(() => {
            setShowChat(true)
            window.location.reload()
          }, 1000)
        }
      >
        <div>
          <img
            src={userData?.profilePicture ? serverPublic + userData.profilePicture : serverPublic + 'defaultProfile.jpg'}
            className="followerImage"
            style={{ width: '50px', height: '50px' }}
            alt="failed to load"
          />
          <div className="name" style={{ fontSize: '0.8rem' }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
    </>
  )
}

export default ConversationInSearch
