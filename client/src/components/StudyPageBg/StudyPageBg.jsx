import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ModalChangeBackgound from '../../components/PomoButton/ModalChangeBackgound'
import ModalTimer from '../../components/PomoButton/ModalTimer'
import Logo from '../../img/logo.png'
import SettingsContext from '../../store/SettingsContext'
import AvatarDropdown from '../AvatarDropdown/AvatarDropdown'
import HorizontalNavBar from '../HorizontalNavbar/HorizontalNavbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import ListLesson from '../ListLesson/ListLesson'
import TaskModal from '../TaskModal/TaskModal'
import SmallTimer from '../Timer/SmallTimer'
import { useTranslation } from 'react-i18next'
import ChangeLanguage from '../../components/ChangeLanguage/ChangeLanguage'

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
  const { t } = useTranslation('learningSpace')

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
            <span className='text-lg text-white hidden sm:flex'>Hi, {user.firstname + ' ' + user.lastname}</span>
            <Link to={`/courses-topic/${courseTopicId}/${courseId}`}>
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
          <div className="flex relative mr-2 mt-2">
            <SmallTimer onTimerEnd={handleStopVideo} />
            <div className="ml-4">
              <ChangeLanguage />
            </div>
            <AvatarDropdown />
          </div>
        </div>
        {/* <!-- Main Content --> */}
        <div className="flex-1 flex">
          {/* sidebar */}
          <div className="hidden lg:block">
            <LeftSideBar />
          </div>

          <div className="flex-1 p-4 relative">
            {/* <!-- Main Section --> */}
            <div className="fixed top-4 right-28  transform  w-auto h-auto items-center space-x-4">
              {/* <!-- Timers Section --> */}
            </div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:top-[104px] xl:left-24 xl:-translate-x-0 xl:-translate-y-0'>
              <iframe
                ref={iframeRef}
                src={`${lesson?.lessonLink}&enablejsapi=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                referrerpolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="
                  w-[400px] h-[225px]   // Tăng kích thước cho màn hình nhỏ hơn sm
                  sm:w-[500px] sm:h-[281px]   // Kích thước cho màn hình sm
                  md:w-[640px] md:h-[360px]   // Kích thước cho màn hình md
                  lg:w-[720px] lg:h-[405px]   // Kích thước cho màn hình lg
                  xl:w-[800px] xl:h-[450px]   // Kích thước cho màn hình xl
                  2xl:w-[890px] 2xl:h-[501px] // Kích thước cho màn hình 2xl
                  rounded-lg border-4 border-gray-500
                "
              ></iframe>
              <h1 className='text-white text-lg sm:text-base md:text-xl font-bold mt-2 text-center sm:text-left'>
                {lesson?.lessonName}
              </h1>
            </div>
            <div className='fixed top-[90px] right-24 hidden xl:block'>
              <ListLesson
                courseTopicId={courseTopicId}
                courseId={courseId}
                lessonId={lessonId}
              />
            </div>
            {/* <!-- Bottom Section --> */}
            <div className='flex gap-3 z-10 mt-2 block md:hidden justify-center'>
              <ModalTimer />
              <ModalChangeBackgound />
              <TaskModal />
            </div>
            <div className="absolute w-full bottom-10 left-1/2 transform -translate-x-1/2 bg-transparent ">

              <div className="block lg:hidden mt-2 mx-auto w-max">
                <HorizontalNavBar />
              </div>
            </div>

          </div>
          {/* Right bar */}
          <div className="w-[56px] mr-5 bg-transparent flex flex-col items-center py-4 space-y-4 hidden lg:block">
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
