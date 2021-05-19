const initialState = {
  uploading: false,
  deleting: false,
  error: null,
};

export default function uploadsReducer(state = initialState, payload) {
  switch (payload.type) {
    case 'UPLOAD_DOCUMENT#START':
      return { ...state, uploading: true };
    case 'UPLOAD_DOCUMENT#SUCCESS':
      return { ...state, uploading: false };
    case 'UPLOAD_DOCUMENT#ERROR':
      return { ...state, error: payload.error, uploading: false };
    case 'DELETE_DOCUMENT#START':
      return { ...state, deleting: true };
    case 'DELETE_DOCUMENT#SUCCESS':
      return { ...state, deleting: false };
    case 'DELETE_DOCUMENT#ERROR':
      return { ...state, error: payload.error, deleting: false };
    default:
      return state;
  }
}
