import React, { useEffect, useRef, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import { format } from 'timeago.js'
import { createMessage, getMessages } from '../../api/MessageRequest'
import { getUser } from '../../api/UserRequest'
import './ChatBox.scss'

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const scroll = useRef()

  // receive message from socket server
  useEffect(() => {
    if (receiveMessage !== null && receiveMessage?.chatId === chat._id) {
      setMessages([...messages, receiveMessage])
    }
  }, [receiveMessage])

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
    <div className="ChatBox-container">
      {chat ? (
        <>
          <div className="Chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                    userData?.profilePicture
                      ? serverPublic + userData.profilePicture
                      : serverPublic + 'defaultProfile.jpg'
                  }
                  className="followerImage"
                  style={{ width: '50px', height: '50px' }}
                  alt="failed to load"
                />
                <div className="name" style={{ fontSize: '0.8rem' }}>
                  <span>
                    {userData?.firstname} {userData?.lastname}
                  </span>
                </div>
              </div>
            </div>
            <hr
              style={{
                border: '0.1px solid #ececec',
                width: '100%',
                marginTop: '8px',
              }}
            />
          </div>
          {/* chatbox message */}
          <div className="chat-body">
            {messages &&
              messages?.map((message) => (
                <div
                  ref={scroll}
                  className={
                    message?.senderId === currentUser
                      ? 'message own'
                      : 'message'
                  }
                >
                  <span>{message?.text}</span>
                  <span>{format(message?.createdAt)}</span>
                </div>
              ))}
          </div>
          {/* chat-sender */}
          <div className="chat-sender">
            <div>+</div>
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend(e)
                }
              }}
              cleanOnEnter={true}
              placeholder="Type a message"
              style={{ width: '100%' }}
            />
            <button className="send-button button" onClick={handleSend}>
              Send
            </button>
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Open a conversation to start a chat.
        </span>
      )}
    </div>
  )
}

export default ChatBox
