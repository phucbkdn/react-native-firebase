import React from 'react';

export const Button = props => (
  <button className={props.className} onClick={props.handleClick}>
    {props.btnName}
  </button>
)