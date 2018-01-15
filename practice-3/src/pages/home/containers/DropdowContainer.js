import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setVisibilityFilter } from '../actions';
import DropDown from '../../../common/components/Dropdown';

const mapStateToProps = state => {
  return {
    categorys: state.data.categorys,
    categoryId: state.data.filter
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ onchange: setVisibilityFilter }, dispatch);
}

const DropdownContainer = connect(mapStateToProps, mapDispatchToProps)(DropDown);

export default DropdownContainer;