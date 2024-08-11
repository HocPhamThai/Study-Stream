import { combineReducers } from 'redux'

import authReducer from './authReducer'
import postReducer from './postReducer'
import socketReducer from './socketReducer'

export const reducers = combineReducers({
  authReducer,
  postReducer,
  socketReducer,
})
