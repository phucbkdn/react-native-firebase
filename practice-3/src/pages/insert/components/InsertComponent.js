import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../../common/components/Form';

const InsertForm = ({ product, handleData, history }) => {
  return (
    <Form {...{ handleData, product, history }} />
  );
}

InsertForm.propTypes = {
  product: PropTypes.object,
  handleData: PropTypes.func,
  history: PropTypes.object
}

InsertForm.defaultProps = {
  product: {},
  handleData: () => { },
  history: {}
}

export default InsertForm;