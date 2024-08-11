// actions/socketActions.js
export const CONNECT_SOCKET = 'CONNECT_SOCKET'
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
export const CREATE_CHAT = 'CREATE_CHAT'
export const DELETE_CHAT = 'DELETE_CHAT'
export const SET_CHATS = 'SET_CHATS'
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT'
export const SET_ONLINE_USERS = 'SET_ONLINE_USERS'
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'

export const connectSocket = (userId) => ({
  type: CONNECT_SOCKET,
  payload: userId,
})

export const disconnectSocket = () => ({
  type: DISCONNECT_SOCKET,
})

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  payload: message,
})

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
})

export const createChat = (chat) => ({
  type: CREATE_CHAT,
  payload: chat,
})

export const deleteChat = (chat) => ({
  type: DELETE_CHAT,
  payload: chat,
})

export const setChats = (chats) => ({
  type: SET_CHATS,
  payload: chats,
})

export const setCurrentChat = (chat) => ({
  type: SET_CURRENT_CHAT,
  payload: chat,
})

export const setOnlineUsers = (users) => ({
  type: SET_ONLINE_USERS,
  payload: users,
})

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
})
