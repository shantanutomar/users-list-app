export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

export interface IUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface IUsers {
    users: IUser[];
    totalUsersCount: number;
    currentPage: number;
}

export interface IAppState {
    users: IUser[];
    totalUsersCount: number;
    isLoading: boolean;
    currentPage: number;
}

interface IFetchUsers {
    type: typeof FETCH_USERS;
    payload: number;
}

interface IFetchUsersSuccess {
    type: typeof FETCH_USERS_SUCCESS;
    payload: IUsers;
}

export type IUserActionTypes = IFetchUsers | IFetchUsersSuccess;
