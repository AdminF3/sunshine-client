import {
  SET_ASSET_TYPE_FILTER, CLEAR_MY_ASSETS,
  ASSET_REGISTER_REQUEST, ASSET_REGISTER_SUCCESS, ASSET_REGISTER_FAILURE,
  SEARCH_ASSETS_REQUEST, SEARCH_ASSETS_SUCCESS, SEARCH_ASSETS_FAILURE,
  SEARCH_MY_ASSETS_REQUEST, SEARCH_MY_ASSETS_SUCCESS, SEARCH_MY_ASSETS_FAILURE,
  ALL_ASSET_REQUEST, ALL_ASSET_SUCCESS, ALL_ASSET_FAILURE,
  ASSET_UPDATE_REQUEST, ASSET_UPDATE_SUCCESS, ASSET_UPDATE_FAILURE,
  GET_SINGLE_ASSET_REQUEST, GET_SINGLE_ASSET_SUCCESS, GET_SINGLE_ASSET_FAILURE,
  GET_MYASSETS_REQUEST, GET_MYASSETS_SUCCESS, GET_MYASSETS_FAILURE,
  SET_ALL_ASSETS_NUMBER, SET_MY_ASSETS_NUMBER,
  SET_LOGGED_USER_ROLE_IN_ASSET, UNSET_LOGGED_USER_ROLE_IN_ASSET,
  ISFETCHING_SINGLE_ASSET_SET_DEFAULT, ISFETCHING_LIST_ASSET_SET_DEFAULT
} from './../constants/actionTypes';

// eslint-disable-next-line
export default function assetReducer(state = {
  isFetchingSingle: true,
  isFetchingList: true,
  fetchingAst: false,
  singleAssetReady: false,
  loggedUserRoleInAsset: '',
  typeFilter: null,
  allAssetsNumber: null,
  allAssets: [],
  allAssetsReady: false,
  myAssetsNumber: null,
  myAssets: [],
  singleAsset: {},
  registered: '',
  search: {
    id: null,
    name: null
  },
  updating: false,
  loading: true,
  error: null,
}, action) {
  switch (action.type) {
    case ASSET_REGISTER_REQUEST:
      return Object.assign({}, state, {
        updating: true
      });
    case ASSET_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        registered: action.payload._id,
        updating: false,
      });
    case ASSET_REGISTER_FAILURE:
      return Object.assign({}, state, {
        updating: false
      });
    case SEARCH_ASSETS_REQUEST:
      return Object.assign({}, state, {
        isFetchingList: true,
        allAssetsReady: false,
      })
    case SEARCH_ASSETS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingList: false,
        allAssetsReady: true,
        allAssets: action.payload,
      })
    case SEARCH_ASSETS_FAILURE:
      return Object.assign({}, state, {
        allAssetsReady: true,
        isFetchingList: false,
        allAssets: [],
        allAssetsNumber: 0,
      });
    case SEARCH_MY_ASSETS_REQUEST:
      return Object.assign({}, state, {
        isFetchingList: true
      })
    case SEARCH_MY_ASSETS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingList: false,
        myAssets: action.payload
      })
    case SEARCH_MY_ASSETS_FAILURE:
      return Object.assign({}, state, {
        isFetchingList: false,
        myAssets: []
      })
    case ALL_ASSET_REQUEST:
      return Object.assign({}, state, {
        isFetchingList: true,
        allAssetsReady: false,
      })
    case ALL_ASSET_SUCCESS:
      return Object.assign({}, state, {
        allAssetsReady: true,
        isFetchingList: false,
        allAssets: action.all
      })
    case ALL_ASSET_FAILURE:
      return Object.assign({}, state, {
        allAssetsReady: true,
        isFetchingList: false,
        allAssets: []
      })
    case SET_ASSET_TYPE_FILTER:
      return Object.assign({}, state, {
        typeFilter: action.value
      });
    case ASSET_UPDATE_REQUEST:
      return Object.assign({}, state, {
        updating: true,
      });
    case ASSET_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        updating: false,
        singleAsset: action.payload,
      });
    case ASSET_UPDATE_FAILURE:
      return Object.assign({}, state, {
        updating: false,
      });
    case GET_SINGLE_ASSET_REQUEST:
      return Object.assign({}, state, {
        isFetchingSingle: true,
        singleAssetReady: false
      })
    case GET_SINGLE_ASSET_SUCCESS:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        singleAssetReady: true,
        singleAsset: action.payload,
        registered: ''
      })
    case GET_SINGLE_ASSET_FAILURE:
      return Object.assign({}, state, {
        isFetchingSingle: false,
        singleAssetReady: false,
        error: action.payload.error,
      });
    case GET_MYASSETS_REQUEST:
      return Object.assign({}, state, {
        isFetchingList: true
      })
    case GET_MYASSETS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingList: false,
        myAssets: action.payload
      })
    case GET_MYASSETS_FAILURE:
      return Object.assign({}, state, {
        isFetchingList: false
      })
    case SET_ALL_ASSETS_NUMBER:
      return Object.assign({}, state, {
        allAssetsNumber: parseInt(action.payload, 10),
      });
    case SET_MY_ASSETS_NUMBER:
      return Object.assign({}, state, {
        myAssetsNumber: parseInt(action.payload, 10),
      });
    case SET_LOGGED_USER_ROLE_IN_ASSET:
      return Object.assign({}, state, {
        loggedUserRoleInAsset: action.payload
      });
    case UNSET_LOGGED_USER_ROLE_IN_ASSET:
      return Object.assign({}, state, {
        loggedUserRoleInAsset: ''
      });
    case ISFETCHING_SINGLE_ASSET_SET_DEFAULT:
      return Object.assign({}, state, {
        isFetchingSingle: true,
      })
    case ISFETCHING_LIST_ASSET_SET_DEFAULT:
      return Object.assign({}, state, {
        isFetchingList: true,
      })
    case CLEAR_MY_ASSETS:
      return Object.assign({}, state, {
        myAssets: [],
      })
    default:
      return state;
  }
}
