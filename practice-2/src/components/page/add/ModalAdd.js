import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../common/Form';
import { getId } from '../../../utils/HandleData';
import { Constant } from '../../../utils/constant';

const ModalAdd = (props) => {

  let product = {
    id: getId(),
    name: Constant.BLANK,
    category: Constant.BLANK,
    price: Constant.BLANK
  };

  return (
    <Form categorys={props.categorys}
      product={product}
      forwardPage={props.forwardPage}
      handleData={props.handleData}
    />
  );
}

ModalAdd.propTypes = {
  categorys: PropTypes.array,
  forwardPage: PropTypes.func,
  handleData: PropTypes.func
}

ModalAdd.defaultProps = {
  categorys: [],
  forwardPage() { },
  handleData() { }
};

export default ModalAdd;