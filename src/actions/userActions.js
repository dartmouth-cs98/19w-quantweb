import axios from 'axios';

const ROOT_URL = process.env.NODE_ENV === 'production'
  ? 'https://officehoursapp.herokuapp.com/api'
  : 'http://localhost:9090/api';

export const ActionTypes = {
  GET_USER: 'GET_USER',
};

const getConfig = () => ({ headers: { authorization: localStorage.getItem('token') } });

export function getUser() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users`, getConfig()).then((response) => {
      dispatch({ type: 'GET_USER', payload: response.data.user });
    }).catch((error) => {
      console.log(error);
    });
  };
}
