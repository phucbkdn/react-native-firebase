import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '../common/Button';
import Input from '../common/Input';
import Table from '../page/Index/components/Table';
import data from '../../utils/Data';
import Dropdown from '../common/DropDown';
import Form from '../common/Form';

const editItem = (item) => {
  alert('this edit :' + item.id);
}

const deleteItem = (id) => {
  alert('this delete:' + id);
}

const changeItem = (item) => {
  alert('this change item: ' + item);
}

const products = data.products;
const categorys = data.category;

storiesOf('Button', module)
  .add('Button add', () => <Button onClick={action('clicked')} bgcolor={'#008CBA'} type="button">New product</Button>)
  .add('Button Edit', () => <Button onClick={action('clicked')} bgcolor={'#008CBA'} type="button">Edit</Button>)
  .add('Button Delete', () => <Button onClick={action('clicked')} bgcolor={'#F44336'} type="button">Delete</Button>)
  .add('Button Submit', () => <Button onClick={action('clicked')} bgcolor={'#4CAF50'} type="button">Submit</Button>)
  .add('Button Cancel', () => <Button onClick={action('clicked')} type="submit">Cancel</Button>);
storiesOf('Input', module)
  .add('Text input', () => <Input label="name" value="phucla" placeholder="Input name" />);

storiesOf('Page', module)
  .add('Index', () => <Table products={products} handleEdit={editItem} handleDelete={deleteItem} />)
  .add('Update/Add', () => <Form modalname="Update Product"
    categorys={categorys}
    product={products[1]} />);

storiesOf('Dropdown', module)
  .add('Dropdown', () => <Dropdown data={categorys} onChange={changeItem} />);
