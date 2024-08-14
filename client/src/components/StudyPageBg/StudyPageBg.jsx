import React from 'react'
import Logo from '../../img/logo.png'
import 'react-circular-progressbar/dist/styles.css'
import SettingsButton from '../../components/PomoButton/SettingsButton'
import ModalTimer from '../../components/PomoButton/ModalTimer'
import SettingsContext from '../../store/SettingsContext'
import { useState, useContext, useEffect } from 'react'
import Timer from '../../components/Timer/Timer'
import ModalChangeBackgound from '../../components/PomoButton/ModalChangeBackgound'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MusicPlayer from '../../components/PomoButton/MusicPlayer'
import { logOut } from '../../actions/AuthAction'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import AvatarDropdown from '../AvatarDropdown/AvatarDropdown'
import TaskModal from '../TaskModal/TaskModal'
import HorizontalNavBar from '../HorizontalNavbar/HorizontalNavbar'
import SmallTimer from '../Timer/SmallTimer'
import FavoritePlaylist from '../FavoritePlaylist/FavoritePlaylist'
import axios from 'axios'
import ListLesson from '../ListLesson/ListLesson'
import { useRef } from 'react'
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

function StudyPageBg() {
  const settingsInfo = useContext(SettingsContext)
  const { user } = useSelector((state) => state.authReducer.authData)
  const { courseTopicId, courseId, lessonId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lesson, setLesson] = useState(null)
  const [courseLesson, setCourseLesson] = useState()
  const iframeRef = useRef(null)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/courseTopics/${courseTopicId}/courses/${courseId}/lessons/${lessonId}`
        )
        setLesson(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchLesson()
  }, [courseTopicId, courseId, lessonId])

  const style = {
    background: settingsInfo.bgColor,
  }

  const handleStopVideo = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
    }
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
            <span className='text-lg text-white hidden sm:flex'>Hi, {user.firstname + ' ' + user.lastname}</span>
            <Link to={`/courses-topic/${courseTopicId}/${courseId}`}>
              <span className='flex cursor-pointer flex-center text-white hidden sm:flex'>
                <svg
                  className='size-[30px] text-white'
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                  <path fill="currentColor" d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
                  />
                </svg>
                <span className='text-lg'>Back</span>
              </span>
            </Link>
          </div>
          <div className="flex relative mr-2 mt-2">
            <SmallTimer onTimerEnd={handleStopVideo} />

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
            <div className="fixed top-4 right-28  transform  w-auto h-auto items-center space-x-4">
              {/* <!-- Timers Section --> */}
            </div>
            {/* <div className='fixed top-20 left-1/2 transform -translate-x-1/2 '> */}
            <div className='fixed top-22 left-24 transform  '>
              <iframe
                ref={iframeRef}
                width="890"  // Kích thước tăng thêm 10%
                height="501px" // Kích thước tăng thêm 10%
                // src={lesson?.lessonLink}
                src={`${lesson?.lessonLink}&enablejsapi=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                referrerpolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-lg border-4 border-gray-500"
              ></iframe>
              <h1 className='text-white text-xl font-bold mt-2'>{lesson?.lessonName}</h1>
            </div>
            <div className='fixed top-[90px] right-24 hidden 2xl:block'>
              <ListLesson
                courseTopicId={courseTopicId}
                courseId={courseId}
                lessonId={lessonId}
              />
            </div>
            {/* <!-- Bottom Section --> */}
            <div className="absolute w-full bottom-10 left-1/2 transform -translate-x-1/2 bg-transparent ">
              <div className="block sm:hidden mt-2 mx-auto w-max">
                <HorizontalNavBar />
              </div>
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

      </div>
    </div>
  )
}


export default StudyPageBg


