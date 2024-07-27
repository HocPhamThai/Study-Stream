import React from 'react'
import Logo from '../../img/logo.png'

function GetStartedPage() {
  return (
    <div>
      {/* Navbar  */}
      <div className="sticky top-0 z-20 h-15 bg-white shadow-sm">
        <div className="m-auto flex h-full max-w-[1440px] items-center px-4">
          <a href="" className="flex cursor-pointer items-center justify-center gap-2">
            <span className='w-11 rounded-full bg-cl-3 p-2 hover:bg-cl-bg-icon"'>
              <img src={Logo} alt="" />
            </span>
            <p className='text-lg font-semibold'>Study Stream</p>
          </a>
          <ul className='ml-10 items-center gap-6 whitespace-nowrap text-black text-sm font-medium lg:flex'>
            <li><a href="" className='text-black'>Get Started</a></li>
            <li><a href="">Features</a></li>
            <li><a href="">Comunity</a></li>
            <li><a href="">Blog</a></li>
            <li><a href="">About</a></li>
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
              and boost your study motivation with Corodomo!
            </h1>
            <p className='mt-6 text-center text-lg text-gray-500 lg:text-left'>
              Self-study becomes more enjoyable than ever with Corodomo.
            </p>
            <div className='flex justify-center lg:justify-start'>
              <button className="z-0 border border-gray-300 text-white text-medium mt-6 px-6 min-w-24 h-12 rounded-xl  hover:opacity-80	bg-gradient-to-r from-[#f9a225] to-[#f95f35] select-none whitespace-nowrap overflow-hidden outline-none gap-3 hover:bg-blue-600">
                Get Started
              </button>
            </div>
          </div>
          <div className='col-span-2 m-auto lg:col-span-1'></div>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
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
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
              </svg>

            </span>
            <p className='font-medium'>Analytics</p>
          </div>
          <p className='mt-2 text-gray-500'>
            Explore and gain deeper insights into your study progress with the Analytics feature on StudyStream!
          </p>
        </div>
      </div>
      <section className='mt-10 px-4 lg:mt-24'>
        <div className='grid gap-4 lg:grid-cols-2'>
          <div>
            <h2 className='col-span-1 text-center text-4xl font-bold !leading-tight lg:text-left lg:text-5xl'>
              Push your {' '}
              <span className='bg-gradient-to-r from-[#ff9966] to-[#ff5e62] bg-clip-text text-transparent'>
                motivation {' '}
              </span>
              with the video streaming!
            </h2>
            <p className='mt-4 text-center text-lg text-gray-500 lg:text-left'>
              StudyStream provide realtime video to help you meet other people and push your motivation.
            </p>
          </div>
          <div className='mt-8 grid-cols-2 gap-4 lg:grid'>

          </div>
        </div>
      </section>
    </div>
  )
}

export default GetStartedPage