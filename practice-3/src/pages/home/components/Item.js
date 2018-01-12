import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../../../common/components/Button';
import { BUTTON_EDIT, BUTTON_DELETE } from '../../../utils/constants';
import { getCategory } from '../../../utils/handleData';

const Item = styled.td`
  border-bottom: 1px solid gray;
  text-align: center;
`;

const Items = ({ data, handleDelete }) => {
  const url = `/edit/${data.id}`;
  const getCategoryName = () => {
    const category = getCategory(data.categoryId);
    return category.name;
  }

  return (
    <tr>
      <Item>{data.id}</Item>
      <Item>{data.name}</Item>
      <Item>{getCategoryName()}</Item>
      <Item>{data.price}</Item>
      <Item>
        <Link to={url}>
          <Button btnName={BUTTON_EDIT} />
        </Link>
        <Button
          btnClick={() => handleDelete(data.id)}
          bgcolor={'#F44336'}
          btnName={BUTTON_DELETE}
        />
      </Item>
    </tr>
  );
};

Items.propTypes = {
  handleDelete: PropTypes.func,
  data: PropTypes.object
}

Items.defaultProps = {
  data: {},
  handleDelete: () => { }
};

export { Items, Item };