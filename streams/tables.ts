import { Subject, BehaviorSubject } from 'rxjs'
import { list, object } from 'rxfire/database';
import { collectionData } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import firebaseApp , {  firebaseConfig } from '../services'
const initState = {
  tables: [],
  error: ''
}
const subject = new BehaviorSubject(initState)
const todosRef = firebaseApp.database().ref('products/tables');
let state = initState

const countStore = {
  init: () => {
    state = initState
    subject.next(state)
  },
  subscribe: (setState: any) => subject.subscribe(setState),
  incr: () => {

    list(todosRef)
    .pipe(
      map(changes => changes.map(c => {
        return { _key: c.snapshot.key, event: c.event, ...c.snapshot.val() }
      }))
    )
    .subscribe(list => {
      state = {
        ...state,
        tables: list
      }
      subject.next(state)
     });
  },
  process: (id: string, value: boolean) => {
    const ref = firebaseApp.database().ref(`products/tables/${id}/active`);
    ref.set(value);
    object(ref)
    .pipe(map(change => ({ _key: change.snapshot.key, ...change.snapshot.val() })))
    .subscribe(list => {
      state = {
        ...state,
        tables: list
      }
      console.log('list:', list)
      // subject.next(state)
     });
  },

  initState,
}

export default countStore
