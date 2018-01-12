import data from '../../../utils/data';
import {
  ADD_PRODUCT,
  DEL_PRODUCT,
  UPDATE_PRODUCT
} from '../actions/actionsType';
let INITIAL_STATE = data;

const products = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        products: [
          ...state.products,
          {
            id: action.product.id,
            name: action.product.name,
            categoryId: action.product.categoryId,
            price: action.product.price
          }
        ],
        categorys: state.categorys
      }
    case UPDATE_PRODUCT:
      return {
        products: state.products.map(product =>
          product.id === action.product.id ? { ...product, ...action.product } : product),
        categorys: state.categorys
      }
    case DEL_PRODUCT:
      return {
        products: state.products.filter(({ id }) => id !== action.id),
        categorys: state.categorys
      }
    default:
      return state
  }
}

export default products;