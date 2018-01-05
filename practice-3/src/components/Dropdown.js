import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { ALL } from '../utils/constants';

const Select = styled.select`
  border: 1px solid gray;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: ${props => props.primary ? 'block' : 'inline-block'};
  margin: 4px 2px;
  background-color: white;
  font-size: 16px;
  width: ${props => props.primary ? '600px' : '20%'}
`;

const Dropdown = ({ categorys, onchange, primary, categoryId }) => {
  const handleChange = (e) => {
    if (onchange) {
      onchange(e.target.value);
    }
  }
  return (
    <Select
      onChange={handleChange}
      primary={primary}
      defaultValue={categoryId}>
      <option value={ALL}>-- All product --</option>
      {categorys.map(item =>
        <option key={item.categoryId} value={item.categoryId} >
          {item.name}
        </option>
      )}
    </Select>
  );
}

Dropdown.propTypes = {
  onChange: PropTypes.func,
  primary: PropTypes.bool,
  categorys: PropTypes.array,
  categoryId: PropTypes.string
}

Dropdown.defaultProps = {
  primary: false,
  onChange: () => { },
  categorys: [],
  categoryId: ALL
};

export default Dropdown;