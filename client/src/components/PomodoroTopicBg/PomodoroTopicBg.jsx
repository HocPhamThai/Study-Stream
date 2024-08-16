import React from 'react'
import Logo from '../../img/logo.png'
import 'react-circular-progressbar/dist/styles.css'
import SettingsButton from '../../components/PomoButton/SettingsButton'
import ModalTimer from '../../components/PomoButton/ModalTimer'
import SettingsContext from '../../store/SettingsContext'
import { useState, useContext, useEffect } from 'react'
import Timer from '../../components/Timer/Timer'
import ModalChangeBackgound from '../../components/PomoButton/ModalChangeBackgound'
import './PomodoroTopicBg.scss'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MusicPlayer from '../../components/PomoButton/MusicPlayer'
import { logOut } from '../../actions/AuthAction'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import AvatarDropdown from '../AvatarDropdown/AvatarDropdown'
import axios from 'axios'
import TaskModal from '../TaskModal/TaskModal'
import HorizontalNavBar from '../HorizontalNavbar/HorizontalNavbar'

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

function PomodoroTopicBg() {
  const settingsInfo = useContext(SettingsContext)
  const [entry, setEntry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { topicType, entryId } = useParams()
  const { user } = useSelector((state) => state.authReducer.authData)

  const style = {
    background: settingsInfo.bgColor,
  }

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/topic/${topicType}/${entryId}`
        )
        setEntry(response.data)

        const postResponse = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/user/${user._id}/entry/access`,
          {
            entry: {
              topicType: topicType,
              entryId: response.data.entryId,
              name: response.data.name,
              coverImage: response.data.coverImage,
              background: response.data.background,
            },
          }
        )

        if (postResponse.status === 200 || postResponse.status === 201) {
          console.log('Post request was successful!')
        } else {
          console.error(
            'Post request failed with status: ',
            postResponse.status
          )
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEntry()
  }, [entryId, user._id])

  return (
    <div>
      <div
        className="z-40 -m-4 min-h-screen overflow-hidden flex flex-col h-screen "
        style={style}
      >
        <iframe
          className="pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          src={entry?.background}
          title="Example Iframe"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ width: '105vw', height: '120%' }}
        ></iframe>

        {/* Top Bar */}
        <div className="flex justify-between items-center bg-transparent p-2 ">
          <div className="w-auto h-9 relative ml-5 flex items-center space-x-5 ">
            <img className="h-full hidden sm:flex" src={Logo} alt="Logo" />
            <div className='flex gap-3 z-10 mt-2 sm:hidden '>
              <ModalTimer />
              <TaskModal />
            </div>
            <span className="text-lg text-white hidden sm:flex">
              Hi, {user.firstname + ' ' + user.lastname}
            </span>
            <Link to="/dashhome">
              <span className="flex cursor-pointer flex-center text-white  hidden sm:flex">
                <svg
                  className="size-[30px] text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 512"
                >
                  <path
                    fill="currentColor"
                    d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
                  />
                </svg>
                <span className="text-lg">Back</span>
              </span>
            </Link>

          </div>
          <div className="relative mr-2 ">
            <AvatarDropdown />
          </div>
        </div>
        {/* <!-- Main Content --> */}
        <div className="flex-1 flex">
          {/* sidebar */}
          <div className="invisible lg:visible z-50">
            <LeftSideBar />
          </div>
          <div className="flex-1 p-4 relative">
            {/* <!-- Main Section --> */}
            <div className="fixed top-28 left-1/2 transform -translate-x-1/2 w-auto h-auto items-center space-x-4">
              {/* <!-- Timers Section --> */}
              <Timer color="white" />
            </div>
            {/* <!-- Bottom Section --> */}
            <div className="absolute w-full bottom-20 lg:bottom-10 left-1/2 transform -translate-x-1/2 bg-transparent ">
              <MusicPlayer />
            </div>
          </div>
          {/* Right bar */}
          <div className="w-[56px] mr-5 bg-transparent flex flex-col items-center py-4 space-y-4">
            <div className="fixed top-80 z-10 bg-gray-900 p-3 space-y-4 rounded-lg hidden md:block">
              <ModalTimer />
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
export default PomodoroTopicBg
