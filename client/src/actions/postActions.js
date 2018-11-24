import axios from 'axios';
import * as actionTypes from './actionTypes';

export const handleAddPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: actionTypes.ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response
      })
    );
};

export const handleGetPosts = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: actionTypes.GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_POSTS,
        payload: null
      })
    );
};

// Set Loading
export const setLoading = () => ({
  type: actionTypes.POST_LOADING
});
