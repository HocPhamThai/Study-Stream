import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Auth from './pages/Auth/Auth'
import Chat from './pages/Chat/Chat'
import Profile from './pages/Profile/Profile'
import Rules from './pages/Rules/Rules'
import Home from './pages/home/Home'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'

function App() {
  const user = useSelector((state) => state.authReducer.authData)

  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="../auth" />}
        />
        <Route
          path="/forgot"
          element={user ? <Navigate to="home" /> : <ForgotPassword />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </div>
  )
}

export default App
