import {
  DEL_PRODUCT,
  SET_VISIBILITY_FILTER,
  UPDATE_PRODUCT,
  ADD_PRODUCT
} from './actionsType';

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

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}
