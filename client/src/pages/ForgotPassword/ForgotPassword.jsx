import React, { useState } from 'react'
import PasswordResetFlow from '../../components/ForgotPassword/PasswordResetFlow'
import { forgotPassword } from '../../api/AuthRequest'
import './ForgotPassword.scss'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [error, setError] = useState('')
  const { t } = useTranslation('login')

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
          <h3 className='uppercase font-black'>{t('Forgot Password')}</h3>
          <span>{t('Please input your email to Reset password')}</span>
          <input
            style={{ width: '100%' }}
            className="infoInput"
            type="email"
            placeholder={t('Enter email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <span className="error">{error}</span>}
          <div className='flex justify-end'>
            <button className="hover:text-blue-600 flex items-center space-x-2">

              <a href="/auth" className='flex gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
                Back
              </a>
            </button>

            <button className="button infoButton" type="submit">
              {t('Send OTP')}
            </button>
          </div>
        </form>
      ) : (
        <PasswordResetFlow email={email} />
      )}
    </div>
  )
}

export default ForgotPassword
