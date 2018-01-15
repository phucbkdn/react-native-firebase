import { combineReducers } from 'redux';
import products from './pages/home/reducers/productReducer';

const productReducer = combineReducers({
  data: products
});

export default productReducer;