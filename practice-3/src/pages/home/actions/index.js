import {
  DEL_PRODUCT,
  SET_VISIBILITY_FILTER
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