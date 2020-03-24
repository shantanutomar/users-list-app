import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { IUsers, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './types';
import { AppState } from '../../index';

export const fetchUsersSuccess = (appData: IUsers) => ({
  type: FETCH_USERS_SUCCESS,
  payload: appData,
});

export const fetchUsersFailure = () => ({
  type: FETCH_USERS_FAILURE,
});

export const fetchUsers = (page: number): ThunkAction<void, AppState,
  null, Action<string>> => (dispatch) => {
  fetch(`https://reqres.in/api/users?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      const userResponse = {
        totalUsersCount: data.total,
        currentPage: data.page,
        users: [...data.data],
      };
      dispatch(fetchUsersSuccess(userResponse));
    }).catch((error) => {
      console.log('error', error);
      dispatch(fetchUsersFailure());
    });
};
