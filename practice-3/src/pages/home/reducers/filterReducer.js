import { ALL } from '../../../utils/constants';
import { SET_VISIBILITY_FILTER } from '../actions/actionsType';

const filterProduct = (state = ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state;
  }
}
export default filterProduct;