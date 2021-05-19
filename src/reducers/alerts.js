import { ADD_ALERT, REMOVE_ALERT } from './../constants/actionTypes';

export default function alertReducer(state = {
  pending: [],
  id: 0
}, action = {}) {
  switch (action.type) {
    case REMOVE_ALERT:
      return Object.assign({}, state, {
        pending: [...state.pending.filter(alert => alert.id !== action.id)]
      });
    case ADD_ALERT:
      return Object.assign({}, state, {
        id: state.id + 1,
        pending: [...state.pending, {
          id: state.id + 1,
          level: action.level,
          text: action.text,
          textKey: action.textKey,
          titleKey: action.titleKey,
          alertType: action.alertType,
          timeout: action.timeout && action.timeout
        }]
      });
    default:
      return state;
  }
}
