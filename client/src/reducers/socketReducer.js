import {
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  CREATE_CHAT,
  DELETE_CHAT,
  SET_CHATS,
  SET_CURRENT_CHAT,
  SET_ONLINE_USERS,
  CLEAR_MESSAGES,
} from '../actions/socketAction'

const intialState = {
  socket: null,
  chats: [],
  currentChat: null,
  onlineUsers: [],
  sendMessage: null,
  receiveMessage: null,
}

const socketReducer = (state = intialState, action) => {
  switch (action.type) {
    case CONNECT_SOCKET:
      return {
        ...state,
        socket: action.payload,
      }
    case DISCONNECT_SOCKET:
      return {
        ...state,
        socket: null,
      }
    case SEND_MESSAGE:
      return {
        ...state,
        sendMessage: action.payload,
      }
    case RECEIVE_MESSAGE:
      return {
        ...state,
        receiveMessage: action.payload,
      }
    case CREATE_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload],
      }
    case DELETE_CHAT:
      return {
        ...state,
        chats: state.chats.filter((chat) => chat._id !== action.payload),
      }
    case SET_CHATS:
      return {
        ...state,
        chats: action.payload,
      }
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload,
      }
    case SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload,
      }
    case CLEAR_MESSAGES:
      return {
        ...state,
        sendMessage: null,
        receiveMessage: null,
      }
    default:
      return state
  }
}

export default socketReducer
