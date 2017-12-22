import React from 'react';
import Form from '../../common/Form';
import { getId} from '../../../utils/HandleData';

const ModalUpdate = (props) => {

  let product = {
    id: getId(),
    name: '',
    category: '',
    price: ''
  };

  return(
    <Form modalname="Add Product"
          categorys={props.categorys}
          modalId={props.modalId}
          product={product}
          forwardPage={props.forwardPage}
    />
  );
}

export default ModalUpdate;