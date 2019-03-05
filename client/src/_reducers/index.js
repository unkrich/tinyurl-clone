import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { urls } from './urls.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  urls,
  registration,
  alert
});

export default rootReducer;