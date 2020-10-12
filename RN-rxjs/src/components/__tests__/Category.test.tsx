import React from 'react'
import { TouchableOpacity } from 'react-native'
import { render } from '@testing-library/react'
import  renderer from 'react-test-renderer'
import { Category } from '../Category'

const props = {
  name: 'Name',
  price: 200,
  count: 0,
  id: '1',
  incrValue: jest.fn(),
  decrValue: jest.fn(),
}

describe('Testing Category component', () => {
  test("Render correct component", () => {
    const { container } = render(<Category {...props} />)
    expect(container).toMatchSnapshot()
  })

  test("Testing actions component", () => {
    const wrapper = renderer.create(<Category {...props} />)
    const buttons = wrapper.root.findAllByType(TouchableOpacity)
    buttons[0].props.onPress()
    expect(props.decrValue.mock.calls.length).toBe(1)
    expect(props.decrValue).toBeCalled()

    buttons[1].props.onPress()
    expect(props.incrValue).toBeCalled()
  })
})
