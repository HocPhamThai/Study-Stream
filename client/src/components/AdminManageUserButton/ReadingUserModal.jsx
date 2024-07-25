import React from 'react'
import { useState } from 'react'

const ReadingUserModal = ({ isOpen, onClose, userData }) => {

  if (!isOpen) return null

  return (
    <div
      id="readProductModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="relative p-4 w-full max-w-xl max-h-full">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow ">
          {/* Modal header */}
          <div className="flex justify-between mb-4 rounded-t sm:mb-5">
            <div className="text-lg text-gray-900 md:text-xl ">
              <h3 className="font-semibold">{userData.firstname} {userData.lastname}</h3>
              <p className="font-bold">{userData.username}</p>
            </div>
            <div>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex "
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </div>
          <dl>
            <dt className="mb-2 font-semibold leading-none text-gray-900 ">Live in:</dt>
            <dd className="mb-4 font-light text-gray-500 sm:mb-5 ">{userData?.liveIn === undefined ? 'Not updated' : userData?.liveIn}</dd>
            <dt className="mb-2 font-semibold leading-none text-gray-900 ">Relationship: </dt>
            <dd className="mb-4 font-light text-gray-500 sm:mb-5 ">{userData?.relationship === undefined ? 'Not updated' : userData?.relationship}</dd>
            {console.log('userData?.relationship: ', userData?.relationship)}
          </dl>
          <div className="flex justify-end space-x-2">

            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 border border-gray-200 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-blue-900 focus:z-10 "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReadingUserModal
