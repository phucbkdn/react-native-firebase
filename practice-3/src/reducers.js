import { combineReducers } from 'redux';
import products from './pages/home/reducers/productReducer';
import categorys from './common/reducers/dropdownReducer';

const productReducer = combineReducers({
  products: products,
  categorys: categorys
});

export default productReducer;