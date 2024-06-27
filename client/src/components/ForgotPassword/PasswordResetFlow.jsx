import React, { useState } from 'react'
import ChangePassword from './ChangePassword'
import EnterOTP from './EnterOTP'

const PasswordResetFlow = ({ email }) => {
  const [otpVerified, setOtpVerified] = useState(false)
  const [otp, setOtp] = useState('')

  const handleOTPSuccess = (enteredOtp) => {
    setOtp(enteredOtp)
    setOtpVerified(true)
  }

  return <div>{!otpVerified ? <EnterOTP email={email} onOTPSuccess={handleOTPSuccess} /> : <ChangePassword email={email} />}</div>
}

export default PasswordResetFlow
