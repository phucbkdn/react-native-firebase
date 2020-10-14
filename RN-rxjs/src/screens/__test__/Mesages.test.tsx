import React from 'react'
import Messages from '../Messages'
import renderer from 'react-test-renderer'
import { TextInput, TouchableOpacity } from 'react-native'
import MockedNavigator from '../../test/mock-navigator'

describe('Testing Messages screen', () => {
  const Component = () => <Messages />
  const wrapper = renderer.create(<MockedNavigator component={Component} />)
  test('Render correct component', async () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('Render send message', () => {
    const input = wrapper.root.findByType(TextInput)
    const button = wrapper.root.findByType(TouchableOpacity)
    // Testing input value
    const props = 'Value'
    input.props.onChangeText(props)
    expect(input.props.value).toEqual(props)

    // Testing clear Input value when send message
    button.props.onPress()
    expect(input.props.value).toEqual('')
  })
})
