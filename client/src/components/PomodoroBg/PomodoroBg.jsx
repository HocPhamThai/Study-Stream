import React from 'react'
import Logo from '../../img/logo.png'
import 'react-circular-progressbar/dist/styles.css'
import SettingsButton from '../../components/PomoButton/SettingsButton'
import ModalTimer from '../../components/PomoButton/ModalTimer'
import SettingsContext from '../../store/SettingsContext'
import { useState, useContext } from 'react'
import Timer from '../../components/Timer/Timer'
import ModalChangeBackgound from '../../components/PomoButton/ModalChangeBackgound'
import './PomodoroBg.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MusicPlayer from '../../components/PomoButton/MusicPlayer'
import { logOut } from '../../actions/AuthAction'

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

function PomodoroBg() {
  const settingsInfo = useContext(SettingsContext)
  const { user } = useSelector((state) => state.authReducer.authData)
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const style = {
    background: settingsInfo.bgColor,
  }

  return (
    <div className="z-50 -m-4 min-h-screen flex flex-col h-screen bg-gradient-to-r from-orange-400" style={style} >
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-transparent p-2 ">
        <div className="w-auto h-9 relative ml-5 flex items-center space-x-5">
          <img className="h-full" src={Logo} alt="Logo" />
          <span className='text-lg'>Hi, {user.lastname} {user.firstname}</span>
          <a href="/dashhome" className='flex cursor-pointer flex-center '>
            <svg
              className='size-[30px] '
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
              <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
              />
            </svg>
            <span className='text-lg'>Back</span>
          </a>
        </div>
        <div className="relative mr-2">
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
      </div>
      {/* <!-- Main Content --> */}
      <div className="flex-1 flex">
        {/* sidebar */}
        <div className="w-[48px] ml-5 h-screen bg-transparent flex flex-col items-center py-4 space-y-4 ">
          <span class="flex size-10 cursor-pointer items-center justify-center rounded-2xl p-2 md:size-[48px] hover:bg-orange-300">
            <div style={{ width: '100%', height: '100%' }}>
              <Link to="/dashhome">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-75">
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
              </Link>
            </div>
          </span>
          <span class="flex size-10 cursor-pointer items-center justify-center rounded-2xl p-2 md:size-[48px] hover:bg-orange-300">
            <div style={{ width: '100%', height: '100%' }}>
              <Link to="/pomodoro">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-75">
                  <path
                    fillRule="evenodd"
                    d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </span>
          <span class="flex size-10 cursor-pointer items-center justify-center rounded-2xl p-2 md:size-[48px] hover:bg-orange-300">
            <div style={{ width: '100%', height: '100%' }}>
              <Link to={'/profile/' + user._id}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 opacity-75">
                  <path
                    fill-rule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </span>
          <span class="flex size-10 cursor-pointer items-center justify-center rounded-2xl p-2 md:size-[48px] hover:bg-orange-300">
            <div style={{ width: '100%', height: '100%' }}>
              <Link to="/studyroom">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-75">
                  <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>
              </Link>
            </div>
          </span>
          <span class="flex size-10 cursor-pointer items-center justify-center rounded-2xl p-2 md:size-[48px] hover:bg-orange-300">
            <div style={{ width: '100%', height: '100%' }}>
              <Link to="/dashhome">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-75">
                  <path
                    fillRule="evenodd"
                    d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </span>
        </div>

        <div className="flex-1 p-4 relative">

          {/* <!-- Main Section --> */}
          <div className="fixed top-28 left-1/2 transform -translate-x-1/2 w-auto h-auto items-center space-x-4">
            {/* <!-- Timers Section --> */}
            <Timer />
          </div>
          {/* <!-- Bottom Section --> */}
          <div className="absolute w-full bottom-20 left-1/2 transform -translate-x-1/2 bg-transparent ">
            <MusicPlayer />
          </div>
        </div>
        {/* Right bar */}
        <div className="w-[56px] mr-5 bg-transparent flex flex-col items-center py-4 space-y-4 ">
          <div className='bg-gray-900 p-3 space-y-4 rounded-lg'>
            <ModalTimer />
            <ModalChangeBackgound />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PomodoroBg