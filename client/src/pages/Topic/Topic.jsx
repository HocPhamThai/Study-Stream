import React from 'react'
import Logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState, useContext } from 'react'
import axios from 'axios'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import AvatarDropdown from '../../components/AvatarDropdown/AvatarDropdown'
import OptionList from '../../components/OptionList/OptionList'
import { useNavigate } from 'react-router-dom'
import Chart from '../../components/Chart/Chart'
import RandomPlaylist from '../../components/RandomPlaylist/RandomPlaylist'
import FavoritePlaylist from '../../components/FavoritePlaylist/FavoritePlaylist'
import HorizontalNavbar from '../../components/HorizontalNavbar/HorizontalNavbar'

import './Topic.scss'
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

const Topic = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const topics = [
    {
      topicId: 'coding',
      coverImage: 'https://i.imgur.com/laAuG61.png',
      name: 'Coding',
      description:
        'Coding Motivation features inspiring videos to boost your enthusiasm and productivity in programming',
    },
    {
      topicId: 'lofichill',
      coverImage: 'https://i.imgur.com/yuhXDtl.png',
      name: 'Lofi',
      description:
        'Lofi Chill is relaxing, gentle music, perfect for studying, working,...',
    },
    {
      topicId: 'city',
      coverImage: 'https://i.imgur.com/A6gLFEQ.png',
      name: 'City',
      description:
        'City features videos capturing the vibrant and bustling cityscapes,...',
    },
    {
      topicId: 'nature',
      coverImage: 'https://i.imgur.com/daGBlbw.png',
      name: 'Nature',
      description:
        'The space brings a sense of tranquility and closeness to nature.',
    },
    {
      topicId: 'cafe',
      coverImage: 'https://i.imgur.com/vZHIwfs.png',
      name: 'Cafe',
      description:
        'The lively and cozy atmosphere of a coffee shop provides an ideal setting for concentration and creativity.',
    },
    {
      topicId: 'other',
      coverImage: 'https://i.imgur.com/UKeWvvz.png',
      name: 'Other',
      description: 'Study with StudyStream',
    },
  ]

  const handleOptionSelect = (option) => {
    navigate(`/topic/${option}`)
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
            Hi, {user.firstname + ' ' + user.lastname}
          </span>
        </div>
        <div className="relative mr-2">
          <AvatarDropdown />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* sidebar */}
        <div className='hidden md:block'>
          <LeftSideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 m-auto my-4 max-w-5xl rounded-lg bg-white px-6 py-4">
          <div className="mb-4">
            <div className="flex items-center">
              <span className="ml-5 font-bold">Work Space</span>
            </div>
          </div>
          <div className="my-2 grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <div className="w-full p-3 col-span-2 md:col-span-2 lg:col-span-3 relative m-auto flex items-center gap-4 rounded-xl text-white shadow-md mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <div className="w-full md:w-3/5 p-4 md:p-8">
                <div className="mb-4 flex w-fit items-center gap-1 rounded-xl bg-white/20 px-3 py-1 text-xs text-white">
                  Noti
                </div>
                <p className="text-medium font-semibold md:text-lg">
                  Investing in self-development enhances mental well-being and quality of life.
                </p>
                <p className="mt-4 text-sm">Engage in at least one activity every day!</p>
              </div>
              <div className="flex flex-1 justify-center">
                <img className="w-[140px] h-[140px]" src='https://i.imgur.com/Cn4kCmx.png' alt="" />
              </div>
            </div>

            {topics.map(topic => (
              <div
                key={topic.topicId}
                onClick={() => handleOptionSelect(topic.topicId)}
                className="cursor-pointer group relative col-span-1 flex flex-col gap-4 overflow-hidden rounded-3xl shadow-sm"
                style={{ backgroundColor: 'rgba(225,203,172,0.5)' }}
              >
                {console.log('topic image: ', topic?.coverImage)}
                <div className='flex items-center justify-center md:p-4'>
                  <img className='h-[120px] md:h-[150px]' src={topic.coverImage} alt="" />
                </div>
                <div className='flex flex-1 flex-col p-4' style={{ backgroundColor: 'rgba(255, 235, 245)' }}>
                  <p className='font-bold'>{topic.name}</p>
                  <div className='flex h-full flex-col items-end justify-between gap-2 md:flex-row md:items-center'>
                    <div className='w-full overflow-hidden text-ellipsis'>
                      <div className='w-full overflow-hidden text-sm line-clamp-3'>
                        {topic.description}
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-[#f9a225] to-[#f95f35] z-0 px-4 py-2 rounded-lg text-white">
                      Start
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="w-full col-span-2 md:col-span-2 lg:col-span-3">
              <Chart />
            </div>
          </div>
        </div>


        <div className="w-full lg:w-96 lg:mr-5 mt-5 lg:mt-0">
          <FavoritePlaylist />
          <div className="mt-3 mb-3"></div>
          <RandomPlaylist />
        </div>
        <div className="fixed bottom-3 left-0 right-0 sm:hidden mt-2 mx-auto w-max z-50">
          <HorizontalNavbar />
        </div>
      </div>
    </div>
  )
}

export default Topic
