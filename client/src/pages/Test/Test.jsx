import React from 'react'
import Logo from '../../img/logo.png'

const Test = () => {
  return (
    <div className="bg-gray-200 z-50 -m-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-gray-400 p-2 ">
        <div className="w-9 h-9 relative">
          <img src={Logo} alt="" />
        </div>
        <div className="w-48 h-4 bg-gray-500 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
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
        <div className="flex-grow p-4 space-y-4">
          {/* <!-- Main Section --> */}
          <div className="flex space-x-4">
            {/* <!-- Timers Section --> */}
            <div className="bg-white border-2 p-4 flex-grow">
              <div className="flex items-center justify-center h-40 bg-gray-200 rounded-full mb-4">
                <span className="text-black">Timers</span>
              </div>
              <div className="bg-white h-10 mb-2"></div>
              <div className="bg-white h-10 mb-2"></div>
              <div className="bg-white h-10"></div>
            </div>
            {/* <!-- Right Sidebar --> */}
            <div className="bg-gray-400 w-40 h-40"></div>
          </div>
          {/* <!-- Bottom Section --> */}
          <div className="bg-gray-400 h-40"></div>
        </div>
        {/* Right bar */}
      </div>
    </div>
  )
}

export default Test