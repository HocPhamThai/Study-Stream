import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import '../UserTable/UserTable.scss'

function UserInfoModal({ onUserAdded }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const error = useSelector((state) => state.authReducer.error)
  const [confirmpass, setConfirmpass] = useState(true)
  const [formErrors, setFormErrors] = useState([])

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpass: '',
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      if (data.password === data.confirmpass) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/auth/register`,
            data
          )
          setIsModalOpen(false)
          toast.success('User added successfully!', {
            className: 'custom-toast',
          })
          onUserAdded(response.data.user)
          resetForm()

          if (response.status === 400) {
            // Handle user already exists error
            console.error('User already exists')
          }
        } catch (error) {
          console.error('Error creating user:', error)
          // Handle other errors
        }
      } else {
        setConfirmpass(false)
      }
    }
  }

  const validateForm = () => {
    let errors = {}
    if (!data.username) {
      errors.username = 'Username is required'
    } else if (!/\S+@\S+\.\S+/.test(data.username)) {
      errors.username = 'Please enter a valid email address'
    } else if (!data.password) {
      errors.password = 'Password is required'
    } else if (data.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more'
    } else if (data.password !== data.confirmpass) {
      errors.confirmpass = 'Passwords do not match'
    }
    setConfirmpass(data.password === data.confirmpass)
    return errors
  }

  const resetForm = () => {
    setData({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirmpass: '',
    })
    setConfirmpass(true) // Reset trạng thái xác nhận mật khẩu
    setFormErrors([]) // Xóa lỗi form
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      <button
        onClick={openModal}
        className="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
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
        Add user
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 z-50 w-full max-w-2xl">
            <h1 className="font-bold text-[20px] mb-5 text-white">
              Add new user
            </h1>
            <hr className="mb-5" />
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter first name..."
                    onChange={handleChange}
                    value={data.firstname}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter last name..."
                    onChange={handleChange}
                    value={data.lastname}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={handleChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter email..."
                    onChange={handleChange}
                    value={data.username}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter password..."
                    onChange={handleChange}
                    value={data.password}
                    autoComplete="off"
                    required
                  />
                  {formErrors.password && (
                    <span className="error">{formErrors.password}</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirmpass"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmpass"
                    id="confirmpass"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter password..."
                    onChange={handleChange}
                    value={data.confirmpass}
                    required
                  />
                  {formErrors.confirmpass && (
                    <span className="error">{formErrors.confirmpass}</span>
                  )}
                  {!formErrors.password && !confirmpass && (
                    <span style={{ color: 'red', fontSize: '0.7rem' }}>
                      * The confirm password is not match!!!
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 border border-gray-200 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-primary-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfoModal
