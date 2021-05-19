import ENDPOINTS from '../constants/endpoints';
import {
  TOGGLE_ACTIVE_ANNEX, GET_ENERGY_TABLE_REQUEST, GET_ENERGY_TABLE_SUCCESS, GET_ENERGY_TABLE_FAILURE,
  GET_MAINTENANCE_TABLE_REQUEST, GET_MAINTENANCE_TABLE_SUCCESS, GET_MAINTENANCE_TABLE_FAILURE,
  GET_FEES_TABLE_REQUEST, GET_FEES_TABLE_SUCCESS, GET_FEES_TABLE_FAILURE,
  GET_ANNEXES_FIELDS_REQUEST, GET_ANNEXES_FIELDS_SUCCESS, GET_ANNEXES_FIELDS_FAILURE,
  GET_BUDGET_TABLE_REQUEST, GET_BUDGET_TABLE_SUCCESS, GET_BUDGET_TABLE_FAILURE,
  UPDATE_ENERGY_TABLE_REQUEST, UPDATE_ENERGY_TABLE_SUCCESS, UPDATE_ENERGY_TABLE_FAILURE,
  UPDATE_MAINTENANCE_TABLE_REQUEST, UPDATE_MAINTENANCE_TABLE_SUCCESS, UPDATE_MAINTENANCE_TABLE_FAILURE,
  UPDATE_FEES_TABLE_REQUEST, UPDATE_FEES_TABLE_SUCCESS, UPDATE_FEES_TABLE_FAILURE,
  UPDATE_ANNEXES_FIELDS_REQUEST, UPDATE_ANNEXES_FIELDS_SUCCESS, UPDATE_ANNEXES_FIELDS_FAILURE,
  UPDATE_BUDGET_TABLE_REQUEST, UPDATE_BUDGET_TABLE_SUCCESS, UPDATE_BUDGET_TABLE_FAILURE, ANNEX_READY

} from './../constants/actionTypes';

import { addAlert } from './alerts';

const annex1Tables = [
  'project_development_renovations',
  'construction_costs_renovations',
  'project_supervision',
  'financial_charges',
  'renovation_overall_budget',
  'renovation_financial_plan',
  'workPhase_scope_renovation'
];

const annex3Tables = [
  'baseyear_n_2',
  'baseyear_n_1',
  'baseyear_n',
  'baseconditions_n_2',
  'baseconditions_n_1',
  'baseconditions_n',
  'baseline',
];

// annexUpdatesIndexMap holds map of annex-table paths
// and corresponding indexes from the `annex3Tables` array,
// making it posible for the update script to request fresh
// data for the relevant `annex3Tables`.
const annexUpdatesIndexMap = {
  'annex3/baseyear_n_2': [3, 6],
  'annex3/baseyear_n_1': [4, 6],
  'annex3/baseyear_n': [5, 6],
  'annex3/baseconditions_n_2': [6],
  'annex3/baseconditions_n_1': [6],
  'annex3/baseconditions_n': [6],
};

const annex4Tables = [
  'periodic_maint_activities_covered_by_contractor',
  'mid_term_preventative_activity',
  'long_term_provisioned_activities',
  'operation_maintenance_budget',
  'reccomended_maintanance_activity',
];

const annex5Tables = [
  'calc_energy_fee',
  'balancing_period_fee',
  'operations_maintenance_fee',
  'project_measurements_table',
];

export function toggleActiveAnnex(index) {
  return {
    type: TOGGLE_ACTIVE_ANNEX,
    payload: index
  };
}

function getTableSuccess(tableType, table, index) {
  return {
    type: tableType,
    data: table,
    table: index + 1
  };
}

function makeBudgetRequest(dispatch, config, params, index) {
  return fetch(ENDPOINTS.SERVER + '/project/' + params + '/annex1/' + annex1Tables[index], config)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      dispatch(getTableSuccess(GET_BUDGET_TABLE_SUCCESS, data, index));
    })
    .catch(() =>
      dispatch({ type: GET_BUDGET_TABLE_FAILURE })
    );
}

export function getBudgetTable(params) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };

  return (dispatch) => {
    dispatch({ type: GET_BUDGET_TABLE_REQUEST });
    Promise.all([
      makeBudgetRequest(dispatch, config, params, 0),
      makeBudgetRequest(dispatch, config, params, 1),
      makeBudgetRequest(dispatch, config, params, 2),
      makeBudgetRequest(dispatch, config, params, 3),
      makeBudgetRequest(dispatch, config, params, 4),
      makeBudgetRequest(dispatch, config, params, 5),
      makeBudgetRequest(dispatch, config, params, 6),
    ]).then(() => dispatch({ type: ANNEX_READY, key: 'annex1' }));
  };
}

function makeEnergyRequest(dispatch, projectID, index) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(ENDPOINTS.SERVER + '/project/' + projectID + '/annex3/' + annex3Tables[index], config)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      dispatch(getTableSuccess(GET_ENERGY_TABLE_SUCCESS, data, index));
    })
    .catch(() =>
      dispatch({ type: GET_ENERGY_TABLE_FAILURE })
    );
}

export function getEnergyTable(projectID) {
  return (dispatch) => {
    dispatch({ type: GET_ENERGY_TABLE_REQUEST });

    Promise.all([
      makeEnergyRequest(dispatch, projectID, 0),
      makeEnergyRequest(dispatch, projectID, 1),
      makeEnergyRequest(dispatch, projectID, 2),
      makeEnergyRequest(dispatch, projectID, 3),
      makeEnergyRequest(dispatch, projectID, 4),
      makeEnergyRequest(dispatch, projectID, 5),
      makeEnergyRequest(dispatch, projectID, 6),
    ]).then(() => dispatch({ type: ANNEX_READY, key: 'annex3' }));
  };
}

function makeMaintenanceRequest(dispatch, config, params, index) {
  return fetch(ENDPOINTS.SERVER + '/project/' + params + '/annex4/' + annex4Tables[index], config)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      dispatch(getTableSuccess(GET_MAINTENANCE_TABLE_SUCCESS, data, index));
    })
    .catch(() =>
      dispatch({ type: GET_MAINTENANCE_TABLE_FAILURE })
    );
}

export function getMaintenanceTable(params) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  return async (dispatch) => {
    dispatch({ type: GET_MAINTENANCE_TABLE_REQUEST });
    Promise.all([
      makeMaintenanceRequest(dispatch, config, params, 0),
      makeMaintenanceRequest(dispatch, config, params, 1),
      makeMaintenanceRequest(dispatch, config, params, 2),
      makeMaintenanceRequest(dispatch, config, params, 3),
      makeMaintenanceRequest(dispatch, config, params, 4),
    ]).then(() => dispatch({ type: ANNEX_READY, key: 'annex4' }));
  };
}

function makeFeesRequest(dispatch, config, params, index) {
  return fetch(ENDPOINTS.SERVER + '/project/' + params + '/annex5/' + annex5Tables[index], config)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      dispatch(getTableSuccess(GET_FEES_TABLE_SUCCESS, data, index));
    })
    .catch(() =>
      dispatch({ type: GET_FEES_TABLE_FAILURE })
    );
}

export function getFeesTable(params) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  return async (dispatch) => {
    dispatch({ type: GET_FEES_TABLE_REQUEST });
    Promise.all([
      makeFeesRequest(dispatch, config, params, 0),
      makeFeesRequest(dispatch, config, params, 1),
      makeFeesRequest(dispatch, config, params, 2),
      makeFeesRequest(dispatch, config, params, 3),
    ]).then(() => dispatch({ type: ANNEX_READY, key: 'annex5' }));
  };
}

export function getAnnexesFields(params) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  return (dispatch) => {
    dispatch({ type: GET_ANNEXES_FIELDS_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/project/' + params + '/fields', config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        dispatch({ type: GET_ANNEXES_FIELDS_SUCCESS, data });
      })
      .catch(() => dispatch({ type: GET_ANNEXES_FIELDS_FAILURE }));
  };
}

export function updateBudgetTable(params, projectId) {
  const tableName = params[2];
  const budgetTable = {
    'rows': params[1]
  };
  const config = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(budgetTable)
  };
  return dispatch => {
    dispatch({ type: UPDATE_BUDGET_TABLE_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/project/' + projectId + '/annex1/' + tableName, config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        dispatch({ type: UPDATE_BUDGET_TABLE_SUCCESS, data, table: tableName });
        dispatch(addAlert({ text: 'Table updated successfully', level: 'success' }));
      })
      .catch(() => {
        dispatch({ type: UPDATE_BUDGET_TABLE_FAILURE });
        dispatch(addAlert({ text: 'Something went wrong! The information was not saved!', level: 'error' }));
      });
  };
}

export function updateEnergyTable(params, projectId) {
  const tableName = params[2];
  const tableData = {
    'rows': params[1],
  };

  const config = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(tableData)
  };
  return dispatch => {
    dispatch({ type: UPDATE_ENERGY_TABLE_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/project/' + projectId + '/annex3/' + tableName, config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        dispatch({ type: UPDATE_ENERGY_TABLE_SUCCESS, data, table: tableName });
        dispatch(addAlert({ text: 'Table updated successfully', level: 'success' }));
      })
      .catch(() => {
        dispatch({ type: UPDATE_ENERGY_TABLE_FAILURE });
        dispatch(addAlert({ text: 'Something went wrong! The information was not saved!', level: 'error' }));
      });
  };
}

export function updateMaintenanceTable(params, projectId) {
  const tableName = params[2];
  const tableData = {
    'rows': params[1]
  };

  const config = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(tableData)
  };
  return dispatch => {

    dispatch({ type: UPDATE_MAINTENANCE_TABLE_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/project/' + projectId + '/annex4/' + tableName, config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        dispatch({ type: UPDATE_MAINTENANCE_TABLE_SUCCESS, data, table: tableName });
        dispatch(addAlert({ text: 'Table updated successfully', level: 'success' }));
      })
      .catch(() => {
        dispatch({ type: UPDATE_MAINTENANCE_TABLE_FAILURE });
        dispatch(addAlert({ text: 'Something went wrong! The information was not saved!', level: 'error' }));
      });
  };
}

export function updateFeesTable(params, projectId) {
  const tableName = params[2];

  const energyTable = {
    'rows': params[1]
  };
  const config = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(energyTable)
  };
  return dispatch => {
    dispatch({ type: UPDATE_FEES_TABLE_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/project/' + projectId + '/annex5/' + tableName, config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        dispatch({ type: UPDATE_FEES_TABLE_SUCCESS, data, table: tableName });
        dispatch(addAlert({ text: 'Table updated successfully', level: 'success' }));
      })
      .catch(() => {
        dispatch({ type: UPDATE_FEES_TABLE_FAILURE });
        dispatch(addAlert({ text: 'Something went wrong! The information was not saved!', level: 'error' }));
      });
  };
}

export function updateAnnexesFields(params, projectId, _settings) {
  const settings = { dispatchAlerts: true, ..._settings };

  const config = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(params)
  };
  return dispatch => {
    dispatch({ type: UPDATE_ANNEXES_FIELDS_REQUEST });
    return fetch(ENDPOINTS.SERVER + '/project/' + projectId + '/fields', config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        dispatch({ type: UPDATE_ANNEXES_FIELDS_SUCCESS, data: data.data.fields });
        if (settings.dispatchAlerts) {
          dispatch(addAlert({ text: 'Table updated successfully', level: 'success' }));
        }
      })
      .catch(() => {
        dispatch({ type: UPDATE_ANNEXES_FIELDS_FAILURE });
        if (settings.dispatchAlerts) {
          dispatch(addAlert({ text: 'Something went wrong! The information was not saved!', level: 'error' }));
        }
      });
  };
}

export function updateAnnexTable(params) {
  const {
    path,
    storeAnnexKey,
    storeAnnexTableKey,
    projectID,
    data,
  } = params;

  const config = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return dispatch => {
    dispatch({ type: 'UPDATE_ANNEX_TABLE_REQUEST' });
    return fetch(`${ENDPOINTS.SERVER}/project/${projectID}/${path}`, config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(d => {
        if (annexUpdatesIndexMap[path]) {
          Promise.all(annexUpdatesIndexMap[path].map(
            (idx) => makeEnergyRequest(dispatch, projectID, idx)
          )).then(() => {
            dispatch({ type: 'UPDATE_ANNEX_TABLE_SUCCESS', data: d, storeAnnexKey, storeAnnexTableKey });
            dispatch(addAlert({ text: 'Table updated successfully', level: 'success' }));
          });
          return;
        }
        dispatch({ type: 'UPDATE_ANNEX_TABLE_SUCCESS', data: d, storeAnnexKey, storeAnnexTableKey });
        dispatch(addAlert({ text: 'Table updated successfully', level: 'success' }));
      })
      .catch(() => {
        dispatch({ type: 'UPDATE_ANNEX_TABLE_ERROR' });
        dispatch(addAlert({ text: 'Something went wrong! The information was not saved!', level: 'error' }));
      });
  };
}
