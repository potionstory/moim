import { combineReducers } from 'redux';
import header from './header';
import community from './community';
import meeting from './meeting';

const rootReducer = combineReducers({
  header,
  community,
  meeting,
});

export default rootReducer;
