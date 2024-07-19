import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useContext } from 'react'
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

function AvatarDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const { user } = useSelector((state) => state.authReducer.authData)

  return (
    <div>
      <button
        id="avatarButton"
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          className="w-11 h-11 bg-gray-500 rounded-full mx-4"
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
          className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-medium truncate">{user.lastname} {user.firstname}</div>
            <div className="font-small truncate text-gray-400">{user.username}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
            <li>
              <a href={`/profile/${user._id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Help center
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default AvatarDropdown