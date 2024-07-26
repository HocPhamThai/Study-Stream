import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import '../UserTable/UserTable.scss'

function AddTopicModal({ onTopicAdded }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const error = useSelector((state) => state.authReducer.error)

  const [data, setData] = useState({
    topicName: '',
    nameOfTopic: '',
    topicDescription: '',
    topicImage: '',
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8001/topic/topics', data)
      setIsModalOpen(false)
      toast.success('Topic added successfully!', { className: 'custom-toast' })
      onTopicAdded(response.data.topic)
      resetForm()

      if (response.status === 400) {
        console.error('Topic already exists')
      }
    } catch (error) {
      console.error('Error creating topic:', error)
      // Handle other errors
    }

  }

  const resetForm = () => {
    setData({
      topicName: '',
      nameOfTopic: '',
      topicDescription: '',
      topicImage: '',
    })
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      <button
        onClick={openModal}
        className="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none "
      >
        <svg
          className="h-3.5 w-3.5 mr-1.5 -ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          />
        </svg>
        Add Topic
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 z-50 w-full max-w-2xl">
            <h1 className='font-bold text-[20px] mb-5 text-white'>Add new topic</h1>
            <hr className='mb-5' />
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-white "
                  >
                    Topic ID
                  </label>
                  <input
                    type="text"
                    name="topicName"
                    id="topicName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter topic name..."
                    onChange={handleChange}
                    value={data.topicName}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-white "
                  >
                    Topic Name
                  </label>
                  <input
                    type="text"
                    name="nameOfTopic"
                    id="nameOfTopic"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter topic name..."
                    onChange={handleChange}
                    value={data.nameOfTopic}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-white "
                  >
                    Topic Image Link
                  </label>
                  <input
                    type="text"
                    name="topicImage"
                    id="topicImage"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter image link..."
                    onChange={handleChange}
                    value={data.topicImage}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-white "
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="topicDescription"
                    id="topicDescription"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                    placeholder="Write topic description here"
                    onChange={handleChange}
                    value={data.topicDescription}
                    required
                  />
                </div>

              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 border border-gray-200 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-primary-900 focus:z-10 "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Add Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTopicModal
