import { BehaviorSubject } from 'rxjs'
import { list } from 'rxfire/database';
import { map } from 'rxjs/operators';
import firebaseApp from '../services'
const initState = {
  categories: [],
  error: ''
}
const subject = new BehaviorSubject(initState)
const todosRef = firebaseApp.database().ref('products/category');
let state = initState

const countStore = {
  subscribe: (setState: any) => subject.subscribe(setState),
  init: () => {
    list(todosRef)
    .pipe(
      map(changes => changes.map(c => {
        return { count: 0, _key: c.snapshot.key, event: c.event, ...c.snapshot.val() }
      }))
    )
    .subscribe((list: any) => {
      state = {
        ...state,
        categories: list
      }
      subject.next(state)
     });
  },
  incr: (id: string) => {

    state = {
      ...state,
      categories: state.categories.map(item => item.id === id ? { ...item, count: item.count + 1} : item)
    }
    subject.next(state)
  },
  decr: (id: string) => {
    state = {
      ...state,
      categories: state.categories.map(item => item.id === id ? { ...item, count: item.count - 1} : item)
    }
    subject.next(state)
  },
  initState,
}

export default countStore
