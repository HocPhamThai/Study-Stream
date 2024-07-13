import React, { useState } from 'react'
import { useContext } from 'react'
import SettingsContext from '../../store/SettingsContext'
import clock_icon from '../../img/icon_pomodoro/clock.png'

const ModalTimer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [tempWorkMinutes, setTempWorkMinutes] = useState(25)
  const [tempBreakMinutes, setTempBreakMinutes] = useState(5)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleSetTime = () => {
    settingsInfo.setWorkMinutes(tempWorkMinutes)
    settingsInfo.setBreakMinutes(tempBreakMinutes)
    toggleModal()
  }

  const toggleModalCancel = () => {
    // settingsInfo.setWorkMinutes(25)
    // settingsInfo.setBreakMinutes(5)
    setIsOpen(!isOpen)
  }

  const settingsInfo = useContext(SettingsContext)

  return (
    <>
      {/* <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Set Times
      </button> */}
      <img src={clock_icon} alt="Set Times" onClick={toggleModal} className="cursor-pointer size-8" />
      {isOpen && (
        <div
          id="progress-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModalCancel}
              >
                <span className="sr-only">Close modal</span>✕
              </button>
              <div className="p-4 md:p-5">
                <h3 className="mb-1 text-xl font-bold text-gray-90 flex items-center justify-center">Set times</h3>
                <div className="mt-4 flex items-center gap-6">
                  <p className="w-full font-medium ">Work time (in min)</p>
                  <input
                    min="1"
                    max="120"
                    value={tempWorkMinutes}
                    onChange={(e) => setTempWorkMinutes(Number(e.target.value))}
                    className="w-[100px] rounded-lg border-2 border-default-300 px-4 py-1.5 focus:outline-none"
                    type="number"
                  />
                </div>

                <div className="mt-4 flex items-center gap-6">
                  <p className="w-full font-medium">Break time(in min): </p>
                  <input
                    min="1"
                    max="120"
                    // value={settingsInfo.breakMinutes}
                    // onChange={e => settingsInfo.setBreakMinutes(Number(e.target.value))}
                    value={tempBreakMinutes}
                    onChange={(e) => setTempBreakMinutes(Number(e.target.value))}
                    className="w-[100px] rounded-lg border-2 border-default-300 px-4 py-1.5 focus:outline-none"
                    type="number"
                  />
                </div>

                <div className="flex items-center mt-6 space-x-4">
                  <button
                    onClick={handleSetTime}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Set time
                  </button>
                  <button
                    onClick={toggleModalCancel}
                    type="button"
                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalTimer
