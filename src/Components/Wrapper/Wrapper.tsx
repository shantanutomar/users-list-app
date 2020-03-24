import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { fetchUsers } from '../../Store/Users/actions';
import { AppState } from '../../index';

const Users = React.lazy(() => import('../Users/Users'));

const LOADER_DELAY = 3000;

interface IUsersProps {
  fetchUsersList: Function;
  isLoading: boolean;
  currentPage: number;
}

// Implemented using Hooks
const AppWrapper: React.SFC <IUsersProps> = (props) => {
  const { isLoading } = props;

  const showLoaderAndFetchUsers = () => {
    setTimeout(() => {
      const { fetchUsersList, currentPage } = props;
      fetchUsersList(currentPage);
    }, LOADER_DELAY);
  };

  React.useEffect(() => {
    showLoaderAndFetchUsers();
    // Disabling exhaustive-deps
    // eslint-disable-next-line
}, []);

  return (
    isLoading ? <Loader /> : (
      <Suspense fallback={<Loader />}>
        <Users />
      </Suspense>
    )
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading,
  currentPage: state.currentPage,
});

// Disabling any eslint error
// eslint-disable-next-line
const mapDisptachToProps = (dispatch: any) => ({
  fetchUsersList: (page: number) => dispatch(fetchUsers(page)),
});

export default connect(
  mapStateToProps, mapDisptachToProps,
)(AppWrapper);
