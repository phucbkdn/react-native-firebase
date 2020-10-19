import React from 'react'
import Messages from '../Messages'
import renderer from 'react-test-renderer'
import { TextInput, TouchableOpacity } from 'react-native'
import MockedNavigator from '../../test/mock-navigator'
import { setupFirebaseUnitTest } from '../../test/setupTest'

const { adminDB } = setupFirebaseUnitTest()

describe('Testing Messages screen', () => {
  const Component = () => <Messages />
  const wrapper = renderer.create(<MockedNavigator component={Component} />)
  test('Render correct component', async () => {
    await adminDB.collection('messages').add({
      message: 'hello',
      sendTo: 'test@gmail.com',
    })
    const render = renderer.create(<MockedNavigator component={Component} />)
    expect(render).toMatchSnapshot()
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
