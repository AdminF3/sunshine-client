import i18n from 'i18next';

import ENDPOINTS from '../constants/endpoints';
import {
  SET_ASSET_TYPE_FILTER, CLEAR_MY_ASSETS,
  SEARCH_ASSETS_REQUEST, SEARCH_ASSETS_SUCCESS, SEARCH_ASSETS_FAILURE,
  SEARCH_MY_ASSETS_REQUEST, SEARCH_MY_ASSETS_SUCCESS, SEARCH_MY_ASSETS_FAILURE,
  ALL_ASSET_REQUEST, ALL_ASSET_SUCCESS, ALL_ASSET_FAILURE,
  GET_SINGLE_ASSET_REQUEST, GET_SINGLE_ASSET_SUCCESS, GET_SINGLE_ASSET_FAILURE,
  GET_MYASSETS_REQUEST, GET_MYASSETS_SUCCESS, GET_MYASSETS_FAILURE,
  SET_ALL_ASSETS_NUMBER, SET_MY_ASSETS_NUMBER, SET_LOGGED_USER_ROLE_IN_ASSET,
  ISFETCHING_SINGLE_ASSET_SET_DEFAULT, ISFETCHING_LIST_ASSET_SET_DEFAULT,
} from './../constants/actionTypes';

import { addAlert } from './alerts';
import { retrieveAssetRole } from '../utils/userRoles';

export function searchAssets(value, filter, offset = 0, limit = 12) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: {'Content-Type': 'text/plain'}
  };

  return (dispatch) => {
    dispatch({ type: SEARCH_ASSETS_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/asset?search=${value}&building_type=${filter}&limit=${limit}&offset=${offset}`, config)
      .then(response => {
        if (!response.ok) {
          dispatch({ type: SEARCH_ASSETS_FAILURE });
          return Promise.reject(response);
        }
        const allAsets = response.headers.get('X-Documents-Count');
        dispatch({ type: SET_ALL_ASSETS_NUMBER, payload: allAsets });

        return response.json();
      })
      .then(data => {
        if (data.documents.length === 0) {
          dispatch(addAlert({text: 'There is no such asset in the data base!', level: 'error'}));
          dispatch({ type: SEARCH_ASSETS_FAILURE });
        } else {
          for (let i = 0; i < data.documents.length; i++) {
            mapDependencies(data.documents[i], data.dependencies);
          }
          dispatch({
            type: SEARCH_ASSETS_SUCCESS,
            payload: data.documents,
          });
        }
      }).catch(err => dispatch({ type: SEARCH_ASSETS_FAILURE, error: err }));
    };
}

export function searchMyAssets(userId, params) {
  const queryParams = new URLSearchParams(params).toString();
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: {'Content-Type': 'text/plain'}
  };

  return (dispatch) => {
    dispatch({ type: SEARCH_MY_ASSETS_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/user/${userId}/assets?${queryParams}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error('Unhandled response!');
        }

        dispatch({
          type: SET_MY_ASSETS_NUMBER,
          payload: response.headers.get('X-Documents-Count'),
        });

        return response.json();
      })
      .then(data => {
        if (data.documents.length === 0) {
          dispatch({ type: SEARCH_MY_ASSETS_FAILURE });
        } else {
          for (let i = 0; i < data.documents.length; i++) {
            mapDependencies(data.documents[i], data.dependencies);
          }
          dispatch({
            type: SEARCH_MY_ASSETS_SUCCESS,
            payload: data.documents,
          });
        }
      })
      .catch(err => dispatch({ type: SEARCH_MY_ASSETS_FAILURE, error: err }));
    };
}

export function getAssets(params) {
  const queryParams = new URLSearchParams(params).toString();
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };

  return (dispatch) => {
    dispatch({ type: SEARCH_MY_ASSETS_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/asset?${queryParams}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error('Unhandled response!');
        }

        dispatch({
          type: SET_ALL_ASSETS_NUMBER,
          payload: response.headers.get('X-Documents-Count'),
        });

        return response.json();
      })
      .then(data => {
        if (data.documents.length === 0) {
          dispatch({ type: SEARCH_ASSETS_FAILURE });
        } else {
          for (let i = 0; i < data.documents.length; i++) {
            mapDependencies(data.documents[i], data.dependencies);
          }
          dispatch({
            type: SEARCH_ASSETS_SUCCESS,
            payload: data.documents,
          });
        }
      })
      .catch(err => dispatch({ type: SEARCH_ASSETS_FAILURE, error: err }));
    };
}

export function createOrUpateAsset(data) {
  const operation = data.ID ? 'UPDATE' : 'REGISTER';
  const actionPrefix = `ASSET_${operation}`;
  const url = [
    ENDPOINTS.SERVER,
    'asset',
    data.ID || null,
  ].filter(v => Boolean(v)).join('/');

  return (dispatch) => {
    dispatch({ type: `${actionPrefix}_REQUEST` });
    const req = assetRequest(data);

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
            dispatch(addAlert({
              titleKey: `assets.error${operation}Title`,
              textKey: `assets.errorDuplicate_${m[1]}`,
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
      dispatch({
        type: `${actionPrefix}_SUCCESS`,
        payload: ensureDependencies(dataJSON),
      });
      dispatch(addAlert({
        titleKey: `assets.asset${operation}SuccessTitle`,
        textKey: `assets.asset${operation}SuccessInfo`,
        level: 'success',
        alertType: 'notificationBox',
      }));

      return dataJSON;
    }).catch((err) => {
      dispatch({ type: `${actionPrefix}_FAILURE` });
      // @TODO (edimov): The only handled error ATM is `conflict`,
      // so display generic error if message is not `conflict`.
      if (err.message !== 'conflict') {
        dispatch(addAlert({
          text: i18n.t('translations.assets.saveError', { error: err.message }),
          level: 'error',
        }));
      }
      return err;
    });
  };
}

function assetRequest(data) {
  const req = {
    coordinates: {
      lat: parseFloat(data.addressLocation.lat),
      lng: parseFloat(data.addressLocation.lon),
    },
    cadastre: data.cadastre.trim(),
    owner: data.owner,
    esco: data.esco,
    address: JSON.stringify(data.addressLocationMap),
    area: parseInt(data.area, 10),
    common_parts_area: parseInt(data.common_parts_area, 10),
    heated_area: parseInt(data.heated_area, 10),
    billing_area: parseInt(data.billing_area, 10),
    flats: parseInt(data.flats, 10),
    floors: parseInt(data.floors, 10),
    stair_cases: parseInt(data.stair_cases, 10),
    category: data.category === 'residential' ? null : data.category,
    building_type: parseInt(data.building_type, 10),
    heating_type: parseInt(data.heating_type, 10),
    country: data.addressLocationMap.country,
  };

  return req;
}

// TODO edimov: Check if this function is actually needed.
export function handleHeatingTypeChange(index) {
  return {
    type: '@@redux-form/CHANGE',
    meta: {
      form: 'AssetEdit',
      field: 'typeOfHeating',
    },
    payload: index
  }
}

export function setTypeFilter(value) {
  return {
    type: SET_ASSET_TYPE_FILTER,
    value
  };
}

export function getAllAssets(offset = 0, limit = 12) {

  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };
  return dispatch => {
    dispatch({ type: ALL_ASSET_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/asset?limit=${limit}&offset=${offset}`, config)
      .then(response => {
        if (!response.ok) {
          dispatch({ type: SEARCH_ASSETS_FAILURE });
          return Promise.reject(response);
        }
        const allAsets = response.headers.get('X-Documents-Count');
        dispatch({ type: SET_ALL_ASSETS_NUMBER, payload: allAsets });

        return response.json();
      })
      .then(data => {
        for (let i = 0; i < data.documents.length; i++) {
          mapDependencies(data.documents[i], data.dependencies);
        }
        dispatch({
          type: ALL_ASSET_SUCCESS,
          all: data.documents,
        });
      })
      .catch(err => {
        dispatch({ type: ALL_ASSET_FAILURE });
        dispatch(addAlert({ text: `We are Sorry.Something went wrong! ${err.message}`, level: 'error' }));
      });
  };
}

function ensureDependencies(data) {
  const singleAsset = data.data || {};
  const dependencies = data.dependencies || {};

  if (singleAsset.coordinates && singleAsset.coordinates.lat === 1) {
    singleAsset.coordinates.lat = 56.955186;
    singleAsset.coordinates.lng = 24.109743;
  }
  // Override the Asset Owner _id with the actual Object of the Organization.
  for (const k in dependencies) {
    if (dependencies[k]._id === singleAsset.owner) {
      singleAsset.owner = dependencies[k];
    }
    if (dependencies[k]._id === singleAsset.esco) {
      singleAsset.esco = dependencies[k];
    }
  }

  return { ...data, data: singleAsset };
}

function mapDependencies(asset, dependencies) {
  for (const k in dependencies) {
    if (dependencies[k]._id === asset?.data?.owner) {
      asset.data.owner = dependencies[k];
    }
    if (dependencies[k]._id === asset?.data?.esco) {
      asset.data.esco = dependencies[k];
    }
  }
}

export function getSingleAsset(assetID, userID) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' },
  };
  return (dispatch) => {
    dispatch({ type: GET_SINGLE_ASSET_REQUEST });
    return fetch(`${ENDPOINTS.SERVER}/asset/${assetID}`, config)
      .then(response => {
        if (!response.ok) {
          dispatch({ type: GET_MYASSETS_FAILURE });
          return Promise.reject(response);
        }
        return response.json();
      })
      .then(data => {
        if (userID) {
          const role = retrieveAssetRole(userID, data);
          dispatch({type: SET_LOGGED_USER_ROLE_IN_ASSET, payload: role});
        }
        dispatch({ type: GET_SINGLE_ASSET_SUCCESS, payload: ensureDependencies(data) });
      })
      .catch(err => {
        dispatch({ type: GET_SINGLE_ASSET_FAILURE, payload: { error: err } });
      });
  };
}

export function getMyAssets(userId, offset = 0, limit = 11) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: {'Content-Type': 'text/plain'}
  }
  return (dispatch) => {
    dispatch({ type: GET_MYASSETS_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/user/${userId}/assets?limit=${limit}&offset=${offset}`, config)
      .then(response => {
        if (!response.ok) {
          dispatch({ type: GET_MYASSETS_FAILURE });
          return Promise.reject(response);
        }
        const myAssets = response.headers.get('X-Documents-Count');
        dispatch({ type: SET_MY_ASSETS_NUMBER, payload: myAssets });

        return response.json();
      })
      .then(data => {
        for (let i = 0; i < data.documents.length; i++) {
          mapDependencies(data.documents[i], data.dependencies);
        }
        dispatch({
          type: GET_MYASSETS_SUCCESS,
          payload: data.documents,
        });
      })
      .catch(err => {
        dispatch({ type: GET_MYASSETS_FAILURE });
        dispatch(addAlert({text: `We are Sorry.Something went wrong! ${err.message}`, level: 'error'}));
      });
  };
}

export function isFetchingSingleAssetSetDefault() {
  return(dispatch) => {
    dispatch({ type: ISFETCHING_SINGLE_ASSET_SET_DEFAULT})
  }
}

export function isFetchingListAssetSetDefault() {
  return(dispatch) => {
    dispatch({ type: ISFETCHING_LIST_ASSET_SET_DEFAULT})
  }
}

export function clearMyAssets() {
  return ({
    type: CLEAR_MY_ASSETS
  })
}
