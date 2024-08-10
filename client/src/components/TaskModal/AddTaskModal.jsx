import React from 'react'
import { Dialog } from '@headlessui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
const AddTaskModal = ({
  addNoteOpen,
  setAddNoteOpen,
  title,
  setTitle,
  selectedStartDate,
  setSelectedStartDate,
  selectedEndDate,
  setSelectedEndDate,
  description,
  setDescription,
  userId,
  handleAddTask,
}) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const newTask = {
        title,
        startDate: new Date(selectedStartDate).toISOString(), // Chuyển sang ISO string
        endDate: new Date(selectedEndDate).toISOString(),
        description,
        userId,
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/tasks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        }
      )

      const data = await response.json()
      handleAddTask(data)
      console.log('Data: ', data)
      if (response.ok) {
        setTitle('')
        setSelectedStartDate('')
        setSelectedEndDate('')
        setDescription('')
        setAddNoteOpen(false)
      } else {
        console.error('Failed to add task:', data.message)
      }
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const handleDateChange = (date, type) => {
    if (type === 'startDate') {
      setSelectedStartDate(date)
    } else if (type === 'endDate') {
      if (selectedStartDate && date <= selectedStartDate) {
        alert(
          'End date must be later than the start date. Please select a different end date.'
        )
      } else {
        setSelectedEndDate(date)
      }
    }
  }

  return (
    <Dialog
      open={addNoteOpen}
      onClose={() => setAddNoteOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen ">
        <section
          tabIndex={-1}
          className="relative p-2 z-50 w-full box-border bg-white outline-none sm:mx-6 sm:my-16 max-w-2xl rounded-2xl shadow-small overflow-visible m-0 flex max-h-dvh flex-col md:max-h-[96dvh]"
        >
          <div className="border: 0px clip: rect(0px, 0px, 0px, 0px) clip-path: inset(50%) height: 1px margin: -1px overflow: hidden padding: 0px position: absolute width: 1px white-space: nowrap"></div>
          <button
            className="absolute appearance-none select-none top-1 right-1 rtl:left-1 rtl:right-[unset] p-2 text-foreground-500 rounded-full hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 m-2 z-10"
            onClick={() => setAddNoteOpen(false)}
          >
            <svg
              aria-hidden="true"
              fill="none"
              focusable="false"
              height="1em"
              role="presentation"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="1em"
            >
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
          <header className="flex-initial text-large font-semibold flex flex-col p-0">
            <div className="mx-3 flex items-center gap-4 py-3 lg:px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="40"
                height="40"
                x="0"
                y="0"
                viewBox="0 0 512 512"
              >
                <g>
                  <path
                    fill="#cb72ff"
                    d="M511.5 256c-1.54 85.47-16.55 154.21-59.58 195.92-41.71 43.02-110.45 58.04-195.92 59.58-85.47-1.54-154.21-16.55-195.92-59.58C17.05 410.21 2.04 341.46.5 256c1.54-85.47 16.55-154.21 59.58-195.92C101.79 17.05 170.53 2.04 256 .5c85.47 1.54 154.2 16.55 195.92 59.58 43.02 41.71 58.04 110.45 59.58 195.92z"
                    opacity="1"
                    data-original="#47b5ff"
                  ></path>
                  <path
                    fill="#bb47ff"
                    d="M451.92 60.09C410.21 17.05 341.46 2.04 256 .5v511c85.46-1.55 154.21-16.56 195.92-59.58 43.03-41.71 58.04-110.45 59.58-195.92-1.54-85.47-16.56-154.21-59.58-195.91z"
                    opacity="1"
                    data-original="#2192ff"
                  ></path>
                  <path
                    fill="#ffffff"
                    d="M138.18 178.51v206.63c0 17.38 14.09 31.47 31.47 31.47h172.71c17.38 0 31.47-14.09 31.47-31.47V126.86c0-17.38-14.09-31.47-31.47-31.47H221.29c-12.23 0-23.96 4.86-32.61 13.51l-37 37a46.11 46.11 0 0 0-13.5 32.61z"
                    opacity="1"
                    data-original="#ffffff"
                  ></path>
                  <g fill="#e1f6ff">
                    <path
                      d="M342.35 95.4H256v321.21h86.35c17.38 0 31.47-14.09 31.47-31.47V126.87c0-17.38-14.09-31.47-31.47-31.47zM151.68 145.9l37-37a46.119 46.119 0 0 1 32.61-13.51h.95c-11.07 0-20.05 8.98-20.05 20.05v24.4c0 11.07-8.98 20.05-20.05 20.05h-23.91c-11.07 0-20.05 8.98-20.05 20.05v-1.44c0-12.22 4.85-23.95 13.5-32.6z"
                      fill="#e1f6ff"
                      opacity="1"
                      data-original="#e1f6ff"
                    ></path>
                  </g>
                  <g fill="#47b5ff">
                    <path
                      d="M258.8 222.61h-60.76c-5.52 0-10-4.48-10-10s4.48-10 10-10h60.76c5.52 0 10 4.48 10 10s-4.48 10-10 10zM313.96 290.78H198.04c-5.52 0-10-4.48-10-10s4.48-10 10-10h115.91c5.52 0 10 4.48 10 10s-4.47 10-9.99 10zM313.96 358.95H198.04c-5.52 0-10-4.48-10-10s4.48-10 10-10h115.91c5.52 0 10 4.48 10 10s-4.47 10-9.99 10z"
                      fill="#cb72ff"
                      opacity="1"
                      data-original="#47b5ff"
                    ></path>
                  </g>
                  <g fill="#2192ff">
                    <path
                      d="M268.8 212.61c0-5.52-4.48-10-10-10H256v20h2.8c5.52 0 10-4.47 10-10zM323.95 280.78c0-5.52-4.47-10-10-10H256v20h57.95c5.53 0 10-4.47 10-10zM313.95 338.95H256v20h57.95c5.53 0 10-4.47 10-10 0-5.52-4.47-10-10-10z"
                      fill="#bb47ff"
                      opacity="1"
                      data-original="#2192ff"
                    ></path>
                  </g>
                </g>
              </svg>
              <div>
                <p className="text-lg font-bold">Create a new task</p>
              </div>
            </div>
          </header>
          <div className="flex flex-col gap-3 md:px-4 flex-1 overflow-auto p-0">
            <form onSubmit={handleFormSubmit} className="form-add-note">
              <div className="flex flex-col gap-4 px-2 lg:px-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      name=""
                      id=""
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      autoComplete="off"
                      placeholder="Enter title"
                      className="w-full rounded-xl bg-white px-2 py-1 text-2xl font-bold text-black focus-visible:outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-4 lg:gap-20">
                  <div className="flex w-[100px] items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      width="20"
                      height="20"
                      color="#6B7280"
                      x="0"
                      y="0"
                      viewBox="0 0 64 64"
                    >
                      <g>
                        <path
                          d="M56.562 17.372C56.246 12.117 51.858 8 46.573 8H44V6a2 2 0 0 0-4 0v2H24V6a2 2 0 0 0-4 0v2h-2.573c-5.286 0-9.674 4.117-9.989 9.372-.593 9.884-.582 19.91.033 29.799.312 5.022 4.335 9.045 9.357 9.357 5.033.313 10.102.469 15.171.469 5.068 0 10.138-.156 15.171-.469 5.022-.312 9.045-4.335 9.357-9.357.616-9.884.627-19.909.035-29.799zm-4.026 29.551a6.006 6.006 0 0 1-5.613 5.613c-9.902.615-19.944.615-29.846 0a6.006 6.006 0 0 1-5.613-5.613A241.309 241.309 0 0 1 11.147 24h41.707c.252 7.64.155 15.323-.318 22.923zM22 16a2 2 0 0 0 2-2v-2h16v2a2 2 0 0 0 4 0v-2h2.573c3.173 0 5.807 2.465 5.996 5.611.047.794.067 1.593.106 2.389h-41.35c.04-.796.059-1.595.106-2.389C11.62 14.465 14.253 12 17.427 12H20v2a2 2 0 0 0 2 2z"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></path>
                        <circle
                          cx="22"
                          cy="33"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                        <circle
                          cx="32"
                          cy="33"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                        <circle
                          cx="22"
                          cy="43"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                        <circle
                          cx="42"
                          cy="33"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                        <circle
                          cx="42"
                          cy="43"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                        <circle
                          cx="32"
                          cy="43"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                      </g>
                    </svg>
                    Start date
                  </div>
                  <div className="flex-1 bg-orange-100 p-2 rounded-lg">
                    <DatePicker
                      selected={selectedStartDate}
                      // onChange={(date) => setSelectedStartDate(date)}
                      onChange={(date) => handleDateChange(date, 'startDate')}
                      showTimeSelect
                      dateFormat="Pp"
                      autoComplete="off"
                      className="flex h-full gap-x-0.5 w-full font-normal text-small cursor-pointer bg-orange-100"
                      placeholderText="Select start date"
                      minDate={new Date()}
                    />
                  </div>
                </div>
                <div className="flex gap-4 lg:gap-20">
                  <div className="flex w-[100px] items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      width="20"
                      height="20"
                      color="#6B7280"
                      x="0"
                      y="0"
                      viewBox="0 0 64 64"
                    >
                      <g>
                        <path
                          d="M56.562 17.372C56.246 12.117 51.858 8 46.573 8H44V6a2 2 0 0 0-4 0v2H24V6a2 2 0 0 0-4 0v2h-2.573c-5.286 0-9.674 4.117-9.989 9.372-.593 9.884-.582 19.91.033 29.799.312 5.022 4.335 9.045 9.357 9.357 5.033.313 10.102.469 15.171.469 5.068 0 10.138-.156 15.171-.469 5.022-.312 9.045-4.335 9.357-9.357.616-9.884.627-19.909.035-29.799zm-4.026 29.551a6.006 6.006 0 0 1-5.613 5.613c-9.902.615-19.944.615-29.846 0a6.006 6.006 0 0 1-5.613-5.613A241.309 241.309 0 0 1 11.147 24h41.707c.252 7.64.155 15.323-.318 22.923zM22 16a2 2 0 0 0 2-2v-2h16v2a2 2 0 0 0 4 0v-2h2.573c3.173 0 5.807 2.465 5.996 5.611.047.794.067 1.593.106 2.389h-41.35c.04-.796.059-1.595.106-2.389C11.62 14.465 14.253 12 17.427 12H20v2a2 2 0 0 0 2 2z"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></path>
                        <circle
                          cx="22"
                          cy="33"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                        <circle
                          cx="32"
                          cy="33"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                        <circle
                          cx="22"
                          cy="43"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                        <circle
                          cx="42"
                          cy="33"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                        <circle
                          cx="42"
                          cy="43"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                        <circle
                          cx="32"
                          cy="43"
                          r="3"
                          fill="currentColor"
                          opacity="1"
                          data-original="currentColor"
                        ></circle>
                      </g>
                    </svg>
                    End date
                  </div>
                  <div className="flex-1">
                    <div className="flex-1 bg-orange-100 p-2 rounded-lg">
                      <DatePicker
                        selected={selectedEndDate}
                        // onChange={(date) => setSelectedEndDate(date)}
                        onChange={(date) => handleDateChange(date, 'endDate')}
                        showTimeSelect
                        dateFormat="Pp"
                        autoComplete="off"
                        className="flex h-full gap-x-0.5 w-full font-normal text-small cursor-pointer bg-orange-100"
                        placeholderText="Select end date"
                        minDate={new Date()}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    placeholder="Enter description"
                    className="my-2 cursor-text rounded-lg border bg-white p-2 w-full"
                    rows="4"
                    autoComplete="off"
                  ></textarea>
                </div>
              </div>
              <footer className="flex flex-row gap-2 justify-end px-2 py-2 lg:px-4 lg:py-4">
                <button className='class="z-0 group relative inline-flex items-center justify-center box-border border-gray-700 appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-default-foreground data-[hover=true]:bg-default/40"'>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="z-0 text-white rounded-2xl group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-default-foreground bg-gradient-to-r from-[#ff9966] to-[#ff5e62]"
                >
                  Submit
                </button>
              </footer>
            </form>
          </div>
        </section>
      </div>
    </Dialog>
  )
}

export default AddTaskModal
