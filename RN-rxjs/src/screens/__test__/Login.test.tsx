import React from 'react'
import renderer from 'react-test-renderer'
import * as firebase from 'firebase'
import { TextInput, TouchableOpacity } from 'react-native'
import MockedNavigator from '../../test/mock-navigator'
import Login from '../Login'

describe('Testing Messages screen', () => {
  const Component = () => <Login />
  const wrapper = renderer.create(<MockedNavigator component={Component} />)
  test('Render correct component', async () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('Render login action', async () => {
    const inputs = wrapper.root.findAllByType(TextInput)
    const button = wrapper.root.findByType(TouchableOpacity)
    // Testing input value
    const props = 'Value'
    inputs[0].props.onChangeText('redirectTest@test.com')
    inputs[1].props.onChangeText('password')

    // Testing clear Input value when send message
    await button.props.onPress()
  })
})
