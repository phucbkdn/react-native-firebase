import React from 'react'
import renderer from 'react-test-renderer'
import MockedNavigator from '../../test/mock-navigator'
import Users from '../Users'
import { setupFirebaseUnitTest, teardown } from '../../test/setupFirebaseTest'

const { adminDB } = setupFirebaseUnitTest()

beforeEach(async () => {
  await adminDB.collection('users').add({
    state: 'online',
    email: 'abc1@test.com',
  })
  await adminDB.collection('users').add({
    state: 'online',
    email: 'test@test.com',
  })
})

afterEach(async () => {
  await teardown()
})

describe('Testing Users screen', () => {
  const Component = () => <Users />
  const wrapper = renderer.create(<MockedNavigator component={Component} />)
  test('Render correct component', async () => {
    expect(wrapper).toMatchSnapshot()
  })
})
