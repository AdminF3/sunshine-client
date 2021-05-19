import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user';
import alertReducer from './alerts';
import organizationsReducer from './organizations';
import assetReducer from './assets';
import projectReducer from './projects';
import usersReducer from './users';
import authReducer from './auth';
import dialogsReducer from './dialogs';
import annexReducer from './annex';
import statsReducer from './stats';
import uploadsReducer from './uploads';
import platformRolesReducer from './platformRoles';
import buildingMaintenance from './buildingMaintenance';
import contractsReducer from './contracts';
import agreementsReducer from './agreements';

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  alerts: alertReducer,
  organization: organizationsReducer,
  asset: assetReducer,
  project: projectReducer,
  auth: authReducer,
  dialogs: dialogsReducer,
  form: formReducer,
  annex: annexReducer,
  stats: statsReducer,
  uploads: uploadsReducer,
  platformRoles: platformRolesReducer,
  buildingMaintenance,
  contracts: contractsReducer,
  agreements: agreementsReducer,
});

export default rootReducer;
