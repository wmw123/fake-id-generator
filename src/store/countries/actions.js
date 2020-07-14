import axios from 'axios';

export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';

export function countriesFetched(countries) {
  return {
    type: FETCH_COUNTRIES,
    payload: countries,
  };
}

export function fetchAllCountries() {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get('https://restcountries.eu/rest/v2/all');
      const countries = response.data;

      dispatch(countriesFetched(countries));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
}
