import React from 'react';
import Table from './Table';
import { Button } from '../../common/Button';
import Dropdown from '../../common/DropDown';


const IndexPage = (props) => {
  return(
    <div>
      <Button onClick={props.handleClickAdd} 
              bgcolor={'#008CBA'}
              data-toggle="modal"
              data-target="#myModal">New product
      </Button>
      <Dropdown data={props.categorys} onChange={props.changeItem} />
      <Table products={props.products} 
             getCategory={props.getCategory}
             handleEdit={props.editItem} 
             handleDelete={props.deleteItem} />
    </div>
  );
};

export default IndexPage;