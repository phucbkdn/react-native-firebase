import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import { selectFood } from '../actions/index';
import { Link } from 'react-router-dom';

let FoodContainer = ({ foods, selectFood }) => {
  let listItem = foods.map(item => {
    return <li key={item.id}>
      <Link to={'/detail/'.concat(`${item.id}`)}>Name: {item.name}</Link>
    </li>
  });

  return (
    <ul>
      {listItem}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    foods: state.foods
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectFood: selectFood }, dispatch);
}
FoodContainer = connect(mapStateToProps, mapDispatchToProps)(FoodContainer);

export default FoodContainer;