import { connect } from 'react-redux';
import React from 'react';

let UserDetail = ({ user }) => {
  return (user.firstName ?
    (<div>
      <div>User name: {user.firstName}</div>
      <div>Description: {user.description}</div>
    </div>) : (
      <div>Select User detail</div>
    ));
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

UserDetail = connect(mapStateToProps)(UserDetail);

export default UserDetail;