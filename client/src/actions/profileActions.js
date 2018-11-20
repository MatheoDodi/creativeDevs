import axios from 'axios';
import * as actionTypes from './actionTypes';

export const handleGetCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: {}
      })
    );
};

export const handleCreateProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setProfileLoading = () => ({
  type: actionTypes.PROFILE_LOADING
});

export const clearProfile = () => ({
  type: actionTypes.CLEAR_CURRENT_PRIFLE
});
