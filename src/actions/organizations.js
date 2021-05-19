import i18n from 'i18next';

import ENDPOINTS from '../constants/endpoints';
import { isResidentsCommunity } from '../constants/legalStatusTypes';
import {
  SET_ORGANIZATION_TYPE_FILTER,
  SEARCH_ORGANIZATIONS_REQUEST, SEARCH_ORGANIZATIONS_SUCCESS, SEARCH_ORGANIZATIONS_FAILURE,
  ALL_ORGANIZATIONS_REQUEST, ALL_ORGANIZATIONS_SUCCESS, ALL_ORGANIZATIONS_FAILURE,
  GET_SINGLE_ORGANIZATION_REQUEST, GET_SINGLE_ORGANIZATION_SUCCESS, GET_SINGLE_ORGANIZATION_FAILURE,
  MY_ORGANIZATIONS_REQUEST, MY_ORGANIZATIONS_SUCCESS, MY_ORGANIZATIONS_FAILURE,
  SET_LOGGED_USER_ROLE_IN_ORGANIZATION, SET_ALL_ORGANIZATIONS_NUMBER,
  SET_MY_ORGANIZATIONS_NUMBER, SEARCH_MY_ORGANIZATIONS_REQUEST,
  SEARCH_MY_ORGANIZATIONS_FAILURE, SEARCH_MY_ORGANIZATIONS_SUCCESS,
  ISFETCHING_SINGLE_ORGANIZATION_SET_DEFAULT, ISFETCHING_LIST_ORGANIZATION_SET_DEFAULT,
  THEIR_ORGANIZATIONS_REQUEST, THEIR_ORGANIZATIONS_SUCCESS, THEIR_ORGANIZATIONS_FAILURE
} from './../constants/actionTypes';
import { addAlert } from './alerts';
import { retrieveOrganizationRole } from '../utils/userRoles';

export function setLegalFormFilter(value) {
  return {
    type: SET_ORGANIZATION_TYPE_FILTER,
    value
  };
}

export function createOrUpateOrganization(data) {
  const operation = data.ID ? 'UPDATE' : 'REGISTER';
  const actionPrefix = `ORGANIZATION_${operation}`;
  const url = [
    ENDPOINTS.SERVER,
    'organization',
    data.ID || null,
  ].filter(v => Boolean(v)).join('/');

  return (dispatch) => {
    dispatch({ type: `${actionPrefix}_REQUEST` });
    const req = organizationRequest(data);

    return fetch(url, {
      method: operation === 'REGISTER' ? 'POST' : 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    }).then(response => {
      if (!response.ok) {
        return response.text().then(msg => {
          const m = msg.match(/duplicate key value violates unique constraint "(.*)"/);
          if (m) {
            const titleKey = req.legal_form === 4 ? 'organizations.errorRegisterTitle' : 'organizations.errorDuplicateTitle';
            const textKey = req.legal_form === 4 ? 'organizations.errCommunityExists' : 'organizations.errDuplicateKey';

            dispatch(addAlert({
              titleKey,
              textKey,
              level: 'error',
              alertType: 'notificationBox',
            }));
            throw new Error('conflict');
          }
          throw new Error(`${response.status}: ${response.statusText}`);
        }).catch(err => {
          throw new Error(err.message);
        });
      }
      return response.json();
    }).then(dataJSON => {
      if (data.logoUpload || Object.values(data.files || {}).length > 0) {
        const files = [];

        if (data.logoUpload) {
          const logoFD = new FormData();
          logoFD.append('file', data.logoUpload);
          logoFD.append('kind', 'logo');

          files.push(logoFD);
        }
        if (data.files) {
          Object.values(data.files).forEach(f => {
            const fd = new FormData();
            fd.append('file', f);
            files.push(fd);
          });
        }
        const c = {
          method: 'POST',
          credentials: 'include',
        };
        return Promise.all(
          files.map(f => fetch(`${ENDPOINTS.SERVER}/organization/${dataJSON._id}/upload`, { ...c, body: f }))
        ).then(responses => {
          if (!responses[0].ok) {
            throw new Error('Unhandled response!');
          }
          if (!data.logoUpload) {
            return dataJSON;
          }

          return {
            ...dataJSON,
            data: {
              ...dataJSON.data,
              logo: `/organization/${dataJSON._id}/${data.logoUpload.path}`,
            },
          };
        });
      }

      return dataJSON;
    }).then(dataJSON => {
      dispatch({
        type: `${actionPrefix}_SUCCESS`,
        data: dataJSON,
      });
      if (operation === 'REGISTER') {
        let textKey = 'organizations.organizationREGISTERSuccessInfo';
        if (isResidentsCommunity(dataJSON.data.legal_form)) {
          textKey = 'organizations.organizationREGISTERRCSuccessInfo';
        }

        dispatch(addAlert({
          titleKey: 'organizations.organizationREGISTERSuccessTitle',
          textKey,
          level: 'success',
          alertType: 'notificationBox',
        }));
      } else {
        dispatch(addAlert({
          text: 'Successfully updated information about organization!',
          level: 'success'
        }));
      }
      return dataJSON;
    }).catch((err) => {
      // @TODO (edimov): The only handled error ATM is `conflict`,
      // so display generic error if message is not `conflict`.
      if (err.message !== 'conflict') {
        dispatch({ type: `${actionPrefix}_FAILURE` });
        dispatch(addAlert({
          text: i18n.t('translations.organizations.saveError', { error: err.message }),
          level: 'error',
        }));
      }

      return err;
    });
  };
}

function organizationRequest(data) {
  const req = {
    name: data.name,
    vat: data.vat,
    address: data.address,
    registered: new Date(data.registered),
    registration_number: data.registration_number,
    email: data.email,
    telephone: data.telephone,
    website: `http://${data.website.replace(/^http:\/\//, '')}`,
    legal_form: parseInt(data.legal_form, 10),
    country: data.country,
    roles: { ...data.roles },
  };

  return req;
}

function dataDepProccessing(data) {

  let documents = data.documents;
  const dependencies = data.dependencies;

  if (documents === null) {
    documents = [];
  }

  // Overrides the UUIDs in roles with the actual Objects of the Users
  documents.forEach((el, index) =>
    Object.entries(el.data.roles).forEach(role =>
      Object.values(dependencies).forEach(dep =>
        dep._id === role[1] ? documents[index].data.roles[role[0]] = dep : '')));

  return documents;
}

export function getAllOrganizations(offset = 0, limit = 12) {

  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };

  const params = { offset };
  if (limit) {
    params.limit = limit;
  }
  const queryParams = new URLSearchParams(params);

  return dispatch => {
    dispatch({ type: ALL_ORGANIZATIONS_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/organization?${queryParams}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        dispatch({ type: SET_ALL_ORGANIZATIONS_NUMBER, payload: response.headers.get('X-Documents-Count') });
        return response.json();
      })
      .then(data => {
        // SUCCESS -> STOP FETCHING
        dispatch({ type: ALL_ORGANIZATIONS_SUCCESS, payload: dataDepProccessing(data) });
      })
      .catch(() => {
        dispatch({ type: ALL_ORGANIZATIONS_FAILURE });
        dispatch(addAlert({ text: 'Something went wrong! Public organizations were not loaded!', level: 'error' }));
      }
      );
  };
}

export function getMyOrganizations(userId, isMine, offset = 0, limit = 11) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };

  const params = { offset };
  if (limit) {
    params.limit = limit;
  }
  const queryParams = new URLSearchParams(params);

  return dispatch => {
    if (isMine) {
      dispatch({ type: MY_ORGANIZATIONS_REQUEST });
    } else {
      dispatch({ type: THEIR_ORGANIZATIONS_REQUEST });
    }
    return fetch(ENDPOINTS.SERVER + `/user/${userId}/organizations?${queryParams}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        if (isMine) {
          dispatch({ type: SET_MY_ORGANIZATIONS_NUMBER, payload: response.headers.get('X-Documents-Count') });
        }
        return response.json();
      }).then(data => {
        if (isMine) {
          dispatch({ type: MY_ORGANIZATIONS_SUCCESS, payload: dataDepProccessing(data) });
        } else {
          dispatch({ type: THEIR_ORGANIZATIONS_SUCCESS, payload: dataDepProccessing(data) });
        }
      }).catch(() => {
        if (isMine) {
          dispatch({ type: MY_ORGANIZATIONS_FAILURE });
        } else {
          dispatch({ type: THEIR_ORGANIZATIONS_FAILURE });
        }
        dispatch(addAlert({ text: 'Something went wrong! Your organizations were not loaded!', level: 'error' }));
      });
  };
}

export function findOrganizations(q, offset = 0, limit = 12, p) {
  const params = { ...p, offset, limit };

  return searchOrganizations(q, null, params.offset, params.limit, params);
}

export function searchOrganizations(search, filter, offset = 0, limit = 12, other = {}) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };
  const params = { search, offset, limit, ...other };
  if (filter) {
    params.legal_form = filter;
  }
  const queryParams = new URLSearchParams(params);

  return (dispatch) => {
    dispatch({ type: SEARCH_ORGANIZATIONS_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/organization?${queryParams}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        dispatch({ type: SET_ALL_ORGANIZATIONS_NUMBER, payload: response.headers.get('X-Documents-Count') });
        return response.json();
      })
      .then(data => {
        // SUCCESS -> STOP FETCHING
        dispatch({ type: SEARCH_ORGANIZATIONS_SUCCESS, payload: dataDepProccessing(data) });
      })
      .catch((err) => dispatch({ type: SEARCH_ORGANIZATIONS_FAILURE, error: err }));
  };
}

export function searchMyOrganizations(userId, params) {
  const queryParams = new URLSearchParams(params);
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };

  return (dispatch) => {
    dispatch({ type: SEARCH_MY_ORGANIZATIONS_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/user/${userId}/organizations?${queryParams}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        dispatch({ type: SET_MY_ORGANIZATIONS_NUMBER, payload: response.headers.get('X-Documents-Count') });
        return response.json();
      })
      .then(data => {
        // SUCCESS -> STOP FETCHING
        dispatch({ type: SEARCH_MY_ORGANIZATIONS_SUCCESS, payload: dataDepProccessing(data) });
      })
      .catch(() => dispatch({ type: SEARCH_MY_ORGANIZATIONS_FAILURE }));
  };
}

export function getSingleOrganization(id, userIsLogged) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };

  return (dispatch) => {
    dispatch({ type: GET_SINGLE_ORGANIZATION_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/organization/${id}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (userIsLogged) {
          const role = retrieveOrganizationRole(userIsLogged, data);
          dispatch({ type: SET_LOGGED_USER_ROLE_IN_ORGANIZATION, payload: role });
        }
        dispatch({ type: GET_SINGLE_ORGANIZATION_SUCCESS, payload: data });
      })
      .catch(() => {
        dispatch({ type: GET_SINGLE_ORGANIZATION_FAILURE });
      }
      );
  };
}

export function isFetchingSingleOrganizationSetDefault() {
  return (dispatch) => {
    dispatch({ type: ISFETCHING_SINGLE_ORGANIZATION_SET_DEFAULT });
  };
}

export function isFetchingListOrganizationSetDefault() {
  return (dispatch) => {
    dispatch({ type: ISFETCHING_LIST_ORGANIZATION_SET_DEFAULT });
  };
}
