import React from 'react'
import { render } from '@testing-library/react'
import Icon from '../Icon'

const props = {
  name: 'Name',
  time: '1:00',
  isPrimary: true,
  icon: {
    uri: 'https:icon.png',
  },
}

describe('Testing Message component', () => {
  test('Render correct component', () => {
    const { container } = render(<Icon {...props} />)
    expect(container).toMatchSnapshot()
  })
})
