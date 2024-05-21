import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8001' })

const getUser = (id) => API.get(`/user/${id}`)
const updateUser = (id, formData) => API.put(`/user/${id}`, formData)

export { getUser, updateUser }
