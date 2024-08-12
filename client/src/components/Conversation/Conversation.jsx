import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'

const Conversation = ({ data, currentUserId, online }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [userData, setUserData] = useState(null)

  const friendId = data?.members?.find((id) => id !== currentUserId)
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
  }, [friendId])

  return (
    <>
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2.5">
          {online && (
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          )}
          <img
            src={
              userData?.profilePicture
                ? serverPublic + userData.profilePicture
                : serverPublic + 'defaultProfile.jpg'
            }
            className="w-12 h-12 object-cover rounded-full"
            alt="failed to load"
          />
          <div className="flex flex-col items-start justify-center text-xs">
            <span className="font-bold">
              {userData?.firstname} {userData?.lastname}
            </span>
            <span>{online ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
      <hr className="w-[85%] border border-gray-200" />
    </>
  )
}

export default Conversation
