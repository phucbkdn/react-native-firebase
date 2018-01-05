import { SELECT_FOOD } from '../constants/constants';

const foodDetail = (state = {}, action) => {
  switch (action.type) {
    case SELECT_FOOD:
      return action.payload;
    default:
      return state
  }
}

export default foodDetail;