import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import SettingsContext from '../../store/SettingsContext'
import './Timer.scss'
import notificationSound from './timeup.mp3'
import { useTranslation } from 'react-i18next'

const SmallTimer = ({ onTimerEnd }) => {
  const settingsInfo = useContext(SettingsContext)
  const [isPaused, setIsPaused] = useState(true)
  const [mode, setMode] = useState('work')
  const [secondsLeft, setSecondsLeft] = useState(0)
  const secondsLeftRef = useRef(secondsLeft)
  const isPausedRef = useRef(isPaused)
  const modeRef = useRef(mode)
  const { user } = useSelector((state) => state.authReducer.authData)
  const [tempWorkMinutes, setTempWorkMinutes] = useState(25)
  const [tempBreakMinutes, setTempBreakMinutes] = useState(5)
  const audioRef = useRef(new Audio(notificationSound))
  const [repeat, setRepeat] = useState()
  const { t } = useTranslation('learningSpace')

  function tick() {
    secondsLeftRef.current--
    setSecondsLeft(secondsLeftRef.current)
  }

  useEffect(() => {
    function switchMode() {
      setRepeat(settingsInfo.isRepeat)
      const nextMode = modeRef.current === 'work' ? ' break' : 'work'
      const nextSeconds =
        (nextMode === 'work'
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60
      if (repeat) {
        // Tiếp tục lặp lại nếu repeat = true
        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
      } else {
        // Dừng lại nếu repeat = false
        setIsPaused(true);
        isPausedRef.current = true;
      }

      if (settingsInfo.isNoti) {
        audioRef.current.play();
      }
    }

    setTempWorkMinutes(settingsInfo.workMinutes)
    setTempBreakMinutes(settingsInfo.breakMinutes)
    setMode(settingsInfo.mode)
    isPausedRef.current = settingsInfo.isPaused
    setIsPaused(settingsInfo.isPaused)
    secondsLeftRef.current = settingsInfo.workMinutes * 60
    setSecondsLeft(secondsLeftRef.current)

    if (onTimerEnd) {
      onTimerEnd()
    }

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return
      }
      // if (settingsInfo.isPaused) {
      //   return
      // }
      if (secondsLeftRef.current === 0) {
        if (modeRef.current === 'work') {
          saveWorkSession()
          if (onTimerEnd) {
            onTimerEnd()
          }
        }
        // settingsInfo.onTimerEnd()
        return switchMode()
      }
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [settingsInfo.workMinutes, settingsInfo.breakMinutes, onTimerEnd, repeat])

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  const saveWorkSession = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/workingtime/save`, {
        userId: user._id, // Thay bằng ID của người dùng thực tế
        duration: settingsInfo.workMinutes * 60, // Sử dụng workMinutes để tính duration
      })

      console.log('Thời gian làm việc đã được lưu thành công.')
    } catch (error) {
      console.error('Lỗi khi lưu thời gian làm việc:', error)
    }
  }

  const handleReset = () => {
    settingsInfo.setWorkMinutes(tempWorkMinutes)
    settingsInfo.setBreakMinutes(tempBreakMinutes)

    setIsPaused(true)
    isPausedRef.current = true

    setMode('work')
    modeRef.current = 'work'
    const newSeconds = tempWorkMinutes * 60 // Always use work minutes
    setSecondsLeft(newSeconds)
    secondsLeftRef.current = newSeconds
  }

  const totalSeconds =
    mode === 'work'
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60

  const minutes = Math.floor(secondsLeft / 60)
  let seconds = secondsLeft % 60
  if (seconds < 10) seconds = '0' + seconds

  return (
    <>
      <div className="relative flex items-center justify-center bg-transparent rounded-full mb-2">
        <div className="flex items-center justify-center">
          <div className="timer group relative rounded-l-lg text-white bg-black/90 w-[180px] flex items-center py-[0.86rem]">
            {mode === 'work' ? (
              <p className="text-sm font-medium text-red-400 focus:outline-none ml-3">
                Focusing
              </p>
            ) : (
              <p className="text-sm font-medium text-green-400 focus:outline-none ml-3">
                Relaxing...
              </p>
            )}
            <div className="ml-1 text-center font-extrabold text-lg tracking-[0.05em] w-full">
              <span>{minutes + ':' + seconds}</span>
            </div>
          </div>

          <div className="flex flex-col">
            {isPaused ? (
              <div
                className="cursor-pointer overflow-hidden rounded-tr-lg bg-gradient-to-r from-[#f9a225] to-[#f95f35] p-1 text-center opacity-80 hover:opacity-100 text-white text-sm w-[66px]"
                onClick={() => {
                  setIsPaused(false)
                  isPausedRef.current = false
                }}
              >
                {t('Start')}
              </div>
            ) : (
              <div
                className="cursor-pointer overflow-hidden rounded-tr-lg bg-gradient-to-r from-[#f9a225] to-[#f95f35] p-1 text-center opacity-80 hover:opacity-100 text-white text-sm w-[66px]"
                onClick={() => {
                  setIsPaused(true)
                  isPausedRef.current = true
                }}
              >
                {t('Pause')}
              </div>
            )}

            <div
              className="cursor-pointer overflow-hidden rounded-br-lg bg-gradient-to-r from-[#f9a225] to-[#f95f35] p-1 text-center opacity-90 hover:opacity-100 text-white text-sm w-[66px]"
              onClick={handleReset}
            >
              {t('Reset')}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SmallTimer
