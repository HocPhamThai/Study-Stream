import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'
import Logo from '../../img/logo.png'
import './Auth.scss'
import ChangeLanguage from '../../components/ChangeLanguage/ChangeLanguage'
import { useTranslation } from 'react-i18next'

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const error = useSelector((state) => state.authReducer.error)
  const [isSignUp, SetIsSignup] = useState(false)
  const { t } = useTranslation('login')

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_ERROR' })
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [dispatch, error])

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
      errors.username = `${t('Username is required')}`
    } else if (!/\S+@\S+\.\S+/.test(data.username)) {
      errors.username = `${t('Please enter a valid email address')}`
    } else if (!data.password) {
      errors.password = `${t('Password is required')}`
    } else if (data.password.length < 6) {
      errors.password = `${t('Password needs to be 6 characters or more')}`
    } else if (isSignUp && data.password !== data.confirmpass) {
      errors.confirmpass = `${t('Passwords do not match')}`
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
    setFormErrors([])
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const handleForgot = () => {
    window.location.href = '/forgot'
  }
  return (
    <div className="Auth bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="auth-left hidden md:block ">
        <img className="hidden md:block " src={Logo} alt="" />
        <div className="Webname hidden md:block ">
          <h1>Study Stream</h1>
          <h6>Stay focused - Be present</h6>
        </div>
      </div>

      <div className="auth-right bg-white rounded-2xl">
        <form
          className={
            !isSignUp ? 'infoForm authForm widthLoginForm' : 'infoForm authForm'
          }
          onSubmit={handleSubmit}
        >
          <div className="block md:hidden">
            <img
              className="block md:hidden text-lg	w-[60px] h-[60px]"
              src={Logo}
              alt=""
            />
            <h1 className=" block md:hidden textTitle ">Study Stream</h1>
          </div>
          <h3 className="font-bold uppercase ">{isSignUp ? t('Sign Up') : t('Login')}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder={t('First Name')}
                className="infoInput "
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
                required
              />
              <input
                type="text"
                placeholder={t('Last Name')}
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
              placeholder={t('Email')}
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
              placeholder={t('Password')}
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
                placeholder={t('Confirm Password')}
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
                    fontSize: '0.7rem',
                    alignSelf: 'flex-end',
                    marginRight: '1rem',
                  }}
                >
                  * {t('The confirm password is not match!!!')}
                </span>
              ) : (
                <span className="error">{formErrors.password}</span>
              )}
            </>
          )}
          {!isSignUp && error && <span className="error">{error}</span>}
          {!isSignUp && formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
          {isSignUp && error && <span className="error">{error}</span>}
          <div>
            <a
              style={{
                fontSize: '12px',
                cursor: 'pointer',
                color: 'blue',
                textDecoration: 'underline',
              }}
              href="/forgot"
              onClick={handleForgot}
            >
              <span
                style={{
                  lineHeight: 1,
                }}
              >
                {t('Forgot Password?')}
              </span>
            </a>
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
                ? t('Already have an account! Login')
                : t(`Don't have an account? Sign Up`)}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? t('Loading....') : isSignUp ? t('Sign Up') : t('Login')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
