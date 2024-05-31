import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8001' })

const getMessages = (chatId) => API.get(`/message/${chatId}`)

export { getMessages }
