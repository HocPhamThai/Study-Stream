// Chat.jsx
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import './Chat.scss'
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
import SearchForm from '../../components/SearchForm/SearchForm'
import ConversationInSearch from '../../components/ConversationInSearch/ConversationInSearch'
import { searchUsers } from '../../api/UserRequest'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import { UilSetting } from '@iconscout/react-unicons'
import HorizontalNavBar from '../../components/HorizontalNavbar/HorizontalNavbar'
import { useTranslation } from 'react-i18next'
import ChangeLanguage from '../../components/ChangeLanguage/ChangeLanguage'
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
  const { t } = useTranslation(['chat'])

  useEffect(() => {
    if (user) {
      socket.current = io(process.env.REACT_APP_SOCKET_URL)
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
        dispatch(clearMessages())
      }
    } catch (error) {
      console.error('Failed to delete chat', error)
    }
  }

  return (
    <div className="relative bg-gray-100 grid grid-cols-[5%,20%,auto] gap-4 m-[-1rem] p-4 overflow-visible md:grid-cols-[5%,25%,auto] sm:grid-cols-[16%,auto] xs:grid-cols-1 xs:gap-2 xs:p-2">
      <div className="left-sidebar mt-11 ml-[-1rem] self-start">
        <div className="hidden lg:block">
          <LeftSideBar />
        </div>
      </div>
      <div className="flex flex-col gap-4 ml-[-20px] xs:hidden h-96 ">
        <div className="hidden md:block">
          <LogoSearch />
        </div>
        <div className="flex flex-col gap-4 bg-white rounded-lg mt-[2px] p-4 min-h-[80vh] xs:min-h-[60vh]">
          <h2>{t('chat')}</h2>
          <div>
            <SearchForm
              onSearch={onSearch}
              showChat={showChat}
              setShowChat={setShowChat}
            />
          </div>
          <div className="flex flex-col gap-2 overflow-auto scrollbar-none">
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
                    className="relative p-2 rounded-lg hover:bg-gray-300 cursor-pointer"
                  >
                    <Conversation
                      data={chat}
                      currentUserId={user._id}
                      online={checkOnlineStatus(chat)}
                    />
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500 border-none p-1.5 rounded-md cursor-pointer"
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
      <div className="flex flex-col gap-4 xs:hidden">
        <div className="w-60 h-11 self-end flex items-center hidden md:flex">
          <div className="relative mr-10">
            <ChangeLanguage />
          </div>
          <div className="flex gap-4 flex-1 justify-between items-center mr-24">
            <Link
              to="/dashhome"
              className="mr-6"
              style={{ width: '24px', height: 'auto' }}
            >
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
      <div className="fixed bottom-3 left-0 right-0 lg:hidden mt-2 mx-auto w-max z-50">
        <HorizontalNavBar />
      </div>
    </div>
  )
}

export default Chat
