import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import './ChatBox.scss'
import { getMessages } from '../../api/MessageRequest'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'

const ChatBox = ({ chat, currentUser }) => {
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

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

  return (
    <>
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
              <hr style={{ border: '0.1px solid #ececec', width: '85%' }} />
            </div>
            {/* chatbox message */}
            <div className="chat-body">
              {messages?.map((message) => (
                <div
                  className={
                    message.senderId === currentUser ? 'message own' : 'message'
                  }
                >
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Open a conversation to start a chat.
          </span>
        )}
      </div>
    </>
  )
}

export default ChatBox
