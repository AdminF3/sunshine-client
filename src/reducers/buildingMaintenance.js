const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'BUILDING_MAINTENANCE#SET_DATA':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'BUILDING_MAINTENANCE#UPDATE':
    case 'BUILDING_MAINTENANCE#GET':
      return { ...state, loading: true };
    case 'BUILDING_MAINTENANCE#UPDATE_COMPLETE':
    case 'BUILDING_MAINTENANCE#GET_COMPLETE':
      return { ...state, loading: false, data: action.payload };
    case 'BUILDING_MAINTENANCE#ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
