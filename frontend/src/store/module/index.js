import { combineReducers } from 'redux';
import global from './global';
import auth from './auth';
import community from './community';
import meeting from './meeting';

const rootReducer = combineReducers({
  global,
  auth,
  community,
  meeting,
});

export default rootReducer;
