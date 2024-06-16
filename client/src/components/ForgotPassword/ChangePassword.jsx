import React, { useState } from 'react'
import { resetPassword } from '../../api/AuthRequest'
import { useNavigate } from 'react-router-dom'

const ChangePassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await resetPassword(email, newPassword)
      setSuccess('Mật khẩu đã được đặt lại thành công')
      setTimeout(() => {
        navigate('/home')
      }, 2000)
    } catch (error) {
      setError('Có lỗi xảy ra, vui lòng thử lại')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Đặt lại mật khẩu</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  )
}

export default ChangePassword
