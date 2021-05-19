export const projectEditorInitialState = {
  name: '',
  assetUUID: '',
  ownerUUID: '',
  consortium_organizations: [],
  status: 1,
  airtemp: '',
  watertemp: '',
  savings: '',
  contract_term: '',
  first_year: '',
  construction_from: '',
  construction_to: '',
  publicOrganizationQuery: '',
  publicOrganization: null,
  touched: false,
  loading: false,
  error: null,
};

export function projectEditorReducer(state = projectEditorInitialState, payload) {
  switch (payload.action) {
    case 'setData':
      const error = payload.data.error || null;
      const loading = Boolean(payload.data.loading);
      return {
        ...state,
        ...payload.data,
        touched: true,
        error,
        loading,
      };
    case 'resetData':
      return { ...projectEditorInitialState, ...payload.data };
    default:
      return state;
  }
}
