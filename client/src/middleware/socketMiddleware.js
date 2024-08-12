// middleware/socketMiddleware.js
import { io } from 'socket.io-client'
import {
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  SEND_MESSAGE,
  receiveMessage,
  createChat,
  deleteChat,
  setOnlineUsers,
  setCurrentChat,
} from '../actions/socketAction'

const socketMiddleware = (store) => {
  let socket = null

  return (next) => (action) => {
    switch (action.type) {
      case CONNECT_SOCKET:
        if (socket !== null) {
          socket.disconnect()
        }
        socket = io(process.env.REACT_APP_SOCKET_URL)
        socket.emit('new-user-add', action.payload)
        socket.on('get-users', (users) => {
          store.dispatch(setOnlineUsers(users))
        })
        socket.on('receive-message', (message) => {
          store.dispatch(receiveMessage(message))
        })
        socket.on('chat-created', (newChat) => {
          store.dispatch(createChat(newChat))
        })
        socket.on('chat-deleted', (deletedChatId) => {
          store.dispatch(deleteChat(deletedChatId))
          store.dispatch(setCurrentChat(null))
        })
        break
      case DISCONNECT_SOCKET:
        if (socket !== null) {
          socket.disconnect()
        }
        socket = null
        break
      case SEND_MESSAGE:
        if (socket !== null) {
          socket.emit('send-message', action.payload)
        }
        break
      default:
        break
    }
    return next(action)
  }
}

export default socketMiddleware
