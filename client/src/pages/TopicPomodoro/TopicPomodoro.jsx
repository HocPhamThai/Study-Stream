import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Logo from '../../img/logo.png'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import AvatarDropdown from '../../components/AvatarDropdown/AvatarDropdown'
import OptionList from '../../components/OptionList/OptionList'
import HorizontalNavBar from '../../components/HorizontalNavbar/HorizontalNavbar'
import { useTranslation } from 'react-i18next'
import ChangeLanguage from '../../components/ChangeLanguage/ChangeLanguage'

function TopicPomodoro() {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { entry } = useParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const { t } = useTranslation(['focus'])

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/topic/api/topics/${entry}`
        )
        setTopic(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTopic()
  }, [entry])

  const handleOptionSelect = (topicType, entryId) => {
    navigate(`/pomodoro/${topicType}/${entryId}`)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredEntries = topic?.entries.filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-gray-200 z-50 -m-4">
      <div className="flex justify-between items-center bg-transparent p-2 ">
        <div className="w-auto h-9 relative ml-5 flex items-center space-x-5">
          <img className="h-full" src={Logo} alt="Logo" />
          <span className="text-lg">
            {t('hi')}, {user.firstname + ' ' + user.lastname}
          </span>
        </div>
        <div className="relative mr-2 flex">
          <div className=' m-auto'><ChangeLanguage /></div>
          <AvatarDropdown />
        </div>
      </div>
      <div className="flex">
        {/* sidebar */}
        <div className="hidden lg:block z-50">
          <LeftSideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 m-auto my-4 max-w-7xl rounded-lg bg-white px-6 py-4">
          <div className="fixed bottom-3 left-0 right-0 sm:hidden mt-2 mx-auto w-max z-50">
            <HorizontalNavBar />
          </div>
          <div className="mb-4 ">
            <div className="flex items-center gap-8">
              <Link to="/topic">
                <span className="flex cursor-pointer flex-center">
                  <svg
                    className="size-[25px] "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512"
                  >
                    <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
                  </svg>
                  <span className="text-lg">{t('back')}</span>
                </span>
              </Link>
              <span className="ml-5 text-xl font-bold">
                {topic?.nameOfTopic} workspace
              </span>
            </div>
            <div className="inline-flex w-full items-center h-full box-border pl-6 py-3 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="20"
                height="20"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                class="text-[#36353A]"
              >
                <g>
                  <path
                    d="m21.71 20.29-2.83-2.82a9.52 9.52 0 1 0-1.41 1.41l2.82 2.83a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM4 11.5a7.5 7.5 0 1 1 7.5 7.5A7.5 7.5 0 0 1 4 11.5z"
                    data-name="12"
                    fill="currentColor"
                    opacity="1"
                    data-original="currentColor"
                  ></path>
                </g>
              </svg>
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={handleSearchChange}
                className="ml-3 p-1 focus:outline-none"
              />
            </div>
          </div>
          <div className="my-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEntries?.map((entry) => (
              <OptionList
                key={entry.entryId}
                topic={entry}
                onClick={() =>
                  handleOptionSelect(topic.topicName, entry.entryId)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicPomodoro
