import React from 'react'
import { toast } from 'sonner'
import UserInfoModal from '../UserInfoModal/UserInfoModal'
import UserPagination from '../AdminManageUserButton/UserPagination'
import { useEffect, useRef, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AddSongModal from '../AdminManageMusic/AddSongsModal'
import UpdateSongModal from '../AdminManageMusic/UpdateSongModal'
import DeleteSongModal from '../AdminManageMusic/DeleteSongModal'
import { useSelector } from 'react-redux'

function SongsTable() {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [selectedSong, setSelectedSong] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate()
  const authData = useSelector((state) => state.authReducer.authData) || {
    user: null,
  }
  const { user } = authData ? authData : null
  const openModal = (song, modalType) => {
    setModalType(modalType)
    setIsModalOpen(true)
    setSelectedSong(song)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 7

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/songs`
        )
        setSongs(response.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSongs()
  }, [songs.length])

  const totalPages = Math.ceil(songs?.length / rowsPerPage)

  const filteredSongs = songs?.filter((song) => {
    const songName = song.nameSong.toLowerCase()
    return songName.includes(searchQuery.toLowerCase())
  })

  const currentData = filteredSongs?.slice(
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

  const handleSongAdded = (newSong) => {
    setSongs((prevSongs) => [...prevSongs, newSong])
  }

  const handleSongUpdated = (updatedSong) => {
    setSongs((prevSongs) =>
      prevSongs?.map((song) =>
        song._id === updatedSong?._id ? updatedSong : song
      )
    )
    toast.success('Song updated successfully!', { className: 'custom-toast' })
  }

  const handleSongDeleted = (deletedSongId, nameSong) => {
    setSongs((prevSong) =>
      prevSong.filter((song) => song._id !== deletedSongId)
    )
    toast.success(`Deleted topic ${nameSong} successfully!`, {
      className: 'custom-toast-delete',
    })
  }

  return (
    <div>
      <>
        {/* Start block */}
        <section className=" bg-gray-50 p-3 sm:p-5 antialiased h-screen">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12 mb-3">
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex items-center justify-between w-full">
                  <h5>
                    <span className="text-gray-500">All Songs: </span>
                    <span className="text-black">{songs?.length}</span>
                  </h5>
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
                        placeholder="Search for song"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <AddSongModal onSongAdded={handleSongAdded} />
                </div>
              </div>

              <div className="overflow-x-auto mb-3">
                <table className="w-full text-sm text-left text-black-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="p-4">
                        Song Name
                      </th>

                      <th scope="col" className="p-4">
                        Link to download
                      </th>

                      <th scope="col" className="p-4">
                        Last Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((song, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-400 hover:bg-gray-100 "
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-black"
                        >
                          <div className="flex items-center mr-3">
                            <span
                              className={`bg-primary-100 text-primary-800 text-sm font-medium px-2 py-0.5 rounded900 text-blue-500`}
                            >
                              {song?.nameSong}
                            </span>
                          </div>
                        </th>
                        <td className="cursor-pointer px-4 py-3 font-medium text-gray-500 whitespace-nowrap text-black">
                          <div className="flex items-center">
                            <a
                              href={song?.linkStored}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Link
                            </a>
                          </div>
                        </td>

                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-black">
                          <div className="flex items-center space-x-4">
                            <UpdateSongModal
                              data={song}
                              onSongUpdated={handleSongUpdated}
                            />
                            <div>
                              <button
                                type="button"
                                data-modal-target="delete-modal"
                                data-modal-toggle="delete-modal"
                                className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center "
                                onClick={() => openModal(song, 'delete')}
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
                                <DeleteSongModal
                                  isOpen={isModalOpen}
                                  onClose={closeModal}
                                  songId={selectedSong?._id}
                                  nameSong={selectedSong?.nameSong}
                                  onSongDeleted={handleSongDeleted}
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

export default SongsTable
