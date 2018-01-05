import { SELECT_USER } from '../constants/constants';

const foodDetail = (state = {}, action) => {
  switch (action.type) {
    case SELECT_USER:
      return action.payload;
    default:
      return state
  }
}

export default foodDetail;