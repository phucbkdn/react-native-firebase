import React from 'react';
import styles from 'styled-components';
import { Items, Item } from '../Index/Item';

const TableStyle = styles.table`
  width: 100%;
  border-collapse: collapse;
`;

const Table = (props) => {
  return (
    <TableStyle>
      <thead>
        <tr>
          <Item>ID</Item>
          <Item>Name</Item>
          <Item>Category</Item>
          <Item>Price</Item>
          <Item>option</Item>
        </tr>
      </thead>
      <tbody>
        {props.products.map(product =>
          <Items key={product.id} 
                 data={product} 
                 handleEdit={props.handleEdit} 
                 handleDelete={props.handleDelete}
                 getCategory={props.getCategory}/>
        )}
      </tbody>
    </TableStyle>
  );
};

export default Table;