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
import Analytics from './pages/Analytics/Analytics'
import StudyPage from './pages/StudyPage/StudyPage'
import CoursesTopic from './pages/CoursesTopic/CoursesTopic'
import Courses from './pages/Courses/Courses'
import Lessons from './pages/Lessons/Lessons'
import { useEffect, useState } from 'react'

function App() {
  const authData = useSelector((state) => state.authReducer.authData) || {
    user: null,
  }
  const { user } = authData

  const location = useLocation()
  const renderStudyRoom = location.pathname === '/studyroom'

  const [hasVistiedGetStarted, setHasVistiedGetStarted] = useState(false)

  useEffect(() => {
    const visited = localStorage.getItem('hasVistiedGetStarted')
    if (visited) {
      setHasVistiedGetStarted(true)
    }
  }, [])

  const handleGetStartedVisit = () => {
    localStorage.setItem('hasVisitedGetStarted', 'true')
    setHasVistiedGetStarted(true)
  }

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
          <Toaster position="top-right" duration={1000} />
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/dashhome" />
                ) : hasVistiedGetStarted ? (
                  <Navigate to="/get-started" />
                ) : (
                  <GetStartedPage
                    handleGetStartedVisit={handleGetStartedVisit}
                  />
                )
              }
            />
            <Route
              path="/forgot"
              element={user ? <Navigate to="dashhome" /> : <ForgotPassword />}
            />
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="../get-started" />}
            />
            <Route
              path="/auth"
              element={user ? <Navigate to="../dashhome" /> : <Auth />}
            />
            <Route
              path="/profile/:id"
              element={user ? <Profile /> : <Navigate to="../get-started" />}
            />
            <Route
              path="/chat"
              element={user ? <Chat /> : <Navigate to="../get-started" />}
            />
            <Route
              path="/rules"
              element={user ? <Rules /> : <Navigate to="../get-started" />}
            />
            <Route
              path="/pomodoro"
              element={user ? <Pomodoro /> : <Navigate to="../get-started" />}
            />
            <Route
              path="/pomodoro/:topicType/:entryId"
              element={
                user ? <PomodoroTopic /> : <Navigate to="../get-started" />
              }
            />
            <Route
              path="/analytics"
              element={user ? <Analytics /> : <Navigate to="../get-started" />}
            />
            <Route
              path="/studypage/:courseTopicId/:courseId/:lessonId"
              element={user ? <StudyPage /> : <Navigate to="../get-started" />}
            />
            <Route
              path="/courses-topic"
              element={
                user ? <CoursesTopic /> : <Navigate to="../get-started" />
              }
            />
            <Route
              path="/courses-topic/:courseTopicId"
              element={user ? <Courses /> : <Navigate to="../get-started" />}
            />

            <Route
              path="/courses-topic/:courseTopicId/:courseId"
              element={user ? <Lessons /> : <Navigate to="../get-started" />}
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
                  <Navigate to="/get-started" />
                )
              }
            />
            <Route
              path="/topic"
              element={user ? <Topic /> : <Navigate to="../get-started" />}
            />
            <Route
              path="/topic/:entry"
              element={
                user ? <TopicPomodoro /> : <Navigate to="../get-started" />
              }
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
              element={user ? <ChatBot /> : <Navigate to="../get-started" />}
            />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
