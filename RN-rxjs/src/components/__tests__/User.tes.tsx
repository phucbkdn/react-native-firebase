import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { TouchableOpacity } from 'react-native'
import { User } from '../User'
import MockedNavigator from '../../test/mock-navigator'
import usersStore from '../../store/users'

const props = {
  name: 'Name',
  id: 'user-id',
  active: true,
}

const Component = () => <User {...props} />
describe('Testing Message component', () => {
  const store = usersStore.getStore()
  test('Render correct component', () => {
    const { container } = render(<MockedNavigator component={Component} />)
    expect(container).toMatchSnapshot()
  })

  test('Testing actions component', () => {
    const wrapper = renderer.create(<MockedNavigator component={Component} />)
    const buttons = wrapper.root.findAllByType(TouchableOpacity)
    buttons[0].props.onPress()
    store.subscribe((it) => {
      expect(it.user).toEqual('Name')
    })
  })
})
