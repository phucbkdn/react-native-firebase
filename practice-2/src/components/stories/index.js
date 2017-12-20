import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '../common/Button';


storiesOf('Button', module)
  .add('Button add', () => <Button onClick={action('clicked')} bgcolor={'#008CBA'}>New product</Button>)
  .add('Button Edit', () => <Button onClick={action('clicked')} bgcolor={'#008CBA'}>Edit</Button>)
  .add('Button Delete', () => <Button onClick={action('clicked')} bgcolor={'#F44336'}>Delete</Button>)
  .add('Button Submit', () => <Button onClick={action('clicked')} bgcolor={'#4CAF50'}>Submit</Button>)
  .add('Button Cancel', () => <Button onClick={action('clicked')} bgcolor={'#008CBA'}>Cancel</Button>);
