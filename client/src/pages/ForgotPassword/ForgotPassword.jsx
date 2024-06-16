import React, { useState } from 'react'
import PasswordResetFlow from '../../components/ForgotPassword/PasswordResetFlow'
import { forgotPassword } from '../../api/AuthRequest'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await forgotPassword(email)
      setEmailSubmitted(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {!emailSubmitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Gửi OTP</button>
        </form>
      ) : (
        <PasswordResetFlow email={email} />
      )}
    </div>
  )
}

export default ForgotPassword
