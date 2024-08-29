import React from 'react'
import { useSelector } from 'react-redux'
import UserTable from '../../components/UserTable/UserTable'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import Logo from '../../img/logo.png'
import AvatarDropdown from '../../components/AvatarDropdown/AvatarDropdown'

function AdminHome() {
  const { user } = useSelector((state) => state.authReducer.authData)

  return (
    <div>
      <div className='grid grid-cols-6 p-0'>
        <div className='col-start-1 col-end-2 '>
          <AdminSidebar />
        </div>
        <div className='col-start-2 col-end-7    '>
          <UserTable dataAdmin={user} />
        </div>
      </div>
    </div>

  )
}

export default AdminHome
