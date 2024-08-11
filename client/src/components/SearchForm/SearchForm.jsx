// components/SearchForm/SearchForm.js
import React, { useEffect, useState } from 'react'
import './SearchFrom.scss'

const SearchForm = ({ onSearch, showChat, setShowChat }) => {
  const [query, setQuery] = useState('')
  const [showIcon, setShowIcon] = useState(false)

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
    <div className="searchContainer">
      {showIcon && (
        <button className="btnBack" onClick={handleIconClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      )}
      <form onSubmit={handleSubmit} className="">
        <input
          onFocus={handleFocus}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Seach for users..."
          style={{ marginLeft: '30px' }}
        />
        <button type="submit" style={{ marginLeft: '10px' }}>
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchForm
