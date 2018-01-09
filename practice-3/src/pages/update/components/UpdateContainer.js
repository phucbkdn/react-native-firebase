import Form from '../../../common/components/Form';
import React from 'react';
const UpdatetForm = ({ product, handleData, modalName, history }) => {
  return (
    <Form {...{ handleData, product, modalName, history }} />
  );
}

export default UpdatetForm;