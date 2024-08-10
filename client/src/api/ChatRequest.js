import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

const createChat = (senderId, receiverId) =>
  API.post('/chat', { senderId, receiverId })
const userChats = (id) => API.get(`/chat/${id}`)
const deleteChatRequest = (chatId) => API.delete(`/chat/${chatId}`)

export { userChats, createChat, deleteChatRequest }
