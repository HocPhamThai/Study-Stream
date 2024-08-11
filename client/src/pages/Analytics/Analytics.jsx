import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AvatarDropdown from '../../components/AvatarDropdown/AvatarDropdown'
import HorizontalNavbar from '../../components/HorizontalNavbar/HorizontalNavbar'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import Logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import postIcon from './postIcon.png'
import dayIcon from './dayIcon.png'
import averageIcon from './averageIcon.png'
import Chart from '../../components/Chart/Chart'
import RightSide from '../../components/RightSide/RightSide'
import motivationImg from './motivationImg.png'
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

function Analytics() {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [duration, setDuration] = useState({})
  const [totalDuration, setTotalDuration] = useState(null)

  useEffect(() => {
    const fetchDuration = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/workingtime/${user._id}/average`
        )
        if (response.data) {
          setDuration(response.data)
        } else {
          setDuration(0) // Giá trị mặc định khi không có dữ liệu
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin duration:', error)
        setDuration(0) // Giá trị mặc định khi có lỗi
      }
    }

    const fetchTotalDuration = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/workingtime/${user._id}/total`
        )
        if (response.data) {
          setTotalDuration(response.data.totalDuration)
        } else {
          setTotalDuration(0) // Giá trị mặc định khi không có dữ liệu
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin duration:', error)
        setTotalDuration(0) // Giá trị mặc định khi có lỗi
      }
    }

    fetchDuration()
    fetchTotalDuration()
  }, [user])

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}  `
    // if (hours > 0) {

    // } else {
    //   return `${minutes} `
    // }
  }

  return (
    <div className="bg-gray-200 z-50 -m-4">
      <div className="flex justify-between items-center bg-transparent p-2">
        <div className="w-auto h-9 relative ml-3 flex items-center space-x-5 ">
          <img
            style={{ width: '50px', height: '38px' }}
            src={Logo}
            alt="Logo"
          />
          <span className="text-lg hidden sm:flex">
            Hi, {user.firstname + ' ' + user.lastname}
          </span>

        </div>
        <div className="relative mr-2">
          <AvatarDropdown />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block">
          {/* Sidebar */}
          <LeftSideBar />
        </div>
        {/* Main content */}
        <div className="flex-1 p-4 m-auto my-4 max-w-5xl rounded-2xl px-6 py-4 bg-white">
          {/* Check now */}
          <div className="relative m-auto flex items-center gap-4 rounded-xl text-white shadow-md mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-3/5 p-8 ">
              <div className="mb-4 flex w-fit items-center gap-1 rounded-xl bg-white/20 px-3 py-1 text-xs text-white">
                Noti
              </div>
              <p className="text-medium font-semibold md:text-lg">
                Maximize your productivity with every Pomodoro!
              </p>
              <p className="mt-4 text-sm">Track your progress and unlock insights into your time management.</p>
              <div className="mt-4">
                <Link to="/pomodoro">
                  <button
                    className="bg-transparent px-4 py-2 border border-red-100 hover:shadow-md rounded-xl"
                    type="button"
                  >
                    Start now
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-1 justify-center ">
              <img
                className="w-[180px] h-[180px]"
                src={motivationImg}
                alt=""
              />
            </div>
          </div>
          <div className="mb-2 mt-5 flex justify-between">
            <p className="font-bold">Your activities</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="col-span-1 flex items-center gap-4 rounded-xl bg-white px-4 py-6 shadow-lg border border-gray-200">
              <div className="rounded-full p-3">
                <img className="w-[40px] h-[40px]" src={averageIcon} alt="" />
              </div>
              <div>
                <div className="text-gray-500">Average hours per day</div>
                <div className="mt-3 text-3xl font-bold">
                  + {formatDuration(duration?.averageDuration || 0)}
                </div>
              </div>
            </div>
            <div className="col-span-1 flex items-center gap-4 rounded-xl bg-white px-4 py-6 shadow-lg border border-gray-200">
              <div className="rounded-full p-3">
                <img className="w-[40px] h-[40px]" src={dayIcon} alt="" />
              </div>
              <div>
                <div className="text-gray-500">Total Days Use</div>
                <div className="mt-3 text-3xl font-bold">
                  + {duration?.numberOfDays}
                </div>
              </div>
            </div>
            <div className="col-span-1 flex items-center gap-4 rounded-xl bg-white px-4 py-6 shadow-lg border border-gray-200">
              <div className="rounded-full p-3">
                <svg
                  id="Capa_1"
                  enable-background="new 0 0 512 512"
                  height="40"
                  viewBox="0 0 512 512"
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="256" cy="256" fill="#e1b89a" r="248.5" />
                  <path
                    d="m378.192 472.416c-239.013-14.74-312.755-323.968-202.249-451.734-97.963 33.318-168.443 126.086-168.443 235.318 0 137.243 111.257 248.5 248.5 248.5 44.419 0 86.108-11.667 122.192-32.084z"
                    fill="#d2996f"
                  />
                  <path
                    d="m504.424 249.985c-53.453-25.082-121.913 31.149-248.424 31.149s-194.971-56.231-248.424-31.149c-.048 2-.076 4.004-.076 6.015 0 137.243 111.257 248.5 248.5 248.5s248.5-111.257 248.5-248.5c0-2.011-.029-4.016-.076-6.015z"
                    fill="#89d47f"
                  />
                  <path
                    d="m378.191 472.416c-129.298-7.974-210.229-102.123-239.79-207.116-56.968-14.42-96.919-31.225-130.825-15.316-.048 2-.076 4.004-.076 6.015 0 137.243 111.257 248.5 248.5 248.5 44.419.001 86.108-11.666 122.191-32.083z"
                    fill="#5ec783"
                  />
                  <circle cx="256" cy="256" fill="#fff" r="194.618" />
                  <path
                    d="m61.382 256c0 107.484 87.133 194.618 194.618 194.618 9.549 0 18.934-.701 28.115-2.029-128.375-61.109-180.313-224.554-149.978-344.322-44.358 35.671-72.755 90.381-72.755 151.733z"
                    fill="#f6e3a3"
                  />
                  <path
                    d="m189.551 189.551c-7.169 7.169-7.688 18.621-1.197 26.408l42.493 50.984c9.648 11.576 27.154 12.37 37.81 1.714 10.656-10.656 9.863-28.162-1.714-37.81l-50.984-42.493c-7.787-6.49-19.239-5.971-26.408 1.197z"
                    fill="#4e5660"
                  />
                  <g fill="#e8899e">
                    <path d="m309.243 202.757c-7.202-7.202-18.672-7.826-26.612-1.447l-37.254 29.928c-11.679 9.382-12.627 26.826-2.034 37.419 10.593 10.593 28.037 9.645 37.419-2.034l29.928-37.254c6.378-7.94 5.755-19.409-1.447-26.612z" />
                    <ellipse
                      cx="181.111"
                      cy="352.156"
                      rx="27.633"
                      ry="22.005"
                    />
                    <ellipse
                      cx="330.889"
                      cy="352.156"
                      rx="27.633"
                      ry="22.005"
                    />
                  </g>
                  <path d="m135.7 125.094c-2.929-2.928-7.678-2.928-10.606 0-2.929 2.93-2.929 7.678 0 10.607l14.549 14.549c1.464 1.464 3.384 2.196 5.303 2.196s3.839-.732 5.303-2.196c2.929-2.93 2.929-7.678 0-10.607zm61.515 182.464c-11.388 0-20.652 9.265-20.652 20.652 0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5c0-3.117 2.536-5.652 5.652-5.652 3.117 0 5.652 2.535 5.652 5.652 0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5c.001-11.388-9.264-20.652-20.652-20.652zm58.785 97.996c-4.142 0-7.5 3.357-7.5 7.5v20.575c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-20.575c0-4.143-3.358-7.5-7.5-7.5zm-116.357-43.804-14.549 14.549c-2.929 2.93-2.929 7.678 0 10.608 1.464 1.464 3.384 2.196 5.303 2.196s3.839-.732 5.303-2.196l14.549-14.549c2.929-2.93 2.929-7.678 0-10.607s-7.678-2.929-10.606-.001zm116.357-255.304c4.142 0 7.5-3.357 7.5-7.5v-20.575c0-4.143-3.358-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v20.575c0 4.143 3.358 7.5 7.5 7.5zm-157.054 142.054h-20.575c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h20.575c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5zm314.108 15h20.575c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-20.575c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5zm-36.754-138.406-14.549 14.549c-2.929 2.93-2.929 7.678 0 10.607 1.464 1.464 3.384 2.196 5.303 2.196s3.839-.732 5.303-2.196l14.549-14.549c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0zm135.619 125.199c.011-.264.006-.528-.011-.789-.932-38.186-10.082-74.743-27.258-108.754-17.305-34.266-42.607-64.745-73.173-88.143-3.288-2.519-7.996-1.893-10.515 1.396-2.518 3.289-1.893 7.996 1.397 10.514 28.783 22.034 52.609 50.733 68.901 82.995 14.53 28.773 22.943 59.491 25.138 91.52-11.368-3.206-24.004-3.799-39.165-1.865-9.531-102.651-96.136-183.285-201.233-183.285s-191.702 80.635-201.233 183.285c-15.164-1.934-27.802-1.341-39.172 1.867 4.006-57.985 28.497-111.95 69.993-153.446 45.518-45.52 106.038-70.588 170.412-70.588 40.632 0 80.797 10.3 116.153 29.785 3.628 2 8.189.68 10.189-2.948 1.999-3.628.679-8.189-2.948-10.188-37.568-20.706-80.237-31.649-123.394-31.649-68.38 0-132.668 26.629-181.019 74.98-48.353 48.352-74.981 112.64-74.981 181.02 0 35.745 7.227 70.333 21.479 102.803 13.766 31.36 33.397 59.265 58.348 82.937 1.451 1.377 3.308 2.06 5.161 2.06 1.986 0 3.968-.784 5.442-2.338 2.851-3.005 2.726-7.752-.279-10.603-23.494-22.291-41.978-48.563-54.937-78.085-13.413-30.558-20.214-63.117-20.214-96.774 0-.334.011-.666.012-.999 10.791-4.038 23.159-4.932 38.918-2.812-.024 1.268-.048 2.537-.048 3.811 0 111.448 90.67 202.118 202.118 202.118s202.118-90.67 202.118-202.118c0-1.275-.025-2.544-.048-3.813 15.757-2.122 28.125-1.228 38.916 2.812.001.334.014.666.014 1.001 0 64.374-25.068 124.894-70.587 170.413s-106.04 70.587-170.413 70.587c-50.054 0-98.049-15.199-138.796-43.956-3.385-2.387-8.064-1.581-10.453 1.804-2.388 3.384-1.581 8.063 1.803 10.452 43.292 30.552 94.277 46.7 147.446 46.7 68.38 0 132.667-26.629 181.019-74.98 48.353-48.352 74.981-112.64 74.981-181.02 0-1.908-.041-3.808-.081-5.707zm-255.919 192.825c-103.177 0-187.118-83.94-187.118-187.118s83.941-187.118 187.118-187.118 187.118 83.94 187.118 187.118-83.941 187.118-187.118 187.118zm116.357-81.368c-2.929-2.928-7.678-2.928-10.606 0-2.929 2.93-2.929 7.678 0 10.607l14.549 14.549c1.464 1.464 3.384 2.196 5.303 2.196s3.839-.732 5.303-2.196c2.929-2.93 2.929-7.678 0-10.608zm-97.478-23.821c-3.123-2.721-7.861-2.397-10.582.727-2.096 2.404-5.12 3.783-8.298 3.783s-6.202-1.379-8.298-3.783c-2.722-3.122-7.46-3.447-10.581-.727-3.123 2.722-3.448 7.459-.726 10.582 4.945 5.674 12.091 8.928 19.606 8.928s14.661-3.254 19.605-8.928c2.722-3.123 2.397-7.861-.726-10.582zm39.667-140.475s0-.001-.001-.001c-9.928-9.927-25.667-10.782-36.612-1.989l-21.248 17.069-35.924-29.94c-10.839-9.034-26.536-8.32-36.513 1.655-9.978 9.977-10.689 25.674-1.655 36.513l42.493 50.984c6.389 7.666 15.688 11.925 25.396 11.924 1.914 0 3.846-.172 5.773-.511 1.611.245 3.245.371 4.891.371.587 0 1.177-.017 1.767-.049 9.254-.503 17.891-4.935 23.695-12.16l29.928-37.253c8.793-10.945 7.938-26.685-1.99-36.613zm-86.027 51.634c-.061 1.117-.061 2.231-.007 3.339l-34.396-41.27c-4.033-4.839-3.715-11.848.74-16.303 4.454-4.454 11.464-4.772 16.303-.738l33.597 28.001-4.076 3.274c-7.226 5.805-11.659 14.442-12.161 23.697zm76.323-24.415-29.928 37.253c-3.186 3.966-7.737 6.301-12.816 6.577-5.087.276-9.856-1.554-13.453-5.149-3.596-3.596-5.425-8.373-5.149-13.452s2.612-9.631 6.577-12.816l11.176-8.978c.017-.013.033-.027.05-.04l26.028-20.91c2.295-1.843 5.053-2.752 7.801-2.752 3.2 0 6.387 1.232 8.811 3.656 4.505 4.503 4.893 11.645.903 16.611zm9.943 82.885c-11.388 0-20.652 9.265-20.652 20.652 0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5c0-3.117 2.536-5.652 5.652-5.652s5.652 2.535 5.652 5.652c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5c0-11.388-9.265-20.652-20.652-20.652z" />
                </svg>
              </div>
              <div>
                <div className="text-gray-500">Total Hours</div>
                <div className="mt-3 text-3xl font-bold">
                  + {formatDuration(totalDuration || 0)}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2 mt-5 flex justify-between">
            <p className="font-bold">Analytics Chart</p>
          </div>
          <div className="w-full col-span-2 md:col-span-2 lg:col-span-3 rounded-2xl shadow-lg border border-gray-200">
            <Chart />
          </div>
        </div>
        {/* Right Side  */}
        <div className="hidden xl:block w-80 mr-5 mt-4">
          <RightSide />
        </div>
        <div className="fixed bottom-3 left-0 right-0 md:hidden mt-2 mx-auto w-max z-50">
          <HorizontalNavbar />
        </div>
      </div>

    </div>
  )
}

export default Analytics