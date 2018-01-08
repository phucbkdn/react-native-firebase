import data from '../../../utils/Data';
import { ADD_PRODUCT} from '../actions/actionsType';
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
    default:
      return state
  }
}

export default products;