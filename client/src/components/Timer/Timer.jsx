import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useEffect, useRef, useState, useContext } from 'react'
import PlayButton from '../../components/PomoButton/PlayButton'
import PauseButton from '../../components/PomoButton/PauseButton'
import SettingsContext from '../../store/SettingsContext'
import ModalChangeBackgound from '../../components/PomoButton/ModalChangeBackgound'
import ModalTimer from '../../components/PomoButton/ModalTimer'
import './Timer.scss'

const red = '#f54e4e';
const green = '#4aec8c';

const Timer = () => {
  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true)
  const [mode, setMode] = useState('work')
  const [secondsLeft, setSecondsLeft] = useState(0)
  const secondsLeftRef = useRef(secondsLeft)
  const isPausedRef = useRef(isPaused)
  const modeRef = useRef(mode)

  function tick() {
    secondsLeftRef.current--
    setSecondsLeft(secondsLeftRef.current)
  }

  useEffect(() => {

    function switchMode() {
      const nextMode = modeRef.current === 'work' ? ' break' : 'work'
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60
      setMode(nextMode)
      modeRef.current = nextMode

      setSecondsLeft(nextSeconds)
      secondsLeftRef.current = nextSeconds
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60
    setSecondsLeft(secondsLeftRef.current)

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return
      }
      if (secondsLeftRef.current === 0) {
        return switchMode()
      }
      tick()

    }, 1000) // Fixed the interval function

    return () => clearInterval(interval)
  }, [settingsInfo.workMinutes, settingsInfo.breakMinutes])

  const totalSeconds = mode === 'work'
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60

  const percentage = Math.round(secondsLeft / totalSeconds * 100)

  const minutes = Math.floor(secondsLeft / 60)
  let seconds = secondsLeft % 60
  if (seconds < 10) seconds = '0' + seconds

  return (
    <>
      {/* <div className="flex items-center justify-end space-x-4 h-auto bg-gray-500">
        <ModalTimer />
        <ModalChangeBackgound />
      </div> */}
      <div className="relative flex items-center justify-center h-100 bg-transparent rounded-full mb-4">

        <CircularProgressbar
          className='h-60 w-60'
          value={percentage}
          text={minutes + ':' + seconds}
          styles={buildStyles({
            textColor: '#000',
            pathColor: mode === 'work' ? red : green,
            trailColor: 'rgba(255,255,255,2)',
          })}
        />


      </div>

      <div className="relative bg-transparent flex items-center justify-center h-20">
        {isPaused ?
          // <div
          //   className="absolute top-0 left-0 w-full cursor-pointer overflow-hidden rounded-bl bg-gradient-to-r from-primary to-primary-2 p-4 flex items-center justify-center opacity-80 hover:opacity-100"
          //   onClick={() => { setIsPaused(false); isPausedRef.current = false }}
          // >
          //   Start
          // </div>
          // <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Start</button>
          <button
            onClick={() => { setIsPaused(false); isPausedRef.current = false }}
            type="button" class="w-30 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start
          </button>
          :
          <button
            onClick={() => { setIsPaused(true); isPausedRef.current = true }}
            type="button" class="w-30 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Pause
          </button>
          // <div
          //   className="absolute top-0 left-0 w-full cursor-pointer overflow-hidden rounded-bl bg-gradient-to-r from-primary to-primary-2 p-4 flex items-center justify-center opacity-80 hover:opacity-100"
          //   onClick={() => { setIsPaused(true); isPausedRef.current = true }}
          // >
          //   Pause
          // </div>
        }


        {/* {isPaused ?
          <PlayButton
            className=" flex items-center justify-center"
            onClick={() => { setIsPaused(false); isPausedRef.current = false }}
          />
          : <PauseButton
            className=" flex items-center justify-center"
            onClick={() => { setIsPaused(true); isPausedRef.current = true }}

          />
        } */}
      </div>


    </>
  )
}

export default Timer