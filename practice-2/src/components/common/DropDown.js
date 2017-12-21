import styles from 'styled-components';
import React from 'react';

const Select = styles.select`
  border: 1px solid gray;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  background-color: white;
  width: ${props => props.primary ? '100%' : '20%'}
`;

const Dropdown = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value)
  }

  return (
    <Select onChange={handleChange} primary={props.primary}>
      <option value={'all'}>-- All product --</option>
      {props.data.map(item =>
        <option key={item.categoryId} value={item.categoryId} >
          {item.name}
        </option>
      )}
    </Select>
  );
}

export default Dropdown;