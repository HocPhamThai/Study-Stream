import React from 'react'
import Logo from '../../img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState, useContext } from 'react'
import axios from 'axios'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import AvatarDropdown from '../../components/AvatarDropdown/AvatarDropdown'
import OptionList from '../../components/OptionList/OptionList'
import RandomPlaylist from '../../components/RandomPlaylist/RandomPlaylist'
import FavoritePlaylist from '../../components/FavoritePlaylist/FavoritePlaylist'
import HorizontalNavbar from '../../components/HorizontalNavbar/HorizontalNavbar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import LearnOnYoutube from '../../components/LearnOnYoutube/LearnOnYoutube'

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

const CoursesTopic = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [courses, setCourses] = useState(null)
  const [listCourses, setListCourses] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { courseTopicId } = useParams()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/courseTopics/${courseTopicId}`
        )
        setCourses(response.data)
        setListCourses(response.data.courses)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleOptionSelect = (option) => {
    navigate(`/courses-topic/${courseTopicId}/${option}`)
  }

  return (
    <div className="bg-gray-200 z-50 -m-4">
      {console.log("Courses: ", courses)}
      {console.log(">> listCourses: ", listCourses)}


      <div className="flex justify-between items-center bg-transparent p-2">
        <div className="w-auto h-9 relative ml-3 flex items-center space-x-5">
          <img
            style={{ width: '50px', height: '38px' }}
            src={Logo}
            alt="Logo"
          />
          {console.log("User: ", user)}
          <span className="text-lg">
            Hi, {user.firstname + ' ' + user.lastname}
          </span>
        </div>
        <div className="relative mr-2">
          <AvatarDropdown />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* sidebar */}
        <div className='hidden lg:block'>
          <LeftSideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 m-auto my-4 max-w-5xl rounded-lg bg-white px-6 py-4">
          <div className="mb-4">
            <Link to={`/courses-topic`}>
              <span className="flex cursor-pointer flex-center">
                <svg
                  className="size-[25px] "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 512"
                >
                  <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
                </svg>
                <span className="text-lg">Back</span>
              </span>
            </Link>
          </div>
          <div className="my-2 grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <div className="w-full p-3 col-span-2 md:col-span-2 lg:col-span-3 relative m-auto flex items-center gap-4 rounded-xl text-white shadow-md mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <div className="w-full md:w-3/5 p-4 md:p-8">
                <div className="mb-4 flex w-fit items-center gap-1 rounded-xl bg-white/20 px-3 py-1 text-xs text-white">
                  Noti
                </div>
                <p className="text-medium font-semibold md:text-lg">
                  {courses?.courseTopicName} Space
                </p>
                <p className="mt-4 text-sm">{courses?.courseTopicDescription}</p>
              </div>
              <div className="flex flex-1 justify-center">
                <img className="w-[160px] h-[140px]" src={courses?.courseTopicImage} alt="" />
              </div>
            </div>

            {listCourses.map(course => (
              <div
                key={course.courseId}
                onClick={() => handleOptionSelect(course.courseId)}
                className="cursor-pointer group relative col-span-1 flex flex-col gap-4 overflow-hidden rounded-3xl shadow-sm"
                style={{ backgroundColor: 'rgba(225,203,172,0.5)' }}
              >
                <div className='flex items-center justify-center md:p-4'>
                  <img className='h-[120px] md:h-[150px]' src={course.courseImage} alt="" />
                </div>
                <div className='flex flex-1 flex-col p-4' style={{ backgroundColor: 'rgba(255, 235, 245)' }}>
                  <p className='font-bold'>{course.courseName}</p>
                  <div className='flex h-full flex-col items-end justify-between gap-2 md:flex-row md:items-center'>
                    <div className='w-full overflow-hidden text-ellipsis'>
                      <div className='w-full overflow-hidden text-sm line-clamp-3'>
                        {course.courseDescription}
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-[#f9a225] to-[#f95f35] z-0 px-4 py-2 rounded-lg text-white">
                      Start
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden xl:block w-96 mr-5 lg:mr-5 mt-5 lg:mt-0">
          <LearnOnYoutube />
        </div>
        <div className="fixed bottom-3 left-0 right-0 lg:hidden mt-2 mx-auto w-max z-50">
          <HorizontalNavbar />
        </div>
      </div>
    </div>
  )
}

export default CoursesTopic
