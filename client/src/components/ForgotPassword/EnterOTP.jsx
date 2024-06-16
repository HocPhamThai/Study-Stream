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
      setError('OTP không hợp lệ hoặc đã hết hạn')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Xác nhận OTP</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default EnterOTP
