import React, { useState, useRef } from 'react'
import ProfileImage from '../../img/profileImg.jpg'
import './PostShare.scss'
import { UilScenery } from '@iconscout/react-unicons'
import { UilPlayCircle } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { UilSchedule } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../../actions/uploadAction'

const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading)
  const [image, setImage] = useState(null)
  const imageRef = useRef()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const desc = useRef()
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage(img)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }

    if (image) {
      const data = new FormData()
      const filename = Date.now() + image.name

      data.append('name', filename)
      data.append('file', image)
      newPost.image = filename
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
      dispatch(uploadPost(newPost))
      reset()
    }
  }

  const reset = () => {
    setImage(null)
    desc.current.value = ''
  }
  return (
    <div className="PostShare">
      <img src={ProfileImage} alt="" />
      <div>
        <input ref={desc} type="text" placeholder="What's happening" required />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: 'var(--photo)' }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: 'var(--video)' }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: 'var(--location)' }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: 'var(--shedule)' }}>
            <UilSchedule />
            Schedule
          </div>
          <button
            className="button post-share-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Share'}
          </button>
        </div>
        <div style={{ display: 'none' }}>
          <input
            type="file"
            name="myImage"
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img
              src={URL.createObjectURL(image)}
              alt=""
              style={{ borderRadius: '0.5rem' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostShare
