import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Items, Item } from './Item';
import {
  LABEL_ID,
  LABEL_NAME,
  LABEL_CATEGORY,
  LABEL_PRICE,
  LABEL_OPTION
} from '../../../utils/constants';

const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Thead = styled.thead`
  font-weight: bold;
`;

const Table = ({ products, handleDelete }) => {

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
        {products.map(product =>
          <Items
            key={product.id}
            data={product}
            handleDelete={handleDelete}
          />
        )}
      </tbody>
    </TableStyle>
  );
};

Table.propTypes = {
  products: PropTypes.array,
  handleDelete: PropTypes.func
}

Table.defaultProps = {
  product: [],
  handleDelete: () => { }
};

export default Table;