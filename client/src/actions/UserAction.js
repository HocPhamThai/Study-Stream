import * as userApi from '../api/UserRequest'

const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_USER_START' })
  try {
    const { data } = await userApi.updateUser(id, formData)
    dispatch({ type: 'UPDATE_USER_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'UPDATE_USER_FAIL' })
  }
}

const followUser = (id, data) => async (dispatch) => {
  await userApi.followUser(id, data)
  dispatch({ type: 'FOLLOW_USER' })
}

const unFollowUser = (id, data) => async (dispatch) => {
  await userApi.unFollowUser(id, data)
  dispatch({ type: 'UNFOLLOW_USER' })
}

export { updateUser, followUser, unFollowUser }
