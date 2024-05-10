import React from 'react'
import './FollwersCard.css'
import { Followers } from '../../Data/FollowersData'

const FollowersCard = () => {
  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>

      {Followers.map((follower, index) => {
        return (
          <div className="follower">
            <div>
              <img className="followerImage" src={follower.img} alt="" />
              <div className="name">
                <span>{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className="button fc-button">Follow</button>
          </div>
        )
      })}
    </div>
  )
}

export default FollowersCard
