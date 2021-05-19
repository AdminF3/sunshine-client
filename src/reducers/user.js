import {
  SELECT_LANGUAGE_REQUEST, SELECT_LANGUAGE_SUCCESS, SELECT_LANGUAGE_FAILURE,
  PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_RESET,
  GET_PUBLIC_USERDATA_REQUEST, GET_PUBLIC_USERDATA_SUCCESS, GET_PUBLIC_USERDATA_FAILURE,
  UPLOAD_AVATAR_OF_USER_REQUEST, UPLOAD_AVATAR_OF_USER_SUCCESS, UPLOAD_AVATAR_OF_USER_FAILURE,
  CREATE_SUPERUSER_REQUEST,  CREATE_SUPERUSER_SUCCESS, CREATE_SUPERUSER_FAILURE,
  UPDATE_ANOTHER_USER_PROFILE_REQUEST, UPDATE_ANOTHER_USER_PROFILE_SUCCESS,
  UPDATE_ANOTHER_USER_PROFILE_FAILURE, CLEAR_PUBLIC_USER_DATA, SET_PUBLIC_USER_DATA_READY,
  DELETE_USER_FILE_REQUEST, DELETE_USER_FILE_SUCCESS, DELETE_USER_FILE_FAILURE,
  GET_MY_USERDATA_REQUEST, GET_MY_USERDATA_SUCCESS, GET_MY_USERDATA_FAILURE
} from './../constants/actionTypes';

// eslint-disable-next-line complexity
export default function userReducer(state = {
  isFetching: false,
  isAuthenticated: '',
  language: localStorage.getItem('i18nextLng') || 'en',
  changing: false,
  isSuperUser: false,
  profileInfo: { data: {} },
  creatingSuperuserProcessCompleted: false,
  updateAnotherUserProfileProcessCompleted: false,
  publicUserdata: { data: {} },
  publicUserdataReady: false,
  isLogged: false,
  countryAdminCountries: []
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: '',
        // publicUserdataReady: false,
        isLogged: false
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: action.data._id,
        didRegister: false,
        isLogged: true,
        // publicUserdataReady: true,
        isSuperUser: action.data.data.superuser ? action.data.data.superuser : false,
        countryAdminCountries: action.countryAdminCountries,
        profileInfo: {
          ...action.data
        },
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isLogged: false,
        isAuthenticated: '',
        // publicUserdataReady: false
      });
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case LOGOUT_SUCCESS:
    localStorage.removeItem('state')
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: '',
        didRegister: false,
        isSuperUser: false,
        profileInfo: '',
        isLogged: false
      });
    case LOGOUT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didRegister: false
      });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didRegister: true
      });
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didRegister: false
      });
    case REGISTER_RESET:
      return Object.assign({}, state, {
        isFetching: false,
        didRegister: false
      });
    case SELECT_LANGUAGE_REQUEST:
      return Object.assign({}, state, {
        changing: true,
      });
    case SELECT_LANGUAGE_SUCCESS:
      return Object.assign({}, state, {
        changing: false,
        language: action.language
      });
    case SELECT_LANGUAGE_FAILURE:
      return Object.assign({}, state, {
        changing: false,
      });
    case PROFILE_UPDATE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        profileInfo: action.payload
      });
    case PROFILE_UPDATE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case GET_PUBLIC_USERDATA_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        publicUserdata: {},
      });
    case GET_PUBLIC_USERDATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        publicUserdata: action.payload
      });
    case GET_PUBLIC_USERDATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case GET_MY_USERDATA_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_MY_USERDATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        profileInfo: {
          ...action.payload
        },
      });
    case GET_MY_USERDATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
     case SET_PUBLIC_USER_DATA_READY:
      return Object.assign({}, state, {
        // publicUserdataReady: true,
      });
    case CLEAR_PUBLIC_USER_DATA:
      return Object.assign({}, state, {
        publicUserdataReady: false,
        publicUserdata: []
      });
    case UPLOAD_AVATAR_OF_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case UPLOAD_AVATAR_OF_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      });
    case UPLOAD_AVATAR_OF_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case CREATE_SUPERUSER_REQUEST:
      return Object.assign({}, state, {
        creatingSuperuserProcessCompleted: true,
      });
    case CREATE_SUPERUSER_SUCCESS:
      return Object.assign({}, state, {
        creatingSuperuserProcessCompleted: false,
        publicUserdata: action.payload,
      });
    case CREATE_SUPERUSER_FAILURE:
      return Object.assign({}, state, {
        creatingSuperuserProcessCompleted: false,
      });
    case UPDATE_ANOTHER_USER_PROFILE_REQUEST:
      return Object.assign({}, state, {
        updateAnotherUserProfileProcessCompleted: true,
      });
    case UPDATE_ANOTHER_USER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        updateAnotherUserProfileProcessCompleted: false,
        publicUserdata: action.payload
      });
    case UPDATE_ANOTHER_USER_PROFILE_FAILURE:
      return Object.assign({}, state, {
        updateAnotherUserProfileProcessCompleted: false,
      });
    case DELETE_USER_FILE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case DELETE_USER_FILE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case DELETE_USER_FILE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state
  }
}
