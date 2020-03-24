import React from 'react';
import { connect } from 'react-redux';
import './Users.css';
import { fetchUsers } from '../../Store/Users/actions';
import { AppState } from '../../index';
import { IUser } from '../../Store/Users/types';
import User from '../User/User';

const TOAST_DELAY = 3000;
interface IUsersProps {
  fetchUsersList: Function;
  users: IUser[];
  isLoading: boolean;
  totalUsersCount: number;
  currentPage: number;
  isError: boolean;
}

// Implemented using Class based component
class Users extends React.Component <IUsersProps> {
  // Disabling any eslint error
  // eslint-disable-next-line
  toastRef: any = React.createRef<HTMLDivElement>();

  // Disabling any eslint error
  // eslint-disable-next-line
  usersRef: any = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.bindScrollEvent();
  }

  componentDidUpdate(prevProps: IUsersProps) {
    const {
      fetchUsersList, users, currentPage, isError,
    } = this.props;
    if (!isError && prevProps.users.length === users.length) {
      fetchUsersList(currentPage + 1);
      this.handleScroll();
    }
  }

  bindScrollEvent = () => {
    if (this.usersRef.current) {
      this.usersRef.current.addEventListener('scroll', this.handleScroll);
      this.handleScroll();
    }
  };

  handleScroll = () => {
    const {
      totalUsersCount, users, currentPage, fetchUsersList, isError,
    } = this.props;

    /* If there is no error while fetching user data and user has reached to bottom of the page -
      1. Fetch more data.
      2. Show toast if all the user data has been fetched
    */
    if (!isError && (this.usersRef.current.scrollTop >= (this.usersRef.current.scrollHeight
        - this.usersRef.current.offsetHeight))) {
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
    }, TOAST_DELAY);
  }

  render() {
    const { users, isError } = this.props;

    let renderUsers = null;
    renderUsers = !isError ? users.map((user: IUser) => (
      <User
        key={user.id}
        avatar={user.avatar}
        firstName={user.first_name}
        lastName={user.last_name}
        email={user.email}
      />
    )) : <div className="error">Could not fetch users. Please try again.</div>;

    return (
      <>
        <header>Users</header>
        <section className="users" ref={this.usersRef}>
          {renderUsers}
        </section>
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
  isError: state.isError,
});

// Disabling any eslint error
// eslint-disable-next-line
const mapDisptachToProps = (dispatch: any) => ({
  fetchUsersList: (page: number) => dispatch(fetchUsers(page)),
});

export default connect(
  mapStateToProps, mapDisptachToProps,
)(Users);
