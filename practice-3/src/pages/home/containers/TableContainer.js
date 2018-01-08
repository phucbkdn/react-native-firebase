import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProduct } from '../actions';
import Table from '../components/Table';

const mapStateToProps = state => {
  return {
    products: state.products
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleDelete: deleteProduct }, dispatch);
}

let TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table);

export default TableContainer;