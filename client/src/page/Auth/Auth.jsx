import React, { useState } from 'react'
import './Auth.scss'
import Logo from '../../img/logo.png'
const Auth = () => {
  const [isSignUp, SetIsSignup] = useState(false)
  const [confirmpass, setConfirmpass] = useState(true)

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpass: '',
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      if (data.password !== data.confirmpass) {
        setConfirmpass(false)
      }
    }
  }
  const resetForm = () => {
    setConfirmpass(true)
    setData({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirmpass: '',
    })
  }
  return (
    <div className="Auth">
      <div className="auth-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Study Stream</h1>
          <h6>Stay focused - Be present</h6>
        </div>
      </div>
      <div className="auth-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Sign Up' : 'Login'}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
              autoComplete="off"
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          {!isSignUp ? (
            ''
          ) : (
            <span
              style={{
                display: confirmpass ? 'none' : 'block',
                color: 'red',
                fontSize: '12px',
                alignSelf: 'flex-end',
                marginRight: '1rem',
              }}
            >
              * The confirm password is not match!!!
            </span>
          )}
          <div>
            <span
              style={{
                fontSize: '12px',
                cursor: 'pointer',
                color: 'blue',
                textDecoration: 'underline',
              }}
              onClick={() => {
                SetIsSignup((flagAuth) => !flagAuth)
                resetForm()
              }}
            >
              {isSignUp
                ? 'Already have an account! Login'
                : "Don't have an account? Sign Up"}
            </span>
          </div>

          <button className="button infoButton" type="submit">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
