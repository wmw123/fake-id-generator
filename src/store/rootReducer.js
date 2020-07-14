import { combineReducers } from 'redux';
import photo from './photo/reducer';
import countries from './countries/reducer';

export default combineReducers({
  photo,
  countries,
});
