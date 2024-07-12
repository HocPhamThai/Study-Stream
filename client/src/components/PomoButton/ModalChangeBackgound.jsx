import React, { useState, useContext } from 'react'
import SettingsContext from '../../store/SettingsContext'
import settings_icon from '../../img/icon_pomodoro/settings.png'

function ModalChangeBackgound() {
  const [isOpen, setIsOpen] = useState(false)
  const [tempColor, setTempColor] = useState('')

  const handleClick = (colors) => {
    const gradient = `linear-gradient(53deg, ${colors.join(', ')})`;
    setTempColor(gradient); // Cập nhật tempColor
  };

  const handleSetColor = () => {
    settingsInfo.setBgColor(tempColor);
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }
  const colorOptions = [
    ['rgb(249, 193, 177)', 'rgb(251, 128, 133)'],
    ['rgb(173, 216, 230)', 'rgb(0, 191, 255)'],
    ['rgb(144, 238, 144)', 'rgb(34, 139, 34)'],
    ['rgb(255, 255, 224)', 'rgb(255, 215, 0)'],
    ['rgb(238, 156, 167)', 'rgb(255, 221, 225)'],
    ['rgb(229, 230, 255)', 'rgb(177, 178, 255)'],
    ['rgb(154, 181, 225)', 'rgb(243, 159, 220)'],
    ['rgb(184, 241, 176)', 'rgb(0, 255, 171)'],
    ['rgb(232, 93, 4)', 'rgb(250, 163, 7)'],
    ['#fff', '#fff']
  ];

  const settingsInfo = useContext(SettingsContext)

  return (
    <div>
      <img
        src={settings_icon}
        alt="Set Times"
        onClick={toggleModal}
        className="cursor-pointer size-8"
      />

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
                onClick={toggleModal}
              >
                <span className="sr-only">Close modal</span>
                ✕
              </button>
              <div className="p-4 md:p-5">
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white text flex items-center justify-center">
                  Set color
                </h3>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {colorOptions.map((colors, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer items-center gap-2"
                      onClick={() => handleClick(colors)}
                    >
                      <div
                        className="w-12 h-12 rounded-full shadow hover:opacity-90 border border-default-100"
                        style={{ background: `linear-gradient(53deg, ${colors.join(', ')})` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center mt-6 space-x-4">
                  <button
                    onClick={handleSetColor}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Set color
                  </button>
                  <button
                    onClick={toggleModal}
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
    </div>
  )
}

export default ModalChangeBackgound
