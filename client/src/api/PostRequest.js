import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

const getTimeLinePosts = (id) => API.get(`/post/${id}/timeline`)
const likePost = (id, userId) => API.put(`/post/${id}/like`, { userId: userId })

export { getTimeLinePosts, likePost }
