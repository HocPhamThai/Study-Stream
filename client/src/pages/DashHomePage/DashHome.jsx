import React from 'react'
import './DashHome.scss'
import Logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const DashHome = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)

  return (
    <div className="bg-gray-200 z-50 -m-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-white h-[52px]">
        <span className="rounded-full bg-gray-200 w-11 h-11 mx-4">
          <img className="w-12 h-12 bg-center" src={Logo} alt="" />
        </span>
        <div className="w-48 h-4 bg-gray-500 rounded-full"></div>
        <div className="w-11 h-11 bg-gray-500 rounded-full mx-4"></div>
      </div>
      <div className="flex">
        {/* sidebar */}
        <div className="w-[48px] h-screen flex flex-col items-center py-4 space-y-4 mx-auto ml-4">
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
        {/* Main content */}
        <div className="flex-1 p-4">
          {/* Start now */}
          <div className="relative m-auto flex items-center gap-4 rounded-2xl text-white shadow-md mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-3/5 p-8">
              <div className="mb-4 flex w-fit items-center gap-1 rounded-xl bg-white/20 px-3 py-1 text-xs text-white">Noti</div>
              <p className="text-medium font-semibold md:text-lg">Make your work chilling with my app</p>
              <p className="mt-4 text-sm">Work balance && Love your work</p>
              <div className="mt-4">
                <button className="bg-transparent px-4 py-2 border border-red-100 hover:shadow-md" type="button">
                  Start now
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 ">
            {/* Study Room section */}
            <div className="p-8 w-full bg-gradient-to-r from-cyan-500 to-blue-500 col-start-1 col-end-5 bg-gray-300 m-auto flex flex-col items-start gap-4 rounded-2xl text-white shadow-md">
              <p className="text-medium font-semibold md:text-lg">Study together with strangers</p>
              <p className="mt-4 text-sm">Work balance && Love your work</p>
              <button className="bg-transparent px-4 py-2 border border-red-100 hover:shadow-md" type="button">
                Study Room
              </button>
            </div>

            {/* Stats section */}
            <div className="col-start-1 col-end-5 bg-gray-300 h-32 flex space-x-4 p-4">
              <div className="bg-white flex-1 flex items-center justify-center p-4 shadow">Total stars</div>
              <div className="bg-white flex-1 flex items-center justify-center p-4 shadow">Total posts</div>
              <div className="bg-white flex-1 flex items-center justify-center p-4 shadow">Total hours</div>
            </div>
            {/* Right sidebar */}
            <div className="col-start-5 col-end-7 row-start-1 row-end-3 bg-gray-300 w-full space-x-4 p-4">Chat Area</div>
          </div>
        </div>
        {/* Right bar */}
      </div>
    </div>
  )
}

export default DashHome
