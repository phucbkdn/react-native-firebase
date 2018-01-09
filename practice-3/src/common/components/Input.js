import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { BLANK } from '../../utils/constants';

const InputText = styled.input`
  border: 1px solid gray;
  border-radius: 4px;
  padding: 10px;
  text-decoration: none;
  display: block;
  margin: 4px 2px;
  background-color: white;
  font-size: 16px;
  width: 580px;
`;

export const LabelError = styled.label`
  color: red;
`;

export const WrapInput = styled.div`
  padding-bottom: 20px;
`;

const Input = (props) => {
  return (
    <WrapInput>
      <label>{props.label}</label>
      <InputText
        type={props.type}
        name={props.textName}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        defaultValue={props.value}
      />
      <LabelError>{props.labelError}</LabelError>
    </WrapInput>

  );
}

Input.propTypes = {
  label: PropTypes.string,
  handleChange: PropTypes.func,
  type: PropTypes.string,
  textName: PropTypes.string,
  placeholder: PropTypes.string,
  labelError: PropTypes.string
}

Input.defaultProps = {
  label: BLANK,
  handleChange: () => { },
  type: BLANK,
  textName: BLANK,
  placeholder: BLANK,
  labelError: BLANK
};

export default Input;