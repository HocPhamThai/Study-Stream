import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LearnOnYoutube = () => {
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const getId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)

    if (match && match[2].length === 11) {
      return match[2]
    } else {
      return 'error'
    }
  }

  const handleSubmit = () => {
    const videoId = getId(inputValue)
    if (videoId !== 'error') {
      const embedLink = `https://www.youtube.com/embed/${videoId}`
      console.log('Embed Link:', embedLink) // Kiểm tra link embed
      navigate('/study_pagewith_youtube', { state: { embedLink } }) // Truyền dữ liệu và điều hướng
    } else {
      alert('Invalid YouTube URL')
    }
  }

  return (
    <div className="learn-on-youtube-container mt-4 flex flex-col bg-white rounded-lg p-4">
      <h1 className="text-md text-gray-800 font-bold">Learn Effectively on YouTube</h1>
      <p className='text-gray-500 text-xs my-2'>
        You can choose a video you want to study on Youtube, drop it here, and start studying with the Pomodoro method, take notes, and more
      </p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter YouTube URL"
        className="input-field p-3 rounded-lg mt-2"
      />
      <button onClick={handleSubmit} className="submit-button button mt-2 p-2">
        Convert & Study
      </button>
    </div>
  )
}

export default LearnOnYoutube
