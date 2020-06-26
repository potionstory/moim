import { combineReducers } from 'redux';
import global from './global';
import community from './community';
import meeting from './meeting';

const rootReducer = combineReducers({
  global,
  community,
  meeting,
});

export default rootReducer;
