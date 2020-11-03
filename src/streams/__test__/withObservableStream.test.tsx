import React from 'react'
import withObservableStream from '../index'
import { Text } from 'react-native'
import renderer from 'react-test-renderer'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

describe('Testing withObservableStream', () => {
  it('Should render correctly', (done) => {
    const Component = ({ count }) => <Text>{count}</Text>

    const observable = new BehaviorSubject({ count: 1 })
    const HOCComponent = withObservableStream(
      observable,
      {},
      { count: 1 }
    )(Component)
    const view = renderer.create(<HOCComponent />)
    expect(view).toMatchSnapshot()
    const text = view.root.findByType(Text)
    expect(text.props.children).toBe(1)
    done()
  })
})
