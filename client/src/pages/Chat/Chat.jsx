import { UilSetting } from '@iconscout/react-unicons'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'
import { createChat, userChats, deleteChatRequest } from '../../api/ChatRequest'
import ChatBox from '../../components/ChatBox/ChatBox'
import Conversation from '../../components/Conversation/Conversation'
import Comment from '../../img/comment.png'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import LogoSearch from './../../components/LogoSearch/LogoSearch'
import './Chat.scss'
import SearchForm from '../../components/SearchForm/SearchForm'
import ConversationInSearch from '../../components/ConversationInSearch/ConversationInSearch'
import { searchUsers } from '../../api/UserRequest'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const [showChat, setShowChat] = useState(true)
  const [userSearchs, setUserSearchs] = useState([])
  const [querySearch, setQuerySearch] = useState('')
  const socket = useRef()

  useEffect(() => {
    socket.current = io('ws://localhost:8800')
    socket.current.emit('new-user-add', user._id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
    })
  }, [user])
  // send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  // receive message from socket server
  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      setReceiveMessage(data)
    })
  }, [])

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id)
        setChats(data)
      } catch (error) {
        console.log(error)
      }
    }
    getChats()
  }, [user])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await searchUsers(querySearch)
        setUserSearchs(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [querySearch])

  const checkOnlineStatus = (chat) => {
    const userId = chat.members?.find((member) => member !== user._id)
    const online = onlineUsers?.find((user) => user.userId === userId)
    return online ? true : false
  }

  const onSearch = (query) => {
    setQuerySearch(query)
  }

  const handleUserClick = async (receiverId) => {
    try {
      const newChat = await createChat(user._id, receiverId)
      setChats((prevChats) => [...prevChats, newChat])
      setCurrentChat(newChat)
    } catch (error) {
      console.error('Failed to create chat', error)
    }
  }

  const deleteChat = async (chatId) => {
    try {
      await deleteChatRequest(chatId)
      setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId))
      setCurrentChat(null)
    } catch (error) {
      console.error('Failed to delete chat', error)
    }
  }

  return (
    <div className="Chat">
      <div className="left-sidebar">
        <LeftSideBar />
      </div>
      {/* Left side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div>
            <SearchForm onSearch={onSearch} setShowChat={setShowChat} />
          </div>
          <div className="Chat-list hover-scrollbar">
            {showChat
              ? chats.map((chat) => (
                <div
                  key={chat._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setCurrentChat(chat)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCurrentChat(chat)
                    }
                  }}
                  className="Conversation"
                >
                  <Conversation
                    data={chat}
                    currentUserId={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                  <button
                    className="delete-button"
                    onClick={() => {
                      deleteChat(chat._id)
                    }}
                  >
                    X
                  </button>
                </div>
              ))
              : userSearchs.map((user) => (
                <div
                  key={user._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleUserClick(user._id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUserClick(user._id)
                    }
                  }}
                >
                  <ConversationInSearch
                    data={user}
                    setShowChat={setShowChat}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="Right-side-chat">
        <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
          <div className="navIcons">
            <Link to="/dashhome">
              <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="/chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
        </div>
        {/* Chat body */}
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  )
}

export default Chat
