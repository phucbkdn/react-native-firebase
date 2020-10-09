import React from 'react'
import { TouchableOpacity } from 'react-native'
import { render } from '@testing-library/react'
import  renderer from 'react-test-renderer'
import Message from '../Message'

const props = {
  name: 'Name',
  time: '1:00',
  isPrimary: true,
}

describe('Testing Message component', () => {
  test("Render correct component", () => {
    const { container } = render(<Message {...props} />)
    expect(container).toMatchSnapshot()
  })
})
