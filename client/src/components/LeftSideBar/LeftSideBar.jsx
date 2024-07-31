import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { logOut } from '../../actions/AuthAction'

const LeftSideBar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const location = useLocation()
  const [selected, setSelected] = useState('')

  useEffect(() => {
    const path = location.pathname.split('/')[1]
    setSelected(path)
  }, [location.pathname])

  const handleLogOut = () => {
    dispatch(logOut())
  }
  const handleClick = (id) => {
    setSelected(id)
  };

  return (
    <div>
      {console.log("selected: ", selected)}
      <div className="w-[48px] h-screen flex flex-col items-center py-4 space-y-4 mx-auto ml-5">
        <span className="relative flex size-10 cursor-pointer items-center justify-center rounded-2xl p-2 md:size-[48px] hover:bg-orange-300 group" >
          <div style={{ width: '100%', height: '100%' }}>
            <Link to="/dashhome" onClick={() => handleClick('dashhome')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 opacity-75">
                <defs>
                  <linearGradient id="orangeGradient" gradientTransform="rotate(106.23)">
                    <stop offset="0%" stopColor="#f99827" />
                    <stop offset="100%" stopColor="#f95f35" />
                  </linearGradient>
                </defs>
                <path
                  d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
                  fill={selected === 'dashhome' ? 'url(#orangeGradient)' : 'currentColor'}
                />
                <path
                  d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
                  fill={selected === 'dashhome' ? 'url(#orangeGradient)' : 'currentColor'}
                />
              </svg>
            </Link>
          </div>
          <div className="absolute top-1/2 left-[120%] transform -translate-y-1/2 bg-black bg-opacity-70 text-white text-xs p-3 rounded-xl z-10 hidden group-hover:block">
            Dashhome
          </div>
        </span>

        <span className="relative flex size-10 cursor-pointer items-center justify-center rounded-2xl p-2 md:size-[48px] hover:bg-orange-300 group" >
          <div style={{ width: '100%', height: '100%' }}>
            <Link to="/topic" onClick={() => handleClick('topic')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 opacity-75">
                <defs>
                  <linearGradient id="topicGradient" gradientTransform="rotate(106.23)">
                    <stop offset="0%" stopColor="#f99827" />
                    <stop offset="100%" stopColor="#f95f35" />
                  </linearGradient>
                </defs>
                <path
                  fillRule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                  clipRule="evenodd"
                  fill={selected === 'topic' ? 'url(#topicGradient)' : 'currentColor'}
                />
                <path
                  fillRule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                  fill={selected === 'topic' ? 'url(#topicGradient)' : 'currentColor'}
                />
              </svg>
            </Link>
          </div>
          <div className="absolute top-1/2 left-[120%] transform -translate-y-1/2 bg-black bg-opacity-70 text-white text-xs p-3 rounded-xl z-10 hidden group-hover:block">
            Topic
          </div>
        </span>

        <span className="relative flex size-10 cursor-pointer items-center justify-center rounded-2xl p-2 md:size-[48px] hover:bg-orange-300 group" >
          <div style={{ width: '100%', height: '100%' }}>
            <Link to={'/profile/' + user._id} onClick={() => handleClick('profile')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 opacity-75">
                <defs>
                  <linearGradient id="profileGradient" gradientTransform="rotate(106.23)">
                    <stop offset="0%" stopColor="#f99827" />
                    <stop offset="100%" stopColor="#f95f35" />
                  </linearGradient>
                </defs>
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                  fill={selected === 'profile' ? 'url(#profileGradient)' : 'currentColor'}
                />
              </svg>
            </Link>
          </div>
          <div className="absolute top-1/2 left-[120%] transform -translate-y-1/2 bg-black bg-opacity-70 text-white text-xs p-3 rounded-xl z-10 hidden group-hover:block">
            Profile
          </div>
        </span>

        <span className="relative flex size-10 cursor-pointer items-center justify-center rounded-2xl p-2 md:size-[48px] hover:bg-orange-300 group" >
          <div style={{ width: '100%', height: '100%' }}>
            <Link to="/chat" onClick={() => handleClick('chat')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 opacity-75">
                <defs>
                  <linearGradient id="chatGradient" gradientTransform="rotate(106.23)">
                    <stop offset="0%" stopColor="#f99827" />
                    <stop offset="100%" stopColor="#f95f35" />
                  </linearGradient>
                </defs>
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                  clipRule="evenodd"
                  fill={selected === 'chat' ? 'url(#chatGradient)' : 'currentColor'}
                />
              </svg>
            </Link>
          </div>
          <div className="absolute top-1/2 left-[120%] transform -translate-y-1/2 bg-black bg-opacity-70 text-white text-xs p-3 rounded-xl z-10 hidden group-hover:block">
            Chat
          </div>
        </span>

        <span className="relative flex size-10 cursor-pointer items-center justify-center rounded-2xl p-2 md:size-[48px] hover:bg-orange-300 group" onClick={() => handleClick('chatbot')}>
          <div style={{ width: '100%', height: '100%' }}>
            <Link to="/chatbot">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.94 511.94" className="w-8 h-8 opacity-75">
                <defs>
                  <linearGradient id="chatbotGradient" gradientTransform="rotate(106.23)">
                    <stop offset="0%" stopColor="#f99827" />
                    <stop offset="100%" stopColor="#f95f35" />
                  </linearGradient>
                </defs>
                <g>
                  <path
                    fillRule="evenodd"
                    d="m130.285 431.124c-2.378 3.392-1.557 8.069 1.834 10.447 16.475 11.553 35.869 17.659 56.086 17.659h105.41c54.086 0 97.85-43.755 97.85-97.85 0-53.955-43.896-97.85-97.85-97.85h-105.41c-26.136 0-50.712 10.177-69.204 28.657-33.594 33.595-37.228 84.639-13.164 122.051 2.241 3.484 6.882 4.491 10.365 2.25s4.491-6.881 2.25-10.365c-20.406-31.723-17.228-74.945 11.154-103.327 15.657-15.647 36.468-24.265 58.599-24.265h105.41c45.684 0 82.85 37.167 82.85 82.85 0 45.795-37.047 82.85-82.85 82.85h-105.41c-17.12 0-33.536-5.167-47.474-14.94-3.392-2.38-8.068-1.558-10.446 1.833z"
                    clipRule="evenodd"
                    fill={selected === 'chatbot' ? 'url(#chatbotGradient)' : 'currentColor'}
                  />
                  <path
                    d="m452.296 0h-138.74c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h138.74c24.614 0 44.64 20.025 44.64 44.64v76.43c0 24.615-20.025 44.64-44.64 44.64h-114.82c-5.928 0-11.728 2.401-15.912 6.585l-35.508 35.491v-19.576c0-12.407-10.094-22.5-22.5-22.5h-15.73c-28.739 0-52.12-23.386-52.12-52.13v-68.94c0-24.615 20.021-44.64 44.63-44.64h38.22c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-38.22c-32.88 0-59.63 26.754-59.63 59.64v68.94c0 16.027 5.652 30.753 15.057 42.309-65.133 15.31-116.753 62.9-138.859 123.638-4.036.642-7.969 1.654-11.788 3.008v-72.659c12.972-3.342 22.585-15.14 22.585-29.141 0-16.591-13.498-30.088-30.088-30.088s-30.089 13.497-30.089 30.088c0 14.003 9.616 25.803 22.591 29.143v80.175c-35.212 23.569-40.709 73.778-10.283 104.231 11.147 11.148 25.686 17.991 41.255 19.505 24.75 49.372 75.795 83.152 134.638 83.152h90.36c59.093 0 109.973-33.874 134.66-83.164 34.235-3.347 61.069-32.106 61.069-67.396 0-33.397-24.288-61.601-56.893-66.84-11.912-32.73-33.124-63.407-62.818-86.855-3.252-2.568-7.968-2.014-10.534 1.238-2.567 3.25-2.013 7.967 1.237 10.534 42.492 33.556 68.838 85.049 68.838 141.924 0 74.611-60.367 135.56-135.56 135.56h-90.36c-74.083 0-135.55-60.064-135.55-135.56 0-88.692 64.022-162.942 149.028-177.948 10.931 7.722 24.25 12.278 38.622 12.278h15.73c4.136 0 7.5 3.364 7.5 7.5v19.59c0 13.324 16.2 20.026 25.603 10.604l35.512-35.501c1.394-1.393 3.327-2.192 5.306-2.192h114.82c32.886 0 59.64-26.754 59.64-59.64v-76.433c0-32.886-26.754-59.64-59.639-59.64zm14.519 361.38c0 24.632-16.737 44.947-39.003 50.926 5.86-16.257 8.833-33.329 8.833-50.926 0-17.083-2.193-33.934-6.519-50.259 21.537 6.759 36.689 26.701 36.689 50.259zm-444.291-165.645c0-8.32 6.769-15.088 15.088-15.088s15.088 6.769 15.088 15.088-6.769 15.088-15.088 15.088-15.088-6.768-15.088-15.088zm-7.529 165.645c0-22.852 14.914-43.317 36.698-50.252-4.325 16.323-6.518 33.173-6.518 50.252 0 17.596 2.974 34.668 8.834 50.926-22.186-5.958-39.014-26.205-39.014-50.926z"
                  />
                  <path
                    d="m346.318 127.941c16.591 0 30.089-13.498 30.089-30.088s-13.498-30.088-30.089-30.088-30.088 13.497-30.088 30.088 13.497 30.088 30.088 30.088zm0-45.177c8.32 0 15.089 6.769 15.089 15.088s-6.769 15.088-15.089 15.088c-8.319 0-15.088-6.769-15.088-15.088s6.769-15.088 15.088-15.088z"
                  />
                  <path
                    d="m466.759 97.853c0-16.591-13.497-30.088-30.088-30.088s-30.089 13.498-30.089 30.088 13.498 30.088 30.089 30.088 30.088-13.497 30.088-30.088zm-45.176 0c0-8.319 6.769-15.088 15.088-15.088s15.089 6.769 15.089 15.088-6.769 15.088-15.089 15.088-15.088-6.769-15.088-15.088z"
                  />
                </g>
              </svg>
            </Link>
          </div>
        </span>

        <span className="relative flex size-10 cursor-pointer items-center justify-center rounded-2xl p-2 md:size-[48px] hover:bg-orange-300 group" onClick={() => handleClick('logout')}>
          <div style={{ width: '100%', height: '100%' }}>
            <Link onClick={handleLogOut}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 opacity-75">
                <defs>
                  <linearGradient id="logoutGradient" gradientTransform="rotate(106.23)">
                    <stop offset="0%" stopColor="#f99827" />
                    <stop offset="100%" stopColor="#f95f35" />
                  </linearGradient>
                </defs>
                <path
                  fillRule="evenodd"
                  d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                  clipRule="evenodd"
                  fill={selected === 'logout' ? 'url(#logoutGradient)' : 'currentColor'}
                />
              </svg>
            </Link>
          </div>
          <div className="absolute top-1/2 left-[120%] transform -translate-y-1/2 bg-black bg-opacity-70 text-white text-xs p-3 rounded-xl z-10 hidden group-hover:block">
            Logout
          </div>
        </span>


      </div>
    </div>
  )
}

export default LeftSideBar
