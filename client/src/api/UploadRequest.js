import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8001' })

const uploadImage = (formData) => API.post('/upload', formData)
const uploadPost = (formData) => API.post('/post', formData)

export { uploadImage, uploadPost }
