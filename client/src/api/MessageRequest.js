import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

const getMessages = (chatId) => API.get(`/message/${chatId}`)
const createMessage = (message) => API.post('/message', message)

export { createMessage, getMessages }
