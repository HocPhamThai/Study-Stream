import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'

const Auth = () => {
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explre the ideas throughout the world</h6>
        </div>
        <Login />
      </div>
    </div>
  )
}

function Login() {
  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <h3>Sign up</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Username"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="password"
            placeholder="Password"
          />
        </div>
        <div>
          <span style={{ fontSize: '12px' }}>
            Alreadly have an account. Login!
          </span>
        </div>
        <button type="submit" className="button infoButton">
          Login
        </button>
      </form>
    </div>
  )
}

function SignUp() {
  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <h3>Sign up</h3>

        <div>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            className="infoInput"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="infoInput"
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Username"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="password"
            placeholder="Password"
          />
          <input
            type="text"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <span style={{ fontSize: '12px' }}>
            Alreadly have an account. Login!
          </span>
        </div>
        <button type="submit" className="button infoButton">
          Sign up
        </button>
      </form>
    </div>
  )
}

export default Auth
