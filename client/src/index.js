import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core' // Import MantineProvider and createTheme
import App from './App'
import { Provider } from 'react-redux'
import store from './store/ReduxStore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const theme = createTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </Provider>
)
