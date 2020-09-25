import { BehaviorSubject } from 'rxjs'
import { stateChanges, list } from 'rxfire/database'
import { map } from 'rxjs/operators';
import firebaseApp from '../services'
const initState = {
  orders: [],
  error: ''
}
const subject = new BehaviorSubject(initState)
const ref = firebaseApp.database().ref('products/orders');
let state = initState

const ordersStore = {
  init: () => {
    state = initState
    subject.next(state)
  },
  subscribe: (setState: any) => subject.subscribe(setState),
  createOrder: (data: any) => {

    ref.push(data);
    stateChanges(ref).pipe(
    map(change => {
      return {
        _key: change.snapshot.key,
        event: change.event,
        ...change.snapshot.val()
      };
    })
  ).subscribe(data => { console.log(data); });
  },
  incr: () => {

    list(ref)
    .pipe(
      map(changes => changes.map(c => {
        return { _key: c.snapshot.key, event: c.event, ...c.snapshot.val() }
      }))
    )
    .subscribe(list => {
      state = {
        ...state,
        orders: list
      }
      subject.next(state)
     });
  },
  initState,
}

export default ordersStore
