// Chat.jsx
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import {
  clearMessages,
  connectSocket,
  disconnectSocket,
  sendMessage,
  setChats,
  setCurrentChat,
} from '../../actions/socketAction'
import {
  userChats,
  createChat as createChatRequest,
  deleteChatRequest,
} from '../../api/ChatRequest'
import ChatBox from '../../components/ChatBox/ChatBox'
import Conversation from '../../components/Conversation/Conversation'
import Home from '../../img/home.png'
import LogoSearch from './../../components/LogoSearch/LogoSearch'
import './Chat.scss'
import SearchForm from '../../components/SearchForm/SearchForm'
import ConversationInSearch from '../../components/ConversationInSearch/ConversationInSearch'
import { searchUsers } from '../../api/UserRequest'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import { UilSetting } from '@iconscout/react-unicons'

const Chat = () => {
  const dispatch = useDispatch()
  const authData = useSelector((state) => state.authReducer.authData) || {
    user: null,
  }
  const { user } = authData
  const { chats, currentChat, onlineUsers, receiveMessage } = useSelector(
    (state) => state.socketReducer
  )
  const [showChat, setShowChat] = useState(true)
  const [userSearchs, setUserSearchs] = useState([])
  const [querySearch, setQuerySearch] = useState('')
  const socket = useRef(null)

  useEffect(() => {
    if (user) {
      socket.current = io('ws://localhost:8800')
      dispatch(connectSocket(user._id))
    }
    return () => {
      if (socket.current) {
        socket.current.disconnect()
      }
      dispatch(disconnectSocket())
    }
  }, [user, dispatch])

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id)
        dispatch(setChats(data))
      } catch (error) {
        console.log(error)
      }
    }
    getChats()
  }, [user, dispatch])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await searchUsers(querySearch)
        const userSearchs = data.filter(
          (userSearch) => userSearch._id !== user._id
        )
        setUserSearchs(userSearchs)
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
      const { data } = await createChatRequest(user._id, receiverId)
      if (data.isExist) {
        // Handle existing chat
        dispatch(setCurrentChat(data.existingChat))
      } else {
        // Handle new chat
        dispatch(setCurrentChat(data))
        socket.current.emit('create-chat', {
          senderId: user._id,
          receiverId,
          chat: data,
        })
      }
    } catch (error) {
      console.error('Failed to create chat', error)
    }
  }

  const handleDeleteChat = async (chatId) => {
    try {
      const chatToDelete = chats.find((chat) => chat._id === chatId)
      if (chatToDelete) {
        await deleteChatRequest(chatId)
        socket.current.emit('delete-chat', {
          chatData: chatToDelete,
        })
        dispatch(setCurrentChat(null))
        dispatch(clearMessages())
      }
    } catch (error) {
      console.error('Failed to delete chat', error)
    }
  }

  return (
    <div className="Chat">
      <div className="left-sidebar responsive-sidebar">
        <div className="hidden md:block">
          <LeftSideBar />
        </div>
      </div>
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
                    key={chat?._id}
                    role="button"
                    tabIndex={0}
                    onClick={() => dispatch(setCurrentChat(chat))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        dispatch(setCurrentChat(chat))
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
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteChat(chat._id)
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
      <div className="Right-side-chat">
        <div style={{ width: '8rem', alignSelf: 'flex-end' }}>
          <div className="navIcons">
            <Link to="/dashhome">
              <img src={Home} alt="" />
            </Link>
            <Link to={`/profile/${user._id}`}>
              <UilSetting />
            </Link>
          </div>
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={(message) => dispatch(sendMessage(message))}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  )
}

export default Chat
