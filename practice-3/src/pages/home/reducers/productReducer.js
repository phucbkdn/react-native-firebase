import data from '../../../utils/data';
import {
  ADD_PRODUCT,
  DEL_PRODUCT,
  UPDATE_PRODUCT,
  SET_VISIBILITY_FILTER
} from '../actions/actionsType';
import { ALL } from '../../../utils/constants';

let INITIAL_STATE = { ...data, filter: ALL };

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
        categorys: state.categorys,
        filter: state.filter
      }
    case UPDATE_PRODUCT:
      return {
        products: state.products.map(product =>
          product.id === action.product.id ? { ...product, ...action.product } : product),
        categorys: state.categorys,
        filter: state.filter
      }
    case DEL_PRODUCT:
      return {
        products: state.products.filter(({ id }) => id !== action.id),
        categorys: state.categorys,
        filter: state.filter
      }
    case SET_VISIBILITY_FILTER:
      return {
        products: state.products,
        categorys: state.categorys,
        filter: action.filter
      }
    default:
      return state
  }
}

export default products;