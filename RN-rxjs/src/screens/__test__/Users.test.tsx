import React from 'react'
import renderer from 'react-test-renderer'
import MockedNavigator from '../../test/mock-navigator'
import Users from '../Users'

describe('Testing Users screen', () => {
  const Component = () => <Users />
  const wrapper = renderer.create(<MockedNavigator component={Component} />)
  test('Render correct component', async () => {
    expect(wrapper).toMatchSnapshot()
  })
})
