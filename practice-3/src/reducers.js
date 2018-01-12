import { combineReducers } from 'redux';
import products from './pages/home/reducers/productReducer';
import filterProduct from './pages/home/reducers/filterReducer';

const productReducer = combineReducers({
  data: products,
  filter:filterProduct
});

export default productReducer;