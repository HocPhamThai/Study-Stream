import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const HorizontalNavBar = () => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const { t, i18n } = useTranslation('navbar')

  const handleClick = (key) => {
    setSelected(key);
  };

  return (
    <div className="flex items-center px-4 space-x-4 mx-auto mt-5 bg-white shadow-lg rounded-lg">
      <Link to="/dashhome" onClick={() => handleClick('dashhome')}>
        <span className="relative flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-orange-300 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8 opacity-75"
          >
            <defs>
              <linearGradient
                id="orangeGradient"
                gradientTransform="rotate(106.23)"
              >
                <stop offset="0%" stopColor="#f99827" />
                <stop offset="100%" stopColor="#f95f35" />
              </linearGradient>
            </defs>
            <path
              d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
              fill={
                selected === 'dashhome'
                  ? 'url(#orangeGradient)'
                  : 'currentColor'
              }
            />
            <path
              d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
              fill={
                selected === 'dashhome'
                  ? 'url(#orangeGradient)'
                  : 'currentColor'
              }
            />
          </svg>
          <span className="absolute bottom-[120%] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs p-3 rounded-xl z-10 hidden group-hover:block"
            style={{
              width: i18n.language === 'vi' ? '86px' : '90px',
            }}
          >
            {t('Dashhome')}
          </span>
        </span>
      </Link>

      <Link to="/topic" onClick={() => handleClick('topic')}>
        <span className="relative flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-orange-300 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8 opacity-75"
          >
            <defs>
              <linearGradient
                id="topicGradient"
                gradientTransform="rotate(106.23)"
              >
                <stop offset="0%" stopColor="#f99827" />
                <stop offset="100%" stopColor="#f95f35" />
              </linearGradient>
            </defs>
            <path
              fillRule="evenodd"
              d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
              clipRule="evenodd"
              fill={
                selected === 'topic'
                  ? 'url(#topicGradient)'
                  : 'currentColor'
              }
            />
            <path
              fillRule="evenodd"
              d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
              fill={
                selected === 'topic'
                  ? 'url(#topicGradient)'
                  : 'currentColor'
              }
            />
          </svg>
          <span className="absolute bottom-[120%] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs p-3 rounded-xl z-10 hidden group-hover:block"
            style={{
              width: i18n.language === 'vi' ? '160px' : '120px',
            }}
          >
            {t('Focusing Space')}
          </span>
        </span>
      </Link>

      <Link to="/courses-topic" onClick={() => handleClick('courses-topic')}>
        <span className="relative flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-orange-300 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-8 h-8 opacity-75"
          >
            <defs>
              <linearGradient id="orangeGradient" gradientTransform="rotate(106.23)">
                <stop offset="0%" stopColor="#f99827" />
                <stop offset="100%" stopColor="#f95f35" />
              </linearGradient>
            </defs>
            <path
              d="m504.5 433.613h-13.27v-269.446c0-19.735-16.06-35.79-35.8-35.79h-17.617c1.926-4.03 2.988-8.5 2.988-13.145 0-11.31-6.207-21.626-16.2-26.923l-98.07-51.95c-3.66-1.94-8.2-.544-10.138 3.117-1.939 3.66-.543 8.199 3.117 10.138l98.068 51.949c5.149 2.729 8.223 7.839 8.223 13.669s-3.074 10.939-8.221 13.667l-95.332 50.502-60.608-69.114c-2.731-3.115-7.47-3.425-10.584-.694s-3.425 7.47-.694 10.584l58.264 66.441-36.072 19.109c-10.365 5.483-22.74 5.483-33.102.002l-145.03-76.828c-5.148-2.729-8.223-7.839-8.223-13.668s3.074-10.939 8.221-13.668l145.027-76.828c10.365-5.484 22.74-5.484 33.101-.002l20.76 11c3.66 1.94 8.2.545 10.139-3.115s.544-8.2-3.115-10.139l-20.764-11.002c-14.758-7.809-32.38-7.809-47.139.001l-145.032 76.831c-9.991 5.296-16.197 15.612-16.197 26.922 0 4.645 1.062 9.114 2.988 13.145h-17.618c-19.74 0-35.8 16.055-35.8 35.79v269.446h-13.27c-4.142 0-7.5 3.358-7.5 7.5v16.623c0 26.821 21.82 48.642 48.641 48.642h414.717c26.821 0 48.642-21.82 48.642-48.642v-16.623c0-4.143-3.358-7.501-7.5-7.501zm-183.984-130.116 9.779 16.938c2.021 3.501.673 6.592 0 7.758s-2.676 3.879-6.719 3.879h-6.121c-4.043 0-6.045-2.713-6.719-3.879-.674-1.167-2.021-4.257 0-7.758zm7.5-110.176 31.034-16.44v29.783c0 21.39-12.088 40.566-31.034 49.672zm-72.017 31.521c8.095 0 16.192-1.953 23.572-5.857l33.445-17.717v60.871c-40.978 13.574-86.315 12.05-126.312-4.574-20.505-8.522-33.754-28.502-33.754-50.9v-29.785l79.483 42.106c7.378 3.905 15.471 5.856 23.566 5.856zm-220.229-60.675c0-11.464 9.331-20.79 20.8-20.79h33.137l37.753 20h-64.19c-4.142 0-7.5 3.358-7.5 7.5v235.24c0 4.142 3.358 7.5 7.5 7.5h39.59c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-32.09v-220.24h67.18v28.287c0 28.479 16.877 53.895 42.998 64.752 23.848 9.912 49.45 14.868 75.053 14.868 19.254 0 38.507-2.805 57.016-8.411v8.614l-15.27 26.448c-4.114 7.125-4.114 15.633 0 22.758s11.481 11.379 19.709 11.379h6.121c8.228 0 15.595-4.254 19.709-11.379s4.114-15.633 0-22.758l-15.27-26.448v-13.854c1.014-.401 2.029-.798 3.037-1.217 26.12-10.857 42.997-36.273 42.997-64.752v-28.287h67.18v220.24h-308.37c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h315.87c4.142 0 7.5-3.358 7.5-7.5v-235.24c0-4.142-3.358-7.5-7.5-7.5h-64.191l37.753-20h33.137c11.469 0 20.8 9.326 20.8 20.79v269.446h-440.459zm266.61 284.45c-2.771 8.065-10.434 13.878-19.427 13.878h-53.905c-8.994 0-16.656-5.813-19.428-13.878zm194.62 9.119c0 18.55-15.092 33.642-33.642 33.642h-414.717c-18.55 0-33.641-15.092-33.641-33.642v-9.123h13.193c.026 0 .051.004.077.004h165.877c3.126 16.422 17.582 28.878 34.901 28.878h53.905c17.318 0 31.774-12.457 34.9-28.878h165.877c.026 0 .051-.004.077-.004h13.193z"
              fill={
                selected === 'courses-topic'
                  ? 'url(#orangeGradient)'
                  : 'currentColor'
              }
            />
            <path
              d="m258.268 371.117c0-4.142-3.358-7.5-7.5-7.5h-150.145c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h150.146c4.141 0 7.499-3.358 7.499-7.5z"
              fill={
                selected === 'courses-topic'
                  ? 'url(#orangeGradient)'
                  : 'currentColor'
              }
            />
          </svg>
          <span className="absolute bottom-[120%] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs p-3 rounded-xl opacity-0 group-hover:opacity-100"
            style={{
              width: i18n.language === 'vi' ? '150px' : '120px',
            }}
          >
            {t('Learning space')}
          </span>
        </span>
      </Link>

      <Link to={'/profile/' + user._id} onClick={() => handleClick('profile')}>
        <span className="relative flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-orange-300 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8 opacity-75"
          >
            <defs>
              <linearGradient
                id="profileGradient"
                gradientTransform="rotate(106.23)"
              >
                <stop offset="0%" stopColor="#f99827" />
                <stop offset="100%" stopColor="#f95f35" />
              </linearGradient>
            </defs>
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
              fill={
                selected === 'profile'
                  ? 'url(#profileGradient)'
                  : 'currentColor'
              }
            />
          </svg>
          <span className="absolute bottom-[120%] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs p-3 rounded-xl z-10 hidden group-hover:block"
            style={{
              width: i18n.language === 'vi' ? '112px' : '66px',
            }}
          >
            {t('Profile')}
          </span>
        </span>
      </Link>
      <Link to="/chatbot">
        <span className="relative flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-orange-300 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 511.94 511.94"
            className="w-8 h-8 opacity-75"
          >
            <defs>
              <linearGradient
                id="chatbotGradient"
                gradientTransform="rotate(106.23)"
              >
                <stop offset="0%" stopColor="#f99827" />
                <stop offset="100%" stopColor="#f95f35" />
              </linearGradient>
            </defs>
            <g>
              <path
                fill={selected === 'chatbot' ? 'url(#chatbotGradient)' : 'currentColor'}
                d="m130.285 431.124c-2.378 3.392-1.557 8.069 1.834 10.447 16.475 11.553 35.869 17.659 56.086 17.659h105.41c54.086 0 97.85-43.755 97.85-97.85 0-53.955-43.896-97.85-97.85-97.85h-105.41c-26.136 0-50.712 10.177-69.204 28.657-33.594 33.595-37.228 84.639-13.164 122.051 2.241 3.484 6.882 4.491 10.365 2.25s4.491-6.881 2.25-10.365c-20.406-31.723-17.228-74.945 11.154-103.327 15.657-15.647 36.468-24.265 58.599-24.265h105.41c45.684 0 82.85 37.167 82.85 82.85 0 45.795-37.047 82.85-82.85 82.85h-105.41c-17.12 0-33.536-5.167-47.474-14.94-3.392-2.38-8.068-1.558-10.446 1.833z"
                clipRule="evenodd"
                fill={selected === 'chatbot' ? 'url(#chatbotGradient)' : 'currentColor'}
              />
              <path
                fill={selected === 'chatbot' ? 'url(#chatbotGradient)' : 'currentColor'}
                d="m452.296 0h-138.74c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h138.74c24.614 0 44.64 20.025 44.64 44.64v76.43c0 24.615-20.025 44.64-44.64 44.64h-114.82c-5.928 0-11.728 2.401-15.912 6.585l-35.508 35.491v-19.576c0-12.407-10.094-22.5-22.5-22.5h-15.73c-28.739 0-52.12-23.386-52.12-52.13v-68.94c0-24.615 20.021-44.64 44.63-44.64h38.22c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-38.22c-32.88 0-59.63 26.754-59.63 59.64v68.94c0 16.027 5.652 30.753 15.057 42.309-65.133 15.31-116.753 62.9-138.859 123.638-4.036.642-7.969 1.654-11.788 3.008v-72.659c12.972-3.342 22.585-15.14 22.585-29.141 0-16.591-13.498-30.088-30.088-30.088s-30.089 13.497-30.089 30.088c0 14.003 9.616 25.803 22.591 29.143v80.175c-35.212 23.569-40.709 73.778-10.283 104.231 11.147 11.148 25.686 17.991 41.255 19.505 24.75 49.372 75.795 83.152 134.638 83.152h90.36c59.093 0 109.973-33.874 134.66-83.164 34.235-3.347 61.069-32.106 61.069-67.396 0-33.397-24.288-61.601-56.893-66.84-11.912-32.73-33.124-63.407-62.818-86.855-3.252-2.568-7.968-2.014-10.534 1.238-2.567 3.25-2.013 7.967 1.237 10.534 42.492 33.556 68.838 85.049 68.838 141.924 0 74.611-60.367 135.56-135.56 135.56h-90.36c-74.083 0-135.55-60.064-135.55-135.56 0-88.692 64.022-162.942 149.028-177.948 10.931 7.722 24.25 12.278 38.622 12.278h15.73c4.136 0 7.5 3.364 7.5 7.5v19.59c0 13.324 16.2 20.026 25.603 10.604l35.512-35.501c1.394-1.393 3.327-2.192 5.306-2.192h114.82c32.886 0 59.64-26.754 59.64-59.64v-76.433c0-32.886-26.754-59.64-59.639-59.64zm14.519 361.38c0 24.632-16.737 44.947-39.003 50.926 5.86-16.257 8.833-33.329 8.833-50.926 0-17.083-2.193-33.934-6.519-50.259 21.537 6.759 36.689 26.701 36.689 50.259zm-444.291-165.645c0-8.32 6.769-15.088 15.088-15.088s15.088 6.769 15.088 15.088-6.769 15.088-15.088 15.088-15.088-6.768-15.088-15.088zm-7.529 165.645c0-22.852 14.914-43.317 36.698-50.252-4.325 16.323-6.518 33.173-6.518 50.252 0 17.596 2.974 34.668 8.834 50.926-22.186-5.958-39.014-26.205-39.014-50.926z"
              />
              <path
                fill={selected === 'chatbot' ? 'url(#chatbotGradient)' : 'currentColor'}
                d="m346.318 127.941c16.591 0 30.089-13.498 30.089-30.088s-13.498-30.088-30.089-30.088-30.088 13.497-30.088 30.088 13.497 30.088 30.088 30.088zm0-45.177c8.32 0 15.089 6.769 15.089 15.088s-6.769 15.088-15.089 15.088c-8.319 0-15.088-6.769-15.088-15.088s6.769-15.088 15.088-15.088z"
              />
              <path
                fill={selected === 'chatbot' ? 'url(#chatbotGradient)' : 'currentColor'}
                d="m466.759 97.853c0-16.591-13.497-30.088-30.088-30.088s-30.089 13.498-30.089 30.088 13.498 30.088 30.089 30.088 30.088-13.497 30.088-30.088zm-45.176 0c0-8.319 6.769-15.088 15.088-15.088s15.089 6.769 15.089 15.088-6.769 15.088-15.089 15.088-15.088-6.769-15.088-15.088z"
              />
            </g>
          </svg>
          <span className="absolute bottom-[120%] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs p-3 rounded-xl z-10 hidden group-hover:block">
            {t('Chatbot')}
          </span>
        </span>
      </Link>

      {/* Analytics */}
      <Link to="/analytics">
        <span className="relative flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-orange-300 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 opacity-75"
          >
            <defs>
              <linearGradient
                id="analyticsGradient"
                gradientTransform="rotate(106.23)"
              >
                <stop offset="0%" stopColor="#f99827" />
                <stop offset="100%" stopColor="#f95f35" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
              fill={selected === 'analytics' ? 'url(#analyticsGradient)' : 'none'}
            />
          </svg>
          <span className="absolute bottom-[120%] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs p-3 rounded-xl z-10 hidden group-hover:block"
            style={{
              width: i18n.language === 'vi' ? '84px' : '80px',
            }}
          >
            {t('Analytics')}
          </span>
        </span>
      </Link>

    </div>
  );
};

export default HorizontalNavBar;
