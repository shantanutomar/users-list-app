import React from 'react';
import Loader from '../Loader/Loader';

class Users extends React.PureComponent {
  render() {
    return (
      <>
        <Loader />
        <div>All users</div>
      </>
    );
  }
}


export default Users;
