import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import { useTranslation } from 'react-i18next'

const Conversation = ({ data, currentUserId, online }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [userData, setUserData] = useState(null)
  const { t } = useTranslation(['chat'])

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
          <div className="relative">
            <img
              src={
                userData?.profilePicture
                  ? serverPublic + userData.profilePicture
                  : serverPublic + 'defaultProfile.jpg'
              }
              className="w-12 h-12 object-cover rounded-full"
              alt="failed to load"
            />
            {online && (
              <div className="w-3 h-3 bg-green-400 rounded-full absolute top-[1px] right-[2px] transform border-[1px]"></div>
            )}
          </div>
          <div className="flex flex-col items-start justify-center text-xs">
            <span className="font-bold">
              {userData?.firstname} {userData?.lastname}
            </span>
            <span>{online ? t('online') : t('offline')}</span>
          </div>
        </div>
      </div>
      <hr className="w-[90%] border border-gray-200" />
    </>
  )
}

export default Conversation
