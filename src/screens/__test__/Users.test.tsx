import React from 'react'
import renderer from 'react-test-renderer'
import { TouchableOpacity } from 'react-native'
import MockedNavigator from '../../test/mock-navigator'
import Users from '../Users'

describe('Testing Users screen', () => {
  const Component = () => <Users />
  const wrapper = renderer.create(<MockedNavigator component={Component} />)
  test('Render correct component', async () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('Handle sign out action', async () => {
    const button = wrapper.root.findByType(TouchableOpacity)
    await button.props.onPress()
  })
})
