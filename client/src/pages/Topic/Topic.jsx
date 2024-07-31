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
import Playlist from '../../components/FavoritePlaylist/FavoritePlaylist'
import { TbRuler2 } from 'react-icons/tb'
import RandomPlaylist from '../../components/RandomPlaylist/RandomPlaylist'
import FavoritePlaylist from '../../components/FavoritePlaylist/FavoritePlaylist'
import motivationIcon from './motivationIcon.png'
// import motivationIcon from './motivationIcon2.png'

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
      coverImage: 'https://corodomo.com/assets/images/angry.png',
      name: 'Coding',
      description:
        'Coding Motivation features inspiring videos to boost your enthusiasm and productivity in programming',
    },
    {
      topicId: 'lofichill',
      coverImage: 'https://corodomo.com/assets/images/squid.png',
      name: 'Lofi',
      description:
        'Lofi Chill is relaxing, gentle music, perfect for studying, working,...',
    },
    {
      topicId: 'city',
      coverImage: 'https://corodomo.com/assets/images/frog.png',
      name: 'City',
      description:
        'City features videos capturing the vibrant and bustling cityscapes,...',
    },
    {
      topicId: 'nature',
      coverImage: 'https://corodomo.com/assets/images/hamster.png',
      name: 'Nature',
      description:
        'The space brings a sense of tranquility and closeness to nature.',
    },
    {
      topicId: 'cafe',
      coverImage: 'https://corodomo.com/assets/images/corgi.png',
      name: 'Cafe',
      description:
        'The lively and cozy atmosphere of a coffee shop provides an ideal setting for concentration and creativity.',
    },
    {
      topicId: 'other',
      coverImage: 'https://corodomo.com/assets/images/yawn.png',
      name: 'Other',
      description: 'Study with Corodomo',
    },
  ]

  const handleOptionSelect = (option) => {
    navigate(`/topic/${option}`)
  }

  return (
    <div className="bg-gray-200 z-50 -m-4">
      <div className="flex justify-between items-center bg-transparent p-2 ">
        <div className="w-auto h-9 relative ml-3 flex items-center space-x-5">
          <img
            style={{ width: '50px', height: '38px' }}
            src={Logo}
            alt="Logo"
          />
          <span className="text-lg">
            Hi, {user.firstname + ' ' + user.lastname}
          </span>
        </div>
        <div className="relative mr-2">
          <AvatarDropdown />
        </div>
      </div>
      <div className="flex">
        {/* sidebar */}
        <LeftSideBar />
        {/* Main content */}
        <div className="flex-1 p-4 m-auto my-4 max-w-5xl rounded-lg bg-white px-6 py-4">
          <div className="mb-4 ">
            <div className="flex items-center">
              <span className="ml-5 font-bold">Work Space</span>
            </div>
          </div>
          <div className="my-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <div className="w-full relative col-start-1 col-end-4 m-auto flex items-center gap-4 rounded-xl text-white shadow-md mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <div className="w-3/5 p-8">
                <div className="mb-4 flex w-fit items-center gap-1 rounded-xl bg-white/20 px-3 py-1 text-xs text-white">
                  Noti
                </div>
                <p className="text-medium font-semibold md:text-lg">
                  Investing in self-development enhances mental well-being and
                  quality of life.
                </p>
                <p className="mt-4 text-sm">
                  Engage in at least one activity every day!
                </p>
              </div>
              <div className="flex flex-1 justify-center [transform:rotateY(180deg)]">
                <img
                  className="w-[120px] h-[120px]"
                  src={motivationIcon}
                  alt=""
                />
              </div>
            </div>

            {topics.map((topic) => (
              <div
                onClick={() => handleOptionSelect(topic.topicId)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-center md:p-4">
                  <img
                    className="h-[120px] md:h-[150px]"
                    src={topic.coverImage}
                    alt=""
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="font-bold">{topic.name}</p>
                  <div className="flex h-full flex-col items-end justify-between gap-2 md:flex-row md:items-center">
                    <div className="w-full overflow-hidden text-ellipsis">
                      <div className="w-full overflow-hidden text-sm line-clamp-3">
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

            <div className="w-full col-start-1 col-end-4">
              <Chart />
            </div>
          </div>
        </div>
        {/* Right bar */}
        {/* <div className="w-96 mr-5 ">
          <div className="flex flex-col rounded-2xl bg-white p-6">
            <div className="mb-4 flex justify-between">
              <p className="font-bold">Playlists for you</p>
              <p className="cursor-pointer text-sm font-medium text-cl-1">View Alls</p>
            </div>
            <div className="mt-2 flex flex-col gap-7">
              <div className="flex items-center gap-5">
                <img src="https://i3.ytimg.com/vi/GLGNGUnlPaU/maxresdefault.jpg" alt="corodomo" className="size-[70px] rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-medium">Summer Chill Work 🌿</p>
                  <div className="mt-2 w-fit cursor-pointer rounded-full px-3 py-1 text-sm text-cl-1">
                    <div className="mt-2 w-fit cursor-pointer rounded-full px-3 py-1 text-sm text-cl-1">
                      <Link to="/pomodoro">Start</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <img src="https://i3.ytimg.com/vi/GLGNGUnlPaU/maxresdefault.jpg" alt="corodomo" className="size-[70px] rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-medium">Summer Chill Work 🌿</p>
                  <div className="mt-2 w-fit cursor-pointer rounded-full px-3 py-1 text-sm text-cl-1">
                    <div className="mt-2 w-fit cursor-pointer rounded-full px-3 py-1 text-sm text-cl-1">
                      <Link to="/pomodoro">Start</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <img src="https://i3.ytimg.com/vi/GLGNGUnlPaU/maxresdefault.jpg" alt="corodomo" className="size-[70px] rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-medium">Summer Chill Work 🌿</p>
                  <div className="mt-2 w-fit cursor-pointer rounded-full px-3 py-1 text-sm text-cl-1">
                    <div className="mt-2 w-fit cursor-pointer rounded-full px-3 py-1 text-sm text-cl-1">
                      <Link to="/pomodoro">Start</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="w-96 mr-5 ">
          <FavoritePlaylist />
          <div className="mt-3 mb-3"></div>
          <RandomPlaylist />
        </div>
      </div>
    </div>
  )
}

export default Topic
