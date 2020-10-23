import React from 'react'
import Messages from '../Messages'
import renderer from 'react-test-renderer'
import { TextInput, TouchableOpacity } from 'react-native'
import MockedNavigator from '../../test/mock-navigator'
import {
  setupFirebaseUnitTest,
  teardown,
  clearFirestoreData,
} from '../../test/setupFirebaseTest'
import Message from '../../components/Message'

const mockData = {
  'messages/1': {
    created: '2020-10-12T09:22:36.555Z',
    message: 'Hello',
    sendTo: 'abc1@test.com',
    thread: 'abc@test.com-abc1@test.com',
    time: '4:02',
    user: 'abc@test.com',
  },
  'messages/2': {
    created: '2020-10-12T09:22:36.555Z',
    message: 'Hi',
    sendTo: 'abc1@test.com',
    thread: 'abc@test.com-abc1@test.com',
    time: '4:02',
    user: 'abc@test.com',
  },
}

describe('Testing Messages screen', () => {
  beforeEach(async () => {
    // jest.mock('../../services/firebaseAccess')
    await clearFirestoreData()
    await setupFirebaseUnitTest(mockData)
  })

  afterEach(async () => {
    await teardown()
  })

  const Component = () => <Messages />
  const wrapper = renderer.create(<MockedNavigator component={Component} />)
  test('Render correct component', (done) => {
    const render = renderer.create(<MockedNavigator component={Component} />)
    expect(render).toMatchSnapshot()
    const messages = wrapper.root.findAllByType(Message)
    expect(messages.length).toEqual(2)
    done()
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
