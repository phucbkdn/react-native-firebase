import {
  ADD_PRODUCT,
  DEL_PRODUCT,
  SET_VISIBILITY_FILTER
} from './actionsType';

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export const setVisibilityFilter = filter => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

export const deleteProduct = id => {
  return {
    type: DEL_PRODUCT,
    id
  }
}