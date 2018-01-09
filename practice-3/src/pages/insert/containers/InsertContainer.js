import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct } from '../actions/';
import InsertForm from '../components/InsertComponent';
import { BLANK, ALL } from '../../../utils/constants';

const mapStateToProps = (state, ownProps) => {
  const totalCount = state.products.length
  const newId = totalCount === 0 ? 1 : state.products[totalCount - 1].id + 1
  let initProduct = {
    id: newId,
    name: BLANK,
    categoryId: ALL,
    price: BLANK
  };

  return {
    product: initProduct,
    history: ownProps.history
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleData: addProduct }, dispatch);
}

const InsertContainer = connect(
  mapStateToProps,
  mapDispatchToProps)(InsertForm);

export default InsertContainer;  