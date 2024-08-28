import React from 'react'
import notfoundImage from '../../img/notfound.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex items-center min-h-screen bg-white m-[-1rem]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 bg-white overflow-hidden">
        <div className="flex flex-col justify-center p-12 md:p-16 h-full">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-4">Ooops...</h1>
            <h2 className="text-4xl text-gray-900 mb-4">Page not found</h2>
            <p className="text-lg text-gray-600 mb-20">
              The page you are looking for does not exist or some other error occurred, go back to home page.
            </p>
            <Link
              to="/dashhome"
              className="inline-block button text-white font-bold py-3 px-14 rounded-full text-lg"
            >
              Go Back
            </Link>
          </div>
        </div>
        <div className="relative h-full">
          <img className="object-cover w-full h-full" src={notfoundImage} alt="Not Found" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
