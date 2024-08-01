import React from 'react'
import './ProfileCard.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProfileCard({ location }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const { user } = useSelector((state) => state.authReducer.authData)
  const { posts } = useSelector((state) => state.postReducer)

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + 'defaultCover.jpg'
          }
          alt=""
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + 'defaultProfile.jpg'
          }
          alt=""
        />
      </div>

      <div className="ProfileName">
        <span>{user.firstname + ' ' + user.lastname}</span>
        <span>{user.workAt ? user.workAt : 'Your Work'}</span>
      </div>

      {/* <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followings.length}</span>
            <span>Followings</span>
          </div>
          <div className="verticalLine"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          {location === 'ProfilePage' && (
            <>
              <div className="verticalLine"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div> */}

      {location === 'ProfilePage' ? (
        ''
      ) : (
        <Link to={'/profile/' + user._id}>
          <span>My Profile</span>
        </Link>
      )}
    </div>
  )
}

export default ProfileCard
