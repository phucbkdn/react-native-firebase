import styles from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../common/Button';
import { Constant } from '../../../../utils/constant';

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
      <Item>{props.getCategory(props.data.categoryId)}</Item>
      <Item>{props.data.price}</Item>
      <Item>
        <Button onClick={handleEdit}
          bgcolor={'#008CBA'}>
          {Constant.BUTTON_EDIT}
        </Button>
        <Button onClick={handleDelete}
          bgcolor={'#F44336'}>
          {Constant.BUTTON_DELETE}
        </Button>
      </Item>
    </tr>
  );
};

Items.propTypes = {
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  data: PropTypes.object
}

Items.defaultProps = {
  data: {},
  handleEdit() { },
  handleDelete() { }
};

export { Items, Item };