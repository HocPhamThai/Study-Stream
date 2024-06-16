import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'
import Logo from '../../img/logo.png'
import './Auth.scss'

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const error = useSelector((state) => state.authReducer.error)
  const [isSignUp, SetIsSignup] = useState(false)

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpass: '',
  })

  const [confirmpass, setConfirmpass] = useState(true)
  const [formErrors, setFormErrors] = useState([])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateForm()
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      if (isSignUp) {
        data.password === data.confirmpass
          ? dispatch(signUp(data))
          : setConfirmpass(false)
      } else {
        dispatch(logIn(data))
      }
    }
  }

  const validateForm = () => {
    let errors = {}

    if (!data.username) {
      errors.username = 'Username is required'
    } else if (!/\S+@\S+\.\S+/.test(data.username)) {
      errors.username = 'Please enter a valid email address'
    } else if (!data.password) {
      errors.password = 'Password is required'
    } else if (data.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more'
    } else if (isSignUp && data.password !== data.confirmpass) {
      errors.confirmpass = 'Passwords do not match'
    }
    setConfirmpass(data.password === data.confirmpass)
    return errors
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
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const handleForgot = () => {
    window.location.href = '/forgot'
    dispatch({ type: 'FORGOT_PASSWORD' })
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
        <form
          className={
            !isSignUp ? 'infoForm authForm widthLoginForm' : 'infoForm authForm'
          }
          onSubmit={handleSubmit}
        >
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
              placeholder="Email"
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
          {formErrors.firstname && (
            <span className="error">{formErrors.firstname}</span>
          )}
          {formErrors.lastname && (
            <span className="error">{formErrors.lastname}</span>
          )}
          {formErrors.username && (
            <span className="error">{formErrors.username}</span>
          )}
          {!isSignUp ? (
            ''
          ) : (
            // error in signup
            <>
              {!formErrors.password ? (
                <span
                  style={{
                    display: confirmpass ? 'none' : 'block',
                    color: 'red',
                    fontSize: '0.8rem',
                    alignSelf: 'flex-end',
                    marginRight: '1rem',
                  }}
                >
                  * The confirm password is not match!!!
                </span>
              ) : (
                <span className="error">{formErrors.password}</span>
              )}
            </>
          )}
          {!isSignUp && error && <span className="error">{error}</span>}
          {isSignUp && error && <span className="error">{error}</span>}
          <div>
            <span>
              <a
                style={{
                  fontSize: '12px',
                  cursor: 'pointer',
                  color: 'blue',
                  textDecoration: 'underline',
                  lineHeight: 1,
                }}
                href="/forgot"
                onClick={handleForgot}
              >
                Forgot Password?
              </a>
            </span>
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
