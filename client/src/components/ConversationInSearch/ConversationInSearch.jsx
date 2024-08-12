import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'

const ConversationInSearch = ({ data, setShowChat }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [userData, setUserData] = useState(null)

  const userId = data._id || null
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

  const handleClick = () => {
    setShowChat(true)
  }

  return (
    <>
      <div className="cursor-pointer" onClick={handleClick}>
        <div className="flex gap-2.5">
          <img
            src={
              userData?.profilePicture
                ? serverPublic + userData.profilePicture
                : serverPublic + 'defaultProfile.jpg'
            }
            className="rounded-full w-12 h-12 object-cover"
            alt="failed to load"
          />
          <div className="flex flex-col items-start justify-center text-xs">
            <span className="font-bold">
              {userData?.firstname} {userData?.lastname}
            </span>
          </div>
        </div>
      </div>
      <hr className="w-[90%] border border-gray-200" />
    </>
  )
}

export default ConversationInSearch
