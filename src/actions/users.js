import i18n from 'i18next';
import { addAlert } from './alerts';
import {
  GET_ALLUSERS_SUCCESS,
  GET_ALLUSERS_FAILURE,
  GET_ALLUSERS_REQUEST,
  SET_USERS_FILTER,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE,
  SET_ALL_USERS_NUMBER,
  ISFETCHING_USERS_SET_DEFAULT,
  SET_ALL_USERS_PD,
} from '../constants/actionTypes';
import ENDPOINTS from '../constants/endpoints';
import { query } from '../utils/url';

export function getAllUsers(offset = 0, limit = 10) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return (dispatch) => {
    dispatch({ type: GET_ALLUSERS_REQUEST, isUsersFetching: true })
    return fetch(ENDPOINTS.SERVER + `/user?limit=${limit}&offset=${offset}`, config)
      .then(response => {
        if (!response.ok) {
          dispatch({ type: GET_ALLUSERS_FAILURE, isUsersFetching: false });
          return Promise.reject(response);
        }
        const allUsers = response.headers.get('X-Documents-Count');
        dispatch({ type: SET_ALL_USERS_NUMBER, payload: allUsers });
        return response.json();
      })
      .then(res => {
        dispatch({ type: GET_ALLUSERS_SUCCESS, isUsersFetching: false, users: res });
      })
      .catch(err => {
        dispatch({ type: GET_ALLUSERS_FAILURE, isUsersFetching: false });
        if (err && err.message === 'Failed to fetch') {
          dispatch(addAlert({ text: i18n.t('translations:adminActions.failedToFetch'), level: 'error' }));
        } else {
          dispatch(addAlert({ text: i18n.t('translations:errors.internal'), level: 'error' }));
        }
      });
  }
}

export function setUsersFilter(value) {
  return (dispatch) => {
    dispatch({ type: SET_USERS_FILTER, payload: value })
  }
}

export function searchUsers(search, filter, offset = 0, limit = 10, isPD) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };

  let params = { offset };
  if (search) {
    params.search = search;
  }
  if (filter) {
    if (typeof filter === 'object') {
      params = { ...params, ...filter };
    } else {
      params.status = filter;
    }
  }
  if (limit) {
    params.limit = limit;
  }

  const queryString = query(params);

  return (dispatch) => {
    if (!isPD) {
      dispatch({ type: SEARCH_USERS_REQUEST });
    }

    return fetch(ENDPOINTS.SERVER + `/user?${queryString}`, config)
      .then(response => {
        if (!response.ok) {
          dispatch({ type: SEARCH_USERS_FAILURE });
          return Promise.reject(response);
        }
        const allUsers = response.headers.get('X-Documents-Count');
        dispatch({ type: SET_ALL_USERS_NUMBER, payload: allUsers });
        return response.json();
      })
      .then(res => {
        if (isPD) {
          dispatch({ type: SET_ALL_USERS_PD, payload: res });
        } else {
          dispatch({ type: SEARCH_USERS_SUCCESS, payload: res });
        }
      })
      .catch(err => {
        dispatch({ type: SEARCH_USERS_FAILURE });
        if (err && err.message === 'Failed to fetch') {
          dispatch(addAlert({ text: i18n.t('translations:adminActions.failedToFetch'), level: 'error' }));
        } else {
          dispatch(addAlert({ text: i18n.t('translations:errors.internal'), level: 'error' }));
        }
      });
  };
}

const countryRoles = [
  'portfolio_director',
  'data_protection_officer',
  'country_admin',
  'fund_manager',
  'investor',
];

const platformRoles = [
  'platform_manager',
  'admin_network_manager',
];

export function getUsersByPlatformRoles(roles = { countryRoles, platformRoles }) {
  return (dispatch) => {
    try {
      dispatch({ type: 'GET_PLATFORM_ROLES_USERS' });
      const queryString = query({ country_roles: roles.countryRoles, platform_roles: roles.platformRoles });
      fetch(`${ENDPOINTS.SERVER}/user?${queryString}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
          }

          return response.json();
        })
        .then(({ documents: data }) => dispatch({
          type: 'GET_PLATFORM_ROLES_USERS#SUCCESS',
          payload: { users: data },
        }))
        .catch((err) => dispatch({
          type: 'GET_PLATFORM_ROLES_USERS#ERROR',
          error: `Oops... an unexpected error occured: ${err.message}`,
        }));
    } catch (err) {
      dispatch({ type: 'GET_PLATFORM_ROLES_USERS#ERROR', error: err.message });
    }
  };
}

export function isFetchingUsersSetDefault() {
  return (dispatch) => {
    dispatch({ type: ISFETCHING_USERS_SET_DEFAULT });
  };
}
