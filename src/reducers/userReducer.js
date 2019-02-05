import { ActionTypes as UserActionTypes } from '../actions/userActions';
import { ActionTypes } from '../actions';

const userReducer = (state = { all: [], user: null }, action) => {
  switch (action.type) {
    case UserActionTypes.GET_USER:
      return { all: state.all, user: action.payload };
    case ActionTypes.DEAUTH_USER:
      return (Object.assign({}, state, { user: null }));
    default:
      return state;
  }
};

export default userReducer;

