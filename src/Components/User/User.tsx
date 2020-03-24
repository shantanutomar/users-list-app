import React from 'react';
import './User.css';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IUserProps {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
  }

// Implemented using Hooks
const User: React.SFC<IUserProps> = (props) => {
  const {
    avatar, firstName, lastName, email,
  } = props;
  return (
    <section className="user">
      <img alt="avatar" src={avatar} />
      <div className="name-email-cont">
        <span className="name">{`${firstName} ${lastName}`}</span>
        <div>
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="email">{email}</span>
        </div>
      </div>
    </section>
  );
};

export default User;
