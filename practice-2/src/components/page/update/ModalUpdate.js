import React from 'react';
import Form from '../../common/Form';

const ModalUpdate = (props) => {
  return(
    <Form modalname="Update Product"
          categorys={props.categorys}
          modalId={props.modalId}
          product={props.product}
          forwardPage={props.forwardPage}
          handleData={props.handleData}
    />
  );
}

export default ModalUpdate;