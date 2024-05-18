import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8001' })

const getTimeLinePosts = (id) => API.get(`/post/${id}/timeline`)

export { getTimeLinePosts }
