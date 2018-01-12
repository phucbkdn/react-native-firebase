import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProduct } from '../actions';
import Table from '../components/Table';
import { getProductByCategory } from '../../../utils/handleData';

const mapStateToProps = state => {
  return {
    products: getProductByCategory(state.products, state.filter)
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleDelete: deleteProduct }, dispatch);
}

let TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table);

export default TableContainer;