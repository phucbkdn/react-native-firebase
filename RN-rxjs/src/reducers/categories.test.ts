import { pipe } from 'ramda'
import { take, toArray } from 'rxjs/operators'
import {} from 'rxjs'
import CounterReducer$, { counterActions } from './categories'

test('handles increment, decrement and reset actions', (done) => {
  CounterReducer$.pipe(take(5), toArray()).subscribe((fns) => {
    done.is(pipe(...fns)(), 9)
  })
  counterActions.increment.next(1)
  counterActions.reset.next()
  counterActions.decrement.next(1)
  counterActions.discountChange.next()
  done()
})
