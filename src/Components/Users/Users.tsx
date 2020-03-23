import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import './Users.css';
import { fetchUsers } from '../../Store/Users/actions';
import { AppState } from '../../index';
import { IUser } from '../../Store/Users/types';
import User from '../User/User';

const DELAY = 3000;

interface IUsersProps {
  fetchUsersList: Function;
  users: IUser[];
  isLoading: boolean;
  totalUsersCount: number;
  currentPage: number;
}
interface IUsersState {
  page: number;
}
class Users extends React.Component <IUsersProps, IUsersState> {
  toastRef: any = React.createRef<HTMLDivElement>();

  usersRef: any = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.showLoader();
  }

  componentDidUpdate(prevProps: IUsersProps) {
    const {
      fetchUsersList, users, currentPage,
    } = this.props;
    this.handleScroll();
    if (prevProps.users.length === users.length) {
      fetchUsersList(currentPage + 1);
    }
  }

  showLoader = () => {
    setTimeout(() => {
      const { fetchUsersList, currentPage } = this.props;
      fetchUsersList(currentPage);
      this.usersRef.current.addEventListener('scroll', this.handleScroll);
      this.handleScroll();
    }, DELAY);
  };

  handleScroll = () => {
    const {
      totalUsersCount, users, currentPage, fetchUsersList,
    } = this.props;
    if (this.usersRef.current.scrollTop >= (this.usersRef.current.scrollHeight
        - this.usersRef.current.offsetHeight)) {
      if (totalUsersCount !== users.length) {
        fetchUsersList(currentPage + 1);
      } else if (totalUsersCount === users.length && totalUsersCount !== 0) {
        this.handleToast();
      }
    }
  };

  handleToast = () => {
    this.toastRef.current.className = 'show';
    setTimeout(() => {
      this.toastRef.current.className = this.toastRef.current.className.replace('show', '');
    }, 3000);
  }

  render() {
    const { isLoading, users } = this.props;
    return (
      <>
        {!isLoading ? <header>Users</header> : null}
        <div className="users" ref={this.usersRef}>
          {isLoading || users.length === 0 ? <Loader /> : (users.length > 0
            && users.map((user: IUser) => (
              <User key={user.id} />
            ))
          )}
        </div>
        <div id="no-user-toast" ref={this.toastRef}>No more users in the list</div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  users: state.users,
  isLoading: state.isLoading,
  totalUsersCount: state.totalUsersCount,
  currentPage: state.currentPage,
});

const mapDisptachToProps = (dispatch: any) => ({
  fetchUsersList: (page: number) => dispatch(fetchUsers(page)),
});

export default connect(
  mapStateToProps, mapDisptachToProps,
)(Users);
