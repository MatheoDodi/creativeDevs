import * as actionTypes from '../actions/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return action.payload.data;
    case actionTypes.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
