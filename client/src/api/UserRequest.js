import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8001' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    return req
  }
})

const getAllUser = () => API.get('/user')
const getUser = (id) => API.get(`/user/${id}`)
const updateUser = (id, formData) => API.put(`/user/${id}`, formData)
const followUser = (id, data) => API.put(`/user/${id}/follow`, data)
const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data)
const enterRoom = (id) => API.post('/studyroom/enter', { id })
const exitRoom = (id) => API.post('/studyroom/exit', { id })
const searchUsers = (query) => API.post(`/user/search?query=${query}`)

export { getAllUser, getUser, updateUser, followUser, unFollowUser, searchUsers, enterRoom, exitRoom }
