import { of, merge } from 'rxjs'
import { map } from 'rxjs/operators'
import { createActions } from '../state/RXState'
import { incr, decr } from '../helpers'
import { CategoryModel } from '../models'
import { list } from 'rxfire/database'
import firebaseApp from '../services'

const ref = firebaseApp.database().ref('products/category')
export const counterActions = createActions(['increment', 'decrement', 'reset', 'init'])
const initState = {categories: [], discount: 10}
counterActions.init = list(ref)
  .pipe(
    map(changes => changes.map(c => {
      console.log('abc')
      return { _key: c.snapshot.key, event: c.event, ...c.snapshot.val(), count: 0 }
    }))
  )


interface CategoryType extends CategoryModel{
  id: string,
  _key: string,
}


interface StateType {
  categories: Array<CategoryType>,
  discount: number
}


const CounterReducer$ = merge(
  of(() => initState),
  counterActions.increment.pipe(
    map((payload: string) => (state: StateType) => ({
      ...state,
      categories: incr(payload, state.categories)
     }))
  ),
  counterActions.decrement.pipe(
    map((payload: string) => (state: StateType) => ({
      ...state,
      categories: decr(payload, state.categories)
     }))
  ),
  counterActions.reset.pipe(
    map((_payload: number) => (_state: StateType) => initState)
  ),
  counterActions.init.pipe(
    map((payload: string) => (state: StateType) => ({
      ...state,
      categories: payload
     }))
  ),
)

export default CounterReducer$
