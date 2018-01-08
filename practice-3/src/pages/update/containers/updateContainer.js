import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProduct } from '../actions';
import UpdatetForm from '../components/UpdateContainer';

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.find(
      product => product.id === parseFloat(ownProps.match.params.id)),
    modalName: 'Update Product'
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleData: updateProduct }, dispatch);
}

const updateContainer = connect(mapStateToProps, mapDispatchToProps)(UpdatetForm);
export default updateContainer;