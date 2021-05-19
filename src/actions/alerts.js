import { ADD_ALERT, REMOVE_ALERT } from './../constants/actionTypes';

export function addAlert(alert) {
  return {
    type: ADD_ALERT,
    text: alert.text,
    level: alert.level,
    titleKey: alert.titleKey,
    textKey: alert.textKey,
    alertType: alert.alertType,
    timeout: alert.timeout && alert.timeout
  };
}

export function removeAlert(id) {
  return {
    type: REMOVE_ALERT,
    id
  };
}
