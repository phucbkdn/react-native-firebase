import React from 'react';
import Table from './Table';
import { Button } from '../../common/Button';
import Dropdown from '../../common/DropDown';


const IndexPage = (props) => {
  return(
    <div>
      <Button onClick={props.handleClickAdd} 
              bgcolor={'#008CBA'}>New product
      </Button>
      <Dropdown data={props.categorys} onChange={props.changeItem} />
      <Table produces={props.produces} 
             handleEdit={props.editItem} 
             handleDelete={props.deleteItem} />
    </div>
  );
};

export default IndexPage;