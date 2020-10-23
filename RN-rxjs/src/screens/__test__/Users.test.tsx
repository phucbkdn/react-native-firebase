import React from 'react'
import renderer from 'react-test-renderer'
import MockedNavigator from '../../test/mock-navigator'
import Users from '../Users'
import { User } from '../../components/User'

import {
  setupFirebaseUnitTest,
  teardown,
  clearFirestoreData,
} from '../../test/setupFirebaseTest'

const mockData = {
  'users/user-1': {
    foo: 'bar',
  },
  'users/user-2': {
    state: 'online',
    email: 'user-1@test.com',
  },
}

describe('Testing Users screen', () => {
  beforeAll(async () => {
    await clearFirestoreData()
    await setupFirebaseUnitTest(mockData)
  })

  afterEach(async () => {
    await teardown()
  })

  const Component = () => <Users />
  const wrapper = renderer.create(<MockedNavigator component={Component} />)

  test('Render correct component', (done) => {
    expect(wrapper).toMatchSnapshot()
    const users = wrapper.root.findAllByType(User)
    expect(users.length).toEqual(2)
    done()
  })
})
