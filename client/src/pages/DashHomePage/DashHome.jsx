import React from 'react'
import './DashHome.scss'
import Logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState, useContext } from 'react'
import axios from 'axios'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import Posts from './../../components/Posts/Posts'
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

const DashHome = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const { posts } = useSelector((state) => state.postReducer)
  const [dailyDuration, setDailyDuration] = useState(null)

  const focusRoom1 = () => {
    window.location = `studyroom?room=${1}`
  }
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours} hours ${minutes} minutes`
    } else {
      return `${minutes} minutes`
    }
  }

  useEffect(() => {
    const fetchDuration = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/workingtime/${user._id}/daily`)
        if (response.data) {
          setDailyDuration(response.data)
        } else {
          setDailyDuration(0) // Giá trị mặc định khi không có dữ liệu
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin duration:', error)
        setDailyDuration(0) // Giá trị mặc định khi có lỗi
      }
    }

    if (user && user._id) {
      fetchDuration()
    }
  }, [user])

  return (
    <div className="bg-gray-200 z-50 -m-4">
      {/* {console.log(">>> Daily duration: ", formatDuration(dailyDuration.todayDuration))} */}
      {/* {console.log(">>> Daily duration: ", dailyDuration?.todayDuration)} */}

      {/* Top Bar */}
      <div className="flex justify-between items-center bg-transparent p-2 ">
        <div className="w-auto h-9 relative ml-5 flex items-center space-x-5">
          <img className="h-full" src={Logo} alt="Logo" />
          <span className="text-lg">Hi, {user.firstname + ' ' + user.lastname}</span>
        </div>
        <div>
          <img
            className="w-11 h-11 bg-gray-500 rounded-full mx-4"
            src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + 'defaultProfile.jpg'}
            alt=""
          />
        </div>
      </div>
      <div className="flex">
        {/* sidebar */}
        <LeftSideBar />
        {/* Main content */}
        <div className="flex-1 p-4">
          {/* Start now */}
          <div className="relative m-auto flex items-center gap-4 rounded-xl text-white shadow-md mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-3/5 p-8">
              <div className="mb-4 flex w-fit items-center gap-1 rounded-xl bg-white/20 px-3 py-1 text-xs text-white">Noti</div>
              <p className="text-medium font-semibold md:text-lg">Make your work chilling with my app</p>
              <p className="mt-4 text-sm">Work balance && Love your work</p>
              <div className="mt-4">
                <Link to="/pomodoro">
                  <button className="bg-transparent px-4 py-2 border border-red-100 hover:shadow-md rounded-xl" type="button">
                    Start now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6  gap-4 ">
            {/* Stats section */}
            <div className="col-start-1 col-end-5 bg-gradient-to-r from-[#FF9C1D]  to-[#FFF161] h-32 flex space-x-4 p-4 rounded-xl">
              <div className="bg-[#FFF161] flex flex-1 flex-col items-center justify-center p-4 shadow">
                <div> Your Story:</div>
                <div>{posts.length}</div>
              </div>
              <div className="bg-[#FFF161] flex flex-1 flex-col  items-center justify-center p-4 shadow">
                <div>Total time:</div>
                <div>{formatDuration(dailyDuration?.todayDuration || 0)}</div>
              </div>
            </div>
            {/* Study Room section */}
            {/* <div className="p-8 w-full bg-gradient-to-r from-cyan-500 to-blue-500 col-start-1 col-end-5 bg-gray-300 m-auto flex flex-col items-start gap-4 rounded-2xl text-white shadow-md">
              <p className="text-medium font-semibold md:text-lg">Study together with strangers</p>
              <p className="mt-4 text-sm">Work balance && Love your work</p>
              <button className="bg-transparent px-4 py-2 border border-red-100 hover:shadow-md" type="button">
                Study Room
              </button>
            </div> */}
            <div className="p-8 w-full bg-gradient-to-r from-[#FF9C1D]  to-[#FFF161] col-start-1 col-end-2 bg-gray-300 m-auto flex flex-col items-start gap-4 rounded-xl text-black shadow-md">
              <p className="text-medium font-semibold md:text-lg">Focus room 1</p>
              <p className="mt-4 text-sm">Work balance && Love your work</p>
              <button onClick={focusRoom1} className="bg-[#FF9C1D] px-4 py-2 border rounded-xl border-red-100 hover:shadow-md" type="button">
                Join now
              </button>
            </div>
            <div className="p-8 w-full bg-gradient-to-r from-[#FF9C1D]  to-[#FFF161] col-start-2 col-end-3 bg-gray-300 m-auto flex flex-col items-start gap-4 rounded-xl text-black shadow-md">
              <p className="text-medium font-semibold md:text-lg">Focus room 2</p>
              <p className="mt-4 text-sm">Work balance && Love your work</p>
              <button className="bg-[#FFCA48] px-4 py-2 border rounded-xl border-red-100 hover:shadow-md" type="button">
                Join now
              </button>
            </div>
            <div className="p-8 w-full bg-gradient-to-r from-[#FF9C1D]  to-[#FFF161] col-start-3 col-end-4 bg-gray-300 m-auto flex flex-col items-start gap-4 rounded-xl text-black shadow-md">
              <p className="text-medium font-semibold md:text-lg">Focus room 3</p>
              <p className="mt-4 text-sm">Work balance && Love your work</p>
              <button className="bg-[#FF9C1D] px-4 py-2 border rounded-xl border-red-100 hover:shadow-md" type="button">
                Join now
              </button>
            </div>
            <div className="p-8 w-full bg-gradient-to-r from-[#FF9C1D]  to-[#FFF161] col-start-4 col-end-5 bg-gray-300 m-auto flex flex-col items-start gap-4 rounded-xl text-black shadow-md">
              <p className="text-medium font-semibold md:text-lg">Focus room 4</p>
              <p className="mt-4 text-sm">Work balance && Love your work</p>
              <button className="bg-[#FFCA48] px-4 py-2 border rounded-xl border-red-100 hover:shadow-md" type="button">
                Join now
              </button>
            </div>
            {/* Right sidebar */}
            <div className="col-start-5 col-end-7 row-start-1 row-end-3 w-full space-x-4">
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
            </div>
          </div>
        </div>
        {/* Right bar */}
      </div>
    </div>
  )
}

export default DashHome
