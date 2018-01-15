import React from 'react';
import { BrowserRouter as Rounter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../common/components/Button';
import Input from '../common/components/Input';
import Table from '../pages/home/components/Table';
import data from '../utils/Data';
import Dropdown from '../common/components/Dropdown';

const products = data.products;
const categorys = data.category;

storiesOf('Button', module)
  .add('Button add', () => <Button btnClick={action('clicked')} type="button" btnName={'New product'} />)
  .add('Button Edit', () => <Button btnClick={action('clicked')} bgcolor={'#008CBA'} type="button" btnName={'Edit'} />)
  .add('Button Delete', () => <Button btnClick={action('clicked')} bgcolor={'#F44336'} type="button" btnName={'Delete'} />)
  .add('Button Submit', () => <Button btnClick={action('clicked')} bgcolor={'#4CAF50'} type="submit" btnName={'Submit'} />)
  .add('Button Cancel', () => <Button btnClick={action('clicked')} bgcolor={'#008CBA'} type="button" btnName={'Cancel'} />);

storiesOf('Input', module)
  .add('Text input', () => <Input label="name"
    value="Name"
    placeholder="Input name" />);

storiesOf('Dropdown', module)
  .add('Dropdown Primary', () => <Dropdown primary categorys={categorys} onChange={action('Changer')} />)
  .add('Dropdown Secondary ', () => <Dropdown categorys={categorys} onChange={action('Changer')} />);

storiesOf('Table', module)
  .add('Table', () => <Rounter >
    <Table products={products}
      handleDelete={action('Delete')} />
  </Rounter>)