import {
  SET_ORGANIZATION_TYPE_FILTER,
  ALL_ORGANIZATIONS_REQUEST, ALL_ORGANIZATIONS_SUCCESS, ALL_ORGANIZATIONS_FAILURE,
  SEARCH_ORGANIZATIONS_REQUEST, SEARCH_ORGANIZATIONS_SUCCESS, SEARCH_ORGANIZATIONS_FAILURE,
  ORGANIZATION_REGISTER_REQUEST, ORGANIZATION_REGISTER_SUCCESS, ORGANIZATION_REGISTER_FAILURE,
  GET_SINGLE_ORGANIZATION_REQUEST, GET_SINGLE_ORGANIZATION_SUCCESS, GET_SINGLE_ORGANIZATION_FAILURE,
  ORGANIZATION_UPDATE_REQUEST, ORGANIZATION_UPDATE_SUCCESS, ORGANIZATION_UPDATE_FAILURE,
  MY_ORGANIZATIONS_REQUEST, MY_ORGANIZATIONS_SUCCESS, MY_ORGANIZATIONS_FAILURE,
  UPLOAD_ORGANIZATION_LOGO_REQUEST, UPLOAD_ORGANIZATION_LOGO_SUCCESS, UPLOAD_ORGANIZATION_LOGO_FAILURE,
  SET_LOGGED_USER_ROLE_IN_ORGANIZATION, UNSET_LOGGED_USER_ROLE_IN_ORGANIZATION, SET_ALL_ORGANIZATIONS_NUMBER, SET_MY_ORGANIZATIONS_NUMBER,
  SEARCH_MY_ORGANIZATIONS_REQUEST, SEARCH_MY_ORGANIZATIONS_FAILURE, SEARCH_MY_ORGANIZATIONS_SUCCESS,
  ISFETCHING_LIST_ORGANIZATION_SET_DEFAULT, ISFETCHING_SINGLE_ORGANIZATION_SET_DEFAULT,
  THEIR_ORGANIZATIONS_REQUEST, THEIR_ORGANIZATIONS_SUCCESS, THEIR_ORGANIZATIONS_FAILURE
} from './../constants/actionTypes';

// eslint-disable-next-line complexity
export default function organizationReducer(state = {
  isFetchingList: true,
  isFetchingSingle: true,
  isFetchingMine: true,
  legalFormFilterValue: null,
  allOrganizationsReady: false,
  allOrganizations: [],
  allOrganizationsNumber: null,
  myOrganizations: [],
  myOrganizationsNumber: null,
  theirOrganizations: [],
  filteredOrganizations: [],
  organizationsRoles: [],
  publicOrgData: {},
  singleOrganizationReady: false,
  loggedUserRoleInOrganization: '',
  registered: '',
  search: {
    id: null,
    name: null
  },
  error: null,
}, action) {
  switch (action.type) {
    case SEARCH_ORGANIZATIONS_REQUEST:
      return Object.assign({}, state, {
        isFetchingList: true,
        allOrganizationsReady: false,
      });
    case SEARCH_ORGANIZATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingList: false,
        allOrganizationsReady: true,
        allOrganizations: action.payload
      });
    case SEARCH_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        allOrganizationsReady: true,
        allOrganizations: [],
        isFetchingList: false,
        error: action.error,
      };
    case 'SEARCH_ORGANIZATIONS#RESET':
      return { ...state, isFetchingList: false, error: null, allOrganizations: [] };
    case SEARCH_MY_ORGANIZATIONS_REQUEST:
      return Object.assign({}, state, {
        isFetchingList: true
      });
    case SEARCH_MY_ORGANIZATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingList: false,
        myOrganizations: action.payload
      });
    case SEARCH_MY_ORGANIZATIONS_FAILURE:
      return Object.assign({}, state, {
        isFetchingList: false,
        myOrganizations: []
      });
    case ORGANIZATION_REGISTER_REQUEST:
      return Object.assign({}, state, {
        // isFetchingSingle: true
      });
    case ORGANIZATION_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        // isFetchingSingle: false,
        registered: action.data._id
      });
    case ORGANIZATION_REGISTER_FAILURE:
      return Object.assign({}, state, {
        // isFetchingSingle: false
      });
    case ALL_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        allOrganizationsReady: false,
        isFetchingList: true,
      };
    case ALL_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        isFetchingList: false,
        allOrganizationsReady: true,
        allOrganizations: action.payload,
      };
    case ALL_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        allOrganizationsReady: true,
        isFetchingList: false,
        allOrganizations: [],
      };
    case MY_ORGANIZATIONS_REQUEST:
      return Object.assign({}, state, {
        isFetchingMine: true
      });
    case MY_ORGANIZATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingMine: false,
        myOrganizations: action.payload
      });
    case MY_ORGANIZATIONS_FAILURE:
      return Object.assign({}, state, {
        isFetchingMine: false
      });
    case THEIR_ORGANIZATIONS_REQUEST:
      return Object.assign({}, state, {
        isFetchingMine: true
      });
    case THEIR_ORGANIZATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingMine: false,
        theirOrganizations: action.payload
      });
    case THEIR_ORGANIZATIONS_FAILURE:
      return Object.assign({}, state, {
        isFetchingMine: false
      });
    case SET_ORGANIZATION_TYPE_FILTER:
      return Object.assign({}, state, {
        legalFormFilterValue: action.value
      });
    case GET_SINGLE_ORGANIZATION_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true,
        singleOrganizationReady: false
      });
    case GET_SINGLE_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        singleOrganizationReady: true,
        publicOrgData: action.payload,
        registered: ''
      });
    case GET_SINGLE_ORGANIZATION_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        singleOrganizationReady: false
      });
    case ORGANIZATION_UPDATE_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true
      });
    case ORGANIZATION_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        publicOrgData: action.data,
      });
    case ORGANIZATION_UPDATE_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false
      });
    case UPLOAD_ORGANIZATION_LOGO_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true
      });
    case UPLOAD_ORGANIZATION_LOGO_SUCCESS:
      return Object.assign({}, state, {
        isFetchingSingle: false,
      });
    case UPLOAD_ORGANIZATION_LOGO_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false
      });
    case SET_LOGGED_USER_ROLE_IN_ORGANIZATION:
      return Object.assign({}, state, {
        loggedUserRoleInOrganization: action.payload
      });
    case UNSET_LOGGED_USER_ROLE_IN_ORGANIZATION:
      return Object.assign({}, state, {
        loggedUserRoleInOrganization: ''
      });
    case SET_ALL_ORGANIZATIONS_NUMBER:
      return {
        ...state,
        allOrganizationsNumber: parseInt(action.payload, 10),
      };
    case SET_MY_ORGANIZATIONS_NUMBER:
      return Object.assign({}, state, {
        myOrganizationsNumber: action.payload,
      });
    case ISFETCHING_SINGLE_ORGANIZATION_SET_DEFAULT:
      return Object.assign({}, state, {
        isFetchingSingle: true,
      });
    case ISFETCHING_LIST_ORGANIZATION_SET_DEFAULT:
      return Object.assign({}, state, {
        isFetchingList: true,
      });
    default:
      return state;
  }
}
