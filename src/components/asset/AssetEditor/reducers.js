export const assetRegisterInitialState = {
  mapCenter: [56.9496, 24.1052],
  addressLocation: null,
  searchQuery: '',
  searchResults: [],
  addressLocationMap: {
    streetAddress: '',
    city: '',
    postcode: '',
    country: '',
  },
  address: '',
  cadastre: '',
  owner: '',
  esco: null,
  area: '',
  heated_area: '',
  billing_area: '',
  flats: '',
  floors: '',
  stair_cases: '',
  building_type: '',
  common_parts_area: '',
  category: 'residential',
  heating_type: '',
  country: '',
  touched: false,
  loading: false,
  error: null,
};

export function assetRegisterReducer(state = assetRegisterInitialState, payload) {
  switch (payload.action) {
    case 'setData':
      const error = payload.data.error || null;
      const loading = Boolean(payload.data.loading);

      return {
        ...state,
        ...payload.data,
        addressLocationMap: {
          ...state.addressLocationMap,
          ...(payload.data.addressLocationMap || {}),
        },
        touched: true,
        error,
        loading,
      };
    case 'resetData':
      return { ...assetRegisterInitialState, ...payload.data };
    default:
      return state;
  }
}
