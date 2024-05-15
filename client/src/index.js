import React from 'react'
import ReactDOM from 'react-dom'
import { MantineProvider, createTheme } from '@mantine/core' // Import MantineProvider and createTheme
import App from './App'
import { Provider } from 'react-redux'
import store from './store/ReduxStore'

const theme = createTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </Provider>
)
