import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import '../UserTable/UserTable.scss'

function UpdateTopicModal({ data, onTopicUpdated }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState(data)
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const error = useSelector((state) => state.authReducer.error)
  const initialData = useRef(data)

  // Hàm so sánh dữ liệu
  const isDataChanged = (newData, oldData) => {
    return JSON.stringify(newData) !== JSON.stringify(oldData)
  }

  useEffect(() => {
    // Cập nhật formData khi data thay đổi thực sự
    if (isDataChanged(data, initialData.current)) {
      setFormData(data)
      initialData.current = data // Cập nhật dữ liệu ban đầu
    }
  }, [data])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Gửi yêu cầu POST tới API
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/topic/${data.topicName}`,
        formData
      )

      // Xử lý phản hồi từ API
      console.log('updatedTopic.topic: ', response.data)

      // Gọi hàm onTopicUpdated với dữ liệu người dùng đã cập nhật
      onTopicUpdated(response.data)
    } catch (error) {
      console.error(
        'Error updating topic: ',
        error.response ? error.response.data : error.message
      )
    } finally {
      // Đóng modal sau khi cập nhật thành công hoặc thất bại
      setIsModalOpen(false)
    }
  }
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      <button
        type="button"
        data-drawer-target="drawer-update-product"
        data-drawer-show="drawer-update-product"
        aria-controls="drawer-update-product"
        className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300600 "
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 -ml-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
        Edit
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 z-50 w-full max-w-2xl">
            <h1 className="font-bold text-[20px] mb-5 text-white">
              Add new topic
            </h1>
            <hr className="mb-5" />
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
                    value={formData.topicName}
                    required
                    readOnly
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
                    value={formData.nameOfTopic}
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
                    value={formData.topicImage}
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
                    value={formData.topicDescription}
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
                  Update Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateTopicModal
