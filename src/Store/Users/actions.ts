import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { IUsers, FETCH_USERS_SUCCESS } from './types';
import { AppState } from '../../index';

export function fetchUsersSuccess(appData: IUsers) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: appData,
  };
}

export const fetchUsers = (page: number): ThunkAction<void, AppState,
  null, Action<string>> => (dispatch) => {
  fetch(`https://reqres.in/api/users?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      const ref = {
        totalUsersCount: data.total,
        currentPage: data.page,
        users: [...data.data],
      };
      dispatch(
        fetchUsersSuccess(ref),
      );
    });
};
