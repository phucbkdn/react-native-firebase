import React from 'react'
import { Text } from 'react-native'
import  renderer from 'react-test-renderer'
import { Discount } from '../Discount'

const props = {
 discount: 10,
  categories: [
    {
      count: 1,
      price: 200
    },
    {
      count: 2,
      price: 100
    }
  ]
}

describe('Testing Discount component', () => {
  test("Render correct component", () => {
    const view = renderer.create(<Discount {...props} />)
    expect(view).toMatchSnapshot()
    const text = view.root.findAllByType(Text)
    expect(text[1].props.children).toBe('40 ₫')
  })
})
