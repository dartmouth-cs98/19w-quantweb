import axios from 'axios';

const ROOT_URL = process.env.NODE_ENV === 'production'
  ? 'http://ec2-54-212-62-214.us-west-2.compute.amazonaws.com/api/'
  : 'http://localhost:3000/api';

export const ActionTypes = {
  GET_USER: 'GET_USER',
};

const getConfig = () => ({ headers: { authorization: `Token ${localStorage.getItem('token')}` } });

export function getUser() {
  console.log(`Config: ${JSON.stringify(getConfig())}`);
  return (dispatch) => {
    axios.get(`${ROOT_URL}/getUser`, getConfig()).then((response) => {
      // console.log('Got user!');
      // console.log(response);
      dispatch({ type: 'GET_USER', payload: response.data.user });
    }).catch((error) => {
      console.log(error);
    });
  };
}
