import { combineReducers } from 'redux';
import global from './global';
import auth from './auth';
import community from './community';
import meeting from './meeting';
import util from './util';

const rootReducer = combineReducers({
  global,
  auth,
  community,
  meeting,
  util,
});

export default rootReducer;
