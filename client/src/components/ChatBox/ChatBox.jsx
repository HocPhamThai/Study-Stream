import React, { useEffect, useRef, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import { format } from 'timeago.js'
import { createMessage, getMessages } from '../../api/MessageRequest'
import { getUser } from '../../api/UserRequest'
import './ChatBox.scss'
import { useTranslation } from 'react-i18next'

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const scroll = useRef()
  const { t } = useTranslation(['chat'])

  // receive message from socket server
  useEffect(() => {
    if (
      chat &&
      receiveMessage !== null &&
      receiveMessage?.chatId === chat._id
    ) {
      setMessages((prevMessages) => [...prevMessages, receiveMessage])
    }
  }, [chat, receiveMessage])

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser)
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) {
      getUserData()
    }
  }, [chat, currentUser])

  // fetching messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat?._id)
        setMessages(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) {
      fetchMessages()
    }
  }, [chat])

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    let message = {
      chatId: chat._id,
      senderId: currentUser,
      text: newMessage,
    }
    // send message to server
    try {
      const { data } = await createMessage(message)
      setMessages([...messages, data])
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }
    // send message to socket server
    const receiveId = chat?.members?.find((member) => member !== currentUser)
    setSendMessage({ ...message, receiveId })
  }

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  })

  return (
    <div className="bg-white rounded-lg grid grid-rows-[14vh_60vh_13vh] min-h-[60vh] xs:min-h-[60vh] p-4">
      {chat ? (
        <>
          <div className="flex flex-col p-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img
                  src={
                    userData?.profilePicture
                      ? serverPublic + userData.profilePicture
                      : serverPublic + 'defaultProfile.jpg'
                  }
                  className="w-12 h-12 rounded-full object-cover"
                  alt="failed to load"
                />
                <div className="text-sm">
                  <span className="font-semibold">
                    {userData?.firstname} {userData?.lastname}
                  </span>
                </div>
              </div>
            </div>
            <hr className="border-gray-200 mt-2" />
          </div>
          {/* chatbox message */}
          <div className="flex flex-col gap-2 p-6 overflow-auto">
            {messages?.map((message) => (
              <div
                ref={scroll}
                className={`${
                  message?.senderId === currentUser
                    ? 'bg-custom-gradient text-white self-end rounded-tl-lg rounded-tr-lg rounded-bl-lg text-right'
                    : 'bg-custom-gradient-blue text-white rounded-tl-lg rounded-tr-lg rounded-br-lg'
                } p-3 max-w-lg w-fit flex flex-col gap-2`}
              >
                <span>{message?.text}</span>
                <span className="text-[11px] text-gray-300 self-end">
                  {format(message?.createdAt)}
                </span>
              </div>
            ))}
          </div>
          {/* chat-sender */}
          <div className="bg-white flex justify-between items-center h-14 p-4 rounded-lg">
            <div className="bg-gray-200 rounded-lg flex items-center justify-center font-bold cursor-pointer p-2">
              +
            </div>
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend(e)
                }
              }}
              cleanOnEnter={true}
              placeholder={t('type a message')}
              className="flex-1 bg-gray-200 rounded-lg border-none outline-none p-2 text-sm"
            />
            <button
              className="py-2 px-4 rounded-md button"
              onClick={handleSend}
            >
              {t('send button')}
            </button>
          </div>
        </>
      ) : (
        <span className="text-gray-500 text-center">
          Open a conversation to start a chat.
        </span>
      )}
    </div>
  )
}

export default ChatBox
