import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

export const sendChatRequest = async (message, id) => {
  const res = await API.post('/chatbot/new', { message, id })
  if (res.status !== 200) {
    throw new Error('Unable to send chat')
  }
  const data = await res.data
  return data
}

export const getUserChats = async (id) => {
  const res = await API.post('/chatbot/all-chats', { id })
  if (res.status !== 200) {
    throw new Error('Unable to send chat')
  }
  const data = await res.data
  return data
}

export const deleteUserChats = async (id) => {
  console.log(id)
  const res = await API.post('/chatbot/delete', { id })
  if (res.status !== 200) {
    throw new Error('Unable to delete chats')
  }
  const data = await res.data
  return data
}
