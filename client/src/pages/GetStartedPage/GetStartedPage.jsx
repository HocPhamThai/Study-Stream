import React from 'react'
import { useState } from 'react'
import Logo from '../../img/logo.png'
import StudyStream from './studystream_img.png'
import Topic from './topic_img.png'
import PomodoroBg from './PomodoroBg_img.png'
import aiImg from './ai.png'
import homepage from './homepage_img.png'
import chat from './chat_img.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './GetStarted.scss'
function GetStartedPage() {
  const state = useSelector(state => state)
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  // Kiểm tra nếu state không null và có thuộc tính user
  const user = state ? state.user : null

  return (
    <div className='bg-white m-[-1rem] p-[1rem]'>
      {/* Navbar  */}
      <div className="sticky top-0 z-20 h-15 bg-white shadow-sm">
        <div className="relative m-auto flex h-full max-w-[1440px] items-center px-4">
          <a href="/" className="flex cursor-pointer items-center justify-center gap-2">
            <span className="w-11 rounded-full bg-cl-3 p-2 hover:bg-cl-bg-icon">
              <img src={Logo} alt="Logo" />
            </span>
            <p className="text-lg font-semibold w-[130px]">Study Stream</p>
          </a>
          <button
            className="ml-auto lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cl-3"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
          <ul
            className={`absolute right-0 top-full mt-2 w-full bg-white shadow-lg rounded-lg lg:static lg:ml-10 lg:flex lg:items-center lg:gap-6 lg:bg-transparent lg:shadow-none ${isOpen ? 'block' : 'hidden'} lg:block`}
          >
            <Link to={user ? '/dashhome' : '/auth'}>
              <li className="p-4 lg:p-0"><a className="text-black font-medium">Get Started</a></li>
            </Link>
            <li className="p-4 lg:p-0"><a href="#features" className="text-black font-medium">Features</a></li>
            <li className="p-4 lg:p-0"><a href="#community" className="text-black font-medium">Community</a></li>
            <li className="p-4 lg:p-0"><a href="/" className="text-black font-medium">Rule</a></li>
            <li className="p-4 lg:p-0"><a href="/" className="text-black font-medium">About</a></li>
          </ul>
        </div>
      </div>

      <div className='m-auto max-w-[1440px] p-2 lg:px-4 lg:pb-4'>
        <div className='grid grid-cols-2 items-center gap-4 p-2 lg:h-[calc(100vh-120px)] lg:px-4 lg:pb-4'>
          <div className='col-span-2 lg:col-span-1'>
            <h1 className='text-center text-4xl font-bold !leading-tight lg:text-left lg:text-5xl'>
              Challenge yourself, {' '}
              <span className='bg-gradient-to-r from-[#f9a225] to-[#f95f35] bg-clip-text text-transparent'>
                Hack {' '}
              </span>
              and boost your study motivation with StudyStream!
            </h1>
            <p className='mt-6 text-center text-lg text-gray-500 lg:text-left'>
              Self-study becomes more enjoyable than ever with StudyStream.
            </p>
            <div className='flex justify-center lg:justify-start'>
              <Link to={user ? '/dashhome' : '/auth'}>
                <button className="z-0 border border-gray-300 text-white text-medium mt-6 px-6 min-w-24 h-12 rounded-xl hover:opacity-80 bg-gradient-to-r from-[#f9a225] to-[#f95f35] select-none whitespace-nowrap overflow-hidden outline-none gap-3 hover:bg-blue-600">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className='col-span-2 m-auto lg:col-span-1'>
            <img src={homepage} alt="Homepage" className='rounded-2xl' />
          </div>
        </div>
      </div>
      <div id='features'></div>
      <div className='my-4 text-center text-2xl font-medium lg:mt-[60px]'>
        Features
      </div>
      <div className='grid auto-rows-fr grid-cols-4 items-center gap-4 p-2 lg:p-0 '>
        <div className="col-span-2 h-full max-w-80 rounded-lg border border-gray-50 p-3 shadow md:col-span-1">
          <div className='flex items-center gap-2'>
            <span className='rounded-full bg-cl-bg-icon p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </span>
            <p className='font-medium'>Video Streaming</p>
          </div>
          <p className='mt-2 text-gray-500'>
            We provide video stream to help you avoid from distraction, helping you focus and enhance your study performance.
          </p>
        </div>
        <div className='col-span-2 h-full max-w-80 rounded-lg border border-gray-50 p-3 shadow md:col-span-1'>
          <div className='flex items-center gap-2'>
            <span className='rounded-full bg-cl-bg-icon p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </span>
            <p className='font-medium'>Pomodoro Working</p>
          </div>
          <p className='mt-2 text-gray-500'>
            🍅 Easy to use and enhances study efficiency with the Pomodoro method. Focus deeply for 25 minutes, then take a short 5-minute break.
          </p>
        </div>
        <div className='col-span-2 h-full max-w-80 rounded-lg border border-gray-50 p-3 shadow md:col-span-1'>
          <div className='flex items-center gap-2'>
            <span className='rounded-full bg-cl-bg-icon p-2'>
              <svg id="Capa_1" enable-background="new 0 0 511.94 511.94" height="24" viewBox="0 0 511.94 511.94" width="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m130.285 431.124c-2.378 3.392-1.557 8.069 1.834 10.447 16.475 11.553 35.869 17.659 56.086 17.659h105.41c54.086 0 97.85-43.755 97.85-97.85 0-53.955-43.896-97.85-97.85-97.85h-105.41c-26.136 0-50.712 10.177-69.204 28.657-33.594 33.595-37.228 84.639-13.164 122.051 2.241 3.484 6.882 4.491 10.365 2.25s4.491-6.881 2.25-10.365c-20.406-31.723-17.228-74.945 11.154-103.327 15.657-15.647 36.468-24.265 58.599-24.265h105.41c45.684 0 82.85 37.167 82.85 82.85 0 45.795-37.047 82.85-82.85 82.85h-105.41c-17.12 0-33.536-5.167-47.474-14.94-3.392-2.38-8.068-1.558-10.446 1.833z" /><path d="m452.296 0h-138.74c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h138.74c24.614 0 44.64 20.025 44.64 44.64v76.43c0 24.615-20.025 44.64-44.64 44.64h-114.82c-5.928 0-11.728 2.401-15.912 6.585l-35.508 35.491v-19.576c0-12.407-10.094-22.5-22.5-22.5h-15.73c-28.739 0-52.12-23.386-52.12-52.13v-68.94c0-24.615 20.021-44.64 44.63-44.64h38.22c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-38.22c-32.88 0-59.63 26.754-59.63 59.64v68.94c0 16.027 5.652 30.753 15.057 42.309-65.133 15.31-116.753 62.9-138.859 123.638-4.036.642-7.969 1.654-11.788 3.008v-72.659c12.972-3.342 22.585-15.14 22.585-29.141 0-16.591-13.498-30.088-30.088-30.088s-30.089 13.497-30.089 30.088c0 14.003 9.616 25.803 22.591 29.143v80.175c-35.212 23.569-40.709 73.778-10.283 104.231 11.147 11.148 25.686 17.991 41.255 19.505 24.75 49.372 75.795 83.152 134.638 83.152h90.36c59.093 0 109.973-33.874 134.66-83.164 34.235-3.347 61.069-32.106 61.069-67.396 0-33.397-24.288-61.601-56.893-66.84-11.912-32.73-33.124-63.407-62.818-86.855-3.252-2.568-7.968-2.014-10.534 1.238-2.567 3.25-2.013 7.967 1.237 10.534 42.492 33.556 68.838 85.049 68.838 141.924 0 74.611-60.367 135.56-135.56 135.56h-90.36c-74.083 0-135.55-60.064-135.55-135.56 0-88.692 64.022-162.942 149.028-177.948 10.931 7.722 24.25 12.278 38.622 12.278h15.73c4.136 0 7.5 3.364 7.5 7.5v19.59c0 13.324 16.2 20.026 25.603 10.604l35.512-35.501c1.394-1.393 3.327-2.192 5.306-2.192h114.82c32.886 0 59.64-26.754 59.64-59.64v-76.433c0-32.886-26.754-59.64-59.639-59.64zm14.519 361.38c0 24.632-16.737 44.947-39.003 50.926 5.86-16.257 8.833-33.329 8.833-50.926 0-17.083-2.193-33.934-6.519-50.259 21.537 6.759 36.689 26.701 36.689 50.259zm-444.291-165.645c0-8.32 6.769-15.088 15.088-15.088s15.088 6.769 15.088 15.088-6.769 15.088-15.088 15.088-15.088-6.768-15.088-15.088zm-7.529 165.645c0-22.852 14.914-43.317 36.698-50.252-4.325 16.323-6.518 33.173-6.518 50.252 0 17.596 2.974 34.668 8.834 50.926-22.186-5.958-39.014-26.205-39.014-50.926z" /><path d="m346.318 127.941c16.591 0 30.089-13.498 30.089-30.088s-13.498-30.088-30.089-30.088-30.088 13.497-30.088 30.088 13.497 30.088 30.088 30.088zm0-45.177c8.32 0 15.089 6.769 15.089 15.088s-6.769 15.088-15.089 15.088c-8.319 0-15.088-6.769-15.088-15.088s6.769-15.088 15.088-15.088z" /><path d="m466.759 97.853c0-16.591-13.497-30.088-30.088-30.088s-30.089 13.498-30.089 30.088 13.498 30.088 30.089 30.088 30.088-13.498 30.088-30.088zm-45.176 0c0-8.32 6.769-15.088 15.089-15.088 8.319 0 15.088 6.769 15.088 15.088s-6.769 15.088-15.088 15.088c-8.321 0-15.089-6.769-15.089-15.088z" /><path d="m255.965 67.764c-16.591 0-30.088 13.498-30.088 30.088s13.498 30.088 30.088 30.088 30.088-13.498 30.088-30.088-13.497-30.088-30.088-30.088zm0 45.177c-8.32 0-15.088-6.769-15.088-15.088s6.769-15.088 15.088-15.088 15.088 6.769 15.088 15.088-6.768 15.088-15.088 15.088z" /><path d="m240.904 401.33c20.39-.001 37.459-18.013 37.446-41.031-.006-11.428-4.343-19.418-12.892-23.748-7.219-3.657-16.348-3.982-24.572-3.982-12.155.006-37.449.019-37.435 27.767.012 22.157 16.304 40.995 37.453 40.994zm-.009-53.762c5.138 0 13.248.065 17.787 2.363 2.423 1.228 4.666 3.333 4.669 10.374.006 13.695-9.539 26.018-22.436 26.024-12.774.006-22.456-12.144-22.462-26.002-.006-9.721 3.089-12.749 22.442-12.759z" /><path d="" /><path d="m168.853 344.876c-.001-1.881.731-3.65 2.06-4.981 4.397-4.401 12.022-1.314 12.025 4.974.002 4.141 3.359 7.496 7.5 7.496 4.13 0 7.502-3.347 7.5-7.504-.007-12.151-9.893-22.032-22.043-22.032-12.165 0-22.049 9.846-22.042 22.053.002 4.141 3.359 7.497 7.5 7.497 4.123 0 7.502-3.338 7.5-7.503z" /><path d="m298.848 344.811c-.002-3.884 3.156-7.045 7.04-7.047 3.891-.002 7.044 3.147 7.046 7.039.002 4.142 3.359 7.497 7.5 7.497 4.132 0 7.502-3.348 7.5-7.503-.006-12.173-9.858-22.032-22.043-22.032-12.149 0-22.049 9.887-22.043 22.054.002 4.141 3.359 7.497 7.5 7.497 4.131-.002 7.502-3.349 7.5-7.505z" /></g></svg>
            </span>
            <p className='font-medium'>AI Chat</p>
          </div>
          <p className='mt-2 text-gray-500'>
            Experience seamless interactions with our AI chat feature, providing instant support and answers on our website.
          </p>
        </div>
        <div className='col-span-2 h-full max-w-80 rounded-lg border border-gray-50 p-3 shadow md:col-span-1'>
          <div className='flex items-center gap-2'>
            <span className='rounded-full bg-cl-bg-icon p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </span>
            <p className='font-medium'>Chatting</p>
          </div>
          <p className='mt-2 text-gray-500'>

            Connect with friends for effective learning. Share knowledge, resources, and discuss study topics instantly, anytime, anywhere.
          </p>
        </div>
      </div>
      <section className='mt-10 px-4 lg:mt-24'>
        <div className='grid items-center gap-4 lg:grid-cols-2'>

          <div className='col-span-1'>
            <h2 className='text-center text-4xl font-bold !leading-tight lg:text-left lg:text-5xl'>
              Push your {' '}
              <span className='bg-gradient-to-r from-[#ff9966] to-[#ff5e62] bg-clip-text text-transparent'>
                motivation {' '}
              </span>
              with the video streaming!
            </h2>
            <p className='mt-4 text-center text-xl text-gray-500 lg:text-left'>
              Todo List helps you organize and manage tasks effectively. Always list your tasks for the next day every evening.
            </p>
          </div>
          <div className='col-span-1 flex items-center justify-center'>
            <div className='relative h-[60vw] w-[80vw] lg:h-[35vw] lg:w-[45vw] flex items-center justify-center '>
              <img src={StudyStream} alt="StudyStream Image" className='rounded-2xl' />
            </div>
          </div>
        </div>
      </section>
      <section className='mt-10 px-4 lg:mt-24'>
        <div className='grid gap-4 lg:grid-cols-2'>
          <div>
            <h2 className='col-span-1 text-center text-4xl font-bold !leading-tight lg:text-left lg:text-5xl'>
              Enhance your learning {' '}
              <span className='bg-gradient-to-r from-[#17c964] to-[#6FEE8D] bg-clip-text text-transparent'>
                efficiency {' '}
              </span>
              with StudyStream!
            </h2>
            <p className='mt-4 text-center text-lg text-gray-500 lg:text-left'>
              Don't force yourself if you're not truly ready. Focus deeply for 25 minutes, then take a short 5-minute break
            </p>
          </div>
        </div>
        <div className='mt-8 grid-cols-2 gap-16 lg:grid'>
          <div className='col-span-1 flex items-center justify-center'>
            <div className='relative h-[60vw] w-[80vw] max-w-[600px] lg:h-[30vw] lg:w-[40vw]'>
              <img src={Topic} alt="Topic Image" className='rounded-2xl' />
            </div>
          </div>
          <div className='col-span-1 flex items-center justify-center'>
            <div className='relative h-[60vw] w-[80vw] max-w-[600px] lg:h-[30vw] lg:w-[40vw]'>
              <img src={PomodoroBg} alt="Pomodoro Image" className='rounded-2xl' />
            </div>
          </div>
        </div>
      </section>

      <section className='mt-10 px-4 lg:mt-24'>
        <div className='flex flex-col-reverse lg:flex-row items-center gap-4'>
          <div className='flex-1 flex items-center justify-center'>
            <div className='relative h-[60vw] w-[80vw] lg:h-[35vw] lg:w-[45vw] flex items-center justify-center'>
              <img src={aiImg} alt="StudyStream Image" className='rounded-2xl' />
            </div>
          </div>
          <div className='flex-1'>
            <h2 className='text-center text-4xl font-bold !leading-tight lg:text-left lg:text-5xl'>
              Answer{' '}
              <span className='bg-gradient-to-r from-[#F54C7A] to-[#FF72E1] bg-clip-text text-transparent'>
                questions{' '}
              </span>
              with our chatbot.
            </h2>
            <p className='mt-4 text-center text-xl text-gray-500 lg:text-left'>
              Our AI chatbot is designed to efficiently and accurately answer all your questions, providing quick and reliable assistance.
            </p>
          </div>

        </div>
      </section>


      <section className='mt-10 px-4 lg:mt-24'>
        <div className='grid items-center gap-4 lg:grid-cols-2'>
          <div className='col-span-1'>
            <h2 className='text-center text-4xl font-bold !leading-tight lg:text-left lg:text-5xl'>
              Connect with     {' '}
              <span className='bg-gradient-to-r from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent'>
                friends {' '}
              </span>
              for effective learning.
            </h2>
            <p className='mt-4 text-center text-xl text-gray-500 lg:text-left'>
              Share knowledge, resources, and discuss study topics instantly, anytime, anywhere.
            </p>
          </div>
          <div className='col-span-1 flex items-center justify-center'>
            <div className='relative h-[60vw] w-[80vw] lg:h-[35vw] lg:w-[45vw] flex items-center justify-center '>
              <img src={chat} alt="Chat Image" className='rounded-2xl' />
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <div id='community' className='mb-4 mt-20 text-center text-2xl font-bold'>Community</div>
      <div>
        <p className='text-center text-xl text-gray-500'>Get involved in our community. Everyone is welcome!</p>
        <div className='mt-4 grid grid-cols-2 items-center justify-center gap-4 p-2 md:flex'>
          <a href="" className='col-span-1 h-full max-w-80 rounded-lg border border-gray-50 p-3 shadow'>
            <div className='flex items-center gap-2'>
              <span className='rounded-full bg-cl-bg-icon p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" x="0" y="0" viewBox="0 0 152 152"><g><linearGradient id="a" x1="49.252" x2="118.558" y1="114.48" y2="45.175" gradientTransform="matrix(1 0 0 -1 0 154)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#42a5f5"></stop><stop offset="1" stop-color="#1565c0"></stop></linearGradient><path fill="url(#a)" d="M60.4 84.5H44.3c-2.6 0-3.4-1-3.4-3.4V61.4c0-2.6 1-3.6 3.4-3.6h16.1V43.5c-.2-6.3 1.3-12.7 4.4-18.4 3.3-5.7 8.5-9.9 14.5-12 4.1-1.5 8.1-2.1 12.4-2.1h15.9c2.3 0 3.3 1 3.3 3.3v18.5c0 2.3-1 3.3-3.3 3.3-4.4 0-8.8 0-13.2.2s-6.7 2.1-6.7 6.7c-.2 4.9 0 9.6 0 14.6h18.7c2.6 0 3.6 1 3.6 3.6v19.7c0 2.6-.8 3.6-3.6 3.6H87.9v52.9c0 2.8-1 3.7-3.7 3.7H63.9c-2.4 0-3.4-1-3.4-3.4V84.5z" opacity="1" data-original="url(#a)"></path></g></svg>
              </span>
              <p className='font-medium'>Facebook</p>
            </div>
            <p className='mt-2 text-gray-500'>Join our Facebook for support and updates.</p>
          </a>
          <a href="" className='col-span-1 h-full max-w-80 rounded-lg border border-gray-50 p-3 shadow'>
            <div className='flex items-center gap-2'>
              <span className='rounded-full bg-cl-bg-icon p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" x="0" y="0" viewBox="0 0 1227 1227"><g><path d="M654.53 592.55 930.65 987.5H817.33L592.01 665.22v-.02l-33.08-47.31-263.21-376.5h113.32l212.41 303.85z" fill="#000000" opacity="1" data-original="#000000"></path><path d="M1094.42 0H132.58C59.36 0 0 59.36 0 132.58v961.84C0 1167.64 59.36 1227 132.58 1227h961.84c73.22 0 132.58-59.36 132.58-132.58V132.58C1227 59.36 1167.64 0 1094.42 0zm-311.8 1040.52L554.61 708.68l-285.47 331.84h-73.78l326.49-379.5-326.49-475.17h249.02l215.91 314.23 270.32-314.23h73.78l-311.33 361.9h-.02l338.6 492.77z" fill="#000000" opacity="1" data-original="#000000"></path></g></svg>
              </span>
              <p className='font-medium'>X</p>
            </div>
            <p className='mt-2 text-gray-500'>To get involved in the community, ask questions and share tips.</p>
          </a>
          <a href="" className='col-span-1 h-full max-w-80 rounded-lg border border-gray-50 p-3 shadow'>
            <div className='flex items-center gap-2'>
              <span className='rounded-full bg-cl-bg-icon p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" x="0" y="0" viewBox="0 0 512 512"><g><g fill="#f00044"><path d="M182.1 265.4c-40.6 0-73.4 32.8-72.8 73 .4 25.8 14.6 48.2 35.5 60.7-7.1-10.9-11.3-23.8-11.5-37.7-.6-40.2 32.2-73 72.8-73 8 0 15.7 1.3 22.9 3.6v-80.5c-7.5-1.1-15.2-1.7-22.9-1.7H205V269c-7.2-2.3-14.9-3.6-22.9-3.6zM357.6 24H336.2c6 30.1 22.9 56.3 46.5 74.1C367.2 77.6 357.8 52 357.6 24z" fill="#f00044" opacity="1" data-original="#f00044"></path><path d="M480 146.5c-7.9 0-15.5-.8-23-2.2V202c-27.2 0-53.6-5.3-78.4-15.9-16-6.8-30.9-15.5-44.6-26l.4 177.9c-.2 40-16 77.5-44.6 105.8-23.3 23-52.8 37.7-84.8 42.4-7.5 1.1-15.2 1.7-22.9 1.7-34.2 0-66.8-11.1-93.3-31.6 3 3.6 6.2 7.1 9.7 10.5 28.8 28.4 67 44.1 107.7 44.1 7.7 0 15.4-.6 22.9-1.7 32-4.7 61.5-19.4 84.8-42.4 28.6-28.3 44.4-65.8 44.6-105.8L357 183.1c13.6 10.5 28.5 19.3 44.6 26 24.9 10.5 51.3 15.9 78.4 15.9" fill="#f00044" opacity="1" data-original="#f00044"></path></g><path fill="#08fff9" d="M98.2 254.1c28.5-28.3 66.4-44 106.8-44.3v-21.3c-7.5-1.1-15.2-1.7-22.9-1.7-40.8 0-79.1 15.7-107.9 44.3-28.3 28.1-44.5 66.5-44.4 106.4 0 40.2 15.9 77.9 44.6 106.4 4.6 4.5 9.3 8.7 14.3 12.5-22.6-26.9-34.9-60.5-35-95.9.1-39.9 16.2-78.3 44.5-106.4zM457 144.3v-21.4h-.2c-27.8 0-53.4-9.2-74-24.8 17.9 23.6 44.1 40.4 74.2 46.2z" opacity="1" data-original="#08fff9"></path><path fill="#08fff9" d="M202 432.2c9.5.5 18.6-.8 27-3.5 29-9.5 49.9-36.5 49.9-68.3l.1-119V24h57.2c-1.5-7.5-2.3-15.1-2.4-23H255v217.3l-.1 119c0 31.8-20.9 58.8-49.9 68.3-8.4 2.8-17.5 4.1-27 3.5-12.1-.7-23.4-4.3-33.2-10.1 12.3 19 33.3 31.9 57.2 33.2z" opacity="1" data-original="#08fff9"></path><path d="M205 486.2c32-4.7 61.5-19.4 84.8-42.4 28.6-28.3 44.4-65.8 44.6-105.8l-.4-177.9c13.6 10.5 28.5 19.3 44.6 26 24.9 10.5 51.3 15.9 78.4 15.9v-57.7c-30.1-5.8-56.3-22.6-74.2-46.2-23.6-17.8-40.6-44-46.5-74.1H279v217.3l-.1 119c0 31.8-20.9 58.8-49.9 68.3-8.4 2.8-17.5 4.1-27 3.5-24-1.3-44.9-14.2-57.2-33.1-20.9-12.4-35.1-34.9-35.5-60.7-.6-40.2 32.2-73 72.8-73 8 0 15.7 1.3 22.9 3.6v-59.2c-40.4.3-78.3 16-106.8 44.3-28.3 28.1-44.5 66.5-44.4 106.3 0 35.4 12.3 69 35 95.9 26.6 20.5 59.1 31.6 93.3 31.6 7.7.1 15.4-.5 22.9-1.6z" fill="#000000" opacity="1" data-original="#000000"></path></g></svg>
              </span>
              <p className='font-medium'>Tiktok</p>
            </div>
            <p className='mt-2 text-gray-500'>Follow us on Tiktok for videos and contents.</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default GetStartedPage