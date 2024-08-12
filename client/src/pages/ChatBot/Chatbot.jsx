import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Box, Avatar, Typography, Button, IconButton } from '@mui/material'
import aiImage from '../../img/ai.png'
import { IoMdSend } from 'react-icons/io'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import ChatItem from './ChatItem'
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from '../../api/ChatBotRequest'
import { Link } from 'react-router-dom'

import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import HorizontalNavBar from '../../components/HorizontalNavbar/HorizontalNavbar'

const ChatBot = () => {
  const inputRef = useRef(null)
  const chatContainerRef = useRef(null)
  const { user } = useSelector((state) => state.authReducer.authData)
  const [chatMessages, setChatMessages] = useState([])
  const handleSubmit = async () => {
    const content = inputRef.current?.value
    if (inputRef && inputRef.current) {
      inputRef.current.value = ''
    }
    const newMessage = { role: 'user', content }
    setChatMessages((prev) => [...prev, newMessage])
    const chatData = await sendChatRequest(content, user._id)
    setChatMessages([...chatData.chats])
  }
  const handleDeleteChats = async () => {
    try {
      toast.loading('Deleting Chats', { id: 'deletechats' })
      await deleteUserChats(user._id)
      setChatMessages([])
      toast.success('Deleted Chats Successfully', { id: 'deletechats' })
    } catch (error) {
      console.log(error)
      toast.error('Deleting chats failed', { id: 'deletechats' })
    }
  }
  useLayoutEffect(() => {
    if (user) {
      toast.loading('Loading Chats', { id: 'loadchats' })
      getUserChats(user._id)
        .then((data) => {
          setChatMessages([...data.chats])
          toast.success('Successfully loaded chats', {
            id: 'loadchats',
          })
        })
        .catch((err) => {
          console.log(err)
          toast.error('Loading Failed', { id: 'loadchats' })
        })
    }
  }, [user])

  useEffect(() => {
    // scroll to bottom
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }
  return (
    <div className="bg-gray-200">
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          color: '#212529',
          width: '100%',
          height: '100vh',
          gap: 3,
        }}
      >
        <Box sx={{ ml: '-1rem', mt: '56px' }} className="hidden lg:block">
          <LeftSideBar />
        </Box>
        <Box
          sx={{
            display: { md: 'flex', xs: 'none', sm: 'none' },
            flex: 0.2,
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '60vh',
              bgcolor: 'white',
              borderRadius: 5,
              flexDirection: 'column',
              mx: 3,
              mt: 9,
            }}
          >
            <Avatar
              sx={{
                mx: 'auto',
                my: 2,
                bgcolor: 'white',
                color: 'black',
                fontWeight: 700,
              }}
            >
              <img src={aiImage} alt="" />
            </Avatar>
            <Typography
              sx={{ mx: 'auto', fontFamily: 'Sans-Serif', fontWeight: 'bold' }}
            >
              You are talking to a ChatBot
            </Typography>
            <Typography
              sx={{
                mx: 'auto',
                fontFamily: 'Sans-Serif',
                my: 4,
                p: 3,
                textAlign: 'center',
              }}
            >
              You can ask some questions related to Knowledge, Business,
              Advices, Education, etc.
              <Typography
                sx={{
                  color: 'error.main',
                  textAlign: 'center',
                  alignItems: 'center',
                }}
              >
                ⚠️ But avoid sharing personal information!
              </Typography>
            </Typography>
            <Button
              onClick={handleDeleteChats}
              sx={{
                width: '200px',
                my: 'auto',
                color: 'white',
                fontWeight: '700',
                borderRadius: 3,
                mx: 'auto',
              }}
              className="button"
            >
              Clear Conversation
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flex: { xs: 1, sm: 1, md: 0.8 },
            flexDirection: 'column',
            px: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: '40px',
              color: 'white',
              mb: 2,
              mx: 'auto',
              fontWeight: '600',
            }}
          >
            <h1 className="text-[--orange] pt-4 md:pt-0 pb-8 px-4 text-xl  text-center group-[.iframe]:hidden">
              Fast AI Inference
            </h1>
          </Typography>
          <Box
            className="h-[60vh] md:h-[75vh]"
            sx={{
              width: '100%',
              // height: '75vh',
              borderRadius: 3,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'scroll',
              overflowX: 'hidden',
              overflowY: 'auto',
              scrollBehavior: 'smooth',
            }}
            ref={chatContainerRef}
          >
            {chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
          </Box>
          <div
            style={{
              width: '100%',
              borderRadius: 8,
              display: 'flex',
              margin: 'auto',
              border: '12px solid #666',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              onKeyPress={handleKeyPress}
              style={{
                width: '100%',
                padding: '16px',
                border: 'none',
                outline: 'none',
                borderRadius: '8px 0 0 8px',
                fontSize: '16px',
              }}
            />
            <IconButton onClick={handleSubmit} sx={{ color: '#666', mx: 1 }}>
              <IoMdSend />
            </IconButton>
          </div>
        </Box>
      </Box>
      <div className="fixed bottom-3 left-0 right-0 lg:hidden mt-2 mx-auto w-max z-50">
        <HorizontalNavBar />
      </div>
    </div>
  )
}

export default ChatBot
