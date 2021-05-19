import { TOGGLE_ACTIVE_ANNEX } from './../constants/actionTypes';

export default function alertReducer(state = {
  activeAnnex: 0,
  loading: false,
  error: null,
}, action = {}) {
  switch (action.type) {
    case TOGGLE_ACTIVE_ANNEX:
      return { ...state, activeAnnex: action.payload };
    default:
      return state;
  }
}
