import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LearnOnYoutube = () => {
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation('learning')

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
      <h1 className="text-md text-gray-800 font-bold">{t('youtube.title')}</h1>
      <p className='text-gray-500 text-xs my-2'>
        {t('youtube.description')}
      </p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={t('youtube.guide')}
        className="input-field p-3 rounded-lg mt-2"
      />
      <button onClick={handleSubmit} className="submit-button button mt-2 p-2">
        {t('youtube.button')}
      </button>
    </div>
  )
}

export default LearnOnYoutube
