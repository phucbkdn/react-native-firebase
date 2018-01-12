import data from '../../../utils/data';
import {
  ADD_PRODUCT,
  DEL_PRODUCT,
  UPDATE_PRODUCT
} from '../actions/actionsType';
let INITIAL_STATE = data.products;

const products = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [
        ...state,
        {
          id: action.product.id,
          name: action.product.name,
          categoryId: action.product.categoryId,
          price: action.product.price
        }
      ]
    case UPDATE_PRODUCT:
      return state.map(product =>
        product.id === action.product.id ? { ...product, ...action.product } : product)
    case DEL_PRODUCT:
      return state.filter(({ id }) => id !== action.id);
    default:
      return state
  }
}

export default products;