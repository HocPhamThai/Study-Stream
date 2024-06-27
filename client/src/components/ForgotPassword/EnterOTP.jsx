import React, { useState } from 'react'
import { verifyOTP } from '../../api/AuthRequest'

const EnterOTP = ({ email, onOTPSuccess }) => {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await verifyOTP(email, otp)
      onOTPSuccess(otp)
    } catch (error) {
      setError('Invalid OTP, please try again')
    }
  }

  return (
    <div className="container">
      <form className="infoForm formContainer" onSubmit={handleSubmit}>
        <h3>Enter OTP</h3>
        <span>Please check your email to get OTP</span>
        <input style={{ width: '100%' }} className="infoInput" type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        {error && <span className="error">{error}</span>}
        <button className="button infoButton" type="submit">
          Verify OTP
        </button>
      </form>
    </div>
  )
}

export default EnterOTP
