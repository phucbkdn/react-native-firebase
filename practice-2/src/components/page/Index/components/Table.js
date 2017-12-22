import React from 'react';
import styles from 'styled-components';
import PropTypes from 'prop-types';
import { Items, Item } from './Item';
import { Constant } from '../../../../utils/constant';

const TableStyle = styles.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Thead = styles.thead`
  font-weight: bold;
`;

const Table = (props) => {

  return (
    <TableStyle>
      <Thead>
        <tr>
          <Item>{Constant.LABEL_ID}</Item>
          <Item>{Constant.LABEL_NAME}</Item>
          <Item>{Constant.LABEL_CATEGORY}</Item>
          <Item>{Constant.LABEL_PRICE}</Item>
          <Item>{Constant.LABEL_OPTION}</Item>
        </tr>
      </Thead>
      <tbody>
        {props.products.map(product =>
          <Items key={product.id}
            data={product}
            handleEdit={props.handleEdit}
            handleDelete={props.handleDelete}
            getCategory={props.getCategory} />
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