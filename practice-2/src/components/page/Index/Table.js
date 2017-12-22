import React from 'react';
import styles from 'styled-components';
import { Items, Item } from '../Index/Item';

const TableStyle = styles.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Thead = styles.thead `
  font-weight: bold;
`;

const Table = (props) => {
  return (
    <TableStyle>
      <Thead>
        <tr>
          <Item>ID</Item>
          <Item>Name</Item>
          <Item>Category</Item>
          <Item>Price ($)</Item>
          <Item>Option</Item>
        </tr>
      </Thead>
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