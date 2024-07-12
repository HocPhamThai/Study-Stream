import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8001' })

const createChat = (senderId, receiverId) => API.post('/chat', { senderId, receiverId })
const userChats = (id) => API.get(`/chat/${id}`)

export { userChats, createChat }
