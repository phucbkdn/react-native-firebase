import React from 'react';
import Form from '../../../common/components/Form';

const InsertForm = ({product, handleData, history}) => {
  return (
    <Form {...{handleData, product, history}} />
  );
}

export default InsertForm;