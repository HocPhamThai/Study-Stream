import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import EntriesTable from '../../components/EntriesTable/EntriesTable'
import { Link, useParams } from 'react-router-dom'

function AdminEntries() {
  const { topicIdProps } = useParams()
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
          <EntriesTable topicIdProps={topicIdProps} />
        </div>
      </div>
    </div>

  )
}

export default AdminEntries
