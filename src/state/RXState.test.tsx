import { mount } from 'enzyme'
import Rx, { Subject, of } from 'rxjs'
import React from 'react'
import { map, toArray } from 'rxjs/operators'
import { render, fireEvent } from '@testing-library/react'
import {
  createAction,
  createActions,
  createState,
  Provide,
  connect,
} from './RXState'

test("createAction creates new Subject instance", async (done) => {
  const action = await createAction()
  const anotherAction = await createAction()
  expect(action instanceof Subject).toBeTruthy()
  expect(action === anotherAction).toBeFalsy()
  action.unsubscribe()
  anotherAction.unsubscribe()
  done()
})

test("createState creates reactive state using scoped reducers", async (done) => {
  const add$ = new Subject();
  const counterReducer$ = add$.pipe(
    map(payload => (state: any) => state + payload)
  )
  const rootReducer$ = counterReducer$.pipe(
    map(counter => ["counter", counter])
  )

  const state$ = await createState(rootReducer$, of({ counter: 10 }));


  add$.next(1); // No subscribers yet

  state$.pipe(
    toArray()
  ).subscribe((results) => {
    expect(results).toEqual([{ counter: 10 }, { counter: 12 }])
  });

  add$.next(2);
  add$.unsubscribe()
  done()
});

test("connect maps state to props in Provider context", (done) => {
  const add$ = new Subject();
  const counterReducer$ = add$.pipe(
    map(payload => (state: any) => state + payload)
  )

  const rootReducer$ = counterReducer$.pipe(
    map(counter => ["counter", counter])
  )

  const state$ = createState(rootReducer$, of({ counter: 10 }));

  const Counter = ({ counter, add }) => (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => add(1)}>add</button>
    </div>
  );

  const ConnectedCounter = connect(state => ({ counter: state.counter }), { add: add$ })(Counter);

  const tree = mount(
    <Provide state$={state$}>
      <ConnectedCounter />
    </Provide>
  );
  const { container, getByText } = render(
    <Provide state$={state$}>
      <ConnectedCounter />
    </Provide>
  )

  const button = container.querySelector('button')
  expect(container).toMatchSnapshot()
  expect(container.querySelector('h1')?.textContent).toEqual('10')
  fireEvent.click(button)
  expect(container.querySelector('h1')?.textContent).toEqual('11')
  done()
});
