import { of, merge } from 'rxjs'
import { map } from 'rxjs/operators'
import { createActions } from '../state/RXState'
import { incr, decr } from '../helpers'
import { CategoryModel } from '../models'
import { collectionData } from 'rxfire/firestore'
import { db } from '../services/firebaseAccess'

const ref = db.collection('categories')
export const counterActions = createActions([
  'discountChange',
  'increment',
  'decrement',
  'reset',
  'init',
])
const initState = { categories: [], discount: 10 }
counterActions.init = collectionData(ref, '_key').pipe(
  map((changes) =>
    changes.map((c) => ({
      ...c,
      count: 0,
    }))
  )
)

interface CategoryType extends CategoryModel {
  id: string
  _key: string
}

interface StateType {
  categories: Array<CategoryType>
  discount: number
}

const CounterReducer$ = merge(
  of(() => initState),
  counterActions.increment.pipe(
    map((payload: string) => (state: StateType) => ({
      ...state,
      categories: incr(payload, state.categories),
    }))
  ),
  counterActions.decrement.pipe(
    map((payload: string) => (state: StateType) => ({
      ...state,
      categories: decr(payload, state.categories),
    }))
  ),
  counterActions.reset.pipe(
    map((_payload: number) => (_state: StateType) => initState)
  ),
  counterActions.init.pipe(
    map((payload: string) => (state: StateType) => ({
      ...state,
      categories: payload,
    }))
  ),
  counterActions.discountChange.pipe(
    map((payload: number) => (state: StateType) => ({
      ...state,
      discount: payload,
    }))
  )
)

export default CounterReducer$
