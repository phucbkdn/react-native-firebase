import {
  ADD_PRODUCT
} from './actionsType';

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}
