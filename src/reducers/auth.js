import {
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  RESTORE_PASSWORD_REQUEST, RESTORE_PASSWORD_SUCCESS, RESTORE_PASSWORD_FAILURE,
  TOKEN_VERIFICATION_REQUEST, TOKEN_VERIFICATION_SUCCESS, TOKEN_VERIFICATION_FAILURE,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
} from './../constants/actionTypes';

export default function authReducer(state = {
  isLoading: false,
  isFetching: false,
  passwordChanged: false,
  tokenVerified: true,
}, action) {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        passwordChanged: false
      });
    case CHANGE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        passwordChanged: true
      });
    case CHANGE_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        passwordChanged: false
      });
    case FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case FORGOT_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case RESTORE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case RESTORE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case RESTORE_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case TOKEN_VERIFICATION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        tokenVerified: true
      });
    case TOKEN_VERIFICATION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        tokenVerified: true
      });
    case TOKEN_VERIFICATION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        tokenVerified: false
      });
    default:
      return state;
  }
}
