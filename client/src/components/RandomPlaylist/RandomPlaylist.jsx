import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function RandomPlaylist() {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [randomEntry, setRandomEntry] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRandomEntry = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/topic/random-entries`
        )
        setRandomEntry(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRandomEntry()
  }, [])

  const handleOptionSelect = (topicType, entryId) => {
    navigate(`/pomodoro/${topicType}/${entryId}`)
  }
  return (
    <div className="w-full lg:w-96 lg:mr-5 mt-5 lg:mt-0 ">
      <div className="flex flex-col rounded-2xl bg-white p-6 mt-[14px]">
        <div className="mb-4 flex justify-between">
          <p className="font-bold">Random Playlist</p>
          <p className="cursor-pointer text-sm font-medium text-cl-1">
            <Link
              to="/topic"
              className="cursor-pointer text-sm font-medium text-[#f95f35]"
            >
              View all
            </Link>
          </p>
        </div>
        <div className="mt-2 flex flex-col gap-7">
          {randomEntry.map((entry, index) => (
            <div
              key={index}
              className="flex items-center gap-5"
              onClick={() => handleOptionSelect(entry.topic, entry.entryId)}
            >
              <img
                src={entry.coverImage}
                alt={entry.name}
                className="size-[70px] rounded-xl object-cover"
              />
              <div>
                <p className="text-sm font-medium hover:text-[#f95f35]">
                  {entry.name}
                </p>
                <div className="mt-2 w-fit cursor-pointer font-bold rounded-full bg-[rgba(225,203,172,0.5)] px-3 py-1 text-sm text-[#f95f35]">
                  <span className="font-medium">Start</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RandomPlaylist
