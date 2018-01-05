import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
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

Button.propTypes = {
  bgcolor: PropTypes.string
};

Button.defaultProps = {
  bgcolor: "#008CBA"
};

export default Button;

