import { GET_COUNTRY_STATS_SUCCESS } from '../constants/actionTypes';

const defaulState = {
  countries: {
    Latvia: { assets: 0, organizations: 0, projects: 0, users: 0 },
    Poland: { assets: 0, organizations: 0, projects: 0, users: 0 },
    Bulgaria: { assets: 0, organizations: 0, projects: 0, users: 0 },
    Romania: { assets: 0, organizations: 0, projects: 0, users: 0 },
    Slovakia: { assets: 0, organizations: 0, projects: 0, users: 0 },
    Austria: { assets: 0, organizations: 0, projects: 0, users: 0 },
  },
};

export default function statsReducer(state = defaulState, action) {
  switch (action.type) {
      case GET_COUNTRY_STATS_SUCCESS:
        return { countries: { ...state.countries, ...action.payload } };
      default:
        return state;
    }
}
