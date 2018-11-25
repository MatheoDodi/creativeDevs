import axios from 'axios';
import * as actionTypes from './actionTypes';

export const handleAddPost = postData => dispatch => {
  dispatch(clearErrors());
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

export const handleGetSinglePost = id => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_POST,
        payload: null
      })
    );
};

// Set Loading
export const setLoading = () => ({
  type: actionTypes.POST_LOADING
});

export const handleDeletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: actionTypes.DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response
      })
    );
};

export const handleAddLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(handleGetPosts()))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response
      })
    );
};

export const handleRemoveLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(handleGetPosts()))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response
      })
    );
};

export const handleAddComment = (id, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${id}`, commentData)
    .then(res =>
      dispatch({
        type: actionTypes.GET_POST,
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

export const handleDeleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_POST,
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

export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS
});
