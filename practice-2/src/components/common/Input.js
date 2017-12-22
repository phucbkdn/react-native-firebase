import React from 'react';
import styles from 'styled-components';
import PropTypes from 'prop-types';
import { Constant } from '../../utils/constant';

const InputText = styles.input`
  border: 1px solid gray;
  border-radius: 4px;
  padding: 10px;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  background-color: white;
  font-size: 16px;
  width: 90%;
`;

const Input = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <InputText type={props.type}
        innerRef={props.innerRef}
        placeholder={props.placeholder}
        defaultValue={props.value} />
    </div>

  );
}

Input.propTypes = {
  label: PropTypes.string,
  innerRef: PropTypes.func
}

Input.defaultProps = {
  label: Constant.BLANK,
  innerRef() { }
};

export default Input;