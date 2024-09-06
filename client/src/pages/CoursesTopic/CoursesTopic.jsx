import React from 'react'
import Logo from '../../img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState, useContext } from 'react'
import axios from 'axios'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import AvatarDropdown from '../../components/AvatarDropdown/AvatarDropdown'
import OptionList from '../../components/OptionList/OptionList'
import RandomPlaylist from '../../components/RandomPlaylist/RandomPlaylist'
import FavoritePlaylist from '../../components/FavoritePlaylist/FavoritePlaylist'
import HorizontalNavbar from '../../components/HorizontalNavbar/HorizontalNavbar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import LearnOnYoutube from '../../components/LearnOnYoutube/LearnOnYoutube'
import { useTranslation } from 'react-i18next'
import ChangeLanguage from '../../components/ChangeLanguage/ChangeLanguage'

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

const CoursesTopic = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { t } = useTranslation(['learning', 'dashhome'])

  const topics = [
    { courseId: 'programing', coverImage: 'https://i.imgur.com/WhanzfL.png' },
    { courseId: 'design', coverImage: 'https://i.imgur.com/JX0QuCS.png' },
    { courseId: 'languages', coverImage: 'https://i.imgur.com/bsJY58d.png' },
    { courseId: 'photograph', coverImage: 'https://i.imgur.com/5iAUMio.png' },
    { courseId: 'softskills', coverImage: 'https://i.imgur.com/pKls9Z2.png' },
    { courseId: 'subject', coverImage: 'https://i.imgur.com/JyPt1cJ.png' },
  ]

  const handleOptionSelect = (option) => {
    navigate(`/courses-topic/${option}`)
  }

  return (
    <div className="bg-gray-200 z-50 -m-4">
      <div className="flex justify-between items-center bg-transparent p-2">
        <div className="w-auto h-9 relative ml-3 flex items-center space-x-5">
          <img
            style={{ width: '50px', height: '38px' }}
            src={Logo}
            alt="Logo"
          />
          {console.log("User: ", user)}
          <span className="text-lg">
            {t('dashhome:header.hi')}, {user.firstname + ' ' + user.lastname}
          </span>
        </div>

        <div className="relative mr-2 flex">
          <div className=' m-auto'><ChangeLanguage /></div>

          <AvatarDropdown />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* sidebar */}
        <div className='hidden lg:block'>
          <LeftSideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 m-auto my-4 max-w-5xl rounded-lg bg-white px-6 py-4">
          <div className="mb-4">
            <div className="flex items-center">
              <span className="ml-5 font-bold">{t('title')}</span>
            </div>
          </div>
          <div className="my-2 grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <div className="w-full p-3 col-span-2 md:col-span-2 lg:col-span-3 relative m-auto flex items-center gap-4 rounded-xl text-white shadow-md mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <div className="w-full md:w-3/5 p-4 md:p-8">
                <div className="mb-4 flex w-fit items-center gap-1 rounded-xl bg-white/20 px-3 py-1 text-xs text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="#fff" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7281 21.9137C11.8388 21.9715 11.9627 22.0009 12.0865 22C12.2103 21.999 12.3331 21.9686 12.4449 21.9097L16.0128 20.0025C17.0245 19.4631 17.8168 18.8601 18.435 18.1579C19.779 16.6282 20.5129 14.6758 20.4998 12.6626L20.4575 6.02198C20.4535 5.25711 19.9511 4.57461 19.2082 4.32652L12.5707 2.09956C12.1711 1.96424 11.7331 1.96718 11.3405 2.10643L4.72824 4.41281C3.9893 4.67071 3.496 5.35811 3.50002 6.12397L3.54231 12.7597C3.5554 14.7758 4.31448 16.7194 5.68062 18.2335C6.3048 18.9258 7.10415 19.52 8.12699 20.0505L11.7281 21.9137ZM10.7836 14.1089C10.9326 14.2521 11.1259 14.3227 11.3192 14.3207C11.5125 14.3198 11.7047 14.2472 11.8517 14.1021L15.7508 10.2581C16.0438 9.96882 16.0408 9.50401 15.7448 9.21866C15.4478 8.9333 14.9696 8.93526 14.6766 9.22454L11.3081 12.5449L9.92885 11.2191C9.63186 10.9337 9.15467 10.9367 8.8607 11.226C8.56774 11.5152 8.57076 11.98 8.86775 12.2654L10.7836 14.1089Z" fill="currentColor"></path></svg>
                  Noti
                </div>
                <p className="text-medium font-semibold md:text-lg">
                  {t('noti.title')}

                </p>
                <p className="mt-4 text-sm">{t('noti.description')}</p>
              </div>
              <div className="flex flex-1 justify-center">
                <img className="w-[160px] h-[121px]" src='https://i.imgur.com/K9Oow0V.png' alt="" />
              </div>
            </div>

            {topics.map(topic => (
              <div
                key={topic.courseId}
                onClick={() => handleOptionSelect(topic.courseId)}
                className="cursor-pointer group relative col-span-1 flex flex-col gap-4 overflow-hidden rounded-3xl shadow-sm"
                style={{ backgroundColor: 'rgba(225,203,172,0.5)' }}
              >
                <div className='flex items-center justify-center md:p-4'>
                  <img className='h-[120px] md:h-[150px]' src={topic.coverImage} alt="" />
                </div>
                <div className='flex flex-1 flex-col p-4' style={{ backgroundColor: 'rgba(255, 235, 245)' }}>
                  <p className='font-bold'>{t(`topics.${topic.courseId}.name`)}</p>
                  <div className='flex h-full flex-col items-end justify-between gap-2 md:flex-row md:items-center'>
                    <div className='w-full overflow-hidden text-ellipsis'>
                      <div className='w-full overflow-hidden text-sm line-clamp-3'>
                        <p>{t(`topics.${topic.courseId}.description`)}</p>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-[#f9a225] to-[#f95f35] z-0 px-4 py-2 rounded-lg text-white">
                      {t('start')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden xl:block w-96 mr-5 lg:mr-5 mt-5 lg:mt-0">
          <LearnOnYoutube />
        </div>
        <div className="fixed bottom-3 left-0 right-0 lg:hidden mt-2 mx-auto w-max z-50">
          <HorizontalNavbar />
        </div>
      </div>
    </div>
  )
}

export default CoursesTopic
