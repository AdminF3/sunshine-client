export const organizationInitialState = {
  ID: '',
  name: '',
  vat: '',
  address: '',
  registered: '',
  registration_number: '',
  email: '',
  telephone: '',
  website: '',
  legal_form: '',
  country: '',
  roles: {
    lear: '',
    lsigns: [],
    leaas: [],
    members: []
  },
  logoURL: '',
  logoUpload: null,
  files: {},
  learApplyDoc: {},
  fieldErrors: {},
  communityAssetUUID: null,
  touched: false,
  loading: false,
  error: null,
};

export function organizationReducer(state = organizationInitialState, payload) {
  switch (payload.action) {
    case 'setData':
      const error = payload.data.error || null;
      const loading = Boolean(payload.data.loading);

      return {
        ...state,
        ...payload.data,
        roles: { ...state.roles, ...(payload.data.roles || {})},
        touched: true,
        error,
        loading,
      };
    case 'setFieldErrors':
      return {
        ...state,
        fieldErrors: { ...state.fieldErrors, ...payload.data },
      };
    case 'resetData':
      return { ...organizationInitialState, ...payload.data };
    default:
      return state;
  }
}
