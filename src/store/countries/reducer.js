import { FETCH_COUNTRIES } from './actions';

const initialState = {
  allCountries: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return { ...state, allCountries: action.payload };
    default:
      return state;
  }
};
