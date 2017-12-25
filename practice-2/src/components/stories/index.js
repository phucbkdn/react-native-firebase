import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '../common/Button';
import Input from '../common/Input';
import Table from '../page/Index/components/Table';
import data from '../../utils/Data';
import Dropdown from '../common/DropDown';
import Form from '../common/Form';
import IndexPage from '../page/Index/Index';

const products = data.products;
const categorys = data.category;

storiesOf('Button', module)
  .add('Button add', () => <Button onClick={action('clicked')} bgcolor={'#008CBA'} type="button">New product</Button>)
  .add('Button Edit', () => <Button onClick={action('clicked')} bgcolor={'#008CBA'} type="button">Edit</Button>)
  .add('Button Delete', () => <Button onClick={action('clicked')} bgcolor={'#F44336'} type="button">Delete</Button>)
  .add('Button Submit', () => <Button onClick={action('clicked')} bgcolor={'#4CAF50'} type="submit">Submit</Button>)
  .add('Button Cancel', () => <Button onClick={action('clicked')} bgcolor={'#008CBA'} type="button">Cancel</Button>);

storiesOf('Input', module)
  .add('Text input', () => <Input label="name"
    value="phucla"
    placeholder="Input name" />);

storiesOf('Page', module)
  .add('Index', () => <IndexPage handleClickAdd={action('forwardPage')}
    categorys={categorys}
    getCategory={action('getCategory')}
    changeItem={action('handleChangeItem')}
    products={products}
    editItem={action('getProduct')}
    deleteItem={action('handleClickDelete')}
  />)
  .add('Update/Add', () => <Form modalname="Update Product"
    categorys={categorys}
    product={products[1]}
    forwardPage={action('forwardPage')}
    handleData={action('handleData')} />);

storiesOf('Dropdown', module)
  .add('Dropdown Primary', () => <Dropdown primary data={categorys} onChange={action('Changer')} />)
  .add('Dropdown Secondary ', () => <Dropdown data={categorys} onChange={action('Changer')} />);

storiesOf('Table', module)
  .add('Table', () => <Table products={products}
    handleEdit={action('Edit')}
    handleDelete={action('Delete')} />)  