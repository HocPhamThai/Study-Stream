import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function ListLesson({ courseTopicId, courseId, lessonId }) {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [lessons, setLessons] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/courseTopics/${courseTopicId}/courses/${courseId}/lessons`
        )
        setLessons(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchLessons()
  }, [courseTopicId, courseId])

  const handleOptionSelect = (idLesson) => {
    navigate(`/studypage/${courseTopicId}/${courseId}/${idLesson}`)
  }
  return (
    <div className="w-full lg:w-96 lg:mr-5 mt-5 lg:mt-0 ">
      <div className="flex flex-col rounded-2xl bg-white p-6 mt-[14px]">
        <div className="mb-4 flex justify-between">
          <p className="font-bold">List lessons</p>
          <p className="cursor-pointer text-sm font-medium text-cl-1">
            <Link
              to={`/courses-topic/${courseTopicId}/${courseId}`}
              className="cursor-pointer text-sm font-medium text-[#f95f35]"
            >
              View all
            </Link>
          </p>
        </div>
        <div className="mt-2 flex flex-col gap-4 overflow-y-auto cursor-pointer" style={{ maxHeight: 'calc(5 * 80px)' }}>
          {lessons?.map((lesson, index) => (
            <div
              key={index}
              className={`flex items-center gap-5 p-2  ${lesson.lessonId === lessonId ? 'bg-gray-300 rounded-l-lg' : ''}`}
              onClick={() => handleOptionSelect(lesson.lessonId)}
            >
              <img
                src={lesson.lessonImage}
                alt={lesson.lessonName}
                className="size-[70px] rounded-xl object-cover"
              />
              <div>
                <p className="text-sm font-medium hover:text-[#f95f35]">
                  {lesson.lessonName}
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

export default ListLesson
