import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const SearchForm = ({ onSearch, showChat, setShowChat }) => {
  const [query, setQuery] = useState('')
  const [showIcon, setShowIcon] = useState(false)
  const { t } = useTranslation(['chat'])

  useEffect(() => {
    if (showChat) {
      setQuery('')
      setShowIcon(false)
    } else {
      setShowIcon(true)
    }
  }, [showChat])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
    setShowChat(false)
    setShowIcon(true)
  }

  const handleFocus = () => {
    setShowChat(false)
    setShowIcon(true)
  }

  const handleIconClick = () => {
    setShowChat(true)
    setShowIcon(false)
  }

  return (
    <div className="relative flex items-center">
      {showIcon && (
        <button
          className="absolute left-0 w-8 md:w-6 sm:w-5 xs:w-4"
          onClick={handleIconClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      )}
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <input
          onFocus={handleFocus}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search for users')}
          className="ml-8 pl-8 pr-2 py-2 w-full sm:pl-4 sm:pr-1 sm:py-1 focus:outline-none focus:border-none rounded-r-md bg-gray-200"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 hidden sm:block sm:ml-1 sm:px-2 sm:py-1 button text-white rounded"
        >
          {t('search button')}
        </button>
      </form>
    </div>
  )
}

export default SearchForm
