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

export const handleGetCurrentProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: null
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
        payload: err.response
      })
    );
};

export const setProfileLoading = () => ({
  type: actionTypes.PROFILE_LOADING
});

export const clearProfile = () => ({
  type: actionTypes.CLEAR_CURRENT_PRIFLE
});

export const handleAddExperience = (newExp, history) => dispatch => {
  axios
    .post('/api/profile/experience', newExp)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response
      })
    );
};

export const handleDeleteExperience = expId => dispatch => {
  axios
    .delete(`api/profile/experience/${expId}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_PROFILE,
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

export const handleDeleteEducation = eduId => dispatch => {
  axios
    .delete(`api/profile/education/${eduId}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_PROFILE,
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

export const handleAddEducation = (newEdu, history) => dispatch => {
  axios
    .post('/api/profile/education', newEdu)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response
      })
    );
};

export const handleGetAllProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('api/profile/all')
    .then(res =>
      dispatch({
        type: actionTypes.GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_PROFILES,
        payload: null
      })
    );
};

export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: actionTypes.SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: err.response
        })
      );
  }
};
