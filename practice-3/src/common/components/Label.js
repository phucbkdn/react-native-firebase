import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

export const LabelStyled = styled.label`
  font-size: 18px;
  color: ${props => props.err ? 'red' : 'black'};
`;

LabelStyled.propTypes = {
  err: PropTypes.bool
}

LabelStyled.defaultProps = {
  err: false
}

const Label = (props) => {
  return (
    <LabelStyled err={props.err}>
      {props.name}
    </LabelStyled>
  );
}

Label.propTypes = {
  err: PropTypes.bool,
  name: PropTypes.string
}

Label.defaultProps = {
  err: false,
  name: ""
}

export default Label;