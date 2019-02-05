import { ActionTypes } from '../actions';

const INITIAL_STATE = {
  authenticated: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      // return action.payload;
      return (Object.assign({}, state, { authenticated: true }));
    case ActionTypes.DEAUTH_USER:
      return (Object.assign({}, state, { authenticated: false }));

    default:
      return state;
  }
};

export default AuthReducer;
