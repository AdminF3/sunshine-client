import i18n from 'i18next';

import ENDPOINTS from '../constants/endpoints';
import {
  ALL_PROJECT_REQUEST, ALL_PROJECT_SUCCESS, ALL_PROJECT_FAILURE,
  MY_PROJECTS_REQUEST, MY_PROJECTS_SUCCESS, MY_PROJECTS_FAILURE,
  SEARCH_PROJECTS_REQUEST, SEARCH_PROJECTS_SUCCESS, SEARCH_PROJECTS_FAILURE,
  GET_SINGLE_PROJECT_REQUEST, GET_SINGLE_PROJECT_SUCCESS, GET_SINGLE_PROJECT_FAILURE,
  FOREFAITING_AGREEMENT_UPDATE_REQUEST, FOREFAITING_AGREEMENT_UPDATE_SUCCESS,
  FOREFAITING_AGREEMENT_UPDATE_FAILURE, GET_FORFAITING_AGREEMENT_REQUEST,
  GET_FORFAITING_AGREEMENT_SUCCESS, GET_FORFAITING_AGREEMENT_FAILURE, SET_MY_PROJECTS_NUMBER,
  SET_LOGGED_USER_ROLE, SET_PROJECT_TYPE_FILTER, SET_ALL_PROJECTS_NUMBER,
  UPDATE_INDOOR_CLIMA_REQUEST, UPDATE_INDOOR_CLIMA_SUCCESS, UPDATE_INDOOR_CLIMA_FAILURE,
  SEARCH_MY_PROJECTS_REQUEST, SEARCH_MY_PROJECTS_SUCCESS, SEARCH_MY_PROJECTS_FAILURE,
  ISFETCHING_SINGLE_PROJECT_SET_DEFAULT, ISFETCHING_LIST_PROJECT_SET_DEFAULT,
  GET_MARKDOWN_REQUEST, GET_MARKDOWN_SUCCESS, GET_MARKDOWN_FAILURE,
  UPDATE_MARKDOWN_REQUEST, UPDATE_MARKDOWN_SUCCESS, UPDATE_MARKDOWN_FAILURE,
  REFETCH_SINGLE_PROJECT_REQUEST, REFETCH_SINGLE_PROJECT_SUCCESS, REFETCH_SINGLE_PROJECT_FAILURE,
  THEIR_PROJECTS_REQUEST, THEIR_PROJECTS_SUCCESS, THEIR_PROJECTS_FAILURE
} from './../constants/actionTypes';
import {
  getBudgetTable,
  getEnergyTable,
  getMaintenanceTable,
  getFeesTable,
  getAnnexesFields,
} from './annex';
import { addAlert } from './alerts';
import { retrieveProjectRole } from '../utils/userRoles';

export function refetchSingleProject(projectId) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  };

  return (dispatch) => {
    dispatch({ type: REFETCH_SINGLE_PROJECT_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/project/' + projectId, config)
      .then(response => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then(data => dispatch({ type: REFETCH_SINGLE_PROJECT_SUCCESS, refetchProject: data }))
      .catch(() => {
        dispatch({ type: REFETCH_SINGLE_PROJECT_FAILURE });
      });
  };
}

export function getSingleProject(projectID, userId, settings = { refetch: false }) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  };

  return (dispatch) => {
    // If dispatching refetch action for current project - don't
    // dispatch GET_SINGLE_PROJECT_REQUEST in order to not nullify
    // the current project data and cause full page re-render.
    if (!settings.refetch) {
      dispatch({ type: GET_SINGLE_PROJECT_REQUEST });
    }
    return fetch(ENDPOINTS.SERVER + '/project/' + projectID, config)
      .then(response => {
        if (!response.ok) {
          throw response.status;
        }
        response.json().then(data => {
          const role = retrieveProjectRole(userId, data);
          mapDependencies(data);
          dispatch(getFeesTable(projectID));
          dispatch(getBudgetTable(projectID));
          dispatch(getEnergyTable(projectID));
          dispatch(getAnnexesFields(projectID));
          dispatch(getMaintenanceTable(projectID));
          dispatch(getForfaitingAgreementFields(projectID));
          dispatch({ type: SET_LOGGED_USER_ROLE, payload: role });
          dispatch({ type: GET_SINGLE_PROJECT_SUCCESS, singleProject: data });
          dispatch({ type: REFETCH_SINGLE_PROJECT_SUCCESS, refetchProject: data });
        });
      }).catch(err => {
        if (err === 404) {
          return dispatch({ type: GET_SINGLE_PROJECT_FAILURE });
          // Add redirect to 404 page when its done
        }
        return dispatch({ type: GET_SINGLE_PROJECT_FAILURE });
      });
  };
}

export function getProjects(params = {}) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };

  return (dispatch) => {
    dispatch({ type: ALL_PROJECT_REQUEST });
    const queryParams = new URLSearchParams(params);

    return fetch(`${ENDPOINTS.SERVER}/project?${queryParams}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        const num = response.headers.get('X-Documents-Count');
        dispatch({ type: SET_ALL_PROJECTS_NUMBER, payload: parseInt(num, 10) || 0 });

        return response.json();
      })
      .then(data => dispatch({
        type: ALL_PROJECT_SUCCESS,
        all: dataDependenciesProcessing(data)
      }))
      .catch((err) => {
        dispatch({ type: ALL_PROJECT_FAILURE, error: err });
      });
  };
}

export function searchProjects(value, filter, offset = 0, limit = 10) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };

  return (dispatch) => {
    dispatch({ type: SEARCH_PROJECTS_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/project?search=${value}&status=${filter}&limit=${limit}&offset=${offset}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        response.json().then(data => {
          if (!data.documents.length) {
            throw new Error(i18n.t('translations:errors.projectNotFound'));
          }
          const allProjects = response.headers.get('X-Documents-Count');
          dispatch({ type: SET_ALL_PROJECTS_NUMBER, payload: allProjects });
          dispatch({ type: SEARCH_PROJECTS_SUCCESS, payload: dataDependenciesProcessing(data) });
        }).catch(() => {
          dispatch({ type: SEARCH_PROJECTS_FAILURE });
        });
      }).catch(() => {
        dispatch(addAlert({ text: i18n.t('translations:errors.somethingWentWrong'), level: 'error' }));
        dispatch({ type: SEARCH_PROJECTS_FAILURE });
      });
  };
}

export function searchMyProjects(userId, value, filter, offset = 0, limit = 8) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' }
  };

  let params = { filter, offset, limit };
  if (typeof value === 'object') {
    params = { ...params, ...value };
  } else {
    params.search = value;
  }

  const queryParams = new URLSearchParams(params);
  return (dispatch) => {
    dispatch({ type: SEARCH_MY_PROJECTS_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/user/${userId}/projects?${queryParams}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        response.json().then(data => {
          if (!data.documents.length) {
            throw new Error(i18n.t('translations:errors.projectNotFound'));
          }
          const myProjects = response.headers.get('X-Documents-Count');
          dispatch({ type: SET_MY_PROJECTS_NUMBER, payload: myProjects });
          dispatch({ type: SEARCH_MY_PROJECTS_SUCCESS, payload: dataDependenciesProcessing(data) });
        }).catch(() => {
          dispatch({ type: SEARCH_MY_PROJECTS_FAILURE });
        });
      }).catch(() => {
        dispatch(addAlert({ text: i18n.t('translations:errors.somethingWentWrong'), level: 'error' }));
        dispatch({ type: SEARCH_MY_PROJECTS_FAILURE });
      });
  };
}

export function setProjectTypeFilter(value) {
  return {
    type: SET_PROJECT_TYPE_FILTER,
    payload: value
  };
}

export function createOrUpdateProject(data) {
  const operation = data.ID ? 'UPDATE' : 'REGISTER';
  const actionPrefix = `PROJECT_${operation}`;
  const url = [
    ENDPOINTS.SERVER,
    'project',
    data.ID || null,
  ].filter(v => Boolean(v)).join('/');

  return (dispatch) => {
    dispatch({ type: `${actionPrefix}_REQUEST` });
    const req = projectRequest(data);
    return fetch(url, {
      method: operation === 'REGISTER' ? 'POST' : 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    }).then(response => {
      if (!response.ok) {
        return response.text().then(msg => {
          if (msg.indexOf('duplicate key value violates unique constraint "projects_name_ukey"') > -1) {
            dispatch(addAlert({
              titleKey: `projects.project${operation}ErrorTitle`,
              textKey: 'projects.projectErrorDupNameInfo',
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
      mapDependencies(dataJSON);
      dispatch({
        type: `${actionPrefix}_SUCCESS`,
        project: dataJSON,
      });
      dispatch(addAlert({
        titleKey: `projects.project${operation}SuccessTitle`,
        textKey: `projects.project${operation}SuccessInfo`,
        level: 'success',
        alertType: 'notificationBox',
      }));

      return dataJSON;
    }).catch((err) => {
      // @TODO (edimov): The only handled error ATM is `conflict`,
      // so display generic error if message is not `conflict`.
      if (err.message !== 'conflict') {
        dispatch({ type: `${actionPrefix}_FAILURE` });
        dispatch(addAlert({
          text: i18n.t('translations:projects.saveError', { error: err.message }),
          level: 'error',
        }));
      }

      return err;
    });
  };
}

function projectRequest(data) {
  return {
    name: data.name,
    asset: data.assetUUID,
    owner: data.ownerUUID,
    consortium_organizations: data.consortium_organizations.map(el => el.value),
    status: parseInt(data.status, 10),
    airtemp: parseFloat(data.airtemp),
    watertemp: parseFloat(data.watertemp),
    savings: parseFloat(data.savings),
    contract_term: parseFloat(data.contract_term),
    first_year: parseFloat(data.first_year),
    construction_from: new Date(data.construction_from).toISOString(),
    construction_to: new Date(data.construction_to).toISOString(),
    milestone: data.milestone
  };
}

function allProjectSuccess(arr1, arr2) {
  return {
    type: ALL_PROJECT_SUCCESS,
    all: arr1,
    mine: arr2
  };
}

function dataDependenciesProcessing(data) {
  let documents = data.documents;
  const dependencies = data.dependencies;

  if (documents === null) {
    documents = [];
  }

  // Override the Asset and Organization uuid with the actual Object
  documents.forEach((el, index) =>
    Object.entries(el.data).forEach(element =>
      element.forEach(entity =>
        Object.values(dependencies).forEach(dep =>
          element[1] === dep._id
            ?
            documents[index].data[element[0]] = dep : ''))));

  // Override the Asset Owner uuid with the actual Object of the Organization
  documents.forEach((el, index) =>
    Object.entries(el.data).forEach(element => element[0] === 'asset' ?
      element.forEach(entity =>
        Object.values(dependencies).forEach(dep =>
          entity.data && entity.data.owner === dep._id
            ?
            entity.data.owner = dep : '')) : ''));

  return documents;
}

function mapDependencies(projectData) {
  projectData.data.consortiumOrganizations = [];

  if (projectData.data.consortium_organizations?.length > 0) {
    for (const k in projectData.data.consortium_organizations) {
      const orgID = projectData.data.consortium_organizations[k];
      if (projectData.dependencies[orgID]) {
        projectData.data.consortiumOrganizations.push(projectData.dependencies[orgID]);
      }
    }
  }
}

export function getAllProjects(offset = 0, limit = 10) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };

  return dispatch => {
    dispatch({ type: ALL_PROJECT_REQUEST });

    return fetch(ENDPOINTS.SERVER + `/project?limit=${limit}&offset=${offset}`, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        const projectsNum = response.headers.get('X-Documents-Count');
        dispatch({ type: SET_ALL_PROJECTS_NUMBER, payload: projectsNum });

        return response.json();
      })
      .then((data) => {
        dispatch(allProjectSuccess(dataDependenciesProcessing(data)));
      })
      .catch(err => dispatch({ type: ALL_PROJECT_FAILURE, error: err }));
  };
}

export function getMyProjects(userId, isMine, offset = 0, limit = 8) {
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
      dispatch({ type: MY_PROJECTS_REQUEST });
    } else {
      dispatch({ type: THEIR_PROJECTS_REQUEST });
    }
    return fetch(ENDPOINTS.SERVER + `/user/${userId}/projects?${queryParams}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        if (isMine) {
          dispatch({ type: SET_MY_PROJECTS_NUMBER, payload: response.headers.get('X-Documents-Count') });
        }
        return response.json();
      }).then(data => {
        if (isMine) {
          dispatch({ type: MY_PROJECTS_SUCCESS, payload: dataDependenciesProcessing(data) });
        } else {
          dispatch({ type: THEIR_PROJECTS_SUCCESS, payload: dataDependenciesProcessing(data) });
        }
      }).catch(() => {
        if (isMine) {
          dispatch({ type: MY_PROJECTS_FAILURE });
        } else {
          dispatch({ type: THEIR_PROJECTS_FAILURE });
        }
        dispatch(addAlert({ text: i18n.t('translations:errors.somethingWentWrong'), level: 'error' }));
      });
  };
}

export function getForfaitingAgreementFields(projectId) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  return (dispatch) => {
    dispatch({ type: GET_FORFAITING_AGREEMENT_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/project/${projectId}/agreement/fields`, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: GET_FORFAITING_AGREEMENT_SUCCESS, data });
      })
      .catch(err => dispatch({ type: GET_FORFAITING_AGREEMENT_FAILURE, error: err }));
  };
}

export function updateForfaitingAgreement(params, projectId) {

  const config = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };

  return dispatch => {
    dispatch({ type: FOREFAITING_AGREEMENT_UPDATE_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/project/${projectId}/agreement/fields`, config)
      .then((response) => response.json())
      .then((data) => {
        try {
          dispatch({ type: FOREFAITING_AGREEMENT_UPDATE_SUCCESS, data });
          dispatch(addAlert({ text: 'Saved successfully', level: 'success' }));
        } catch (err) {
          dispatch({ type: FOREFAITING_AGREEMENT_UPDATE_FAILURE });
          dispatch(addAlert({ text: 'Something went wrong! The forfaiting agreement was not saved!', level: 'error' }));
        }
      });
  };
}

export function updateIndoorClima(params, projectId) {
  const dataToSend = {
    'attic': {
      'zone1': {
        'area': parseFloat(params.atticZone1Area),
        'uvalue': parseFloat(params.atticZone1uValue),
        'outdoor_temp': {
          'baseyear_n': parseFloat(params.atticZone1OutTempBase),
          'baseyear_n_1': parseFloat(params.atticZone1OutTempBase1),
          'baseyear_n_2': parseFloat(params.atticZone1OutTempBase2)
        },
        'tempdiff': {
          'baseyear_n': parseFloat(params.atticZone1TempDiffBase),
          'baseyear_n_1': parseFloat(params.atticZone1TempDiffBase1),
          'baseyear_n_2': parseFloat(params.atticZone1TempDiffBase2)
        },
        'heat_loss_coeff': parseFloat(params.atticZone1HeatLossCoeff)
      },
      'zone2': {
        'area': parseFloat(params.atticZone2Area),
        'uvalue': parseFloat(params.atticZone2uValue),
        'outdoor_temp': {
          'baseyear_n': parseFloat(params.atticZone2OutTempBase),
          'baseyear_n_1': parseFloat(params.atticZone2OutTempBase1),
          'baseyear_n_2': parseFloat(params.atticZone2OutTempBase2)
        },
        'tempdiff': {
          'baseyear_n': parseFloat(params.atticZone2TempDiffBase),
          'baseyear_n_1': parseFloat(params.atticZone2TempDiffBase1),
          'baseyear_n_2': parseFloat(params.atticZone2TempDiffBase2)
        },
        'heat_loss_coeff': parseFloat(params.atticZone2HeatLossCoeff)
      }
    },
    'basement_ceiling': {
      'zone1': {
        'area': parseFloat(params.basementCeilingZone1Area),
        'uvalue': parseFloat(params.basementCeilingZone1uValue),
        'outdoor_temp': {
          'baseyear_n': parseFloat(params.basementCeilingZone1OutTempBase),
          'baseyear_n_1': parseFloat(params.basementCeilingZone1OutTempBase1),
          'baseyear_n_2': parseFloat(params.basementCeilingZone1OutTempBase2)
        },
        'tempdiff': {
          'baseyear_n': parseFloat(params.basementCeilingZone1TempDiffBase),
          'baseyear_n_1': parseFloat(params.basementCeilingZone1TempDiffBase1),
          'baseyear_n_2': parseFloat(params.basementCeilingZone1TempDiffBase2)
        },
        'heat_loss_coeff': parseFloat(params.basementCeilingZone1HeatLossCoeff)
      },
      'zone2': {
        'area': parseFloat(params.basementCeilingZone2Area),
        'uvalue': parseFloat(params.basementCeilingZone2uValue),
        'outdoor_temp': {
          'baseyear_n': parseFloat(params.basementCeilingZone2OutTempBase),
          'baseyear_n_1': parseFloat(params.basementCeilingZone2OutTempBase1),
          'baseyear_n_2': parseFloat(params.basementCeilingZone2OutTempBase2)
        },
        'tempdiff': {
          'baseyear_n': parseFloat(params.basementCeilingZone2TempDiffBase),
          'baseyear_n_1': parseFloat(params.basementCeilingZone2TempDiffBase1),
          'baseyear_n_2': parseFloat(params.basementCeilingZone2TempDiffBase2)
        },
        'heat_loss_coeff': parseFloat(params.basementCeilingZone2HeatLossCoeff)
      }
    },
    'external_door': {
      'num1': {
        'zone1': {
          'area': parseFloat(params.externalDoor1Zone1Area),
          'uvalue': parseFloat(params.externalDoor1Zone1uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalDoor1Zone1OutTempBase),
            'baseyear_n_1': parseFloat(params.externalDoor1Zone1OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalDoor1Zone1OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalDoor1Zone1TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalDoor1Zone1TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalDoor1Zone1TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalDoor1Zone1HeatLossCoeff)
        },
        'zone2': {
          'area': parseFloat(params.externalDoor1Zone2Area),
          'uvalue': parseFloat(params.externalDoor1Zone2uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalDoor1Zone2OutTempBase),
            'baseyear_n_1': parseFloat(params.externalDoor1Zone2OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalDoor1Zone2OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalDoor1Zone2TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalDoor1Zone2TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalDoor1Zone2TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalDoor1Zone2HeatLossCoeff)
        }
      },
      'num2': {
        'zone1': {
          'area': parseFloat(params.externalDoor2Zone1Area),
          'uvalue': parseFloat(params.externalDoor2Zone1uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalDoor2Zone1OutTempBase),
            'baseyear_n_1': parseFloat(params.externalDoor2Zone1OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalDoor2Zone1OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalDoor2Zone1TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalDoor2Zone1TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalDoor2Zone1TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalDoor2Zone1HeatLossCoeff)
        },
        'zone2': {
          'area': parseFloat(params.externalDoor2Zone2Area),
          'uvalue': parseFloat(params.externalDoor2Zone2uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalDoor2Zone2OutTempBase),
            'baseyear_n_1': parseFloat(params.externalDoor2Zone2OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalDoor2Zone2OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalDoor2Zone2TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalDoor2Zone2TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalDoor2Zone2TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalDoor2Zone2HeatLossCoeff)
        }
      }
    },
    'external_wall': {
      'num1': {
        'zone1': {
          'area': parseFloat(params.externalWall1Zone1Area),
          'uvalue': parseFloat(params.externalWall1Zone1uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalWall1Zone1OutTempBase),
            'baseyear_n_1': parseFloat(params.externalWall1Zone1OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalWall1Zone1OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalWall1Zone1TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalWall1Zone1TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalWall1Zone1TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalWall1Zone1HeatLossCoeff)
        },
        'zone2': {
          'area': parseFloat(params.externalWall1Zone2Area),
          'uvalue': parseFloat(params.externalWall1Zone2uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalWall1Zone2OutTempBase),
            'baseyear_n_1': parseFloat(params.externalWall1Zone2OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalWall1Zone2OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalWall1Zone2TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalWall1Zone2TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalWall1Zone2TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalWall1Zone2HeatLossCoeff)
        }
      },
      'num2': {
        'zone1': {
          'area': parseFloat(params.externalWall2Zone1Area),
          'uvalue': parseFloat(params.externalWall2Zone1uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalWall2Zone1OutTempBase),
            'baseyear_n_1': parseFloat(params.externalWall2Zone1OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalWall2Zone1OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalWall2Zone1TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalWall2Zone1TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalWall2Zone1TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalWall2Zone1HeatLossCoeff)
        },
        'zone2': {
          'area': parseFloat(params.externalWall2Zone2Area),
          'uvalue': parseFloat(params.externalWall2Zone2uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalWall2Zone2OutTempBase),
            'baseyear_n_1': parseFloat(params.externalWall2Zone2OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalWall2Zone2OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalWall2Zone2TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalWall2Zone2TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalWall2Zone2TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalWall2Zone2HeatLossCoeff)
        }
      },
      'num3': {
        'zone1': {
          'area': parseFloat(params.externalWall3Zone1Area),
          'uvalue': parseFloat(params.externalWall3Zone1uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalWall3Zone1OutTempBase),
            'baseyear_n_1': parseFloat(params.externalWall3Zone1OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalWall3Zone1OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalWall3Zone1TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalWall3Zone1TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalWall3Zone1TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalWall3Zone1HeatLossCoeff)
        },
        'zone2': {
          'area': parseFloat(params.externalWall3Zone2Area),
          'uvalue': parseFloat(params.externalWall3Zone2uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalWall3Zone2OutTempBase),
            'baseyear_n_1': parseFloat(params.externalWall3Zone2OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalWall3Zone2OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalWall3Zone2TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalWall3Zone2TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalWall3Zone2TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalWall3Zone2HeatLossCoeff)
        }
      },
      'num4': {
        'zone1': {
          'area': parseFloat(params.externalWall4Zone1Area),
          'uvalue': parseFloat(params.externalWall4Zone1uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalWall4Zone1OutTempBase),
            'baseyear_n_1': parseFloat(params.externalWall4Zone1OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalWall4Zone1OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalWall4Zone1TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalWall4Zone1TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalWall4Zone1TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalWall4Zone1HeatLossCoeff)
        },
        'zone2': {
          'area': parseFloat(params.externalWall4Zone2Area),
          'uvalue': parseFloat(params.externalWall4Zone2uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.externalWall4Zone2OutTempBase),
            'baseyear_n_1': parseFloat(params.externalWall4Zone2OutTempBase1),
            'baseyear_n_2': parseFloat(params.externalWall4Zone2OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.externalWall4Zone2TempDiffBase),
            'baseyear_n_1': parseFloat(params.externalWall4Zone2TempDiffBase1),
            'baseyear_n_2': parseFloat(params.externalWall4Zone2TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.externalWall4Zone2HeatLossCoeff)
        }
      }
    },
    'window': {
      'num1': {
        'zone1': {
          'area': parseFloat(params.window1Zone1Area),
          'uvalue': parseFloat(params.window1Zone1uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.window1Zone1OutTempBase),
            'baseyear_n_1': parseFloat(params.window1Zone1OutTempBase1),
            'baseyear_n_2': parseFloat(params.window1Zone1OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.window1Zone1TempDiffBase),
            'baseyear_n_1': parseFloat(params.window1Zone1TempDiffBase1),
            'baseyear_n_2': parseFloat(params.window1Zone1TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.window1Zone1HeatLossCoeff)
        },
        'zone2': {
          'area': parseFloat(params.window1Zone2Area),
          'uvalue': parseFloat(params.window1Zone2uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.window1Zone2OutTempBase),
            'baseyear_n_1': parseFloat(params.window1Zone2OutTempBase1),
            'baseyear_n_2': parseFloat(params.window1Zone2OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.window1Zone2TempDiffBase),
            'baseyear_n_1': parseFloat(params.window1Zone2TempDiffBase1),
            'baseyear_n_2': parseFloat(params.window1Zone2TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.window1Zone2HeatLossCoeff)
        }
      },
      'num2': {
        'zone1': {
          'area': parseFloat(params.window2Zone1Area),
          'uvalue': parseFloat(params.window2Zone1uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.window2Zone1OutTempBase),
            'baseyear_n_1': parseFloat(params.window2Zone1OutTempBase1),
            'baseyear_n_2': parseFloat(params.window2Zone1OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.window2Zone1TempDiffBase),
            'baseyear_n_1': parseFloat(params.window2Zone1TempDiffBase1),
            'baseyear_n_2': parseFloat(params.window2Zone1TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.window2Zone1HeatLossCoeff)
        },
        'zone2': {
          'area': parseFloat(params.window2Zone2Area),
          'uvalue': parseFloat(params.window2Zone2uValue),
          'outdoor_temp': {
            'baseyear_n': parseFloat(params.window2Zone2OutTempBase),
            'baseyear_n_1': parseFloat(params.window2Zone2OutTempBase1),
            'baseyear_n_2': parseFloat(params.window2Zone2OutTempBase2)
          },
          'tempdiff': {
            'baseyear_n': parseFloat(params.window2Zone2TempDiffBase),
            'baseyear_n_1': parseFloat(params.window2Zone2TempDiffBase1),
            'baseyear_n_2': parseFloat(params.window2Zone2TempDiffBase2)
          },
          'heat_loss_coeff': parseFloat(params.window2Zone2HeatLossCoeff)
        }
      }
    },
    'ground': {
      'zone1': {
        'area': parseFloat(params.groundZone1Area),
        'uvalue': parseFloat(params.groundZone1uValue),
        'outdoor_temp': {
          'baseyear_n': parseFloat(params.groundZone1OutTempBase),
          'baseyear_n_1': parseFloat(params.groundZone1OutTempBase1),
          'baseyear_n_2': parseFloat(params.groundZone1OutTempBase2)
        },
        'tempdiff': {
          'baseyear_n': parseFloat(params.groundZone1TempDiffBase),
          'baseyear_n_1': parseFloat(params.groundZone1TempDiffBase1),
          'baseyear_n_2': parseFloat(params.groundZone1TempDiffBase2)
        },
        'heat_loss_coeff': parseFloat(params.groundZone1HeatLossCoeff)
      },
      'zone2': {
        'area': parseFloat(params.groundZone2Area),
        'uvalue': parseFloat(params.groundZone2uValue),
        'outdoor_temp': {
          'baseyear_n': parseFloat(params.groundZone2OutTempBase),
          'baseyear_n_1': parseFloat(params.groundZone2OutTempBase1),
          'baseyear_n_2': parseFloat(params.groundZone2OutTempBase2)
        },
        'tempdiff': {
          'baseyear_n': parseFloat(params.groundZone2TempDiffBase),
          'baseyear_n_1': parseFloat(params.groundZone2TempDiffBase1),
          'baseyear_n_2': parseFloat(params.groundZone2TempDiffBase2)
        },
        'heat_loss_coeff': parseFloat(params.groundZone2HeatLossCoeff)
      }
    },
    'roof': {
      'zone1': {
        'area': parseFloat(params.roofZone1Area),
        'uvalue': parseFloat(params.roofZone1uValue),
        'outdoor_temp': {
          'baseyear_n': parseFloat(params.roofZone1OutTempBase),
          'baseyear_n_1': parseFloat(params.roofZone1OutTempBase1),
          'baseyear_n_2': parseFloat(params.roofZone1OutTempBase2)
        },
        'tempdiff': {
          'baseyear_n': parseFloat(params.roofZone1TempDiffBase),
          'baseyear_n_1': parseFloat(params.roofZone1TempDiffBase1),
          'baseyear_n_2': parseFloat(params.roofZone1TempDiffBase2)
        },
        'heat_loss_coeff': parseFloat(params.roofZone1HeatLossCoeff)
      },
      'zone2': {
        'area': parseFloat(params.roofZone2Area),
        'uvalue': parseFloat(params.roofZone2uValue),
        'outdoor_temp': {
          'baseyear_n': parseFloat(params.roofZone2OutTempBase),
          'baseyear_n_1': parseFloat(params.roofZone2OutTempBase1),
          'baseyear_n_2': parseFloat(params.roofZone2OutTempBase2)
        },
        'tempdiff': {
          'baseyear_n': parseFloat(params.roofZone2TempDiffBase),
          'baseyear_n_1': parseFloat(params.roofZone2TempDiffBase1),
          'baseyear_n_2': parseFloat(params.roofZone2TempDiffBase2)
        },
        'heat_loss_coeff': parseFloat(params.roofZone2HeatLossCoeff)
      }
    },
    'base_wall': {
      'zone1': {
        'area': parseFloat(params.baseWallZone1Area),
        'uvalue': parseFloat(params.baseWallZone1uValue),
        'outdoor_temp': {
          'baseyear_n': parseFloat(params.baseWallZone1OutTempBase),
          'baseyear_n_1': parseFloat(params.baseWallZone1OutTempBase1),
          'baseyear_n_2': parseFloat(params.baseWallZone1OutTempBase2)
        },
        'tempdiff': {
          'baseyear_n': parseFloat(params.baseWallZone1TempDiffBase),
          'baseyear_n_1': parseFloat(params.baseWallZone1TempDiffBase1),
          'baseyear_n_2': parseFloat(params.baseWallZone1TempDiffBase2)
        },
        'heat_loss_coeff': parseFloat(params.baseWallZone1HeatLossCoeff)
      },
      'zone2': {
        'area': parseFloat(params.baseWallZone2Area),
        'uvalue': parseFloat(params.baseWallZone2uValue),
        'outdoor_temp': {
          'baseyear_n': parseFloat(params.baseWallZone2OutTempBase),
          'baseyear_n_1': parseFloat(params.baseWallZone2OutTempBase1),
          'baseyear_n_2': parseFloat(params.baseWallZone2OutTempBase2)
        },
        'tempdiff': {
          'baseyear_n': parseFloat(params.baseWallZone2TempDiffBase),
          'baseyear_n_1': parseFloat(params.baseWallZone2TempDiffBase1),
          'baseyear_n_2': parseFloat(params.baseWallZone2TempDiffBase2)
        },
        'heat_loss_coeff': parseFloat(params.baseWallZone2HeatLossCoeff)
      }
    },
    'basement_pipes': [
      {
        'quality': parseFloat(params.basementPipesQuiality),
        'installed_length': parseFloat(params.basementPipesInstalledlength),
        'diameter': parseFloat(params.basementPipesDiameter),
        'heat_loss_unit': parseFloat(params.basementPipesHeatLossUnit),
        'heat_loss_year': parseFloat(params.basementPipesHeatLossYear)
      }, {
        'quality': parseFloat(params.basementPipesQuiality1),
        'installed_length': parseFloat(params.basementPipesInstalledlength1),
        'diameter': parseFloat(params.basementPipesDiameter1),
        'heat_loss_unit': parseFloat(params.basementPipesHeatLossUnit1),
        'heat_loss_year': parseFloat(params.basementPipesHeatLossYear1)
      }, {
        'quality': parseFloat(params.basementPipesQuiality2),
        'installed_length': parseFloat(params.basementPipesInstalledlength2),
        'diameter': parseFloat(params.basementPipesDiameter2),
        'heat_loss_unit': parseFloat(params.basementPipesHeatLossUnit2),
        'heat_loss_year': parseFloat(params.basementPipesHeatLossYear2)
      }, {
        'quality': parseFloat(params.basementPipesQuiality3),
        'installed_length': parseFloat(params.basementPipesInstalledlength3),
        'diameter': parseFloat(params.basementPipesDiameter3),
        'heat_loss_unit': parseFloat(params.basementPipesHeatLossUnit3),
        'heat_loss_year': parseFloat(params.basementPipesHeatLossYear3)
      }, {
        'quality': parseFloat(params.basementPipesQuiality4),
        'installed_length': parseFloat(params.basementPipesInstalledlength4),
        'diameter': parseFloat(params.basementPipesDiameter4),
        'heat_loss_unit': parseFloat(params.basementPipesHeatLossUnit4),
        'heat_loss_year': parseFloat(params.basementPipesHeatLossYear4)
      }, {
        'quality': parseFloat(params.basementPipesQuiality5),
        'installed_length': parseFloat(params.basementPipesInstalledlength5),
        'diameter': parseFloat(params.basementPipesDiameter5),
        'heat_loss_unit': parseFloat(params.basementPipesHeatLossUnit5),
        'heat_loss_year': parseFloat(params.basementPipesHeatLossYear5)
      }, {
        'quality': parseFloat(params.basementPipesQuiality6),
        'installed_length': parseFloat(params.basementPipesInstalledlength6),
        'diameter': parseFloat(params.basementPipesDiameter6),
        'heat_loss_unit': parseFloat(params.basementPipesHeatLossUnit6),
        'heat_loss_year': parseFloat(params.basementPipesHeatLossYear6)
      }, {
        'quality': parseFloat(params.basementPipesQuiality7),
        'installed_length': parseFloat(params.basementPipesInstalledlength7),
        'diameter': parseFloat(params.basementPipesDiameter7),
        'heat_loss_unit': parseFloat(params.basementPipesHeatLossUnit7),
        'heat_loss_year': parseFloat(params.basementPipesHeatLossYear7)
      }, {
        'quality': parseFloat(params.basementPipesQuiality8),
        'installed_length': parseFloat(params.basementPipesInstalledlength8),
        'diameter': parseFloat(params.basementPipesDiameter8),
        'heat_loss_unit': parseFloat(params.basementPipesHeatLossUnit8),
        'heat_loss_year': parseFloat(params.basementPipesHeatLossYear8)
      }, {
        'quality': parseFloat(params.basementPipesQuiality9),
        'installed_length': parseFloat(params.basementPipesInstalledlength9),
        'diameter': parseFloat(params.basementPipesDiameter9),
        'heat_loss_unit': parseFloat(params.basementPipesHeatLossUnit9),
        'heat_loss_year': parseFloat(params.basementPipesHeatLossYear9)
      }
    ],
    'attic_pipes': [
      {
        'quality': parseFloat(params.atticPipesQuiality),
        'installed_length': parseFloat(params.atticPipesInstalledlength),
        'diameter': parseFloat(params.atticPipesDiameter),
        'heat_loss_unit': parseFloat(params.atticPipesHeatLossUnit),
        'heat_loss_year': parseFloat(params.atticPipesHeatLossYear)
      }, {
        'quality': parseFloat(params.atticPipesQuiality1),
        'installed_length': parseFloat(params.atticPipesInstalledlength1),
        'diameter': parseFloat(params.atticPipesDiameter1),
        'heat_loss_unit': parseFloat(params.atticPipesHeatLossUnit1),
        'heat_loss_year': parseFloat(params.atticPipesHeatLossYear1)
      }, {
        'quality': parseFloat(params.atticPipesQuiality2),
        'installed_length': parseFloat(params.atticPipesInstalledlength2),
        'diameter': parseFloat(params.atticPipesDiameter2),
        'heat_loss_unit': parseFloat(params.atticPipesHeatLossUnit2),
        'heat_loss_year': parseFloat(params.atticPipesHeatLossYear2)
      }, {
        'quality': parseFloat(params.atticPipesQuiality3),
        'installed_length': parseFloat(params.atticPipesInstalledlength3),
        'diameter': parseFloat(params.atticPipesDiameter3),
        'heat_loss_unit': parseFloat(params.atticPipesHeatLossUnit3),
        'heat_loss_year': parseFloat(params.atticPipesHeatLossYear3)
      }, {
        'quality': parseFloat(params.atticPipesQuiality4),
        'installed_length': parseFloat(params.atticPipesInstalledlength4),
        'diameter': parseFloat(params.atticPipesDiameter4),
        'heat_loss_unit': parseFloat(params.atticPipesHeatLossUnit4),
        'heat_loss_year': parseFloat(params.atticPipesHeatLossYear4)
      }, {
        'quality': parseFloat(params.atticPipesQuiality5),
        'installed_length': parseFloat(params.atticPipesInstalledlength5),
        'diameter': parseFloat(params.atticPipesDiameter5),
        'heat_loss_unit': parseFloat(params.atticPipesHeatLossUnit5),
        'heat_loss_year': parseFloat(params.atticPipesHeatLossYear5)
      }, {
        'quality': parseFloat(params.atticPipesQuiality6),
        'installed_length': parseFloat(params.atticPipesInstalledlength6),
        'diameter': parseFloat(params.atticPipesDiameter6),
        'heat_loss_unit': parseFloat(params.atticPipesHeatLossUnit6),
        'heat_loss_year': parseFloat(params.atticPipesHeatLossYear6)
      }, {
        'quality': parseFloat(params.atticPipesQuiality7),
        'installed_length': parseFloat(params.atticPipesInstalledlength7),
        'diameter': parseFloat(params.atticPipesDiameter7),
        'heat_loss_unit': parseFloat(params.atticPipesHeatLossUnit7),
        'heat_loss_year': parseFloat(params.atticPipesHeatLossYear7)
      }, {
        'quality': parseFloat(params.atticPipesQuiality8),
        'installed_length': parseFloat(params.atticPipesInstalledlength8),
        'diameter': parseFloat(params.atticPipesDiameter8),
        'heat_loss_unit': parseFloat(params.atticPipesHeatLossUnit8),
        'heat_loss_year': parseFloat(params.atticPipesHeatLossYear8)
      }, {
        'quality': parseFloat(params.atticPipesQuiality9),
        'installed_length': parseFloat(params.atticPipesInstalledlength9),
        'diameter': parseFloat(params.atticPipesDiameter9),
        'heat_loss_unit': parseFloat(params.atticPipesHeatLossUnit9),
        'heat_loss_year': parseFloat(params.atticPipesHeatLossYear9)
      }
    ],
    'total_ht': parseFloat(params.totalHt),
    'heatgains_internal': parseFloat(params.heatGainsInternal),
    'heatgains_solar': parseFloat(params.heatGainsSolar),
    'airex_windows': {
      'baseyear_n': parseFloat(params.airExchangeReplacedWindowsBase),
      'baseyear_n_1': parseFloat(params.airExchangeReplacedWindowsBase1),
      'baseyear_n_2': parseFloat(params.airExchangeReplacedWindowsBase2)
    },
    'airex_building': {
      'baseyear_n': parseFloat(params.airExchangeBuildingBase),
      'baseyear_n_1': parseFloat(params.airExchangeBuildingBase1),
      'baseyear_n_2': parseFloat(params.airExchangeBuildingBase2)
    },
    'airex_total': {
      'baseyear_n': parseFloat(params.airExchangeTotalBase),
      'baseyear_n_1': parseFloat(params.airExchangeTotalBase1),
      'baseyear_n_2': parseFloat(params.airExchangeTotalBase2)
    },
    'heated_volume_building': parseFloat(params.heatedVolumeBuilding),
    'total_energy_consumption': {
      'baseyear_n': parseFloat(params.totalEnergyConsumptionBase),
      'baseyear_n_1': parseFloat(params.totalEnergyConsumptionBase1),
      'baseyear_n_2': parseFloat(params.totalEnergyConsumptionBase2)
    },
    'total_energy_consumption_circulation': {
      'baseyear_n': parseFloat(params.totalEnergyConsumptionCirculationBase),
      'baseyear_n_1': parseFloat(params.totalEnergyConsumptionCirculationBase1),
      'baseyear_n_2': parseFloat(params.totalEnergyConsumptionCirculationBase2)
    },
    'circulation_losses': {
      'baseyear_n': parseFloat(params.circulationLossesBase),
      'baseyear_n_1': parseFloat(params.circulationLossesBase1),
      'baseyear_n_2': parseFloat(params.circulationLossesBase2)
    },
    'distribution_losses_basement': parseFloat(params.distributionLossesBasement),
    'distribution_losses_attic': parseFloat(params.distributionLossesAttic),
    'total_measured': {
      'baseyear_n': parseFloat(params.totalMeasuredBase),
      'baseyear_n_1': parseFloat(params.totalMeasuredBase1),
      'baseyear_n_2': parseFloat(params.totalMeasuredBase2)
    },
    'total_calculated': {
      'baseyear_n': parseFloat(params.totalCalculatedBase),
      'baseyear_n_1': parseFloat(params.totalCalculatedBase1),
      'baseyear_n_2': parseFloat(params.totalCalculatedBase2)
    },
    'indoor_temp': {
      'baseyear_n': parseFloat(params.indoorTemperatureBase),
      'baseyear_n_1': parseFloat(params.indoorTemperatureBase1),
      'baseyear_n_2': parseFloat(params.indoorTemperatureBase2)
    }
  };

  const config = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend)
  };

  return dispatch => {
    dispatch({ type: UPDATE_INDOOR_CLIMA_REQUEST });
    return fetch(ENDPOINTS.SERVER + `/project/${projectId}/indoorclima`, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        try {
          dispatch({ type: UPDATE_INDOOR_CLIMA_SUCCESS, data });
          dispatch(addAlert({ text: 'Saved successfully', level: 'success' }));
        } catch (err) {
          dispatch({ type: UPDATE_INDOOR_CLIMA_FAILURE });
          dispatch(addAlert({ text: 'Something went wrong! The information was not saved!', level: 'error' }));
        }
      });
  };
}

// eslint-disable-next-line id-length
export function isFetchingListProjectSetDefault() {
  return (dispatch) => {
    dispatch({ type: ISFETCHING_LIST_PROJECT_SET_DEFAULT });
  };
}

// eslint-disable-next-line id-length
export function isFetchingSingleProjectSetDefault() {
  return (dispatch) => {
    dispatch({ type: ISFETCHING_SINGLE_PROJECT_SET_DEFAULT });
  };
}

export function getMarkdown(projectID) {
  const config = {
    method: 'GET',
    credentials: 'include',
  };

  return async (dispatch) => {
    dispatch({ type: GET_MARKDOWN_REQUEST });
    try {
      const response = await fetch(ENDPOINTS.SERVER + '/project/' + projectID + '/markdown', config);
      if (!response.ok) {
        dispatch({ type: GET_MARKDOWN_FAILURE });
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const data = await response.text();
      dispatch({ type: GET_MARKDOWN_SUCCESS, payload: data });

      return data;
    } catch (err) {
      dispatch({ type: GET_MARKDOWN_FAILURE });
      dispatch(addAlert({
        text: i18n.t('translations:errors.somethingWentWrong', { error: err.message }),
        level: 'error',
      }));
      return '';
    }
  };
}

export function updateMarkdown(id, markdown) {
  const config = {
    method: 'PUT',
    credentials: 'include',
    body: markdown
  };

  return async (dispatch) => {
    dispatch({ type: UPDATE_MARKDOWN_REQUEST });
    try {
      const response = await fetch(ENDPOINTS.SERVER + '/project/' + id + '/markdown', config);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const data = await response.text();
      dispatch({ type: UPDATE_MARKDOWN_SUCCESS, payload: data });
      dispatch(addAlert({
        text: i18n.t('translations:utils.successfulUpdate'),
        level: 'success'
      }));
    } catch (err) {
      dispatch({ type: UPDATE_MARKDOWN_FAILURE });
      dispatch(addAlert({
        text: i18n.t('translations:errors.somethingWentWrong', { error: err.message }),
        level: 'error'
      }));
    }
  };
}

export function updateMaintenanceRows(projectID, data) {
  const config = {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(data),
  };

  return (dispatch) => {
    dispatch({ type: 'BUILDING_MAINTENANCE#UPDATE' });
    return fetch(`${ENDPOINTS.SERVER}/project/${projectID}/maintenance/fields`, config)
      .then(response => {
        if (!response.ok) {
          throw response.status;
        }

        return response.json();
      })
      .then(d => {
        dispatch({ type: 'BUILDING_MAINTENANCE#UPDATE_COMPLETE', payload: d.data.maintenance });
        dispatch(addAlert({ text: i18n.t('translations:projects.maintenanceDataSaveSuccess'), level: 'success' }));
      })
      .catch((error) => {
        dispatch({ type: 'BUILDING_MAINTENANCE#ERROR', payload: error });
        dispatch(addAlert({ text: i18n.t('translations:projects.maintenanceDataSaveError', { error }), level: 'error' }));
      });
  };
}

export function getMaintenanceRows(projectID) {
  const config = {
    method: 'GET',
    credentials: 'include',
  };

  return (dispatch) => {
    dispatch({ type: 'BUILDING_MAINTENANCE#GET' });
    return fetch(`${ENDPOINTS.SERVER}/project/${projectID}/maintenance/fields`, config)
      .then(response => {
        if (!response.ok) {
          throw response.status;
        }

        return response.json();
      })
      .then(d => {
        dispatch({ type: 'BUILDING_MAINTENANCE#GET_COMPLETE', payload: d });
      })
      .catch((err) => {
        dispatch({ type: 'BUILDING_MAINTENANCE#ERROR', payload: err });
      });
  };
}
