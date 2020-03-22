import {
  IAppState, FETCH_USERS, FETCH_USERS_SUCCESS, IUserActionTypes,
} from './types';

const initialState: IAppState = {
  users: [],
  isLoading: true,
  totalUsersCount: 0,
  currentPage: 1,
};

export default function usersReducer(
  state = initialState,
  action: IUserActionTypes,
): IAppState {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        users: [...state.users, ...action.payload.users],
        isLoading: false,
        currentPage: action.payload.currentPage,
        totalUsersCount: action.payload.totalUsersCount,
      };
    default:
      return state;
  }
}
