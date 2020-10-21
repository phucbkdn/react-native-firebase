import React from 'react'
import Messages from '../Messages'
import renderer from 'react-test-renderer'
import { TextInput, TouchableOpacity } from 'react-native'
import MockedNavigator from '../../test/mock-navigator'
import { setupFirebaseUnitTest, teardown } from '../../test/setupFirebaseTest'
// jest.mock('../../services/firebaseAccess')
const { adminDB } = setupFirebaseUnitTest()

afterAll(async () => {
  await teardown()
})

describe('Testing Messages screen', () => {
  const Component = () => <Messages />
  const wrapper = renderer.create(<MockedNavigator component={Component} />)
  test('Render correct component', async () => {
    await adminDB.collection('messages').add({
      created: '2020-10-12T09:22:36.555Z',
      message: 'Hello',
      sendTo: 'abc1@test.com',
      thread: 'abc@test.com-abc1@test.com',
      time: '4:02',
      user: 'abc@test.com',
    })
    await adminDB.collection('messages').add({
      created: '2020-10-12T09:22:36.555Z',
      message: 'Hi',
      sendTo: 'abc1@test.com',
      thread: 'abc@test.com-abc1@test.com',
      time: '4:02',
      user: 'abc@test.com',
    })
    await adminDB.collection('messages').add({
      created: '2020-10-12T09:22:36.555Z',
      message: 'Test',
      sendTo: 'abc1@test.com',
      thread: 'abc@test.com-abc1@test.com',
      time: '4:02',
      user: 'abc@test.com',
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
