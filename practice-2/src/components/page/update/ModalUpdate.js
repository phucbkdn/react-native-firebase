import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../common/Form';
import { Constant} from '../../../utils/constant';

const ModalUpdate = (props) => {
  return (
    <Form modalname={Constant.UPDATE_PRODUCT}
      categorys={props.categorys}
      product={props.product}
      forwardPage={props.forwardPage}
      handleData={props.handleData}
    />
  );
}

ModalUpdate.propTypes = {
  categorys: PropTypes.array,
  product: PropTypes.object,
  forwardPage: PropTypes.func,
  handleData: PropTypes.func
}

ModalUpdate.defaultProps = {
  categorys: [],
  product: {},
  forwardPage() { },
  handleData() { }
};

export default ModalUpdate;