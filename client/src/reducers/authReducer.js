const initialState = {
  authData: null,
  loading: false,
  error: false,
  updateLoading: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //case 'AUTH':
    case 'AUTH_START':
      return { ...state, loading: true, error: false }
    case 'AUTH_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return { ...state, authData: action.data, loading: false, error: false }
    case 'AUTH_FAIL':
      return { ...state, loading: false, error: true }
    case 'AUTH_LOGOUT':
      localStorage.clear()
      return { ...state, authData: null, loading: false, error: false }
    // case 'UPDATE_USER':
    case 'UPDATE_USER_START':
      return { ...state, updateLoading: true, error: false }
    case 'UPDATE_USER_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        error: false,
      }
    case 'UPDATE_USER_FAIL':
      return { ...state, updateLoading: false, error: true }
    // case 'FOLLOW_USER':
    case 'FOLLOW_USER':
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            followings: [...state.authData.user.followings, action.data],
          },
        },
      }
    case 'UNFOLLOW_USER':
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            followings: [
              ...state.authData.user.followings.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      }
    default:
      return state
  }
}
export default authReducer
