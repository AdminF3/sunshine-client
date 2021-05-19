import i18n from 'i18next';
import ENDPOINTS from '../constants/endpoints';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  FORGOT_PASS_RESET_STATE, RESTORE_PASSWORD_REQUEST, RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILURE, TOKEN_VERIFICATION_REQUEST, TOKEN_VERIFICATION_SUCCESS,
  TOKEN_VERIFICATION_FAILURE, CONFIRM_USER
} from './../constants/actionTypes';
import { addAlert } from './alerts';
import { getRoleCountries } from '../utils/userRoles';

export function confirmUser(pathname, redirect) {
  let config = {
    method: 'POST',
    credentials: 'include',
  }

  return dispatch => {
    dispatch({ type: CONFIRM_USER });

    return fetch(`${ENDPOINTS.SERVER}${pathname}`, config)
      .then(response => {
        if (response.ok) {
          redirect();
          dispatch(addAlert({ text: 'User registration confirmed!', level: 'success' }));
        } else {
          redirect();
          dispatch(addAlert({ text: 'Something went wrong! The user registration was not confirmed!', level: 'error' }));
        }
      })
  }
}

export function loginUser(creds) {
  let config = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ "email": creds.email, "password": creds.password })
  }

  return dispatch => {
    // START FETCHING
    dispatch(loginRequest());

    return fetch(ENDPOINTS.SERVER + '/auth/login', config)
      .then(status => {
        if (status.ok) {
          status.json().then(data => {
            const roleCountries = getRoleCountries(data, 'portfolio_director');
            dispatch(loginSuccess(data, roleCountries));
            dispatch(addAlert({ text: 'Successfully logged in!', level: 'success' }));
          })
        } else if (status.status === 401) {
          dispatch(loginError());
          dispatch(addAlert({ text: 'Wrong email or password!', level: 'error' }));
        } else if (!status.ok) {
          // ERROR -> STOP FETCHING
          return Promise.reject();
        }
      })
      .catch(err => {
        dispatch(loginError());
        dispatch(addAlert({ text: 'We are Sorry.Something went wrong!', level: 'error' }));
      });
  };
}

export function registerUser(creds, redirect) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({
      "email": creds.fieldOne,
      "password": creds.fieldTwo,
      "name": creds.fieldThree,
      "country": creds.fieldFour,
    })
  }

  return dispatch => {

    // START FETCHING
    dispatch(registerRequest());

    return fetch(ENDPOINTS.SERVER + '/user', config)
      .then(status => status.json().then(data => ({ data, status })))
      .then(({ data, status }) => {
        if (!status.ok) {
          // ERROR -> STOP FETCHING
          return Promise.reject(data)
        } else {
          // SUCCESS -> STOP FETCHING
          dispatch(registerSuccess());
          redirect();
          dispatch(addAlert({ text: 'Confirm your email address. We have sent an email with a confirmation link to your email address.', level: 'success', timeout: 20000 }));
        }
      })
      .catch(err => {
        dispatch(registerError(err));
        dispatch(addAlert({ text: 'Something went wrong! Unsuccessful registration', level: 'error' }));
      });
  };
}

const deleteCookie = (name) => {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
};

export function logoutUser(redirect, onSuccess) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' },
  };

  return (dispatch) => {
    dispatch(logoutRequest());
    return fetch(ENDPOINTS.SERVER + '/auth/logout', config)
      .then(({ data, status }) => {
        if (status !== 200) {
          return Promise.reject(data);
        }

        deleteCookie('_session');
        if (typeof redirect === 'function') {
          redirect();
        }

        localStorage.removeItem('state');
        dispatch(logoutSuccess());

        if (typeof onSuccess === 'function') {
          return onSuccess();
        }
        return dispatch(addAlert({ text: 'Successfully logged out!', level: 'success' }));
      }).catch(err => {
        dispatch(logoutError(err));
        dispatch(addAlert({ text: 'Something went wrong! Logout failed!', level: 'error' }));
      });
  };
}

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: '',
  };
}

function loginSuccess(user, roleCountries) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: user._id,
    data: user,
    countryAdminCountries: roleCountries
  };
}

function loginError() {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: '',
  }
}

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

function logoutError() {
  return {
    type: LOGOUT_FAILURE,
    isFetching: false,
    isAuthenticated: true,
  }
}

function registerRequest() {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: ''
  }
}

function registerSuccess() {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    isAuthenticated: '',
  }
}

function registerError() {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: true,
  }
}

export function changePassword(params) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    credentials: 'include',
    body: JSON.stringify({
      "old": params.currentPassword,
      "new": params.newPassword
    })
  }

  return (dispatch) => {
    dispatch(changePasswordRequest());
    return fetch(ENDPOINTS.SERVER + '/auth/change_password', config)
      .then(({ data, status }) => {
        if (status !== 200) {
          dispatch(changePasswordError());
          return Promise.reject(data)
        } else {
          dispatch(changePasswordSuccess(data));
          dispatch(addAlert({ text: 'Successfully changed password!', level: 'success' }));
        }
      }).catch(err => {
        dispatch(registerError(err))
        dispatch(addAlert({ text: 'Password was not changed!', level: 'error' }));
      }
      );
  }
}

function changePasswordRequest() {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    isFetching: true,
    passwordChanged: false
  }
}

function changePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    isFetching: false,
    passwordChanged: true
  }
}

function changePasswordError() {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    isFetching: false,
    passwordChanged: false
  }
}

export function forgotPassword(email) {
  const config = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' },
    body: email
  };

  return (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/auth/forgotten_password', config)
      .then(response => {
        if (!response.ok) {
          throw response.status;
        } else {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS });
          dispatch(addAlert({ text: i18n.t('translations:auth.sentEmail'), level: 'success' }));
        }
      }).catch(err => {
        if (err === 400) {
          dispatch({ type: FORGOT_PASSWORD_FAILURE });
          dispatch(addAlert({ text: i18n.t('translations:auth.emailNotRegistered'), level: 'error' }));
        }
        if (err === 500) {
          dispatch({ type: FORGOT_PASSWORD_FAILURE });
          dispatch(addAlert({ text: i18n.t('translations:auth.internalServer'), level: 'error' }));
        }
      });
  };
}

export function forgotPassResetState() {
  return dispatch => {
    dispatch(forgotPassReset())
  }
}

function forgotPassReset() {
  return {
    type: FORGOT_PASS_RESET_STATE,
    forgotPassSuccess: false,
    forgotPassFail: false,
    isLoading: false
  }
}

export function restorePassword(creds) {
  const config = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' },
    body: creds.password
  };

  return (dispatch) => {
    dispatch({ type: RESTORE_PASSWORD_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/auth/forgotten_password/' + creds.token, config)
      .then(response => {
        if (!response.ok) {
          throw response.status;
        }
        dispatch({ type: RESTORE_PASSWORD_SUCCESS });
        dispatch(addAlert({ text: i18n.t('translations:auth.newPasswordSet'), level: 'success' }));
      }).catch(() => {
        dispatch({ type: RESTORE_PASSWORD_FAILURE });
        dispatch(addAlert({ text: i18n.t('translations:auth.passwordNotChanged'), level: 'error' }));
      });
  };
}

export function tokenVerification(token) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };

  return (dispatch) => {
    dispatch({ type: TOKEN_VERIFICATION_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/auth/forgotten_password/' + token, config)
      .then(response => {
        if (!response.ok) {
          throw response.status;
        } else {
          dispatch({ type: TOKEN_VERIFICATION_SUCCESS });
        }
      }).catch((err) => {
        if (err) {
          dispatch({ type: TOKEN_VERIFICATION_FAILURE });
          dispatch(addAlert({ text: i18n.t('translations:auth.resetTokenExpired'), level: 'error' }));
        }
      });
  };
}
