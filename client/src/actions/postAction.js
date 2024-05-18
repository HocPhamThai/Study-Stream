import * as postApi from '../api/PostRequest'

const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: 'TIMELINE_POSTS_START' })
  try {
    const { data } = await postApi.getTimeLinePosts(id)
    dispatch({ type: 'TIMELINE_POSTS_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'TIMELINE_POSTS_FAIL' })
    console.log(error)
  }
}
export { getTimelinePosts }
