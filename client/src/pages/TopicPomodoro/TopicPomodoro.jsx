import React from 'react'
import Logo from '../../img/logo.png'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState, useContext } from 'react'
import axios from 'axios'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import AvatarDropdown from '../../components/AvatarDropdown/AvatarDropdown'
import OptionList from '../../components/OptionList/OptionList'
import { useNavigate } from 'react-router-dom'

function TopicPomodoro() {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { entry } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/topic/api/topics/${entry}`);
        setTopic(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [entry])

  const handleOptionSelect = (topicType, entryId) => {
    navigate(`/pomodoro/${topicType}/${entryId}`)
  }

  return (
    <div className="bg-gray-200 z-50 -m-4">
      <div className="flex justify-between items-center bg-transparent p-2 ">
        <div className="w-auto h-9 relative ml-5 flex items-center space-x-5">
          <img className="h-full" src={Logo} alt="Logo" />
          <span className="text-lg">Hi, {user.firstname + ' ' + user.lastname}</span>
        </div>
        <div className='relative mr-2'>
          <AvatarDropdown />
        </div>

      </div>
      <div className="flex">
        {/* sidebar */}
        <LeftSideBar />
        {/* Main content */}
        <div className="flex-1 p-4 m-auto my-4 max-w-7xl rounded-lg bg-white px-6 py-4">
          <div className='mb-4 '>
            <div className='flex items-center'>
              <Link to="/test">
                <span className='flex cursor-pointer flex-center'>
                  <svg
                    className='size-[30px] '
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                    <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
                    />
                  </svg>
                  <span className='text-lg'>Back</span>
                </span>
              </Link>
              <span className='ml-5'>Lofi chill workspace</span>
            </div>
            <div>
              <input type="text" placeholder='Type to search...' />
            </div>
          </div>
          <div
            className='my-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

          >
            {topic?.entries.map(entry => (
              <OptionList
                key={entry.entryId}
                topic={entry}
                onClick={() => handleOptionSelect(topic.topicName, entry.entryId)}
              />
            ))}
          </div>

        </div>
        {/* Right bar */}
      </div>
    </div>
  )
}

export default TopicPomodoro
