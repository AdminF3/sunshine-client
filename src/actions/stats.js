import ENDPOINTS from '../constants/endpoints';
import { GET_COUNTRY_STATS, GET_COUNTRY_STATS_SUCCESS } from '../constants/actionTypes';

export function getCountryStats() {
    const config = {
        method: "GET",
        credentials: "include",
        headers: {'Content-Type': 'application/json'}
    }

    return(dispatch) => {
        dispatch({type: GET_COUNTRY_STATS});
        return fetch(ENDPOINTS.SERVER + '/country_stats', config)
        .then(response => response.json()
        .then(data => {
            if (response.ok) {
                dispatch({type: GET_COUNTRY_STATS_SUCCESS, payload: data});
            }
        }))
    }
}