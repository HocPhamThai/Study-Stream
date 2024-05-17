import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Auth.scss'
import Logo from '../../img/logo.png'
import { logIn, signUp } from '../../actions/AuthAction'
import authReducer from './../../reducers/authReducer'

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const [isSignUp, SetIsSignup] = useState(false)

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpass: '',
  })

  const [confirmpass, setConfirmpass] = useState(true)
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmpass(false)
    } else {
      dispatch(logIn(data))
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
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
                required
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
              required
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
              required
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
                required
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

          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading....' : isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
