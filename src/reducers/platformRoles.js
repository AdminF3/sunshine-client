const initialState = {
  users: [],
  initialized: false,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_PLATFORM_ROLES_USERS':
      return { ...state, initialized: false, loading: true };
    case 'GET_PLATFORM_ROLES_USERS#SUCCESS':
      return { ...state, users: action.payload.users, initialized: true, loading: false };
    case 'GET_PLATFORM_ROLES_USERS#ERROR':
      return { ...state, error: action.error, initialized: true, loading: false };
    default:
      return state;
  }
}
