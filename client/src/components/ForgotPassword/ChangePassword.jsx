import React, { useState } from 'react'
import { resetPassword } from '../../api/AuthRequest'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ChangePassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      if (newPassword.length < 6)
        setError('Password needs to be 6 characters or more')
      else {
        setError('Re-entered password does not match')
      }
    } else {
      try {
        await resetPassword(email, newPassword)
        toast.success('Mật khẩu đã được đặt lại thành công', {
          duration: 2000,
        })
        setTimeout(() => {
          navigate('/home')
        }, 2000)
      } catch (error) {
        setError('Có lỗi xảy ra, vui lòng thử lại')
      }
    }
  }

  return (
    <div className="container">
      <form
        style={{
          gap: '1.5rem',
        }}
        className="infoForm formContainer"
        onSubmit={handleSubmit}
      >
        <h3>Change Password</h3>
        <span>Enter your new password</span>
        <input
          className="infoInput"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          className="infoInput"
          type="password"
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <span className="error">{error}</span>}
        <button
          style={{ width: '100%' }}
          className="button infoButton"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
