import React from 'react'
import './DashHome.scss'
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
          {/* Main content */}
          <div className="flex-1 p-4">
            {/* Start now */}
            <div class="bg-gray-300 h-32 flex items-center justify-center mb-4">
              <button class="bg-white py-2 px-4 rounded shadow">Start Now</button>
            </div>
            <div className="grid grid-cols-6">
              {/* Study Room section */}
              <div class="col-start-1 col-end-5 bg-gray-300 h-32 flex items-center justify-center">
                <button class="bg-white py-2 px-4 rounded shadow">Study Room</button>
              </div>

              {/* Stats section */}
              <div class="col-start-1 col-end-5 bg-gray-300 h-32 flex space-x-4 mt-4 p-4">
                <div class="bg-white flex-1 flex items-center justify-center p-4 shadow">Total stars</div>
                <div class="bg-white flex-1 flex items-center justify-center p-4 shadow">Total posts</div>
                <div class="bg-white flex-1 flex items-center justify-center p-4 shadow">Total hours</div>
              </div>
              {/* Right sidebar */}
              <div class="col-start-5 col-end-7 row-start-1 row-end-3 bg-gray-300 w-full space-x-4 ml-4 p-4">cc</div>
            </div>
          </div>
          {/* Right bar */}
        </div>
      </div>
    </>
  )
}

export default DashHome
