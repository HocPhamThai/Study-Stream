import React from 'react'
import ReactDOM from 'react-dom'
import { MantineProvider, createTheme } from '@mantine/core'; // Import MantineProvider and createTheme
import App from './App';

const theme = createTheme(); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
)
