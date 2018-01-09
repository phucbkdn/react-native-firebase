import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const ButtonStyled = styled.button`
  border: none;
  border-radius: 4px;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${props => props.bgcolor};
`;

ButtonStyled.propTypes = {
  bgcolor: PropTypes.string
};

ButtonStyled.defaultProps = {
  bgcolor: "#008CBA"
};

const Button = ({ btnName, bgcolor, btnClick, type }) => {
  return (
    <ButtonStyled
      bgcolor={bgcolor}
      onClick={btnClick}
      type={type}
    >
      {btnName}
    </ButtonStyled>
  );
}

ButtonStyled.propTypes = {
  btnName: PropTypes.string,
  bgcolor: PropTypes.string,
  btnClick: PropTypes.func,
  type: PropTypes.string
};

ButtonStyled.defaultProps = {
  btnName: "",
  bgcolor: "#008CBA",
  btnClick: () => { },
  type: "button"
};
export default Button;

