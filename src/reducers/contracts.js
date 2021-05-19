const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default function contractsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PROJECT_CONTRACT':
      return { ...state, loading: true };
    case 'GET_PROJECT_CONTRACT#COMPLETE':
      const { projectID, language, data } = action.payload;

      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          [projectID]: {
            ...state.data[projectID],
            [language]: data,
          },
        },
      };
    case 'GET_PROJECT_CONTRACT#ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
