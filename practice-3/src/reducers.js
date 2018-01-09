import { combineReducers } from 'redux';
import products from './pages/home/reducers/productReducer';
import categorys from './common/reducers/dropdownReducer';
import filterProduct from './pages/home/reducers/filterReducer';

const productReducer = combineReducers({
  products: products,
  categorys: categorys,
  filterProduct:filterProduct
});

export default productReducer;