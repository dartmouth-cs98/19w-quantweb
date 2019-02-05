import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  authenticated: AuthReducer,
  user: userReducer,
});

export default rootReducer;
