import { combineReducers } from 'redux';
import header from './header';
import community from './community';

const rootReducer = combineReducers({
  header,
  community,
});

export default rootReducer;
