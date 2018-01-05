import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Items, Item } from './Item';
import { LABEL_ID, LABEL_NAME, LABEL_CATEGORY, LABEL_PRICE, LABEL_OPTION } from '../../../../utils/constant';

const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Thead = styled.thead`
  font-weight: bold;
`;

const Table = (props) => {

  return (
    <TableStyle>
      <Thead>
        <tr>
          <Item>{LABEL_ID}</Item>
          <Item>{LABEL_NAME}</Item>
          <Item>{LABEL_CATEGORY}</Item>
          <Item>{LABEL_PRICE}</Item>
          <Item>{LABEL_OPTION}</Item>
        </tr>
      </Thead>
      <tbody>
        {props.products.map(product =>
          <Items
            key={product.id}
            data={product}
            handleEdit={props.handleEdit}
            handleDelete={props.handleDelete}
            getCategory={props.getCategory}
          />
        )}
      </tbody>
    </TableStyle>
  );
};

Table.propTypes = {
  products: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  getCategory: PropTypes.func,
}

Table.defaultProps = {
  product: [],
  handleEdit() { },
  handleDelete() { },
  getCategory() { }
};

export default Table;