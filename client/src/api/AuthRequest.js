import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

const logIn = (formData) => API.post('/auth/login', formData)
const signUp = (formData) => API.post('/auth/register', formData)
const forgotPassword = (email) => API.post('/auth/forgot-password', { email })
const verifyOTP = (email, otp) => API.post('/auth/verify-otp', { email, otp })
const resetPassword = (email, password) =>
  API.post('/auth/reset-password', { email, newPassword: password })

export { logIn, signUp, forgotPassword, verifyOTP, resetPassword }
