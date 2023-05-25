import axios from 'axios';
import { userActions } from '../slices/user-slice';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return dispatch => {
    dispatch(userActions.fetchUsersRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const users = response.data;
        dispatch(userActions.fetchUsersSuccess(users));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(userActions.fetchUsersFailure(errorMessage));
      });
  };
};
