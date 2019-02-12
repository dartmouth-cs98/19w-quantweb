import axios from 'axios';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

const ROOT_URL = process.env.NODE_ENV === 'production'
  ? 'http://ec2-54-212-62-214.us-west-2.compute.amazonaws.com/api/'
  : 'http://localhost:3000/api';

// TODO: This will be used to authenticate axios calls when adding actions
const getConfig = () => ({ headers: { authorization: `Token ${localStorage.getItem('token')}` } });

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, history) {
    // takes in an object with email and password (minimal user object)
    // returns a thunk method that takes dispatch as an argument (just like our create post method really)
    // does an axios.post on the /signup endpoint (only difference from above)
    // on success does:
    //  dispatch({ type: ActionTypes.AUTH_USER });
    //  localStorage.setItem('token', response.data.token);
    // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      localStorage.setItem('token', response.data.user.token);
      dispatch({ type: ActionTypes.AUTH_USER, payload: true });
      history.push('/dashboard');
    }).catch((error) => {
      console.log(error);
      dispatch(authError(`Sign In Failed: ${error}`));
    });
  };
}


export function signupUser({ email, password, firstname, lastname, phone }, history) {
  // takes in an object with email, password, firstname, lastname, and phone number (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  console.log({ email, password, firstname, lastname, phone });
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, phone, firstname, lastname }, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      localStorage.setItem('token', response.data.user.token);
      dispatch({ type: ActionTypes.AUTH_USER, payload: true });
      history.push('/dashboard');
    }).catch((error) => {
      dispatch(authError(`Sign Up Failed: ${error}`));
    });
  };
}

// Delete auth token
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/login');
  };
}


export function createTransaction(paymentId, orderId, cb) {
  axios.post(`${ROOT_URL}/createTransaction`, { paymentId, orderId }, getConfig()).then((response) => {
    cb(undefined, response);
  }).catch((error) => {
    cb(error, undefined);
  });
}

export function fetchTransactions(cb) {
  axios.get(`${ROOT_URL}/getTransactionsForUser`, getConfig()).then((response) => {
    cb(response.data);
  }).catch((error) => {
    console.error(error);
  });
}

export function createOrder(amount, cb) {
  axios.post(`${ROOT_URL}/createOrder`, {
    amount,
  }, getConfig()).then((response) => {
    cb(response);
  }).catch((error) => {
    cb(error, undefined);
  });
}
