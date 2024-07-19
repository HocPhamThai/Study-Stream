// src/components/StudyRoom.jsx
import React, { useEffect, useState } from 'react'
import './StudyRoom.scss';
import './Main.scss';
import Logo from "../../img/logo.png";
import { joinRoomInit, sendMessage } from '../../actions/StudyRoom_rtc';
import { useDispatch, useSelector } from 'react-redux'
import { enterRoom, exitRoom } from '../../api/UserRequest'

const StudyRoom = () => {
  const [activeMemberContainer, setActiveMemberContainer] = useState(false)
  const [activeChatContainer, setActiveChatContainer] = useState(false);
  const profileUserId = useSelector((state) => state.authReducer.profileUserId);
  const authData = useSelector((state) => state.authReducer.authData);
  const user = authData ? authData.user : null
  const [message, setMessage] = useState('')

  const expandVideoFrame = (e) => {
    const displayFrame = document.getElementById('stream__box')
    const videoFrames = document.getElementsByClassName('video__container')
    let userIdInDisplayFrame = null

    const child = displayFrame.children[0]
    if (child) {
      document.getElementById('streams__container').appendChild(child)
    }

    displayFrame.style.display = 'block'
    displayFrame.appendChild(e.currentTarget)
    userIdInDisplayFrame = e.currentTarget.id

    for (let i = 0; i < videoFrames.length; i++) {
      if (videoFrames[i].id !== userIdInDisplayFrame) {
        videoFrames[i].style.height = '100px'
        videoFrames[i].style.width = '100px'
      }
    }
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const roomId = urlParams.get('room') || 'main';
    const username = user !== null ? (user.firstname + ' ' + user.lastname) : 'Anonymous'

    if (user) {
      enterRoom(user._id)
        .then(response => {
          console.log(response.data.message); // Log success message if needed
          sessionStorage.setItem('activeRoom', roomId)
        })
        .catch((error) => {
          console.error('Failed to enter room:', error)
          // Handle error, e.g., show a notification to the user
        })
    }

    joinRoomInit(roomId, expandVideoFrame, username);

    return () => {
      if (user) {
        exitRoom(user._id)
          .then((response) => {
            console.log(response.data.message) // Log success message if needed
          })
          .catch((error) => {
            console.error('Failed to exit room:', error)
            // Handle error, e.g., show a notification to the user
          })
      }
    }
  }, [user])

  useEffect(() => {
    const messagesContainer = document.getElementById('messages')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }, [])

  useEffect(() => {
    const memberContainer = document.getElementById('members__container')
    const memberButton = document.getElementById('members__button')
    const chatContainer = document.getElementById('messages__container')
    const chatButton = document.getElementById('chat__button')

    const handleMemberButtonClick = () => {
      if (activeMemberContainer) {
        memberContainer.style.display = 'none'
      } else {
        memberContainer.style.display = 'block'
      }
      setActiveMemberContainer(!activeMemberContainer)
    }

    const handleChatButtonClick = () => {
      if (activeChatContainer) {
        chatContainer.style.display = 'none'
      } else {
        chatContainer.style.display = 'block'
      }
      setActiveChatContainer(!activeChatContainer)
    }

    memberButton.addEventListener('click', handleMemberButtonClick)
    chatButton.addEventListener('click', handleChatButtonClick)

    return () => {
      memberButton.removeEventListener('click', handleMemberButtonClick)
      chatButton.removeEventListener('click', handleChatButtonClick)
    }
  }, [activeMemberContainer, activeChatContainer])

  useEffect(() => {
    const videoFrames = document.getElementsByClassName('video__container')

    // return () => {
    for (let i = 0; videoFrames.length > i; i++) {
      videoFrames[i].addEventListener('click', expandVideoFrame)
    }
    // }
  }, [])

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const username = user !== null ? (user.firstname + ' ' + user.lastname) : 'Anonymous'
    await sendMessage(message, username);
    setMessage(''); // Reset lại input sau khi gửi tin nhắn
  }

  return (
    <div className="studyroom">
      <header id="nav">
        <div className="nav--list">
          <button id="members__button">
            <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
              <path d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z" fill="#ede0e0">
                <path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z" />
              </path>
            </svg>
          </button>
          <a href="lobby.html">
            <h3 id="logo">
              <img src={Logo} alt="Site Logo" />
              <span>Study Stream</span>
            </h3>
          </a>
        </div>
        <div id="nav__links">
          <button id="chat__button">
            <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" fill="#ede0e0" clipRule="evenodd">
              <path d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-15.667-6l-5.333 4v-4h-3v-14.001l18 .001v14h-9.667zm-6.333-2h3v2l2.667-2h8.333v-10l-14-.001v10.001z" />
            </svg>
          </button>
          <a className="nav__link" id="create__room__btn" href="/dashhome">
            Go back
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="#ede0e0"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
            </svg>
          </a>
        </div>
      </header>

      <main className="container-main">
        <div id="room__container">
          <section id="members__container">
            <div id="members__header">
              <p>Participants</p>
              <strong id="members__count">0</strong>
            </div>
            <div id="member__list">
            </div>
          </section>

          <section id="stream__container">
            <div id="stream__box"></div>
            <div id="streams__container">
              <div className="video__container" id="user-container-1">
                <h1>1</h1>
              </div>
              <div className="video__container" id="user-container-2">
                <h1>2</h1>
              </div>
            </div>
            <div className="stream__actions">
              <button id="camera-btn" className="active">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" />
                </svg>
              </button>
              <button id="mic-btn" className="active">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z" />
                </svg>
              </button>
              <button id="screen-btn" className="active">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z" />
                </svg>
              </button>
              <button id="leave-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z" />
                </svg>
              </button>
            </div>
          </section>

          <section id="messages__container">
            <div id="messages">
              <div className="message__wrapper">

              </div>
            </div>
            <form id="message__form" onSubmit={handleSendMessage}>
              <input
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button type="submit" className='hidden'>Send</button>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default StudyRoom
