import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8001' })

const  userChats = (id) => API.get(`/chat/${id}`)

export { userChats }
