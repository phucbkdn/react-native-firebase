import React from 'react';
import Table from './Table';
import { Button } from '../../common/Button';
import Dropdown from '../../common/DropDown';

const IndexPage = (props) => {
  const handleAdd = (e) => {
    e.preventDefault();
    props.handleClickAdd('add');
  }
  return(
    <div>
      <Button onClick={handleAdd} 
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