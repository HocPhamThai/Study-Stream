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
import PomodoroTopic from './pages/PomodoroTopic/PomodoroTopic'
import Topic from './pages/Topic/Topic'
import TopicPomodoro from './pages/TopicPomodoro/TopicPomodoro'
// import PomodoroTopicBg from './components/PomodoroTopicBg/PomodoroTopicBg'
import AdminHome from './pages/AdminHome/AdminHome'
import AdminTopic from './pages/AdminTopic/AdminTopic'
import AdminEntries from './pages/AdminEntries/AdminEntries'
import AdminSongs from './pages/AdminSongs/AdminSongs'
import GetStartedPage from './pages/GetStartedPage/GetStartedPage'
import ChatBot from './pages/ChatBot/Chatbot'

function App() {
  const { user } = useSelector((state) => state.authReducer.authData) || {
    user: null,
  }
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
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="dashhome" /> : <Auth />}
            />
            <Route
              path="/forgot"
              element={user ? <Navigate to="dashhome" /> : <ForgotPassword />}
            />
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="../auth" />}
            />
            <Route
              path="/auth"
              element={user ? <Navigate to="../dashhome" /> : <Auth />}
            />
            <Route
              path="/profile/:id"
              element={user ? <Profile /> : <Navigate to="../auth" />}
            />
            <Route
              path="/chat"
              element={user ? <Chat /> : <Navigate to="../auth" />}
            />
            <Route
              path="/rules"
              element={user ? <Rules /> : <Navigate to="../auth" />}
            />
            <Route
              path="/pomodoro"
              element={user ? <Pomodoro /> : <Navigate to="../auth" />}
            />
            <Route
              path="/pomodoro/:topicType/:entryId"
              element={user ? <PomodoroTopic /> : <Navigate to="../auth" />}
            />
            <Route
              path="/dashhome"
              element={
                user ? (
                  user.isAdmin ? (
                    <Navigate to="/adminhome" />
                  ) : (
                    <DashHome />
                  )
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="/topic"
              element={user ? <Topic /> : <Navigate to="../auth" />}
            />
            <Route
              path="/topic/:entry"
              element={user ? <TopicPomodoro /> : <Navigate to="../auth" />}
            />
            <Route
              path="/adminhome"
              element={
                user?.isAdmin ? <AdminHome /> : <Navigate to="../auth" />
              }
            />
            <Route path="/admin-topic" element={<AdminTopic />} />
            <Route
              path="/admin-topic/:topicIdProps"
              element={<AdminEntries />}
            />
            <Route path="/admin-songs" element={<AdminSongs />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            <Route
              path="/chatbot"
              element={user ? <ChatBot /> : <Navigate to="../auth" />}
            />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
