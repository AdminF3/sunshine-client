import {
  GET_ALLUSERS_SUCCESS, GET_ALLUSERS_FAILURE, GET_ALLUSERS_REQUEST, SET_USERS_FILTER,
  SEARCH_USERS_REQUEST, SEARCH_USERS_SUCCESS, SEARCH_USERS_FAILURE, SET_ALL_USERS_NUMBER,
  ISFETCHING_USERS_SET_DEFAULT, SET_ALL_USERS_PD
} from './../constants/actionTypes';

/* eslint-disable complexity */
export default function usersReducer(state = {
  isUsersFetching: true,
  userFilterValue: null,
  allUsersNumber: null,
  allUsersReady: false,
  users: [],
  usersPD: [],
}, action) {
  switch (action.type) {
    case GET_ALLUSERS_REQUEST:
      return Object.assign({}, state, {
        isUsersFetching: true,
        allUsersReady: false,
      });
    case GET_ALLUSERS_SUCCESS:
      return Object.assign({}, state, {
        isUsersFetching: false,
        allUsersReady: true,
        users: action.users
      });
    case GET_ALLUSERS_FAILURE:
      return Object.assign({}, state, {
        isUsersFetching: false,
        allUsersReady: true,
      });
    case SET_USERS_FILTER:
      return Object.assign({}, state, {
        userFilterValue: action.payload
      });
    case SEARCH_USERS_REQUEST:
      return Object.assign({}, state, {
        isUsersFetching: true,
        allUsersReady: false,
      });
    case SEARCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        isUsersFetching: false,
        allUsersReady: true,
        users: action.payload
      });
    case SEARCH_USERS_FAILURE:
      return Object.assign({}, state, {
        isUsersFetching: false,
        allUsersReady: true,
        users: [],
      });
    case SET_ALL_USERS_NUMBER:
      return Object.assign({}, state, {
        allUsersNumber: action.payload,
      });
    case ISFETCHING_USERS_SET_DEFAULT:
      return Object.assign({}, state, {
        isUsersFetching: true,
      });
    case SET_ALL_USERS_PD:
      return Object.assign({}, state, {
        usersPD: action.payload
      });
    default:
      return state;
  }
}
/* eslint-enable complexity */
