import { BehaviorSubject, Subject, Subscription, Observable } from 'rxjs'
import { scan, map } from 'rxjs/operators'
import { incr, decr } from '../helpers'
import { list } from 'rxfire/database'
import firebaseApp from '../services'
import { CategoryModel } from '../models'

interface CategoryType extends CategoryModel {
  id: string
  _key: string
}

type ActionType = {
  value: string
  type: string
}

type StateType = {
  categories: Array<CategoryType>
  discount: number
}

const categoriesService = new (class CategoriesService {
  // Type
  store: Subscription
  dispatcher: any

  static DECR = 'DECR'
  static INCR = 'INCR'
  static DISCOUNT = 'DISCOUNT'
  static GET_CATEGORIES = 'GET_CATEGORIES'

  constructor() {
    this.dispatcher = new BehaviorSubject<StateType>({
      categories: [],
      discount: 0,
    })
    this.store = this.dispatcher.pipe(
      scan(this.reducer, { categories: [], discount: 0 })
    )
  }

  reducer(state: StateType, action: ActionType) {
    switch (action.type) {
      case CategoriesService.INCR:
        return {
          ...state,
          categories: incr(action.value, state.categories),
        }

      case CategoriesService.DECR:
        return {
          ...state,
          categories: decr(action.value, state.categories),
        }

      case CategoriesService.DISCOUNT:
        return {
          ...state,
          discount: action.value,
        }

      case CategoriesService.GET_CATEGORIES:
        return {
          ...state,
          categories: action.value,
        }

      default:
        return state
    }
  }

  decr(id: string) {
    this.dispatcher.next({ type: CategoriesService.INCR, value: id })
  }

  incr(id: string) {
    this.dispatcher.next({ type: CategoriesService.DECR, value: id })
  }

  discount(value: number) {
    this.dispatcher.next({ type: CategoriesService.DISCOUNT, value })
  }

  getCategories() {
    const ref = firebaseApp.database().ref('products/category')

    list(ref)
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
              _key: c.snapshot.key,
              event: c.event,
              ...c.snapshot.val(),
              count: 0,
            }
          })
        )
      )
      .subscribe((list) => {
        this.dispatcher.next({
          type: CategoriesService.GET_CATEGORIES,
          value: list,
        })
      })
  }

  unSubscribe() {
    this.store.unsubscribe()
  }

  getStore() {
    return this.store
  }
})()

export default categoriesService
