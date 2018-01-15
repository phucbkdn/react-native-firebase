import Form from '../../../common/components/Form';
import React from 'react';
import PropTypes from 'prop-types';
import { BLANK } from '../../../utils/constants';
const UpdatetForm = ({ product, handleData, modalName, history }) => {
  return (
    <Form {...{ handleData, product, modalName, history }} />
  );
}

UpdatetForm.propTypes = {
  product: PropTypes.object,
  handleData: PropTypes.func,
  history: PropTypes.object,
  modalName: PropTypes.string
}

UpdatetForm.defaultProps = {
  product: {},
  handleData: () => { },
  history: {},
  modalName: BLANK
}

export default UpdatetForm;