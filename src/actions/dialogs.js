import {
  TOGGLE_REGISTER_ASSET_DIALOG,
  TOGGLE_REGISTER_ORGANIZATION_DIALOG,
  TOGGLE_REGISTER_PROJECT_DIALOG,
  TOGGLE_EDIT_ASSET_DIALOG,
  TOGGLE_EDIT_ORGANIZATION_DIALOG,
  TOGGLE_EDIT_PROJECT_DIALOG
} from './../constants/actionTypes';

export const toggleProjectDialog = () => {
  return {
    type: TOGGLE_REGISTER_PROJECT_DIALOG
  }
}

export const toggleAssetDialog = () => {
  return {
    type: TOGGLE_REGISTER_ASSET_DIALOG
  }
}

export const toggleOrganizationDialog = () => {
  return {
    type: TOGGLE_REGISTER_ORGANIZATION_DIALOG
  }
}

export const toggleEditOrganizationDialog = () => {
  return {
    type: TOGGLE_EDIT_ORGANIZATION_DIALOG
  }
}

export const toggleEditAssetDialog = () => {
  return {
    type: TOGGLE_EDIT_ASSET_DIALOG
  }
}

export const toggleEditProjectDialog = () => {
  return {
    type: TOGGLE_EDIT_PROJECT_DIALOG
  }
}
