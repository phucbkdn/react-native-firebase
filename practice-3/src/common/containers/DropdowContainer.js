import { connect } from 'react-redux';
import DropDown from '../components/Dropdown';

const mapStateToProps = state => {
  return {
    categorys: state.data.categorys,
    primary: true
  };
}

const DropdownContainer = connect(mapStateToProps)(DropDown);

export default DropdownContainer;