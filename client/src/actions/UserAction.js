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

export { updateUser }
