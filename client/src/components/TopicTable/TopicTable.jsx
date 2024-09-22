import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import AddTopicModal from '../AdminManageTopic/AddTopicModal'
import DeleteTopicModal from '../AdminManageTopic/DeleteTopicModal'
import UpdateTopicModal from '../AdminManageTopic/UpdateTopicModal'
import ReadingUserModal from '../AdminManageUserButton/ReadingUserModal'
import UserPagination from '../AdminManageUserButton/UserPagination'
import { useTranslation } from 'react-i18next'
import ChangeLanguage from '../../components/ChangeLanguage/ChangeLanguage'

function TopicTable() {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { t } = useTranslation('admin')

  const navigate = useNavigate()

  const openModal = (topic, modalType) => {
    setModalType(modalType)
    setIsModalOpen(true)
    setSelectedTopic(topic)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 6

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/topic/topics`
        )
        setTopics(response.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTopics()
  }, [topics.length])

  const totalPages = Math.ceil(topics?.length / rowsPerPage)

  const filteredTopics = topics?.filter((topic) => {
    const topicName = topic.nameOfTopic.toLowerCase();
    return topicName.includes(searchQuery.toLowerCase());
  })

  const currentData = filteredTopics?.slice(
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

  const handleTopicAdded = (newTopic) => {
    setTopics((prevTopics) => [...prevTopics, newTopic])
  }

  const handleTopicUpdated = (updatedTopic) => {
    setTopics((prevTopics) =>
      prevTopics?.map((topic) =>
        topic.topicName === updatedTopic?.topicName ? updatedTopic : topic
      )
    )
    toast.success('User updated successfully!', { className: 'custom-toast' })
  }
  const handleTopicDeleted = (deletedTopicId, topicName) => {
    setTopics((prevTopics) =>
      prevTopics.filter((topic) => topic._id !== deletedTopicId)
    )
    toast.success(`Deleted topic ${topicName} successfully!`, {
      className: 'custom-toast-delete',
    })
  }

  const handleTopicSelected = (topicName) => {
    navigate(`/admin-topic/${topicName}`)
  }

  return (
    <div>
      {console.log('Topics: ', topics)}
      <>
        {/* Start block */}
        <section className=" bg-gray-50 p-3 sm:p-5 antialiased h-[700px]">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12 mb-3">
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex-1 flex items-center space-x-2 justify-between">
                  <h5>
                    <span className="text-gray-500">All Topic: </span>
                    <span className="text-black">{topics?.length}</span>
                  </h5>
                  <div>
                    <ChangeLanguage />
                  </div>
                  <div
                    id="results-tooltip"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-black transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
                  >
                    Showing 1-100 of 436 results
                    <div className="tooltip-arrow" data-popper-arrow="" />
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
                          className="w-5 h-5 text-gray-500 "
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
                        placeholder="Search for topic"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <AddTopicModal onTopicAdded={handleTopicAdded} />
                </div>
              </div>

              <div className="overflow-x-auto mb-3">
                <table className="w-full text-sm text-left text-black-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="p-4">
                        {t('Topics.Image')}
                      </th>
                      <th scope="col" className="p-4">
                        {t('Topics.Topic Name')}
                      </th>
                      <th scope="col" className="p-4">
                        {t('Topics.Number of entries')}
                      </th>
                      <th scope="col" className="p-4">
                        {t("Topics.Description")}
                      </th>
                      <th scope="col" className="p-4">
                        {t('Topics.Last Update')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((topic, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-400 hover:bg-gray-100 "
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-black cursor-pointer	"
                          onClick={() => handleTopicSelected(topic.topicName)}
                        >
                          <div className="flex items-center mr-3">
                            <img
                              className="w-12 h-12 bg-gray-400 rounded-full mx-4 p-1"
                              src={topic?.topicImage}
                              alt="Topic Image"
                            />
                          </div>
                        </th>
                        <td
                          className="px-4 py-3 cursor-pointer	"
                          onClick={() => handleTopicSelected(topic.topicName)}
                        >
                          <span
                            className={`bg-primary-100 text-primary-800 text-sm font-medium px-2 py-0.5 rounded900 text-blue-500`}
                          >
                            {topic?.nameOfTopic}
                          </span>
                        </td>
                        <td
                          className="px-4 py-3 font-medium text-gray-500 whitespace-nowrap text-black cursor-pointer	"
                          onClick={() => handleTopicSelected(topic.topicName)}
                        >
                          <div className="flex items-center">
                            {topic?.entries.length} {t('Topics.entries')}
                          </div>
                        </td>
                        <td
                          className="px-4 py-3 font-medium text-gray-500 whitespace-nowrap text-black cursor-pointer	"
                          onClick={() => handleTopicSelected(topic.topicName)}
                        >
                          {topic?.topicDescription
                            ? topic.topicDescription
                              .split(' ')
                              .slice(0, 4)
                              .join(' ') +
                            (topic.topicDescription.split(' ').length > 5
                              ? '...'
                              : '')
                            : ''}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-black">
                          <div className="flex items-center space-x-4">
                            {/* <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} /> */}
                            {/* <UpdateUserModal data={user} onUserUpdated={handleUserUpdated} /> */}
                            <UpdateTopicModal
                              data={topic}
                              onTopicUpdated={handleTopicUpdated}
                            />
                            <div>
                              <button
                                type="button"
                                onClick={() => openModal(topic, 'preview')}
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
                                Preview
                              </button>
                              {isModalOpen && modalType === 'preview' && (
                                <ReadingUserModal
                                  isOpen={isModalOpen}
                                  onClose={closeModal}
                                  topicData={selectedTopic}
                                />
                              )}
                            </div>

                            <div>
                              <button
                                type="button"
                                data-modal-target="delete-modal"
                                data-modal-toggle="delete-modal"
                                className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center "
                                onClick={() => openModal(topic, 'delete')}
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
                                Delete
                              </button>
                              {isModalOpen && modalType === 'delete' && (
                                <DeleteTopicModal
                                  isOpen={isModalOpen}
                                  onClose={closeModal}
                                  topicId={selectedTopic?._id}
                                  topicName={selectedTopic?.topicName}
                                  onTopicDeleted={handleTopicDeleted}
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

export default TopicTable
