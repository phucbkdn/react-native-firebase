import styles from 'styled-components';
import React from 'react';
import { Button } from '../../common/Button';

const Item = styles.td`
  border-bottom: 1px solid gray;
  text-align: center;
`;

const Items = (props) => {

  const handleEdit = (e) => {
    e.preventDefault();
    props.handleEdit(props.data);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    props.handleDelete(props.data.id);
  }

  return (
    <tr>
      <Item>{props.data.id}</Item>
      <Item>{props.data.name}</Item>
      <Item>{props.data.category}</Item>
      <Item>{props.data.price}</Item>
      <Item>
        <Button onClick={handleEdit} bgcolor={'#008CBA'}>Edit</Button>
        <Button onClick={handleDelete} bgcolor={'#F44336'}>Delete</Button>
      </Item>
    </tr>
  );
};

export { Items, Item };