import React from 'react';
import UserContainer from '../containers/UserContainer';
import UserDetail from '../containers/UserDetail';

const User = () => {
  return (
    <div>
      <h2>List of user:</h2>
      <UserContainer />
      <hr />
      <h2>User detail:</h2>
      <UserDetail />
    </div>
  );
}

export default User;