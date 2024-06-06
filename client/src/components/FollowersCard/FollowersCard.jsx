import React, { useEffect, useState } from 'react'
import './FollowersCard.scss'
import User from '../User/User'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../api/UserRequest'

function FollowersCard() {
  const [persons, setPersons] = useState([])
  const { user } = useSelector((state) => state.authReducer.authData)

  const fetchPersons = async () => {
    const { data } = await getAllUser()
    setPersons(data)
  }

  useEffect(() => {
    fetchPersons()
  }, [])
  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />
        }
        return null
      })}
    </div>
  )
}

export default FollowersCard
