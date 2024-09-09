import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useContext } from 'react'
import { logOut } from '../../actions/AuthAction'
import profile from './profile.png'
import logout from './logout.png'
import { useTranslation } from 'react-i18next'

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

function AvatarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const { t } = useTranslation('navbar')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLogOut = () => {
    dispatch(logOut())
  }



  return (
    <div>
      <button
        id="avatarButton"
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          className="w-11 h-11 bg-gray-500 rounded-full mx-4 border-[3px] hover:border-[#f95f35] border-[#f9a225]"
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + 'defaultProfile.jpg'
          }
          alt="User Avatar"
        />
      </button>
      {isOpen && (
        <div
          id="userDropdown"
          className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <div className="px-4 py-3 text-sm text-gray-900 ">
            <div className=" font-bold truncate">
              {user.lastname} {user.firstname}</div>
            <div className="font-small truncate text-gray-400">{user.username}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
            <li>
              <a href={`/profile/${user._id}`} className="flex px-4 py-2 hover:bg-gray-100">
                <img src={profile} alt="" className='w-[18px] h-[18px]' />
                <span className='ml-2'>{t('Profile')}</span>
              </a>
            </li>
            <li>
              <a href="https://insigh.to/b/studystream" target="_blank" className="flex px-4 py-2 hover:bg-gray-100">
                <img src="https://corodomo.com/assets/images/email.png" alt="" className='w-[18px] h-[18px]' />
                <span className='ml-2'>{t('Help center')}</span>
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
              onClick={handleLogOut}
            >
              <img src={logout} alt="" className='w-[20px] h-[20px]' />
              <span className='ml-2'>{t('Logout')}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default AvatarDropdown