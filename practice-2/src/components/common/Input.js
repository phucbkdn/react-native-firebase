import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { BLANK } from '../../utils/constant';

const InputText = styled.input`
  border: 1px solid gray;
  border-radius: 4px;
  padding: 10px;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  background-color: white;
  font-size: 16px;
  width: 580px;
`;

const LabelError = styled.label `
  color: red;
`;

const Input = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <br />
      <InputText type={props.type}
        innerRef={props.innerRef}
        placeholder={props.placeholder}
        defaultValue={props.value} />
      <br />  
      <LabelError>{props.labelError}</LabelError>
    </div>

  );
}

Input.propTypes = {
  label: PropTypes.string,
  innerRef: PropTypes.func
}

Input.defaultProps = {
  label: BLANK,
  innerRef() { }
};

export default Input;