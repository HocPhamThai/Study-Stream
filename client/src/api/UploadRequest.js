import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

const uploadImage = (formData) => API.post('/upload', formData)
const uploadPost = (formData) => API.post('/post', formData)

export { uploadImage, uploadPost }
