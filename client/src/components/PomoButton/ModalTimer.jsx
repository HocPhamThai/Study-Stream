import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clock_icon from '../../img/icon_pomodoro/clock.png'
import SettingsContext from '../../store/SettingsContext'

const ModalTimer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [tempWorkMinutes, setTempWorkMinutes] = useState(25)
  const [tempBreakMinutes, setTempBreakMinutes] = useState(5)
  const settingsInfo = useContext(SettingsContext)
  const [allowNotifications, setAllowNotifications] = useState(false)

  const [isChecked, setIsChecked] = useState(false)
  const [isCheckedNoti, setIsCheckedNoti] = useState(false)
  const [allowNoti, setAllowNoti] = useState(false)
  const { t } = useTranslation('pomodoro')

  const handleNotificationToggle = (event) => {
    setAllowNotifications(event.target.checked)

  }

  const handleCheckboxChange2 = () => {
    setIsChecked(!isChecked)
    setAllowNoti(!isChecked)
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }
  const handleCheckboxChange = (event) => {
    setAllowNotifications(event.target.checked)
  }

  const handleSetTime = () => {
    settingsInfo.setWorkMinutes(tempWorkMinutes)
    settingsInfo.setBreakMinutes(tempBreakMinutes)
    settingsInfo.setMode('work')
    settingsInfo.setIsPaused(true)
    settingsInfo.setIsNoti(isCheckedNoti)
    settingsInfo.setIsRepeat(allowNoti)
    toggleModal()
  }

  const toggleModalCancel = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <img src={clock_icon} alt="Set Times" onClick={toggleModal} className="cursor-pointer size-8 " />
      {isOpen && (
        <div
          id="progress-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-2xl shadow">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                onClick={toggleModalCancel}
              >
                <span className="sr-only">Close modal</span>✕
              </button>
              <div className="p-4 md:p-5">
                <h3 className="mb-1 text-xl font-bold text-gray-90 flex items-center justify-center ">{t('Set times')}</h3>
                <div className="mt-4 flex items-center gap-6">
                  <p className="w-full font-medium ">{t('Focus time (in min)')}</p>
                  <input
                    min="1"
                    max="120"
                    value={tempWorkMinutes === "" ? "" : tempWorkMinutes}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTempWorkMinutes(value === "" ? 0 : Number(value));
                    }}
                    className="w-[100px] rounded-lg border-2 border-default-300 px-4 py-1.5 focus:outline-none"
                    type="number"
                  />
                </div>

                <div className="mt-4 flex items-center gap-6">
                  <p className="w-full font-medium ">{t('Break time (in min)')}</p>
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
                <div className='mt-4 flex items-center justify-between'>
                  <p className='font-medium'>{t('Allow Notifications when time is up')}</p>
                  <div
                    className='relative cursor-pointer'
                    onClick={() => setIsCheckedNoti(!isCheckedNoti)}
                  >
                    <input
                      type='checkbox'
                      checked={isCheckedNoti}
                      onChange={handleNotificationToggle}
                      className='sr-only'
                    />
                    <div
                      className={`box block h-8 w-14 rounded-full ${isCheckedNoti ? 'bg-blue-500' : 'bg-gray-400'}`}
                    ></div>
                    <div
                      className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${isCheckedNoti ? 'translate-x-full' : ''}`}
                    ></div>
                  </div>
                </div>
                <label className='flex justify-between cursor-pointer select-none items-center mt-4'>
                  <span className='font-medium mr-10'>{t('Auto start')}</span>
                  <div className='relative'>
                    <input
                      type='checkbox'
                      checked={isChecked}
                      onChange={handleCheckboxChange2}
                      className='sr-only'
                    />
                    <div
                      className={`box block h-8 w-14 rounded-full ${isChecked ? 'bg-blue-500' : 'bg-gray-400'
                        }`}
                    ></div>
                    <div
                      className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${isChecked ? 'translate-x-full' : ''
                        }`}
                    ></div>
                  </div>
                </label>
                <div className="flex items-center mt-6 space-x-4">
                  <button
                    onClick={handleSetTime}
                    type="button"
                    className="text-white bg-gradient-to-r from-[#f9a225cc] to-[#f95f35cc] hover:bg-gradient-to-r hover:from-[#f9a225] hover:to-[#f95f35] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    {t('Set button')}
                  </button>
                  <button
                    onClick={toggleModalCancel}
                    type="button"
                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                  >
                    {t('Cancel')}
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
