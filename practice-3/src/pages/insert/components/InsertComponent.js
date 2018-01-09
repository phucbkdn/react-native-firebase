import React from 'react';
import Form from '../../../common/components/Form';

const InsertForm = ({product, handleData}) => {
  return (
    <Form {...{handleData, product}} />
  );
}

export default InsertForm;