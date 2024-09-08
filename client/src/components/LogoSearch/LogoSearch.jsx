import React from 'react'
import Logo from './logo.png'
import { UilSearch } from '@iconscout/react-unicons'
import './LogoSearch.scss'
import { useTranslation } from 'react-i18next'

function LogoSearch() {
  const { t } = useTranslation(['profile'])

  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search">
        <input type="text" placeholder={t('explore')} />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  )
}

export default LogoSearch
