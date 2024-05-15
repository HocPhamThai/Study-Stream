import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8001' })

const logIn = (formData) => API.post('/auth/login', formData)
const signUp = (formData) => API.post('/auth/register', formData)

export { logIn, signUp }
