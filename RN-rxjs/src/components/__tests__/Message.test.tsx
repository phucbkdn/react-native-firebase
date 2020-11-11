import React from 'react'
import { render } from '@testing-library/react'
import Message from '../Message'

const props = {
  name: 'Name',
  time: '1:00',
  isPrimary: true,
}

describe('Testing Message component', () => {
  test('Render correct component', () => {
    const { container } = render(<Message {...props} />)
    expect(container).toMatchSnapshot()
  })
})
