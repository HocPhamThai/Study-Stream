import React, { useContext } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ChangeLanguage from '../../components/ChangeLanguage/ChangeLanguage'
import ModalChangeBackgound from '../../components/PomoButton/ModalChangeBackgound'
import ModalTimer from '../../components/PomoButton/ModalTimer'
import MusicPlayer from '../../components/PomoButton/MusicPlayer'
import Timer from '../../components/Timer/Timer'
import Logo from '../../img/logo.png'
import SettingsContext from '../../store/SettingsContext'
import AvatarDropdown from '../AvatarDropdown/AvatarDropdown'
import HorizontalNavBar from '../HorizontalNavbar/HorizontalNavbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import TaskModal from '../TaskModal/TaskModal'
import './PomodoroBg.scss'
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

function PomodoroBg() {
  const settingsInfo = useContext(SettingsContext)
  const { user } = useSelector((state) => state.authReducer.authData)
  const { t } = useTranslation('pomodoro')

  const style = {
    background: settingsInfo.bgColor,
  }

  return (
    <div>
      <div className=" -m-4 min-h-screen overflow-hidden flex flex-col h-screen " style={style}>
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-transparent p-2 ">

          <div className="w-auto h-9 relative ml-5 flex items-center space-x-5 ">
            <img className="h-full hidden sm:flex" src={Logo} alt="Logo" />
            <div className='flex gap-3 z-10 mt-2 sm:hidden'>
              <ModalTimer />
              <ModalChangeBackgound />
              <TaskModal />
            </div>
            <span className='text-lg text-white hidden sm:flex'>{t('Hi')}, {user.firstname + ' ' + user.lastname}</span>
            <Link to="/dashhome">
              <span className='flex cursor-pointer flex-center text-white hidden sm:flex'>
                <svg
                  className='size-[30px] text-white'
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                  <path fill="currentColor" d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
                  />
                </svg>
                <span className='text-lg'>{t('Back')}</span>
              </span>
            </Link>
          </div>
          <div className="relative mr-2 flex">
            <div className=' m-auto'><ChangeLanguage /></div>
            <AvatarDropdown />
          </div>
        </div>
        {/* <!-- Main Content --> */}
        <div className="flex-1 flex">
          {/* sidebar */}
          <div className="invisible lg:visible">
            <LeftSideBar />
          </div>

          <div className="flex-1 p-4 relative">
            {/* <!-- Main Section --> */}
            <div className="fixed top-40 md:top-28 left-1/2 transform -translate-x-1/2 w-auto h-auto items-center space-x-4">
              {/* <!-- Timers Section --> */}
              <Timer />
            </div>
            {/* <!-- Bottom Section --> */}
            <div className="absolute w-full bottom-20 lg:bottom-10 left-1/2 transform -translate-x-1/2 bg-transparent ">
              <MusicPlayer />

            </div>
          </div>
          {/* Right bar */}
          <div className="w-[56px] mr-5 bg-transparent flex flex-col items-center py-4 space-y-4 ">
            <div className=" bg-gray-900 p-3 space-y-4 rounded-lg hidden md:block">
              <ModalTimer />
              <ModalChangeBackgound />
              <TaskModal />
            </div>
          </div>
        </div>
        <div className="fixed bottom-3 left-0 right-0 lg:hidden mt-2 mx-auto w-max z-50">
          <HorizontalNavBar />
        </div>
      </div>
    </div>
  )
}


export default PomodoroBg
