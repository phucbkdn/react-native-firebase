
import {
  SELECT_FOOD,
  SELECT_USER
} from '../constants/constants';

export const selectFood = (food) => {
  return {
    type: SELECT_FOOD,
    payload: food
  };
}

export const selectUser = (user) => {
  return {
    type: SELECT_USER,
    payload: user
  }
}