import React, { useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import PomodoroBg from '../../components/PomodoroBg/PomodoroBg'
import SettingsContext from '../../store/SettingsContext'
import './Pomodoro.scss'

const red = '#f54e4e'
const green = '#4aec8c'

const Pomodoro = () => {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [bgColor, setBgColor] = useState('linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)')
  const [mode, setMode] = useState('work')
  const [isPaused, setIsPaused] = useState(true)
  const [isNoti, setIsNoti] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  return (
    <SettingsContext.Provider value={{
      workMinutes,
      breakMinutes,
      bgColor,
      setWorkMinutes,
      setBreakMinutes,
      isPaused,
      setIsPaused,
      isNoti,
      setIsNoti,
      setBgColor,
      mode,
      setMode,
      isRepeat,
      setIsRepeat,
    }} >
      <PomodoroBg />
    </SettingsContext.Provider >

  )
}

export default Pomodoro
