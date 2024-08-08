import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { Dialog } from '@headlessui/react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { toast } from 'sonner'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import AddTaskModal from './AddTaskModal'
import EditTaskModal from './EditTaskModal'
import DeleteTaskModal from './DeleteTaskModal'
import TaskIcon from './task.png'

const TaskModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [addNoteOpen, setAddNoteOpen] = useState(false)
  const [editNoteOpen, setEditNoteOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [tasks, setTasks] = useState(null)

  const [upcomingTasks, setUpcomingTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  const [isViewingTaskDetail, setIsViewingTaskDetail] = useState(false)
  const [loadingTaskId, setLoadingTaskId] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [editTask, setEditTask] = useState(null)
  const { user } = useSelector((state) => state.authReducer.authData)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/tasks?userId=${user._id}`)

      setTasks(response.data)
      console.log(">>> Tasks: ", tasks)
      const upcomingTasks = []
      const completedTasks = []

      response.data.forEach((task) => {
        if (task?.completed) {
          completedTasks.push(task)
        } else {
          upcomingTasks.push(task)
        }
      })

      setUpcomingTasks(upcomingTasks)
      setCompletedTasks(completedTasks)
      console.log(">>> upcomingTasks: ", upcomingTasks)
      console.log(">>> completedTasks: ", completedTasks)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [tasks?.length])

  const openModal = (task) => {
    setIsModalOpen(true)
    setSelectedTask(task)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleCompleteTask = async (task) => {
    try {
      const respone = await axios.put(`http://localhost:8001/tasks/${task._id}/complete`)
      setLoadingTaskId(task._id)
      setTimeout(() => {
        setUpcomingTasks(upcomingTasks.filter(t => t._id !== task._id))
        setCompletedTasks([...completedTasks, task])
        toast.success('Updated Successfully!')
        // Dừng tải hiệu ứng
        setLoadingTaskId(null)
        fetchTasks()
      }, 500)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddTask = (newTask) => {
    setUpcomingTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask]
      setTasks(tasks => [...tasks, newTask]) // Cập nhật luôn tasks để đảm bảo tính nhất quán
      return updatedTasks
    })
    setAddNoteOpen(false)
  }

  useEffect(() => {
    fetchTasks()
  }, [upcomingTasks])

  const handleEditClick = (task) => {
    setEditTask(task)
    setEditNoteOpen(true)
  }

  const handleTaskClick = (task) => {
    setCurrentTask(task)
    setIsViewingTaskDetail(true)
  }
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const options = { month: '2-digit', day: '2-digit' }
    const formattedDate = date.toLocaleDateString('en-US', options)
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`
    return `${formattedDate.split('/').join('/')} ${formattedTime}`
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    const options = { month: '2-digit', day: '2-digit' }
    const formattedDate = date.toLocaleDateString('en-US', options)
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`

    return `${formattedDate.split('/').join('/')} ${formattedTime}`
  }

  const CustomTooltip = styled(Tooltip)(({ theme }) => ({
    tooltip: {
      backgroundColor: '#333',
      color: '#fff',
      fontSize: '0.75rem',
    },
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = { title, description, startDate: selectedStartDate, endDate: selectedEndDate }
    handleAddTask(newTask)
    setTitle('')
    setDescription('')
    setSelectedStartDate(null)
    setSelectedEndDate(null)
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks?.map((task) =>
        task._id === updatedTask?._id ? updatedTask : task
      )
    )
    toast.success('Task updated successfully!', { className: 'custom-toast' })
  }

  const handleTaskDeleted = (deletedTaskId) => {
    setTasks((prevTask) => prevTask.filter((task) => task._id !== deletedTaskId))
    toast.success(`Deleted task successfully!`, { className: 'custom-toast-delete' })
  }

  return (
    <div>
      <img
        src={TaskIcon} alt="Task Icon"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer size-8 "
      />

      <Transition
        show={isOpen}
        enter="transition ease-out duration-300"
        enterFrom="transform translate-x-full"
        enterTo="transform translate-x-0"
        leave="transition ease-in duration-300"
        leaveFrom="transform translate-x-0"
        leaveTo="transform translate-x-full"
      >
        {tasks?.length === 0 ?
          <div className='text-sm text-white fixed inset-y-0 right-0 w-full sm:w-1/3 bg-black/80 text-white shadow-lg p-4 overflow-y-auto'>
            <div className='mb-20'>
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                className="absolute top-12 right-4 bg-[#ff5e62]/30 hover:bg-[#ff5e62]/10 text-[#ff5e62] py-2 px-4 rounded-xl shadow-md mb-4 transition duration-300"
                onClick={() => setAddNoteOpen(true)}
              >
                + Note
              </button>
              <p className='text-lg font-bold absolute top-4 left-4'>Note list</p>
            </div>
            <div className='flex h-[200px] flex-col items-center justify-center gap-2 p-4'>
              <span className='cursor-pointer'>
                <div className='flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-white py-3 !bg-transparent'>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="48" height="48" x="0" y="0" viewBox="0 0 64 64" fill-rule="evenodd"><g><path fill="#cadcf0" d="M27 9.677a1 1 0 0 1 1-1h22.554L62 21.37v15.953s.036 13.177-3.707 19.468a.995.995 0 0 1-.842.464c-3.827.003-26.548.003-32.899.003a1.002 1.002 0 0 1-.882-1.47C26.773 49.051 27 37.323 27 37.323z" opacity="1" data-original="#cadcf0"></path><path fill="#a4bbdb" d="M62 37.323s.036 13.177-3.707 19.468a.995.995 0 0 1-.842.464c-3.827.003-26.548.003-32.899.003a1.002 1.002 0 0 1-.882-1.47l.039-.086c12.314.579 30.196-1.578 32.551-2.5 2.516-.985 5.69-10.437 5.739-15.755z" opacity="1" data-original="#a4bbdb"></path><path fill="#347bfa" d="M62 21.37c-3.036-1.199-6.25-1.233-9.549-.724a.997.997 0 0 1-1.146-1.09c.362-3.694-.003-7.308-.751-10.879C55.392 12.269 59.212 16.496 62 21.37z" opacity="1" data-original="#347bfa"></path><path fill="#a4bbdb" d="M27 12.068a12.495 12.495 0 0 1 7.314 3.577c4.103 4.103 4.769 10.349 1.999 15.148l1.647 5.223a.72.72 0 0 1-.177.727 9.24 9.24 0 0 0-.14.14.678.678 0 0 1-.682.166l-5.249-1.655a12.505 12.505 0 0 1-4.728 1.58c.012-.331.016-.513.016-.513z" opacity="1" data-original="#a4bbdb"></path><path fill="#e9f3fc" d="M30.447 34.168c-4.588 2.649-10.56 2.012-14.483-1.911-4.683-4.683-4.683-12.287 0-16.97 4.683-4.684 12.287-4.684 16.971 0 3.922 3.922 4.559 9.894 1.911 14.482l1.574 4.994a.687.687 0 0 1-.169.694l-.134.134a.648.648 0 0 1-.652.16z" opacity="1" data-original="#e9f3fc"></path><g fill="#347bfa"><path d="M22.333 20.182c-.022-.954.335-1.649.888-2.057.868-.64 2.164-.613 2.868.18.303.341.478.823.483 1.433.012 1.462-.675 2.317-1.346 3.203-.904 1.193-1.807 2.419-1.919 4.466a1 1 0 0 0 1.997.109c.085-1.555.829-2.461 1.516-3.367.92-1.213 1.768-2.423 1.752-4.427-.01-1.178-.403-2.087-.987-2.745-1.365-1.537-3.87-1.702-5.551-.462-1.008.744-1.741 1.976-1.7 3.714a1 1 0 0 0 1.999-.047z" fill="#347bfa" opacity="1" data-original="#347bfa"></path><circle cx="24.212" cy="30.944" r="1.23" fill="#347bfa" opacity="1" data-original="#347bfa"></circle><path d="m12.217 7.364 4 5.032a1 1 0 0 0 1.566-1.244l-4-5.032a1 1 0 0 0-1.566 1.244zM1.502 9.867l10.452 6a1 1 0 1 0 .995-1.734l-10.451-6a1 1 0 1 0-.996 1.734zM3 21h7a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2z" fill="#347bfa" opacity="1" data-original="#347bfa"></path></g></g></svg>
                  <p className='text-sm text-default-400'>Oops! You haven't created any notes yet!</p>
                </div>
              </span>
            </div>
          </div>
          :
          (<div className="fixed inset-y-0 right-0 w-full sm:w-1/3 bg-black/80 text-white shadow-lg p-4 overflow-y-auto">
            <div className='mb-20'>
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                className="absolute top-12 right-4 bg-[#ff5e62]/30 hover:bg-[#ff5e62]/10 text-[#ff5e62] py-2 px-4 rounded-xl shadow-md mb-4 transition duration-300"
                onClick={() => setAddNoteOpen(true)}
              >
                + Note
              </button>
              <p className='text-lg font-bold absolute top-4 left-4'>Note list</p>
            </div>

            {/* Breadcrumb */}
            <div className="mb-4">
              {isViewingTaskDetail && currentTask && (
                <>
                  <span className="text-gray-300 cursor-pointer" onClick={() => setIsViewingTaskDetail(false)}>
                    {currentTask.completed ? 'Completed' : 'Upcoming'}
                  </span>
                  <span className="text-gray-300 mx-2"> &gt; </span>
                  <span className="text-gray-300">
                    {currentTask.title}
                  </span>
                </>
              )}
            </div>

            {!isViewingTaskDetail ? (
              <>
                <h2 className="flex items-center justify-between font-semibold mb-4 ml-3 ">Upcoming</h2>
                {upcomingTasks?.length === 0 ? (
                  <div className="text-center text-white mb-5">Good job. You are done!</div>
                )
                  :
                  upcomingTasks?.map((task) => (
                    <div
                      key={task.id}
                      className="mb-4 p-4 rounded-lg flex justify-between items-center bg-gray-800 hover:bg-gray-700 transition duration-300 shadow-md py-2 pl-2 last:border-b-0"
                    >
                      <div className="col-span-7 flex items-center gap-2">
                        <div
                          onClick={() => handleCompleteTask(task)}
                          className={`size-4 cursor-pointer rounded-full border border-gray-600 hover:border-green-500 flex items-center justify-center transition duration-300 ${loadingTaskId === task._id ? 'animate-spin' : ''
                            }`}
                        >
                          {loadingTaskId === task._id && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              className="w-4 h-4 text-white"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3.39-3.39A8.037 8.037 0 0116 4a8.046 8.046 0 01-4.37 7.61L12 8a8 8 0 018 8c0 2.042-.756 3.906-2 5.385V20a7.967 7.967 0 002-4.585 8.046 8.046 0 01-7.61 4.37L12 16a8 8 0 01-8-8z"
                              ></path>
                            </svg>
                          )}
                        </div>
                        <div
                          className="line-clamp-2 w-fit cursor-pointer text-white hover:text-green-400"
                          onClick={() => handleTaskClick(task)}
                        >
                          {task.title}
                        </div>
                      </div>
                      <div className="col-span-5 flex items-center justify-between relative">
                        <div className="ml-auto mr-1 text-xs text-gray-400">
                          <CustomTooltip title={task.endDate} arrow>
                            <div className="flex items-center whitespace-nowrap">
                              <p>
                                Due: <span className="font-medium">{formatTime(task.endDate)}</span>
                              </p>
                              <p>🔥</p>
                            </div>
                          </CustomTooltip>
                        </div>
                        <div className="relative">
                          <Menu as="div" className="relative">
                            <MenuButton className="flex items-center p-2 text-gray-400 hover:text-white transition duration-300">
                              <div className="w-5 h-5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                  />
                                </svg>
                              </div>
                            </MenuButton>
                            <MenuItems className="z-10 absolute right-0 mt-2 bg-black border rounded-lg shadow-lg flex w-[160px] flex-col justify-between gap-1 py-2">
                              <div className="">
                                <MenuItem>
                                  {({ isActive }) => (
                                    <div
                                      className='flex h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-white hover:bg-white/10'
                                      onClick={() => handleEditClick(task)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="17" height="17" x="0" y="0" viewBox="0 0 64 64"><g><path d="M11.105 43.597a2 2 0 0 1-1.414-3.414L40.945 8.929a2 2 0 1 1 2.828 2.828L12.519 43.011c-.39.39-.902.586-1.414.586z" fill="currentColor" opacity="1" data-original="currentColor"></path><path d="M8.017 58a2 2 0 0 1-1.957-2.42l3.09-14.403a2 2 0 1 1 3.911.839l-3.09 14.403A2 2 0 0 1 8.017 58zM22.418 54.91a2 2 0 0 1-1.414-3.414l31.254-31.253a2 2 0 1 1 2.828 2.828L23.833 54.324a1.994 1.994 0 0 1-1.415.586z" fill="currentColor" opacity="1" data-original="currentColor"></path><path d="M8.013 58a2.001 2.001 0 0 1-.418-3.956l14.403-3.09a2 2 0 0 1 .839 3.911l-14.403 3.09a1.958 1.958 0 0 1-.421.045zM48.015 29.313a1.99 1.99 0 0 1-1.414-.586L35.288 17.414a2 2 0 1 1 2.828-2.828l11.313 11.313a2 2 0 0 1-1.414 3.414zM53.672 23.657a2 2 0 0 1-1.415-3.415c1.113-1.113 1.726-2.62 1.726-4.242s-.613-3.129-1.726-4.242c-1.114-1.114-2.621-1.727-4.243-1.727s-3.129.613-4.242 1.727a2 2 0 1 1-2.829-2.829c1.868-1.869 4.379-2.898 7.071-2.898 2.691 0 5.203 1.029 7.071 2.898 1.869 1.868 2.898 4.379 2.898 7.071s-1.029 5.203-2.898 7.071a1.99 1.99 0 0 1-1.413.586z" fill="currentColor" opacity="1" data-original="currentColor"></path></g></svg>
                                      <p class="text-sm">Edit</p>
                                    </div>
                                  )}
                                </MenuItem>
                                <MenuItem>
                                  {({ isActive }) => (
                                    <div
                                      className='flex h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm text-danger-400 hover:bg-white/10'
                                      onClick={() => openModal(task)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="17" height="17" x="0" y="0" viewBox="0 0 24 24" color="#FE9788"><g><g fill-rule="evenodd" clip-rule="evenodd"><path fill="currentColor" d="M9.425 10.254a.75.75 0 0 1 .821.671l.5 5a.75.75 0 1 1-1.492.15l-.5-5a.75.75 0 0 1 .671-.821zM14.575 10.254a.75.75 0 0 1 .671.82l-.5 5a.75.75 0 1 1-1.492-.149l.5-5a.75.75 0 0 1 .82-.671z" opacity="1"></path><g fill="currentColor"><path d="M10.124 1.25h3.381c.217 0 .405 0 .583.028a2.25 2.25 0 0 1 1.641 1.183c.083.16.143.339.211.544l.112.335.029.085a1.25 1.25 0 0 0 1.233.825h3a.75.75 0 1 1 0 1.5h-17a.75.75 0 0 1 0-1.5h3.09a1.25 1.25 0 0 0 1.173-.91l.112-.335c.068-.205.128-.384.211-.544a2.25 2.25 0 0 1 1.64-1.183c.179-.028.367-.028.584-.028zm-1.301 3a2.757 2.757 0 0 0 .175-.428l.1-.3c.09-.273.112-.328.132-.368a.75.75 0 0 1 .547-.395c.045-.007.104-.009.393-.009h3.29c.288 0 .347.002.392.01a.75.75 0 0 1 .547.394c.02.04.041.095.133.369l.1.3.038.113c.04.108.085.213.137.314zM5.117 7.752a.75.75 0 0 1 .798.698l.46 6.9c.09 1.347.154 2.285.294 2.99.137.685.327 1.047.6 1.303.274.256.648.422 1.34.512.713.093 1.654.095 3.004.095h.774c1.35 0 2.29-.002 3.004-.095.692-.09 1.066-.256 1.34-.512.273-.256.463-.618.6-1.303.14-.705.204-1.643.294-2.99l.46-6.9a.75.75 0 1 1 1.497.1l-.464 6.952c-.085 1.282-.154 2.318-.316 3.132-.169.845-.455 1.551-1.047 2.104-.591.554-1.315.793-2.17.904-.822.108-1.86.108-3.146.108h-.878c-1.286 0-2.324 0-3.146-.107-.855-.112-1.579-.351-2.17-.905-.592-.553-.878-1.26-1.047-2.104-.162-.814-.23-1.85-.316-3.132L4.418 8.55a.75.75 0 0 1 .699-.798z" fill="currentColor" opacity="1"></path></g></g></g></svg>
                                      Delete
                                    </div>
                                  )}
                                </MenuItem>
                              </div>
                            </MenuItems>
                          </Menu>
                          {isModalOpen && (
                            <DeleteTaskModal
                              isOpen={isModalOpen}
                              onClose={closeModal}
                              taskId={selectedTask?._id}
                              onTaskDeleted={handleTaskDeleted}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                }


                <div className="flex items-center justify-between font-semibold ml-3">Completed </div>
                {completedTasks?.map((task) => (
                  task?.completed === true ?
                    (<div
                      key={task.id}
                      className="mb-4 p-4 rounded flex justify-between items-center bg-gray-700 hover:bg-gray-600 transition duration-300 shadow-md"
                    >
                      <div className="col-span-7 flex items-center gap-2">
                        <div className="size-4 cursor-pointer rounded-full flex items-center justify-center bg-pink-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="8"
                            height="8"
                            color="#FFF"
                            x="0"
                            y="0"
                            viewBox="0 0 512 512"
                          >
                            <g>
                              <path
                                fill="currentColor"
                                d="M393.5 82.9 194.7 281.7l-76.1-76.1c-27.1-27.1-71.1-27.1-98.2 0-27.1 27.1-27.1 71.1 0 98.2l120.9 120.9c1.3 1.5 2.7 3.1 4.1 4.5 27.3 27.1 71.3 27.1 98.6 0 1.4-1.5 2.8-3 4.1-4.5l243.6-243.6c27.1-27.1 27.1-71.1 0-98.2-27.1-27.1-71.1-27.2-98.2 0z"
                                opacity="1"
                                data-original="currentColor"
                              ></path>
                            </g>
                          </svg>
                        </div>
                        <div
                          className="line-clamp-2 w-fit cursor-pointer text-white hover:text-green-400"
                          onClick={() => handleTaskClick(task)}
                        >
                          {/* {task?.completed == false ? task.title : ''} */}
                          {task?.title}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Menu as="div" className="relative">
                          <MenuButton className="flex items-center">
                            <div className="w-5 h-5 text-gray-400 hover:text-white transition duration-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                />
                              </svg>
                            </div>
                          </MenuButton>
                          <MenuItems className="z-10 absolute right-0 mt-2 bg-black border rounded-lg shadow-lg flex w-[160px] flex-col justify-between gap-1 py-2">
                            <MenuItem>
                              {({ isActive }) => (
                                <div>
                                  <div
                                    className='flex h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm text-danger-400 hover:bg-white/10'
                                    onClick={() => openModal(task)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="17" height="17" x="0" y="0" viewBox="0 0 24 24" color="#FE9788"><g><g fill-rule="evenodd" clip-rule="evenodd"><path fill="currentColor" d="M9.425 10.254a.75.75 0 0 1 .821.671l.5 5a.75.75 0 1 1-1.492.15l-.5-5a.75.75 0 0 1 .671-.821zM14.575 10.254a.75.75 0 0 1 .671.82l-.5 5a.75.75 0 1 1-1.492-.149l.5-5a.75.75 0 0 1 .82-.671z" opacity="1"></path><g fill="currentColor"><path d="M10.124 1.25h3.381c.217 0 .405 0 .583.028a2.25 2.25 0 0 1 1.641 1.183c.083.16.143.339.211.544l.112.335.029.085a1.25 1.25 0 0 0 1.233.825h3a.75.75 0 1 1 0 1.5h-17a.75.75 0 0 1 0-1.5h3.09a1.25 1.25 0 0 0 1.173-.91l.112-.335c.068-.205.128-.384.211-.544a2.25 2.25 0 0 1 1.64-1.183c.179-.028.367-.028.584-.028zm-1.301 3a2.757 2.757 0 0 0 .175-.428l.1-.3c.09-.273.112-.328.132-.368a.75.75 0 0 1 .547-.395c.045-.007.104-.009.393-.009h3.29c.288 0 .347.002.392.01a.75.75 0 0 1 .547.394c.02.04.041.095.133.369l.1.3.038.113c.04.108.085.213.137.314zM5.117 7.752a.75.75 0 0 1 .798.698l.46 6.9c.09 1.347.154 2.285.294 2.99.137.685.327 1.047.6 1.303.274.256.648.422 1.34.512.713.093 1.654.095 3.004.095h.774c1.35 0 2.29-.002 3.004-.095.692-.09 1.066-.256 1.34-.512.273-.256.463-.618.6-1.303.14-.705.204-1.643.294-2.99l.46-6.9a.75.75 0 1 1 1.497.1l-.464 6.952c-.085 1.282-.154 2.318-.316 3.132-.169.845-.455 1.551-1.047 2.104-.591.554-1.315.793-2.17.904-.822.108-1.86.108-3.146.108h-.878c-1.286 0-2.324 0-3.146-.107-.855-.112-1.579-.351-2.17-.905-.592-.553-.878-1.26-1.047-2.104-.162-.814-.23-1.85-.316-3.132L4.418 8.55a.75.75 0 0 1 .699-.798z" fill="currentColor" opacity="1"></path></g></g></g></svg>
                                    Delete
                                  </div>

                                </div>
                              )}
                            </MenuItem>
                          </MenuItems>
                        </Menu>
                        {isModalOpen && (
                          <DeleteTaskModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            taskId={selectedTask._id}
                            onTaskDeleted={handleTaskDeleted}
                          />
                        )}
                      </div>
                    </div>) : null
                ))}
              </>
            ) : (
              currentTask && (
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentTask.title}</h2>

                  <div className="mt-2 flex gap-2">
                    <div className="flex w-28 items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="#FFF" viewBox="0 0 64 64"> <path d="M56.562 17.372C56.246 12.117 51.858 8 46.573 8H44V6a2 2 0 0 0-4 0v2H24V6a2 2 0 0 0-4 0v2h-2.573c-5.286 0-9.674 4.117-9.989 9.372-.593 9.884-.582 19.91.033 29.799.312 5.022 4.335 9.045 9.357 9.357 5.033.313 10.102.469 15.171.469 5.068 0 10.138-.156 15.171-.469 5.022-.312 9.045-4.335 9.357-9.357.616-9.884.627-19.909.035-29.799zm-4.026 29.551a6.006 6.006 0 0 1-5.613 5.613c-9.902.615-19.944.615-29.846 0a6.006 6.006 0 0 1-5.613-5.613A241.309 241.309 0 0 1 11.147 24h41.707c.252 7.64.155 15.323-.318 22.923zM22 16a2 2 0 0 0 2-2v-2h16v2a2 2 0 0 0 4 0v-2h2.573c3.173 0 5.807 2.465 5.996 5.611.047.794.067 1.593.106 2.389h-41.35c.04-.796.059-1.595.106-2.389C11.62 14.465 14.253 12 17.427 12H20v2a2 2 0 0 0 2 2z" fill="currentColor" /> <circle cx="22" cy="33" r="3" fill="currentColor" /> <circle cx="32" cy="33" r="3" fill="currentColor" /> <circle cx="22" cy="43" r="3" fill="currentColor" /> <circle cx="42" cy="33" r="3" fill="currentColor" /> <circle cx="42" cy="43" r="3" fill="currentColor" /> <circle cx="32" cy="43" r="3" fill="currentColor" /> </svg>
                      <p>Start date</p>
                    </div>
                    <p>{formatDateTime(currentTask.startDate)}</p>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <div className="flex w-28 items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="#FFF" viewBox="0 0 64 64"> <path d="M56.562 17.372C56.246 12.117 51.858 8 46.573 8H44V6a2 2 0 0 0-4 0v2H24V6a2 2 0 0 0-4 0v2h-2.573c-5.286 0-9.674 4.117-9.989 9.372-.593 9.884-.582 19.91.033 29.799.312 5.022 4.335 9.045 9.357 9.357 5.033.313 10.102.469 15.171.469 5.068 0 10.138-.156 15.171-.469 5.022-.312 9.045-4.335 9.357-9.357.616-9.884.627-19.909.035-29.799zm-4.026 29.551a6.006 6.006 0 0 1-5.613 5.613c-9.902.615-19.944.615-29.846 0a6.006 6.006 0 0 1-5.613-5.613A241.309 241.309 0 0 1 11.147 24h41.707c.252 7.64.155 15.323-.318 22.923zM22 16a2 2 0 0 0 2-2v-2h16v2a2 2 0 0 0 4 0v-2h2.573c3.173 0 5.807 2.465 5.996 5.611.047.794.067 1.593.106 2.389h-41.35c.04-.796.059-1.595.106-2.389C11.62 14.465 14.253 12 17.427 12H20v2a2 2 0 0 0 2 2z" fill="currentColor" /> <circle cx="22" cy="33" r="3" fill="currentColor" /> <circle cx="32" cy="33" r="3" fill="currentColor" /> <circle cx="22" cy="43" r="3" fill="currentColor" /> <circle cx="42" cy="33" r="3" fill="currentColor" /> <circle cx="42" cy="43" r="3" fill="currentColor" /> <circle cx="32" cy="43" r="3" fill="currentColor" /> </svg>
                      <p>End date</p>
                    </div>
                    <p>{formatDateTime(currentTask.endDate)}🔥</p>
                  </div>
                  <div className="tiptap mt-4 rounded-xl border border-dashed border-white/20 bg-white/10 px-4 py-2">
                    {currentTask.description}
                  </div>
                  <button
                    className="z-0 group relative inline-flex items-center justify-center px-4 min-w-20 h-10 text-small gap-2 rounded-xl bg-gray-400 text-white hover:opacity-hover mt-4" type="button"
                    onClick={() => setIsViewingTaskDetail(false)}
                  >
                    Back
                  </button>
                </div>
              )
            )}
          </div>)
        }

      </Transition>

      {/* Add Task Modal */}
      <AddTaskModal
        addNoteOpen={addNoteOpen}
        setAddNoteOpen={setAddNoteOpen}
        handleSubmit={handleSubmit}
        handleAddTask={handleAddTask}
        title={title}
        setTitle={setTitle}
        selectedStartDate={selectedStartDate}
        setSelectedStartDate={setSelectedStartDate}
        selectedEndDate={selectedEndDate}
        setSelectedEndDate={setSelectedEndDate}
        description={description}
        setDescription={setDescription}
        userId={user._id}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        editNoteOpen={editNoteOpen}
        setEditNoteOpen={setEditNoteOpen}
        data={editTask}
        onTaskUpdated={handleTaskUpdated}
      />

    </div>
  )
}

export default TaskModal