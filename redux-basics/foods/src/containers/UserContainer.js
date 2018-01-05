import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import { selectUser } from '../actions/index';

let UserContainer = ({ users, selectUser }) => {
  let listItem = users.map(item => {
    return <li key={item.id} onClick = {
      () => {selectUser(item)}
    }>Name: {item.firstName}</li>
  });

  return (
    <ul>
      {listItem}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectUser: selectUser }, dispatch);
}
UserContainer = connect(mapStateToProps, mapDispatchToProps)(UserContainer);

export default UserContainer;