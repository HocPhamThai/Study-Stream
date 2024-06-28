import React, { useState } from 'react'
import PasswordResetFlow from '../../components/ForgotPassword/PasswordResetFlow'
import { forgotPassword } from '../../api/AuthRequest'
import './ForgotPassword.scss'
import { toast } from 'sonner'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await forgotPassword(email)
      toast.success('OTP sent successfully!', { duration: 2000 })
      setEmailSubmitted(true)
    } catch (error) {
      setError('Email không tồn tại')
    }
  }

  return (
    <div className="container">
      {!emailSubmitted ? (
        <form className="infoForm formContainer" onSubmit={handleSubmit}>
          <h3>Forgot Password</h3>
          <span>Please input your email to Reset password</span>
          <input
            style={{ width: '100%' }}
            className="infoInput"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <span className="error">{error}</span>}
          <button className="button infoButton" type="submit">
            Send OTP
          </button>
        </form>
      ) : (
        <PasswordResetFlow email={email} />
      )}
    </div>
  )
}

export default ForgotPassword
