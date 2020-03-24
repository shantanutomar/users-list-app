import {
  IAppState, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, IUserActionTypes,
} from './types';

const initialState: IAppState = {
  users: [],
  isLoading: true,
  totalUsersCount: 0,
  currentPage: 1,
  isError: false,
};

export default function usersReducer(
  state = initialState,
  action: IUserActionTypes,
): IAppState {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        users: [...state.users, ...action.payload.users],
        isLoading: false,
        currentPage: action.payload.currentPage,
        totalUsersCount: action.payload.totalUsersCount,
        isError: false,
      };
    case FETCH_USERS_FAILURE:
      return {
        users: [],
        isLoading: false,
        currentPage: 1,
        totalUsersCount: 0,
        isError: true,
      };

    default:
      return state;
  }
}
