import { Modal, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { uploadImage } from '../../actions/uploadAction'
import { updateUser } from '../../actions/UserAction'
import { useTranslation } from 'react-i18next'

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme()
  const dispatch = useDispatch()
  const { password, ...other } = data
  const [formData, setFormData] = useState(other)
  const [profileImg, setProfileImg] = useState(null)
  const [coverImg, setCoverImg] = useState(null)
  const param = useParams()
  const { t } = useTranslation(['profile'])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      e.target.name === 'profileImage' ? setProfileImg(img) : setCoverImg(img)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let userData = formData
    if (profileImg) {
      const data = new FormData()
      const filename = Date.now() + profileImg.name
      data.append('name', filename)
      data.append('file', profileImg)
      userData.profilePicture = filename
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    if (coverImg) {
      const data = new FormData()
      const filename = Date.now() + coverImg.name
      data.append('name', filename)
      data.append('file', coverImg)
      userData.coverPicture = filename
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }

    dispatch(updateUser(param.id, userData))
    setModalOpened(false)
  }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3 className='font-bold text-lg'>{t('information')}</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            value={formData.firstname}
            name="firstname"
            placeholder={t('first name')}
            onChange={handleChange}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder={t('last name')}
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="workAt"
            placeholder={t('work')}
            onChange={handleChange}
            value={formData.workAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="liveIn"
            placeholder={t('live')}
            onChange={handleChange}
            value={formData.liveIn}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder={t('country')}
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder={t('status')}
            name="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>

        <div>
          <div>
            <div>{t('profile image')}</div>
            <input type="file" name="profileImage" onChange={onImageChange} />
          </div>
          <div>
            <div>{t('cover image')}</div>
            <input type="file" name="coverImage" onChange={onImageChange} />
          </div>
        </div>

        <button className="button infoButton" onClick={handleSubmit}>
          {t('update')}
        </button>
      </form>
    </Modal>
  )
}

export default ProfileModal
