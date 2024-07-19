import React from 'react'
import './Pomodoro.scss'
import Logo from '../../img/logo.png'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import PlayButton from '../../components/PomoButton/PlayButton'
import PauseButton from '../../components/PomoButton/PauseButton'
import SettingsButton from '../../components/PomoButton/SettingsButton'
import ModalTimer from '../../components/PomoButton/ModalTimer'
import SettingsContext from '../../store/SettingsContext'
import { useState, useContext } from 'react'
import { useEffect, useRef } from 'react'
import Timer from '../../components/Timer/Timer'
import ModalChangeBackgound from '../../components/PomoButton/ModalChangeBackgound'
import PomodoroBg from '../../components/PomodoroBg/PomodoroBg'

const red = '#f54e4e'
const green = '#4aec8c'

const Pomodoro = () => {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [bgColor, setBgColor] = useState('Orange')

  return (
    <SettingsContext.Provider value={{
      workMinutes,
      breakMinutes,
      bgColor,
      setWorkMinutes,
      setBreakMinutes,
      setBgColor,
    }} >
      <PomodoroBg />
    </SettingsContext.Provider >

  )
}

export default Pomodoro
