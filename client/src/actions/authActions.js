import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as actionTypes from './actionTypes';
import setAuthToken from '../utils/setAuthToken';

const getErrors = errors => ({
  type: actionTypes.GET_ERRORS,
  payload: errors.response
});

export const handleRegisterUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch(getErrors(err)));
};

export const handleLoginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch(getErrors(err)));
};

export const setCurrentUser = decoded => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: decoded
});

export const handleLogoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
