const initialState = {
  posts: [],
  loading: false,
  error: false,
  uploading: false,
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_START':
      return { ...state, uploading: true, error: false }
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      }
    case 'UPLOAD_FAIL':
      return { ...state, uploading: false, error: true }
    case 'TIMELINE_POSTS_START':
      return { ...state, loading: true, error: false }
    case 'TIMELINE_POSTS_SUCCESS':
      return { ...state, posts: action.data, loading: false, error: false }
    case 'TIMELINE_POSTS_FAIL':
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

export default postReducer
