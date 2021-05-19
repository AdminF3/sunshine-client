import ENDPOINTS from '../constants/endpoints';
import {
  PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAILURE,
  GET_PUBLIC_USERDATA_REQUEST, GET_PUBLIC_USERDATA_SUCCESS, GET_PUBLIC_USERDATA_FAILURE,
  UPLOAD_AVATAR_OF_USER_REQUEST, UPLOAD_AVATAR_OF_USER_SUCCESS, UPLOAD_AVATAR_OF_USER_FAILURE,
  CREATE_SUPERUSER_SUCCESS, CREATE_SUPERUSER_FAILURE,
  UPDATE_ANOTHER_USER_PROFILE_REQUEST, UPDATE_ANOTHER_USER_PROFILE_SUCCESS,
  UPDATE_ANOTHER_USER_PROFILE_FAILURE,
  GET_MY_USERDATA_REQUEST, GET_MY_USERDATA_SUCCESS, GET_MY_USERDATA_FAILURE
} from '../constants/actionTypes';

import { addAlert } from './alerts';

export function updateUserProfile(userProf) {
  const updateBodyObj = {
    name: userProf.name.trim(),
    telephone: userProf.telephone,
    valid: userProf.valid,
    country: userProf.country,
  };

  const config = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateBodyObj)
  };

  return (dispatch) => {
    dispatch({ type: PROFILE_UPDATE_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/user/' + userProf.id, config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (userProf.avatar instanceof File) {
          dispatch(uploadAvatarOfUser(userProf.id, userProf.avatar, 'private'));
        } else {
          dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });
        }
        dispatch(addAlert({ text: 'User profile was updated successfully', level: 'success' }));
      })
      .catch(err => {
        dispatch({ type: PROFILE_UPDATE_FAILURE });
        dispatch(addAlert({ text: err.message, level: 'error' }));
      });
  };
}

export function uploadAvatarOfUser(userId, avatar, userType) {
  const formData = new FormData();
  formData.append('file', avatar);
  formData.append('kind', 'avatar');

  const config = {
    method: 'POST',
    credentials: 'include',
    body: formData
  };

  return (dispatch) => {
    dispatch(dispatch({ type: UPLOAD_AVATAR_OF_USER_REQUEST }));
    return fetch(ENDPOINTS.SERVER + '/user/' + userId + '/upload', config)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      })
      .then(() => {
        dispatch({ type: UPLOAD_AVATAR_OF_USER_SUCCESS });
        if (userType === 'private') {
          dispatch(getMyUserData(userId));
        } else {
          dispatch(getPublicUserdata(userId));
        }
      })
      .catch(() => {
        dispatch({ type: UPLOAD_AVATAR_OF_USER_FAILURE });
        dispatch(addAlert({ text: 'Something went wrong! The avatar was not updated!', level: 'error' }));
      });
  };
}

// Create Superuser

export function createSuperuser(userProf) {
  const updateBodyObj = {
    name: userProf.name.trim(),
    telephone: userProf.telephone,
    valid: userProf.valid,
    country: userProf.country,
  };

  const config = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateBodyObj)
  };

  return (dispatch) => {
    dispatch({ type: GET_MY_USERDATA_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/user/' + userProf.id, config)
      .then(response => response.json().then(data => ({ data, response })))
      .then(({ data, response }) => {
        if (!response.ok) {
          dispatch({ type: CREATE_SUPERUSER_FAILURE });
          return Promise.reject(data);
        }
        dispatch({ type: CREATE_SUPERUSER_SUCCESS, payload: data });
        if (userProf.superuser) {
          dispatch(addAlert({ text: 'Successfully created new superuser!', level: 'success' }));
        } else {
          dispatch(addAlert({ text: 'Successfully removed Superuser rights!', level: 'success' }));
        }

      })
      .catch(err => {
        dispatch({ type: CREATE_SUPERUSER_FAILURE });
        dispatch(addAlert({ text: err.message, level: 'error' }));
      });
  };
}

// Update another user
export function updateAnotherUserProfile(userProf) {
  const updateBodyObj = {
    name: userProf.name.trim(),
    telephone: userProf.telephone,
    valid: userProf.valid,
    country: userProf.country,
  };

  const config = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateBodyObj)
  };

  return (dispatch) => {
    dispatch({ type: UPDATE_ANOTHER_USER_PROFILE_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/user/' + userProf.id, config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (userProf.avatar instanceof File) {
          dispatch(uploadAvatarOfUser(userProf.id, userProf.avatar, 'another'));
        } else {
          dispatch({ type: UPDATE_ANOTHER_USER_PROFILE_SUCCESS, payload: data });
        }
        dispatch(addAlert({ text: 'User profile was updated successfully', level: 'success' }));
      })
      .catch(err => {
        dispatch({ type: UPDATE_ANOTHER_USER_PROFILE_FAILURE });
        dispatch(addAlert({ text: err.message, level: 'error' }));
      });
  };
}

export function getMyUserData(userId) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  };

  return (dispatch) => {
    dispatch({ type: GET_MY_USERDATA_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/user/' + userId, config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        dispatch({ type: GET_MY_USERDATA_SUCCESS, payload: data });
      })
      .catch(err => {
        dispatch({ type: GET_MY_USERDATA_FAILURE });
        dispatch(addAlert({ text: err.message, level: 'error' }));
      });
  };
}

// Public profile
export function getPublicUserdata(userId) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  };

  return (dispatch) => {
    dispatch({ type: GET_PUBLIC_USERDATA_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/user/' + userId, config)
      .then(response => response.json().then(data => ({ data, response })))
      .then(({ data, response }) => {
        if (!response.ok) {
          dispatch({ type: GET_PUBLIC_USERDATA_FAILURE });
          return Promise.reject(data);
        }
        dispatch({ type: GET_PUBLIC_USERDATA_SUCCESS, payload: data });

      }).catch(() => dispatch({ type: GET_PUBLIC_USERDATA_FAILURE }));
  };
}
