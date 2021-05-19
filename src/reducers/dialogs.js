import {
  TOGGLE_REGISTER_ASSET_DIALOG,
  TOGGLE_REGISTER_ORGANIZATION_DIALOG,
  TOGGLE_REGISTER_PROJECT_DIALOG,
  TOGGLE_EDIT_ORGANIZATION_DIALOG,
  TOGGLE_EDIT_ASSET_DIALOG,
  TOGGLE_EDIT_PROJECT_DIALOG,
  TOGGLE_LOG_BACK_IN_DIALOG,
} from './../constants/actionTypes';

export default function(state = {
  registerAssetDialog: false,
  registerOrganizationDialog: false,
  registerProjectDialog: false,
  editOrganizationDialog: false,
  editAssetDialog: false,
  editProjectDialog: false,
  logBackInDialog: false,
}, action) {
  switch (action.type) {
    case TOGGLE_REGISTER_ORGANIZATION_DIALOG:
      return Object.assign({}, state, { registerOrganizationDialog: !state.registerOrganizationDialog });
    case TOGGLE_REGISTER_ASSET_DIALOG:
      return Object.assign({}, state, { registerAssetDialog: !state.registerAssetDialog });
    case TOGGLE_REGISTER_PROJECT_DIALOG:
      return Object.assign({}, state, { registerProjectDialog: !state.registerProjectDialog });
    case TOGGLE_EDIT_ORGANIZATION_DIALOG:
      return Object.assign({}, state, { editOrganizationDialog: !state.editOrganizationDialog });
    case TOGGLE_EDIT_ASSET_DIALOG:
      return Object.assign({}, state, { editAssetDialog: !state.editAssetDialog });
    case TOGGLE_EDIT_PROJECT_DIALOG:
      return Object.assign({}, state, { editProjectDialog: !state.editProjectDialog });
    case TOGGLE_LOG_BACK_IN_DIALOG:
      return { ...state, logBackInDialog: !state.logBackInDialog };
    default:
      return state;
  }
}
