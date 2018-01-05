import { connect } from 'react-redux';
import React from 'react';
import { getFoodById } from '../utils/handleData';

let FoodDetail = ({ match: { params }, foods }) => {
  let food = getFoodById(foods, params.food);
  return food ?
    (<div>
      <div>Food name: {food.name}</div>
      <div>Description: {food.description}</div>
    </div>) : (
      <div>Select food detail</div>
    );
}

const mapStateToProps = state => {
  return {
    foods: state.foods
  }
}

FoodDetail = connect(mapStateToProps)(FoodDetail);

export default FoodDetail;