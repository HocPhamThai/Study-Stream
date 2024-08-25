import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserTable from '../../components/UserTable/UserTable'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import Logo from '../../img/logo.png'
import AvatarDropdown from '../../components/AvatarDropdown/AvatarDropdown'
import TopicTable from '../../components/TopicTable/TopicTable'

function AdminTopic() {
  const { user } = useSelector((state) => state.authReducer.authData || {})
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/auth')
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  return (
    <div>
      <div className='grid grid-cols-6 p-0'>
        <div className='col-start-1 col-end-2 '>
          <AdminSidebar />
        </div>
        <div className='col-start-2 col-end-7    '>
          {/* <UserTable dataAdmin={user} /> */}
          <TopicTable />
        </div>
      </div>
    </div>

  )
}

export default AdminTopic
