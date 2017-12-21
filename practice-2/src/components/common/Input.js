import React from 'react';
import styles from 'styled-components';

const InputText = styles.input `
  padding: 10px;
  width: 100%;
`;

const Input =(props) => {
  return (
    <div>
      <label>{props.label}</label>
      <InputText type={props.type} innerRef={props.innerRef} placeholder={props.placeholder} defaultValue={props.value}/>
    </div>
    
  );
}

export default Input;