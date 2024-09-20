import React from 'react'
import { toast } from 'sonner'
import UserInfoModal from '../UserInfoModal/UserInfoModal'
import UserPagination from '../AdminManageUserButton/UserPagination'
import { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateUserModal from '../AdminManageUserButton/UpdateUserModal'
import DeleteUserModal from '../AdminManageUserButton/DeleteUserModal'
import ReadingUserModal from '../AdminManageUserButton/ReadingUserModal'
import './UserTable.scss'
import { useTranslation } from 'react-i18next'
import ChangeLanguage from '../../components/ChangeLanguage/ChangeLanguage'

function UserTable({ dataAdmin }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState()
  const rowsPerPage = 6
  const { t } = useTranslation('admin')

  const openModal = (userId, user, modalType) => {
    setSelectedUser(user)
    setModalType(modalType)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/user`
        )
        setUser(response.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [user.length])

  const totalPages = Math.ceil(user?.length / rowsPerPage)

  const filteredUsers = user?.filter((user) => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  })

  const currentData = filteredUsers?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleUserAdded = (newUser) => {
    setUser((prevUsers) => [...prevUsers, newUser])
  }

  const handleUserUpdated = (updatedUser) => {
    setUser((prevUsers) =>
      prevUsers?.map((user) =>
        user._id === updatedUser?._id ? updatedUser : user
      )
    )
    toast.success('User updated successfully!', { className: 'custom-toast' })
  }

  const handleUserDeleted = (deletedUserId, userFullName) => {
    setUser((prevUsers) =>
      prevUsers.filter((user) => user._id !== deletedUserId)
    )
    toast.success(`Deleted user ${userFullName} successfully!`, {
      className: 'custom-toast-delete',
    })
  }

  return (
    <div>
      <>
        {/* Start block */}
        <section className="userTable bg-gray-50 p-3 sm:p-5 antialiased h-[700px]">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12 mb-3">
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex-1 flex items-center space-x-2 justify-between	">
                  <h5>
                    <span className="text-gray-500">{t('Users.All Users')}: </span>
                    <span className="text-black">{user?.length}</span>
                  </h5>
                  <div>
                    <ChangeLanguage />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t border-gray-700">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        placeholder={t('Users.Search for users')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                        value={searchQuery} // Bind input to searchQuery state
                        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <UserInfoModal onUserAdded={handleUserAdded} />
                </div>
              </div>

              <div className="overflow-x-auto mb-3">
                <table className="w-full text-sm text-left text-black-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>

                      <th scope="col" className="p-4">
                        {t('Users.Username')}
                      </th>
                      <th scope="col" className="p-4">
                        {t('Users.User role')}
                      </th>
                      <th scope="col" className="p-4">
                        Email
                      </th>
                      <th scope="col" className="p-4">
                        {t('Users.Country')}
                      </th>
                      <th scope="col" className="p-4">
                        {t('Users.Last Update')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((user, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-400 hover:bg-gray-100 "
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-black"
                        >
                          <div className="flex items-center mr-3">
                            <img
                              className="w-11 h-11 bg-gray-500 rounded-full mx-4"
                              src={
                                user?.profilePicture
                                  ? serverPublic + user.profilePicture
                                  : serverPublic + 'defaultProfile.jpg'
                              }
                              alt="User Avatar"
                            />
                            {user?.firstname + ' ' + user?.lastname}
                          </div>
                        </th>
                        <td className="px-4 py-3">
                          <span
                            className={`bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded900 text-blue-500`}
                          >
                            {user?.isAdmin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-black">
                          <div className="flex items-center">
                            {user?.username}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-black">
                          {user?.liveIn}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-black">
                          <div className="flex items-center space-x-4">
                            {/* <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} /> */}
                            <UpdateUserModal
                              data={user}
                              onUserUpdated={handleUserUpdated}
                            />
                            <div>
                              <button
                                type="button"
                                onClick={() =>
                                  openModal(user._id, user, 'preview')
                                }
                                className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 text-black"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-4 h-4 mr-2 -ml-0.5"
                                >
                                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                  />
                                </svg>
                                {t('Users.Preview')}
                              </button>
                              {isModalOpen && modalType === 'preview' && (
                                <ReadingUserModal
                                  isOpen={isModalOpen}
                                  onClose={closeModal}
                                  userData={selectedUser}
                                />
                              )}
                            </div>

                            <div>
                              <button
                                type="button"
                                data-modal-target="delete-modal"
                                data-modal-toggle="delete-modal"
                                className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center "
                                onClick={() =>
                                  openModal(user._id, user, 'delete')
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 -ml-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {t('Users.Delete')}
                              </button>
                              {isModalOpen && modalType === 'delete' && (
                                <DeleteUserModal
                                  isOpen={isModalOpen}
                                  onClose={closeModal}
                                  userId={selectedUser?._id}
                                  userFullName={`${selectedUser?.firstname} ${selectedUser?.lastname}`}
                                  currentUserId={dataAdmin?._id}
                                  currentUserAdminStatus={dataAdmin?.isAdmin}
                                  onUserDeleted={handleUserDeleted}
                                />
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            goToPage={goToPage}
          />
        </section>
      </>
    </div>
  )
}

export default UserTable
