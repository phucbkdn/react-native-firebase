import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { BUTTON_EDIT, BUTTON_DELETE } from '../../../utils/constants';

const Item = styled.td`
  border-bottom: 1px solid gray;
  text-align: center;
`;

const Items = ({ data, handleDelete }) => {
  const url = '/edit/'.concat(data.id);
  return (
    <tr>
      <Item>{data.id}</Item>
      <Item>{data.name}</Item>
      <Item>{data.categoryId}</Item>
      <Item>{data.price}</Item>
      <Item>
        <Link to={url}>
          <Button bgcolor={'#008CBA'} >
            {BUTTON_EDIT}
          </Button>
        </Link>
        <Button
          onClick={handleDelete}
          bgcolor={'#F44336'}
        >
          {BUTTON_DELETE}
        </Button>
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