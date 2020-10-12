import React from 'react'
import { render } from '@testing-library/react'
import Indicator from '../IndicatorBackdrop'

describe('Testing Indicator component', () => {
  test("Render correct component", () => {
    const { container } = render(<Indicator />)
    expect(container).toMatchSnapshot()
  })
})
