import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProduct } from '../actions';
import UpdatetForm from '../components/UpdateContainer';
import { UPDATE_PRODUCT } from '../../../utils/constants';

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.find(
      product => product.id === parseFloat(ownProps.match.params.id)),
    modalName: UPDATE_PRODUCT,
    history: ownProps.history
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleData: updateProduct }, dispatch);
}

const updateContainer = connect(mapStateToProps, mapDispatchToProps)(UpdatetForm);
export default updateContainer;