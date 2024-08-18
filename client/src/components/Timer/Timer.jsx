import { useEffect, useRef, useState, useContext } from 'react'
import SettingsContext from '../../store/SettingsContext'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './Timer.scss'
import Logo from '../../img/logo.png'
import notificationSound from './timeup.mp3'

const Timer = (color) => {
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
  function tick() {
    secondsLeftRef.current--
    setSecondsLeft(secondsLeftRef.current)
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === 'work' ? ' break' : 'work'
      const nextSeconds =
        (nextMode === 'work'
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60
      setMode(nextMode)
      modeRef.current = nextMode

      setSecondsLeft(nextSeconds)
      secondsLeftRef.current = nextSeconds
      if (settingsInfo.isNoti) {
        audioRef.current.play()
      }
    }

    setTempWorkMinutes(settingsInfo.workMinutes)
    setTempBreakMinutes(settingsInfo.breakMinutes)
    setMode(settingsInfo.mode)
    isPausedRef.current = settingsInfo.isPaused
    setIsPaused(settingsInfo.isPaused)
    secondsLeftRef.current = settingsInfo.workMinutes * 60
    setSecondsLeft(secondsLeftRef.current)

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
        }
        return switchMode()
      }
      tick()
      document.title = `${Math.floor(secondsLeftRef.current / 60)}:${('0' + secondsLeftRef.current % 60).slice(-2)} - ${modeRef.current === 'work' ? 'Focusing time' : 'Break time'}`
    }, 1000)

    return () => clearInterval(interval)
  }, [settingsInfo.workMinutes, settingsInfo.breakMinutes])

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
      <div className="relative flex items-center justify-center h-100 bg-transparent rounded-full mb-4">
        <div className="timer group fixed left-1/2 top-[70px] z-[999] -translate-x-1/2 rounded-t-lg text-white bg-black/90 w-[400px]">
          <div className="absolute left-1/2 top-8 -translate-x-1/2 -translate-y-full cursor-move">
            <img
              className="w-[100px] h-[100px]"
              src={Logo}
              alt="Study Stream Logo"
            />
          </div>
          {mode === 'work' ? (
            <p className="pt-6 text-center text-lg font-medium text-red-400 focus:outline-none">
              Working Session{' '}
            </p>
          ) : (
            <p className="pt-6 text-center text-lg font-medium text-green-400 focus:outline-none">
              {' '}
              Relaxing...{' '}
            </p>
          )}
          <div className="px-4 text-center font-extrabold text-[60px] pt-[20px] pb-[20px] tracking-[0.1em] mb-4">
            <span>{minutes + ':' + seconds}</span>
          </div>
        </div>
        <div className="relative flex w-[400px] top-[268px]">
          {isPaused ? (
            <div
              className="w-full cursor-pointer overflow-hidden rounded-bl bg-gradient-to-r from-[#f9a225] to-[#f95f35] p-4 text-center opacity-80 hover:opacity-100 text-white"
              onClick={() => {
                setIsPaused(false)
                isPausedRef.current = false
              }}
            >
              Start
            </div>
          ) : (
            <div
              className="w-full cursor-pointer overflow-hidden rounded-bl bg-gradient-to-r from-[#f9a225] to-[#f95f35] p-4 text-center opacity-80 hover:opacity-100 text-white"
              onClick={() => {
                setIsPaused(true)
                isPausedRef.current = true
              }}
            >
              Pause
            </div>
          )}

          <div
            className="w-full cursor-pointer overflow-hidden rounded-br bg-gradient-to-r from-[#f9a225] to-[#f95f35] p-4 text-center opacity-90 hover:opacity-100 text-white"
            onClick={handleReset}
          >
            Reset
          </div>
        </div>
      </div>
    </>
  )
}

export default Timer
