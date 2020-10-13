import React from 'react'
import Messages from '../Messages'
import renderer from 'react-test-renderer'
import { TextInput } from 'react-native'
import MockedNavigator from '../../test/mock-navigator'

describe('Testing Messages screen', () => {
  const Component = () => <Messages />
  const wrapper = renderer.create(<MockedNavigator component={Component} />)
  test('Render correct component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('Render send message', () => {
    const input = wrapper.root.findByType(TextInput)
    input.props.onChangeText()
  })
})
