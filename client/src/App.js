import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import './App.scss'
import './index.css'
import Auth from './pages/Auth/Auth'
import Chat from './pages/Chat/Chat'
import Profile from './pages/Profile/Profile'
import Rules from './pages/Rules/Rules'
import Home from './pages/home/Home'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import StudyRoom from './pages/StudyRoom/StudyRoom'
import DashHome from './pages/DashHomePage/DashHome'
import Pomodoro from './pages/PomoDoroPage/Pomodoro'
import Test from './pages/Test/Test'

function App() {
  const user = useSelector((state) => state.authReducer.authData)
  const location = useLocation()
  const renderStudyRoom = location.pathname === '/studyroom'

  return (
    <>
      {renderStudyRoom ? (
        <div className="studyroom-main">
          <Routes>
            <Route path="/studyroom" element={<StudyRoom />} />
          </Routes>
        </div>
      ) : (
        <div className="App">
          <Toaster position="top-right" />
          {/* <div className="blur" style={{ top: '-18%', right: '0' }}></div>
          <div className="blur" style={{ top: '36%', left: '-8rem' }}></div> */}
          <Routes>
            <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="../auth" />} />
            <Route path="/forgot" element={user ? <Navigate to="home" /> : <ForgotPassword />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="../auth" />} />
            <Route path="/auth" element={user ? <Navigate to="../home" /> : <Auth />} />
            <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="../auth" />} />
            <Route path="/chat" element={user ? <Chat /> : <Navigate to="../auth" />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/dashhome" element={<DashHome />} />
            <Route path="/Test" element={<Test />} />

          </Routes>
        </div>
      )}
    </>
  )
}

export default App
