import Form from '../../../common/components/Form';
import React from 'react';
const UpdatetForm = ({ product, handleData, modalName }) => {
  return (
    <Form {...{ handleData, product, modalName }} />
  );
}

export default UpdatetForm;