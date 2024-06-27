import React from 'react'
import './Pomodoro.scss'
import Logo from '../../img/logo.png'

const DashHome = () => {
  return (
    <>
      <div className="bg-gray-200 z-50">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-gray-400 p-2 ">
          <div class="w-9 h-9 relative">
            <img src={Logo} alt="" />
          </div>
          <div class="w-48 h-4 bg-gray-500 rounded-full"></div>
          <div class="w-8 h-8 bg-gray-500 rounded-full"></div>
        </div>
        <div className="flex">
          {/* sidebar */}
          <div className="w-[48px] h-screen bg-gray-300 flex flex-col items-center py-4 space-y-4">
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          </div>
          {/* <!-- Main Content --> */}
          <div class="flex-grow p-4 space-y-4">
            {/* <!-- Main Section --> */}
            <div class="flex space-x-4">
              {/* <!-- Timers Section --> */}
              <div class="bg-white border-2 p-4 flex-grow">
                <div class="flex items-center justify-center h-40 bg-gray-200 rounded-full mb-4">
                  <span class="text-black">Timers</span>
                </div>
                <div class="bg-white h-10 mb-2"></div>
                <div class="bg-white h-10 mb-2"></div>
                <div class="bg-white h-10"></div>
              </div>
              {/* <!-- Right Sidebar --> */}
              <div class="bg-gray-400 w-40 h-40"></div>
            </div>
            {/* <!-- Bottom Section --> */}
            <div class="bg-gray-400 h-40"></div>
          </div>
          {/* Right bar */}
        </div>
      </div>
    </>
  )
}

export default DashHome
