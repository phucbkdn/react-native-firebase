import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { scan, map } from 'rxjs/operators'
import { incr, decr } from '../helpers'
import { list, object } from 'rxfire/database'
import firebaseApp from '../services'

type ActionType = {
  value: string,
  type: string
}

const categoriesService = new (class CategoriesService {
  static DECR = "DECR"
  static INCR = "INCR"
  static DISCOUNT = "DISCOUNT"

  constructor() {
    this.dispatcher = new BehaviorSubject({
      categories: [],
      discount: 0,
    })
    this.store = this.dispatcher
                    .pipe(scan(this.reducer, { categories: [],
                      discount: 0, }))
  }

  reducer(state, action: ActionType) {
    console.log('action', action.type)
    switch (action.type) {
      case CategoriesService.INCR:
        return {
          ...state,
          categories: incr(action.value, state.categories)
         }

      case CategoriesService.DECR:
        return {
          ...state,
          categories: decr(action.value, state.categories)
         }

      case CategoriesService.DISCOUNT:
        return {
          ...state,
          discount: action.value
        }

      case 'GET_CATEGORIES':
        return {
          ...state,
          categories: action.value
        }

      default: return state;
    }
  }
  decr(id: string) {
    this.dispatcher.next({ type: CategoriesService.INCR, value: id });
  }

  incr(id: string) {
    this.dispatcher.next({ type: CategoriesService.DECR, value: id });
  }

  discount(value: number) {
    this.dispatcher.next({ type: CategoriesService.DISCOUNT, value});
  }

  getCategories() {
    const ref = firebaseApp.database().ref('products/category');

    list(ref)
    .pipe(
      map(changes => changes.map(c => {
        return { _key: c.snapshot.key, event: c.event, ...c.snapshot.val(), count: 0 }
      }))
    )
    .subscribe(list => {
      this.dispatcher.next({
        type: 'GET_CATEGORIES',
        value: list
      })
     });
  }

  unSubscribe() {
    this.store.unsubscribe()
  }

  getStore() {
    return this.store;
  }
})()

export default categoriesService
