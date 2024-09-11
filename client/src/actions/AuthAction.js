import * as AuthApi from '../api/AuthRequest'

const logIn = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' })
  try {
    const { data } = await AuthApi.logIn(formData)
    localStorage.setItem('accessToken', data.accessToken)
    dispatch({ type: 'AUTH_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'AUTH_FAIL', error: error.response.data.error })
  }
}

const signUp = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' })
  try {
    const { data } = await AuthApi.signUp(formData)
    localStorage.setItem('accessToken', data.accessToken)
    dispatch({ type: 'AUTH_SUCCESS', data: data })
    return data
  } catch (error) {
    dispatch({ type: 'AUTH_FAIL', error: error.response.data.error })
  }
}

const logOut = () => async (dispatch) => {
  localStorage.clear()
  dispatch({ type: 'AUTH_LOGOUT' })
}

export { logIn, signUp, logOut }
