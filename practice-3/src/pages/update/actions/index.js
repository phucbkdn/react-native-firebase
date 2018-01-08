import {
  UPDATE_PRODUCT
} from './actionsType';

export const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}
