import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'

import { thunk } from 'redux-thunk'
import { reducers } from '../reducers'

// saveToLocalStorage is a function that saves the Redux store to the browser's local storage
function saveToLocalStorage(store) {
  try {
    const serializedState = JSON.stringify(store)
    window.localStorage.setItem('store', serializedState)
  } catch (e) {
    console.log(e)
  }
}

// loadFromLocalStorage is a function that loads the Redux store from the browser's local storage
function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem('store')
    if (serializedStore === null) return undefined
    return JSON.parse(serializedStore)
  } catch (e) {
    console.log(e)
    return undefined
  }
}

// composeEnhancers is used to enable the Redux DevTools extension in the browser for debugging purposes
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// persistedState is the Redux store that is loaded from the browser's local storage
const persistedState = loadFromLocalStorage()

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
)

// The store.subscribe() method is used to save the Redux store to the browser's local storage whenever the store changes
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
